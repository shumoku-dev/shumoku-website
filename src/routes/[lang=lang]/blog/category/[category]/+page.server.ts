import { error } from '@sveltejs/kit'
import { isCategory } from '$lib/blog/categories'
import { posts, usedCategories } from '$lib/blog/posts.server'
import { locales } from '$lib/site'
import type { EntryGenerator, PageServerLoad } from './$types'

export const prerender = true

// Only categories with articles get a page; empty categories stay 404.
export const entries: EntryGenerator = () =>
  usedCategories.flatMap((category) => locales.map((lang) => ({ lang, category })))

export const load: PageServerLoad = ({ params }) => {
  const { category } = params
  if (!isCategory(category) || !usedCategories.includes(category)) error(404, 'Category not found')
  return {
    category,
    posts: posts.filter((post) => post.category === category),
    usedCategories,
  }
}
