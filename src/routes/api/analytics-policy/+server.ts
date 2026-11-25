import { analyticsPolicy } from '#lib/analytics/policy.ts'
import { VERCEL, VERCEL_ENV } from '$app/env/private'
import type { RequestHandler } from './$types'

export const prerender = false
export const GET: RequestHandler = ({ request }) => {
  const production = VERCEL === '1' && VERCEL_ENV === 'production'
  const country = production ? request.headers.get('x-vercel-ip-country') : null
  return Response.json(analyticsPolicy(country, production), {
    headers: {
      'cache-control': 'private, no-store',
      'cdn-cache-control': 'no-store',
      'vercel-cdn-cache-control': 'no-store',
      vary: 'x-vercel-ip-country',
    },
  })
}
