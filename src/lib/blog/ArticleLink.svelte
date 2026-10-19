<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import { getArticle } from './context'
  import { articleEmbed, embedImage } from './embeds'
  import LinkCard from './LinkCard.svelte'
  import PlayerEmbed from './PlayerEmbed.svelte'

  // mdsvex renders every Markdown link through this component. `remark-embeds.js` marks standalone
  // links with data-embed; everything else stays an ordinary link.
  let {
    href = '',
    'data-embed': standalone,
    'data-label': label,
    children,
    ...rest
  }: Omit<HTMLAnchorAttributes, 'href'> & {
    href?: string
    'data-embed'?: string
    'data-label'?: string
    children?: Snippet
  } = $props()
  const article = getArticle()
  const embed = $derived(standalone ? articleEmbed(article().slug, href) : undefined)
  const image = $derived(embed?.image ? embedImage(article().slug, embed.image) : undefined)
</script>

{#if embed?.type === 'player'}
  <PlayerEmbed
    {href}
    provider={embed.provider}
    title={label ?? embed.title}
    embedUrl={embed.embedUrl}
    ratio={embed.ratio}
    {image}
    lang={article().lang}
  />
{:else if standalone}
  <!-- Until `bun run blog:embeds` records the page, the card shows the label or the URL. -->
  <LinkCard
    {href}
    title={label ?? embed?.title ?? href}
    description={embed?.description}
    site={embed?.site}
    {image}
  />
{:else}
  <a {href} {...rest}>{@render children?.()}</a>
{/if}
