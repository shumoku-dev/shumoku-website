<script lang="ts">
  import { connectCopy, connectLinks } from '$lib/content/connect'
  import PageMeta from '$lib/PageMeta.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const copy = $derived(connectCopy[data.lang])
</script>

<PageMeta title={`${copy.title} | Shumoku`} description={copy.description} />
<main id="main" class="connect">
  <header>
    <h1>{copy.title}</h1>
    <p>{copy.description}</p>
  </header>
  <nav aria-label={copy.title}>
    {#each connectLinks as link}
      <a href={link.href} class="destination">
        <span>
          <strong>{link.name[data.lang]}</strong>
          <span class="description">{link.description[data.lang]}</span>
        </span>
        <span aria-hidden="true">↗</span>
      </a>
    {/each}
  </nav>
  <div class="more">
    <a href={`/${data.lang}/playground`}>{copy.try} →</a>
    <a href={`/${data.lang}/about`}>{copy.about} →</a>
  </div>
</main>

<style>
  .connect {
    width: min(100% - 2rem, 32rem);
    margin-inline: auto;
    padding-block: 2rem 3rem;
  }
  h1 {
    font-size: clamp(1.5rem, 6vw, 2rem);
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -0.025em;
  }
  header p {
    margin-top: 0.5rem;
    color: var(--site-muted);
    font-size: 0.875rem;
    line-height: 1.7;
  }
  nav {
    margin-top: 2rem;
    border-top: 1px solid var(--site-line);
  }
  .destination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 0.25rem;
    border-bottom: 1px solid var(--site-line);
  }
  strong {
    font-weight: 600;
    font-size: 1.125rem;
  }
  .description {
    display: block;
    margin-top: 0.25rem;
    color: var(--site-muted);
    font-size: 0.875rem;
    line-height: 1.6;
  }
  a:hover {
    color: var(--site-muted);
  }
  .more {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 1.5rem;
    font-size: 0.875rem;
  }
  .more a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
  @media (min-width: 650px) {
    .connect {
      padding-top: 4rem;
    }
  }
</style>
