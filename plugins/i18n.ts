import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import vi from '@/locales/vi.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('locale') ?? 'vi',
    fallbackLocale: 'vi',
    messages: {
      vi,
      en,
    },
  })

  vueApp.use(i18n)
})
