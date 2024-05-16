import axios from '@/libs/axios'
import { type ILocationTypeDelete } from '../interfaces/locations'

export const listRoutes = (params: object) =>
  axios.get('/routes', { params })
export const createRoute = (params: any) => axios.post('/routes', params)
export const updateRoute = (params: any) =>
  axios.put(`/routes/${params.ID}`, params)
export const removeRoute = (params: ILocationTypeDelete) => axios.delete('/routes', { params })


export default {
  listRoutes,
  createRoute,
  updateRoute,
  removeRoute,
}