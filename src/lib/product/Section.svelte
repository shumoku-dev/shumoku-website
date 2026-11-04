<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Action } from '$lib/content/product'
  import Actions from './Actions.svelte'

  /**
   * One section shape for Home, Features and Integrations: claim → evidence → next step.
   * `split` puts the evidence beside the text; `stack` puts it below at full width.
   */
  let {
    id,
    title,
    layout = 'split',
    surface = false,
    badge,
    actions = [],
    children,
    media,
  }: {
    id: string
    title: string
    layout?: 'split' | 'stack'
    surface?: boolean
    badge?: string
    actions?: readonly Action[]
    children?: Snippet
    media?: Snippet
  } = $props()
  // With the evidence below the text, the next step follows the evidence.
  const stacked = $derived(layout === 'stack' || !media)
</script>

<section class="product-section" class:surface aria-labelledby={id}>
  <div class="site-container grid" class:stack={stacked}>
    <div class="text">
      <h2 {id} class="site-section-title">
        {title}
        {#if badge}
          <span class="badge">{badge}</span>
        {/if}
      </h2>
      {#if children}
        <div class="body">{@render children()}</div>
      {/if}
      {#if actions.length && !stacked}
        <Actions {actions} />
      {/if}
    </div>
    {#if media}
      <div class="media">{@render media()}</div>
    {/if}
    {#if actions.length && stacked}
      <Actions {actions} />
    {/if}
  </div>
</section>

<style>
  .product-section {
    padding-block: clamp(3rem, 7vw, 5.5rem);
  }
  .surface {
    background: var(--ui-surface);
  }
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: var(--ui-space-12);
    align-items: center;
  }
  .grid.stack {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--ui-space-8);
  }
  .text {
    min-width: 0;
    display: grid;
    gap: var(--ui-space-6);
    align-content: start;
  }
  .stack .text {
    max-width: 44rem;
  }
  h2 {
    margin: 0;
    text-wrap: balance;
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
  .body {
    display: grid;
    gap: var(--ui-space-4);
    color: var(--site-muted);
    line-height: 1.85;
  }
  .body :global(p) {
    margin: 0;
    text-wrap: pretty;
  }
  .media {
    min-width: 0;
  }
  @media (max-width: 850px) {
    .grid {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--ui-space-8);
    }
  }
</style>
