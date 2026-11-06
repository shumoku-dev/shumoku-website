import { parser } from '@shumoku/core'
import { prepareRender, renderSvg } from '@shumoku/renderer-svg'
import { foundationPalettes, paletteColor } from '$lib/ui/palette-model'
import type { DiagramSize } from './diagrams'
import { exampleDiagramName, examplePorts, exampleYaml } from './example'

const galleryYaml = import.meta.glob<string>('./gallery/*.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
})

type Source = { yaml: string; highlightPort?: string }

const sources: Record<string, Source> = {
  ...Object.fromEntries(
    examplePorts.map((port) => [
      exampleDiagramName(port),
      // Point at what the edit changed: the port label on core-01.
      { yaml: exampleYaml(port), highlightPort: `core-01:${port}` },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(galleryYaml).map(([path, yaml]) => [
      path.replace(/^.*\/|\.yaml$/g, ''),
      { yaml },
    ]),
  ),
}

export type Diagram = DiagramSize & { svg: string }

const rendered = new Map<string, Promise<Diagram>>()

/** Every diagram the site serves, for prerendering. */
export const diagramNames = () => Object.keys(sources)

/**
 * Diagrams are rendered by the released packages at build time, so the page shows real output. Each
 * is its own file: ids cannot collide across a page, and the SVG is not repeated in hydration data.
 */
export function renderDiagram(name: string): Promise<Diagram> | undefined {
  const source = sources[name]
  if (!source) return undefined
  let diagram = rendered.get(name)
  if (!diagram) {
    diagram = render(source)
    rendered.set(name, diagram)
  }
  return diagram
}

/** Intrinsic sizes for `<img>`, so the page does not move when a diagram loads. */
export async function diagramSizes(names: readonly string[]) {
  const entries = await Promise.all(
    names.map(async (name) => {
      const diagram = await renderDiagram(name)
      if (!diagram) throw new Error(`Unknown diagram: ${name}`)
      return [name, { width: diagram.width, height: diagram.height }] as const
    }),
  )
  return Object.fromEntries(entries) as Record<string, DiagramSize>
}

async function render({ yaml, highlightPort }: Source): Promise<Diagram> {
  const svg = await renderSvg(await prepareRender(parser.parse(yaml).graph))
  const fitted = fitToContent(svg)
  return {
    ...fitted,
    svg: highlightPort ? highlightPortLabel(fitted.svg, highlightPort) : fitted.svg,
  }
}

/**
 * CSS cannot reach into an `<img>`, so the highlight is baked in. The brand green stays literal in
 * the file; it does not change with the theme, and neither does the diagram's white background.
 */
export function highlightPortLabel(svg: string, port: string) {
  const group = new RegExp(`(data-port="${port}"[^>]*>[^]*?class="port-label-bg"[^>]*?fill=")[^"]*`)
  if (!group.test(svg)) throw new Error(`No label for port ${port}`)
  return svg.replace(group, `$1${paletteColor(foundationPalettes['Brand green'][700]).hex}`)
}

/**
 * The renderer pads the canvas for interactive panning. On a static page that padding only
 * shrinks the drawing, so crop the view box to the drawn boxes with a small margin. The root's
 * size becomes the cropped one, so the file's intrinsic ratio matches its view box.
 */
export function fitToContent(svg: string, margin = 12): DiagramSize & { svg: string } {
  const boxes = [
    ...svg.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/g),
  ]
    .map((match) => match.slice(1).map(Number) as [number, number, number, number])
    .filter(([, , width, height]) => width > 0 && height > 0)
  if (!boxes.length) throw new Error('A diagram without boxes cannot be fitted')
  const left = Math.min(...boxes.map(([x]) => x)) - margin
  const top = Math.min(...boxes.map(([, y]) => y)) - margin
  const right = Math.max(...boxes.map(([x, , width]) => x + width)) + margin
  const bottom = Math.max(...boxes.map(([, y, , height]) => y + height)) + margin
  const width = right - left
  const height = bottom - top
  const root = /<svg\b[^>]*>/.exec(svg)?.[0]
  if (!root) throw new Error('Not an SVG')
  const fittedRoot = root
    .replace(/\s(viewBox|width|height|style)="[^"]*"/g, '')
    .replace(
      '<svg',
      `<svg viewBox="${left} ${top} ${width} ${height}" width="${width}" height="${height}"`,
    )
  return { svg: svg.replace(root, fittedRoot), width, height }
}
