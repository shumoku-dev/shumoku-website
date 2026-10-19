<script lang="ts">
  import type { Picture } from 'vite-imagetools'

  let {
    href,
    title,
    site,
    image,
  }: { href: string; title: string; site?: string; image?: Picture } = $props()
  const host = $derived(new URL(href).hostname.replace(/^www\./, ''))
</script>

<a class="link-card" {href}>
  <span class="text">
    <span class="title">{title}</span>
    <span class="site">{site && site !== host ? `${site} · ${host}` : host} ↗</span>
  </span>
  {#if image}
    <span class="image">
      <enhanced:img src={image} alt="" sizes="(max-width: 650px) 5rem, 9rem" loading="lazy" />
    </span>
  {/if}
</a>

<style>
  .link-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    border: 1px solid var(--site-line);
    border-radius: var(--ui-panel-radius);
    overflow: hidden;
    color: var(--site-fg);
    text-decoration: none;
  }
  .link-card:hover {
    background: var(--ui-surface);
  }
  .link-card:focus-visible {
    outline: 2px solid var(--ui-focus);
    outline-offset: 2px;
  }
  .text {
    display: grid;
    align-content: center;
    gap: var(--ui-space-1);
    padding: var(--ui-space-3) var(--ui-space-4);
    min-width: 0;
  }
  .title {
    font-weight: 600;
    line-height: 1.5;
  }
  .site {
    overflow: hidden;
    color: var(--site-muted);
    font-size: 0.8125rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* og:image is usually 1.91:1; the card grows to that height rather than cropping it. */
  .image {
    width: 9rem;
    aspect-ratio: 1.91;
  }
  .image :global(picture) {
    display: contents;
  }
  .image :global(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 650px) {
    .image {
      width: 5rem;
      aspect-ratio: auto;
    }
  }
</style>
