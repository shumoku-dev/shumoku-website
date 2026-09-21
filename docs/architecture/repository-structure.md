# Repository structure

## Decision

Use SvelteKit's standard project directories unless the website has a documented reason to add an
application-specific boundary. This keeps framework behavior discoverable and avoids configuration
that merely renames conventional locations.

The source tree has the following responsibilities:

| Path | Responsibility |
| --- | --- |
| `src/routes` | Pages, layouts, endpoints and route-local files |
| `src/lib` | Shared components, browser/server utilities, localized copy and imported assets |
| `src/params` | Route parameter matchers |
| `src/content` | Markdown article bundles and their article-local media |
| `static` | Files that require stable public URLs and must be served without transformation |
| `scripts` | Repository maintenance and generated-source tooling |
| `docs` | Architecture decisions, operating procedures and historical records |

Unit tests stay next to the implementation as `*.test.ts`. Add a top-level `tests` directory only
when browser-level Playwright tests are introduced. Keep files used only by one route beside that
route; move reusable code to `src/lib` so it is available through SvelteKit's `$lib` alias.

## Asset boundary

Prefer imported files under `src/lib/assets` or article bundles when Vite should hash, cache or
transform them. Use `static` only when the URL itself is part of the public contract, such as logos,
integration marks, downloadable media and community image URLs. SvelteKit recommends minimizing
static assets in favor of imports, and `@sveltejs/enhanced-img` only processes local imported files.

## References

- [SvelteKit project structure](https://svelte.dev/docs/kit/project-structure)
- [SvelteKit `$lib` alias](https://svelte.dev/docs/kit/$lib)
- [SvelteKit image handling](https://svelte.dev/docs/kit/images)
