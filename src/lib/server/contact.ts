import { createHash } from 'node:crypto'
import { type ContactSignupResult, contactGreeting, contactSender } from '$lib/content/contact'
import type { Locale } from '$lib/i18n'

const resendApi = 'https://api.resend.com'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  return email.length <= 254 && emailPattern.test(email) ? email : null
}

/** Best-effort limiter. Serverless instances do not share memory, so this only slows bursts. */
export function createRateLimiter(limit: number, windowMs: number, now = () => Date.now()) {
  const hits = new Map<string, number[]>()
  return (key: string) => {
    const current = now()
    for (const [k, times] of hits) {
      if (times.every((time) => current - time >= windowMs)) hits.delete(k)
    }
    const recent = (hits.get(key) ?? []).filter((time) => current - time < windowMs)
    if (recent.length >= limit) return false
    hits.set(key, [...recent, current])
    return true
  }
}

interface ResendConfig {
  apiKey: string
  /** One Resend segment per language so Broadcasts can be written natively for each. */
  segments: Record<Locale, string>
  fetch?: typeof fetch
}

/**
 * Adds the address to the segment for the page language and sends the greeting once.
 * An address already in either Shumoku segment gets no second email, so the form
 * cannot be used to send repeated mail to someone else.
 */
export async function signUpContact(
  email: string,
  locale: Locale,
  { apiKey, segments, fetch: request = fetch }: ResendConfig,
): Promise<ContactSignupResult> {
  const call = (path: string, init: RequestInit = {}) =>
    request(`${resendApi}${path}`, {
      ...init,
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
        ...init.headers,
      },
    })

  const membership = await call(`/contacts/${encodeURIComponent(email)}/segments`)
  if (membership.ok) {
    const { data } = (await membership.json()) as { data?: { id: string }[] }
    const shumoku = Object.values(segments)
    if (data?.some((segment) => shumoku.includes(segment.id))) return 'ok'
  } else if (membership.status !== 404) {
    throw new Error(`Resend contact lookup failed: ${membership.status}`)
  }

  // Send first: the idempotency key prevents a duplicate if the contact step fails and is retried.
  const greeting = contactGreeting[locale]
  const sent = await call('/emails', {
    method: 'POST',
    headers: {
      'idempotency-key': `contact-greeting/${createHash('sha256').update(email).digest('hex')}`,
    },
    body: JSON.stringify({
      from: contactSender,
      to: [email],
      reply_to: contactSender,
      subject: greeting.subject,
      text: greeting.text,
    }),
  })
  // 409: this key was already used in the last 24 hours with a different body (another language
  // or edited copy). The address was greeted recently, so register it without a second email.
  if (!sent.ok && sent.status !== 409) {
    if (sent.status === 422) return 'invalid'
    throw new Error(`Resend email failed: ${sent.status}`)
  }

  const created = await call('/contacts', {
    method: 'POST',
    body: JSON.stringify({ email, segments: [{ id: segments[locale] }] }),
  })
  if (!created.ok) throw new Error(`Resend contact creation failed: ${created.status}`)
  return 'ok'
}
