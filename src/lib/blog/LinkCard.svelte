<script lang="ts">
  import type { Picture } from 'vite-imagetools'

  let {
    href,
    title,
    description,
    site,
    image,
  }: { href: string; title: string; description?: string; site?: string; image?: Picture } =
    $props()
  const host = $derived(new URL(href).hostname.replace(/^www\./, ''))
</script>

<a class="link-card" {href}>
  <span class="text">
    <span class="title">{title}</span>
    {#if description}
      <span class="description">{description}</span>
    {/if}
    <span class="site">{site && site !== host ? `${site} · ${host}` : host} ↗</span>
  </span>
  {#if image}
    <span class="image">
      <enhanced:img src={image} alt="" sizes="(max-width: 650px) 6rem, 12rem" loading="lazy" />
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
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    color: var(--site-muted);
    font-size: 0.875rem;
    line-height: 1.6;
  }
  .site {
    overflow: hidden;
    color: var(--site-muted);
    font-size: 0.8125rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .image {
    width: 12rem;
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
      width: 6rem;
    }
    .description {
      display: none;
    }
  }
</style>
