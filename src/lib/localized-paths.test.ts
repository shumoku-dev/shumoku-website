import { describe, expect, it } from 'vitest'
import { localizedPaths } from './localized-paths'

describe('unprefixed localized paths', () => {
  const paths = localizedPaths(['meetup-1'], ['event-report'])
  it('includes site pages, articles and category listings', () => {
    for (const path of ['/connect', '/playground', '/blog', '/blog/meetup-1']) {
      expect(paths.has(path)).toBe(true)
    }
    expect(paths.has('/blog/category/event-report')).toBe(true)
  })
  it('excludes the home page and unknown paths', () => {
    expect(paths.has('')).toBe(false)
    expect(paths.has('/blog/not-real')).toBe(false)
    expect(paths.has('/api/contact')).toBe(false)
  })
})
