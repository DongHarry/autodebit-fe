import axios from '@/libs/axios'
import { type ILocationTypeDelete } from '../interfaces/locations'

export const listLocation = (params: object) =>
  axios.get('/locations', { params })
export const create = (params: any) => axios.post('/locations', params)
export const update = (params: any) =>
  axios.put(`/locations/${params.ID}`, params)
export const remove = (params: ILocationTypeDelete) => axios.delete('/locations', { params })

export default {
  listLocation,
  create,
  update,
  remove,
}
