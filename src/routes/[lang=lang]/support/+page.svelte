<script lang="ts">
  import { pagesCopy } from '$lib/content/pages'
  import PageHeading from '$lib/layout/PageHeading.svelte'
  import PageMeta from '$lib/PageMeta.svelte'
  import RuleList from '$lib/product/RuleList.svelte'
  import Section from '$lib/product/Section.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const t = $derived(pagesCopy(data.lang).support)
</script>

<PageMeta title={t.title} description={t.description} />
<main id="main">
  <PageHeading title={t.title} description={t.description} />

  <!-- Keeps the long-standing /support#enterprise anchor. -->
  <Section id="enterprise" title={t.scope.title}>
    <p>{t.scope.lead}</p>
    <p>{t.scope.terms}</p>
    <p>{t.scope.partners}</p>
    {#snippet media()}
      <RuleList items={t.scope.items} label={t.scope.title} />
    {/snippet}
  </Section>

  <Section id="contact" title={t.contact.title} actions={[t.contact.action]} primaryAction large>
    <p>{t.contact.body}</p>
  </Section>

  <Section id="community" title={t.community.title} actions={[t.community.action]}>
    <p>{t.community.body}</p>
  </Section>
</main>
