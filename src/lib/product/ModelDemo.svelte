<script lang="ts">
  import { type ExamplePort, examplePorts, exampleYaml } from './example'

  /**
   * YAML beside the diagram the released packages generated from it. Switching the port is the
   * page's one moment of motion: the definition and the diagram change together.
   */
  let {
    diagrams,
    legend,
    generated,
    diagramAlt,
  }: {
    diagrams: Record<ExamplePort, string>
    legend: string
    generated: string
    diagramAlt: (port: string) => string
  } = $props()

  let port = $state<ExamplePort>(examplePorts[0])
  const lines = $derived(exampleYaml(port).trimEnd().split('\n'))
  const changed = (line: string) =>
    line.includes('node: core-01, port: Ethernet') && line.includes('to:')
</script>

<div class="demo">
  <fieldset>
    <legend>{legend}</legend>
    {#each examplePorts as candidate (candidate)}
      <label>
        <input type="radio" name="example-port" value={candidate} bind:group={port}>
        <span>{candidate}</span>
      </label>
    {/each}
  </fieldset>
  <div class="panes">
    <div class="code">
      <pre
      ><code>{#each lines as line, index (index)}<span class="line" class:changed={changed(line)}>{line}</span>{/each}</code></pre>
      <!-- The diff reads from the original definition, so it only appears once the port moved. -->
      <p class="diff" aria-label="git diff" aria-hidden={port === examplePorts[0]}>
        <span class="del">- to: {'{'} node: core-01, port: {examplePorts[0]} {'}'}</span>
        <span class="add">+ to: {'{'} node: core-01, port: {examplePorts[1]} {'}'}</span>
      </p>
    </div>
    <figure class="diagram" data-port={port}>
      {#key port}
        <div class="svg" role="img" aria-label={diagramAlt(port)}>
          <!-- Build-time output of @shumoku/renderer-svg for the YAML on the left. -->
          {@html diagrams[port]}
        </div>
      {/key}
      <figcaption>{generated}</figcaption>
    </figure>
  </div>
</div>

<style>
  .demo {
    display: grid;
    gap: var(--ui-space-4);
  }
  fieldset {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-2);
    margin: 0;
    padding: 0;
    border: 0;
  }
  legend {
    float: left;
    width: 100%;
    margin-block-end: var(--ui-space-2);
    font-size: 0.875rem;
    color: var(--site-muted);
  }
  label {
    position: relative;
    display: inline-flex;
  }
  input {
    position: absolute;
    opacity: 0;
    inset: 0;
    margin: 0;
    cursor: pointer;
  }
  label span {
    display: inline-flex;
    align-items: center;
    min-block-size: var(--ui-control-height);
    padding-inline: var(--ui-space-4);
    border: 1px solid var(--site-control-line);
    border-radius: var(--ui-radius);
    background: var(--ui-field-surface);
    font-family: ui-monospace, monospace;
    font-size: 0.875rem;
  }
  input:checked + span {
    background: var(--ui-primary);
    border-color: var(--ui-primary);
    color: var(--ui-on-primary);
  }
  input:focus-visible + span {
    outline: 2px solid var(--ui-focus);
    outline-offset: 3px;
  }
  .panes {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--layout-gutter);
  }
  .code {
    min-width: 0;
    display: grid;
    align-content: space-between;
    background: var(--brand-neutral-900);
    color: var(--brand-neutral-50);
    border-radius: 8px;
    overflow: hidden;
  }
  pre {
    margin: 0;
    padding: var(--ui-space-4) 0;
    overflow-x: auto;
    font-size: 0.8125rem;
    line-height: 1.7;
  }
  .line {
    display: block;
    padding-inline: var(--ui-space-4);
    border-inline-start: 3px solid transparent;
  }
  .line.changed {
    background: color-mix(in srgb, var(--brand-green-500) 22%, transparent);
    border-inline-start-color: var(--brand-green-400);
  }
  .diff {
    margin: 0;
    padding: var(--ui-space-3) var(--ui-space-4);
    display: grid;
    border-top: 1px solid var(--brand-neutral-700);
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    line-height: 1.7;
  }
  .diff[aria-hidden="true"] {
    visibility: hidden;
  }
  .del {
    color: #ffb4a8;
  }
  .add {
    color: var(--brand-green-300);
  }
  .diagram {
    margin: 0;
    min-width: 0;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    background: #fff;
    border: 1px solid var(--site-line);
    border-radius: 8px;
    overflow: hidden;
  }
  .svg {
    display: grid;
    place-items: center;
    padding: var(--ui-space-4);
  }
  .svg :global(svg) {
    width: 100%;
    max-height: 30rem;
    animation: arrive 0.32s ease-out;
  }
  /* Point at what the edit changed: the port label on core-01. */
  .diagram[data-port="Ethernet1"] :global([data-port="core-01:Ethernet1"] .port-label-bg),
  .diagram[data-port="Ethernet2"] :global([data-port="core-01:Ethernet2"] .port-label-bg) {
    fill: var(--brand-green-700);
  }
  figcaption {
    padding: var(--ui-space-2) var(--ui-space-4);
    border-top: 1px solid var(--brand-neutral-100);
    font-size: 0.75rem;
    color: var(--brand-neutral-600);
    background: #fff;
  }
  @keyframes arrive {
    from {
      opacity: 0.35;
    }
  }
  @media (max-width: 650px) {
    .panes {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
