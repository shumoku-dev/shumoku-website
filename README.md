# Shumoku Website

The public website, product narrative, community content, and browser Playground for
[Shumoku](https://github.com/konoe-akitoshi/shumoku).

This repository is intentionally independent from the product monorepo. It consumes released
`@shumoku/*` packages exactly as external users do; unreleased product code is not linked into the
website build.

## Development

Requirements: Node.js 24 and Bun 1.3 or newer.

```bash
bun install
bun run dev
bun run check
```

`bun run check` runs formatting/lint checks, Svelte type checking, tests, unused-code detection,
and the production build.

## Repository map

```text
src/
  content/blog/       Markdown articles and their local media
  lib/
    assets/           Build-optimized brand and product imagery
    content/          Localized marketing copy
    home/             Homepage sections
    i18n/             Locale negotiation and preference behavior
    layout/           Site shell
    playground/       Public released-package demo
    ui/               Website component system
  routes/             SvelteKit routes and runtime endpoints
public/               Stable public URLs and community media
scripts/              Website maintenance and generation scripts
docs/
  architecture/       Current design and information architecture
  operations/         Deployment and maintenance runbooks
  archive/            Historical proposals, not current contracts
```

Read [docs/README.md](docs/README.md) before changing architectural or operational behavior.

## Ownership boundary

- This repository owns website presentation, copy, blog content, analytics consent, redirects,
  Playground UX, and Vercel deployment.
- The Shumoku product repository owns libraries, renderers, CLI, Server, Editor, and their release
  process.
- Playground upgrades happen through explicit `@shumoku/*` dependency updates. They are not
  implicit workspace changes.

## Deployment

Vercel builds the repository root using [`vercel.json`](vercel.json). See
[docs/operations/deployment.md](docs/operations/deployment.md) for deployment, environment, and
rollback checks.

## License

AGPL-3.0-only. See [LICENSE](LICENSE).
