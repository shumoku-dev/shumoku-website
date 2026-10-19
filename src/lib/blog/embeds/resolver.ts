import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { embedUrls } from '../markdown.server.ts'
import type { Embed, EmbedLock } from './lock.ts'
import { playerProvider, players, youtubeVideo } from './providers.ts'

/**
 * Resolves standalone URLs in blog articles into `cache/<slug>/embeds.json`, with thumbnails stored
 * next to it, so article folders stay author-only. Used by the Vite plugin (dev and build) and by
 * `bun run blog:embeds`. Runs in Node only.
 */

const headers = {
  'user-agent': 'Mozilla/5.0 (compatible; ShumokuBlogEmbeds/1.0; +https://www.shumoku.dev)',
}

async function get(url: string) {
  const response = await fetch(url, {
    headers,
    redirect: 'follow',
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return response
}

function decode(value: string) {
  return value
    .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .trim()
}

/** Attributes of every <meta> and <link> tag in the document head. */
function headTags(html: string) {
  const head = html.slice(0, html.search(/<\/head>/i) + 1 || 200_000)
  return [...head.matchAll(/<(meta|link)\b([^>]*)>/gi)].map(([, tag, body]) => {
    const attributes: Record<string, string> = { tag: tag.toLowerCase() }
    for (const [, name, double, single, bare] of body.matchAll(
      /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g,
    ))
      attributes[name.toLowerCase()] = decode(double ?? single ?? bare ?? '')
    return attributes
  })
}

async function page(url: string) {
  const response = await get(url)
  const html = await response.text()
  const tags = headTags(html)
  const meta = (...names: string[]) =>
    tags.find((tag) => tag.tag === 'meta' && names.includes(tag.property ?? tag.name ?? ''))
      ?.content || undefined
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]
  const image = meta('og:image', 'og:image:url', 'twitter:image')
  return {
    url: response.url,
    title: meta('og:title', 'twitter:title') ?? (title ? decode(title) : undefined),
    site: meta('og:site_name'),
    image: image ? new URL(image, response.url).href : undefined,
    oembed: tags.find((tag) => tag.tag === 'link' && tag.type === 'application/json+oembed')?.href,
  }
}

const extensions: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
}

/** Saves a thumbnail next to the article so readers never contact the source before clicking. */
async function thumbnail(cache: URL, slug: string, ...candidates: (string | undefined)[]) {
  for (const candidate of candidates) {
    if (!candidate) continue
    try {
      const response = await get(candidate)
      const extension = extensions[response.headers.get('content-type')?.split(';')[0] ?? '']
      if (!extension) continue
      const name = `${createHash('sha256').update(candidate).digest('hex').slice(0, 16)}.${extension}`
      mkdirSync(new URL(`${slug}/`, cache), { recursive: true })
      writeFileSync(new URL(`${slug}/${name}`, cache), Buffer.from(await response.arrayBuffer()))
      return name
    } catch (error) {
      console.warn(`  thumbnail skipped: ${error}`)
    }
  }
  return undefined
}

async function resolve(cache: URL, slug: string, url: string): Promise<Embed> {
  const provider = playerProvider(url)
  if (provider === 'youtube') {
    const video = youtubeVideo(url)
    if (video) {
      const oembed = await (
        await get(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`)
      ).json()
      const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${video.id}`)
      if (video.start) embedUrl.searchParams.set('start', String(video.start))
      return {
        type: 'player',
        provider,
        title: oembed.title,
        embedUrl: embedUrl.href,
        ratio: 16 / 9,
        image: await thumbnail(
          cache,
          slug,
          `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
          oembed.thumbnail_url,
        ),
      }
    }
  }
  const info = await page(url)
  if (provider && info.oembed) {
    try {
      const oembed = await (await get(new URL(info.oembed, info.url).href)).json()
      const src = /<iframe[^>]+src="([^"]+)"/.exec(oembed.html ?? '')?.[1] ?? oembed.url
      const embedUrl = src && new URL(decode(src), info.url)
      if (
        embedUrl?.protocol === 'https:' &&
        (players[provider].embedHosts as readonly string[]).includes(embedUrl.hostname)
      ) {
        return {
          type: 'player',
          provider,
          title: oembed.title ?? info.title ?? url,
          embedUrl: embedUrl.href,
          ratio: oembed.width && oembed.height ? oembed.width / oembed.height : 16 / 9,
          image: await thumbnail(cache, slug, oembed.thumbnail_url, info.image),
        }
      }
    } catch (error) {
      console.warn(`  oEmbed failed, using a link card: ${error}`)
    }
  }
  return {
    type: 'card',
    title: info.title ?? new URL(url).hostname,
    ...(info.site && { site: info.site }),
    image: await thumbnail(cache, slug, info.image),
  }
}

export interface SyncOptions {
  /** Project root directory. */
  root: string
  /** Limit the run to these articles; the cache of deleted articles is only pruned without it. */
  slugs?: string[]
  /** Fetch entries again even when they are cached. */
  refresh?: boolean
  /** URLs not to try again, such as ones that already failed in this process. */
  skip?: ReadonlySet<string>
  log?: (message: string) => void
}

/**
 * Brings every article's embed cache in line with its standalone URLs: reuses cached entries,
 * fetches missing ones and prunes the rest. A URL that cannot be fetched is reported and left out,
 * so the page shows a plain card instead of failing. Files are only written when they change.
 */
export async function syncEmbeds({
  root,
  slugs: only,
  refresh = false,
  skip,
  log = console.log,
}: SyncOptions) {
  const base = pathToFileURL(`${root.replace(/\/$/, '')}/`)
  const content = new URL('src/content/blog/', base)
  const cache = new URL('src/lib/blog/embeds/cache/', base)
  const failed: string[] = []
  const slugs = readdirSync(content, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && existsSync(new URL(`${entry.name}/index.md`, content)),
    )
    .map((entry) => entry.name)

  if (!only && existsSync(cache))
    for (const slug of readdirSync(cache))
      if (!slugs.includes(slug)) rmSync(new URL(`${slug}/`, cache), { recursive: true })

  for (const slug of only ? slugs.filter((slug) => only.includes(slug)) : slugs) {
    const folder = new URL(`${slug}/`, cache)
    const lockUrl = new URL('embeds.json', folder)
    const previousText = existsSync(lockUrl) ? readFileSync(lockUrl, 'utf8') : undefined
    const previous: EmbedLock = previousText ? JSON.parse(previousText) : {}
    const urls = embedUrls(readFileSync(new URL(`${slug}/index.md`, content), 'utf8'))
    const next: EmbedLock = {}
    for (const url of urls) {
      if (previous[url] && !refresh) {
        next[url] = previous[url]
        continue
      }
      if (skip?.has(url)) {
        failed.push(url)
        continue
      }
      log(`blog embeds: ${slug}: ${url}`)
      try {
        next[url] = await resolve(cache, slug, url)
      } catch (error) {
        log(`blog embeds:   failed: ${error}`)
        if (previous[url]) next[url] = previous[url]
        else failed.push(url)
      }
    }
    if (!Object.keys(next).length) {
      if (existsSync(folder)) rmSync(folder, { recursive: true })
      continue
    }
    const text = `${JSON.stringify(next, null, 2)}\n`
    mkdirSync(folder, { recursive: true })
    if (text !== previousText) writeFileSync(lockUrl, text)
    // Drop thumbnails that no entry refers to any more.
    const used = new Set(['embeds.json', ...Object.values(next).map((entry) => entry.image)])
    for (const file of readdirSync(folder)) if (!used.has(file)) rmSync(new URL(file, folder))
  }
  return { failed }
}
