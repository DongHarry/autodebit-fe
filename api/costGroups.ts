import axios from '~/libs/axios'
import { type ICostGroup, type ICostGroupDelete } from '@/interfaces/costGroup'

export const listCostGroup = (params: object) =>
  axios.get('/cost-groups', { params })
export const createCostGroup = (params: ICostGroup) =>
  axios.post('/cost-groups', params)
export const updateCostGroup = (params: ICostGroup) =>
  axios.put(`cost-groups/${params.id}`, params)
export const deleteCostGroup = (params: ICostGroupDelete) =>
  axios.delete(`cost-groups`, { params })
export const allCostGroup = () => axios.get(`cost-groups/all`)

export default {
  listCostGroup,
  createCostGroup,
  updateCostGroup,
  deleteCostGroup,
}
