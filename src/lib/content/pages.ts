import { communityUrl } from '$lib/announcement'
import type { Locale } from '$lib/site'

/** Copy for Support and Community. The Japanese text is the reviewed source (site copy plan). */

const repo = 'https://github.com/konoe-akitoshi/shumoku'
const discord = 'https://discord.gg/dyYbEsDZYr'
export const contactEmail = 'contact@shumoku.dev'

const ja = (l: Locale) => ({
  support: {
    title: '導入相談',
    description: 'Shumoku の導入や既存ツールとの連携を、有償で支援します。',
    scope: {
      title: '相談できること',
      lead: 'Shumoku は OSS として自分たちで導入・運用できます。自社環境での調査や設定、連携開発が必要な場合は、作業を有償で依頼できます。',
      items: [
        'Server の導入、運用方法の検討、導入後の継続支援',
        'NetBox・Zabbix・Prometheus などとの接続調査と設定',
        '自社の構成情報と監視データの対応付け',
        '独自データソース向けのプラグイン開発',
        '自社の要件に合うかを確かめる導入前の検証（PoC）',
        '希望する期限に合わせた不具合対応や機能開発の相談',
      ],
      terms:
        '非公開の構成情報を扱う調査や、応答時間・対応期限の取り決めが必要な場合も相談できます。支援する作業、費用、日程、対応条件は個別に合意して決めます。',
      partners:
        '商用サポートは、TelHi Corporation（輝日株式会社）などのパートナーと協力して提供します。技術方針やリリースの判断は Shumoku Project が担います。',
    },
    community: {
      title: 'コミュニティで受け付けていること',
      body: '一般的な使い方の質問や、公開できる不具合の報告は、個人・企業を問わずコミュニティで受け付けています。',
      action: { label: 'コミュニティへ', href: `/${l}/community` },
    },
    contact: {
      title: '問い合わせ',
      body: '「この環境で使えるか」「この接続を図にしたい」といった段階から相談できます。利用中の台帳・監視ツールと、構成図で確認したいことをお知らせください。希望する導入時期や、依頼したい作業があれば併せてお伝えください。',
      action: { label: `${contactEmail} に相談する`, href: `mailto:${contactEmail}` },
    },
  },
  about: {
    title: 'Shumoku について',
    description:
      'Shumoku はネットワーク構成を、手で描いて古くなる静的な資料ではなく、実データから生成・更新できる運用の地図として扱うためのオープンソースプロジェクトです。',
    map: {
      title: 'つくっているもの',
      body: [
        'ネットワーク構成図は、単なる資料ではありません。機器の接続関係、通信経路、依存関係、障害の影響範囲を理解するための地図です。設計・構築・運用・障害対応で、人はこの地図を頼りに状況を判断します。',
        'しかし手で描いた図は、構成変更に更新が追いつかず、やがて実態とずれていきます。ずれた図は、かえって判断を誤らせます。必要なのは、ただ線が引かれた図ではありません。',
      ],
      conditions: [
        { term: '把握できる', detail: '全体像と接続関係が一目で読み取れる' },
        { term: '信頼できる', detail: '実ネットワークに基づいている' },
        { term: '更新できる', detail: '構成変更に追従し、継続的に再生成できる' },
      ],
    },
    name: {
      title: '名前',
      body: [
        'shumoku という名前は、実家のお茶室で見た喚鐘に由来しています。天井から吊り下げられた喚鐘を支える吊り具は、複数の点が結ばれ、全体としてひとつの構造を成しているように見えました。それは、どこかネットワークトポロジーに似ていました。',
        '喚鐘は、茶会の始まりを告げるために鳴らされます。トポロジーも、それに近いものだと考えています。ネットワークの構造が示されてはじめて、人はそれを理解し、扱い、守ることができます。',
        '喚鐘を鳴らす道具は撞木です。そして、その撞木を掛けておく金具が、撞木釘です。',
      ],
      pull: [
        '撞木釘が、撞木を静かに支えるように。',
        'shumoku は、ネットワーク運用の始まりを支えるための小さな基点です。',
      ],
      slot: 'お茶室の喚鐘と撞木釘',
    },
    logo: {
      title: '羽のロゴ',
      body: [
        'ロゴは、ガブリエルの羽をモチーフにしています。ネットワークトポロジーは、人が恣意的に作り出すものではありません。機器と機器の接続、経路、依存関係として、すでにそこに存在している構造です。',
        'ネットワーク図は、構造を作るのではなく、すでに存在している関係性に輪郭を与えるものです。羽は、派手に主張するためのものではなく、見えざる構造が静かに示される瞬間を表しています。',
      ],
      alt: 'Shumoku の羽のロゴ',
    },
    peace: {
      title: '見通しがあること',
      lead: 'ネットワーク運用における平和とは、何も起きていないように見える状態ではありません。',
      lines: [
        '混乱ではなく、見通しがあること。',
        '不安ではなく、構造が見えていること。',
        '属人的な勘ではなく、共有できる地図があること。',
      ],
      links: [
        { label: '名前とロゴについての全文', href: `${repo}/blob/main/docs/ORIGIN.md` },
        { label: '設計思想', href: `${repo}/blob/main/docs/PHILOSOPHY.md` },
      ],
    },
    community: {
      title: 'コミュニティと育てる',
      body: '2026年9月8日、最初の Shumoku Meetup を開催しました。ネットワーク図の使い方を発表する人、PCを持ち寄る人、会話を楽しむ人。コードだけでなく、使う人どうしが出会う場もつくっています。',
      alt: 'テーブルには参加者のノートPCがずらり。',
      links: [
        { label: 'コミュニティに参加する', href: `/${l}/community` },
        { label: 'Meetup #1 を写真で振り返る', href: `/${l}/blog/meetup-1` },
      ],
    },
  },
  community: {
    title: 'コミュニティ',
    description:
      '使う人も、つくる人も。質問、実例、アイデアを持ち寄り、Shumokuを一緒に育てる場所。',
    talk: {
      title: '質問と情報交換',
      body: 'Shumoku の使い方や、構成図にしたいネットワークについて相談できます。気軽なやり取りは Discord、後から参照できる質問や設計の議論は GitHub Discussions を利用してください。質問には、試していることと、どこで困っているかを添えると状況が伝わります。',
      links: [
        { label: 'Discord に参加する', href: discord },
        { label: 'GitHub Discussions', href: `${repo}/discussions` },
      ],
    },
    meetup: {
      title: 'Meetup',
      body: 'Meetup では、使う人と開発する人が集まり、ネットワーク図や活用方法について話しています。開催記で雰囲気を知り、開催予定や参加方法を connpass で確認できます。',
      links: [
        { label: 'Meetup の開催記', href: `/${l}/blog/meetup-1` },
        { label: 'イベント・参加申込', href: communityUrl },
      ],
    },
    contribute: {
      title: '不具合報告・改善提案・開発への参加',
      body: [
        '不具合を見つけたら、利用バージョンと再現手順を添えて GitHub Issues に報告できます。改善案や、こんな用途に使いたいという提案も歓迎しています。',
        'コードやドキュメントへの貢献は、開発手順と貢献ガイドを確認して始められます。',
      ],
      security: '脆弱性は公開の Issue に書かず、非公開の報告窓口を利用してください。',
      securityLink: { label: 'セキュリティポリシー', href: `${repo}/blob/main/SECURITY.md` },
      links: [
        { label: 'Issues', href: `${repo}/issues` },
        { label: '貢献ガイド', href: `${repo}/blob/main/CONTRIBUTING.md` },
        { label: 'プロジェクトの運営方針', href: `${repo}/blob/main/GOVERNANCE.md` },
        { label: '行動規範', href: `${repo}/blob/main/CODE_OF_CONDUCT.md` },
      ],
    },
    business: {
      title: '個別の環境を相談する',
      body: '企業の方もコミュニティに参加できます。非公開の構成を扱う調査や導入・連携開発など、個別の作業が必要な場合は導入相談へ。',
      links: [{ label: '導入相談', href: `/${l}/support` }],
    },
  },
})

const en = (l: Locale): ReturnType<typeof ja> => ({
  support: {
    title: 'For teams',
    description: 'Paid help with deploying Shumoku and connecting it to the tools you already run.',
    scope: {
      title: 'What we can help with',
      lead: 'Shumoku is open source, and you can deploy and run it yourself. When you need investigation, configuration or integration work in your own environment, you can commission it as paid work.',
      items: [
        'Deploying Server, planning how to operate it, and ongoing support afterwards',
        'Investigating and configuring connections to NetBox, Zabbix, Prometheus and similar tools',
        'Mapping your configuration data to your monitoring data',
        'Plugin development for your own data sources',
        'A proof of concept to check that it fits your requirements before you deploy',
        'Bug fixes or feature development on a timeline you need',
      ],
      terms:
        'Investigations that involve private configuration, or agreements on response times and deadlines, are also possible. The work, cost, schedule and terms are agreed individually.',
      partners:
        'Commercial support is provided together with partners such as TelHi Corporation. Technical direction and release decisions stay with the Shumoku Project.',
    },
    community: {
      title: 'What the community handles',
      body: 'General questions about using Shumoku and bug reports that can be shared publicly are welcome in the community, from individuals and organizations alike.',
      action: { label: 'Go to the community', href: `/${l}/community` },
    },
    contact: {
      title: 'Contact',
      body: 'You can start from “will it work in our environment?” or “we want to draw this link”. Tell us which inventory and monitoring tools you use and what you want to see in the diagram. If you have a target date or specific work in mind, include that too.',
      action: { label: `Email ${contactEmail}`, href: `mailto:${contactEmail}` },
    },
  },
  about: {
    title: 'About Shumoku',
    description:
      'Shumoku is an open-source project that treats network topology as an operational map you can generate, update and trust, rather than a drawing that slowly drifts away from reality.',
    map: {
      title: 'What we are building',
      body: [
        'A network diagram is more than a document. It is a map for understanding how devices connect, how traffic flows, what depends on what, and how far a failure reaches. People rely on it to judge the situation during design, deployment, operations and incidents.',
        'But hand-drawn diagrams fall behind every change until they no longer match the network, and then they mislead. What is needed is more than a picture with lines on it.',
      ],
      conditions: [
        { term: 'Readable', detail: 'The overall shape and connections are clear at a glance' },
        { term: 'Trustworthy', detail: 'It is based on the real network' },
        { term: 'Regenerable', detail: 'It follows changes and can be rebuilt continuously' },
      ],
    },
    name: {
      title: 'The name',
      body: [
        'The name shumoku comes from a kansho, a small hanging bell, in the tea room of my family home. The fitting that held it from the ceiling joined several points into a single structure. It looked somehow like a network topology.',
        'A kansho is rung to announce the start of a tea gathering. A topology is close to that: only once the structure of a network is shown can people understand it, work with it and protect it.',
        'The tool that strikes the bell is the shumoku. The peg that holds the striker is the shumoku-kugi.',
      ],
      pull: [
        'As the peg quietly holds the striker,',
        'shumoku is a small anchor for the start of network operations.',
      ],
      slot: 'The kansho and its peg in the tea room',
    },
    logo: {
      title: 'The feather',
      body: [
        'The logo is modeled on the feather of the angel Gabriel. A network topology is not something people invent. It already exists, as the connections, paths and dependencies between devices.',
        'A network diagram does not create that structure; it gives an outline to relationships that are already there. The feather is not there to make a statement. It stands for the moment an unseen structure is quietly shown.',
      ],
      alt: 'The Shumoku feather logo',
    },
    peace: {
      title: 'Having a clear view',
      lead: 'Peace in network operations is not a state where nothing seems to be happening.',
      lines: [
        'A clear view, not confusion.',
        'A visible structure, not anxiety.',
        'A shared map, not one person’s intuition.',
      ],
      links: [
        {
          label: 'The full story of the name and logo (Japanese)',
          href: `${repo}/blob/main/docs/ORIGIN.md`,
        },
        { label: 'Design philosophy (Japanese)', href: `${repo}/blob/main/docs/PHILOSOPHY.md` },
      ],
    },
    community: {
      title: 'Growing with the community',
      body: 'We held the first Shumoku Meetup on September 8, 2026. People shared ways to use network diagrams, brought their laptops, and talked with one another. Alongside the code, we are creating a place for the people who use it to meet.',
      alt: 'Attendees’ laptops lined up on the table.',
      links: [
        { label: 'Join the community', href: `/${l}/community` },
        { label: 'Meetup #1 in pictures', href: `/${l}/blog/meetup-1` },
      ],
    },
  },
  community: {
    title: 'Community',
    description:
      'For users and contributors alike. Share questions, examples and ideas to help shape Shumoku.',
    talk: {
      title: 'Questions and discussion',
      body: 'Ask about using Shumoku or about the network you want to diagram. Use Discord for casual conversation, and GitHub Discussions for questions and design discussions others can find later. Say what you have tried and where you are stuck, so others can follow.',
      links: [
        { label: 'Join Discord', href: discord },
        { label: 'GitHub Discussions', href: `${repo}/discussions` },
      ],
    },
    meetup: {
      title: 'Meetup',
      body: 'At the Meetup, people who use Shumoku and people who build it get together to talk about network diagrams and how they use them. Read the report to get a feel for it, and find dates and registration on connpass.',
      links: [
        { label: 'Meetup report', href: `/${l}/blog/meetup-1` },
        { label: 'Events and registration', href: communityUrl },
      ],
    },
    contribute: {
      title: 'Bugs, ideas and contributing',
      body: [
        'If you find a bug, report it on GitHub Issues with the version you use and the steps to reproduce it. Ideas for improvements, and uses you would like it to support, are welcome too.',
        'To contribute code or documentation, start with the development setup and the contribution guide.',
      ],
      security:
        'Do not report vulnerabilities in public issues; use the private reporting channel.',
      securityLink: { label: 'Security policy', href: `${repo}/blob/main/SECURITY.md` },
      links: [
        { label: 'Issues', href: `${repo}/issues` },
        { label: 'Contribution guide', href: `${repo}/blob/main/CONTRIBUTING.md` },
        { label: 'Governance', href: `${repo}/blob/main/GOVERNANCE.md` },
        { label: 'Code of conduct', href: `${repo}/blob/main/CODE_OF_CONDUCT.md` },
      ],
    },
    business: {
      title: 'Need help with your environment?',
      body: 'Organizations are welcome in the community too. For private investigations, deployment or integration work in your environment, talk to us about paid help.',
      links: [{ label: 'For teams', href: `/${l}/support` }],
    },
  },
})

export const pagesCopy = (locale: Locale) => (locale === 'ja' ? ja(locale) : en(locale))
