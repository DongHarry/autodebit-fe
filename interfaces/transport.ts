export interface IFormTransport {
  id?: number | null
  name: string
  code: string
  type: string | undefined
  note?: string
}

export interface ITransportTypeDelete {
  transport_type_ids: number[]
}
