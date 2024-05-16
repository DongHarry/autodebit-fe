import axios from '@/libs/axios'

export const list = (params: object) => axios.get('/districts', { params })
export const create = (params: any) => axios.post('/districts', params)

export default {
  list,
  create
}
