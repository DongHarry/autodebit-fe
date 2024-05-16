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
            <a-button :loading="loading" type="primary" @click="submit">{{
              $t('button.save')
            }}</a-button>
          </div>
        </div>
      </template>

      <div>
        <a-form
          ref="formTransportType"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('transport_type.code')"
            name="code"
            :validate-status="serverErrors?.code ? 'error' : undefined"
            :help="serverErrors?.code || undefined"
          >
            <a-input
              v-model:value="formState.code"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>

          <a-form-item
            :label="$t('transport_type.name')"
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
            :label="$t('transport_type.type')"
            name="type"
            :validate-status="serverErrors?.type ? 'error' : undefined"
            :help="serverErrors?.type || undefined"
          >
            <a-select
              v-model:value="formState.type"
              :placeholder="$t('placeholder.please_select')"
              @change="fieldChange('type')"
            >
              <a-select-option key="FCL" value="FCL">FCL</a-select-option>
              >
              <a-select-option key="LCL" value="LCL">LCL</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label="$t('user.note')" name="note">
            <a-textarea
              v-model:value="formState.note"
              :placeholder="$t('placeholder.please_enter')"
              allow-clear
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
import type { IFormTransport } from '@/interfaces/transport'
import { createUser, updateUser } from '@/api/users'
import { createTransportType, updateTransportType } from '@/api/transportType'
import { useFormSubmit } from '@/composables/useFormSubmit'

const emit = defineEmits(['saved'])

const { t } = useI18n()

const initialState = {
  id: null,
  name: '',
  code: '',
  type: undefined,
  note: '',
}

const open = ref<boolean>(false)
const formState = reactive<IFormTransport>({
  id: null,
  name: '',
  code: '',
  type: undefined,
  note: '',
})
const formTransportType = ref()
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
      message: t('validate.type_required'),
      trigger: 'change',
    },
  ],
}

const showDrawer = (data: IFormTransport | null = null) => {
  changeApiSubmit(createTransportType)

  if (data) {
    isEdit.value = true

    Object.assign(formState, data)

    changeApiSubmit(updateTransportType)
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
  formRef: formTransportType,
  apiSubmit: createUser,
  formState,
  emit,
})

const cancel = () => {
  resetForm()

  open.value = false

  isEdit.value = false

  Object.assign(formState, initialState)
}

defineExpose({
  showDrawer,
  cancel,
})
</script>
