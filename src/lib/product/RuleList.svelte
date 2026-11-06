<script lang="ts">
  /** A plain list separated by rules, for items that are read one by one rather than scanned as cards. */
  let { items, label }: { items: readonly string[]; label?: string } = $props()
</script>

<ul aria-label={label}>
  {#each items as item (item)}
    <li>{item}</li>
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
    padding-block: var(--layout-flow);
    border-bottom: 1px solid var(--site-line);
    line-height: 1.7;
  }
</style>
