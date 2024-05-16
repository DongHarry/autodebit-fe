<template>
  <a-layout-header class="flex justify-end items-center border-b">
    <div class="mr-8 flex items-center">
      <a-badge :count="99" class="mr-8 mt-2">
        <CommentOutlined />
      </a-badge>
      <a-badge :count="99" class="mr-8 mt-2">
        <BellOutlined />
      </a-badge>

      <div class="mr-8 mt-2">
        <a-dropdown placement="bottom" :arrow="{ pointAtCenter: true }">
          <GlobalOutlined class="text-2xl text-slate-500" />
          <template #overlay>
            <a-menu>
              <a-menu-item @click="changeLocale('vi')">
                <div class="flex">
                  <img
                    src="~/assets/img/languages/vietnamese.png"
                    class="h-6 w-10"
                    alt="Logo"
                  />
                  <span class="ml-2">Tiếng Việt</span>
                </div>
              </a-menu-item>
              <a-menu-item @click="changeLocale('en')">
                <div class="flex">
                  <img
                    src="~/assets/img/languages/english.png"
                    class="h-6 w-10"
                    alt="Logo"
                  />
                  <span class="ml-2"> English </span>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <div class="flex items-center cursor-pointer" @click.prevent>
            <a-avatar class="mr-2">
              <template #icon><UserOutlined /></template>
            </a-avatar>

            <span> {{ currentUserName }} </span>
          </div>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logoutAuth">
              <div class="flex items-center">
                <LogoutOutlined class="mr-2" />
                <span> Logout </span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { logout, changeLanguage } from '@/api/auths'

const authStore = useAuthStore()
const { t, locale } = useI18n()

const currentUserName = computed(() => {
  return authStore.currentUser.name
})

const logoutAuth = async () => {
  try {
    await logout()

    authStore.clearUser()

    location.href = '/login'

    localStorage.removeItem('locale')
  } catch (e) {
    message.error(t('message.action_error'))
  }
}

const changeLocale = async (lang: string) => {
  if (locale.value === lang) return

  try {
    await changeLanguage(authStore.currentUser.id, lang)

    locale.value = lang

    localStorage.setItem('locale', lang)

    await authStore.fetchUserInfo()
  } catch (e) {
    message.error(t('message.action_error'))
  }
}
</script>

<style lang="scss">
.ant-layout-header {
  height: 56px !important;
  background-color: #fff !important;
  padding: 0 !important;
}
</style>
