export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const permissions = authStore.permissions
  const isSuperAdmin = authStore.isSuperAdmin

  if (to.meta?.permissions) {
    const requiredPermissions = to.meta.permissions as string[]
    const hasPermission = permissions.some((permission: string) => {
      return requiredPermissions.includes(permission)
    })

    if (!hasPermission || !isSuperAdmin) {
      throw showError({
        statusCode: 404,
      })
    }
  }
})
