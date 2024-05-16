import axios from '@/libs/axios'
import type { IFormCarrier, ICarrierDelete } from '@/interfaces/carrier'

export const list = (params: object) => axios.get('/carriers', { params })
export const create = (params: IFormCarrier) => axios.post('/carriers', params)
export const update = (params: IFormCarrier) =>
  axios.put(`/carriers/${params.id}`, params)
export const remove = (params: any) =>
  axios.delete(`/carriers`, { params })

export default {
  list,
  create,
  update,
  remove,
}
