import type { Root } from 'mdast'
import { embedTag } from '../markdown.ts'

/**
 * A top-level paragraph that holds nothing but an external URL becomes an embed, as on Zenn:
 *
 *   https://youtu.be/...           -> player or link card
 *   [Label](https://example.com/)  -> stays an ordinary link
 *
 * Only bare URLs embed, so link text is never shown as a card title or caption. URLs inside sentences,
 * lists and quotes stay links too. remark-gfm turns the bare URL into a link before this runs.
 */
export default function remarkEmbeds() {
  return (tree: Root) => {
    for (const node of tree.children) {
      if (node.type !== 'paragraph' || node.children.length !== 1) continue
      const [link] = node.children
      if (link.type !== 'link' || !/^https?:\/\//.test(link.url)) continue
      const [text] = link.children
      if (link.children.length !== 1 || text.type !== 'text' || text.value !== link.url) continue
      node.data = { hName: embedTag, hProperties: { href: link.url }, hChildren: [] }
    }
  }
}
