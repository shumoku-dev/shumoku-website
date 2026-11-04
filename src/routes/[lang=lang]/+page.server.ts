import { announcement } from '$lib/announcement'
import { posts } from '$lib/blog/posts.server'
import type { ActivityItem } from '$lib/content/activity'
import { releaseItems } from '$lib/content/activity'
import { renderExample, renderGallery } from '$lib/product/example.server'
import type { PageServerLoad } from './$types'

export const prerender = true
export const entries = () => [{ lang: 'en' }, { lang: 'ja' }]

export const load: PageServerLoad = async ({ params }) => {
  const lang = params.lang === 'ja' ? 'ja' : 'en'
  const event: ActivityItem = {
    date: announcement.expiresAt.slice(0, 10),
    kind: 'event',
    title:
      lang === 'ja'
        ? `${announcement.ja.title}（${announcement.ja.venue}）`
        : `${announcement.en.title} (${announcement.en.venue})`,
    href: announcement.href,
  }
  const articles: ActivityItem[] = posts.map((post) => ({
    date: post.published,
    kind: 'article',
    title: post.title,
    href: `/${lang}/blog/${post.slug}`,
  }))
  const activity = [event, ...releaseItems(lang), ...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7)
  return {
    diagrams: await renderExample(),
    gallery: await renderGallery(),
    activity,
    // Prerendered at build time: an event after this date is shown as upcoming.
    today: new Date().toISOString().slice(0, 10),
  }
}
