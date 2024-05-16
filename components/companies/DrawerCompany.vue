<template>
  <a-drawer
    :width="500"
    :title="isCreate ? $t('button.add_new') : $t('button.edit')"
    placement="right"
    :open="open"
    @close="closeDrawer"
  >
    <template #extra>
      <a-button style="margin-right: 8px" @click="closeDrawer">{{$t('button.cancel')}}</a-button>
      <a-button type="primary" @click="submit">{{$t('button.save')}}</a-button>
    </template>
    <a-form
      ref="formCompany"
      layout="vertical"
      :model="formState"
      :rules="rules"
    >
      <a-form-item
        :label="$t('company.code')"
        name="company_code"
        :validate-status="serverErrors?.company_code ? 'error' : undefined"
        :help="serverErrors?.company_code || null"
      >
        <a-input
          v-model:value="formState.company_code"
          size="large"
          :disabled="!isCreate"
          :placeholder="$t('company.code')"
          @input="fieldChange('company_code')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('company.name')"
        name="name"
        :validate-status="serverErrors?.name ? 'error' : undefined"
        :help="serverErrors?.name || null"
      >
        <a-input
          v-model:value="formState.name"
          size="large"
          :placeholder="$t('company.name')"
          @input="fieldChange('name')"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import _cloneDeep from 'lodash/cloneDeep'
import type { Rule } from 'ant-design-vue/es/form'
import { useFormSubmit } from '~/composables/useFormSubmit'
import { createCompany, updateCompany } from '~/api/companies'

const open = ref<boolean>(false)
const formCompany = ref()
const initialState = {
  id: null,
  company_code: '',
  name: '',
}
const formState = reactive({ ...initialState })
const emit = defineEmits(['saved'])
const isCreate = ref(true)

const { submit, serverErrors, changeApiSubmit, fieldChange } = useFormSubmit({
  formRef: formCompany,
  apiSubmit: createCompany,
  formState,
  emit,
})

const showDrawer = (company: any) => {
  open.value = true
  isCreate.value = true

  if (company) {
    isCreate.value = false
    Object.assign(formState, _cloneDeep(company))
  }

  changeApiSubmit(createCompany)

  if (formState.id) {
    changeApiSubmit(updateCompany)
  }
}

const closeDrawer = () => {
  open.value = false
  Object.assign(formState, initialState)
  // resetForm()
}

defineExpose({
  showDrawer,
  closeDrawer,
})

const rules: Record<string, Rule[]> = {
  company_code: [
    { required: true, message: 'Vui lòng nhập mã đơn vị', trigger: 'blur' },
  ],
  name: [
    { required: true, message: 'Vui lòng nhập tên đơn vị', trigger: 'blur' },
  ],
}
</script>
