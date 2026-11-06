export type DiagramSize = { width: number; height: number }

/** Generated diagrams are served as files; see src/routes/diagrams. */
export const diagramUrl = (name: string) => `/diagrams/${name}.svg`
