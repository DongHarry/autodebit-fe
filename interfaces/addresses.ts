export interface ICountry {
  id: number | string
  name: string
  code: string
}

export interface IProvince {
  id: number
  name: string
  code: string
  country_id: number
}

export interface IDistrict {
  id: number
  province_id: number
  name: string
}
