/** @typedef {{ type: string, url?: string, value?: string, children?: Node[], data?: Record<string, any> }} Node */

/**
 * Marks external links that stand alone in a top-level paragraph, as Zenn does:
 *
 *   https://example.com/            -> card (or a video/slide embed, depending on the URL)
 *   [Label](https://example.com/)   -> card titled "Label"
 *
 * Links inside sentences, lists and quotes stay ordinary links. The paragraph becomes a `div` so the
 * card can hold block content, and the link is rendered by `ArticleLink.svelte` through the mdsvex
 * layout. mdsvex bundles remark-parse 8, so this walks the tree by hand instead of using newer
 * remark utilities.
 *
 * @param {{ collect?: (url: string) => void }} [options] Lets scripts and tests list the embeds.
 */
export default function remarkEmbeds(options = {}) {
  return (/** @type {Node} */ tree) => {
    for (const node of tree.children ?? []) {
      const link =
        node.type === 'paragraph' && node.children?.length === 1 ? node.children[0] : undefined
      if (link?.type !== 'link' || !link.url || !/^https?:\/\//.test(link.url)) continue
      const text = link.children?.map((child) => child.value ?? '').join('') ?? ''
      node.data = { ...node.data, hName: 'div', hProperties: { className: 'embed' } }
      link.data = {
        ...link.data,
        hProperties: {
          ...link.data?.hProperties,
          'data-embed': 'true',
          // A bare URL shows the page title; an explicit label wins over it.
          ...(text && text !== link.url ? { 'data-label': text } : {}),
        },
      }
      options.collect?.(link.url)
    }
  }
}
