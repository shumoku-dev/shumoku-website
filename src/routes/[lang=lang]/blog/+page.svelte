<script lang="ts">
  import BlogIndex from '$lib/blog/BlogIndex.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<BlogIndex
  lang={data.lang}
  title={data.lang === 'ja' ? 'ブログ' : 'Blog'}
  description={data.lang === 'ja'
    ? 'Shumokuの開発の背景、新機能、イベント開催記や活用の話。'
    : 'Development stories, new features, event reports and ways people use Shumoku.'}
  posts={data.posts}
  usedCategories={data.usedCategories}
/>
