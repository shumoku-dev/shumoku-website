<script lang="ts">
  import alert from '$lib/assets/screenshots/alert.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { interbeeCopy, telhiUrl } from '$lib/content/interbee'
  import PageMeta from '$lib/PageMeta.svelte'
  import Actions from '$lib/product/Actions.svelte'
  import Frame from '$lib/product/Frame.svelte'
  import RuleList from '$lib/product/RuleList.svelte'
  import Section from '$lib/product/Section.svelte'
  import ContactSignup from '../connect/ContactSignup.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(interbeeCopy(data.lang))
</script>

<PageMeta title={t.meta.title} description={t.meta.description} />
<main id="main">
  <div class="site-container layout-grid intro">
    <div class="span-reading">
      <h1>{t.title}</h1>
      <p>{t.lead}</p>
      <div class="next"><Actions actions={t.actions} primary /></div>
    </div>
  </div>

  <Section id="booth" title={t.booth.title}>
    {#each t.booth.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <Frame src={alert} alt={t.booth.alt} caption={t.booth.caption} position="center" />
    {/snippet}
  </Section>

  <Section id="map" title={t.map.title}>
    <p>{t.map.lead}</p>
    <RuleList items={t.map.items} label={t.map.title} />
    <p>{t.map.sources}</p>
    {#snippet media()}
      <Frame src={weathermap} alt={t.map.alt} />
    {/snippet}
  </Section>

  <Section id="partner" title={t.partner.title} actions={t.partner.actions} large>
    {#each t.partner.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <p class="note">{t.partner.independence}</p>
    {#snippet media()}
      <a class="partner-logo" href={telhiUrl} aria-label={t.partner.logo}>
        <Frame
          src="/images/partners/telhi.png"
          alt="輝日株式会社 telhi"
          variant="logo"
          width={787}
          height={193}
        />
      </a>
    {/snippet}
  </Section>

  <Section id="start" title={t.start.title} actions={t.start.actions} plainActions>
    <p>{t.start.body}</p>
  </Section>

  <Section id="community" title={t.community.title} actions={t.community.actions} plainActions>
    <p>{t.community.body}</p>
    {#snippet media()}
      <ContactSignup lang={data.lang} />
    {/snippet}
  </Section>
</main>

<style>
  .intro {
    padding-block: var(--layout-section) var(--layout-block);
  }
  .intro > div {
    display: grid;
    gap: var(--layout-flow);
  }
  h1 {
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.15;
    text-wrap: balance;
  }
  h1:lang(ja) {
    letter-spacing: 0.02em;
    word-break: auto-phrase;
  }
  h1:not(:lang(ja)) {
    letter-spacing: -0.035em;
  }
  .intro p {
    color: var(--site-muted);
    line-height: 1.85;
    text-wrap: pretty;
  }
  .next {
    margin-top: var(--layout-flow);
  }
  .note {
    font-size: 0.875rem;
  }
  .partner-logo {
    display: block;
    border-radius: var(--layout-media-radius);
  }
  .partner-logo:hover {
    background: var(--ui-surface);
  }
</style>
