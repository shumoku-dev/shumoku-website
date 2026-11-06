<script lang="ts">
  let { title, description }: { title: string; description?: string } = $props()
</script>
<div class="site-container layout-grid page-heading">
  <div class="span-reading">
    <h1>{title}</h1>
    {#if description}
      <p>{description}</p>
    {/if}
  </div>
</div>
<style>
  .page-heading {
    padding-block: var(--layout-section) var(--layout-block);
  }
  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    line-height: 1.2;
  }
  h1:not(:lang(ja)) {
    letter-spacing: -0.035em;
  }
  p {
    margin-block: var(--layout-flow) 0;
    text-wrap: pretty;
    color: var(--site-muted);
    line-height: 1.8;
  }
</style>
