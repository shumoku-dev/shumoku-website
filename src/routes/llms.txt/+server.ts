import { docsOrigin, editorOrigin, websiteOrigin } from '#lib/site.ts'
export const prerender = true
export const GET = () =>
  new Response(
    `# Shumoku\n\nOpen-source software that draws network diagrams from the connection data your devices report, and overlays traffic and alerts from your monitoring.\n\n- [Website](${websiteOrigin}/en)\n- [Playground](${websiteOrigin}/en/playground)\n- [Documentation](${docsOrigin}/en)\n- [Documentation index](${docsOrigin}/llms.txt)\n- [Editor](${editorOrigin})\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  )
