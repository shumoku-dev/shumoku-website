import { posts, usedCategories } from '$lib/blog/posts.server'
import type { PageServerLoad } from './$types'

export const prerender = true
export const entries = () => [{ lang: 'en' }, { lang: 'ja' }]

// Articles are listed in both locales; each one is shown in the language it was written in.
export const load: PageServerLoad = () => ({ posts, usedCategories })
