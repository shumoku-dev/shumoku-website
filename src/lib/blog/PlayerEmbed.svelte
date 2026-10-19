<script lang="ts">
  import { Play } from '@lucide/svelte'
  import type { Picture } from 'vite-imagetools'
  import type { Locale } from '$lib/site'
  import { type PlayerProvider, players } from './providers'

  // A facade: only the stored thumbnail loads with the page. The third-party iframe (and its cookies)
  // loads after the reader asks for it.
  // https://developer.chrome.com/docs/lighthouse/performance/third-party-facades
  let {
    href,
    provider,
    title,
    embedUrl,
    ratio,
    image,
    lang,
  }: {
    href: string
    provider: PlayerProvider
    title: string
    embedUrl: string
    ratio: number
    image?: Picture
    lang: Locale
  } = $props()
  let active = $state(false)
  const label = $derived(players[provider].label)
  const video = $derived(provider === 'youtube')
  const src = $derived.by(() => {
    const url = new URL(embedUrl)
    if (video) url.searchParams.set('autoplay', '1')
    return url.href
  })
  const action = $derived(
    lang === 'ja'
      ? video
        ? `「${title}」を再生`
        : `「${title}」のスライドを表示`
      : video
        ? `Play “${title}”`
        : `View the slides “${title}”`,
  )
</script>

<figure class="player">
  <!-- Portrait documents would outgrow the screen; cap the height and narrow the frame instead. -->
  <div class="frame" style:aspect-ratio={ratio} style:max-width={`calc(80svh * ${ratio})`}>
    {#if active}
      <iframe
        {src}
        {title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    {:else}
      <!-- Without JavaScript the facade is a plain link to the original page. -->
      <a
        {href}
        aria-label={action}
        onclick={(event) => {
          event.preventDefault()
          active = true
        }}
      >
        {#if image}
          <enhanced:img src={image} alt="" sizes="(max-width: 44rem) 100vw, 44rem" loading="lazy" />
        {/if}
        <span class="play"><Play aria-hidden="true" /></span>
      </a>
    {/if}
  </div>
  <figcaption>
    <span>{title}</span>
    <a {href}>{lang === 'ja' ? `${label}で開く` : `Open on ${label}`} ↗</a>
  </figcaption>
</figure>

<style>
  .player {
    display: grid;
    gap: var(--ui-space-2);
    margin: 0;
  }
  .frame {
    position: relative;
    width: 100%;
    margin-inline: auto;
    overflow: hidden;
    border-radius: var(--ui-panel-radius);
    background: #000;
  }
  iframe,
  .frame > a {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .frame > a :global(picture) {
    display: contents;
  }
  .frame > a :global(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .play {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    margin: auto;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgb(0 0 0 / 0.7);
    color: #fff;
    transition: background 0.15s;
  }
  .frame > a:hover .play,
  .frame > a:focus-visible .play {
    background: rgb(0 0 0 / 0.9);
  }
  .frame > a:focus-visible {
    outline: 3px solid var(--ui-focus);
    outline-offset: -3px;
  }
  figcaption {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--ui-space-1) var(--ui-space-4);
    color: var(--site-muted);
    font-size: 0.875rem;
  }
  figcaption a:hover {
    text-decoration: underline;
  }
</style>
