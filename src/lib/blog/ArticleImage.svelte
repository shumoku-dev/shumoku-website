<script lang="ts">
  import Photo from '$lib/Photo.svelte'
  import { getArticle } from './context'
  import { articleImage } from './images'

  // mdsvex passes the attributes of `![alt](src "title")`.
  let { src, alt = '' }: { src: string; alt?: string } = $props()
  const article = getArticle()
  const image = $derived(articleImage(article().slug, src))
</script>

<Photo src={image} {alt} sizes="(max-width: 44rem) 100vw, 44rem" />
