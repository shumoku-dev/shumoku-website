import { announcement, communityUrl } from '$lib/announcement'
import { docsUrl, type Locale } from '$lib/site'
import { contactEmail } from './pages'
import type { Action } from './product'

/**
 * Copy for `/interbee2026`, the page behind the QR codes on the INTER BEE MoIP flyer and the
 * TelHi booth poster. The flyer promises "会場デモの詳細・使い方 / 導入手順と連携設定もこのページから",
 * so the MoIP exhibit comes first and the wording follows the flyer (artifact "Shumoku MoIP
 * フライヤー制作", v4). TelHi is a non-exclusive commercial support partner: never call it the
 * official vendor, the developer or the owner of Shumoku. See docs/operations/event-links.md.
 */

export const telhiUrl = 'https://www.telhi.co.jp/'
const demoUrl = 'https://demo.shumoku.dev/share/topologies/R71ZG1gEigiVY82YKpgDT03I'
const repo = 'https://github.com/konoe-akitoshi/shumoku'
const discord = 'https://discord.gg/dyYbEsDZYr'
const x = 'https://x.com/shumoku_dev'

type Place = { id: string; name: string; where: string; detail: string; href: string }

export type InterbeeCopy = {
  meta: { title: string; description: string }
  event: { label: string; items: readonly { term: string; detail: string }[] }
  title: string
  lead: string
  places: { label: string; items: readonly Place[] }
  moip: {
    title: string
    body: readonly string[]
    overviewSlot: string
    sites: string
    detailSlot: string
    points: readonly string[]
    integrations: string
    note: string
  }
  features: { title: string; items: readonly string[] }
  booth: {
    title: string
    body: readonly string[]
    alt: string
    caption: string
    actions: readonly Action[]
  }
  setup: { title: string; body: string; actions: readonly Action[] }
  partner: {
    title: string
    body: readonly string[]
    credit: string
    independence: string
    logo: string
    actions: readonly Action[]
  }
  community: { title: string; body: string; actions: readonly Action[] }
}

const ja = (l: Locale): InterbeeCopy => ({
  meta: {
    title: 'InterBEE 2026 会場デモ | Shumoku',
    description:
      'INTER BEE MoIP（展示ホール3 ブース3401）で展示しているネットワーク構成図ソフトウェア Shumoku の、会場デモの詳細と導入手順・連携設定。',
  },
  event: {
    label: '展示の概要',
    items: [
      { term: '展示会', detail: 'Inter BEE 2026' },
      { term: '会期', detail: '2026年11月18日（水）〜20日（金）' },
      { term: '会場', detail: '幕張メッセ' },
      { term: 'INTER BEE MoIP', detail: '展示ホール3　ブース 3401' },
    ],
  },
  title: 'IP 化した設備にも、地図を。',
  lead: '機器から集めた接続情報で構成図を描き、その上に通信量と監視のアラームを重ねて表示します。配線を変えても、集め直せば図が追いつきます。',
  places: {
    label: '会場で見られる場所',
    items: [
      {
        id: 'moip',
        name: 'INTER BEE MoIP',
        where: '展示ホール3　ブース 3401',
        detail: '東京・名古屋・大阪・幕張をつなぐ設備全体を、1枚の構成図で表示しています。',
        href: '#moip',
      },
      {
        id: 'booth',
        name: '輝日株式会社ブース',
        where: '輝日株式会社の出展ブース',
        detail: 'ケーブルを1本抜くと、構成図が変わる様子を実演しています。',
        href: '#booth',
      },
    ],
  },
  moip: {
    title: '遠く離れた拠点を、一つのシステムとして見る。',
    body: [
      'BEEMO では、拠点の設備を見守る仕事を統合監視・構成管理・PTP 監視などに分け、複数の製品で受け持っています。Shumoku の担当は構成管理です。',
      '各機器から LLDP / SNMP で集めた接続情報で拠点をまたぐ構成図を描き、Zabbix のアラームと通信量を重ねています。',
    ],
    overviewSlot: '全体図：東京・名古屋・大阪・幕張',
    sites: '左から 幕張（会場）、大阪（堂島）、東京（赤坂）、名古屋。',
    detailSlot: '拡大：アラームの出ている機器',
    points: [
      'ポートごとのつながり。機器とポートごとに、接続先が分かります。',
      'Zabbix のアラーム。アラームの出た機器が、図の上に表示されます。',
    ],
    integrations:
      'Prometheus・Grafana にも対応しています。自社の環境に合わせた連携も、ご相談ください。',
    note: 'Shumoku はつながりと状態を図に表すソフトウェアです。映像の品質や時刻同期そのものは測りません。',
  },
  features: {
    title: 'Shumoku でできること',
    items: [
      'ポートまで分かる。機器ごとのポートと、その接続先まで表示します。',
      '異常の場所が分かる。監視システムのアラームを、該当する機器に表示します。',
      '通信量が線で分かる。機器のあいだのデータ量を、線の色で表示します。',
    ],
  },
  booth: {
    title: '輝日ブース：ケーブルを1本抜くと、地図が変わる。',
    body: [
      '2台のスイッチをつなぐ Primary を抜くと、通信は Backup へ。その切り替えが数秒で構成図に出ます。',
      '会場では、実際にケーブルを抜き差ししてご覧いただけます。',
    ],
    alt: 'ブースのデモの構成図。2台のスイッチとコアスイッチ、ホストが、ポート名と VLAN つきでつながっている',
    caption: 'ブースのデモ画面。スイッチ3台とホストを、ポート名と VLAN つきで描いています。',
    actions: [{ label: 'ライブデモを開く', href: demoUrl }],
  },
  setup: {
    title: '導入手順と連携設定',
    body: 'Shumoku Server を立ち上げ、機器や監視システムとつなぐ手順はドキュメントにまとめています。Zabbix・Prometheus・Grafana などとの連携は「連携」のページで確認できます。',
    actions: [
      { label: 'Server の導入手順', href: docsUrl(l, 'server') },
      { label: '連携できるデータソース', href: `/${l}/integrations` },
      { label: 'Playground で試す', href: `/${l}/playground` },
      { label: 'GitHub', href: repo },
    ],
  },
  partner: {
    title: '導入・保守のご相談は、輝日株式会社へ',
    body: [
      '輝日株式会社は、Shumoku の商用サポートパートナーです。導入支援、保守、監視との連携、PoC を相談できます。',
      '筑波大学発で、回線や認証基盤から映像配信まで、インフラの現場を持つ会社です。',
    ],
    credit: '開発　Shumoku プロジェクト　／　出展・導入支援　輝日株式会社',
    independence:
      'Shumoku は独立したオープンソースプロジェクトです。輝日株式会社は非独占のパートナーで、技術方針とリリースは Shumoku プロジェクトが決めます。',
    logo: '輝日株式会社のサイトを開く',
    actions: [
      { label: '輝日株式会社のサイト', href: telhiUrl },
      { label: `${contactEmail} に相談する`, href: `mailto:${contactEmail}` },
      { label: '相談できること', href: `/${l}/support` },
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
    title: 'InterBEE 2026 demo | Shumoku',
    description:
      'Shumoku, network diagram software, at INTER BEE MoIP (Hall 3, booth 3401): what the demo shows, how to deploy it, and how to connect your monitoring.',
  },
  event: {
    label: 'Exhibition',
    items: [
      { term: 'Event', detail: 'Inter BEE 2026' },
      { term: 'Dates', detail: 'Nov 18–20, 2026' },
      { term: 'Venue', detail: 'Makuhari Messe' },
      { term: 'INTER BEE MoIP', detail: 'Hall 3, booth 3401' },
    ],
  },
  title: 'A map for IP-based facilities',
  lead: 'Shumoku draws your network diagram from connection data collected from the devices, then overlays traffic and monitoring alarms on it. When the cabling changes, collect again and the diagram catches up.',
  places: {
    label: 'Where to see it',
    items: [
      {
        id: 'moip',
        name: 'INTER BEE MoIP',
        where: 'Hall 3, booth 3401',
        detail: 'The whole facility linking Tokyo, Nagoya, Osaka and Makuhari, on one diagram.',
        href: '#moip',
      },
      {
        id: 'booth',
        name: 'TelHi Corporation booth',
        where: 'TelHi Corporation’s exhibition booth',
        detail: 'Unplug one cable and watch the diagram change.',
        href: '#booth',
      },
    ],
  },
  moip: {
    title: 'Distant sites, seen as one system.',
    body: [
      'BEEMO splits the work of watching over the sites’ facilities into integrated monitoring, configuration management, PTP monitoring and more, each handled by different products. Shumoku handles configuration management.',
      'It draws a diagram across the sites from connection data collected from each device over LLDP / SNMP, with Zabbix alarms and traffic overlaid.',
    ],
    overviewSlot: 'Overview: Tokyo, Nagoya, Osaka and Makuhari',
    sites: 'From the left: Makuhari (the venue), Osaka (Dojima), Tokyo (Akasaka), Nagoya.',
    detailSlot: 'Close-up: a device with an alarm',
    points: [
      'Connections by port. For each device and port, you can see what it connects to.',
      'Zabbix alarms. Devices with an alarm are marked on the diagram.',
    ],
    integrations:
      'Prometheus and Grafana are supported too. Ask us about integrations for your own environment.',
    note: 'Shumoku shows connections and state. It does not measure video quality or time synchronization themselves.',
  },
  features: {
    title: 'What Shumoku does',
    items: [
      'Down to the port. Each device’s ports and what they connect to.',
      'Where the problem is. Alarms from your monitoring, on the affected device.',
      'Traffic on every line. The data between devices, shown by the line’s color.',
    ],
  },
  booth: {
    title: 'TelHi booth: unplug one cable, and the map changes.',
    body: [
      'Unplug the Primary link between two switches and traffic moves to Backup. The switch-over reaches the diagram within seconds.',
      'At the booth you can pull and reconnect the cable yourself.',
    ],
    alt: 'The booth demo diagram: two switches, a core switch and a host connected with port names and VLANs',
    caption: 'The booth demo. Three switches and a host, drawn with port names and VLANs.',
    actions: [{ label: 'Open the live demo', href: demoUrl }],
  },
  setup: {
    title: 'Deployment and integrations',
    body: 'The documentation covers starting Shumoku Server and connecting it to your devices and monitoring. See Integrations for Zabbix, Prometheus, Grafana and other sources.',
    actions: [
      { label: 'Deploy Server', href: docsUrl(l, 'server') },
      { label: 'Supported data sources', href: `/${l}/integrations` },
      { label: 'Try the Playground', href: `/${l}/playground` },
      { label: 'GitHub', href: repo },
    ],
  },
  partner: {
    title: 'Deployment and maintenance: TelHi Corporation',
    body: [
      'TelHi Corporation (輝日株式会社) is a commercial support partner for Shumoku. Talk to them about deployment, maintenance, integration with your monitoring, and proofs of concept.',
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
