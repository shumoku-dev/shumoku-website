<script lang="ts">
  /** A real command from the product's README, with a copy button. */
  let {
    label,
    command,
    copy,
    copied,
  }: { label: string; command: string; copy: string; copied: string } = $props()

  let done = $state(false)
  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command)
      done = true
      setTimeout(() => (done = false), 2000)
    } catch {
      /* Clipboard access can be refused; the command stays selectable. */
    }
  }
</script>

<figure>
  <figcaption>
    <span>{label}</span>
    <button type="button" onclick={copyCommand}>{copy}</button>
    <span class="status" role="status">{done ? copied : ''}</span>
  </figcaption>
  <pre><code>{command}</code></pre>
</figure>

<style>
  figure {
    margin: 0;
    min-width: 0;
    background: var(--brand-neutral-900);
    color: var(--brand-neutral-50);
    border-radius: 8px;
    overflow: hidden;
  }
  figcaption {
    display: flex;
    align-items: center;
    gap: var(--ui-space-3);
    padding: var(--ui-space-2) var(--ui-space-2) var(--ui-space-2) var(--ui-space-4);
    border-bottom: 1px solid var(--brand-neutral-700);
    font-size: 0.8125rem;
    color: var(--brand-neutral-200);
  }
  figcaption > span:first-child {
    flex: 1;
  }
  button {
    min-block-size: 2rem;
    padding-inline: var(--ui-space-3);
    border: 1px solid var(--brand-neutral-600);
    border-radius: var(--ui-radius);
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .status {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
  pre {
    margin: 0;
    padding: var(--ui-space-4);
    overflow-x: auto;
    font-size: 0.8125rem;
    line-height: 1.8;
  }
  /* On phones, wrap long commands instead of hiding their ends; copying still uses the original. */
  @media (max-width: 650px) {
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  }
</style>
