import axios from '@/libs/axios'
import type { IFormUser, IUserDelete } from '@/interfaces/user'

export const listUser = (params: object) => axios.get('/users', { params })
export const createUser = (params: IFormUser) => axios.post('/users', params)
export const updateUser = (params: IFormUser) =>
  axios.put(`/users/${params.id}`, params)
export const deleteUser = (params: IUserDelete) =>
  axios.delete(`/users`, { params })
export const blockUser = (id: number) => axios.patch(`/users/${id}/block`)
export const unblockUser = (id: number) => axios.patch(`/users/${id}/unblock`)
