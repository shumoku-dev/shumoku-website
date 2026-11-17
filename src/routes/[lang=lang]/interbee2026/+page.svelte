<script lang="ts">
  import demoTopology from '$lib/assets/interbee/demo-topology.png?enhanced'
  import networkMap from '$lib/assets/interbee/network-map.png?enhanced'
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
  const fullWidth = '(max-width: 850px) calc(100vw - 2rem), 1120px'
</script>

<PageMeta title={t.meta.title} description={t.meta.description} />
<!--
  An exhibition page, not a second home page. Broadcast and Media over IP product pages in Japan
  (Sony Networked Live, Media Links) set their diagrams and equipment on dark ground under a light
  site header, and the booth demo itself runs on a dark UI, so the page body uses the site's dark
  tokens whatever the visitor's theme is.
-->
<main id="main" class="dark exhibition">
  <div class="site-container layout-grid intro">
    <dl class="event layout-sub" aria-label={t.event.label}>
      {#each t.event.items as item (item.term)}
        <div>
          <dt>{item.term}</dt>
          <dd>{item.detail}</dd>
        </div>
      {/each}
    </dl>
    <div class="span-text heading">
      <h1>{t.title}</h1>
      {#each t.lead as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
      <div class="next"><Actions actions={t.actions} primary /></div>
    </div>
    <div class="layout-sub span-media">
      <Frame
        src={demoTopology}
        alt={t.demo.alt}
        caption={t.demo.caption}
        ratio="natural"
        loading="eager"
        fetchpriority="high"
      />
    </div>
  </div>

  <Section id="about" title={t.about.title} layout="stack">
    <p>{t.about.body}</p>
    <RuleList items={t.about.features} label={t.about.title} />
    {#snippet media()}
      <Frame
        src={networkMap}
        alt={t.map.alt}
        caption={t.map.caption}
        ratio="natural"
        sizes={fullWidth}
      />
    {/snippet}
  </Section>

  <Section id="ip" title={t.ip.title} large>
    {#each t.ip.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <p class="note">{t.ip.scope}</p>
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
      <p class="credit">{t.partner.credit}</p>
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
  .exhibition {
    background: var(--site-bg);
    color: var(--site-fg);
  }
  .intro {
    padding-block: var(--layout-block) var(--layout-section);
  }
  /* Each item takes three of the twelve columns, so its text starts on a column line. */
  .event {
    margin: 0;
    padding-bottom: var(--ui-space-4);
    border-bottom: 1px solid var(--site-line);
    row-gap: var(--ui-space-2);
  }
  .event > div {
    grid-column: span 3;
    display: grid;
    gap: var(--ui-space-1);
  }
  /* Narrow: one item per line, label beside value. The sub-grid is a container only here. */
  @container (max-width: 52rem) {
    .event > div {
      display: flex;
      gap: var(--ui-space-3);
      align-items: baseline;
    }
  }
  dt {
    color: var(--site-muted);
    font-size: 0.8125rem;
  }
  dd {
    margin: 0;
    font-weight: 600;
    font-size: 0.9375rem;
  }
  .heading {
    display: grid;
    gap: var(--layout-flow);
  }
  h1 {
    margin-bottom: var(--ui-space-2);
    font-size: clamp(1.875rem, 4vw, 2.75rem);
    font-weight: 700;
    line-height: 1.25;
    text-wrap: balance;
  }
  h1:lang(ja) {
    letter-spacing: 0.02em;
    word-break: auto-phrase;
  }
  h1:not(:lang(ja)) {
    letter-spacing: -0.03em;
  }
  .heading p {
    color: var(--site-muted);
    line-height: 1.85;
    text-wrap: pretty;
  }
  .next {
    margin-top: var(--layout-flow);
  }
  .note,
  .credit {
    font-size: 0.875rem;
  }
  .credit {
    margin: 0;
    color: var(--site-muted);
  }
  .partner-logo {
    display: block;
    border-radius: var(--layout-media-radius);
    /* The logo's blue and red are drawn for a light ground. */
    background: #fbf8f3;
  }
</style>
