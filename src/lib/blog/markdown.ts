/**
 * An article body as serializable data: text, or an HTML element with string attributes. The server
 * turns Markdown into this tree and `ArticleBody.svelte` renders it, so Markdown is never compiled as
 * Svelte source.
 */
export type MarkdownNode =
  | string
  | { tag: string; attrs?: Record<string, string>; children?: MarkdownNode[] }

/** Element that `remarkEmbeds` puts in place of a standalone URL. */
export const embedTag = 'x-embed'
