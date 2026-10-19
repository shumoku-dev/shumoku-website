import type { Picture } from 'vite-imagetools'
import type { PlayerProvider } from './providers'

/**
 * Entries of `src/content/blog/<slug>/embeds.json`, written by `bun run blog:embeds`. The build only
 * reads this lockfile, so it never depends on other sites being reachable.
 */
export interface LinkCardEmbed {
  type: 'card'
  title: string
  description?: string
  site?: string
  /** Article-relative `./embeds/...` copy of the page's og:image. */
  image?: string
}

export interface PlayerEmbed {
  type: 'player'
  provider: PlayerProvider
  title: string
  /** iframe URL, loaded only after the reader clicks. */
  embedUrl: string
  /** width / height of the player. */
  ratio: number
  image?: string
}

export type Embed = LinkCardEmbed | PlayerEmbed
export type EmbedLock = Record<string, Embed>

const locks = import.meta.glob<EmbedLock>('/src/content/blog/*/embeds.json', {
  eager: true,
  import: 'default',
})
const images = import.meta.glob<Picture>('/src/content/blog/*/embeds/*.{avif,jpg,jpeg,png,webp}', {
  eager: true,
  query: { enhanced: true, w: '960;480' },
  import: 'default',
})

export const embedLock = (slug: string): EmbedLock =>
  locks[`/src/content/blog/${slug}/embeds.json`] ?? {}

export const articleEmbed = (slug: string, url: string): Embed | undefined => embedLock(slug)[url]

export function embedImage(slug: string, src: string): Picture | undefined {
  return src.startsWith('./') ? images[`/src/content/blog/${slug}/${src.slice(2)}`] : undefined
}
