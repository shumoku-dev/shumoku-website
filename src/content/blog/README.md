# ブログを書く

記事は **1フォルダーにMarkdownと画像** をまとめます。記事を書くためのTypeScript、Svelte、HTMLは不要です。
日本語記事だけで公開でき、英訳は必須ではありません。
本文はGitHubと同じMarkdown（GFM: 表、脚注、取り消し線、タスクリスト）で書きます。
HTMLタグは表示されず、`{` や `<` もそのまま文字として扱われます。

```text
src/content/blog/
  meetup-1/
    index.md
    images/
      group.webp
      reception.webp
  next-article/
    index.md
    images/
      cover.webp
```

## 新しい記事

1. 小文字英数字とハイフンでフォルダーを作る（例: `meetup-2`）。
2. 同じフォルダーに `index.md` と `images/` を置く。
3. 下の例をコピーして本文を書く。
4. dev serverの `/ja/blog/meetup-2` で確認する。

```markdown
---
title: "Shumoku Meetup #2を開催しました"
description: "2027年2月16日にShumoku Meetup #2を開催しました。参加者がShumokuの活用事例を発表し、意見を交わしました。"
published: "2027-02-16"
category: event
authors: [akitoshi]
image: "./images/cover.webp"
imageAlt: "参加者の集合写真"
draft: false
---

## 当日の様子

ここに本文を書きます。

![講演の様子](./images/talk.webp)

- 箇条書き
- [関連リンク](https://shumoku.dev)
```

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `title` | ✓ | 記事タイトル |
| `description` | ✓ | 一覧・検索結果・OGPに出る説明 |
| `published` | ✓ | 公開日。引用符付きの `"YYYY-MM-DD"`。一覧はこの日付の新しい順 |
| `updated` |  | 内容を直したときの更新日。`published` より前にはできない |
| `category` | ✓ | 下の表のキーのどれか |
| `authors` | ✓ | 著者のキーの配列。例: `[akitoshi]` |
| `image` / `imageAlt` |  | 表紙。`image` を書くなら `imageAlt` も必須 |
| `lang` |  | 記事を書いた言語。省略すると `ja` |
| `draft` |  | `true` で非公開 |

`updated` は誤字の修正では付けず、内容が変わったときに付けます。サイトマップの `lastmod` や、
検索エンジン向けのメタデータ（`article:modified_time`、JSON-LDの `dateModified`）にも使われます。

カテゴリは表記揺れを防ぐために固定の選択肢にしています。表示名は日英とも `src/lib/blog/categories.ts` にあります。

| キー | 日本語 | English |
| --- | --- | --- |
| `event` | イベントレポート | Event report |
| `release` | リリース | Release |
| `development` | 開発の話 | Development |
| `usecase` | 活用事例 | Use case |

記事が1本以上あるカテゴリだけ `/ja/blog/category/<キー>` の一覧ページが作られ、カテゴリ名からリンクされます。
記事のないカテゴリのページは作られません（404）。

著者は `src/lib/blog/authors.ts` に1人1回登録し、記事ではキーだけを書きます。
新しい人が書くときは、表示名とリンク先（任意）をそこに追加します。実在の人の名前は本人に確認してから載せます。

記事ページの冒頭には、共通テンプレートがカテゴリ・タイトル・著者・日付を表示します。本文で重複させる必要はありません。
`description` と表紙（`image`）は記事ページには表示せず、一覧・OGP（SNSのカード）・検索エンジン向けのメタデータに使います。
本文の冒頭で同じ写真や要約を書いても重複しません。

フォルダー名がURLのslugになります。記事一覧・日付順・サイトマップ・静的生成対象は自動更新されます。
普段は `index.md` を編集して画像を置くだけで、ルートや画像一覧のコードを触りません。
画像は原本ではなく配信用に圧縮したものを置きます。一般的なMarkdownエディターでも相対パスで画像を確認できます。

## descriptionの書き方

descriptionは、記事が扱う出来事や内容の概要を1〜2文で書きます。
イベント記事では「いつ・どこで・どのイベントに・誰が・何をしたか」の主要な事実を優先し、
日記の細部やLTの題名・詳しい内容まで列挙しません。

- 「紹介します」「振り返ります」など、記事の説明をする定型句で締めず、出来事を直接述べます。
- 出展主体とプロダクトを区別します。コミュニティとしての出展なら「Shumoku Communityとして出展しました」と書きます。
- SEO・AEOを意識し、イベント名などの固有名詞と主要な事実を明確にします。キーワードの羅列や、本文にない情報は加えません。
- 既存記事の言い回しを流用せず、その記事固有の概要にします。

例（イベント出展記）:

> 2026年10月17日、東京都立産業貿易センター台東館で開催されたOSC Tokyo 2026 FallにShumoku Communityとして出展しました。ブースでのデモ展示やLTを行い、多くの来場者と交流しました。

上の新規記事テンプレートの内容は記入例です。実際の日時・会場・活動に置き換えてください。

## 写真

標準の `![説明](./images/photo.webp)` を使います。
説明は代替テキストとキャプションになり、クリックすると画像全体を表示します。

画像は1枚ずつ本文の幅いっぱいに、元の縦横比のまま縦に並びます。
画像だけの段落として記述してください（連続する画像は空行なしで並べても構いません）。

```markdown
![受付](./images/reception.webp)
![講演](./images/talk.webp)
```

画像ファイルの名前を変えたらMarkdownの相対パスも直してください。
存在しない画像を指定するとビルドが失敗します。

ビルド時に `@sveltejs/enhanced-img` が幅1920 / 1280 / 640のAVIF・WebPを生成し、`srcset` を付けます。
置くのは長辺1920px程度の画像1枚だけで、縮小版を手で作る必要はありません。

## 下書きと公開

`draft: true` の記事は一覧・直接URL・サイトマップ・静的生成から除外されます。
ローカル確認時だけfalseにし、未公開のまま保存するときはtrueへ戻します。
これは機密情報の保管機能ではありません。記事フォルダーにも秘密の資料は入れないでください。

## 言語

frontmatterの `lang` は記事を書いた言語です。省略すると `ja`、英語で書いた記事は `lang: en` にします。
1つのフォルダーが1記事なので、翻訳版を別ファイルで用意する仕組みはありません。
記事は日英両方の一覧に載ります。サイトの言語と異なる記事には、そのUI言語で「原文を表示している」旨を案内します。
本文には原文のlang属性を付け、canonicalとhreflangは原文の言語のURLを指します。

## Communityとの分離

Communityの写真は `src/lib/community/photos.ts` と `static/images/community/` で別管理します。
記事フォルダーをimportせず、同じ原本を使っていても配信用ファイルは別です。
記事の写真・説明・並び替えや削除はCommunityへ影響しません。逆方向も同様です。
Home/Aboutの紹介写真も `src/lib/assets/photos/` に別のコピーを置いているので、記事側の変更の影響を受けません。
ホームの特集記事は `src/routes/[lang=lang]/+page.server.ts` で指定しています。編集上の判断なので、記事を追加しても自動では差し替わりません。

## 開発時の確認

websiteディレクトリで `bun run typecheck`、`bun run test`、`bun run build`。
公開前に一覧・直接URL・モバイル表示・画像の説明を確認します。

## 実装

| ファイル | 役割 |
| --- | --- |
| `src/lib/blog/post.ts` | frontmatterの型と検証 |
| `src/lib/blog/categories.ts` | カテゴリの選択肢と日英の表示名 |
| `src/lib/blog/authors.ts` | 著者の表示名とリンク |
| `src/lib/blog/BlogIndex.svelte` | 記事一覧とカテゴリのナビ。一覧とカテゴリページで共用 |
| `src/lib/blog/posts.server.ts` | 全記事を読み、公開記事を日付順に並べる。本文の変換もここから呼ぶ（サーバー専用） |
| `src/lib/blog/markdown.server.ts` | frontmatterの分離と、本文をunified（remark-parse / remark-gfm / remark-rehype）でノードのデータに変換 |
| `src/lib/blog/ArticleBody.svelte` | ノードを描画し、本文のスタイルを持つ。画像は `ArticleImage`、単独URLは `embeds/Embed` |
| `src/lib/blog/images.ts` | 記事内画像（`./images/...`）の解決 |
| `src/lib/blog/embeds/remark.ts` | URLだけの行を埋め込みに変えるremarkプラグイン |
| `src/lib/blog/embeds/Embed.svelte` | 埋め込みを `LinkCard` / `PlayerEmbed` に振り分ける |
| `src/lib/blog/embeds/providers.ts` | プレーヤーにするサービスと、iframeを許可するホスト |
| `src/lib/blog/embeds/lock.ts` | `cache/<slug>/embeds.json` の型と、サムネイルの読み込み |
| `src/lib/blog/embeds/cache/` | 自動取得の結果（コミットする。手で作らない） |
| `src/lib/blog/embeds/resolver.ts` | OGPとoEmbedの取得、cacheの書き込みと掃除（Node専用） |
| `src/lib/blog/embeds/vite.ts` | 保存時（dev）とビルド前に `resolver` を動かすViteプラグイン |
| `scripts/blog-embeds.ts` | `bun run blog:embeds`。取り直し用 |
| `routes/[lang=lang]/blog/+page.server.ts` | 一覧 |
| `routes/[lang=lang]/blog/category/[category]/+page.server.ts` | カテゴリ別一覧。記事のあるカテゴリだけ静的生成 |
| `routes/[lang=lang]/blog/[slug]/+page.server.ts` | 記事のメタデータと本文のノード、404、prerenderの `entries` |
| `src/lib/Photo.svelte` | 写真・キャプション・拡大リンク。記事、Home、Aboutで共用 |

## 実装の参考

- [unified](https://unifiedjs.com/) / [remark-gfm](https://github.com/remarkjs/remark-gfm): Markdown（GFM）をサーバーで解析する。
  Markdownを読むのはサーバーだけで、ページにはノードのデータが渡り、ブラウザーにパーサーは送られない。
- [Svelte snippets](https://svelte.dev/docs/svelte/snippet): ノードを再帰的なスニペットで描画する。
- [SvelteKit images](https://svelte.dev/docs/kit/images#sveltejs-enhanced-img-Dynamically-choosing-an-image): `?enhanced` のglobで、画像を動的に選ぶ。
- [SvelteKit server-only modules](https://svelte.dev/docs/kit/server-only-modules): 記事一覧は `.server.ts` に置き、クライアントへ送らない。
- [SvelteKit prerender entries](https://svelte.dev/docs/kit/page-options#entries): 記事から静的生成するURLを列挙する。
- [Zenn: コンテンツの埋め込み](https://zenn.dev/zenn/articles/markdown-guide): URLだけの行をカードや埋め込みにする書き方。
- [oEmbed](https://oembed.com/): Speaker Deck・Docswell・YouTubeの埋め込み情報を、ページの `application/json+oembed` から取得する。
- [Third-party facades](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades): 埋め込みはクリックまで読み込まない。

## リンクカードと埋め込み

外部のURLを、前後に空行を挟んで1行だけで置くと、カードや動画・スライドの埋め込みになります。
特別な記法はなく、普通のMarkdownとしてもただのリンクとして読めます。

```markdown
https://event.ospn.jp/osc2026-fall/

https://youtu.be/LD9rUmkCoRU?t=8410

https://speakerdeck.com/<user>/<slide>

https://www.docswell.com/s/<user>/<slide>
```

| URL | 表示 |
| --- | --- |
| YouTube（`youtu.be`、`watch?v=`、Shorts、ライブ） | 動画プレーヤー。`?t=` の開始位置も引き継ぐ |
| Speaker Deck、Docswell | スライドのプレーヤー |
| それ以外 | タイトル・サイト名・画像のカード |

- 埋め込みになるのはURLだけの行です。`[文字](URL)` は単独の行でも通常のリンクのままです。
  リンクの文字がカードのタイトルやキャプションになることはありません。タイトルは相手ページのものを使います。
- 文中のリンク、箇条書きや引用の中のリンクも通常のリンクのままです。
- 動画とスライドは、最初はサムネイルと再生ボタンだけを表示し、クリックして初めて外部のiframe（YouTubeは `youtube-nocookie.com`）を読み込みます。
  クリックするまで、読者のブラウザーは外部サービスに一切接続しません。サムネイルの上にタイトルとサービス名を重ね、下にキャプションは付けません。

### 埋め込みデータの取得（自動）

URLを貼って保存するだけで、埋め込みに必要なデータは自動で取得されます。コマンドを実行する必要はありません。

- **devサーバー**: `index.md` を保存すると、その記事の新しいURLを取得し、画面も自動で更新されます。
- **ビルド**: cacheにないURLがあれば、ビルドの最初に取得します。
- 取得するのは、相手ページのOGP（タイトル・サイト名・画像）とoEmbedです。結果は `src/lib/blog/embeds/cache/<slug>/embeds.json` に書き、サムネイルも同じフォルダーに保存します。
  記事フォルダーには何も追加されません。相手サイトの説明文は取得しません。リンクを置いた理由や文脈は、前後の本文に書きます。
- 取得に失敗しても（相手のサイトが落ちている、オフラインなど）ビルドは止まりません。警告を出し、URLとドメインだけの簡易カードにします。
- cacheは記事と一緒にコミットしてください。コミット済みのURLは本番のビルドで取り直さないので、外部サイトの状態に左右されず、毎回同じ表示になります。
- 記事を消すと、その記事のcacheも消えます。記事フォルダーをコピーして新しい記事を書き始めても、cacheは付いてきません。
- 取得したタイトルが不適切なら、cacheの `embeds.json` を直接直して構いません。取り直さない限り上書きされません。

取り直したいときや、devサーバーを使わずに取得したいときは、コマンドも使えます。

```sh
bun run blog:embeds                       # 未取得のURLだけ取得
bun run blog:embeds osc-tokyo-2026-fall   # 記事を指定
bun run blog:embeds --refresh             # 取得済みのものも取り直す
```
