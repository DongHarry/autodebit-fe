import axios from '~/libs/axios'

export const listRoles = () => axios.get('/roles')
export const createRole = (params: any) => axios.post('/roles', params)
export const showRole = (id: string) => axios.get(`roles/${id}`)
export const updateRole = (params: any) => axios.put(`roles/${params.id}`, params)
export const removeRole = (params: any) => axios.delete(`/roles`, { params })

export default {
    listRoles,
    createRole,
    showRole,
    updateRole,
    removeRole,
}