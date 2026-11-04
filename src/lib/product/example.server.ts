import { parser } from '@shumoku/core'
import { prepareRender, renderSvg } from '@shumoku/renderer-svg'
import { type ExamplePort, examplePorts, exampleYaml } from './example'

/** Renders the example with the released packages at build time, so the page shows real output. */
export async function renderExample(): Promise<Record<ExamplePort, string>> {
  const entries = await Promise.all(
    examplePorts.map(async (port) => {
      const result = parser.parse(exampleYaml(port))
      return [port, fitToGroup(await renderSvg(await prepareRender(result.graph)))] as const
    }),
  )
  return Object.fromEntries(entries) as Record<ExamplePort, string>
}

/**
 * The renderer pads the canvas for interactive panning. On a static page that padding only
 * shrinks the drawing, so crop the view box to the site group with a small margin.
 */
export function fitToGroup(svg: string, margin = 12) {
  const group = svg.match(
    /<g class="subgraph"[^>]*>\s*<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/,
  )
  if (!group) return svg
  const [x, y, width, height] = group.slice(1).map(Number) as [number, number, number, number]
  const box = [x - margin, y - margin, width + margin * 2, height + margin * 2].join(' ')
  return svg.replace(/viewBox="[^"]*"/, `viewBox="${box}"`)
}
