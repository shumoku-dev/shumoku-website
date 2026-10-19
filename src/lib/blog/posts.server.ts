import { type Category, categories } from './categories'
import { type Post, parsePost } from './post'

// Only frontmatter is read here, so article bodies never reach list or sitemap bundles.
const metadata = import.meta.glob('/src/content/blog/*/index.md', {
  eager: true,
  import: 'metadata',
})

const all = Object.entries(metadata).map(([path, data]) =>
  parsePost(path.split('/').at(-2) ?? '', data),
)

/** Published articles, newest first. Drafts are excluded everywhere. */
export const posts: Post[] = all
  .filter((post) => !post.draft)
  .sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug))

export const getPost = (slug: string) => posts.find((post) => post.slug === slug)

/** Categories that have at least one article, in the order they are defined. */
export const usedCategories = (Object.keys(categories) as Category[]).filter((category) =>
  posts.some((post) => post.category === category),
)
