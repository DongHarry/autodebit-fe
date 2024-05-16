<template>
  <div>
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      placement="right"
      @close="cancel"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <template v-if="!isEdit">
            <span> {{ $t('button.add_new') }} </span>
          </template>
          <template v-else>
            <span> {{ $t('button.edit') }} </span>
          </template>

          <div class="flex items-center">
            <a-button class="mr-2" @click="cancel">
              {{ $t('button.cancel') }}
            </a-button>
            <a-button :loading="loading" type="primary" @click="handleSubmit">{{
              $t('button.save')
            }}</a-button>
          </div>
        </div>
      </template>

      <div>
        <a-form
          ref="formCreateProvince"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('province.Code')"
            name="Code"
            :validate-status="serverErrors?.Code ? 'error' : undefined"
            :help="serverErrors?.Code || undefined"
          >
            <a-input
              v-model:value="formState.Code"
              :placeholder="$t('placeholder.please_enter')"
              :disabled="isEdit"
            />
          </a-form-item>
          <a-form-item
            :label="$t('province.ProvinceName')"
            name="ProvinceName"
            :validate-status="serverErrors?.ProvinceName ? 'error' : undefined"
            :help="serverErrors?.ProvinceName || undefined"
          >
            <a-input
              v-model:value="formState.ProvinceName"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('country.CountryName')"
            name="CountryID"
            :validate-status="serverErrors?.CountryID ? 'error' : undefined"
            :help="serverErrors?.CountryID || undefined"
            :placeholder="$t('placeholder.please_select')"
          >
            <a-select
              v-model:value="formState.CountryID"
              @change="fieldChange('CountryID')"
              :onPopupScroll="handlePopupScroll"
            >
              <a-select-option
                v-for="country in countries"
                :value="country.ID"
                >{{ country.CountryName }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import _first from 'lodash/first'
import { create } from '@/api/provinces'
import { useFormSubmit } from '@/composables/useFormSubmit'
import axios from '@/libs/axios'

const emit = defineEmits(['saved', 'reload'])

const authStore = useAuthStore()
const { t } = useI18n()

const initialState = {
  ID: null,
  ProvinceName: '',
  Code: '',
  CountryID: ''
}

const open = ref<boolean>(false)
const formState = reactive({ ...initialState })
const formCreateProvince = ref()
const isEdit = ref<boolean>(false)
const countries = ref<any>([])
const countryTotalPage = ref<number>(1)
const countryCurrentPage = ref<number>(0)

onMounted(async () => {
  const { data } = await axios('countries', {})

  if (data.data && data.status_code == 200) {
    countries.value = data.data.data
    countryTotalPage.value = data.data.total_page
    countryCurrentPage.value = 1
  }
})

const rules: Record<string, Rule[]> = {
  ProvinceName: [
    {
      required: true,
      message: t('validate.name_required'),
      trigger: 'change',
    },
  ],
  Code: [
    {
      required: true,
      message: t('validate.code_required'),
      trigger: 'change',
    },
  ],
  CountryID: [
    {
      required: true,
      message: t('validate.country_required'),
      trigger: 'change',
    },
  ],
}

const showDrawer = async (data: any | null = null) => {
  changeApiSubmit(create)

  open.value = true
}

const {
  submit,
  loading,
  serverErrors,
  changeApiSubmit,
  fieldChange,
  resetForm,
} = useFormSubmit({
  formRef: formCreateProvince,
  apiSubmit: create,
  formState,
  emit,
})

const handleSubmit = async () => {
  try {
    const response = await submit()
    if (response.status_code == 200) {
      emit('reload')
      Object.assign(formState, { ...initialState })
      open.value = false
    }
  } catch (e) {
    message.error(t('message.action_error'))
  }
}

const handlePopupScroll = async (e: any) => {
  if (countryTotalPage.value > countryCurrentPage.value && e.target.clientHeight + e.target.scrollTop == e.target.scrollHeight) {
    const { data } = await axios('countries', {
      params: {
        page: countryCurrentPage.value + 1
      }
    })

    if (data.data && data.status_code == 200) {
      countries.value.push(...data.data.data)
      countryTotalPage.value = data.data.total_page
      countryCurrentPage.value += 1
    }
  }
}

const cancel = () => {
  // resetForm()

  open.value = false

  isEdit.value = false

  Object.assign(formState, initialState)
}

defineExpose({
  showDrawer,
  cancel,
})
</script>
