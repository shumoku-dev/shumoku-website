<script lang="ts">
  import BlogIndex from '$lib/blog/BlogIndex.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<BlogIndex
  lang={data.lang}
  title={data.lang === 'ja' ? 'ブログ' : 'Blog'}
  description={data.lang === 'ja'
    ? 'Shumoku の開発、ネットワーク運用での活用事例、イベントの記録を掲載しています。'
    : 'Notes on developing Shumoku, how it is used in network operations, and event reports.'}
  posts={data.posts}
  usedCategories={data.usedCategories}
/>
