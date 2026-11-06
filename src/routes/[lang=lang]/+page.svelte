<script lang="ts">
  import dashboard from '$lib/assets/screenshots/dashboard.png?enhanced'
  import share from '$lib/assets/screenshots/share.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import PageMeta from '$lib/PageMeta.svelte'
  import ActivityLog from '$lib/product/ActivityLog.svelte'
  import Adopters from '$lib/product/Adopters.svelte'
  import BeforeAfter from '$lib/product/BeforeAfter.svelte'
  import Column from '$lib/product/Column.svelte'
  import Columns from '$lib/product/Columns.svelte'
  import Faq from '$lib/product/Faq.svelte'
  import Frame from '$lib/product/Frame.svelte'
  import Gallery from '$lib/product/Gallery.svelte'
  import HomeHero from '$lib/product/HomeHero.svelte'
  import ModelDemo from '$lib/product/ModelDemo.svelte'
  import Section from '$lib/product/Section.svelte'
  import SourceList from '$lib/product/SourceList.svelte'
  import Steps from '$lib/product/Steps.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const lang = $derived(data.lang)
  const t = $derived(productCopy(lang).home)
  const columnSizes = '(max-width: 850px) calc(100vw - 2rem), 360px'
</script>

<PageMeta title={t.meta.title} description={t.meta.description} />
<main id="main" class="flex-1">
  <HomeHero locale={lang} />

  <Section id="model" title={t.model.title} layout="stack" large>
    {#each t.model.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <ModelDemo
        size={data.exampleSize}
        legend={t.model.switchLabel}
        generated={t.model.generated}
        diagramAlt={t.model.diagramAlt}
      />
    {/snippet}
  </Section>

  <Section id="gallery" title={t.gallery.title} layout="stack" actions={[t.gallery.action]}>
    <p>{t.gallery.body}</p>
    {#snippet media()}
      <Gallery sizes={data.gallerySizes} items={t.gallery.items} />
    {/snippet}
  </Section>

  <Section id="scenes" title={t.scenes.title} layout="stack" actions={[t.scenes.action]} large>
    <p class="problem">{t.scenes.problem}</p>
    {#snippet media()}
      <Columns>
        {#each t.scenes.items as item, index (item.title)}
          <Column title={item.title} body={item.body}>
            {#snippet media()}
              {#if index === 0}
                <BeforeAfter
                  label={t.scenes.slot}
                  before={t.scenes.before}
                  after={t.scenes.after}
                />
              {:else}
                <Frame
                  src={index === 1 ? weathermap : share}
                  alt={index === 1 ? t.scenes.loadAlt : t.scenes.shareAlt}
                  sizes={columnSizes}
                />
              {/if}
            {/snippet}
          </Column>
        {/each}
      </Columns>
    {/snippet}
  </Section>

  <Section id="adoption" title={t.adoption.title}>
    <p>{t.adoption.body}</p>
    <Adopters label={t.adoption.adoptersLabel} />
    {#snippet media()}
      <Frame
        src={dashboard}
        alt={t.adoption.imageAlt}
        caption={t.adoption.caption}
        position="top left"
      />
    {/snippet}
  </Section>

  <Section id="integrations" title={t.integrations.title} actions={[t.integrations.action]}>
    {#each t.integrations.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <SourceList />
  </Section>

  <Section id="start" title={t.start.title} layout="stack" large>
    {#snippet media()}
      <Steps
        items={t.start.items}
        commands={t.start.commands}
        note={t.start.note}
        support={t.start.support}
      />
    {/snippet}
  </Section>

  <Section id="faq" title={t.faq.title} layout="stack">
    {#snippet media()}
      <Faq items={t.faq.items} />
    {/snippet}
  </Section>

  <Section id="open-source" title={t.openSource.title} actions={t.openSource.actions} plainActions>
    {#each t.openSource.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <ActivityLog
        title={t.activity.title}
        items={data.activity}
        kinds={t.activity.kinds}
        upcoming={t.activity.upcoming}
        today={data.today}
      />
    {/snippet}
  </Section>
</main>

<style>
  .problem {
    color: var(--site-fg);
    font-size: 1.0625rem;
  }
</style>
