<script lang="ts">
  import { CalendarDays, MonitorPlay } from '@lucide/svelte'
  import { connectCopy, connectLinks } from '$lib/content/connect'
  import PageMeta from '$lib/PageMeta.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const copy = $derived(connectCopy[data.lang])
</script>

<PageMeta title={`${copy.title} | Shumoku`} description={copy.description} />
<main id="main" class="connect">
  <h1>{copy.title}</h1>
  <nav aria-label={copy.title}>
    {#each connectLinks as link}
      <a href={link.href} class="destination">
        <span class="destination-icon" aria-hidden="true">
          {#if link.icon === 'events'}
            <CalendarDays size={20} strokeWidth={2} aria-hidden="true" />
          {:else if link.icon === 'demo'}
            <MonitorPlay size={20} strokeWidth={2} aria-hidden="true" />
          {:else}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              {#if link.icon === 'community'}
                <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path
                  d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"
                />
                <path d="M7 16.5c3.5 1 6.5 1 10 0" />
              {:else}
                <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              {/if}
            </svg>
          {/if}
        </span>
        <span>{link.name[data.lang]}</span>
      </a>
    {/each}
  </nav>
  <div class="more">
    <a href={`/${data.lang}/playground`}>{copy.try}</a>
    <a href={`/${data.lang}/about`}>{copy.about}</a>
  </div>
</main>

<style>
  .connect {
    width: min(100% - 2rem, 28rem);
    margin-inline: auto;
    padding-block: 2.5rem;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  nav {
    display: grid;
    gap: 0.75rem;
  }
  .destination {
    display: grid;
    grid-template-columns: 24px 1fr 24px;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
    min-height: 56px;
    padding: 0.875rem 1rem;
    border: 1px solid var(--site-line);
    border-radius: 8px;
    font-weight: 500;
  }
  .destination-icon {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    color: currentColor;
  }
  .destination:hover {
    background: var(--ui-surface);
  }
  .more {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem 1.5rem;
    margin-top: 1rem;
    color: var(--site-muted);
    font-size: 0.8125rem;
  }
  .more a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
  .more a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
