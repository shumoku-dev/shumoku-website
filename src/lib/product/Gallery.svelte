<script lang="ts">
  /** Real diagrams rendered at build time from example YAML. The first one gets the full width. */
  let { diagrams, items }: { diagrams: Record<string, string>; items: Record<string, string> } =
    $props()
  const entries = $derived(Object.entries(items).filter(([key]) => diagrams[key]))
</script>

<div class="gallery">
  {#each entries as [key, caption], index (key)}
    <figure class:wide={index === 0}>
      <div class="svg" role="img" aria-label={caption}>
        <!-- Build-time output of @shumoku/renderer-svg; see src/lib/product/gallery. -->
        {@html diagrams[key]}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  {/each}
</div>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--layout-gutter);
  }
  figure {
    margin: 0;
    min-width: 0;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    border: 1px solid var(--site-line);
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
  }
  .wide {
    grid-column: 1 / -1;
  }
  .svg {
    display: grid;
    place-items: center;
    padding: var(--ui-space-4);
  }
  .svg :global(svg) {
    width: 100%;
    height: auto;
    max-height: 26rem;
  }
  .wide .svg :global(svg) {
    max-height: 34rem;
  }
  figcaption {
    padding: var(--ui-space-2) var(--ui-space-4);
    border-top: 1px solid var(--brand-neutral-100);
    font-size: 0.8125rem;
    color: var(--brand-neutral-600);
  }
  @media (max-width: 650px) {
    .gallery {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
