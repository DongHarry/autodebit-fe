import axios from 'axios'
const config = useRuntimeConfig()

const errorCodes = [
  400, 401, 103, 404, 422, 431, 500, 501, 502, 503, 504, 505, 506, 507, 508,
  509, 510,
]

const instance = axios.create({
  baseURL: config.public.apiBaseUrl,
})

instance.interceptors.request.use(function (config) {
  const token = useCookie('token')
  config.headers.Authorization = `Bearer ${token.value}`

  return config
})

instance.interceptors.response.use(function (response) {
  if (response?.data?.status_code === 403) {
    const token = useCookie('token')
    token.value = null

    navigateTo('/login')
  }

  if (errorCodes.includes(response?.data?.status_code)) {
    throw response
  }

  return response
})

export default instance
