import { defineStore } from 'pinia'
import axios from 'axios'
import _get from 'lodash/get'
import type { IUser } from '@/interfaces/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as IUser,
  }),

  getters: {
    currentUser: (store) => store.user,
    permissions: (store) => store.user.permissions ?? [],
    isSuperAdmin: (store) => store.user.is_super_admin,
  },

  actions: {
    async fetchUserInfo() {
      const router = useRouter()
      if (router.currentRoute.value.path === '/login') {
        return
      }
      const config = useRuntimeConfig()
      const token = useCookie('token')

      const instanceAxios = axios.create({
        baseURL: config.public.apiBaseUrl,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      const response = await instanceAxios.get('/auth/me')

      if (response.data.status_code === 403) {
        const token = useCookie('token')
        token.value = null
        return (location.href = '/login')
      }
      this.user = response?.data?.data

      localStorage.setItem(
        'locale',
        _get(this.user, 'language', 'vi') as string,
      )
    },

    clearUser() {
      this.user = {} as IUser
      const token = useCookie('token')
      token.value = null
    },
  },
})
