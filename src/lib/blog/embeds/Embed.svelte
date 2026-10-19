<script lang="ts">
  import type { Locale } from '$lib/site'
  import LinkCard from './LinkCard.svelte'
  import { articleEmbed, embedImage } from './lock'
  import PlayerEmbed from './PlayerEmbed.svelte'

  // A standalone URL in an article. Until `bun run blog:embeds` records it, the card shows the URL.
  let { slug, lang, href }: { slug: string; lang: Locale; href: string } = $props()
  const embed = $derived(articleEmbed(slug, href))
  const image = $derived(embed?.image ? embedImage(slug, embed.image) : undefined)
</script>

<div class="embed">
  {#if embed?.type === 'player'}
    <PlayerEmbed
      {href}
      provider={embed.provider}
      title={embed.title}
      embedUrl={embed.embedUrl}
      ratio={embed.ratio}
      {image}
      {lang}
    />
  {:else}
    <LinkCard
      {href}
      title={embed?.title ?? href}
      site={embed?.type === 'card' ? embed.site : undefined}
      {image}
    />
  {/if}
</div>
