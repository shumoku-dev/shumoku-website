import { error } from '@sveltejs/kit'
import { diagramNames, renderDiagram } from '$lib/product/diagrams.server'
import type { EntryGenerator, RequestHandler } from './$types'

// Build artifacts for <img>, not pages: deliberately absent from sitePages, so from the sitemap too.
export const prerender = true
export const entries: EntryGenerator = () => diagramNames().map((name) => ({ name }))

export const GET: RequestHandler = async ({ params }) => {
  const diagram = await renderDiagram(params.name)
  if (!diagram) error(404, 'Unknown diagram')
  return new Response(diagram.svg, { headers: { 'content-type': 'image/svg+xml; charset=utf-8' } })
}
