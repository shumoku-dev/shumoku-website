/**
 * Services whose standalone URLs become click-to-load players instead of link cards. `hosts` match
 * the URL an author pastes; `embedHosts` are the only origins an iframe may load.
 */
export const players = {
  youtube: {
    label: 'YouTube',
    hosts: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'],
    embedHosts: ['www.youtube-nocookie.com'],
  },
  speakerdeck: {
    label: 'Speaker Deck',
    hosts: ['speakerdeck.com'],
    embedHosts: ['speakerdeck.com'],
  },
  docswell: {
    label: 'Docswell',
    hosts: ['www.docswell.com', 'docswell.com'],
    embedHosts: ['www.docswell.com'],
  },
} as const

export type PlayerProvider = keyof typeof players

export function playerProvider(url: string): PlayerProvider | undefined {
  const { hostname } = new URL(url)
  return (Object.keys(players) as PlayerProvider[]).find((key) =>
    (players[key].hosts as readonly string[]).includes(hostname),
  )
}

/** `1h2m3s`, `8410s` or `8410` as seconds. */
function seconds(value: string | null) {
  const match = value && /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/.exec(value)
  if (!match) return undefined
  const total = Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0)
  return total || undefined
}

/** Video ID and start time of a YouTube watch, share, Shorts or live URL. */
export function youtubeVideo(url: string) {
  const parsed = new URL(url)
  const path = parsed.pathname.split('/').filter(Boolean)
  const id =
    parsed.hostname === 'youtu.be'
      ? path[0]
      : path[0] === 'watch'
        ? parsed.searchParams.get('v')
        : ['shorts', 'live', 'embed'].includes(path[0] ?? '')
          ? path[1]
          : undefined
  if (!id || !/^[\w-]{11}$/.test(id)) return undefined
  return {
    id,
    start: seconds(parsed.searchParams.get('t') ?? parsed.searchParams.get('start')),
  }
}
