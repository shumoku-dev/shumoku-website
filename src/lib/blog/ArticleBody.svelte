<script lang="ts">
  import type { Locale } from '$lib/site'
  import ArticleImage from './ArticleImage.svelte'
  import Embed from './embeds/Embed.svelte'
  import { embedTag, type MarkdownNode } from './markdown'

  // Renders the nodes made by `markdown.server.ts`. Images and standalone URLs become components;
  // everything else is the HTML element the Markdown describes.
  let { nodes, slug, lang }: { nodes: MarkdownNode[]; slug: string; lang: Locale } = $props()
  const voidTags = new Set(['br', 'hr', 'img', 'input', 'wbr'])
</script>

{#snippet render(nodes: MarkdownNode[])}
  {#each nodes as node}
    {#if typeof node === 'string'}
      {node}
    {:else if node.tag === 'img'}
      <ArticleImage {slug} src={node.attrs?.src ?? ''} alt={node.attrs?.alt} />
    {:else if node.tag === embedTag}
      <Embed {slug} {lang} href={node.attrs?.href ?? ''} />
    {:else if voidTags.has(node.tag)}
      <svelte:element this={node.tag} {...node.attrs} />
    {:else}
      <svelte:element this={node.tag} {...node.attrs}
        >{@render render(node.children ?? [])}</svelte:element
      >
    {/if}
  {/each}
{/snippet}

<div class="article-body">{@render render(nodes)}</div>

<style>
  .article-body {
    display: grid;
    gap: var(--ui-space-6);
    line-height: 1.8;
    overflow-wrap: anywhere;
  }
  .article-body :global(h2) {
    margin-block-start: var(--ui-space-4);
    font-size: 1.25rem;
    line-height: 2rem;
    font-weight: 600;
  }
  .article-body :global(h3) {
    font-size: 1.125rem;
    font-weight: 600;
  }
  /* Consecutive images share one paragraph; stack them one per row. */
  .article-body :global(p:has(> .photo)) {
    display: grid;
    gap: var(--ui-space-6);
  }
  .article-body :global(ul) {
    list-style: disc;
    padding-inline-start: 1.5em;
  }
  .article-body :global(ol) {
    list-style: decimal;
    padding-inline-start: 1.5em;
  }
  /* Cards and players style their own links. */
  .article-body :global(:not(.embed) > a) {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .article-body :global(blockquote) {
    padding: var(--ui-space-4);
    background: var(--ui-surface);
  }
  /* Wide tables scroll inside the column instead of widening the page. */
  .article-body :global(table) {
    display: block;
    overflow-x: auto;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  .article-body :global(:is(th, td)) {
    padding: var(--ui-space-2) var(--ui-space-3);
    border-block-end: 1px solid var(--site-line);
    text-align: start;
  }
  .article-body :global(th) {
    font-weight: 600;
  }
  .article-body :global(pre) {
    padding: var(--ui-space-4);
    overflow: auto;
    border-radius: var(--ui-panel-radius);
  }
</style>
