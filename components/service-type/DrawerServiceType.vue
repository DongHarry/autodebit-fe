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
          ref="formServiceType"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('service_type.code')"
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
            :label="$t('service_type.name')"
            name="name"
            :validate-status="serverErrors?.name ? 'error' : undefined"
            :help="serverErrors?.name || undefined"
          >
            <a-input
              v-model:value="formState.name"
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
import type { IFormServiceType } from '@/interfaces/service'
import { createServiceType, updateServiceType } from '@/api/serviceTypes'
import { useFormSubmit } from '@/composables/useFormSubmit'

const emit = defineEmits(['saved'])

const { t } = useI18n()

const initialState = {
  id: null,
  name: '',
  code: '',
}

const open = ref<boolean>(false)
const formState = reactive<IFormServiceType>({
  id: null,
  name: '',
  code: '',
})
const formServiceType = ref()
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
}

const showDrawer = (data: IFormServiceType | null = null) => {
  changeApiSubmit(createServiceType)

  if (data) {
    isEdit.value = true

    Object.assign(formState, data)

    changeApiSubmit(updateServiceType)
  }

  open.value = true
}

const { submit, loading, serverErrors, changeApiSubmit, resetForm } =
  useFormSubmit({
    formRef: formServiceType,
    apiSubmit: createServiceType,
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
