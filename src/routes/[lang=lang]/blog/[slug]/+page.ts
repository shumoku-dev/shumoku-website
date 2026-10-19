import { error } from '@sveltejs/kit'
import type { Component } from 'svelte'
import type { PageLoad } from './$types'

const bodies = import.meta.glob<Component>('/src/content/blog/*/index.md', { import: 'default' })

// The compiled Markdown component cannot be serialized, so it is imported in a universal load.
// https://svelte.dev/docs/kit/load#Universal-vs-server
export const load: PageLoad = async ({ data, params }) => {
  const Content = await bodies[`/src/content/blog/${params.slug}/index.md`]?.()
  if (!Content) error(404, 'Article not found')
  return { ...data, Content }
}
