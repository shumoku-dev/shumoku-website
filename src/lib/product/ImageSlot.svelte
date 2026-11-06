<script lang="ts">
  /**
   * Reserved space for an image we want but do not have yet. It states the intended content
   * instead of inventing a screen. Replace it, or remove it, before publishing.
   */
  let { label, ratio = 'var(--layout-media-ratio)' }: { label: string; ratio?: string } = $props()
</script>

<figure class="slot" style:aspect-ratio={ratio}>
  <figcaption><span>Image</span>{label}</figcaption>
</figure>

<style>
  .slot {
    box-sizing: border-box;
    margin: 0;
    display: grid;
    place-items: center;
    padding: var(--ui-space-6);
    border: 1px dashed var(--site-line);
    border-radius: 8px;
    color: var(--site-muted);
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.7;
  }
  span {
    display: block;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
  }
</style>
