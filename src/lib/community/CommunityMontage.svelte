<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Locale } from '$lib/site'
  import { communityPhotos, photos, photoUrl, photoWidths } from './photos'

  let {
    locale,
    introduction,
    events,
    discussion,
  }: { locale: Locale; introduction: Snippet; events: Snippet; discussion: Snippet } = $props()
  const tiles = communityPhotos
</script>

<div class="montage layout-sub">
  {#each tiles as id, index}
    {#if id === 'speaker'}
      <div class="interlude introduction layout-sub">{@render introduction()}</div>
    {/if}
    {#if id === 'conversations'}
      <div class="interlude events layout-sub">{@render events()}</div>
    {/if}
    {#if id === 'sign'}
      <div class="interlude discussion layout-sub">{@render discussion()}</div>
    {/if}
    <img
      class={id}
      style:object-position={id === 'farewell' ? 'center 80%' : id === 'sign' ? 'center 65%' : id === 'selfie' ? 'center 60%' : undefined}
      src={photoUrl(id, 1280)}
      srcset={photoWidths.map(width => `${photoUrl(id, width)} ${width}w`).join(', ')}
      sizes={id === 'group' ? '(max-width: 1168px) 66vw, 744px' : id === 'welcome' ? '(max-width: 1168px) 33vw, 368px' : id === 'farewell' ? '(max-width: 850px) calc(100vw - 2rem), (max-width: 1168px) 33vw, 368px' : '(max-width: 850px) 50vw, (max-width: 1168px) 33vw, 368px'}
      alt={photos[id][locale]}
      loading="eager"
      fetchpriority={index === 0 ? 'high' : 'auto'}
      decoding="async"
    >
  {/each}
</div>

<style>
  /* Photos fall on the page's lines 1, 5 and 9. The text between them is on the same tracks. */
  .montage {
    row-gap: var(--ui-space-3);
  }
  img {
    grid-column: span 4;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    min-height: 0;
    object-fit: cover;
    object-position: center 35%;
    border-radius: var(--layout-media-radius);
  }
  .group {
    grid-column: span 8;
    object-position: center bottom;
  }
  .welcome {
    height: 100%;
    aspect-ratio: auto;
    contain: size;
  }
  .interlude {
    grid-column: 1 / -1;
    padding-block: var(--ui-space-8);
  }
  .introduction {
    padding-block-start: var(--ui-space-4);
  }
  /* Below the page breakpoint: tiles in pairs, in an order that leaves no gaps. */
  @container (max-width: 53.125rem) {
    .montage {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      grid-template-areas:
        "group group group group welcome welcome"
        "introduction introduction introduction introduction introduction introduction"
        "speaker speaker speaker selfie selfie selfie"
        "coffee coffee coffee conversations conversations conversations"
        "events events events events events events"
        "diagrams diagrams diagrams toast toast toast"
        "sign sign sign streaming streaming streaming"
        "discussion discussion discussion discussion discussion discussion"
        "farewell farewell farewell farewell farewell farewell";
      gap: var(--ui-space-1);
    }
    img {
      aspect-ratio: 4 / 3;
    }
    .group {
      grid-area: group;
      aspect-ratio: 16 / 9;
    }
    .welcome {
      grid-area: welcome;
    }
    .speaker {
      grid-area: speaker;
    }
    .selfie {
      grid-area: selfie;
    }
    .coffee {
      grid-area: coffee;
    }
    .conversations {
      grid-area: conversations;
    }
    .diagrams {
      grid-area: diagrams;
    }
    .toast {
      grid-area: toast;
    }
    .sign {
      grid-area: sign;
    }
    .streaming {
      grid-area: streaming;
    }
    .farewell {
      grid-area: farewell;
    }
    .introduction {
      grid-area: introduction;
    }
    .events {
      grid-area: events;
    }
    .discussion {
      grid-area: discussion;
    }
  }
</style>
