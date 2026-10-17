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
The `main` branch requires the `check` job to pass before merge. Dependency updates are opened
weekly by Dependabot.

## Vercel project

- Repository: `shumoku-dev/shumoku-website`
- Root directory: repository root
- Framework: SvelteKit
- Install command: `bun install --frozen-lockfile`
- Build command: `bun run build`
- Output directory: automatic
- Node.js: 24

The production project is connected directly to this repository. Global response headers are
defined in `vercel.json`; keep them compatible with analytics, embedded media and the Playground.

## Production verification

Automated Chromium smoke tests cover language negotiation, localized pages, the Playground,
compatibility redirects, stable assets and layout API limits. For presentation or analytics
changes, also check both `/en` and `/ja`, Playground render/export, responsive images, language and
theme preferences, privacy controls, GA4 consent behavior, and Vercel Web Analytics. Local and
preview analytics are intentionally disabled.

## Rollback

Promote the previous known-good Vercel deployment. Repository rollback is a separate follow-up;
do not force-push `main` to recover production.
