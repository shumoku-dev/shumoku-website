import { describe, expect, it } from 'vitest'
import { fitToContent, highlightPortLabel, renderDiagram } from './diagrams.server'
import { exampleDiagramName, examplePorts } from './example'

describe('generated diagrams', () => {
  it.each(examplePorts)('bakes the highlight for %s into its own file', async (port) => {
    const diagram = await renderDiagram(exampleDiagramName(port))
    const other = examplePorts.find((candidate) => candidate !== port)
    const group = (name: string) =>
      new RegExp(`data-port="core-01:${name}"[^>]*>[^]*?class="port-label-bg"[^>]*?fill="([^"]*)"`)
    expect(diagram?.svg).toMatch(/^<svg[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)
    expect(diagram?.svg).toContain(`core-01:${port}`)
    expect(diagram?.svg).not.toContain(`core-01:${other}`)
    expect(group(port).exec(diagram?.svg ?? '')?.[1]).toBe('#07693c')
    expect(group('Ethernet48').exec(diagram?.svg ?? '')?.[1]).not.toBe('#07693c')
  })

  it('fails loudly when the renderer stops drawing the port label', () => {
    expect(() => highlightPortLabel('<svg></svg>', 'core-01:Ethernet1')).toThrow()
  })

  it('crops the view box and the intrinsic size to the drawing', () => {
    const fitted = fitToContent(
      '<svg viewBox="0 0 900 900" width="900" height="900"><rect x="10" y="20" width="100" height="50"/></svg>',
      5,
    )
    expect(fitted).toMatchObject({ width: 110, height: 60 })
    expect(fitted.svg).toContain('viewBox="5 15 110 60"')
    expect(fitted.svg).toContain('width="110" height="60"')
  })

  it('does not know names it does not serve', () => {
    expect(renderDiagram('nope')).toBeUndefined()
  })
})
