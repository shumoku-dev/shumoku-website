import type { Picture } from 'vite-imagetools'

// https://svelte.dev/docs/kit/images#sveltejs-enhanced-img-Dynamically-choosing-an-image
const images = import.meta.glob<Picture>('/src/content/blog/*/images/*.{avif,jpg,jpeg,png,webp}', {
  eager: true,
  query: { enhanced: true, w: '1920;1280;640' },
  import: 'default',
})

/** Resolve an article-relative `./images/...` path written in Markdown or frontmatter. */
export function articleImage(slug: string, src: string): Picture {
  const image = src.startsWith('./')
    ? images[`/src/content/blog/${slug}/${src.slice(2)}`]
    : undefined
  if (!image) throw new Error(`Missing article image: ${slug}/${src}`)
  return image
}
