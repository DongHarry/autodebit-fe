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
          ref="formCreateDistrict"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('district.Code')"
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
            :label="$t('district.DistrictName')"
            name="DistrictName"
            :validate-status="serverErrors?.DistrictName ? 'error' : undefined"
            :help="serverErrors?.DistrictName || undefined"
          >
            <a-input
              v-model:value="formState.DistrictName"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>
          <SelectAddress
            v-model:countryId="formState.CountryID"
            v-model:provinceId="formState.ProvinceID"
            :country-rules="rules.CountryID"
            :province-rules="rules.ProvinceID"
            :isShowDistrict="true"
          />
        </a-form>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import _first from 'lodash/first'
import { create } from '@/api/districts'
import { useFormSubmit } from '@/composables/useFormSubmit'
import SelectAddress from '~/components/common/addresses/SelectAddress.vue'


const emit = defineEmits(['saved', 'reload'])

const authStore = useAuthStore()
const { t } = useI18n()

const initialState = {
  ID: null,
  DistrictName: '',
  Code: '',
  CountryID: '',
  ProvinceID: ''
}

const open = ref<boolean>(false)
const formState = reactive({ ...initialState })
const formCreateDistrict = ref()
const isEdit = ref<boolean>(false)

const rules: Record<string, Rule[]> = {
  DistrictName: [
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
  ProvinceID: [
    {
      required: true,
      message: t('validate.province_required'),
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
  formRef: formCreateDistrict,
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
