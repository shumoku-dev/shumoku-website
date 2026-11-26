import { communityUrl } from '#lib/announcement.ts'
import { docsUrl, editorOrigin, type Locale } from '#lib/site.ts'

export const repositoryUrl = 'https://github.com/konoe-akitoshi/shumoku'

/** External profiles shown as icons beside the logo, and in the mobile menu. */
export const socialLinks = [
  { icon: 'github', label: 'GitHub', href: repositoryUrl },
  { icon: 'x', label: 'X (@shumoku_dev)', href: 'https://x.com/shumoku_dev' },
  { icon: 'discord', label: 'Discord', href: 'https://discord.gg/dyYbEsDZYr' },
] as const

export type SocialIcon = (typeof socialLinks)[number]['icon']

const copy = {
  ja: {
    summary: '機器から集めた接続情報でネットワーク構成図を作る、オープンソースのソフトウェア。',
    license: 'AGPL-3.0 のオープンソース',
    privacy: 'プライバシー',
    groups: {
      use: '使う',
      project: 'プロジェクト',
      support: 'サポート',
    },
    about: 'Shumokuについて',
    blog: 'ブログ',
    community: 'コミュニティ',
    events: 'イベント（connpass）',
    connect: '展示・イベント用リンク集',
    features: '機能',
    integrations: '連携',
    commercial: '導入相談・商用サポート',
    contact: 'お問い合わせ',
  },
  en: {
    summary:
      'Open-source software that draws network diagrams from the connection data your devices report.',
    license: 'Open source under AGPL-3.0',
    privacy: 'Privacy',
    groups: {
      use: 'Use Shumoku',
      project: 'Project',
      support: 'Support',
    },
    about: 'About',
    blog: 'Blog',
    community: 'Community',
    events: 'Events (connpass)',
    connect: 'Event quick links',
    features: 'Features',
    integrations: 'Integrations',
    commercial: 'For teams & commercial support',
    contact: 'Contact',
  },
} satisfies Record<Locale, unknown>

export function footerContent(locale: Locale) {
  const t = copy[locale]
  return {
    summary: t.summary,
    license: t.license,
    privacy: { label: t.privacy, href: `/${locale}/privacy` },
    groups: [
      {
        title: t.groups.use,
        links: [
          { label: 'Docs', href: docsUrl(locale) },
          { label: t.features, href: `/${locale}/features` },
          { label: t.integrations, href: `/${locale}/integrations` },
          { label: 'Playground', href: `/${locale}/playground` },
          { label: 'Editor', href: editorOrigin },
        ],
      },
      {
        title: t.groups.project,
        links: [
          { label: t.about, href: `/${locale}/about` },
          { label: t.blog, href: `/${locale}/blog` },
          { label: t.community, href: `/${locale}/community` },
          { label: t.events, href: communityUrl },
          { label: t.connect, href: `/${locale}/connect` },
        ],
      },
      {
        title: t.groups.support,
        links: [
          { label: t.commercial, href: `/${locale}/support` },
          { label: t.contact, href: 'mailto:contact@shumoku.dev' },
        ],
      },
    ],
  }
}
