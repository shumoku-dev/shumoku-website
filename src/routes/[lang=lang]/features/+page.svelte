<script lang="ts">
  import alert from '$lib/assets/screenshots/alert.png?enhanced'
  import dashboard from '$lib/assets/screenshots/dashboard.png?enhanced'
  import icon from '$lib/assets/screenshots/icon.png?enhanced'
  import share from '$lib/assets/screenshots/share.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import PageHeading from '$lib/layout/PageHeading.svelte'
  import PageMeta from '$lib/PageMeta.svelte'
  import Columns from '$lib/product/Columns.svelte'
  import CommandPanel from '$lib/product/CommandPanel.svelte'
  import ImageSlot from '$lib/product/ImageSlot.svelte'
  import Section from '$lib/product/Section.svelte'
  import Shot from '$lib/product/Shot.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(productCopy(data.lang).features)
  const s = $derived(t.sections)
  const third = '(max-width: 850px) calc(100vw - 2rem), 341px'
  const cliExamples = `shumoku render network.yaml -o diagram.svg
shumoku render network.yaml -f html -o diagram.html
shumoku render network.yaml -f png -o diagram.png`
</script>

<PageMeta title={t.title} description={t.description} />
<main id="main">
  <PageHeading title={t.title} description={t.description} />

  <Section id="generate" title={s.generate.title} actions={[s.generate.action]}>
    {#each s.generate.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <Shot src={icon} alt={s.generate.imageAlt} fill />
    {/snippet}
  </Section>

  <Section id="monitor" title={s.monitor.title} layout="stack" actions={[s.monitor.action]}>
    {#each s.monitor.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <Columns>
        <div>
          <Shot src={weathermap} alt={s.monitor.weathermapAlt} sizes={third} fill />
          <h3>{s.monitor.weathermapTitle}</h3>
        </div>
        <div>
          <Shot src={alert} alt={s.monitor.alertAlt} sizes={third} fill />
          <h3>{s.monitor.alertTitle}</h3>
        </div>
        <div>
          <Shot
            src={dashboard}
            alt={s.monitor.dashboardAlt}
            sizes={third}
            fill
            position="top left"
          />
          <h3>{s.monitor.dashboardTitle}</h3>
        </div>
      </Columns>
    {/snippet}
  </Section>

  <Section id="share" title={s.share.title} actions={[s.share.action]}>
    {#each s.share.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <p class="caution">{s.share.caution}</p>
    {#snippet media()}
      <Shot src={share} alt={s.share.imageAlt} fill />
    {/snippet}
  </Section>

  <Section id="cli" title={s.cli.title} actions={s.cli.actions}>
    {#each s.cli.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <!-- Examples from `shumoku render --help` in the released @shumoku/cli (unchanged in 0.3.0). -->
      <CommandPanel
        label={s.cli.commandLabel}
        command={cliExamples}
        copy={s.cli.copy}
        copied={s.cli.copied}
      />
    {/snippet}
  </Section>

  <Section id="editor" title={s.editor.title} badge={s.editor.badge} actions={[s.editor.action]}>
    {#each s.editor.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <ImageSlot label={s.editor.slot} />
    {/snippet}
  </Section>
</main>

<style>
  .caution {
    color: var(--site-fg);
    font-weight: 500;
  }
</style>
