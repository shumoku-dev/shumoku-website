import type { Picture } from 'vite-imagetools'
import type { PlayerProvider } from './providers'

/**
 * Entries of `cache/<slug>/embeds.json`, written by `bun run blog:embeds`. The build only reads this
 * lockfile, so it never depends on other sites being reachable.
 */
export interface LinkCardEmbed {
  type: 'card'
  title: string
  site?: string
  /** File name of the stored og:image copy in the same cache folder. */
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

const locks = import.meta.glob<EmbedLock>('./cache/*/embeds.json', {
  eager: true,
  import: 'default',
})
const images = import.meta.glob<Picture>('./cache/*/*.{avif,jpg,jpeg,png,webp}', {
  eager: true,
  query: { enhanced: true, w: '960;480' },
  import: 'default',
})

export const embedLock = (slug: string): EmbedLock => locks[`./cache/${slug}/embeds.json`] ?? {}

export const articleEmbed = (slug: string, url: string): Embed | undefined => embedLock(slug)[url]

export const embedImage = (slug: string, file: string): Picture | undefined =>
  images[`./cache/${slug}/${file}`]

/** Articles that have a cache folder, to catch caches left behind by deleted articles. */
export const cachedSlugs = () => Object.keys(locks).map((path) => path.split('/')[2])
