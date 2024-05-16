import type { ICountry, IDistrict, IProvince } from './addresses'

export interface IVendor {
  id: number
  name: string
  customer_code: string
  short_name: string
  country_id: number
  country: ICountry
  province_id: number
  province: IProvince
  district_id: number
  district: IDistrict
  address: string
  phone_number: string
  email: string
  fax: string
  tax_code: string
  payment_name: string
  payment_address: string
  note1: string
  note2: string
  created_at: string
  updated_at: string
}
