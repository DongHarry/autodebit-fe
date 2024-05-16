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
          ref="formContainer"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('container.code')"
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
            :label="$t('container.name')"
            name="PackingName"
            :validate-status="serverErrors?.PackingName ? 'error' : undefined"
            :help="serverErrors?.PackingName || undefined"
          >
            <a-input
              v-model:value="formState.PackingName"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('container.width')"
            name="Width"
            :validate-status="serverErrors?.Width ? 'error' : undefined"
            :help="serverErrors?.Width || undefined"
          >
            <a-input-number
              v-model:value="formState.Width"
              :placeholder="$t('placeholder.please_enter')"
              class="w-full"
            />
          </a-form-item>
          <a-form-item
            :label="$t('container.height')"
            name="Height"
            :validate-status="serverErrors?.Height ? 'error' : undefined"
            :help="serverErrors?.Height || undefined"
          >
            <a-input-number
              v-model:value="formState.Height"
              :placeholder="$t('placeholder.please_enter')"
              class="w-full"
            />
          </a-form-item>
          <a-form-item
            :label="$t('container.length')"
            name="Length"
            :validate-status="serverErrors?.Length ? 'error' : undefined"
            :help="serverErrors?.Length || undefined"
          >
            <a-input-number
              v-model:value="formState.Length"
              :placeholder="$t('placeholder.please_enter')"
              class="w-full"
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
import type { IFormContainer } from '@/interfaces/container'
import { createContainer, updateContainer } from '@/api/containers'
import { useFormSubmit } from '@/composables/useFormSubmit'

const emit = defineEmits(['saved'])

const { t } = useI18n()

const initialState = {
  ID: null,
  Code: '',
  PackingName: '',
  Width: undefined,
  Height: undefined,
  Length: undefined,
}

const open = ref<boolean>(false)
const formState = reactive<IFormContainer>({
  ID: null,
  Code: '',
  PackingName: '',
  Width: undefined,
  Height: undefined,
  Length: undefined,
})
const formContainer = ref()
const isEdit = ref<boolean>(false)

const rules: Record<string, Rule[]> = {
  PackingName: [
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
  Width: [
    {
      required: true,
      message: t('validate.width_required'),
      trigger: 'change',
    },
  ],
  Height: [
    {
      required: true,
      message: t('validate.height_required'),
      trigger: 'change',
    },
  ],
  Length: [
    {
      required: true,
      message: t('validate.length_required'),
      trigger: 'change',
    },
  ],
}

const showDrawer = (data: IFormContainer | null = null) => {
  changeApiSubmit(createContainer)

  if (data) {
    isEdit.value = true

    Object.assign(formState, data)

    changeApiSubmit(updateContainer)
  }

  open.value = true
}

const { submit, loading, serverErrors, changeApiSubmit, resetForm } =
  useFormSubmit({
    formRef: formContainer,
    apiSubmit: createContainer,
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
