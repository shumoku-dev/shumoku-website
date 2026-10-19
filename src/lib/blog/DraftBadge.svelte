<script lang="ts">
  import type { Locale } from '$lib/site'

  // Drafts are only listed on the dev server; the badge keeps them from passing as published.
  let { lang }: { lang: Locale } = $props()
</script>

<span class="draft" {lang}>{lang === 'ja' ? '下書き' : 'Draft'}</span>

<style>
  .draft {
    display: inline-block;
    padding-inline: var(--ui-space-2);
    border: 1px dashed currentColor;
    border-radius: var(--ui-radius);
    color: var(--site-accent);
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
</style>
