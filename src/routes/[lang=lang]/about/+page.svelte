<script lang="ts">
  import laptops from '$lib/assets/photos/meetup-1-laptops.webp?enhanced'
  import { pagesCopy } from '$lib/content/pages'
  import PageHeading from '$lib/layout/PageHeading.svelte'
  import PageMeta from '$lib/PageMeta.svelte'
  import ImageSlot from '$lib/product/ImageSlot.svelte'
  import Section from '$lib/product/Section.svelte'
  import Shot from '$lib/product/Shot.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(pagesCopy(data.lang).about)
</script>

<PageMeta title={t.title} description={t.description} />
<main id="main">
  <PageHeading title={t.title} description={t.description} />

  <Section id="map" title={t.map.title}>
    {#each t.map.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <dl class="conditions">
        {#each t.map.conditions as condition (condition.term)}
          <div>
            <dt>{condition.term}</dt>
            <dd>{condition.detail}</dd>
          </div>
        {/each}
      </dl>
    {/snippet}
  </Section>

  <Section id="name" title={t.name.title}>
    {#each t.name.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <p class="pull">
      {#each t.name.pull as line, index (line)}
        {#if index}
          <br>
        {/if}
        {line}
      {/each}
    </p>
    {#snippet media()}
      <ImageSlot label={t.name.slot} />
    {/snippet}
  </Section>

  <Section id="logo" title={t.logo.title}>
    {#each t.logo.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <figure class="logo"><img src="/logo-symbol.svg" alt={t.logo.alt} loading="lazy"></figure>
    {/snippet}
  </Section>

  <Section
    id="peace"
    title={t.peace.title}
    layout="stack"
    actions={t.peace.links}
    plainActions
    large
  >
    <p>{t.peace.lead}</p>
    {#snippet media()}
      <ul class="lines">
        {#each t.peace.lines as line (line)}
          <li>{line}</li>
        {/each}
      </ul>
    {/snippet}
  </Section>

  <Section id="about-community" title={t.community.title} actions={t.community.links} plainActions>
    <p>{t.community.body}</p>
    {#snippet media()}
      <Shot src={laptops} alt={t.community.alt} caption={t.community.alt} fill />
    {/snippet}
  </Section>
</main>

<style>
  .conditions {
    margin: 0;
    border-top: 1px solid var(--site-line);
  }
  .conditions div {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    column-gap: var(--layout-gutter);
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
  .pull {
    margin-top: var(--layout-flow);
    color: var(--site-fg);
    font-size: clamp(1.125rem, 1.8vw, 1.3125rem);
    font-weight: 600;
    line-height: 1.7;
  }
  .logo {
    display: grid;
    place-items: center;
    box-sizing: border-box;
    aspect-ratio: var(--layout-media-ratio);
    margin: 0;
    border: 1px solid var(--site-line);
    border-radius: 8px;
  }
  .logo img {
    width: 30%;
    height: auto;
  }
  .lines {
    display: grid;
    gap: var(--layout-flow);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: clamp(1.375rem, 3vw, 2.25rem);
    font-weight: 700;
    line-height: 1.4;
  }
  .lines li:lang(ja) {
    font-feature-settings: "palt";
    letter-spacing: 0.02em;
  }
  @media (max-width: 650px) {
    .conditions div {
      grid-template-columns: minmax(0, 1fr);
      row-gap: var(--ui-space-1);
    }
    dt,
    dd {
      grid-column: auto;
    }
  }
</style>
