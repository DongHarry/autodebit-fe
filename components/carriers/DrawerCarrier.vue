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
          ref="formCreateCarrier"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('carrier.code')"
            name="code"
            :validate-status="serverErrors?.code ? 'error' : undefined"
            :help="serverErrors?.code || undefined"
          >
            <a-input
              v-model:value="formState.code"
              :placeholder="$t('placeholder.please_enter')"
              :disabled="isEdit"
            />
          </a-form-item>
          <a-form-item
            :label="$t('carrier.name')"
            name="name"
            :validate-status="serverErrors?.name ? 'error' : undefined"
            :help="serverErrors?.name || undefined"
          >
            <a-input
              v-model:value="formState.name"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('carrier.address')"
            name="address"
            :validate-status="serverErrors?.address ? 'error' : undefined"
            :help="serverErrors?.address || undefined"
          >
            <a-input
              v-model:value="formState.address"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('carrier.type')"
            name="type"
            :validate-status="serverErrors?.type ? 'error' : undefined"
            :help="serverErrors?.type || undefined"
            :placeholder="$t('placeholder.please_select')"
          >
            <a-select
              v-model:value="formState.type"
              @change="fieldChange('type')"
            >
              <a-select-option
                :key="CARRIER_TYPE.TRAIN"
                :value="CARRIER_TYPE.TRAIN"
                >{{ $t('carrier.train') }}</a-select-option
              >
              <a-select-option
                :key="CARRIER_TYPE.AIRPLANE"
                :value="CARRIER_TYPE.AIRPLANE"
                >{{ $t('carrier.airplane') }}</a-select-option
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
import { create, update } from '@/api/carriers'
import { useFormSubmit } from '@/composables/useFormSubmit'
import { CARRIER_TYPE } from '@/constants/carrier'

const emit = defineEmits(['saved', 'reload'])

const authStore = useAuthStore()
const { t } = useI18n()

const initialState = {
  id: null,
  name: '',
  code: '',
  address: '',
  type: '',
}

const open = ref<boolean>(false)
const formState = reactive({ ...initialState })
const formCreateCarrier = ref()
const isEdit = ref<boolean>(false)

const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: t('validate.name_required'),
      trigger: 'change',
    },
  ],
  code: [
    {
      required: true,
      message: t('validate.code_required'),
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: t('validate.carrier.type_required'),
      trigger: 'change',
    },
  ],
}

const showDrawer = async (data: any | null = null) => {
  changeApiSubmit(create)

  if (data) {
    isEdit.value = true
    Object.assign(formState, { ...data })
    changeApiSubmit(update)
  }

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
  formRef: formCreateCarrier,
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
