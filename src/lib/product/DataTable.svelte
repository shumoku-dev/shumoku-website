<script lang="ts">
  import type { Row } from '$lib/content/product'

  let { head, rows }: { head: Row; rows: readonly Row[] } = $props()
</script>

<!-- The roles keep a table a table for assistive technology while it is displayed as a grid. -->
<div class="table-wrap">
  <!-- svelte-ignore a11y_no_redundant_roles -->
  <table role="table">
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <thead role="rowgroup">
      <!-- svelte-ignore a11y_no_redundant_roles -->
      <tr role="row">
        {#each head as cell (cell)}
          <th scope="col" role="columnheader">{cell}</th>
        {/each}
      </tr>
    </thead>
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <tbody role="rowgroup">
      {#each rows as row (row[0])}
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <tr role="row">
          {#each row as cell, index (index)}
            {#if index === 0}
              <th scope="row" role="rowheader">{cell}</th>
            {:else}
              <td role="cell">{cell}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Columns on the page's tracks, so tables on the same page line up with each other and the page. */
  .table-wrap,
  table,
  thead,
  tbody,
  tr {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
  }
  .table-wrap {
    overflow-x: auto;
  }
  table {
    font-size: 0.9375rem;
    line-height: 1.6;
  }
  th:first-child {
    grid-column: 1 / 3;
  }
  :is(th, td):nth-child(2) {
    grid-column: 3 / -1;
  }
  :is(th, td):nth-child(2):not(:last-child) {
    grid-column: 3 / 5;
  }
  :is(th, td):nth-child(3) {
    grid-column: 5 / -1;
  }
  tr {
    border-bottom: 1px solid var(--site-line);
  }
  thead tr {
    border-bottom-color: var(--site-control-line);
  }
  th,
  td {
    padding-block: var(--ui-space-3);
    text-align: start;
    vertical-align: top;
  }
  /* A cell may use the gutter after its tracks, so a term fits on one line where it can. */
  :is(th, td):not(:last-child) {
    margin-inline-end: calc(var(--layout-gutter) * -1);
    padding-inline-end: var(--ui-space-4);
  }
  thead th {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--site-muted);
  }
  tbody th {
    font-weight: 600;
  }
  td {
    color: var(--site-muted);
  }
  /* Below the page breakpoint a real table: its columns share out whatever width a phone has. */
  @container (max-width: 53.125rem) {
    .table-wrap {
      display: block;
    }
    table {
      display: table;
      width: 100%;
      border-collapse: collapse;
    }
    thead {
      display: table-header-group;
    }
    tbody {
      display: table-row-group;
    }
    tr {
      display: table-row;
    }
    th,
    td {
      display: table-cell;
      padding-inline-end: var(--ui-space-4);
    }
    tbody th {
      white-space: nowrap;
    }
  }
</style>
