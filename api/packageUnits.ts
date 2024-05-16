import axios from '~/libs/axios'
import type {
  IFormPackageUnit,
  IPackageUnitDelete,
} from '@/interfaces/packageUnit'

export const listPackageUnit = (params: object) =>
  axios.get('/package-units', { params })
export const createPackageUnit = (params: IFormPackageUnit) =>
  axios.post('/package-units', params)
export const updatePackageUnit = (params: IFormPackageUnit) =>
  axios.put(`/package-units/${params.ID}`, params)
export const deletePackageUnit = (params: IPackageUnitDelete) =>
  axios.delete(`/package-units`, { params })

