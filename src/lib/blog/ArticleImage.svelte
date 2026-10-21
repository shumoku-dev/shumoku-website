<script lang="ts">
  import Photo from '$lib/Photo.svelte'
  import { articleImage } from './images'

  // `![alt](./images/photo.webp)` in the article's Markdown.
  let {
    slug,
    src,
    alt = '',
    sizes = '(max-width: 44rem) 100vw, 44rem',
  }: { slug: string; src: string; alt?: string; sizes?: string } = $props()
  const image = $derived(articleImage(slug, src))
</script>

<Photo src={image} {alt} {sizes} />
