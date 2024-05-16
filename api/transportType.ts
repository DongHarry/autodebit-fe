import axios from '~/libs/axios'
import type {
  IFormTransport,
  ITransportTypeDelete,
} from '@/interfaces/transport'

export const listTransportTypes = (params: object) =>
  axios.get('/transport-types', { params })
export const createTransportType = (params: IFormTransport) =>
  axios.post('/transport-types', params)
export const updateTransportType = (params: IFormTransport) =>
  axios.put(`/transport-types/${params.id}`, params)
export const deleteTransportType = (params: ITransportTypeDelete) =>
  axios.delete(`/transport-types`, { params })
