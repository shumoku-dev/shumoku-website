# Exhibition quick links

Open `/ja/connect` or `/en/connect` to share the demo and community destinations. For QR
codes and printed material use `https://www.shumoku.dev/connect`, which opens in the
visitor's language.
Each row is a direct link, designed for tapping on a phone. The demo destination
matches the home hero. Below the links is the email signup for people who want to hear
from the maintainers; see [contact email](contact-email.md). Playground and About follow.

Edit `src/lib/content/connect.ts` for localized copy and links. Verify the demo,
Discord invitation and event registration before an event. Review both locales at
desktop and mobile widths and run `bun run check` after changes.

## InterBEE 2026 booth page

The InterBEE 2026 booth poster (TelHi Corporation booth) prints a QR code for
`https://shumoku.dev/interbee2026`. Like `/connect`, the unprefixed path opens
`/ja/interbee2026` or `/en/interbee2026` in the visitor's language, because the page is listed in
`sitePages` (not in navigation).

The page follows the shared layout (`Section`, `Frame`, `Actions`): the booth demo, what Shumoku
does, TelHi Corporation as a non-exclusive commercial support partner (the logo links to
https://www.telhi.co.jp/), how to try it, and the community with the email signup. Edit
`src/lib/content/interbee.ts` for copy and links. Describe TelHi only as a partner: Shumoku is an
independent project, so do not call TelHi official, exclusive, the developer or the owner. Do not
publish agreement details, personal names or booth numbers. The screenshots are the site's own
product screens, not the booth demo; replace them if a booth screenshot is supplied. Scan the
printed QR code and check both locales before the event.
