import type { Locale } from '$lib/site'

/**
 * Releases shown in the Home activity log, newest first. Dates and tags come from the product
 * repository's Git tags; add an entry when a release is published. Blog articles join the log
 * automatically.
 */
const releaseBase = 'https://github.com/konoe-akitoshi/shumoku/releases/tag/'

export const releases = [
  {
    date: '2026-11-04',
    tag: '@shumoku/cli@0.3.0',
    label: { ja: 'CLI・ライブラリ 0.3.0', en: 'CLI and library 0.3.0' },
  },
  {
    date: '2026-10-04',
    tag: 'server-v0.2.0',
    label: { ja: 'Shumoku Server 0.2.0', en: 'Shumoku Server 0.2.0' },
  },
] as const

export type ActivityKind = 'release' | 'article' | 'event'
export type ActivityItem = { date: string; kind: ActivityKind; title: string; href: string }

export const releaseItems = (locale: Locale): ActivityItem[] =>
  releases.map((release) => ({
    date: release.date,
    kind: 'release',
    title: release.label[locale],
    href: `${releaseBase}${encodeURIComponent(release.tag)}`,
  }))
