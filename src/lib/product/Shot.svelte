<script lang="ts">
  import type { Picture } from 'vite-imagetools'

  /** A real product screenshot. A thin outline only: the screen is the evidence, not the frame. */
  let {
    src,
    alt,
    caption,
    sizes = '(max-width: 850px) calc(100vw - 2rem), 660px',
    loading = 'lazy',
    fetchpriority,
    fill = false,
    position = 'top center',
  }: {
    src: Picture
    alt: string
    caption?: string
    sizes?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high'
    /** Crop to the site's media ratio (from the top), so neighbouring media share a height. */
    fill?: boolean
    /** Which part of the image stays visible when `fill` crops it. */
    position?: string
  } = $props()
</script>

<figure class:fill style:--shot-position={position}>
  <div class="frame">
    <enhanced:img {src} {alt} {sizes} {loading} {fetchpriority} decoding="async" />
  </div>
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>

<style>
  figure {
    margin: 0;
    min-width: 0;
  }
  .frame {
    border: 1px solid var(--site-line);
    border-radius: 8px;
    overflow: hidden;
  }
  /* <enhanced:img> compiles to <picture><img>, which svelte-check cannot see. */
  .frame :global(img) {
    display: block;
    width: 100%;
    height: auto;
  }
  .fill .frame {
    box-sizing: border-box;
    aspect-ratio: var(--layout-media-ratio);
  }
  .fill .frame :global(picture),
  .fill .frame :global(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: var(--shot-position);
  }
  figcaption {
    margin-top: var(--ui-space-3);
    font-size: 0.8125rem;
    color: var(--site-muted);
  }
</style>
