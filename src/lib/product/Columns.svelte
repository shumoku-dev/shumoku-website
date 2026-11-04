<script lang="ts">
  import type { Snippet } from 'svelte'

  /**
   * Three parallel items. The gutter is the layout gutter, so column edges fall on the 12-column
   * grid; each item's first child is media held to one ratio, so the headings below line up.
   */
  let { children }: { children: Snippet } = $props()
</script>

<div class="columns">{@render children()}</div>

<style>
  .columns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--layout-block) var(--layout-gutter);
  }
  .columns > :global(*) {
    min-width: 0;
  }
  .columns > :global(*) > :global(:first-child) {
    aspect-ratio: var(--layout-media-ratio);
    width: 100%;
    /* Without these the image's own height overrides the ratio. */
    min-height: 0;
    overflow: hidden;
  }
  .columns :global(h3) {
    margin: var(--layout-flow) 0 var(--ui-space-2);
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
