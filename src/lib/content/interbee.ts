import { announcement, communityUrl } from '$lib/announcement'
import { docsUrl, type Locale } from '$lib/site'
import { contactEmail } from './pages'
import type { Action } from './product'

/**
 * Copy for `/interbee2026`, the page behind the QR code on the InterBEE 2026 booth poster
 * (TelHi Corporation booth). TelHi is a non-exclusive commercial support partner: never call it
 * the official vendor, the developer or the owner of Shumoku. See docs/operations/event-links.md.
 */

export const telhiUrl = 'https://www.telhi.co.jp/'
const demoUrl = 'https://demo.shumoku.dev/share/topologies/R71ZG1gEigiVY82YKpgDT03I'
const repo = 'https://github.com/konoe-akitoshi/shumoku'
const discord = 'https://discord.gg/dyYbEsDZYr'
const x = 'https://x.com/shumoku_dev'

export type InterbeeCopy = {
  meta: { title: string; description: string }
  title: string
  lead: string
  actions: readonly Action[]
  booth: { title: string; body: readonly string[]; alt: string; caption: string }
  map: { title: string; lead: string; items: readonly string[]; sources: string; alt: string }
  partner: {
    title: string
    body: readonly string[]
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
      'InterBEE 2026 の輝日株式会社ブースで展示した Shumoku の紹介。ライブデモ、導入・運用の相談先、試し方とコミュニティをまとめています。',
  },
  title: 'ネットワークにも、地図を。',
  lead: 'InterBEE 2026 の輝日株式会社ブースで、Shumoku をご覧いただきありがとうございます。Shumoku は、機器・ポート・リンクから構成図を生成し、通信量とアラートを同じ図に重ねるオープンソースソフトウェアです。',
  actions: [
    { label: 'ライブデモを開く', href: demoUrl },
    { label: 'Playground で試す', href: `/${l}/playground` },
  ],
  booth: {
    title: 'ブースのデモ',
    body: [
      'ブースでは、スイッチ間のケーブルを1本抜くと地図が変わる様子をお見せしています。リンクの断と経路の切り替わりが、数秒で構成図に反映されます。',
      '普段の運用でも、どこで何が起きているかを同じ1枚の図で確かめられます。',
    ],
    alt: 'Shumoku Server の構成図の上に、異常のある機器とアラートが表示された画面',
    caption: '構成図に重ねたアラート',
  },
  map: {
    title: '集めて、描いて、重ねる',
    lead: '手で描いた構成図は、構成が変わるたびに実態とずれていきます。Shumoku はデータから図を生成し続けます。',
    items: [
      'ポートまで分かる。機器同士がどのポートでつながっているかを、そのまま図に描きます。',
      '異常の場所が分かる。Zabbix・Prometheus・Grafana のアラートを、該当する機器やリンクの上に出します。',
      '通信量が線で分かる。リンクの使用率を線の色で表し、混み合う区間をひと目で示します。',
    ],
    sources:
      '構成は YAML、NetBox、SNMP・LLDP のスキャンなどから取り込めます。AGPL-3.0 で公開しており、JANOG57 の NOC でも運用しました。',
    alt: 'リンクの使用率に応じて線の色が変わる Shumoku の構成図',
  },
  partner: {
    title: '導入・運用の相談は、輝日株式会社へ',
    body: [
      '輝日株式会社は、Shumoku の商用サポートパートナーです。法人での導入、既存の監視ツールや台帳との連携、運用の支援、環境に合わせた開発を相談できます。',
      '筑波大学発で、回線や認証基盤から映像配信まで、インフラの現場を持つ会社です。',
    ],
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
    title: '自分の環境で試す',
    body: 'ブラウザーの Playground で YAML から図を描けます。監視と組み合わせるなら Shumoku Server を導入してください。',
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
      'Shumoku at the TelHi Corporation booth, InterBEE 2026: the live demo, who to ask about deployment and operations, how to try it, and the community.',
  },
  title: 'Your network deserves a map.',
  lead: 'Thank you for visiting Shumoku at the TelHi Corporation booth at InterBEE 2026. Shumoku is open-source software that generates diagrams from devices, ports and links, and overlays traffic and alerts on the same map.',
  actions: [
    { label: 'Open the live demo', href: demoUrl },
    { label: 'Try the Playground', href: `/${l}/playground` },
  ],
  booth: {
    title: 'The booth demo',
    body: [
      'At the booth, unplugging one cable between switches changes the map. The link failure and the new path reach the diagram within seconds.',
      'In everyday operations, the same map shows what is happening and where.',
    ],
    alt: 'Shumoku Server showing a device with a problem and its alerts on the diagram',
    caption: 'Alerts on the diagram',
  },
  map: {
    title: 'Collect, draw, overlay',
    lead: 'Hand-drawn diagrams drift from reality every time the network changes. Shumoku keeps generating the map from data.',
    items: [
      'Down to the port. The diagram shows which ports connect each pair of devices.',
      'Where the problem is. Alerts from Zabbix, Prometheus and Grafana appear on the affected device or link.',
      'Traffic on every line. Link utilization colors each line, so congested segments stand out.',
    ],
    sources:
      'Topology can come from YAML, NetBox, SNMP and LLDP scans, and more. Shumoku is AGPL-3.0 licensed and ran in the JANOG57 NOC.',
    alt: 'A Shumoku diagram whose links are colored by utilization',
  },
  partner: {
    title: 'Deployment and operations: TelHi Corporation',
    body: [
      'TelHi Corporation (輝日株式会社) is a commercial support partner for Shumoku. Talk to them about deploying it in your organization, connecting your monitoring tools and inventory, operations support, and development for your environment.',
      'Founded out of the University of Tsukuba, TelHi runs infrastructure from connectivity and authentication to video delivery.',
    ],
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
    title: 'Try it on your network',
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
