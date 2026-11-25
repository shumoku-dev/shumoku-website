import { defineEnvVars } from '@sveltejs/kit/env'

/** Pass-through schema: the value stays optional so local builds and previews work without it. */
const optional = (value: string | undefined) => value

/**
 * Server-only runtime variables. Each consumer checks for a missing value itself:
 * the contact API reports that signup is not configured, and analytics treats the
 * deployment as non-production.
 */
export const variables = defineEnvVars({
  RESEND_API_KEY: { schema: optional },
  RESEND_CONTACT_SEGMENT_JA: { schema: optional },
  RESEND_CONTACT_SEGMENT_EN: { schema: optional },
  VERCEL: { schema: optional },
  VERCEL_ENV: { schema: optional },
})
