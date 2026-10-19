import type { Plugin } from 'vite'
import { syncEmbeds } from './resolver.ts'

// `vite build` in SvelteKit runs more than one build and may load this config again for each, so
// unreachable URLs are remembered per process and tried only once.
const shared = globalThis as { __blogEmbedFailures?: Set<string> }
shared.__blogEmbedFailures ??= new Set()
const failures = shared.__blogEmbedFailures

const article = /[\\/]src[\\/]content[\\/]blog[\\/]([^\\/]+)[\\/]index\.md$/

/**
 * Keeps the embed cache in step with the articles, so authors only paste URLs:
 * - build: fetches URLs missing from the committed cache before bundling, so thumbnails still go
 *   through enhanced-img. Failures only warn; the page falls back to a plain card.
 * - dev: syncs an article when its index.md is saved or removed; Vite then reloads the cache glob.
 * Skipped under Vitest, which must not touch the network.
 */
export function blogEmbeds(): Plugin {
  let root = process.cwd()
  let serving = false
  let queue = Promise.resolve()
  // One sync at a time, so concurrent saves never write the same cache files together.
  const sync = (slugs?: string[]) => {
    queue = queue
      .then(async () => {
        const { failed } = await syncEmbeds({
          root,
          slugs,
          // The dev server retries on every save; a build tries each URL once.
          skip: serving ? undefined : failures,
          log: (message) => console.log(message),
        })
        for (const url of failed) {
          if (!failures.has(url))
            console.warn(`blog embeds: could not fetch ${url}; showing a plain card`)
          failures.add(url)
        }
      })
      .catch((error) => console.warn(`blog embeds: ${error}`))
    return queue
  }

  return {
    name: 'shumoku-blog-embeds',
    configResolved(config) {
      root = config.root
      serving = config.command === 'serve'
    },
    async buildStart() {
      if (process.env.VITEST) return
      // The dev server starts without waiting for the network; a build waits so it can bundle the result.
      if (serving) void sync()
      else await sync()
    },
    configureServer(server) {
      if (process.env.VITEST) return
      const onFile = (file: string) => {
        const slug = article.exec(file)?.[1]
        if (slug) void sync([slug])
      }
      server.watcher.on('add', onFile)
      server.watcher.on('change', onFile)
      // A deleted article only prunes its cache in a full run.
      server.watcher.on('unlink', (file) => {
        if (article.test(file)) void sync()
      })
    },
  }
}
