<script lang="ts">
  import type { Picture } from 'vite-imagetools'

  /** A real product screenshot in the home nested frame (16px outer, 10px inset, 6px inner). */
  let {
    src,
    alt,
    caption,
    sizes = '(max-width: 850px) calc(100vw - 2rem), 660px',
    loading = 'lazy',
    fetchpriority,
  }: {
    src: Picture
    alt: string
    caption?: string
    sizes?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high'
  } = $props()
</script>

<figure>
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
    padding: 10px;
    background: var(--ui-workspace-shell);
    border-radius: 16px;
  }
  /* <enhanced:img> compiles to <picture><img>, which svelte-check cannot see. */
  .frame :global(img) {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
  figcaption {
    margin-top: var(--ui-space-3);
    font-size: 0.8125rem;
    color: var(--site-muted);
  }
</style>
