export interface IFormContainer {
  ID?: number | null
  Code: string
  PackingName: string
  Width: number | undefined
  Height: number | undefined
  Length: number | undefined
  Note?: string
}

export interface IContainerDelete {
  ids: number[]
}
