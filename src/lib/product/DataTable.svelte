<script lang="ts">
  import type { Row } from '$lib/content/product'

  let { head, rows }: { head: Row; rows: readonly Row[] } = $props()
</script>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        {#each head as cell (cell)}
          <th scope="col">{cell}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row[0])}
        <tr>
          {#each row as cell, index (index)}
            {#if index === 0}
              <th scope="row">{cell}</th>
            {:else}
              <td>{cell}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9375rem;
    line-height: 1.6;
  }
  /* The second column starts on a grid line, so tables on the same page line up. */
  @media (min-width: 851px) {
    table {
      table-layout: fixed;
    }
    thead th:first-child {
      width: calc(2 * var(--layout-col) + 2 * var(--layout-gutter));
    }
  }
  th,
  td {
    padding: var(--ui-space-3) var(--ui-space-4) var(--ui-space-3) 0;
    border-bottom: 1px solid var(--site-line);
    text-align: start;
    vertical-align: top;
  }
  thead th {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--site-muted);
    border-bottom-color: var(--site-control-line);
  }
  tbody th {
    font-weight: 600;
    white-space: nowrap;
  }
  td {
    color: var(--site-muted);
  }
</style>
