<script lang="ts">
  import { formatDate } from '$lib/blog/post'
  import type { ActivityItem, ActivityKind } from '$lib/content/activity'

  /** A plain dated log of releases, articles and events, newest first. */
  let {
    title,
    items,
    kinds,
    upcoming,
    today,
  }: {
    title: string
    items: readonly ActivityItem[]
    kinds: Record<ActivityKind, string>
    upcoming: string
    today: string
  } = $props()
</script>

<div class="layout-sub log">
  <h3>{title}</h3>
  <ol class="layout-sub">
    {#each items as item (item.href)}
      <li class="layout-sub">
        <p class="when">
          <time datetime={item.date}>{formatDate(item.date)}</time>
          <span>{item.date > today ? upcoming : kinds[item.kind]}</span>
        </p>
        <a href={item.href}>{item.title}</a>
      </li>
    {/each}
  </ol>
</div>

<style>
  .log {
    row-gap: var(--layout-flow);
  }
  h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--site-muted);
  }
  ol {
    row-gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--site-line);
  }
  li {
    row-gap: 0;
    align-items: baseline;
    padding-block: var(--ui-space-3);
    border-bottom: 1px solid var(--site-line);
  }
  .when {
    grid-column: span 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--ui-space-2);
    margin: 0;
  }
  time,
  .when span {
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
    color: var(--site-muted);
  }
  a {
    grid-column: span 4;
    color: var(--site-fg);
    line-height: 1.6;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.25em;
  }
  a:hover {
    text-decoration-color: currentColor;
  }
  /* Below the page breakpoint: side by side while there is room for both. */
  @container (min-width: 37rem) {
    li {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    }
    .when,
    a {
      grid-column: auto;
    }
  }
</style>
