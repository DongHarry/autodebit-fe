import axios from '~/libs/axios'
import { type IVendor } from '@/interfaces/vendor'

export const listVendor = (params: object) => axios.get('/vendors', { params })
export const createVendor = (params: IVendor) => axios.post('/vendors', params)
export const showVendor = (id: string) => axios.get(`vendors/${id}`)
export const updateVendor = (params: IVendor) =>
  axios.put(`vendors/${params.id}`, params)

export default {
  listVendor,
  createVendor,
  showVendor,
  updateVendor,
}
