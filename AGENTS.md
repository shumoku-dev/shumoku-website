# Repository guidance

This repository owns the Shumoku public website and Playground, not Shumoku product libraries.

## Boundaries

- Consume released `@shumoku/*` packages. Do not add filesystem, Git, or workspace links to the
  product repository.
- Keep localized marketing copy in `src/lib/content`, locale behavior in `src/lib/i18n`, stable URL
  assets in `static`, and build-optimized imported assets in `src/lib/assets`.
- Keep current design decisions in `docs/architecture` and operational procedures in
  `docs/operations`. Update documentation with behavior changes.
- The public Playground may demonstrate released functionality; it must not become the development
  harness for unreleased product code.

## Verification

Run `bun run check` before committing. Inspect affected pages in both languages and at wide and
narrow widths when presentation changes.
