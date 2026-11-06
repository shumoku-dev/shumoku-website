<script lang="ts">
  import dashboard from '$lib/assets/screenshots/dashboard.png?enhanced'
  import share from '$lib/assets/screenshots/share.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import PageMeta from '$lib/PageMeta.svelte'
  import ActivityLog from '$lib/product/ActivityLog.svelte'
  import Adopters from '$lib/product/Adopters.svelte'
  import Columns from '$lib/product/Columns.svelte'
  import CommandPanel from '$lib/product/CommandPanel.svelte'
  import Faq from '$lib/product/Faq.svelte'
  import Gallery from '$lib/product/Gallery.svelte'
  import HomeHero from '$lib/product/HomeHero.svelte'
  import ModelDemo from '$lib/product/ModelDemo.svelte'
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
  // Commands as written in the product READMEs (apps/cli and apps/server).
  const cliCommand = 'npx @shumoku/cli render network.yaml -o diagram.svg'
  const serverCommand = `install -d -m 700 .shumoku
openssl rand -base64 32 > .shumoku/admin-password
chmod 600 .shumoku/admin-password
docker run -d -p 8080:8080 -v shumoku-data:/data \\
  -v "$PWD/.shumoku/admin-password:/run/secrets/shumoku_admin_password:ro" \\
  -e SHUMOKU_BOOTSTRAP_ADMIN_PASSWORD_FILE=/run/secrets/shumoku_admin_password \\
  ghcr.io/konoe-akitoshi/shumoku:latest`
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
        diagrams={data.diagrams}
        legend={t.model.switchLabel}
        generated={t.model.generated}
        diagramAlt={t.model.diagramAlt}
      />
    {/snippet}
  </Section>

  <Section id="gallery" title={t.gallery.title} layout="stack" actions={[t.gallery.action]}>
    <p>{t.gallery.body}</p>
    {#snippet media()}
      <Gallery diagrams={data.gallery} items={t.gallery.items} />
    {/snippet}
  </Section>

  <Section id="scenes" title={t.scenes.title} layout="stack" actions={[t.scenes.action]} large>
    <p class="problem">{t.scenes.problem}</p>
    {#snippet media()}
      <Columns>
        {#each t.scenes.items as item, index (item.title)}
          <div>
            {#if index === 0}
              <figure class="before-after" aria-label={t.scenes.slot}>
                {#each [['Ethernet1', t.scenes.before], ['Ethernet2', t.scenes.after]] as [port, label] (port)}
                  <div>
                    <!-- The same build-time diagrams as the YAML demo, before and after the change. -->
                    {@html data.diagrams[port as 'Ethernet1' | 'Ethernet2']}
                    <span>{label}</span>
                  </div>
                {/each}
              </figure>
            {:else}
              <Shot
                src={index === 1 ? weathermap : share}
                alt={index === 1 ? t.scenes.loadAlt : t.scenes.shareAlt}
                sizes={columnSizes}
                fill
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
      <Shot
        src={dashboard}
        alt={t.adoption.imageAlt}
        caption={t.adoption.caption}
        fill
        position="top left"
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

  <Section id="start" title={t.start.title} layout="stack" large>
    {#snippet media()}
      <div class="start layout-grid">
        <ol class="steps span-wide">
          {#each t.start.items as item, index (item.title)}
            <li>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {#if index === 1}
                <CommandPanel
                  label={t.start.commands.cli}
                  command={cliCommand}
                  copy={t.start.commands.copy}
                  copied={t.start.commands.copied}
                />
              {:else if index === 2}
                <CommandPanel
                  label={t.start.commands.server}
                  command={serverCommand}
                  copy={t.start.commands.copy}
                  copied={t.start.commands.copied}
                />
              {/if}
              <a class="step-link" href={item.action.href}>{item.action.label}</a>
            </li>
          {/each}
        </ol>
        <p class="support-note span-wide">
          {t.start.note} <a href={t.start.support.href}>{t.start.support.label}</a>
        </p>
      </div>
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
      <h3 class="log-title">{t.activity.title}</h3>
      <ActivityLog
        items={data.activity}
        kinds={t.activity.kinds}
        upcoming={t.activity.upcoming}
        today={data.today}
      />
    {/snippet}
  </Section>
</main>

<style>
  .before-after {
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    box-sizing: border-box;
    border: 1px solid var(--site-line);
    border-radius: 8px;
    overflow: hidden;
    background: var(--brand-neutral-100);
  }
  .before-after div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ui-space-2);
    min-height: 0;
    padding: var(--ui-space-3) var(--ui-space-2) var(--ui-space-2);
    background: #fff;
  }
  .before-after :global(svg) {
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  /* Point at what changed: the port label on core-01. */
  .before-after
  :global(:is([data-port="core-01:Ethernet1"], [data-port="core-01:Ethernet2"]) .port-label-bg) {
    fill: var(--brand-green-700);
  }
  .before-after span {
    font-size: 0.75rem;
    color: var(--brand-neutral-600);
  }
  .problem {
    color: var(--site-fg);
    font-size: 1.0625rem;
  }
  .sources {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-3) var(--layout-block);
    margin: 0;
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
  .start {
    padding: 0;
  }
  .steps {
    display: grid;
    gap: var(--layout-block);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .steps li {
    display: grid;
    gap: var(--ui-space-3);
  }
  .steps h3 {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
  }
  .steps p {
    margin: 0;
    color: var(--site-muted);
    line-height: 1.8;
  }
  .step-link,
  .support-note a {
    justify-self: start;
    color: var(--site-fg);
    text-decoration: underline;
    text-decoration-color: var(--site-control-line);
    text-underline-offset: 0.25em;
  }
  .step-link:hover,
  .support-note a:hover {
    color: var(--site-accent);
  }
  .support-note {
    margin: 0;
    padding-top: var(--layout-block);
    border-top: 1px solid var(--site-line);
    color: var(--site-muted);
  }
  .log-title {
    margin: 0 0 var(--layout-flow);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--site-muted);
  }
</style>
