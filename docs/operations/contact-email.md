# Contact email and announcements

The links page (`/[lang]/connect`) has an email field for people who want to hear from the
maintainers. Signups go to Resend; replies come to the normal inbox.

## Flow

1. The form posts `email`, `lang` and a hidden honeypot to `/api/contact`.
2. If the address is already in either Shumoku segment, nothing is sent.
3. Otherwise one plain-text greeting in the page language is sent from
   `Shumoku <contact@shumoku.dev>` with the same Reply-To, and the address is added to
   "Shumoku (ja)" or "Shumoku (en)". The greeting asks the reader to reply about their
   environment and interests and is signed "Shumoku 開発チーム" / "The Shumoku team".
4. Replies arrive in the `contact@shumoku.dev` inbox. Answer them there.

Edit the form copy and greeting in `src/lib/content/contact.ts`. Write each language as its
own text rather than translating the other; keep the team signature, not a personal name.

## Configuration

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Full-access key (contacts need more than sending access) |
| `RESEND_CONTACT_SEGMENT_JA` | ID of the Resend segment "Shumoku (ja)" |
| `RESEND_CONTACT_SEGMENT_EN` | ID of the Resend segment "Shumoku (en)" |

Set all three in Vercel for Production (and Preview only if previews should send real mail).
Locally, copy `.env.example` to `.env`; `.env` is ignored by Git. Use separate keys for local
and production so either can be revoked alone. Without the variables the endpoint logs an
error and the form shows a failure message.

The Resend account also holds `packof.me` and its "General" segment. Keep Shumoku contacts
in the two Shumoku segments and send Shumoku Broadcasts only to them. The current plan allows
three segments, so all slots are in use.

## Sending an announcement

Create one Broadcast per language in the Resend dashboard: the Japanese text to
"Shumoku (ja)" and the English text to "Shumoku (en)". Send from `contact@shumoku.dev` and
keep the unsubscribe link Resend inserts.

## Removing an address

Delete the contact in Resend (Audience → Contacts) when someone asks, including replies
saying they did not sign up.

## Limits

The per-IP limit (5 submissions per 10 minutes) lives in function memory and is not shared
between serverless instances. If abuse appears, add a shared limiter or a challenge such as
Cloudflare Turnstile.
