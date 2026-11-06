import { docsUrl, editorOrigin, type Locale } from '$lib/site'

/** Copy for Home, Features and Integrations. The Japanese text is the reviewed source. */

export const liveDemoUrl = 'https://demo.shumoku.dev/share/topologies/R71ZG1gEigiVY82YKpgDT03I'
const repo = 'https://github.com/konoe-akitoshi/shumoku'

export type Action = { label: string; href: string }
export type Row = readonly string[]

const ja = (l: Locale) => ({
  home: {
    meta: {
      title: 'Shumoku — ネットワークにも、地図が必要だ。',
      description:
        'Shumoku は、機器とポートの接続情報からネットワーク構成図を生成するオープンソースのソフトウェアです。',
    },
    hero: {
      // Particles in [brackets] are set smaller so the nouns carry the line.
      title: ['ネットワーク[にも]、', '地図[が]必要だ。'],
      body: [
        'Shumoku は、機器とポートの接続情報からネットワーク構成図を生成するオープンソースのソフトウェアです。',
        '自分たちの環境で動かす運用アプリ Shumoku Server では、構成図に通信量やアラートを重ねて表示できます。気になる機器や接続を見つけ、その周辺に何がつながっているかを同じ図で確認できます。',
      ],
      demo: { label: 'ライブデモを見る', href: liveDemoUrl },
      deploy: { label: 'Server を導入する', href: docsUrl(l, 'server') },
      imageAlt: 'Shumoku Server の構成図。接続線の色で通信量を示している',
      detailAlt:
        '接続線にカーソルを合わせた画面。SW-J5-01 から SW-J5-EPS への帯域、通信量、使用率、状態が表示されている',
      caption: 'JANOG57 NOC で使われた Shumoku Server の画面',
      released: (date: string, name: string) => {
        const [, month, day] = date.split('-').map(Number)
        return `${month}月${day}日に ${name} を公開しました。`
      },
      notes: 'リリースノート',
    },
    scenes: {
      title: '運用で役立つ場面',
      problem:
        '手で描いた構成図は、配線や機器の変更に更新が追いつかず、いつの間にか実態とずれていきます。Shumoku は接続情報から図を生成し直すので、図を変更に追従させられます。',
      items: [
        {
          title: '配線変更後の図を更新する',
          body: '接続先のデータを修正して図を生成し直すと、変更後のつながりを確認できます。',
        },
        {
          title: '負荷の高いリンクの接続先を調べる',
          body: '使用率を図で見つけ、その線をたどって両端の機器とポートを確認できます。',
        },
        {
          title: '調査中の接続をチームに伝える',
          body: '閲覧専用リンクで同じ図を開き、対象の機器やポートを指しながら引き継げます。',
        },
      ],
      slot: '配線変更の前後で生成し直した構成図',
      before: '変更前（Ethernet1）',
      after: '変更後（Ethernet2）',
      loadAlt: '接続線にカーソルを合わせ、両端の機器と使用率を確認している画面',
      shareAlt: '閲覧専用リンクを作成する Share Link ダイアログ',
      action: { label: '機能を見る', href: `/${l}/features` },
    },
    adoption: {
      title: '利用実績',
      body: 'ネットワーク技術者のイベント JANOG57 では、ネットワーク運用チーム（NOC）が Shumoku を利用しました。構成図上にトラフィックを表示し、NOC のダッシュボードにも組み込みました。',
      imageAlt: 'JANOG57 NOC のダッシュボード。構成図とメトリクスが並んでいる',
      caption: 'JANOG57 NOC のダッシュボード',
      adoptersLabel: 'Shumoku を利用した組織とイベント',
    },
    model: {
      title: '構成をデータで扱う',
      body: [
        'Shumoku では、機器、ポート、接続、拠点ごとのグループを構成データとして定義します。たとえば、ルーター edge-01 の xe-0/0/0 と、スイッチ core-01 の Ethernet1 を結ぶ接続を YAML に記述すると、機器とポートの関係が図になります。',
        '接続先を Ethernet2 に変更したら、定義を書き換えて図を再生成します。定義を Git で管理すれば、「接続先を Ethernet1 から Ethernet2 に変更した」という差分をレビューできます。同じ構成定義から、ドキュメントに載せる図を生成したり、Server に構成図を用意して監視値を重ねたりできます。',
      ],
      switchLabel: 'core-01 側の接続先',
      generated: '公開パッケージがこの YAML から生成した図',
      diagramAlt: (port: string) => `edge-01 の xe-0/0/0 と core-01 の ${port} が接続された構成図`,
      action: { label: 'Playground で図をつくる', href: `/${l}/playground` },
    },
    gallery: {
      title: '生成した図',
      body: '公開中のパッケージで、例の YAML から生成した図です。拠点ごとのまとまり、機器の状態、サブネットごとのグループを描き分けます。',
      items: {
        'full-featured': '複数拠点と冗長構成、仮想化基盤',
        'device-status': '稼働中・障害・計画中など機器の状態',
        'prefix-subgraph': 'サブネットごとのグループ',
      },
      action: { label: 'Playground で図をつくる', href: `/${l}/playground` },
    },
    integrations: {
      title: 'いまある環境との連携',
      body: [
        'NetBox に登録した機器やケーブル情報を使って構成図を生成できます。機器を探索し、SNMP・LLDP で得た隣接関係を図にする方法もあります。',
        'Zabbix や Prometheus が収集した監視値は、Server の図に重ねられます。図のポートと監視対象のインターフェースを対応付けると、その接続の使用率を図で確認できます。',
      ],
      action: { label: '対応する連携を見る', href: `/${l}/integrations` },
    },
    openSource: {
      title: 'OSS としての利用と参加',
      body: [
        'Shumoku は、ネットワークの構造と状態を理解するための道具を、オープンソースで開発しています。ソースコードは AGPL-3.0 で公開し、Server は自分たちの環境に導入して運用できます。利用に有償サポートの契約は必要ありません。',
        'GitHub では開発状況や変更内容を確認できます。使い方の相談や改善案の共有は、Discord や GitHub Discussions で受け付けています。',
      ],
      actions: [
        { label: 'GitHub', href: repo },
        { label: 'ライセンス', href: `${repo}/blob/main/LICENSE` },
        { label: 'ブログ', href: `/${l}/blog` },
        { label: 'コミュニティ', href: `/${l}/community` },
        { label: 'Shumoku について', href: `/${l}/about` },
      ],
    },
    start: {
      title: '試用と導入',
      commands: {
        cli: 'YAML から図を生成する（インストール不要）',
        server: 'Server を起動する',
        copy: 'コピー',
        copied: 'コピーしました',
      },
      items: [
        {
          title: '運用画面を見る',
          body: 'ライブデモで、トラフィックが表示された構成図を閲覧できます。',
          action: { label: 'ライブデモ', href: liveDemoUrl },
        },
        {
          title: '自分で図をつくる',
          body: 'Playground で YAML を編集し、生成した図を確認できます。',
          action: { label: 'Playground', href: `/${l}/playground` },
        },
        {
          title: '自社で使う',
          body: '公開 Docker イメージで Server を起動し、構成図を用意します。監視値も表示する場合は監視ツールを接続します。',
          action: { label: '導入ガイド', href: docsUrl(l, 'server') },
        },
      ],
      note: '導入や既存環境との連携を自分たちだけで進めるのが難しいときは、私たちが有償でお手伝いします。',
      support: { label: '導入相談', href: `/${l}/support` },
    },
    faq: {
      title: 'よくある質問',
      items: [
        {
          q: 'NetBox や監視ツールの代わりになりますか？',
          a: 'なりません。Shumoku は構成情報や監視値を自分では集めません。YAML、NetBox、SNMP・LLDP による探索から構成を取り込み、Zabbix や Prometheus などが集めた監視値を図に重ねます。',
        },
        {
          q: '利用に契約や費用は必要ですか？',
          a: 'ソースコードは AGPL-3.0 で公開しており、利用に契約は必要ありません。自社環境での調査や設定、期限のある対応が必要な場合は、有償の支援を依頼できます。',
        },
        {
          q: 'Server はクラウドサービスですか？',
          a: 'Server は自分たちの環境に導入して運用するアプリです。公開 Docker イメージから起動します。',
        },
        {
          q: 'Server を入れずに使えますか？',
          a: 'CLI とライブラリで、YAML から SVG・PNG・HTML の図を生成できます。ドキュメント用の図や CI での生成に向いています。',
        },
      ],
    },
    activity: {
      title: '最近の動き',
      kinds: { release: 'リリース', article: 'ブログ', event: 'イベント' },
      upcoming: '予定',
    },
  },
  features: {
    title: '機能',
    description: '構成図の生成と更新、Server での監視と共有、CLI とライブラリ、Editor について。',
    sections: {
      generate: {
        title: '構成図の生成と更新',
        body: [
          'Shumoku Server は、構成図を管理し、監視データと一緒にブラウザーで見るためのアプリです。まず YAML を取り込むか、NetBox やネットワーク探索から機器・接続の情報を取得します。',
          'Shumoku がネットワークの階層を考慮して機器とリンクを自動配置し、ポート名や拠点ごとのまとまりを図にします。ベンダーや機器に応じたアイコンも利用できます。構成を変更したときは、更新した YAML を取り込むか、外部ソースから構成情報を取得し直して図に反映します。',
          '監視ツールを接続せず、構成図の閲覧・共有だけに使うこともできます。NetBox がない環境でも、YAML から始められます。',
        ],
        imageAlt: '機器の種類やベンダーに応じたアイコンで描かれた構成図',
        action: { label: '構成情報の入力元を見る', href: `/${l}/integrations` },
      },
      monitor: {
        title: 'Server での監視と調査',
        body: [
          '図の機器やリンクを監視対象に対応付けると、Server は監視ツールから取得した使用率やアラートを図に表示します。',
          '構成図はブラウザーで拡大・移動して閲覧できます。リンクの使用率は色で表されます。この表示がウェザーマップです。使用率が高い線を見つけたら、両端の機器名とポート名を確認し、どの接続かを特定できます。アラートは対象の機器に表示されるため、接続先も同じ図でたどれます。',
          '複数の構成図とメトリクス表示を組み合わせたダッシュボードも作れます。拠点ごとの図や、チームが継続して見る値を一つの画面に並べられます。',
        ],
        weathermapTitle: 'ウェザーマップ',
        alertTitle: 'アラート',
        dashboardTitle: 'ダッシュボード',
        weathermapAlt: '接続線にカーソルを合わせ、通信量と使用率を表示した画面',
        alertAlt: '構成図上の機器にアラートが表示された画面',
        dashboardAlt: '複数の構成図とメトリクスを並べたダッシュボード',
        action: { label: '監視データの連携を見る', href: `/${l}/integrations` },
      },
      share: {
        title: '構成図の共有',
        body: [
          'Server で構成図やダッシュボードの閲覧専用リンクを作成できます。リンクを受け取った人はログインせずに同じ図を開き、機器名やポート、接続先を確認できます。調査や引き継ぎで、どの接続について話しているかを共有できます。',
        ],
        caution:
          'リンクを知っている人が閲覧できるため、共有先は図に含まれる構成情報を見せられる相手に限定してください。',
        imageAlt: '閲覧専用リンクを作成する Share Link ダイアログ',
        action: { label: 'Server の導入・設定ガイド', href: docsUrl(l, 'server') },
      },
      cli: {
        title: 'CLI とライブラリでの図の生成',
        commandLabel: 'YAML から図を生成する',
        copy: 'コピー',
        copied: 'コピーしました',
        body: [
          'ドキュメント用の図を生成したり、自作ツールに構成図を組み込んだりする場合は、CLI とライブラリを利用できます。Server の導入なしで、共通の構成モデルと描画機能を使えます。',
          'CLI は構成定義の YAML から SVG・PNG・HTML を生成します。HTML では図を拡大・移動して閲覧できます。生成コマンドを CI に組み込めば、構成定義の変更に合わせてドキュメント用の図を更新できます。',
          'ライブラリでは、構成モデルと図の生成処理を自作ツールに組み込めます。利用するレンダラーに応じてブラウザーや Node.js で実行でき、PNG の生成は Node.js 向けです。',
        ],
        actions: [
          { label: 'CLI の使い方', href: docsUrl(l, 'cli') },
          { label: 'ライブラリの使い方', href: docsUrl(l, 'library') },
        ],
      },
      editor: {
        title: 'Editor',
        badge: 'Beta',
        body: [
          'Editor は、ブラウザーで機器を配置し、ポート間をケーブルで結んで物理構成を設計するツールです。現在は Beta です。配線を検討しながら、必要な部材の一覧や PoE の電力計算を確認できます。',
          'プロジェクトはブラウザー内に保存され、ファイルとして書き出せます。Shumoku の描画エンジンを使う独立したアプリとして提供しています。',
        ],
        slot: 'Editor で機器を配置し、ケーブルを結んでいる画面',
        action: { label: 'Editor を開く', href: editorOrigin },
      },
    },
  },
  integrations: {
    title: '連携',
    description: '構成図の入力元、監視データの取得元、図と監視値の対応付けについて。',
    inputs: {
      title: '構成図の入力',
      body: 'Shumoku Server は、機器と接続の情報を取り込んで構成図を生成します。構成をファイルに記述する方法、NetBox の登録情報を使う方法、機器の隣接関係を探索する方法があります。',
      head: ['入力元', '構成図に使う情報', '用意するもの'],
      rows: [
        ['YAML', '記述した機器・ポート・接続', '構成定義ファイル'],
        ['NetBox', '登録された機器・ケーブル情報', 'NetBox への接続情報と API アクセス権'],
        ['SNMP・LLDP による探索', '機器と隣接接続', '探索を始める機器、到達性、SNMP の接続設定'],
        ['Zabbix', 'ホストと LLDP の隣接情報', 'Zabbix への接続設定と必要な収集データ'],
      ],
      note: '探索で図にできるのは、機器から取得できた接続です。LLDP の隣接情報を取得できない接続もあるため、描きたい範囲の情報が入力元にそろっているかを確認します。',
      imageAlt: 'NetBox をデータソースとして設定する画面',
    },
    monitoring: {
      title: '監視データの取得',
      body: 'Server は、既存の監視ツールから通信量やアラートを取得し、構成図に表示します。監視ツール側で収集しているデータと、Shumoku の連携機能に応じて、表示できる情報が決まります。',
      head: ['ソース', '主な取得情報'],
      rows: [
        ['Zabbix', 'トラフィック、ホスト情報、アラート'],
        ['Prometheus', 'メトリクス、ホスト情報、Alertmanager のアラート'],
        ['Grafana', 'Webhook または Alertmanager 経由のアラート'],
        ['Aruba Instant On', 'ホスト情報、メトリクス、アラート'],
        ['Arista CV-CUE', 'AP・スイッチの情報、メトリクス、アラート'],
      ],
      settings:
        '接続先の URL、認証情報、取得対象などを Server のデータソース設定で指定します。必要な項目はソースごとに異なります。',
      plugin:
        '独自の台帳や API と連携する場合は、データソースプラグインを開発して、構成情報や監視データの取り込みを拡張できます。開発するプラグインで、取得元の情報を Shumoku の構成・監視データに変換します。',
      action: {
        label: 'プラグイン開発ガイド',
        href: `${repo}/blob/main/docs/plugin-authoring.md`,
      },
    },
    mapping: {
      title: '対応付けと更新条件',
      body: [
        '構成図に監視値を重ねるには、図の機器を監視対象のホストに、リンクを対象インターフェースに対応付けます。たとえば edge-01 の xe-0/0/0 に接続する線には、そのインターフェースの監視値を割り当てます。',
        '配線や機器の変更を図に反映するには、構成情報を取り込み直します。通信量やアラートは、接続した監視ソースの設定に従って更新されます。API から定期取得する値と Webhook で届くアラートでは、更新のきっかけも異なります。',
        '監視値が表示されない場合は、機器・インターフェースの対応付け、データソースの接続状態、接続先でのデータ収集を確認します。',
      ],
      action: { label: 'Server の設定ガイド', href: docsUrl(l, 'server') },
    },
  },
})

const en = (l: Locale): ReturnType<typeof ja> => ({
  home: {
    meta: {
      title: 'Shumoku — Your network needs a map, too.',
      description:
        'Shumoku is open-source software that generates network diagrams from device and port connection data.',
    },
    hero: {
      title: ['Your network', 'needs a map, too.'],
      body: [
        'Shumoku is open-source software that generates network diagrams from device and port connection data.',
        'Shumoku Server, the operations app you run in your own environment, overlays traffic and alerts on those diagrams. Spot a device or link that needs attention, and see what connects around it on the same diagram.',
      ],
      demo: { label: 'View the live demo', href: liveDemoUrl },
      deploy: { label: 'Deploy Server', href: docsUrl(l, 'server') },
      imageAlt: 'A Shumoku Server topology. Link colors show traffic.',
      detailAlt:
        'Hovering a link shows the bandwidth, traffic, utilization and status between SW-J5-01 and SW-J5-EPS.',
      caption: 'Shumoku Server as used by the JANOG57 NOC',
      released: (date: string, name: string) =>
        `${name} was released on ${new Date(`${date}T00:00:00Z`).toLocaleDateString('en', { month: 'long', day: 'numeric', timeZone: 'UTC' })}.`,
      notes: 'Release notes',
    },
    scenes: {
      title: 'Where it helps in operations',
      problem:
        'Hand-drawn diagrams fall behind every recabling and device change until they no longer match the network. Shumoku regenerates the diagram from connection data, so it keeps up with the change.',
      items: [
        {
          title: 'Update the diagram after recabling',
          body: 'Correct the connection data and regenerate the diagram to see the new connections.',
        },
        {
          title: 'Trace a busy link to its ends',
          body: 'Find high utilization on the diagram, then follow the line to the devices and ports at both ends.',
        },
        {
          title: 'Show the team the link you are investigating',
          body: 'Open the same diagram from a view-only link and hand over by pointing at the device or port.',
        },
      ],
      slot: 'The diagram regenerated before and after recabling',
      before: 'Before (Ethernet1)',
      after: 'After (Ethernet2)',
      loadAlt: 'Hovering a link to check the devices at both ends and its utilization',
      shareAlt: 'The Share Link dialog that creates a view-only link',
      action: { label: 'See the features', href: `/${l}/features` },
    },
    adoption: {
      title: 'In use',
      body: 'At JANOG57, a conference for network engineers, the network operations team (NOC) used Shumoku. They showed traffic on the topology and built it into the NOC dashboard.',
      imageAlt: 'The JANOG57 NOC dashboard with topologies and metrics side by side',
      caption: 'The JANOG57 NOC dashboard',
      adoptersLabel: 'Organizations and events that have used Shumoku',
    },
    model: {
      title: 'Treat your network as data',
      body: [
        'In Shumoku you define devices, ports, links and per-site groups as configuration data. Describe a link between port xe-0/0/0 on router edge-01 and Ethernet1 on switch core-01 in YAML, and the relationship between devices and ports becomes a diagram.',
        'When the link moves to Ethernet2, edit the definition and regenerate the diagram. Keep the definition in Git and the change “moved from Ethernet1 to Ethernet2” becomes a reviewable diff. The same definition can produce diagrams for your documentation, or a topology in Server with monitoring values on top.',
      ],
      switchLabel: 'Port on core-01',
      generated: 'Generated from this YAML by the released packages',
      diagramAlt: (port: string) => `A diagram linking xe-0/0/0 on edge-01 to ${port} on core-01`,
      action: { label: 'Make a diagram in the Playground', href: `/${l}/playground` },
    },
    gallery: {
      title: 'Generated diagrams',
      body: 'Diagrams generated from example YAML by the released packages: per-site groups, device status and grouping by subnet.',
      items: {
        'full-featured': 'Several sites, redundant pairs and a virtualization cluster',
        'device-status': 'Device status: active, failed, planned and more',
        'prefix-subgraph': 'Grouping by subnet',
      },
      action: { label: 'Make a diagram in the Playground', href: `/${l}/playground` },
    },
    integrations: {
      title: 'Works with what you already run',
      body: [
        'Generate diagrams from the devices and cables registered in NetBox. You can also discover devices and draw the neighbor relationships found through SNMP and LLDP.',
        'Monitoring values collected by Zabbix or Prometheus can be overlaid on Server diagrams. Map a port on the diagram to the monitored interface to see that link’s utilization on the diagram.',
      ],
      action: { label: 'See supported integrations', href: `/${l}/integrations` },
    },
    openSource: {
      title: 'Use it and take part as open source',
      body: [
        'Shumoku develops tools for understanding the structure and state of networks as open source. The source code is published under AGPL-3.0, and you can deploy and run Server in your own environment. No paid support contract is required.',
        'Follow development and changes on GitHub. Questions and ideas are welcome on Discord and GitHub Discussions.',
      ],
      actions: [
        { label: 'GitHub', href: repo },
        { label: 'License', href: `${repo}/blob/main/LICENSE` },
        { label: 'Blog', href: `/${l}/blog` },
        { label: 'Community', href: `/${l}/community` },
        { label: 'About Shumoku', href: `/${l}/about` },
      ],
    },
    start: {
      title: 'Try it and deploy it',
      commands: {
        cli: 'Generate a diagram from YAML (no install)',
        server: 'Start Server',
        copy: 'Copy',
        copied: 'Copied',
      },
      items: [
        {
          title: 'See it in operation',
          body: 'Browse a topology with live traffic in the live demo.',
          action: { label: 'Live demo', href: liveDemoUrl },
        },
        {
          title: 'Make your own diagram',
          body: 'Edit YAML in the Playground and check the generated diagram.',
          action: { label: 'Playground', href: `/${l}/playground` },
        },
        {
          title: 'Run it for your team',
          body: 'Start Server from the public Docker image and prepare a topology. Connect a monitoring tool to show monitoring values as well.',
          action: { label: 'Deployment guide', href: docsUrl(l, 'server') },
        },
      ],
      note: 'If deploying or connecting it to your environment is more than your team can take on, we can help as paid work.',
      support: { label: 'Talk to us', href: `/${l}/support` },
    },
    faq: {
      title: 'Questions',
      items: [
        {
          q: 'Does it replace NetBox or my monitoring tool?',
          a: 'No. Shumoku does not collect configuration or monitoring data itself. It imports topology from YAML, NetBox or SNMP/LLDP discovery, and overlays the values that tools such as Zabbix and Prometheus collect.',
        },
        {
          q: 'Do I need a contract or a paid plan?',
          a: 'The source code is published under AGPL-3.0 and using it requires no contract. Paid help is available when you need work in your own environment, configuration or deadline-bound changes.',
        },
        {
          q: 'Is Server a cloud service?',
          a: 'Server is an app you deploy and run in your own environment, started from the public Docker image.',
        },
        {
          q: 'Can I use it without Server?',
          a: 'The CLI and library generate SVG, PNG and HTML diagrams from YAML, which suits documentation and generating diagrams in CI.',
        },
      ],
    },
    activity: {
      title: 'Recent activity',
      kinds: { release: 'Release', article: 'Blog', event: 'Event' },
      upcoming: 'Upcoming',
    },
  },
  features: {
    title: 'Features',
    description:
      'Generating and updating diagrams, monitoring and sharing in Server, the CLI and library, and the Editor.',
    sections: {
      generate: {
        title: 'Generate and update diagrams',
        body: [
          'Shumoku Server manages topologies and shows them in the browser together with monitoring data. Start by importing YAML, or fetch devices and links from NetBox or network discovery.',
          'Shumoku lays out devices and links automatically with the network hierarchy in mind, and draws port names and per-site groups. Icons for vendors and device types are available. When the network changes, import the updated YAML or fetch from the external source again to update the diagram.',
          'You can also use it only to view and share diagrams, without connecting a monitoring tool. Without NetBox, start from YAML.',
        ],
        imageAlt: 'A diagram drawn with icons for each device type and vendor',
        action: { label: 'See configuration sources', href: `/${l}/integrations` },
      },
      monitor: {
        title: 'Monitor and investigate in Server',
        body: [
          'Map devices and links on the diagram to monitored objects, and Server shows the utilization and alerts from your monitoring tool on the diagram.',
          'Zoom and pan diagrams in the browser. Link utilization is shown by color: this view is the weathermap. When you find a busy line, read the device and port names at both ends to identify the link. Alerts appear on the affected device, so you can follow its connections on the same diagram.',
          'You can also build dashboards that combine several diagrams and metric panels, placing per-site diagrams and the values your team watches on one screen.',
        ],
        weathermapTitle: 'Weathermap',
        alertTitle: 'Alerts',
        dashboardTitle: 'Dashboard',
        weathermapAlt: 'Hovering a link to show its traffic and utilization',
        alertAlt: 'An alert shown on a device in the diagram',
        dashboardAlt: 'A dashboard with several diagrams and metrics',
        action: { label: 'See monitoring integrations', href: `/${l}/integrations` },
      },
      share: {
        title: 'Share diagrams',
        body: [
          'Server creates view-only links to topologies and dashboards. Recipients open the same diagram without signing in and can check device names, ports and connections. During an investigation or handover, everyone knows which link is being discussed.',
        ],
        caution:
          'Anyone with the link can view it, so share it only with people who may see the configuration shown in the diagram.',
        imageAlt: 'The Share Link dialog that creates a view-only link',
        action: { label: 'Server deployment and configuration guide', href: docsUrl(l, 'server') },
      },
      cli: {
        title: 'Generate diagrams with the CLI and library',
        commandLabel: 'Generate a diagram from YAML',
        copy: 'Copy',
        copied: 'Copied',
        body: [
          'To generate diagrams for documentation or embed them in your own tools, use the CLI and library. They share the same configuration model and renderer without deploying Server.',
          'The CLI generates SVG, PNG and HTML from YAML definitions. In HTML you can zoom and pan the diagram. Add the command to CI to keep documentation diagrams in step with changes to the definition.',
          'The library brings the configuration model and diagram generation into your own tools. Depending on the renderer it runs in the browser or Node.js; PNG output is for Node.js.',
        ],
        actions: [
          { label: 'Using the CLI', href: docsUrl(l, 'cli') },
          { label: 'Using the library', href: docsUrl(l, 'library') },
        ],
      },
      editor: {
        title: 'Editor',
        badge: 'Beta',
        body: [
          'The Editor is a browser tool for designing physical layouts: place devices and connect ports with cables. It is currently in beta. While planning the cabling you can check the bill of materials and PoE power budget.',
          'Projects are saved in the browser and can be exported as files. It is a standalone app built on the Shumoku rendering engine.',
        ],
        slot: 'Placing devices and connecting cables in the Editor',
        action: { label: 'Open the Editor', href: editorOrigin },
      },
    },
  },
  integrations: {
    title: 'Integrations',
    description:
      'Where topologies come from, where monitoring data comes from, and how the two are mapped.',
    inputs: {
      title: 'Topology sources',
      body: 'Shumoku Server builds topologies from device and connection data. Describe the network in a file, use what is registered in NetBox, or discover neighbor relationships between devices.',
      head: ['Source', 'Used for the diagram', 'What you need'],
      rows: [
        ['YAML', 'The devices, ports and links you describe', 'A definition file'],
        ['NetBox', 'Registered devices and cables', 'NetBox connection details and API access'],
        [
          'SNMP and LLDP discovery',
          'Devices and neighbor links',
          'A seed device, reachability and SNMP settings',
        ],
        [
          'Zabbix',
          'Hosts and LLDP neighbor data',
          'Zabbix connection settings and the required collected data',
        ],
      ],
      note: 'Discovery can only draw the connections that devices report. Some links have no LLDP neighbor data, so check that the source covers the area you want to draw.',
      imageAlt: 'Configuring NetBox as a data source',
    },
    monitoring: {
      title: 'Monitoring data',
      body: 'Server fetches traffic and alerts from your existing monitoring tools and shows them on the topology. What can be shown depends on the data your monitoring tool collects and on Shumoku’s integration.',
      head: ['Source', 'Main data'],
      rows: [
        ['Zabbix', 'Traffic, host information, alerts'],
        ['Prometheus', 'Metrics, host information, Alertmanager alerts'],
        ['Grafana', 'Alerts via webhook or Alertmanager'],
        ['Aruba Instant On', 'Host information, metrics, alerts'],
        ['Arista CV-CUE', 'AP and switch information, metrics, alerts'],
      ],
      settings:
        'Set the endpoint URL, credentials and targets in Server’s data source settings. The required fields differ by source.',
      plugin:
        'To connect your own inventory or API, write a data source plugin that extends how configuration and monitoring data are imported. The plugin converts the source’s data into Shumoku configuration and monitoring data.',
      action: {
        label: 'Plugin authoring guide',
        href: `${repo}/blob/main/docs/plugin-authoring.md`,
      },
    },
    mapping: {
      title: 'Mapping and updates',
      body: [
        'To overlay monitoring values, map each device in the diagram to a monitored host and each link to an interface. For example, the line connected to xe-0/0/0 on edge-01 gets that interface’s values.',
        'To reflect cabling or device changes, import the configuration again. Traffic and alerts update according to the settings of each monitoring source. Values fetched from an API on a schedule and alerts arriving by webhook are updated by different triggers.',
        'If monitoring values do not appear, check the device and interface mapping, the data source connection and data collection at the source.',
      ],
      action: { label: 'Server configuration guide', href: docsUrl(l, 'server') },
    },
  },
})

export const productCopy = (locale: Locale) => (locale === 'ja' ? ja(locale) : en(locale))
