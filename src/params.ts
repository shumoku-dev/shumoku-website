import { defineParams } from '@sveltejs/kit/params'
import { isLocale } from '#lib/i18n/index.ts'

export const params = defineParams({
  // Returning the narrowed value types `params.lang` as `Locale` in every route.
  lang: (param) => (isLocale(param) ? param : undefined),
})
