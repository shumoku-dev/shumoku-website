#!/usr/bin/env bun
/**
 * Fails when something leaves the page grid. Runs against the built site, after `bun run build`.
 *
 * At 1280px it compares the left and right edges of what is actually visible (images, not the boxes
 * around them) with the 12 column lines the browser computed for the page. At 900 and 375px it
 * checks that the page does not scroll sideways. It drives headless Chrome over the DevTools
 * protocol, so it needs a Chrome on the machine but no dependency and no browser download. Set
 * CHROME_BIN if yours is not found.
 *
 *   bun scripts/check-layout.ts                  build must exist; serves it with `vite preview`
 *   bun scripts/check-layout.ts --base <url>     measures a server that is already running
 */
import { type ChildProcess, execFileSync, spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const locales = ['ja', 'en']
const pages = ['', 'features', 'integrations', 'support', 'community', 'about', 'blog', 'privacy']
const gridWidth = 1280
const overflowWidths = [900, 375]
/** Half a pixel: tight enough to see a 1px border pushing an image off its line. */
const tolerance = 0.5

/**
 * What may leave the grid, and why. Keep this short: a new entry means something is positioned by
 * its content rather than by the page. An entry that no longer matches anything fails the run, so
 * the list cannot go stale.
 */
const exceptions: Record<string, string> = {
  // Logos sit one after another in a text flow; only the first could be on a line.
  '.adopters img': 'inline logos: placed by the width of the logo before them',
  '.adopters a': 'links around those inline logos',
  '.source-list img': 'inline logos: placed by the width of the logo before them',
  // Inside the frame, the drawing is letterboxed. The frame itself is on the grid and is measured.
  '[data-frame="logo"] img': 'centred logo: the frame is measured instead',
  '[data-frame="diagram"] img': 'whole drawing letterboxed on white: the frame is measured instead',
  '.before-after img': 'two panes inside one frame: the frame is measured instead',
  // Text set inside a frame or a dark panel keeps the panel's padding.
  '[data-frame="diagram"] figcaption': 'caption inside the frame, with its padding',
  '[data-frame] .placeholder p': 'placeholder text inside the frame',
  '.code .diff': 'diff text inside the dark YAML panel, with its padding',
  // `<figcaption>` holds a label, a button and a status in a row, inside the panel's padding.
  '.command figcaption': 'label inside the dark command panel, with its padding',
}

/**
 * The placement rules in docs/architecture/expression.md, as [first column, last column]. Being on
 * some line is not enough for these: the split between text and evidence has to stay where it is.
 */
const placements: Record<string, [number, number]> = {
  '.span-text': [1, 5],
  '.span-media': [7, 12],
  '.span-reading': [1, 7],
  '.span-wide': [1, 9],
  '.span-label': [1, 4],
  '.span-story': [5, 11],
  '.hero .lead': [7, 12],
}

/** Runs in the page: scroll so lazy images load, then wait for them. */
async function loadEverything() {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
    scrollTo(0, y)
    await new Promise((resolve) => setTimeout(resolve, 30))
  }
  scrollTo(0, 0)
  await Promise.all(
    [...document.images].map((image) =>
      image.complete
        ? null
        : new Promise((resolve) => {
            image.onload = image.onerror = resolve
            setTimeout(resolve, 3000)
          }),
    ),
  )
  await document.fonts.ready
}

/** Runs in the page: returns every edge that is not on a column line. */
function measure(args: {
  exceptions: string[]
  placements: Record<string, [number, number]>
  tolerance: number
}) {
  const main = document.querySelector('main')
  const grid = main?.querySelector('.layout-grid') ?? (main?.matches('.layout-grid') ? main : null)
  if (!grid) return { problems: ['no .layout-grid in <main>'], used: [], images: 0, measured: 0 }
  const style = getComputedStyle(grid)
  const tracks = style.gridTemplateColumns.split(' ').map(Number.parseFloat)
  const gap = Number.parseFloat(style.columnGap)
  const problems: string[] = []
  if (tracks.length !== 12) problems.push(`the page grid has ${tracks.length} tracks, not 12`)
  const starts: number[] = []
  const ends: number[] = []
  let x = grid.getBoundingClientRect().left
  for (const track of tracks) {
    starts.push(x)
    ends.push(x + track)
    x += track + gap
  }
  const nearest = (value: number, lines: number[]) => {
    const index = lines.reduce(
      (best, line, i) => (Math.abs(line - value) < Math.abs((lines[best] ?? 0) - value) ? i : best),
      0,
    )
    return { index, distance: Math.abs((lines[index] ?? 0) - value) }
  }
  const name = (element: Element) => {
    const classes = [...element.classList].filter((c) => !c.startsWith('svelte-')).join('.')
    const text = (element.getAttribute('alt') || element.textContent || '').trim().slice(0, 24)
    return `<${element.tagName.toLowerCase()}${classes ? `.${classes}` : ''}> "${text}"`
  }
  const used = new Set<string>()
  const excepted = (element: Element) => {
    const match = args.exceptions.find((selector) => element.matches(selector))
    if (match) used.add(match)
    return Boolean(match)
  }
  const visible = (element: Element) => {
    const box = element.getBoundingClientRect()
    return box.width > 0 && box.height > 0 && getComputedStyle(element).visibility !== 'hidden'
  }
  const check = (element: Element, left: number, right: number | null) => {
    const start = nearest(left, starts)
    if (start.distance > args.tolerance) {
      problems.push(
        `${name(element)} left edge ${left.toFixed(1)} is ${start.distance.toFixed(1)}px from column ${start.index + 1}`,
      )
    }
    if (right === null) return
    const end = nearest(right, ends)
    if (end.distance > args.tolerance) {
      problems.push(
        `${name(element)} right edge ${right.toFixed(1)} is ${end.distance.toFixed(1)}px from column ${end.index + 1}`,
      )
    }
  }

  /** The drawn part of an image, not its box: an image can be letterboxed or inset by padding. */
  const painted = (image: HTMLImageElement) => {
    const box = image.getBoundingClientRect()
    const css = getComputedStyle(image)
    const left =
      box.left + Number.parseFloat(css.paddingLeft) + Number.parseFloat(css.borderLeftWidth)
    const right =
      box.right - Number.parseFloat(css.paddingRight) - Number.parseFloat(css.borderRightWidth)
    if (css.objectFit !== 'contain' || !image.naturalWidth) return { left, right }
    const top = box.top + Number.parseFloat(css.paddingTop)
    const bottom = box.bottom - Number.parseFloat(css.paddingBottom)
    const scale = Math.min(
      (right - left) / image.naturalWidth,
      (bottom - top) / image.naturalHeight,
    )
    const inset = (right - left - image.naturalWidth * scale) / 2
    return { left: left + inset, right: right - inset }
  }

  let images = 0
  let measured = 0
  for (const [selector, [first, last]] of Object.entries(args.placements)) {
    for (const element of main?.querySelectorAll(selector) ?? []) {
      const box = element.getBoundingClientRect()
      const wanted = [starts[first - 1] ?? 0, ends[last - 1] ?? 0]
      if (
        Math.abs(box.left - (wanted[0] ?? 0)) > args.tolerance ||
        Math.abs(box.right - (wanted[1] ?? 0)) > args.tolerance
      ) {
        problems.push(
          `${name(element)} ${selector} must span columns ${first} to ${last}, is at ${box.left.toFixed(1)} to ${box.right.toFixed(1)}`,
        )
      }
      measured++
    }
  }
  for (const image of main?.querySelectorAll('img') ?? []) {
    if (!visible(image)) continue
    images++
    const sameOrigin = new URL(image.currentSrc || image.src).origin === location.origin
    if (sameOrigin && !image.naturalWidth) problems.push(`${name(image)} did not load`)
    if (excepted(image)) continue
    const { left, right } = painted(image)
    check(image, left, right)
    measured++
  }
  // Boxes with a visible edge: both sides must be on a line.
  for (const box of main?.querySelectorAll('[data-frame], figure, pre, table, ol, ul, dl') ?? []) {
    if (!visible(box) || excepted(box)) continue
    const rect = box.getBoundingClientRect()
    check(box, rect.left, rect.right)
    measured++
  }
  // Text: its right edge is wherever the line ends, so only the left edge can be held to a line.
  for (const text of main?.querySelectorAll('h1, h2, h3, p, dt, dd, th, td, li > a, figcaption') ??
    []) {
    if (excepted(text) || !visible(text)) continue
    check(text, text.getBoundingClientRect().left, null)
    measured++
  }
  return { problems, used: [...used], images, measured }
}

/** Runs in the page: the width of what scrolls sideways, and the elements responsible. */
function overflow() {
  const width = document.documentElement.clientWidth
  const culprits = [...document.querySelectorAll('body *')]
    .filter((element) => {
      if (element.closest('.table-wrap, pre')) return false
      const box = element.getBoundingClientRect()
      return box.width > 0 && box.right > width + 1
    })
    .slice(0, 5)
    .map((element) => `<${element.tagName.toLowerCase()}.${[...element.classList].join('.')}>`)
  return { scrollWidth: document.documentElement.scrollWidth, width, culprits }
}

function findChrome() {
  const candidates = [
    process.env['CHROME_BIN'],
    'google-chrome-stable',
    'google-chrome',
    'chromium',
    'chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]
  for (const candidate of candidates) {
    if (!candidate) continue
    try {
      execFileSync(candidate, ['--version'], { stdio: 'ignore' })
      return candidate
    } catch {
      // Not this one.
    }
  }
  throw new Error('No Chrome found. Install one, or set CHROME_BIN to its path.')
}

const freePort = () =>
  new Promise<number>((resolve, reject) => {
    const server = createServer()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      server.close(() =>
        typeof address === 'object' && address
          ? resolve(address.port)
          : reject(new Error('no port')),
      )
    })
  })

async function waitFor<T>(what: string, attempt: () => Promise<T | undefined>) {
  for (let i = 0; i < 150; i++) {
    try {
      const result = await attempt()
      if (result) return result
    } catch {
      // Not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error(`Timed out waiting for ${what}`)
}

type Reply = { id?: number; result?: unknown; error?: { message: string } }
type Evaluated = {
  result: { value?: unknown; description?: string }
  exceptionDetails?: { exception?: { description?: string } }
}

async function connect(chromePort: number) {
  const target = await waitFor('Chrome', async () => {
    const response = await fetch(`http://127.0.0.1:${chromePort}/json`)
    const targets = (await response.json()) as { type: string; webSocketDebuggerUrl: string }[]
    return targets.find((candidate) => candidate.type === 'page')
  })
  const socket = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    socket.onopen = resolve
    socket.onerror = reject
  })
  let lastId = 0
  const pending = new Map<number, (reply: Reply) => void>()
  socket.onmessage = (message) => {
    const reply = JSON.parse(String(message.data)) as Reply
    if (reply.id && pending.has(reply.id)) {
      pending.get(reply.id)?.(reply)
      pending.delete(reply.id)
    }
  }
  const send = (method: string, params: object = {}) =>
    new Promise<unknown>((resolve, reject) => {
      const id = ++lastId
      pending.set(id, (reply) =>
        reply.error
          ? reject(new Error(`${method}: ${reply.error.message}`))
          : resolve(reply.result),
      )
      socket.send(JSON.stringify({ id, method, params }))
    })
  const evaluate = async <T>(expression: string) => {
    const evaluated = (await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })) as Evaluated
    if (evaluated.exceptionDetails) {
      throw new Error(evaluated.exceptionDetails.exception?.description ?? 'evaluation failed')
    }
    return evaluated.result.value as T
  }
  const resize = (width: number) =>
    send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })
  return { send, evaluate, resize, close: () => socket.close() }
}

async function main() {
  const baseArgument = process.argv.indexOf('--base')
  const children: ChildProcess[] = []
  const chrome = findChrome()
  const profile = mkdtempSync(join(tmpdir(), 'shumoku-layout-'))
  try {
    let base = baseArgument > 0 ? process.argv[baseArgument + 1] : undefined
    if (!base) {
      const port = await freePort()
      base = `http://127.0.0.1:${port}`
      children.push(
        spawn(
          'node_modules/.bin/vite',
          ['preview', '--host', '127.0.0.1', '--port', `${port}`, '--strictPort'],
          {
            cwd: new URL('..', import.meta.url),
            stdio: 'ignore',
          },
        ),
      )
      await waitFor('the preview server', async () => (await fetch(`${base}/ja`)).ok)
    }
    const chromePort = await freePort()
    children.push(
      spawn(
        chrome,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-first-run',
          '--no-default-browser-check',
          `--remote-debugging-port=${chromePort}`,
          `--user-data-dir=${profile}`,
          // Only the site itself: analytics and embeds must not decide the result.
          '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
          // GitHub's Ubuntu runners do not allow Chrome's sandbox.
          ...(process.env['CI'] ? ['--no-sandbox'] : []),
          'about:blank',
        ],
        { stdio: 'ignore' },
      ),
    )
    const browser = await connect(chromePort)
    await browser.send('Page.enable')

    const failures: string[] = []
    const used = new Set<string>()
    let totalImages = 0
    let totalMeasured = 0
    for (const locale of locales) {
      for (const page of pages) {
        const path = `/${locale}${page ? `/${page}` : ''}`
        await browser.resize(gridWidth)
        await browser.send('Page.navigate', { url: `${base}${path}` })
        await waitFor(`${path}`, () =>
          browser.evaluate<boolean>(
            `document.readyState === 'complete' && location.pathname === ${JSON.stringify(path)}`,
          ),
        )
        await browser.evaluate(`(${loadEverything})()`)
        const result = await browser.evaluate<{
          problems: string[]
          used: string[]
          images: number
          measured: number
        }>(
          `(${measure})(${JSON.stringify({ exceptions: Object.keys(exceptions), placements, tolerance })})`,
        )
        // A page where nothing was measured proves nothing.
        if (!result.measured) failures.push(`${path} @${gridWidth}: nothing measured`)
        for (const problem of result.problems) failures.push(`${path} @${gridWidth}: ${problem}`)
        for (const selector of result.used) used.add(selector)
        totalImages += result.images
        totalMeasured += result.measured
        for (const width of [gridWidth, ...overflowWidths]) {
          await browser.resize(width)
          const fit = await browser.evaluate<ReturnType<typeof overflow>>(`(${overflow})()`)
          if (fit.scrollWidth > fit.width) {
            failures.push(
              `${path} @${width}: the page scrolls sideways (${fit.scrollWidth} > ${fit.width}) ${fit.culprits.join(' ')}`,
            )
          }
        }
      }
    }
    for (const selector of Object.keys(exceptions)) {
      if (!used.has(selector)) failures.push(`stale exception, matched nothing: ${selector}`)
    }
    browser.close()

    const pageCount = locales.length * pages.length
    if (failures.length) {
      console.error(`Layout check failed: ${failures.length} problem(s)\n`)
      for (const failure of failures) console.error(`  ${failure}`)
      console.error('\nSee "レイアウトの基準" in docs/architecture/expression.md.')
      process.exitCode = 1
    } else {
      console.log(
        `Layout check passed: ${pageCount} pages, ${totalImages} images, ${totalMeasured} edges or boxes on the grid; no sideways scroll at ${[gridWidth, ...overflowWidths].join(', ')}px.`,
      )
    }
  } finally {
    for (const child of children) child.kill()
    await new Promise((resolve) => setTimeout(resolve, 200))
    rmSync(profile, { recursive: true, force: true })
  }
}

await main()
