<script lang="ts">
  import type { Snippet } from 'svelte'

  /** One of three parallel items: a framed image, so the headings below line up, then its text. */
  let { title, body, media }: { title: string; body?: string; media: Snippet } = $props()
</script>

<div class="column">
  {@render media()}
  <h3>{title}</h3>
  {#if body}
    <p>{body}</p>
  {/if}
</div>

<style>
  .column {
    grid-column: span 4;
  }
  h3 {
    margin: var(--layout-flow) 0 var(--ui-space-2);
    font-size: 1.0625rem;
    font-weight: 600;
    line-height: 1.5;
  }
  p {
    color: var(--site-muted);
    line-height: 1.8;
  }
</style>
