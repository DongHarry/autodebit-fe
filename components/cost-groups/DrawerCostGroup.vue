<template>
  <a-drawer
    :width="500"
    :title="isCreate ? $t('button.add_new') : $t('button.edit')"
    placement="right"
    :open="open"
    @close="closeDrawer"
  >
    <template #extra>
      <a-button style="margin-right: 8px" @click="closeDrawer">{{
        $t('button.cancel')
      }}</a-button>
      <a-button type="primary" @click="submit">{{
        $t('button.save')
      }}</a-button>
    </template>
    <a-form
      ref="formCostGroup"
      layout="vertical"
      :model="formState"
      :rules="rules"
    >
      <a-form-item
        :label="$t('cost_group.code')"
        name="code"
        :validate-status="serverErrors?.code ? 'error' : undefined"
        :help="serverErrors?.code || null"
      >
        <a-input
          v-model:value="formState.code"
          size="large"
          :disabled="!isCreate"
          :placeholder="$t('placeholder.please_enter')"
          @input="fieldChange('code')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('cost_group.name')"
        name="name"
        :validate-status="serverErrors?.name ? 'error' : undefined"
        :help="serverErrors?.name || null"
      >
        <a-input
          v-model:value="formState.name"
          size="large"
          :placeholder="$t('placeholder.please_enter')"
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
import { useI18n } from 'vue-i18n'
import { useFormSubmit } from '~/composables/useFormSubmit'
import { createCostGroup, updateCostGroup } from '~/api/costGroups'

const { t } = useI18n()

const open = ref<boolean>(false)
const formCostGroup = ref()
const initialState = {
  id: null,
  code: '',
  name: '',
}
const formState = reactive({ ...initialState })
const emit = defineEmits(['saved'])
const isCreate = ref(true)

const { submit, serverErrors, changeApiSubmit, fieldChange } = useFormSubmit({
  formRef: formCostGroup,
  apiSubmit: createCostGroup,
  formState,
  emit,
})

const showDrawer = (costGroup: any) => {
  open.value = true
  isCreate.value = true

  if (costGroup) {
    isCreate.value = false
    Object.assign(formState, _cloneDeep(costGroup))
  }

  changeApiSubmit(createCostGroup)

  if (formState.id) {
    changeApiSubmit(updateCostGroup)
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
  code: [
    { required: true, message: t('validate.code_required'), trigger: 'blur' },
  ],
  name: [
    { required: true, message: t('validate.name_required'), trigger: 'blur' },
  ],
}
</script>
