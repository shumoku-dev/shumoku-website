<script lang="ts">
  import type { Action } from '$lib/content/product'
  import CommandPanel from './CommandPanel.svelte'

  /** The numbered way in, on columns 1 to 9. The second and third steps show their real command. */
  let {
    items,
    commands,
    note,
    support,
  }: {
    items: readonly { title: string; body: string; action: Action }[]
    commands: { cli: string; server: string; copy: string; copied: string }
    note: string
    support: Action
  } = $props()
  // Commands as written in the product READMEs (apps/cli and apps/server).
  const cliCommand = 'npx @shumoku/cli render network.yaml -o diagram.svg'
  const serverCommand = `install -d -m 700 .shumoku
openssl rand -base64 32 > .shumoku/admin-password
chmod 600 .shumoku/admin-password
docker run -d -p 8080:8080 -v shumoku-data:/data \\
  -v "$PWD/.shumoku/admin-password:/run/secrets/shumoku_admin_password:ro" \\
  -e SHUMOKU_BOOTSTRAP_ADMIN_PASSWORD_FILE=/run/secrets/shumoku_admin_password \\
  ghcr.io/konoe-akitoshi/shumoku:latest`
</script>

<ol class="span-wide">
  {#each items as item, index (item.title)}
    <li>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {#if index === 1}
        <CommandPanel
          label={commands.cli}
          command={cliCommand}
          copy={commands.copy}
          copied={commands.copied}
        />
      {:else if index === 2}
        <CommandPanel
          label={commands.server}
          command={serverCommand}
          copy={commands.copy}
          copied={commands.copied}
        />
      {/if}
      <a href={item.action.href}>{item.action.label}</a>
    </li>
  {/each}
</ol>
<p class="note span-wide">{note} <a href={support.href}>{support.label}</a></p>

<style>
  ol {
    display: grid;
    gap: var(--layout-block);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: grid;
    gap: var(--ui-space-3);
  }
  h3 {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
  }
  li p {
    margin: 0;
    color: var(--site-muted);
    line-height: 1.8;
  }
  a {
    justify-self: start;
    color: var(--site-fg);
    text-decoration: underline;
    text-decoration-color: var(--site-control-line);
    text-underline-offset: 0.25em;
  }
  a:hover {
    color: var(--site-accent);
  }
  .note {
    margin: 0;
    padding-top: var(--layout-block);
    border-top: 1px solid var(--site-line);
    color: var(--site-muted);
  }
</style>
