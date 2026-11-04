export type ForTeamsTranslations = {
  tagline1: string
  tagline2: string
  title: string
  description: string
  nodes: readonly { title: string; description: string }[]
  roadmapLabel: string
  roadmap: readonly string[]
  supportNote: string
  supportCta: string
  cta: string
  adopters: {
    title: string
    items: readonly { quote: string; attribution: string }[]
  }
}

export const homeTranslations = {
  en: {
    forTeams: {
      tagline1: 'Shumoku is more than software.',
      tagline2: "It's a foundation we build together.",
      title: 'Build with Shumoku',
      description: 'Extend and embed Shumoku into your own products and workflows.',
      nodes: [
        { title: 'Custom Plugins', description: 'Proprietary data source integrations' },
        { title: 'Product Embedding', description: '@shumoku packages in your products' },
        { title: 'API Extensions', description: 'Custom APIs and platform extensions' },
        { title: 'Operations Roadmap', description: 'SSO, RBAC, audit logging' },
      ],
      roadmapLabel: 'Roadmap',
      roadmap: ['SSO & access control', 'Role-based permissions', 'Audit logging'],
      supportNote:
        'Shumoku is AGPL-3.0 open source — no commercial contract required. Bugs and feature requests are public on GitHub; environment-specific work and guaranteed support are commercial.',
      supportCta: 'See commercial support',
      cta: 'Design your topology strategy',
      adopters: {
        title: 'Early adopters',
        items: [
          {
            quote:
              'Replaced static topology diagrams with auto-generated live topology. Used in production for JANOG57 NOC. Streamed on NOC Live.',
            attribution: 'NOC BB Team — JANOG57',
          },
          {
            quote: 'Campus network monitoring with Zabbix. Live weathermaps running within a day.',
            attribution: 'Infrastructure Team — University NOC',
          },
        ],
      },
    },
  },
  ja: {
    forTeams: {
      tagline1: 'Shumoku はただのソフトウェアではありません。',
      tagline2: '一緒に築いていく基盤です。',
      title: 'Shumoku と一緒に作る',
      description: '自社プロダクトやワークフローに Shumoku を組み込み・拡張できます。',
      nodes: [
        { title: 'カスタムプラグイン', description: '独自データソース連携' },
        { title: 'プロダクト組み込み', description: '@shumoku パッケージで製品に統合' },
        { title: 'API 拡張', description: '独自APIとプラットフォーム拡張' },
        { title: '運用機能ロードマップ', description: 'SSO・RBAC・監査ログ' },
      ],
      roadmapLabel: 'ロードマップ',
      roadmap: ['SSO & アクセス制御', 'ロールベース権限管理', '監査ログ'],
      supportNote:
        'Shumoku は AGPL-3.0 の OSS — 利用に商用契約は不要です。バグ報告・機能要望は GitHub で公開対応、特定環境の調査や応答保証は商用サポートの対象です。',
      supportCta: '商用サポートを見る',
      cta: 'トポロジー戦略を設計する',
      adopters: {
        title: '導入実績',
        items: [
          {
            quote:
              '静的なトポロジー図を自動生成のライブトポロジーに置き換え。JANOG57 NOC で本番運用。NOC Liveで配信。',
            attribution: 'NOC BBチーム — JANOG57',
          },
          {
            quote: 'Zabbix 連携でキャンパスネットワーク監視に導入。1日で Weathermap が稼働。',
            attribution: 'インフラチーム — 大学 NOC',
          },
        ],
      },
    },
  },
} as const satisfies Record<string, { forTeams: ForTeamsTranslations }>

export type Locale = keyof typeof homeTranslations
