<script lang="ts">
  import topology from '$lib/assets/screenshots/topology.png?enhanced'
  import weathermap from '$lib/assets/screenshots/wethermap.png?enhanced'
  import { productCopy } from '$lib/content/product'
  import type { Locale } from '$lib/site'
  import LinkButton from '$lib/ui/LinkButton.svelte'

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
  <div class="site-container">
    <div class="intro layout-grid">
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
  /* The title takes the first six columns; the lead starts on column 7, the media line of split sections. */
  .intro {
    align-items: end;
  }
  @media (min-width: 851px) {
    .intro h1 {
      grid-column: 1 / 7;
    }
    .intro .lead {
      grid-column: 7 / -1;
    }
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
    margin: calc(var(--layout-block) * 1.5) 0 0;
  }
  .frame {
    position: relative;
  }
  /* <enhanced:img> compiles to <picture><img>, which svelte-check cannot see. */
  .frame :global(img) {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--site-line);
    border-radius: 8px;
  }
  /* The close-up takes the last four columns and hangs below the screenshot. */
  .detail {
    position: absolute;
    right: 0;
    bottom: calc(var(--layout-block) * -1);
    width: calc(4 * var(--layout-col) + 3 * var(--layout-gutter));
    border-radius: 8px;
    box-shadow: 0 0.75rem 2rem color-mix(in srgb, var(--site-fg) 18%, transparent);
  }
  figcaption {
    margin-top: var(--ui-space-3);
    max-width: calc(8 * var(--layout-col) + 7 * var(--layout-gutter));
    font-size: 0.8125rem;
    color: var(--site-muted);
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
