import { type Category, categories } from './categories'
import { renderMarkdown, splitFrontmatter } from './markdown.server'
import { type Post, parsePost } from './post'

// Server-only: article sources never reach the client; pages receive rendered nodes instead.
const sources = import.meta.glob<string>('/src/content/blog/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const articles = Object.entries(sources).map(([path, source]) => {
  const { data, body } = splitFrontmatter(source)
  return { post: parsePost(path.split('/').at(-2) ?? '', data), body }
})
const all = articles.map((article) => article.post)

/** Published articles, newest first. Drafts are excluded everywhere. */
export const posts: Post[] = all
  .filter((post) => !post.draft)
  .sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug))

export const getPost = (slug: string) => posts.find((post) => post.slug === slug)

/** Categories that have at least one article, in the order they are defined. */
export const usedCategories = (Object.keys(categories) as Category[]).filter((category) =>
  posts.some((post) => post.category === category),
)

/** The article body as nodes for `ArticleBody.svelte`. */
export function articleBody(post: Post) {
  const article = articles.find((entry) => entry.post.slug === post.slug)
  return article ? renderMarkdown(article.body, post.lang).nodes : []
}
