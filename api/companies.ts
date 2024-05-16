import axios from '~/libs/axios'
import { type ICompany } from '@/interfaces/company'

export const createCompany = (params: ICompany) =>
  axios.post('/companies', params)
export const updateCompany = (params: ICompany) =>
  axios.put(`/companies/${params.id}`, params)
export const listCompany = (params: object) =>
  axios.get('/companies', { params })

export default {
  createCompany,
  updateCompany,
  listCompany,
}
