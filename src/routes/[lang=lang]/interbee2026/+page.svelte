<script lang="ts">
  import demoTopology from '$lib/assets/interbee/demo-topology.png?enhanced'
  import { interbeeCopy, telhiUrl } from '$lib/content/interbee'
  import PageMeta from '$lib/PageMeta.svelte'
  import Frame from '$lib/product/Frame.svelte'
  import RuleList from '$lib/product/RuleList.svelte'
  import Section from '$lib/product/Section.svelte'
  import ContactSignup from '../connect/ContactSignup.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(interbeeCopy(data.lang))
</script>

<PageMeta title={t.meta.title} description={t.meta.description} />
<!--
  An exhibition page, not a second home page: it is where the INTER BEE MoIP flyer and the TelHi
  booth poster send visitors. Broadcast and Media over IP product pages in Japan (Sony Networked
  Live, Media Links) set their diagrams and equipment on dark ground under a light site header, so
  the page body uses the site's dark tokens whatever the visitor's theme is.
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
      <p>{t.lead}</p>
    </div>
    <nav class="layout-sub span-media places" aria-label={t.places.label}>
      <ul>
        {#each t.places.items as place (place.id)}
          <li>
            <a href={place.href}>
              <span class="place-where">{place.where}</span>
              <span class="place-name">{place.name}</span>
              <span class="place-detail">{place.detail}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>

  <Section id="moip" title={t.moip.title} layout="stack" large>
    {#each t.moip.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <Frame label={t.moip.overviewSlot} caption={t.moip.sites} />
      <div class="layout-sub detail-row">
        <div class="detail-shot"><Frame label={t.moip.detailSlot} /></div>
        <div class="detail-text">
          <RuleList items={t.moip.points} />
          <p>{t.moip.integrations}</p>
          <p class="note">{t.moip.note}</p>
        </div>
      </div>
    {/snippet}
  </Section>

  <Section id="features" title={t.features.title}>
    {#snippet media()}
      <RuleList items={t.features.items} label={t.features.title} />
    {/snippet}
  </Section>

  <Section id="booth" title={t.booth.title} actions={t.booth.actions}>
    {#each t.booth.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <Frame src={demoTopology} alt={t.booth.alt} caption={t.booth.caption} ratio="natural" />
    {/snippet}
  </Section>

  <Section id="setup" title={t.setup.title} actions={t.setup.actions} primaryAction large>
    <p>{t.setup.body}</p>
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
    font-size: clamp(2rem, 4.5vw, 3.25rem);
    font-weight: 700;
    line-height: 1.2;
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
  .places ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--site-line);
  }
  .places a {
    display: grid;
    gap: var(--ui-space-1);
    padding-block: var(--layout-flow);
    border-bottom: 1px solid var(--site-line);
  }
  .place-where {
    color: var(--site-muted);
    font-size: 0.8125rem;
  }
  .place-name {
    font-size: 1.25rem;
    font-weight: 700;
  }
  .places a:hover .place-name {
    color: var(--site-accent);
  }
  .place-detail {
    color: var(--site-muted);
    line-height: 1.7;
  }
  .detail-shot {
    grid-column: span 7;
  }
  .detail-text {
    grid-column: span 5;
    display: grid;
    gap: var(--layout-flow);
    align-content: start;
  }
  .detail-text p {
    color: var(--site-muted);
    line-height: 1.8;
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
