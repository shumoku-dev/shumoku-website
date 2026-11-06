<script lang="ts">
  import type { Snippet } from 'svelte'

  /** Parallel items, each a `Column`, on the page's tracks. */
  let { children }: { children: Snippet } = $props()
</script>

<div class="layout-sub">{@render children()}</div>
