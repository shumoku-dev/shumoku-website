import { posts } from '$lib/blog/posts.server'
import { renderExample } from '$lib/product/example.server'
import type { PageServerLoad } from './$types'

export const prerender = true
export const entries = () => [{ lang: 'en' }, { lang: 'ja' }]
export const load: PageServerLoad = async () => ({
  diagrams: await renderExample(),
  recentPosts: posts.slice(0, 3),
})
