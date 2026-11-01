import { describe, expect, it, vi } from 'vitest'
import { createRateLimiter, normalizeEmail, signUpContact } from './contact'

const segments = { ja: 'segment-ja', en: 'segment-en' }

function resend(routes: Record<string, () => Response>) {
  const calls: { path: string; init: RequestInit }[] = []
  const fetch = vi.fn(async (url: string | URL | Request, init: RequestInit = {}) => {
    const path = String(url).replace('https://api.resend.com', '')
    calls.push({ path, init })
    const key = `${init.method ?? 'GET'} ${path}`
    const route = routes[key]
    if (!route) throw new Error(`Unexpected request ${key}`)
    return route()
  }) as unknown as typeof globalThis.fetch
  return { fetch, calls }
}

const json = (body: unknown, status = 200) => Response.json(body, { status })
const lookup = 'GET /contacts/someone%40example.com/segments'

describe('contact signup', () => {
  it('normalizes and validates addresses', () => {
    expect(normalizeEmail('  Someone@Example.com ')).toBe('someone@example.com')
    expect(normalizeEmail('not-an-address')).toBeNull()
    expect(normalizeEmail(`${'a'.repeat(250)}@x.io`)).toBeNull()
    expect(normalizeEmail(null)).toBeNull()
  })

  it('sends the greeting once and adds a new address to the segment', async () => {
    const api = resend({
      [lookup]: () => json({ statusCode: 404 }, 404),
      'POST /emails': () => json({ id: 'email' }),
      'POST /contacts': () => json({ id: 'contact' }, 201),
    })
    const options = { apiKey: 'key', segments, fetch: api.fetch }
    await expect(signUpContact('someone@example.com', 'ja', options)).resolves.toBe('ok')

    const email = api.calls.find((call) => call.path === '/emails')
    const message = JSON.parse(String(email?.init.body))
    expect(message.reply_to).toBe('Shumoku <contact@shumoku.dev>')
    expect(message.text).toContain('返信')
    expect(new Headers(email?.init.headers).get('idempotency-key')).toMatch(/^contact-greeting\//)
    const contact = api.calls.find((call) => call.path === '/contacts')
    expect(JSON.parse(String(contact?.init.body)).segments).toEqual([{ id: 'segment-ja' }])
  })

  it('does not email an address already in either language segment', async () => {
    const api = resend({ [lookup]: () => json({ data: [{ id: 'segment-ja' }] }) })
    const options = { apiKey: 'key', segments, fetch: api.fetch }
    await expect(signUpContact('someone@example.com', 'en', options)).resolves.toBe('ok')
    expect(api.calls).toHaveLength(1)
  })

  it('welcomes an existing contact from another segment', async () => {
    const api = resend({
      [lookup]: () => json({ data: [{ id: 'other' }] }),
      'POST /emails': () => json({ id: 'email' }),
      'POST /contacts': () => json({ id: 'contact' }, 201),
    })
    const options = { apiKey: 'key', segments, fetch: api.fetch }
    await expect(signUpContact('someone@example.com', 'en', options)).resolves.toBe('ok')
    expect(api.calls.map((call) => call.path)).toContain('/emails')
  })

  it('registers without a second email when the greeting was sent in the last day', async () => {
    const api = resend({
      [lookup]: () => json({ statusCode: 404 }, 404),
      'POST /emails': () => json({ name: 'invalid_idempotent_request' }, 409),
      'POST /contacts': () => json({ id: 'contact' }, 201),
    })
    const options = { apiKey: 'key', segments, fetch: api.fetch }
    await expect(signUpContact('someone@example.com', 'en', options)).resolves.toBe('ok')
    expect(api.calls.map((call) => call.path)).toContain('/contacts')
  })

  it('reports Resend failures', async () => {
    const api = resend({ [lookup]: () => json({}, 500) })
    const options = { apiKey: 'key', segments, fetch: api.fetch }
    await expect(signUpContact('someone@example.com', 'en', options)).rejects.toThrow()
  })

  it('limits bursts per key within the window', () => {
    let now = 0
    const allow = createRateLimiter(2, 1000, () => now)
    expect([allow('a'), allow('a'), allow('a'), allow('b')]).toEqual([true, true, false, true])
    now = 1000
    expect(allow('a')).toBe(true)
  })
})
