/** The Home "treat your network as data" example: one link moves between two ports. */
export const examplePorts = ['Ethernet1', 'Ethernet2'] as const
export type ExamplePort = (typeof examplePorts)[number]

export const exampleYaml = (port: ExamplePort) => `name: "Site A"
subgraphs:
  - id: site-a
    label: "Site A"
nodes:
  - id: edge-01
    type: router
    parent: site-a
  - id: core-01
    type: l3-switch
    parent: site-a
  - id: access-01
    type: l2-switch
    parent: site-a
links:
  - from: { node: edge-01, port: xe-0/0/0 }
    to: { node: core-01, port: ${port} }
    bandwidth: 10G
  - from: { node: core-01, port: Ethernet48 }
    to: { node: access-01, port: ge-0/0/48 }
    bandwidth: 1G
`
