<script lang="ts">
  import netbox from '$lib/assets/screenshots/netbox.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import PageHeading from '$lib/layout/PageHeading.svelte'
  import PageMeta from '$lib/PageMeta.svelte'
  import DataTable from '$lib/product/DataTable.svelte'
  import Section from '$lib/product/Section.svelte'
  import Shot from '$lib/product/Shot.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(productCopy(data.lang).integrations)
</script>

<PageMeta title={t.title} description={t.description} />
<main id="main">
  <PageHeading title={t.title} description={t.description} />

  <Section id="inputs" title={t.inputs.title} layout="stack">
    <p>{t.inputs.body}</p>
    {#snippet media()}
      <div class="layout-grid inner">
        <div class="notes span-reading">
          <DataTable head={t.inputs.head} rows={t.inputs.rows} />
          <p class="note">{t.inputs.note}</p>
        </div>
        <div class="span-aside-inner">
          <Shot
            src={netbox}
            alt={t.inputs.imageAlt}
            sizes="(max-width: 850px) calc(100vw - 2rem), 441px"
            fill
          />
        </div>
      </div>
    {/snippet}
  </Section>

  <Section
    id="monitoring"
    title={t.monitoring.title}
    layout="stack"
    actions={[t.monitoring.action]}
  >
    <p>{t.monitoring.body}</p>
    {#snippet media()}
      <div class="layout-grid inner">
        <div class="notes span-reading">
          <DataTable head={t.monitoring.head} rows={t.monitoring.rows} />
          <p class="note">{t.monitoring.settings}</p>
          <p class="note">{t.monitoring.plugin}</p>
        </div>
      </div>
    {/snippet}
  </Section>

  <Section id="mapping" title={t.mapping.title} actions={[t.mapping.action]}>
    {#each t.mapping.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
  </Section>
</main>

<style>
  .inner {
    width: 100%;
  }
  .notes {
    display: grid;
    gap: var(--layout-flow);
  }
  @media (min-width: 851px) {
    .span-aside-inner {
      grid-column: 8 / -1;
    }
  }
  .note {
    margin: 0;
    color: var(--site-muted);
    line-height: 1.85;
  }
</style>
