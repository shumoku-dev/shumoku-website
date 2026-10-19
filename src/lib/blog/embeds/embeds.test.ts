import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { embedUrls } from '../markdown.server'
import { cachedSlugs, embedImage, embedLock } from './lock'
import { playerProvider, players, youtubeVideo } from './providers'

const root = new URL('../../../content/blog/', import.meta.url)
const slugs = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

describe('standalone link detection', () => {
  it('embeds only bare URLs that are alone in a top-level paragraph', () => {
    const urls = embedUrls(
      [
        'https://example.com/bare',
        '',
        '<https://example.com/angle>',
        '',
        '[Label](https://example.com/label)',
        '',
        'Read https://example.com/inline in a sentence.',
        '',
        '- https://example.com/list',
        '',
        '> https://example.com/quote',
        '',
        '[Local](/ja/blog)',
      ].join('\n'),
    )
    expect(urls).toEqual(['https://example.com/bare', 'https://example.com/angle'])
  })
})

describe('player providers', () => {
  it('recognises the supported services', () => {
    expect(playerProvider('https://youtu.be/LD9rUmkCoRU')).toBe('youtube')
    expect(playerProvider('https://speakerdeck.com/user/talk')).toBe('speakerdeck')
    expect(playerProvider('https://www.docswell.com/s/user/ABC123-talk')).toBe('docswell')
    expect(playerProvider('https://github.com/shumoku-dev')).toBeUndefined()
  })
  it('reads YouTube IDs and start times', () => {
    expect(youtubeVideo('https://youtu.be/LD9rUmkCoRU?t=8410')).toEqual({
      id: 'LD9rUmkCoRU',
      start: 8410,
    })
    expect(youtubeVideo('https://www.youtube.com/watch?v=LD9rUmkCoRU&t=1h2m3s')?.start).toBe(3723)
    expect(youtubeVideo('https://www.youtube.com/shorts/LD9rUmkCoRU')?.id).toBe('LD9rUmkCoRU')
    expect(youtubeVideo('https://www.youtube.com/@OSPNjp')).toBeUndefined()
  })
})

describe('embed lockfiles', () => {
  it.each(slugs)('records every standalone URL of %s', (slug) => {
    const urls = embedUrls(readFileSync(new URL(`${slug}/index.md`, root), 'utf8'))
    // Run `bun run blog:embeds` after adding or removing a standalone URL.
    expect(Object.keys(embedLock(slug)).sort()).toEqual([...urls].sort())
  })
  it('keeps no cache for deleted articles', () => {
    for (const slug of cachedSlugs()) expect(slugs).toContain(slug)
  })
  it.each(slugs)('only frames allowed hosts and stored thumbnails in %s', (slug) => {
    for (const embed of Object.values(embedLock(slug))) {
      if (embed.type === 'player') {
        const url = new URL(embed.embedUrl)
        expect(url.protocol).toBe('https:')
        expect(players[embed.provider].embedHosts).toContain(url.hostname)
        expect(embed.ratio).toBeGreaterThan(0)
      }
      if (embed.image) expect(embedImage(slug, embed.image)).toBeTruthy()
    }
  })
})
