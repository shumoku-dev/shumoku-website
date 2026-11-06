<script lang="ts">
  /** Terms and what they mean, on the page's tracks: two columns of term, four of detail. */
  let { items }: { items: readonly { term: string; detail: string }[] } = $props()
</script>

<dl class="layout-sub">
  {#each items as item (item.term)}
    <div class="layout-sub">
      <dt>{item.term}</dt>
      <dd>{item.detail}</dd>
    </div>
  {/each}
</dl>

<style>
  dl {
    row-gap: 0;
    margin: 0;
    border-top: 1px solid var(--site-line);
  }
  div {
    row-gap: var(--ui-space-1);
    align-items: baseline;
    padding-block: var(--layout-flow);
    border-bottom: 1px solid var(--site-line);
  }
  dt {
    grid-column: span 2;
    font-weight: 600;
  }
  dd {
    grid-column: span 4;
    margin: 0;
    color: var(--site-muted);
    line-height: 1.7;
  }
  /* Below the page breakpoint: side by side while there is room for both. */
  @container (min-width: 37rem) {
    div {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    }
    dt,
    dd {
      grid-column: auto;
    }
  }
</style>
