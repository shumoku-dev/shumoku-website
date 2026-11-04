<script lang="ts">
  import topology from '$lib/assets/screenshots/topology.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import type { Locale } from '$lib/site'
  import LinkButton from '$lib/ui/LinkButton.svelte'

  /** The whole map first, then one link up close: overview and detail from the same screen. */
  let { locale }: { locale: Locale } = $props()
  const t = $derived(productCopy(locale).home.hero)
</script>

<section class="hero" aria-labelledby="hero-title">
  <div class="site-container">
    <div class="intro">
      <h1 id="hero-title">{t.title}</h1>
      <div class="lead">
        {#each t.body as paragraph (paragraph)}
          <p>{paragraph}</p>
        {/each}
        <div class="actions">
          <LinkButton href={t.demo.href} variant="primary">{t.demo.label}</LinkButton>
          <LinkButton href={t.deploy.href}>{t.deploy.label}</LinkButton>
        </div>
      </div>
    </div>
    <figure>
      <div class="frame">
        <enhanced:img
          src={topology}
          alt={t.imageAlt}
          sizes="(max-width: 1168px) calc(100vw - 3rem), 1100px"
          fetchpriority="high"
        />
        <div class="detail">
          <enhanced:img
            src={weathermap}
            alt={t.detailAlt}
            sizes="(max-width: 650px) 60vw, 420px"
            loading="lazy"
          />
        </div>
      </div>
      <figcaption>{t.caption}</figcaption>
    </figure>
  </div>
</section>

<style>
  .hero {
    padding-block: clamp(2.5rem, 7vw, 5rem) clamp(3rem, 7vw, 5.5rem);
  }
  .intro {
    display: grid;
    grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
    gap: var(--ui-space-12);
    align-items: end;
  }
  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 5.6vw, 4.5rem);
    line-height: 1.12;
    letter-spacing: -0.04em;
    font-weight: 600;
    text-wrap: balance;
  }
  h1:lang(ja) {
    font-size: clamp(2.25rem, 4.6vw, 3.75rem);
    letter-spacing: -0.02em;
    word-break: auto-phrase;
  }
  .lead {
    display: grid;
    gap: var(--ui-space-4);
    color: var(--site-muted);
    line-height: 1.85;
  }
  .lead p {
    margin: 0;
    text-wrap: pretty;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-3);
    margin-top: var(--ui-space-2);
  }
  figure {
    margin: clamp(2rem, 5vw, 3.5rem) 0 0;
  }
  .frame {
    position: relative;
    padding: 10px;
    background: var(--ui-workspace-shell);
    border-radius: 16px;
  }
  /* <enhanced:img> compiles to <picture><img>, which svelte-check cannot see. */
  .frame :global(img) {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
  .detail {
    position: absolute;
    right: clamp(1rem, 3vw, 2.5rem);
    bottom: clamp(-2.5rem, -3vw, -1rem);
    width: min(38%, 26rem);
    padding: 6px;
    background: var(--ui-workspace-shell);
    border-radius: 10px;
    box-shadow: 0 0.75rem 2rem color-mix(in srgb, var(--site-fg) 18%, transparent);
  }
  .detail :global(img) {
    border-radius: 5px;
  }
  figcaption {
    margin-top: var(--ui-space-3);
    max-width: 55%;
    font-size: 0.8125rem;
    color: var(--site-muted);
  }
  @media (max-width: 850px) {
    .intro {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--ui-space-6);
    }
  }
  /* On phones the close-up repeats a scene just below, so the overview stands alone. */
  @media (max-width: 650px) {
    .detail {
      display: none;
    }
    figcaption {
      max-width: none;
    }
  }
</style>
