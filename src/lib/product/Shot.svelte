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
  }: {
    src: Picture
    alt: string
    caption?: string
    sizes?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high'
    /** Fill the parent's box (cropping from the top) instead of keeping the image's own ratio. */
    fill?: boolean
  } = $props()
</script>

<figure class:fill>
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
    height: 100%;
  }
  .fill .frame :global(picture),
  .fill .frame :global(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  figcaption {
    margin-top: var(--ui-space-3);
    font-size: 0.8125rem;
    color: var(--site-muted);
  }
</style>
