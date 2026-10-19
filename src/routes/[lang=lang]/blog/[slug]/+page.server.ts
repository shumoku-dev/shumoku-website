import { error } from '@sveltejs/kit'
import { articleBody, getPost, publishedPosts } from '$lib/blog/posts.server'
import { locales } from '$lib/site'
import type { EntryGenerator, PageServerLoad } from './$types'

export const prerender = true

export const entries: EntryGenerator = () =>
  publishedPosts.flatMap((post) => locales.map((lang) => ({ lang, slug: post.slug })))

export const load: PageServerLoad = ({ params }) => {
  const post = getPost(params.slug)
  if (!post) error(404, 'Article not found')
  return { post, body: articleBody(post) }
}
