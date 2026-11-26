<script lang="ts">
  /** Where Shumoku is used: the kind of site, then who, then what for. A name alone says little. */
  let {
    items,
    label,
  }: {
    items: readonly { scene: string; name: string; use: string; href?: string }[]
    label: string
  } = $props()
</script>

<ul aria-label={label}>
  {#each items as item (item.name)}
    <li>
      <span class="scene">{item.scene}</span>
      <strong>
        {#if item.href}
          <a href={item.href}>{item.name}</a>
        {:else}
          {item.name}
        {/if}
      </strong>
      <span class="use">{item.use}</span>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--site-line);
  }
  li {
    display: grid;
    gap: var(--ui-space-1);
    padding-block: var(--layout-flow);
    border-bottom: 1px solid var(--site-line);
    line-height: 1.7;
  }
  .scene {
    font-size: 0.8125rem;
  }
  strong {
    color: var(--site-fg);
    font-weight: 600;
  }
  a {
    color: inherit;
    text-decoration-line: underline;
    text-underline-offset: 0.2em;
  }
</style>
