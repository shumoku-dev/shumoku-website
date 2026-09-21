import { computeNetworkLayout, type NetworkGraph } from '@shumoku/core'
import type { RequestHandler } from './$types'

const maxRequestBytes = 1_000_000
const maxNodes = 1_000
const maxLinks = 5_000

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** Legacy API contract retained independently of the client-only Playground. */
export const POST: RequestHandler = async ({ request }) => {
  let graph: NetworkGraph
  try {
    const declaredLength = Number(request.headers.get('content-length') ?? 0)
    if (Number.isFinite(declaredLength) && declaredLength > maxRequestBytes) {
      return Response.json({ error: 'Request body is too large' }, { status: 413 })
    }
    const body = await request.text()
    if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
      return Response.json({ error: 'Request body is too large' }, { status: 413 })
    }
    const payload: unknown = JSON.parse(body)
    if (
      !isRecord(payload) ||
      !isRecord(payload.graph) ||
      !Array.isArray(payload.graph.nodes) ||
      !Array.isArray(payload.graph.links)
    ) {
      return Response.json({ error: 'Expected graph with nodes and links arrays' }, { status: 400 })
    }
    if (payload.graph.nodes.length > maxNodes || payload.graph.links.length > maxLinks) {
      return Response.json(
        { error: `Topology exceeds ${maxNodes} nodes or ${maxLinks} links` },
        { status: 413 },
      )
    }
    graph = payload.graph as unknown as NetworkGraph
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  try {
    const { resolved } = await computeNetworkLayout(graph)
    return Response.json({
      resolved: {
        nodes: Object.fromEntries(resolved.nodes),
        ports: Object.fromEntries(resolved.ports),
        edges: Object.fromEntries(resolved.edges),
        subgraphs: Object.fromEntries(resolved.subgraphs),
        bounds: resolved.bounds,
        metadata: resolved.metadata,
      },
    })
  } catch {
    return Response.json({ error: 'Unable to compute graph layout' }, { status: 400 })
  }
}
