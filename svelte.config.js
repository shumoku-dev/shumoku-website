import { fileURLToPath } from 'node:url'
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import remarkEmbeds from './src/lib/blog/embeds/remark.js'

export default {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      remarkPlugins: [remarkEmbeds],
      layout: fileURLToPath(new URL('./src/lib/blog/ArticleLayout.svelte', import.meta.url)),
    }),
  ],
  kit: {
    adapter: adapter({ runtime: 'nodejs24.x' }),
  },
}
