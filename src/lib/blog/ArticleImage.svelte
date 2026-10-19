<script lang="ts">
  import Photo from '$lib/Photo.svelte'
  import { getArticleSlug } from './context'
  import { articleImage } from './images'

  // mdsvex passes the attributes of `![alt](src "title")`.
  let { src, alt = '' }: { src: string; alt?: string } = $props()
  const slug = getArticleSlug()
  const image = $derived(articleImage(slug(), src))
</script>

<Photo src={image} {alt} sizes="(max-width: 44rem) 100vw, 44rem" />
