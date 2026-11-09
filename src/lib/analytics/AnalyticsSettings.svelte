<script lang="ts">
  import Button from '$lib/ui/Button.svelte'

  let { locale }: { locale: 'en' | 'ja' } = $props()
  let busy = $state(false)
  let failed = $state(false)
  async function open() {
    busy = true
    failed = false
    try {
      const client = await import('./client')
      await client.openAnalyticsPreferences()
    } catch {
      failed = true
    } finally {
      busy = false
    }
  }
</script>
<Button variant="ghost" class="text-button" onclick={open} disabled={busy}>
  {locale === 'ja' ? 'アクセス解析の設定' : 'Analytics preferences'}
</Button>
{#if failed}
  <span role="status"
    >{locale === 'ja' ? '読み込めませんでした。もう一度お試しください。' : 'Unable to load. Please try again.'}</span
  >
{/if}
<style>
  /* Sits among text links in the footer and on Privacy: no inset, so its text lines up with them. */
  :global(.ui-control.text-button) {
    padding-inline: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 400;
    background: transparent;
    text-underline-offset: 0.25em;
  }
  :global(.ui-control.text-button:hover) {
    text-decoration: underline;
  }
  span {
    display: block;
    font-size: 0.875rem;
  }
</style>
