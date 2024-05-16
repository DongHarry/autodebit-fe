import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('permissions', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const authStore = useAuthStore()

      const permissions = authStore.permissions
      const isSuperAdmin = authStore.isSuperAdmin

      const { value } = binding

      if (value && Array.isArray(value) && value.length > 0) {
        const requiredPermissions = value
        const hasPermission = permissions.some((permission: string) => {
          return requiredPermissions.includes(permission)
        })

        if (!hasPermission || !isSuperAdmin) {
          el.parentNode?.removeChild(el)
        }
      } else {
        throw new Error(
          `Permissions are required! Example: v-permission="['manage user','manage permission']"`,
        )
      }
    },
  })
})
