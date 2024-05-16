import axios from '@/libs/axios'

export const list = (params: object) => axios.get('/provinces', { params })
export const create = (params: any) => axios.post('/provinces', params)

export default {
  list,
  create
}
