<script lang="ts">
  import type { Picture } from 'vite-imagetools'

  // Inline elements only: Markdown places images inside a paragraph.
  let {
    src,
    alt,
    href = src.img.src,
    sizes = '(max-width: 650px) 100vw, 66vw',
    loading = 'lazy',
  }: {
    src: Picture
    alt: string
    href?: string
    sizes?: string
    loading?: 'lazy' | 'eager'
  } = $props()
</script>

<span class="photo">
  <a {href} aria-label={alt}>
    <enhanced:img {src} {alt} {sizes} {loading} decoding="async" />
  </a>
  {#if alt}
    <span class="caption">{alt}</span>
  {/if}
</span>

<style>
  .photo {
    display: block;
    min-width: 0;
  }
  a {
    display: block;
    overflow: hidden;
    border-radius: var(--ui-panel-radius);
  }
  a:focus-visible {
    outline: 2px solid var(--ui-focus);
    outline-offset: var(--ui-space-1);
  }
  a :global(picture) {
    display: contents;
  }
  a :global(img) {
    display: block;
    width: 100%;
    height: auto;
  }
  .caption {
    display: block;
    margin-block-start: var(--ui-space-2);
    color: var(--site-muted);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }
</style>
