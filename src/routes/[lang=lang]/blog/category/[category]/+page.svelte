<script lang="ts">
  import BlogIndex from '$lib/blog/BlogIndex.svelte'
  import { categories } from '$lib/blog/categories'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const label = $derived(categories[data.category][data.lang])
</script>

<BlogIndex
  lang={data.lang}
  title={label}
  description={data.lang === 'ja'
    ? `Shumokuブログの「${label}」の記事。`
    : `${label} articles from the Shumoku blog.`}
  posts={data.posts}
  usedCategories={data.usedCategories}
  current={data.category}
/>
