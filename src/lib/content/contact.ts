import type { Locale } from '$lib/i18n'

export const contactAddress = 'contact@shumoku.dev'
export const contactSender = `Shumoku <${contactAddress}>`

export type ContactSignupResult = 'ok' | 'invalid' | 'limited' | 'error'

export const contactSignupCopy: Record<
  Locale,
  {
    title: string
    description: string
    label: string
    submit: string
    sending: string
    note: string
    privacy: string
    results: Record<ContactSignupResult, { title: string; body: string }>
  }
> = {
  ja: {
    title: '開発チームから連絡を受け取る',
    description:
      'メールアドレスをご登録いただくと、Shumoku 開発チームからご挨拶のメールをお送りします。返信で、お使いの環境や気になっていることを気軽にお聞かせください。',
    label: 'メールアドレス',
    submit: '登録する',
    sending: '送信中…',
    note: 'イベントやリリースのお知らせをお送りすることがあります。配信はいつでも停止できます。',
    privacy: 'メールアドレスの取り扱い',
    results: {
      ok: {
        title: 'ご登録ありがとうございます',
        body: 'ご挨拶のメールをお送りしました。届かない場合は、迷惑メールフォルダもご確認ください。',
      },
      invalid: {
        title: 'メールアドレスをご確認ください',
        body: '入力された形式では登録できませんでした。',
      },
      limited: {
        title: '送信が続いています',
        body: 'しばらく時間をおいてから、もう一度お試しください。',
      },
      error: {
        title: '登録できませんでした',
        body: `時間をおいて再度お試しいただくか、${contactAddress} までご連絡ください。`,
      },
    },
  },
  en: {
    title: 'Hear from the Shumoku team',
    description:
      "Leave your email and we'll write to say hello. Hit reply to tell us how you use Shumoku and what you'd like to see next.",
    label: 'Email',
    submit: 'Sign up',
    sending: 'Sending…',
    note: 'We may also send the occasional event or release update. Unsubscribe any time.',
    privacy: 'How we use your email',
    results: {
      ok: {
        title: "Thanks, you're in",
        body: "We've sent you a quick hello. If you don't see it, check your spam folder.",
      },
      invalid: {
        title: 'Check your email',
        body: "That doesn't look like a valid address.",
      },
      limited: { title: 'Too many tries', body: 'Please wait a moment and try again.' },
      error: {
        title: 'Something went wrong',
        body: `Please try again later, or email us at ${contactAddress}.`,
      },
    },
  },
}

/**
 * Plain-text greeting sent once per address, written natively for each language rather than
 * translated. It is signed by the team, not a person, because any maintainer may answer replies.
 */
export const contactGreeting: Record<Locale, { subject: string; text: string }> = {
  ja: {
    subject: 'Shumoku にご登録いただきありがとうございます',
    text: `Shumoku にご登録いただき、ありがとうございます。
Shumoku 開発チームです。

もしよろしければ、このメールへの返信で少しだけ教えていただけないでしょうか。

・どのようなネットワークや環境で Shumoku をお使いか（ご検討中か）
・使ってみて困ったこと、欲しい機能、気になっていること

一言だけでも大歓迎です。いただいた返信は開発メンバーが直接拝読し、できる限りお返事します。

今後、イベントやリリースのお知らせをお送りすることがあります。配信メールの「配信停止」リンクから、いつでも解除いただけます。
お心当たりのないご登録でしたら、お手数ですがその旨をこのメールにご返信ください。登録を削除いたします。

--
Shumoku 開発チーム
https://www.shumoku.dev/
`,
  },
  en: {
    subject: "Welcome to Shumoku. We'd love to hear from you",
    text: `Hi,

Thanks for signing up. This is the Shumoku team.

We'd love to learn a bit about you. Just hit reply and tell us:

- What network or environment you're using Shumoku with (or planning to)
- Anything that's been frustrating, missing, or confusing

A line or two is plenty. A maintainer reads every reply, and we do our best to answer them all.

Now and then we'll also send news about events and releases. Every one of those emails has an unsubscribe link.
If you didn't sign up, just reply and let us know, and we'll remove your address.

--
The Shumoku team
https://www.shumoku.dev/
`,
  },
}
