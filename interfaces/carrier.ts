export interface IFormCarrier {
  id?: number | null
  name: string
  code: string
  address?: string
  type: string
}

export interface ICarrier {
  id: number
  name: string
  code: string
  address?: string
  type: string
}

export interface ICarrierDelete {
  carrier_ids: number[]
}
