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
          ref="formCreateCountry"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('country.Code')"
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
            :label="$t('country.CountryName')"
            name="CountryName"
            :validate-status="serverErrors?.CountryName ? 'error' : undefined"
            :help="serverErrors?.CountryName || undefined"
          >
            <a-input
              v-model:value="formState.CountryName"
              :placeholder="$t('placeholder.please_enter')"
            />
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
import { create } from '@/api/countries'
import { useFormSubmit } from '@/composables/useFormSubmit'

const emit = defineEmits(['saved', 'reload'])

const authStore = useAuthStore()
const { t } = useI18n()

const initialState = {
  ID: null,
  CountryName: '',
  Code: '',
}

const open = ref<boolean>(false)
const formState = reactive({ ...initialState })
const formCreateCountry = ref()
const isEdit = ref<boolean>(false)

const rules: Record<string, Rule[]> = {
  CountryName: [
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
  formRef: formCreateCountry,
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
