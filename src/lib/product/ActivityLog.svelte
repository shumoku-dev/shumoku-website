<script lang="ts">
  import { formatDate } from '$lib/blog/post'
  import type { ActivityItem, ActivityKind } from '$lib/content/activity'

  /** A plain dated log of releases, articles and events, newest first. */
  let {
    items,
    kinds,
    upcoming,
    today,
  }: {
    items: readonly ActivityItem[]
    kinds: Record<ActivityKind, string>
    upcoming: string
    today: string
  } = $props()
</script>

<ol>
  {#each items as item (item.href)}
    <li>
      <time datetime={item.date}>{formatDate(item.date)}</time>
      <span class="kind">{item.date > today ? upcoming : kinds[item.kind]}</span>
      <a href={item.href}>{item.title}</a>
    </li>
  {/each}
</ol>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--site-line);
  }
  li {
    display: grid;
    grid-template-columns: 6.5rem 5rem minmax(0, 1fr);
    gap: var(--ui-space-3);
    align-items: baseline;
    padding-block: var(--ui-space-3);
    border-bottom: 1px solid var(--site-line);
  }
  time,
  .kind {
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
    color: var(--site-muted);
  }
  a {
    color: var(--site-fg);
    line-height: 1.6;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.25em;
  }
  a:hover {
    text-decoration-color: currentColor;
  }
  @media (max-width: 650px) {
    li {
      grid-template-columns: auto minmax(0, 1fr);
    }
    a {
      grid-column: 1 / -1;
    }
  }
</style>
