<script lang="ts">
  import dashboard from '$lib/assets/screenshots/dashboard.png?enhanced'
  import share from '$lib/assets/screenshots/share.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import PageMeta from '$lib/PageMeta.svelte'
  import Actions from '$lib/product/Actions.svelte'
  import Adopters from '$lib/product/Adopters.svelte'
  import Columns from '$lib/product/Columns.svelte'
  import HomeHero from '$lib/product/HomeHero.svelte'
  import ImageSlot from '$lib/product/ImageSlot.svelte'
  import ModelDemo from '$lib/product/ModelDemo.svelte'
  import RecentPosts from '$lib/product/RecentPosts.svelte'
  import Section from '$lib/product/Section.svelte'
  import Shot from '$lib/product/Shot.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const lang = $derived(data.lang)
  const t = $derived(productCopy(lang).home)
  const columnSizes = '(max-width: 850px) calc(100vw - 2rem), 360px'
  const sources = [
    { name: 'NetBox', src: '/integrations/netbox.svg' },
    { name: 'Zabbix', src: '/integrations/zabbix.svg' },
    { name: 'Prometheus', src: '/integrations/prometheus.svg' },
    { name: 'Grafana', src: '/integrations/grafana.svg' },
  ]
</script>

<PageMeta title={t.meta.title} description={t.meta.description} />
<main id="main" class="flex-1">
  <HomeHero locale={lang} />

  <section class="why" aria-labelledby="why-title">
    <div class="site-container why-grid">
      <h2 id="why-title">{t.why.title}</h2>
      <div class="why-body">
        {#each t.why.body as paragraph (paragraph)}
          <p>{paragraph}</p>
        {/each}
        <a href={t.why.action.href}>{t.why.action.label}</a>
      </div>
    </div>
  </section>

  <Section id="scenes" title={t.scenes.title} layout="stack" actions={[t.scenes.action]} surface>
    {#snippet media()}
      <Columns>
        {#each t.scenes.items as item, index (item.title)}
          <div>
            {#if index === 0}
              <ImageSlot label={t.scenes.slot} ratio="3 / 2" />
            {:else}
              <Shot
                src={index === 1 ? weathermap : share}
                alt={index === 1 ? t.scenes.loadAlt : t.scenes.shareAlt}
                sizes={columnSizes}
              />
            {/if}
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        {/each}
      </Columns>
    {/snippet}
  </Section>

  <Section id="adoption" title={t.adoption.title}>
    <p>{t.adoption.body}</p>
    <Adopters label={t.adoption.adoptersLabel} />
    {#snippet media()}
      <Shot src={dashboard} alt={t.adoption.imageAlt} caption={t.adoption.caption} />
    {/snippet}
  </Section>

  <Section id="model" title={t.model.title} layout="stack" actions={[t.model.action]} surface>
    {#each t.model.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <ModelDemo
        diagrams={data.diagrams}
        legend={t.model.switchLabel}
        generated={t.model.generated}
        diagramAlt={t.model.diagramAlt}
      />
    {/snippet}
  </Section>

  <Section id="integrations" title={t.integrations.title} actions={[t.integrations.action]}>
    {#each t.integrations.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <ul class="sources">
      {#each sources as source (source.name)}
        <li><img src={source.src} alt="" loading="lazy">{source.name}</li>
      {/each}
    </ul>
  </Section>

  <Section id="open-source" title={t.openSource.title} actions={t.openSource.actions} surface>
    {#each t.openSource.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <RecentPosts posts={data.recentPosts} locale={lang} label={t.openSource.recent} />
    {/snippet}
  </Section>

  <Section id="start" title={t.start.title} layout="stack">
    {#snippet media()}
      <Columns>
        {#each t.start.items as item (item.title)}
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <div class="item-action"><Actions actions={[item.action]} /></div>
          </div>
        {/each}
      </Columns>
      <p class="support-note">
        {t.start.note} <a href={t.start.support.href}>{t.start.support.label}</a>
      </p>
    {/snippet}
  </Section>
</main>

<style>
  /* The one typographic moment: why the project exists, before what it does. */
  .why {
    padding-block: clamp(3rem, 8vw, 6rem);
    border-top: 1px solid var(--site-line);
  }
  .why-grid {
    display: grid;
    grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
    gap: var(--ui-space-12);
    align-items: start;
  }
  .why h2 {
    margin: 0;
    font-size: clamp(1.75rem, 3.6vw, 2.75rem);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.02em;
    text-wrap: balance;
    word-break: auto-phrase;
  }
  .why-body {
    display: grid;
    gap: var(--ui-space-4);
    color: var(--site-muted);
    line-height: 1.85;
  }
  .why-body p {
    margin: 0;
    text-wrap: pretty;
  }
  .why-body a {
    justify-self: start;
    color: var(--site-fg);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
  .sources {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-3) var(--ui-space-8);
    margin: var(--ui-space-2) 0 0;
    padding: 0;
    list-style: none;
  }
  .sources li {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-2);
    color: var(--site-fg);
    font-weight: 500;
  }
  .sources img {
    width: auto;
    height: 1.5rem;
  }
  .item-action {
    margin-top: var(--ui-space-4);
  }
  .support-note {
    margin: var(--ui-space-8) 0 0;
    color: var(--site-muted);
  }
  .support-note a {
    color: var(--site-fg);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
  @media (max-width: 850px) {
    .why-grid {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--ui-space-6);
    }
  }
</style>
