import { compile } from 'mdsvex'
import remarkEmbeds from './remark.js'

/** Standalone URLs of an article, found with the same remark plugin the site build uses. */
export async function embedUrls(markdown: string) {
  const urls: string[] = []
  await compile(markdown, {
    remarkPlugins: [[remarkEmbeds, { collect: (url: string) => urls.push(url) }]],
  })
  return [...new Set(urls)]
}
