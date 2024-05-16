export interface ICostType {
  id: number
  name: string
  code: string
  cost_group_id: number
}

export interface ICostTypeDelete {
  cost_type_ids: number[]
}
