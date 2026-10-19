#!/usr/bin/env bun
// Fetches blog embed data into src/lib/blog/embeds/cache/. The dev server and the build already do
// this for new URLs; use this to refresh entries (--refresh) or to resolve before committing.
// Pass slugs to limit the run.
import { fileURLToPath } from 'node:url'
import { syncEmbeds } from '../src/lib/blog/embeds/resolver.ts'

const args = process.argv.slice(2)
const slugs = args.filter((arg) => !arg.startsWith('--'))
const { failed } = await syncEmbeds({
  root: fileURLToPath(new URL('..', import.meta.url)),
  slugs: slugs.length ? slugs : undefined,
  refresh: args.includes('--refresh'),
})
if (failed.length) process.exitCode = 1
