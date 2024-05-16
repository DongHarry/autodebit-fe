import axios from '@/libs/axios'

export const list = (params: object) => axios.get('/countries', { params })
export const create = (params: any) => axios.post('/countries', params)

export default {
  list,
  create
}
