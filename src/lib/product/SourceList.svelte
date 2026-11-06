<script lang="ts">
  /** The sources Home names, each with its logo. */
  const sources = [
    { name: 'NetBox', src: '/integrations/netbox.svg' },
    { name: 'Zabbix', src: '/integrations/zabbix.svg' },
    { name: 'Prometheus', src: '/integrations/prometheus.svg' },
    { name: 'Grafana', src: '/integrations/grafana.svg' },
  ]
</script>

<ul class="source-list">
  {#each sources as source (source.name)}
    <li><img src={source.src} alt="" loading="lazy">{source.name}</li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-3) var(--layout-block);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-2);
    color: var(--site-fg);
    font-weight: 500;
  }
  img {
    width: auto;
    height: 1.5rem;
  }
</style>
