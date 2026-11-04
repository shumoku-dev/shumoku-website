<script lang="ts">
  /** Short answers, always visible: no disclosure to open, easy to scan. */
  let { items }: { items: readonly { q: string; a: string }[] } = $props()
</script>

<dl>
  {#each items as item (item.q)}
    <div>
      <dt>{item.q}</dt>
      <dd>{item.a}</dd>
    </div>
  {/each}
</dl>

<style>
  dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--layout-block) var(--layout-gutter);
    margin: 0;
  }
  dt {
    font-weight: 600;
    line-height: 1.6;
  }
  dd {
    margin: var(--ui-space-2) 0 0;
    color: var(--site-muted);
    line-height: 1.85;
  }
  @media (max-width: 850px) {
    dl {
      grid-template-columns: minmax(0, 1fr);
      row-gap: var(--layout-block);
    }
  }
</style>
