import { languageRedirect } from '$lib/i18n'
import type { RequestHandler } from './$types'

export const prerender = false
export const GET: RequestHandler = ({ request }) => languageRedirect(request)
export const HEAD = GET
