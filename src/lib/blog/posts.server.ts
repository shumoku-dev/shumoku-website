import { dev } from '$app/environment'
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

/** Articles newest first; drafts only when asked for. */
export const selectPosts = (list: Post[], includeDrafts: boolean) =>
  list
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug))

/** Published articles, for the sitemap and prerendering. Drafts never reach a build. */
export const publishedPosts = selectPosts(all, false)

/** Articles shown on the site. The dev server also lists drafts so authors can preview them. */
export const posts = selectPosts(all, dev)

export const getPost = (slug: string) => posts.find((post) => post.slug === slug)

/** Categories that have at least one of the articles, in the order they are defined. */
export const categoriesOf = (list: Post[]) =>
  (Object.keys(categories) as Category[]).filter((category) =>
    list.some((post) => post.category === category),
  )

export const usedCategories = categoriesOf(posts)

/** The article body as nodes for `ArticleBody.svelte`. */
export function articleBody(post: Post) {
  const article = articles.find((entry) => entry.post.slug === post.slug)
  return article ? renderMarkdown(article.body, post.lang).nodes : []
}
