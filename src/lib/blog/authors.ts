/** People credited in `authors:` of article frontmatter. Add someone here once, then refer to the key. */
export const authors = {
  akitoshi: { name: 'Akitoshi Saeki', url: 'https://github.com/konoe-akitoshi' },
} satisfies Record<string, { name: string; url?: string }>

export type AuthorId = keyof typeof authors

export const isAuthor = (value: unknown): value is AuthorId =>
  typeof value === 'string' && Object.hasOwn(authors, value)
