<script lang="ts">
  import { type ExamplePort, exampleDiagramUrl, examplePorts } from './example'
  import Frame from './Frame.svelte'

  /** The same build-time diagrams as the YAML demo, before and after the change. */
  let {
    label,
    before,
    after,
  }: {
    label: string
    before: string
    after: string
  } = $props()
  const panes = $derived<[ExamplePort, string][]>([
    [examplePorts[0], before],
    [examplePorts[1], after],
  ])
</script>

<Frame ariaLabel={label}>
  <div class="before-after">
    {#each panes as [port, caption] (port)}
      <div class="pane">
        <img src={exampleDiagramUrl(port)} alt="" loading="lazy" decoding="async">
        <span>{caption}</span>
      </div>
    {/each}
  </div>
</Frame>

<style>
  .before-after {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    height: 100%;
    background: var(--brand-neutral-100);
  }
  .pane {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ui-space-2);
    min-height: 0;
    padding: var(--ui-space-3) var(--ui-space-2) var(--ui-space-2);
    background: #fff;
  }
  img {
    flex: 1;
    width: 100%;
    min-height: 0;
    object-fit: contain;
  }
  span {
    font-size: 0.75rem;
    color: var(--brand-neutral-600);
  }
</style>
