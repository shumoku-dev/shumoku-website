<script module lang="ts">
  // mdsvex replaces Markdown elements with the components exported here.
  import img from './ArticleImage.svelte'
  import a from './embeds/ArticleLink.svelte'

  export { a, img }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'

  // mdsvex also passes the frontmatter as props; the route renders it from load data instead.
  let { children }: { children?: Snippet } = $props()
</script>

<div class="article-body">{@render children?.()}</div>

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
  /* Cards and players (inside .embed) style their own links. */
  .article-body :global(:not(.embed) > a) {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .article-body :global(blockquote) {
    padding: var(--ui-space-4);
    background: var(--ui-surface);
  }
  .article-body :global(pre) {
    padding: var(--ui-space-4);
    overflow: auto;
    border-radius: var(--ui-panel-radius);
  }
</style>
