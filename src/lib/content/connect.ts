import { communityUrl } from '$lib/announcement'

export const connectLinks = [
  {
    icon: 'community',
    name: { ja: 'コミュニティ Discord', en: 'Community Discord' },
    href: 'https://discord.gg/dyYbEsDZYr',
    description: { ja: 'コミュニティに参加する', en: 'Join the community' },
  },
  {
    icon: 'events',
    name: { ja: 'イベント・Meetup', en: 'Events & meetups' },
    href: communityUrl,
    description: { ja: 'イベント情報・参加申込', en: 'Events and registration' },
  },
  {
    icon: 'updates',
    name: { ja: '最新情報 · X', en: 'Updates on X' },
    href: 'https://x.com/shumoku_dev',
    description: { ja: '@shumoku_dev', en: '@shumoku_dev' },
  },
  {
    icon: 'demo',
    name: { ja: 'ライブデモ', en: 'Live demo' },
    href: 'https://demo.shumoku.dev/share/topologies/R71ZG1gEigiVY82YKpgDT03I',
    description: { ja: 'Shumokuのネットワーク図を体験', en: 'Explore a Shumoku network diagram' },
  },
] as const

export const connectCopy = {
  ja: {
    title: 'リンク集',
    description: 'デモ・イベント・コミュニティ。',
    try: 'Playgroundで試す',
    about: 'Shumokuについて',
  },
  en: {
    title: 'Links',
    description: 'Demo, events and community.',
    try: 'Try the Playground',
    about: 'About Shumoku',
  },
}
