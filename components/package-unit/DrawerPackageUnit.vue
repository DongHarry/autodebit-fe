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
          ref="formPackageUnit"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('package_unit.code')"
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
            :label="$t('package_unit.name')"
            name="Name"
            :validate-status="serverErrors?.Name ? 'error' : undefined"
            :help="serverErrors?.Name || undefined"
          >
            <a-input
              v-model:value="formState.Name"
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
import { createPackageUnit, updatePackageUnit } from '~/api/packageUnits'
import type { IFormPackageUnit } from '@/interfaces/packageUnit'
import { useFormSubmit } from '@/composables/useFormSubmit'

const emit = defineEmits(['saved'])

const { t } = useI18n()

const initialState = {
  ID: null,
  Name: '',
  Code: '',
}

const open = ref<boolean>(false)
const formState = reactive<IFormPackageUnit>({
  ID: null,
  Name: '',
  Code: '',
})
const formPackageUnit = ref()
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

const showDrawer = (data: IFormPackageUnit | null = null) => {
  changeApiSubmit(createPackageUnit)

  if (data) {
    isEdit.value = true

    Object.assign(formState, data)

    changeApiSubmit(updatePackageUnit)
  }

  open.value = true
}

const { submit, loading, serverErrors, changeApiSubmit, resetForm } =
  useFormSubmit({
    formRef: formPackageUnit,
    apiSubmit: createPackageUnit,
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
