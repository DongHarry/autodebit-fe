<template>
  <div>
    <div
      class="bg-[url('~/assets/img/login-bg.jpg')] h-screen overflow-hidden flex items-center justify-center"
    >
      <div class="bg-white lg:w-3/12 md:6/12 w-10/12 shadow-3xl">
        <div
          class="absolute left-1/2 transform -translate-x-1/2 -translate-y-52 rounded-full p-4 md:p-8"
        >
          <img src="~/assets/img/big-logo.png" class="h-24" alt="Logo" />
        </div>
        <a-form
          ref="formLogin"
          layout="vertical"
          :model="formState"
          :rules="rules"
          :hide-required-mark="true"
        >
          <a-form-item
            :label="$t('user.account', '', { locale: 'en' })"
            name="username"
          >
            <a-input
              v-model:value="formState.username"
              size="large"
              :placeholder="$t('user.account', '', { locale: 'en' })"
              @press-enter="login"
            />
          </a-form-item>
          <a-form-item
            :label="$t('user.password', '', { locale: 'en' })"
            name="password"
          >
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="********"
              @press-enter="login"
            />
          </a-form-item>
          <p class="text-cyan-800">
            {{ $t('button.forgot_password', '', { locale: 'en' }) }}
          </p>
          <a-form-item>
            <a-button
              class="mt-4 w-full bg-cyan-800"
              type="primary"
              size="large"
              :loading="loading"
              @click="login"
            >
              {{ $t('button.login', '', { locale: 'en' }) }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { useFormSubmit } from '../composables/useFormSubmit'
import { login as loginApi } from '~/api/auths'

definePageMeta({
  layout: 'none',
})

const { t } = useI18n()

const formLogin = ref()

const rules = {
  username: [
    {
      required: true,
      message: t('validate.account_required', '', { locale: 'en' }),
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: t('validate.password_required', '', { locale: 'en' }),
      trigger: 'change',
    },
  ],
}

const formState = reactive({
  username: '',
  password: '',
})

const login = async () => {
  try {
    const response = await submit()

    if (response) {
      const token = useCookie('token')
      token.value = response.data.access_token

      location.href = '/'
    }
  } catch (e) {
    message.error(t('message.login_failed', '', { locale: 'en' }))
  }
}

const { submit, loading } = useFormSubmit({
  formRef: formLogin,
  apiSubmit: loginApi,
  formState,
})
</script>
