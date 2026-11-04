<script lang="ts">
  import alert from '$lib/assets/screenshots/alert.png?enhanced'
  import dashboard from '$lib/assets/screenshots/dashboard.png?enhanced'
  import icon from '$lib/assets/screenshots/icon.png?enhanced'
  import share from '$lib/assets/screenshots/share.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import PageHeading from '$lib/layout/PageHeading.svelte'
  import PageMeta from '$lib/PageMeta.svelte'
  import ImageSlot from '$lib/product/ImageSlot.svelte'
  import Section from '$lib/product/Section.svelte'
  import Shot from '$lib/product/Shot.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(productCopy(data.lang).features)
  const s = $derived(t.sections)
  const half = '(max-width: 850px) calc(100vw - 2rem), 330px'
</script>

<PageMeta title={t.title} description={t.description} />
<main id="main">
  <PageHeading title={t.title} description={t.description} />

  <Section id="generate" title={s.generate.title} actions={[s.generate.action]} surface>
    {#each s.generate.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <Shot src={icon} alt={s.generate.imageAlt} />
    {/snippet}
  </Section>

  <Section id="monitor" title={s.monitor.title} layout="stack" actions={[s.monitor.action]}>
    {#each s.monitor.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <div class="evidence">
        <Shot src={weathermap} alt={s.monitor.weathermapAlt} sizes={half} />
        <Shot src={alert} alt={s.monitor.alertAlt} sizes={half} />
        <div class="wide"><Shot src={dashboard} alt={s.monitor.dashboardAlt} /></div>
      </div>
    {/snippet}
  </Section>

  <Section id="share" title={s.share.title} actions={[s.share.action]} surface>
    {#each s.share.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    <p class="caution">{s.share.caution}</p>
    {#snippet media()}
      <Shot src={share} alt={s.share.imageAlt} />
    {/snippet}
  </Section>

  <Section id="cli" title={s.cli.title} actions={s.cli.actions}>
    {#each s.cli.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <!-- Examples from `shumoku render --help` in the released @shumoku/cli 0.2.28. -->
      <pre
        class="command"
      ><code><span class="prompt">$</span> shumoku render network.yaml -o diagram.svg
<span class="prompt">$</span> shumoku render network.yaml -f html -o diagram.html
<span class="prompt">$</span> shumoku render network.yaml -f png -o diagram.png</code></pre>
    {/snippet}
  </Section>

  <Section
    id="editor"
    title={s.editor.title}
    badge={s.editor.badge}
    actions={[s.editor.action]}
    surface
  >
    {#each s.editor.body as paragraph (paragraph)}
      <p>{paragraph}</p>
    {/each}
    {#snippet media()}
      <ImageSlot label={s.editor.slot} />
    {/snippet}
  </Section>
</main>

<style>
  .evidence {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--ui-space-6);
    align-items: start;
  }
  .wide {
    grid-column: 1 / -1;
  }
  .caution {
    padding-inline-start: var(--ui-space-4);
    border-inline-start: 3px solid var(--site-control-line);
    color: var(--site-fg);
  }
  .command {
    margin: 0;
    padding: var(--ui-space-6);
    overflow-x: auto;
    background: var(--brand-neutral-900);
    color: var(--brand-neutral-50);
    border: 10px solid var(--ui-workspace-shell);
    border-radius: 16px;
    font-size: 0.875rem;
    line-height: 2;
  }
  .prompt {
    color: var(--brand-green-300);
    user-select: none;
  }
  @media (max-width: 650px) {
    .evidence {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
