<script lang="ts">
  import CommunityMontage from '$lib/community/CommunityMontage.svelte'
  import { photoUrl } from '$lib/community/photos'
  import { pagesCopy } from '$lib/content/pages'
  import PageMeta from '$lib/PageMeta.svelte'
  import Section from '$lib/product/Section.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(pagesCopy(data.lang).community)
</script>

{#snippet links(items: readonly { label: string; href: string }[])}
  <p class="links">
    {#each items as item (item.href)}
      <a href={item.href}>{item.label}</a>
    {/each}
  </p>
{/snippet}

<PageMeta title={t.title} description={t.description} image={photoUrl('group')} />
<main id="main">
  <div class="site-container layout-grid montage">
    <!-- Meetup #1 photos with the page's text set between the rows, on the site grid. -->
    <CommunityMontage locale={data.lang}>
      {#snippet introduction()}
        <section class="layout-sub" aria-labelledby="community-title">
          <h1 id="community-title" class="span-label">{t.title}</h1>
          <div class="story span-story"><p class="lead">{t.description}</p></div>
        </section>
      {/snippet}
      {#snippet events()}
        <section class="layout-sub" aria-labelledby="community-talk">
          <h2 id="community-talk" class="span-label">{t.talk.title}</h2>
          <div class="story span-story">
            <p>{t.talk.body}</p>
            {@render links(t.talk.links)}
          </div>
        </section>
      {/snippet}
      {#snippet discussion()}
        <section class="layout-sub" aria-labelledby="community-meetup">
          <h2 id="community-meetup" class="span-label">{t.meetup.title}</h2>
          <div class="story span-story">
            <p>{t.meetup.body}</p>
            {@render links(t.meetup.links)}
          </div>
        </section>
      {/snippet}
    </CommunityMontage>
  </div>

  <Section id="contribute" title={t.contribute.title} actions={t.contribute.links} plainActions>
    {#each t.contribute.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <p class="security">
      {t.contribute.security}
      <a href={t.contribute.securityLink.href}>{t.contribute.securityLink.label}</a>
    </p>
  </Section>

  <Section id="business" title={t.business.title} actions={t.business.links}>
    <p>{t.business.body}</p>
  </Section>
</main>

<style>
  .montage {
    padding-block: var(--layout-block) var(--layout-section);
  }
  h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.25;
  }
  h2 {
    margin: 0;
    font-size: clamp(1.5rem, 2.8vw, 2rem);
    font-weight: 600;
    line-height: 1.35;
  }
  .story {
    display: grid;
    gap: var(--layout-flow);
    color: var(--site-muted);
    line-height: 1.85;
  }
  .story p {
    margin: 0;
    text-wrap: pretty;
  }
  .lead {
    color: var(--site-fg);
    font-size: 1.125rem;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-2) var(--layout-block);
  }
  .links a,
  .security a {
    color: var(--site-fg);
    text-decoration: underline;
    text-decoration-color: var(--site-control-line);
    text-underline-offset: 0.25em;
  }
  .links a:hover,
  .security a:hover {
    color: var(--site-accent);
  }
</style>
