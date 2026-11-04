import { parser } from '@shumoku/core'
import { prepareRender, renderSvg } from '@shumoku/renderer-svg'
import { type ExamplePort, examplePorts, exampleYaml } from './example'

const galleryYaml = import.meta.glob<string>('./gallery/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
})

/** Diagrams are rendered by the released packages at build time, so the page shows real output. */
async function render(yaml: string) {
  return fitToContent(await renderSvg(await prepareRender(parser.parse(yaml).graph)))
}

export async function renderExample(): Promise<Record<ExamplePort, string>> {
  const entries = await Promise.all(
    examplePorts.map(async (port) => [port, await render(exampleYaml(port))] as const),
  )
  return Object.fromEntries(entries) as Record<ExamplePort, string>
}

/** Gallery diagrams keyed by file name, e.g. `device-status`. */
export async function renderGallery(): Promise<Record<string, string>> {
  const entries = await Promise.all(
    Object.entries(galleryYaml).map(
      async ([path, yaml]) => [path.replace(/^.*\/|\.yaml$/g, ''), await render(yaml)] as const,
    ),
  )
  return Object.fromEntries(entries)
}

/**
 * The renderer pads the canvas for interactive panning. On a static page that padding only
 * shrinks the drawing, so crop the view box to the drawn boxes with a small margin.
 */
export function fitToContent(svg: string, margin = 12) {
  const boxes = [
    ...svg.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/g),
  ]
    .map((match) => match.slice(1).map(Number) as [number, number, number, number])
    .filter(([, , width, height]) => width > 0 && height > 0)
  if (!boxes.length) return svg
  const left = Math.min(...boxes.map(([x]) => x)) - margin
  const top = Math.min(...boxes.map(([, y]) => y)) - margin
  const right = Math.max(...boxes.map(([x, , width]) => x + width)) + margin
  const bottom = Math.max(...boxes.map(([, y, , height]) => y + height)) + margin
  return svg.replace(/viewBox="[^"]*"/, `viewBox="${left} ${top} ${right - left} ${bottom - top}"`)
}
