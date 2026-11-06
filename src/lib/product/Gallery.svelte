<script lang="ts">
  import type { DiagramSize } from './diagrams'
  import { diagramUrl } from './diagrams'
  import Frame from './Frame.svelte'

  /** Real diagrams rendered at build time from example YAML. The first one gets the full width. */
  let { sizes, items }: { sizes: Record<string, DiagramSize>; items: Record<string, string> } =
    $props()
  const entries = $derived(Object.entries(items).filter(([key]) => sizes[key]))
</script>

<div class="gallery layout-sub">
  {#each entries as [key, caption], index (key)}
    <div class="item" class:wide={index === 0}>
      <!-- Build-time output of @shumoku/renderer-svg; see src/lib/product/gallery. -->
      <Frame
        variant="diagram"
        src={diagramUrl(key)}
        alt={caption}
        {caption}
        width={sizes[key]?.width}
        height={sizes[key]?.height}
        maxHeight={index === 0 ? '34rem' : '26rem'}
      />
    </div>
  {/each}
</div>

<style>
  .gallery {
    row-gap: var(--layout-gutter);
  }
  .item {
    grid-column: span 6;
  }
  .wide {
    grid-column: 1 / -1;
  }
  /* Below the page breakpoint: two side by side while there is room for both. */
  @container (min-width: 37rem) {
    .gallery {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    .item {
      grid-column: auto;
    }
    .wide {
      grid-column: 1 / -1;
    }
  }
</style>
