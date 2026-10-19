import type { ElementContent } from 'hast'
import { find, html } from 'property-information'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { parse as parseYaml } from 'yaml'
import type { Locale } from '$lib/site'
import remarkEmbeds from './embeds/remark'
import { embedTag, type MarkdownNode } from './markdown'

const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

/** Splits `index.md` into its YAML frontmatter and the Markdown body. */
export function splitFrontmatter(source: string): { data: unknown; body: string } {
  const match = frontmatter.exec(source)
  return match
    ? { data: parseYaml(match[1]), body: source.slice(match[0].length) }
    : { data: undefined, body: source }
}

const footnoteLabels = {
  ja: { footnoteLabel: '脚注', footnoteBackLabel: '本文に戻る' },
  en: { footnoteLabel: 'Footnotes', footnoteBackLabel: 'Back to content' },
} satisfies Record<Locale, object>

const unsafeUrl = /^\s*(?:javascript|vbscript|data):/i

/** hast to plain data. Raw HTML in Markdown is dropped by remark-rehype, and script URLs here. */
function toNode(node: ElementContent): MarkdownNode | undefined {
  if (node.type === 'text') return node.value
  if (node.type !== 'element') return undefined
  const attrs: Record<string, string> = {}
  for (const [key, value] of Object.entries(node.properties)) {
    if (value === undefined || value === null || value === false) continue
    const info = find(html, key)
    const text =
      value === true
        ? ''
        : Array.isArray(value)
          ? value.join(info.commaSeparated ? ', ' : ' ')
          : `${value}`
    if ((info.attribute === 'href' || info.attribute === 'src') && unsafeUrl.test(text)) continue
    attrs[info.attribute] = text
  }
  const children = node.children.flatMap((child) => toNode(child) ?? [])
  return {
    tag: node.tagName,
    ...(Object.keys(attrs).length > 0 && { attrs }),
    ...(children.length > 0 && { children }),
  }
}

function collectEmbeds(nodes: MarkdownNode[], urls: string[] = []) {
  for (const node of nodes) {
    if (typeof node === 'string') continue
    if (node.tag === embedTag && node.attrs?.href) urls.push(node.attrs.href)
    collectEmbeds(node.children ?? [], urls)
  }
  return urls
}

/** Renders a Markdown body (without frontmatter) into serializable nodes. */
export function renderMarkdown(body: string, lang: Locale = 'ja') {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkEmbeds)
    .use(remarkRehype, footnoteLabels[lang])
  const tree = processor.runSync(processor.parse(body))
  const nodes = tree.children.flatMap((child) =>
    child.type === 'doctype' ? [] : (toNode(child) ?? []),
  )
  return { nodes, embeds: [...new Set(collectEmbeds(nodes))] }
}

/** Standalone URLs of an article, for the embed resolver script and tests. */
export const embedUrls = (source: string) => renderMarkdown(splitFrontmatter(source).body).embeds
