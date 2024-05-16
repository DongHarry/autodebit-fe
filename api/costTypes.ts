import axios from '~/libs/axios'
import { type ICostType, type ICostTypeDelete } from '@/interfaces/costType'

export const listCostType = (params: object) =>
  axios.get('/cost-types', { params })
export const createCostType = (params: ICostType) =>
  axios.post('/cost-types', params)
export const updateCostType = (params: ICostType) =>
  axios.put(`/cost-types/${params.id}`, params)
export const deleteCostType = (params: ICostTypeDelete) =>
  axios.delete(`cost-types`, { params })
