import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { communityPhotos, photoUrl as communityPhotoUrl, photoWidths } from '../community/photos'
import { articleImage } from './images'
import { parsePost } from './post'
import { getPost, posts, usedCategories } from './posts.server'

describe('Markdown articles', () => {
  it('discovers published articles', () => {
    expect(getPost('meetup-1')?.lang).toBe('ja')
    expect(posts.every((post) => !post.draft)).toBe(true)
    expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length)
    // Category pages exist exactly for categories that have articles.
    expect(new Set(usedCategories)).toEqual(new Set(posts.map((post) => post.category)))
  })
  it('does not find missing articles or traversal paths', () => {
    expect(getPost('missing')).toBeUndefined()
    expect(getPost('../meetup-1')).toBeUndefined()
  })
  it('validates metadata, dates and draft flags', () => {
    const valid = {
      title: 'Example',
      description: 'Description',
      published: '2026-09-10',
      category: 'event',
      authors: ['akitoshi'],
    }
    expect(parsePost('example', valid)).toMatchObject({ lang: 'ja', draft: false })
    expect(parsePost('example', { ...valid, draft: true }).draft).toBe(true)
    expect(parsePost('example', { ...valid, updated: '2026-09-12' }).updated).toBe('2026-09-12')
    expect(() => parsePost('Example_1', valid)).toThrow()
    for (const invalid of [
      { ...valid, title: '' },
      { ...valid, published: '2026-02-30' },
      { ...valid, published: new Date() },
      { ...valid, published: undefined },
      { ...valid, updated: '2026-09-01' },
      { ...valid, updated: '2026-9-12' },
      { ...valid, category: undefined },
      { ...valid, category: 'イベント開催記' },
      { ...valid, category: 'toString' },
      { ...valid, authors: undefined },
      { ...valid, authors: [] },
      { ...valid, authors: 'akitoshi' },
      { ...valid, authors: ['someone'] },
      { ...valid, authors: ['akitoshi', 'akitoshi'] },
      { ...valid, draft: 'false' },
      { ...valid, lang: 'xx' },
      { ...valid, image: './images/cover.webp' },
      { ...valid, image: '/cover.webp', imageAlt: 'Cover' },
    ])
      expect(() => parsePost('example', invalid)).toThrow()
  })
  it('resolves colocated images and reports missing files', () => {
    expect(articleImage('meetup-1', './images/group.webp').img.src).toBeTruthy()
    expect(() => articleImage('meetup-1', './images/missing.webp')).toThrow('Missing article image')
    for (const post of posts)
      if (post.image) expect(articleImage(post.slug, post.image)).toBeTruthy()
  })
})

describe('Independent photo collections', () => {
  it('keeps article text and photo choices in one ordinary Markdown file', () => {
    const markdown = readFileSync(
      new URL('../../content/blog/meetup-1/index.md', import.meta.url),
      'utf8',
    )
    expect(markdown).not.toMatch(/<script|PhotoGallery|import /)
    expect(markdown).toContain('./images/laptops.webp')
    const images = [...markdown.matchAll(/!\[([^\]]+)\]\(([^)]+)\)/g)]
    expect(images).toHaveLength(10)
    for (const image of images) {
      expect(image[1].length).toBeGreaterThan(0)
      expect(image[2]).toMatch(/^\.\/images\//)
      expect(existsSync(new URL(`../../content/blog/meetup-1/${image[2]}`, import.meta.url))).toBe(
        true,
      )
      expect(articleImage('meetup-1', image[2])).toBeTruthy()
    }
  })
  it('keeps Community selection and files independent', () => {
    expect(new Set(communityPhotos).size).toBe(communityPhotos.length)
    expect(communityPhotos).not.toContain('laptops')
    for (const id of communityPhotos) {
      for (const width of photoWidths) {
        const url = communityPhotoUrl(id, width)
        expect(url).toMatch(/^\/images\/community\//)
        expect(existsSync(new URL(`../../../static${url}`, import.meta.url))).toBe(true)
      }
    }
  })
})
