import axios from '~/libs/axios'

export const login = (params: object) => axios.post('/auth/login', params)
export const logout = () => axios.post('/auth/logout')
export const getMe = () => axios.get('/auth/me')
export const changeLanguage = (id: number, language: string) =>
  axios.patch(`/users/${id}/change-language`, { language })

export default {
  login,
  getMe,
}
