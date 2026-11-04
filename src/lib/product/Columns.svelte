<script lang="ts">
  import type { Snippet } from 'svelte'

  /** Up to three parallel items, such as the scenes or the ways to start. Not cards: no borders. */
  let { children }: { children: Snippet } = $props()
</script>

<div class="columns">{@render children()}</div>

<style>
  .columns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--ui-space-8) var(--ui-space-8);
  }
  .columns :global(h3) {
    margin: var(--ui-space-4) 0 var(--ui-space-2);
    font-size: 1.0625rem;
    font-weight: 600;
    line-height: 1.5;
  }
  .columns :global(p) {
    margin: 0;
    color: var(--site-muted);
    line-height: 1.8;
  }
  @media (max-width: 850px) {
    .columns {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
