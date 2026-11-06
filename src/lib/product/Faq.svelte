<script lang="ts">
  /** Short answers, always visible: no disclosure to open, easy to scan. */
  let { items }: { items: readonly { q: string; a: string }[] } = $props()
</script>

<dl class="layout-sub">
  {#each items as item (item.q)}
    <div>
      <dt>{item.q}</dt>
      <dd>{item.a}</dd>
    </div>
  {/each}
</dl>

<style>
  dl {
    margin: 0;
  }
  div {
    grid-column: span 6;
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
</style>
