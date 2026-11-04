<script lang="ts">
  import type { Action } from '$lib/content/product'
  import LinkButton from '$lib/ui/LinkButton.svelte'

  /** The first action is the section's next step; the rest are quieter text links. */
  let { actions, plain = false }: { actions: readonly Action[]; plain?: boolean } = $props()
</script>

<div class="actions">
  {#each actions as action, index (action.href)}
    {#if index === 0 && !plain}
      <LinkButton href={action.href} class="outline">{action.label}</LinkButton>
    {:else}
      <a href={action.href}>{action.label}</a>
    {/if}
  {/each}
</div>

<style>
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-3) var(--ui-space-6);
  }
  a {
    color: var(--site-fg);
    font-size: 0.9375rem;
    text-decoration: underline;
    text-decoration-color: var(--site-control-line);
    text-underline-offset: 0.25em;
    padding-block: var(--ui-space-2);
  }
  a:hover {
    color: var(--site-accent);
  }
</style>
