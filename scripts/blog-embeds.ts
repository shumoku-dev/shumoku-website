#!/usr/bin/env bun
// Resolves standalone URLs in blog articles into src/lib/blog/embeds/cache/<slug>/embeds.json and
// downloads their thumbnails next to it. Article folders stay author-only. Existing entries are kept;
// pass --refresh to fetch them again, or slugs to limit the run. Commit the results: the site build
// reads only these files.
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { embedUrls } from '../src/lib/blog/embeds/collect'
import type { Embed, EmbedLock } from '../src/lib/blog/embeds/lock'
import { playerProvider, players, youtubeVideo } from '../src/lib/blog/embeds/providers'

const root = new URL('../src/content/blog/', import.meta.url)
const cache = new URL('../src/lib/blog/embeds/cache/', import.meta.url)
const args = process.argv.slice(2)
const refresh = args.includes('--refresh')
const only = args.filter((arg) => !arg.startsWith('--'))
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
async function thumbnail(slug: string, ...candidates: (string | undefined)[]) {
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

async function resolve(slug: string, url: string): Promise<Embed> {
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
          image: await thumbnail(slug, oembed.thumbnail_url, info.image),
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
    image: await thumbnail(slug, info.image),
  }
}

const slugs = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(new URL(`${entry.name}/index.md`, root)))
  .map((entry) => entry.name)

// Remove the cache of articles that no longer exist.
if (!only.length && existsSync(cache))
  for (const slug of readdirSync(cache))
    if (!slugs.includes(slug)) rmSync(new URL(`${slug}/`, cache), { recursive: true })

for (const slug of slugs) {
  if (only.length && !only.includes(slug)) continue
  const folder = new URL(`${slug}/`, cache)
  const lockUrl = new URL('embeds.json', folder)
  const previous: EmbedLock = existsSync(lockUrl) ? JSON.parse(readFileSync(lockUrl, 'utf8')) : {}
  const urls = await embedUrls(readFileSync(new URL(`${slug}/index.md`, root), 'utf8'))
  const next: EmbedLock = {}
  for (const url of urls) {
    if (previous[url] && !refresh) {
      next[url] = previous[url]
      continue
    }
    console.log(`${slug}: ${url}`)
    try {
      next[url] = await resolve(slug, url)
    } catch (error) {
      console.error(`  failed: ${error}`)
      if (previous[url]) next[url] = previous[url]
      else process.exitCode = 1
    }
  }
  if (!urls.length) {
    rmSync(folder, { recursive: true, force: true })
    continue
  }
  mkdirSync(folder, { recursive: true })
  writeFileSync(lockUrl, `${JSON.stringify(next, null, 2)}\n`)
  // Drop thumbnails that no entry refers to any more.
  const used = new Set(['embeds.json', ...Object.values(next).map((entry) => entry.image)])
  for (const file of readdirSync(folder)) if (!used.has(file)) rmSync(new URL(file, folder))
}
