import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), sveltekit()],
  // Published Shumoku packages currently contain extensionless ESM imports. Bundling them for SSR
  // lets Vite resolve those imports while keeping the website independent from the source monorepo.
  ssr: {
    noExternal: [
      '@shumoku/core',
      '@shumoku/renderer',
      '@shumoku/renderer-html',
      '@shumoku/renderer-svg',
    ],
  },
})
