import type { Locale } from '$lib/site'
import { type AuthorId, authors, isAuthor } from './authors'
import { type Category, categories, isCategory } from './categories'

/** Validated frontmatter of `src/content/blog/<slug>/index.md`. */
export interface Post {
  slug: string
  /** Language the article is written in. Articles are not duplicated per locale. */
  lang: Locale
  title: string
  description: string
  /** YYYY-MM-DD. Listings are ordered by this date. */
  published: string
  /** YYYY-MM-DD of the last meaningful revision, if any. */
  updated?: string
  category: Category
  authors: AuthorId[]
  /** Article-relative path such as `./images/cover.webp`. Resolve with `articleImage`. */
  image?: string
  imageAlt?: string
  draft: boolean
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toISOString().slice(0, 10) === value
}

function optionalString(data: Record<string, unknown>, key: string, slug: string) {
  const value = data[key]
  if (value !== undefined && typeof value !== 'string') throw new Error(`Invalid ${key}: ${slug}`)
  return value
}

export function parsePost(slug: string, metadata: unknown): Post {
  if (!slugPattern.test(slug)) throw new Error(`Invalid article slug: ${slug}`)
  if (!metadata || typeof metadata !== 'object') throw new Error(`Missing frontmatter: ${slug}`)
  const data = metadata as Record<string, unknown>
  const [title, description, published] = ['title', 'description', 'published'].map((key) => {
    const value = data[key]
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing ${key}: ${slug}`)
    return value
  })
  const updated = optionalString(data, 'updated', slug)
  for (const date of [published, updated])
    if (date !== undefined && !isDate(date))
      throw new Error(`Use a quoted YYYY-MM-DD date: ${slug}`)
  if (updated !== undefined && updated < published)
    throw new Error(`updated must not be before published: ${slug}`)
  if (
    !Array.isArray(data.authors) ||
    data.authors.length === 0 ||
    !data.authors.every(isAuthor) ||
    new Set(data.authors).size !== data.authors.length
  )
    throw new Error(`authors must list keys of ${Object.keys(authors).join(', ')}: ${slug}`)
  if (!isCategory(data.category))
    throw new Error(`category must be one of ${Object.keys(categories).join(', ')}: ${slug}`)
  const image = optionalString(data, 'image', slug)
  const imageAlt = optionalString(data, 'imageAlt', slug)
  if (image !== undefined && !image.startsWith('./images/'))
    throw new Error(`Use an article-relative ./images/ cover: ${slug}`)
  if (image && !imageAlt?.trim()) throw new Error(`imageAlt is required: ${slug}`)
  if (data.draft !== undefined && typeof data.draft !== 'boolean')
    throw new Error(`Invalid draft: ${slug}`)
  if (data.lang !== undefined && data.lang !== 'ja' && data.lang !== 'en')
    throw new Error(`Invalid lang: ${slug}`)
  return {
    slug,
    lang: data.lang ?? 'ja',
    title,
    description,
    published,
    updated,
    category: data.category,
    authors: data.authors,
    image,
    imageAlt,
    draft: data.draft === true,
  }
}

export const formatDate = (date: string) => date.replaceAll('-', '.')
