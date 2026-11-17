import { announcement, communityUrl } from '$lib/announcement'
import { docsUrl, type Locale } from '$lib/site'
import { contactEmail } from './pages'
import type { Action } from './product'

/**
 * Copy for `/interbee2026`, the page behind the QR code on the InterBEE 2026 booth poster
 * (TelHi Corporation booth). Headline, features and demo wording follow the poster and the MoIP
 * flyer so the printed matter and the page read as one. TelHi is a non-exclusive commercial support
 * partner: never call it the official vendor, the developer or the owner of Shumoku.
 * See docs/operations/event-links.md.
 */

export const telhiUrl = 'https://www.telhi.co.jp/'
const demoUrl = 'https://demo.shumoku.dev/share/topologies/R71ZG1gEigiVY82YKpgDT03I'
const repo = 'https://github.com/konoe-akitoshi/shumoku'
const discord = 'https://discord.gg/dyYbEsDZYr'
const x = 'https://x.com/shumoku_dev'

export type InterbeeCopy = {
  meta: { title: string; description: string }
  event: { label: string; items: readonly { term: string; detail: string }[] }
  title: string
  lead: string
  actions: readonly Action[]
  map: { alt: string; caption: string }
  demo: { title: string; body: readonly string[]; alt: string; slot: string }
  ip: { title: string; body: readonly string[]; features: readonly string[]; scope: string }
  partner: {
    title: string
    body: readonly string[]
    credit: string
    independence: string
    logo: string
    actions: readonly Action[]
  }
  start: { title: string; body: string; actions: readonly Action[] }
  community: { title: string; body: string; actions: readonly Action[] }
}

const ja = (l: Locale): InterbeeCopy => ({
  meta: {
    title: 'InterBEE 2026 | Shumoku',
    description:
      'InterBEE 2026 の輝日株式会社ブースで展示している、ネットワーク構成図ソフトウェア Shumoku の紹介。ブースの実演、放送設備の IP 化と構成図、導入・保守の相談先をまとめています。',
  },
  event: {
    label: '展示の概要',
    items: [
      { term: '展示会', detail: 'Inter BEE 2026' },
      { term: '会期', detail: '2026年11月18日（水）〜20日（金）' },
      { term: '会場', detail: '幕張メッセ' },
      { term: '出展', detail: '輝日株式会社' },
    ],
  },
  title: 'ネットワークにも、地図を。',
  lead: 'Shumoku は、機器から集めた接続情報でネットワークの構成図を描き、その上に通信量と監視のアラームを重ねて表示するソフトウェアです。配線を変えても、集め直せば図が追いつきます。オープンソースで公開しています。',
  actions: [
    { label: 'ライブデモを開く', href: demoUrl },
    { label: '導入・保守のご相談', href: '#partner' },
  ],
  map: {
    alt: '実運用ネットワークの構成図。スイッチとアクセスポイントがポート名と VLAN つきでつながり、通信のあるリンクが緑の線で表示されている',
    caption:
      '実際のネットワークを描いた例。ポートごとの接続と VLAN、リンクの通信量を表示しています。',
  },
  demo: {
    title: 'ブースで実演中：ケーブルを1本抜くと、地図が変わる。',
    body: [
      '2台のスイッチをつなぐ Primary を抜くと、通信は Backup へ。その切り替えが数秒で地図に出ます。',
      '会場では、実際にケーブルを抜き差ししてご覧いただけます。',
    ],
    alt: '展示デモの構成図。2台のスイッチとコアスイッチがポート名と VLAN つきでつながっている',
    slot: '展示デモの構成図',
  },
  ip: {
    title: 'IP 化した設備にも、地図を。',
    body: [
      'SDI の時代は、ケーブルをたどれば信号の経路が分かりました。設備が IP 化すると、経路はスイッチのポートと VLAN の設定の中に入り、配線を見ても分からなくなります。',
      'Shumoku は、SNMP や LLDP で機器から接続情報を集めて構成図を描きます。手で描いた図と違い、構成を変えても集め直せば実態に追いつきます。',
    ],
    features: [
      'ポートまで分かる。機器ごとのポートと、その接続先まで表示します。',
      '異常の場所が分かる。Zabbix などのアラームを、該当する機器に表示します。',
      '通信量が線で分かる。機器のあいだのデータ量を、線の色で表示します。',
    ],
    scope:
      'Shumoku が見せるのはネットワークの構造と状態です。映像信号（ST 2110 など）そのものを解析する製品ではありません。',
  },
  partner: {
    title: '導入・保守のご相談は、輝日株式会社へ',
    body: [
      '輝日株式会社は、Shumoku の商用サポートパートナーです。法人での導入、既存の監視ツールや台帳との連携、運用・保守、環境に合わせた開発を相談できます。',
      '筑波大学発で、回線や認証基盤から映像配信まで、インフラの現場を持つ会社です。',
    ],
    credit: '開発　Shumoku Project　／　出展・導入支援　輝日株式会社',
    independence:
      'Shumoku は独立したオープンソースプロジェクトです。輝日株式会社は非独占のパートナーで、技術方針とリリースは Shumoku Project が決めます。',
    logo: '輝日株式会社のサイトを開く',
    actions: [
      { label: '輝日株式会社のサイト', href: telhiUrl },
      { label: `${contactEmail} に相談する`, href: `mailto:${contactEmail}` },
      { label: '相談できること', href: `/${l}/support` },
    ],
  },
  start: {
    title: '持ち帰って試す',
    body: 'ブラウザーの Playground で、YAML から構成図を描けます。監視と組み合わせるなら Shumoku Server を導入してください。',
    actions: [
      { label: 'Playground', href: `/${l}/playground` },
      { label: 'Server の導入手順', href: docsUrl(l, 'server') },
      { label: 'GitHub', href: repo },
    ],
  },
  community: {
    title: 'つながる',
    body: `次の Meetup は ${announcement.ja.date}、${announcement.ja.venue}で開きます。質問や情報交換は Discord で受け付けています。`,
    actions: [
      { label: `${announcement.ja.title} に申し込む`, href: announcement.href },
      { label: 'Discord', href: discord },
      { label: 'イベント一覧', href: communityUrl },
      { label: 'X', href: x },
    ],
  },
})

const en = (l: Locale): InterbeeCopy => ({
  meta: {
    title: 'InterBEE 2026 | Shumoku',
    description:
      'Shumoku, network diagram software, at the TelHi Corporation booth at InterBEE 2026: the booth demo, diagrams for IP-based facilities, and who to ask about deployment and maintenance.',
  },
  event: {
    label: 'Exhibition',
    items: [
      { term: 'Event', detail: 'Inter BEE 2026' },
      { term: 'Dates', detail: 'Nov 18–20, 2026' },
      { term: 'Venue', detail: 'Makuhari Messe' },
      { term: 'Exhibitor', detail: 'TelHi Corporation' },
    ],
  },
  title: 'Your network deserves a map.',
  lead: 'Shumoku draws your network diagram from connection data collected from the devices, then overlays traffic and monitoring alarms on it. When the cabling changes, collect again and the diagram catches up. It is open source.',
  actions: [
    { label: 'Open the live demo', href: demoUrl },
    { label: 'Deployment and maintenance', href: '#partner' },
  ],
  map: {
    alt: 'A diagram of a production network: switches and access points connected with port names and VLANs, with active links drawn as green lines',
    caption: 'A real network. Each port’s connection, VLANs and link traffic are shown.',
  },
  demo: {
    title: 'Live at the booth: unplug one cable and the map changes.',
    body: [
      'Unplug the Primary link between two switches and traffic moves to Backup. The switch-over reaches the map within seconds.',
      'At the booth you can pull and reconnect the cable yourself.',
    ],
    alt: 'The booth demo diagram: two switches and a core switch connected with port names and VLANs',
    slot: 'Booth demo diagram',
  },
  ip: {
    title: 'A map for IP-based facilities',
    body: [
      'With SDI, following the cable told you where a signal went. Once a facility moves to IP, the path lives in switch ports and VLAN settings, and the cabling no longer tells you.',
      'Shumoku collects connection data from devices over SNMP and LLDP and draws the diagram. Unlike a hand-drawn one, it catches up with changes when you collect again.',
    ],
    features: [
      'Down to the port. Each device’s ports and what they connect to.',
      'Where the problem is. Alarms from Zabbix and others, on the affected device.',
      'Traffic on every line. The data between devices, shown by the line’s color.',
    ],
    scope:
      'Shumoku shows the network’s structure and state. It does not analyze video signals such as ST 2110 themselves.',
  },
  partner: {
    title: 'Deployment and maintenance: TelHi Corporation',
    body: [
      'TelHi Corporation (輝日株式会社) is a commercial support partner for Shumoku. Talk to them about deploying it in your organization, connecting your monitoring tools and inventory, operations and maintenance, and development for your environment.',
      'Founded out of the University of Tsukuba, TelHi runs infrastructure from connectivity and authentication to video delivery.',
    ],
    credit: 'Developed by the Shumoku Project / Exhibited and supported by TelHi Corporation',
    independence:
      'Shumoku is an independent open-source project. TelHi is a non-exclusive partner; the Shumoku Project decides technical direction and releases.',
    logo: 'Visit the TelHi Corporation website',
    actions: [
      { label: 'TelHi website (Japanese)', href: telhiUrl },
      { label: `Email ${contactEmail}`, href: `mailto:${contactEmail}` },
      { label: 'What we can help with', href: `/${l}/support` },
    ],
  },
  start: {
    title: 'Try it after the show',
    body: 'Draw a diagram from YAML in the browser with the Playground. To combine it with monitoring, deploy Shumoku Server.',
    actions: [
      { label: 'Playground', href: `/${l}/playground` },
      { label: 'Deploy Server', href: docsUrl(l, 'server') },
      { label: 'GitHub', href: repo },
    ],
  },
  community: {
    title: 'Stay in touch',
    body: `The next meetup is on ${announcement.en.date}, ${announcement.en.venue}. Ask questions and share notes on Discord.`,
    actions: [
      { label: `Join ${announcement.en.title}`, href: announcement.href },
      { label: 'Discord', href: discord },
      { label: 'Events', href: communityUrl },
      { label: 'X', href: x },
    ],
  },
})

export const interbeeCopy = (l: Locale) => (l === 'ja' ? ja(l) : en(l))
