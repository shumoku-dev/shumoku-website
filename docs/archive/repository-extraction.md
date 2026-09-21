# Repository extraction record

This document is a historical record. The repository and production Vercel cutover are complete.

The website was extracted from `apps/website` in `konoe-akitoshi/shumoku` on 2026-09-21.

## Preserved history

The new repository began with the filtered Git history of `apps/website`. The extraction keeps the
website commits and removes unrelated product trees from its visible history.

## Localized dependencies

The following monorepo-owned inputs became website-owned modules:

- `tooling/website-content` → `src/lib/content/home.ts`
- `tooling/site-i18n` → `src/lib/i18n/`
- shared brand and product imagery → `src/lib/assets/`
- documentation migration routes → `src/lib/data/legacy-doc-routes.json`
- website design records → `docs/architecture/`

Shumoku runtime libraries are not copied. The website consumes their published npm releases.

`@shumoku/renderer@0.1.4` was published with an internal `@shumoku/core: workspace:*`
dependency. The root package override pins Core to `0.4.1` so an isolated install is reproducible.
`@shumoku/renderer-svg@0.2.28` also contains extensionless internal ESM imports, so Vite bundles
the Shumoku packages during SSR. Remove these compatibility settings after corrected releases are
adopted.

## Cutover rule at the time of extraction

Remove Website sources from the product monorepo only after this repository passes CI and a Vercel
Preview has been reviewed. DNS and the production Vercel project are operational changes, not part
of the source extraction commit.
