import { sitePages } from './site'

/** Pages that exist under both `/en` and `/ja`, written without the language prefix. */
export function localizedPaths(slugs: readonly string[], categories: readonly string[]) {
  return new Set<string>([
    ...sitePages.map((page) => page.path).filter(Boolean),
    ...categories.map((category) => `/blog/category/${category}`),
    ...slugs.map((slug) => `/blog/${slug}`),
  ])
}
