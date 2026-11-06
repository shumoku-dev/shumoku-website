<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Picture } from 'vite-imagetools'

  /**
   * The one owner of media frames: ratio, crop, border and radius. The image fills the frame
   * edge to edge and the border is drawn over it, so the visible image is what lands on the grid.
   *
   * - `shot` crops a screenshot or photo. `position` chooses the side that stays visible.
   * - `diagram` shows a whole generated drawing on white, with its caption inside the frame.
   * - `logo` shows a small drawing centred in the frame.
   *
   * Give `label` instead of `src` to reserve the space for an image we want but do not have yet: it
   * states the intended content instead of inventing a screen. Replace it, or remove it, before
   * publishing. Give `children` for anything else that needs the same frame.
   */
  let {
    src,
    alt = '',
    label,
    caption,
    ariaLabel,
    variant = 'shot',
    ratio = variant === 'diagram' ? 'natural' : 'media',
    position = 'top center',
    maxHeight,
    width,
    height,
    sizes = '(max-width: 850px) calc(100vw - 2rem), 660px',
    loading = 'lazy',
    fetchpriority,
    bare = false,
    swap = false,
    children,
  }: {
    /** A build-optimized `?enhanced` import, or the URL of a file such as a generated diagram. */
    src?: Picture | string
    alt?: string
    label?: string
    caption?: string
    ariaLabel?: string
    variant?: 'shot' | 'diagram' | 'logo'
    /** `media` holds the site's ratio. `natural` keeps the image's own. */
    ratio?: 'media' | 'natural'
    position?: string
    /** Upper limit for a tall `diagram`; the drawing is letterboxed inside the frame's width. */
    maxHeight?: string
    /** Intrinsic size of a URL `src`, so the page does not move when it loads. */
    width?: number
    height?: number
    sizes?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high'
    /** No border line, for photos that have an edge of their own. */
    bare?: boolean
    /** Fade the image in when `src` changes. */
    swap?: boolean
    children?: Snippet
  } = $props()
</script>

<svelte:element
  this={caption || ariaLabel ? 'figure' : 'div'}
  class="root {variant}"
  class:bare
  aria-label={ariaLabel}
  data-frame={variant}
  style:--frame-position={position}
  style:--frame-max-height={maxHeight}
>
  <div class="frame" class:natural={ratio === 'natural'} class:placeholder={label && !src}>
    {#if children}
      {@render children()}
    {:else if typeof src === 'string'}
      {#key src}
        <img
          class:swap
          class:diagram-image={variant === 'diagram'}
          class:logo-image={variant === 'logo'}
          {src}
          {alt}
          {width}
          {height}
          {loading}
          {fetchpriority}
          decoding={swap ? 'sync' : 'async'}
        >
      {/key}
    {:else if src}
      <enhanced:img {src} {alt} {sizes} {loading} {fetchpriority} decoding="async" />
    {:else if label}
      <p><span>Image</span>{label}</p>
    {/if}
  </div>
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</svelte:element>

<style>
  .root {
    min-width: 0;
  }
  .frame {
    position: relative;
    aspect-ratio: var(--layout-media-ratio);
    border-radius: var(--layout-media-radius);
    overflow: hidden;
  }
  .natural {
    --frame-image-height: auto;
    aspect-ratio: auto;
  }
  /* Drawn over the image, so the border does not push the image off the grid line. */
  .frame::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid var(--site-line);
    border-radius: inherit;
    pointer-events: none;
  }
  .bare .frame::after {
    content: none;
  }
  .placeholder::after {
    border-style: dashed;
  }
  /* <enhanced:img> compiles to <picture><img>, which svelte-check cannot see. */
  .frame > :global(picture) {
    display: contents;
  }
  .frame > :global(img),
  .frame > :global(picture) > :global(img) {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: var(--frame-image-height, 100%);
    object-fit: cover;
    object-position: var(--frame-position);
  }
  figcaption {
    margin-top: var(--ui-space-3);
    font-size: 0.8125rem;
    color: var(--site-muted);
  }

  /* A diagram: white in both themes, because the renderer's colors assume a light background. */
  .diagram {
    position: relative;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    height: 100%;
    border-radius: var(--layout-media-radius);
    background: #fff;
    overflow: hidden;
  }
  .diagram .frame {
    display: grid;
    align-items: center;
    border-radius: 0;
    overflow: visible;
  }
  .diagram .frame::after {
    content: none;
  }
  .diagram::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid var(--site-line);
    border-radius: inherit;
    pointer-events: none;
  }
  /* The padding is part of the image box, so the box stays on the grid and the drawing keeps air. */
  .frame > .diagram-image {
    max-height: calc(var(--frame-max-height, none) + 2 * var(--ui-space-4));
    padding: var(--ui-space-4);
    object-fit: contain;
  }
  .diagram figcaption {
    margin: 0;
    padding: var(--ui-space-2) var(--ui-space-4);
    border-top: 1px solid var(--brand-neutral-100);
    color: var(--brand-neutral-600);
  }

  /* The drawing takes 30% of the frame's width, centred. */
  .frame > .logo-image {
    padding-inline: 35%;
    object-fit: contain;
    object-position: center;
  }

  .placeholder p {
    display: grid;
    height: 100%;
    place-content: center;
    padding: var(--ui-space-6);
    color: var(--site-muted);
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.7;
  }
  .placeholder span {
    display: block;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
  }

  .swap {
    animation: arrive 0.32s ease-out;
  }
  @keyframes arrive {
    from {
      opacity: 0.35;
    }
  }
</style>
