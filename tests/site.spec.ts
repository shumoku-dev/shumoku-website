import { expect, test } from '@playwright/test'

test('negotiates a localized entry point and serves public assets', async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ locale: 'ja-JP' })
  const page = await context.newPage()

  await page.goto('/')
  await expect(page).toHaveURL(/\/ja$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  await expect(page.locator('main')).toBeVisible()

  const logo = await request.get('/logo-symbol.svg')
  expect(logo.ok()).toBe(true)
  await context.close()
})

test('loads the public Playground', async ({ page }) => {
  await page.goto('/ja/playground')
  await expect(page).toHaveTitle(/Playground/)
  await expect(page.locator('main')).toBeVisible()
})

test('keeps compatibility redirects', async ({ request }) => {
  const response = await request.get('/playground', { maxRedirects: 0 })
  expect(response.status()).toBe(307)
  expect(response.headers().location).toBe('/en/playground')
})

test('rejects oversized layout requests before parsing', async ({ request }) => {
  const response = await request.post('/api/layout/compute', {
    data: 'x'.repeat(1_000_001),
    headers: { 'content-type': 'application/json' },
  })
  expect(response.status()).toBe(413)
})

test('rejects topologies above the computation limit', async ({ request }) => {
  const response = await request.post('/api/layout/compute', {
    data: {
      graph: {
        nodes: Array.from({ length: 1_001 }, (_, index) => ({ id: `node-${index}` })),
        links: [],
      },
    },
  })
  expect(response.status()).toBe(413)
})
