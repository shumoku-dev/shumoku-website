import { categoriesOf, posts } from '$lib/blog/posts.server'
import { languageRedirect } from '$lib/i18n'
import { localizedPaths } from '$lib/localized-paths'
import type { RequestHandler } from './$types'

const paths = localizedPaths(
  posts.map((post) => post.slug),
  categoriesOf(posts),
)

// Ensure legacy paths reach the compatibility hook in Vercel's generated routing.
// A known page without a language prefix (e.g. /connect on a printed QR code) is sent to the
// visitor's language, like the home page. Unknown paths remain 404s; there is no SPA fallback.
export const GET: RequestHandler = ({ request, url }) =>
  paths.has(url.pathname)
    ? languageRedirect(request, url.pathname)
    : new Response('Not found', { status: 404 })
