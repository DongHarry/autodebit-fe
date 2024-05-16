import axios from '~/libs/axios'
import type { IFormServiceType, IServiceTypeDelete } from '@/interfaces/service'

export const listServiceTypes = (params: object) =>
  axios.get('/service-types', { params })
export const createServiceType = (params: IFormServiceType) =>
  axios.post('/service-types', params)
export const updateServiceType = (params: IFormServiceType) =>
  axios.put(`/service-types/${params.id}`, params)
export const deleteServiceType = (params: IServiceTypeDelete) =>
  axios.delete(`/service-types`, { params })

export default {
  listServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
}