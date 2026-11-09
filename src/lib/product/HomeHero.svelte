<script lang="ts">
  import topology from '$lib/assets/screenshots/topology.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import type { Locale } from '$lib/site'
  import LinkButton from '$lib/ui/LinkButton.svelte'
  import Frame from './Frame.svelte'

  /** The whole map first, then one link up close: overview and detail from the same screen. */
  let { locale }: { locale: Locale } = $props()
  const t = $derived(productCopy(locale).home.hero)
  /** Splits "地図[が]必要だ。" into runs; bracketed runs are particles set smaller. */
  const runs = (line: string) =>
    line
      .split(/(\[[^\]]+\])/)
      .filter(Boolean)
      .map((part) => ({
        text: part.replace(/^\[|\]$/g, ''),
        particle: part.startsWith('['),
      }))
</script>

<section class="hero" aria-labelledby="hero-title">
  <div class="site-container layout-grid stack">
    <div class="intro layout-sub">
      <h1 id="hero-title">
        {#each t.title as line, index (line)}
          {#if index}
            <br>
          {/if}
          <span class:outline={index === 1}>
            {#each runs(line) as run, part (part)}
              {#if run.particle}
                <span class="particle">{run.text}</span>
              {:else}
                {run.text}
              {/if}
            {/each}
          </span>
        {/each}
      </h1>
      <div class="lead">
        {#each t.body as paragraph (paragraph)}
          <p>{paragraph}</p>
        {/each}
        <div class="actions">
          <LinkButton href={t.demo.href} variant="primary">{t.demo.label}</LinkButton>
          <LinkButton href={t.deploy.href} class="outline">{t.deploy.label}</LinkButton>
        </div>
      </div>
    </div>
    <figure class="layout-sub">
      <div class="overview">
        <Frame
          src={topology}
          alt={t.imageAlt}
          ratio="natural"
          sizes="(max-width: 1168px) calc(100vw - 3rem), 1100px"
          loading="eager"
          fetchpriority="high"
        />
      </div>
      <!-- On narrow screens the close-up repeats a scene just below, so the overview stands alone. -->
      <div class="detail wide-only">
        <Frame src={weathermap} alt={t.detailAlt} ratio="natural" sizes="420px" />
      </div>
      <figcaption>{t.caption}</figcaption>
    </figure>
  </div>
</section>

<style>
  .hero {
    padding-block: clamp(2.5rem, 7vw, 5rem) clamp(3rem, 7vw, 5.5rem);
  }
  .stack {
    row-gap: calc(var(--layout-block) * 1.5);
  }
  /* The title takes the first six columns; the lead starts on column 7, the media line of split sections. */
  .intro {
    align-items: end;
  }
  h1,
  .lead {
    grid-column: span 6;
  }
  /*
   * "Give an outline to a structure that already exists": the second line arrives as an outline
   * and fills once, left to right. The fill edge is a registered custom property so the gradient
   * stop can animate. Without @property support, or with reduced motion, it is simply filled.
   */
  @property --outline-fill {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }
  .outline {
    background: linear-gradient(
        90deg,
        var(--site-accent) var(--outline-fill),
        transparent var(--outline-fill)
      )
      no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-stroke: 0.02em var(--site-accent);
    animation: outline-fill 1.6s cubic-bezier(0.3, 0.7, 0.2, 1) 0.4s both;
  }
  @keyframes outline-fill {
    from {
      --outline-fill: 0%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .outline {
      animation: none;
    }
  }
  @media (forced-colors: active) {
    .outline {
      background: none;
      color: CanvasText;
      -webkit-text-stroke: 0;
    }
  }
  .particle {
    font-size: 0.72em;
  }
  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 5.6vw, 4.5rem);
    line-height: 1.12;
    letter-spacing: -0.04em;
    font-weight: 700;
    text-wrap: balance;
  }
  h1:lang(ja) {
    font-size: clamp(2.5rem, 5.2vw, 4.25rem);
    letter-spacing: 0.02em;
    word-break: auto-phrase;
  }
  .lead {
    display: grid;
    gap: var(--layout-flow);
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
    row-gap: var(--ui-space-3);
  }
  .overview {
    grid-row: 1;
  }
  /* The close-up takes the last four columns and hangs below the screenshot. */
  .detail {
    grid-column: span 4 / -1;
    grid-row: 1;
    align-self: end;
    position: relative;
    margin-block-end: calc(var(--layout-block) * -1);
    border-radius: var(--layout-media-radius);
    box-shadow: 0 0.75rem 2rem color-mix(in srgb, var(--site-fg) 18%, transparent);
  }
  figcaption {
    grid-column: span 8;
    grid-row: 2;
    font-size: 0.8125rem;
    color: var(--site-muted);
  }
</style>
