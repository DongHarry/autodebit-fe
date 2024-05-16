export interface ICostGroup {
  id: number
  name: string
  code: string
}

export interface ICostGroupDelete {
  cost_group_ids: number[]
}

export interface ICostGroupFilter {
  value: number
  text: string
}
