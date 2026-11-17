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

## InterBEE 2026 page

The INTER BEE MoIP flyer and the TelHi Corporation booth poster print a QR code for
`https://shumoku.dev/interbee2026`. Like `/connect`, the unprefixed path opens
`/ja/interbee2026` or `/en/interbee2026` in the visitor's language, because the page is listed in
`sitePages` (not in navigation).

The flyer's QR code promises the venue demo details and the deployment and integration settings,
so the page opens with the INTER BEE MoIP exhibit (Hall 3, booth 3401) in the flyer's own words,
then what Shumoku does, the TelHi booth demo, deployment and integrations, TelHi Corporation as a
non-exclusive commercial support partner (the logo links to https://www.telhi.co.jp/) and the
community. It is an exhibition page, not a second home page: the body uses the site's dark tokens,
like Japanese broadcast and Media over IP product pages.

Edit `src/lib/content/interbee.ts` for copy and links. The MoIP images come from the printed flyer
PDF; the booth demo image from the `csenet/shumoku-demo-interbee` repository. Describe TelHi only
as a partner: Shumoku is an independent project, so do not call TelHi official, exclusive, the
developer or the owner. Do not publish agreement details or personal names. Scan the printed QR
codes and check both locales before the event.
