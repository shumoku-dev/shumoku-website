import { categoriesOf, publishedPosts } from '$lib/blog/posts.server'
import { locales, sitePages, websiteOrigin } from '$lib/site'
export const prerender = true
const entries: { path: string; lastmod?: string }[] = [
  ...sitePages.map((page) => ({ path: page.path })),
  ...categoriesOf(publishedPosts).map((category) => ({ path: `/blog/category/${category}` })),
  ...publishedPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.updated ?? post.published,
  })),
]
export const GET = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locales.flatMap((locale) => entries.map(({ path, lastmod }) => `<url><loc>${websiteOrigin}/${locale}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)).join('')}</urlset>`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  )
