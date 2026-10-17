import { communityUrl } from '$lib/announcement'

export const connectLinks = [
  {
    name: { ja: 'デモを見る', en: 'View demo' },
    href: 'https://demo.shumoku.dev/share/topologies/R71ZG1gEigiVY82YKpgDT03I',
    description: { ja: 'Shumokuのネットワーク図を体験', en: 'Explore a Shumoku network diagram' },
  },
  {
    name: { ja: 'Discord', en: 'Discord' },
    href: 'https://discord.gg/dyYbEsDZYr',
    description: { ja: 'コミュニティに参加する', en: 'Join the community' },
  },
  {
    name: { ja: 'Meetup', en: 'Meetup' },
    href: communityUrl,
    description: { ja: 'イベント情報・参加申込', en: 'Events and registration' },
  },
  {
    name: { ja: 'X / Twitter', en: 'X / Twitter' },
    href: 'https://x.com/shumoku_dev',
    description: { ja: '@shumoku_dev', en: '@shumoku_dev' },
  },
]

export const connectCopy = {
  ja: {
    title: 'Shumokuとつながる',
    description: 'デモ、イベント、コミュニティへのリンク。',
    try: 'Playgroundで試す',
    about: 'Shumokuについて',
  },
  en: {
    title: 'Connect with Shumoku',
    description: 'Demo, events and community links.',
    try: 'Try the Playground',
    about: 'About Shumoku',
  },
}
