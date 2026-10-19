import { createContext } from 'svelte'

/** Lets Markdown images resolve paths relative to the article being rendered. */
export const [getArticleSlug, setArticleSlug] = createContext<() => string>()
