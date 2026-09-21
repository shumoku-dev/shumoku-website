# Deployment and rollback

## Runtime boundary

The site is a SvelteKit application deployed on Vercel. Most localized pages are prerendered.
Runtime endpoints are limited to language negotiation, analytics policy, compatibility redirects,
and the legacy layout API.

## Required checks

Run before merging:

```bash
bun install --frozen-lockfile
bun run check
```

Pull requests must pass the same sequence in GitHub Actions and produce a Vercel Preview.

## Vercel project

- Repository: `shumoku-dev/shumoku-website`
- Root directory: repository root
- Framework: SvelteKit
- Install command: `bun install --frozen-lockfile`
- Build command: `bun run build`
- Output directory: automatic
- Node.js: 24

The current production project should be transferred or reconnected only after a Preview from this
repository matches the existing site. Do not disconnect the monorepo deployment first.

## Production verification

Check both `/en` and `/ja`, Playground render/export, legacy documentation redirects, responsive
images, language preference, theme preference, privacy controls, GA4 consent behavior, and Vercel
Web Analytics. Local and preview analytics are intentionally disabled.

## Rollback

Promote the previous known-good Vercel deployment. Repository rollback is a separate follow-up;
do not force-push `main` to recover production.
