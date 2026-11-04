<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Action } from '$lib/content/product'
  import Actions from './Actions.svelte'

  /**
   * The base section for Home, Features and Integrations: claim → evidence → next step.
   * `split` puts the evidence beside the text; `stack` puts it below at full width.
   * Sections are separated by a rule, not alternating bands; `large` marks the few sections
   * that carry the page.
   */
  let {
    id,
    title,
    layout = 'split',
    large = false,
    plainActions = false,
    badge,
    actions = [],
    children,
    media,
  }: {
    id: string
    title: string
    layout?: 'split' | 'stack'
    large?: boolean
    /** Show every action as a text link, for a set of equal destinations. */
    plainActions?: boolean
    badge?: string
    actions?: readonly Action[]
    children?: Snippet
    media?: Snippet
  } = $props()
  // With the evidence below the text, the next step follows the evidence.
  const stacked = $derived(layout === 'stack' || !media)
</script>

<section class="product-section" aria-labelledby={id}>
  <div class="site-container layout-grid">
    <div class="text" class:span-text={!stacked} class:span-reading={stacked}>
      <h2 {id} class="site-section-title" class:large>
        {title}
        {#if badge}
          <span class="badge">{badge}</span>
        {/if}
      </h2>
      {#if children}
        <div class="body">{@render children()}</div>
      {/if}
      {#if actions.length && !stacked}
        <Actions {actions} plain={plainActions} />
      {/if}
    </div>
    {#if media}
      <div class="media" class:span-media={!stacked}>{@render media()}</div>
    {/if}
    {#if actions.length && stacked}
      <div><Actions {actions} plain={plainActions} /></div>
    {/if}
  </div>
</section>

<style>
  .product-section {
    padding-block: var(--layout-section);
    border-top: 1px solid var(--site-line);
  }
  .text {
    display: grid;
    gap: var(--layout-flow);
  }
  h2 {
    margin: 0 0 var(--ui-space-2);
    text-wrap: balance;
  }
  h2.large {
    font-weight: 700;
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    line-height: 1.25;
    letter-spacing: -0.03em;
  }
  /* Latin display tracking crowds kana; Japanese headings keep the site-wide palt setting. */
  h2:lang(ja) {
    letter-spacing: 0.02em;
    word-break: auto-phrase;
  }
  .badge {
    display: inline-block;
    margin-inline-start: var(--ui-space-3);
    padding: 0.125rem var(--ui-space-2);
    border: 1px solid var(--site-control-line);
    border-radius: var(--ui-radius);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0;
    vertical-align: 0.3em;
  }
  .text > :global(.actions) {
    margin-top: var(--layout-flow);
  }
  .body {
    display: grid;
    gap: var(--layout-flow);
    color: var(--site-muted);
    line-height: 1.85;
  }
  .body :global(p) {
    margin: 0;
    text-wrap: pretty;
  }
</style>
