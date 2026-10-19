import { describe, expect, it } from 'vitest'
import { renderMarkdown, splitFrontmatter } from './markdown.server'

describe('Markdown rendering', () => {
  it('splits YAML frontmatter from the body', () => {
    const { data, body } = splitFrontmatter('---\ntitle: "A"\nauthors: [akitoshi]\n---\n\nBody\n')
    expect(data).toEqual({ title: 'A', authors: ['akitoshi'] })
    expect(body.trim()).toBe('Body')
  })

  it('keeps Markdown as Markdown, not Svelte or HTML', () => {
    const { nodes } = renderMarkdown(
      'Use {name} and <script>alert(1)</script> [x](javascript:alert(1))',
    )
    expect(JSON.stringify(nodes)).toContain('{name}')
    expect(JSON.stringify(nodes)).not.toContain('script')
    expect(JSON.stringify(nodes)).not.toContain('javascript:')
  })

  it('renders GFM, images and standalone URLs as data', () => {
    const { nodes, embeds } = renderMarkdown(
      [
        '| a | b |',
        '| - | - |',
        '| 1 | 2 |',
        '',
        '![Alt](./images/photo.webp)',
        '',
        'https://example.com/',
      ].join('\n'),
    )
    const json = JSON.stringify(nodes)
    expect(json).toContain('"tag":"table"')
    expect(json).toContain('{"tag":"img","attrs":{"src":"./images/photo.webp","alt":"Alt"}}')
    expect(json).toContain('{"tag":"x-embed","attrs":{"href":"https://example.com/"}}')
    expect(embeds).toEqual(['https://example.com/'])
  })

  it('labels footnotes in the article language', () => {
    expect(JSON.stringify(renderMarkdown('a[^1]\n\n[^1]: b', 'ja').nodes)).toContain('脚注')
    expect(JSON.stringify(renderMarkdown('a[^1]\n\n[^1]: b', 'en').nodes)).toContain('Footnotes')
  })
})
