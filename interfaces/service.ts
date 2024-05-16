export interface IFormServiceType {
  id?: number | null
  name: string
  code: string
}

export interface IServiceTypeDelete {
  service_type_ids: number[]
}
