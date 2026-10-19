import { getPost } from '$lib/blog/posts.server'
import type { PageServerLoad } from './$types'

export const prerender = true
export const entries = () => [{ lang: 'en' }, { lang: 'ja' }]
// The featured article is an editorial choice, not the newest post.
export const load: PageServerLoad = () => ({ featuredPost: getPost('meetup-1') })
