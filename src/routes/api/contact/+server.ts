import type { ContactSignupResult } from '#lib/content/contact.ts'
import { isLocale } from '#lib/i18n/index.ts'
import { createRateLimiter, normalizeEmail, signUpContact } from '#lib/server/contact.ts'
import {
  RESEND_API_KEY,
  RESEND_CONTACT_SEGMENT_EN,
  RESEND_CONTACT_SEGMENT_JA,
} from '$app/env/private'
import type { RequestHandler } from './$types'

export const prerender = false

const allow = createRateLimiter(5, 10 * 60 * 1000)
const status: Record<ContactSignupResult, number> = {
  ok: 200,
  invalid: 400,
  limited: 429,
  error: 502,
}

/** Accepts the links-page form, with JavaScript (JSON reply) or without it (redirect back). */
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const form = await request.formData().catch(() => null)
  const lang = form?.get('lang')
  const locale = isLocale(lang) ? lang : 'en'
  const respond = (result: ContactSignupResult) =>
    request.headers.get('accept')?.includes('application/json')
      ? Response.json(
          { result },
          { status: status[result], headers: { 'cache-control': 'no-store' } },
        )
      : new Response(null, {
          status: 303,
          headers: { location: `/${locale}/connect?contact=${result}#contact` },
        })

  // Hidden field that only bots fill in. Pretend success so they learn nothing.
  if (form?.get('website')) return respond('ok')

  const email = normalizeEmail(form?.get('email'))

  if (!email) return respond('invalid')
  if (!allow(getClientAddress())) return respond('limited')

  const apiKey = RESEND_API_KEY
  const segments = { ja: RESEND_CONTACT_SEGMENT_JA, en: RESEND_CONTACT_SEGMENT_EN }

  if (!apiKey || !segments.ja || !segments.en) {
    console.error(
      'Contact signup is not configured: set RESEND_API_KEY, RESEND_CONTACT_SEGMENT_JA and RESEND_CONTACT_SEGMENT_EN',
    )
    return respond('error')
  }
  try {
    return respond(
      await signUpContact(email, locale, {
        apiKey,
        segments: { ja: segments.ja, en: segments.en },
      }),
    )
  } catch (error) {
    console.error('Contact signup failed', error)
    return respond('error')
  }
}
