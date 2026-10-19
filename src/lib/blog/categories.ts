import type { Locale } from '$lib/site'

/** Fixed vocabulary for `category:` in article frontmatter, with labels for each UI locale. */
export const categories = {
  event: { ja: 'イベントレポート', en: 'Event report' },
  release: { ja: 'リリース', en: 'Release' },
  development: { ja: '開発の話', en: 'Development' },
  usecase: { ja: '活用事例', en: 'Use case' },
} satisfies Record<string, Record<Locale, string>>

export type Category = keyof typeof categories

export const isCategory = (value: unknown): value is Category =>
  typeof value === 'string' && Object.hasOwn(categories, value)
