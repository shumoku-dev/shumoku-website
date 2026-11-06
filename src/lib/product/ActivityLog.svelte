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
      <p class="when">
        <time datetime={item.date}>{formatDate(item.date)}</time>
        <span>{item.date > today ? upcoming : kinds[item.kind]}</span>
      </p>
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
    grid-template-columns: repeat(6, minmax(0, 1fr));
    column-gap: var(--layout-gutter);
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
  @media (max-width: 650px) {
    li {
      grid-template-columns: minmax(0, 1fr);
    }
    .when,
    a {
      grid-column: auto;
    }
  }
</style>
