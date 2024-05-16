import axios from '~/libs/axios'
import { type IAreas } from '@/interfaces/area'

export const listArea = (params: object) => axios.get('/areas', { params })
export const createArea = (params: IAreas) => axios.post('/areas', params)
export const showArea = (id: string) => axios.get(`areas/${id}`)
export const updateArea = (params: IAreas) =>
  axios.put(`vendors/${params.id}`, params)
export const removeArea = (params: any) =>
    axios.delete(`/areas`, { params })

export default {
    listArea,
    createArea,
    showArea,
    updateArea,
    removeArea,
}
