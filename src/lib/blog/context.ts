import { createContext } from 'svelte'
import type { Locale } from '$lib/site'

/** The article being rendered, so Markdown images and links resolve relative to it. */
export const [getArticle, setArticle] = createContext<() => { slug: string; lang: Locale }>()
