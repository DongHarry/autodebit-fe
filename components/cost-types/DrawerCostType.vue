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
      ref="formCostType"
      layout="vertical"
      :model="formState"
      :rules="rules"
    >
      <a-form-item
        :label="$t('cost_type.code')"
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
        :label="$t('cost_type.name')"
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
      <a-form-item :label="$t('cost_group.cost_group')" name="cost_group_id">
        <a-select
          v-model:value="formState.cost_group_id"
          :allow-clear="true"
          :placeholder="$t('placeholder.please_select')"
        >
          <a-select-option
            v-for="costGroup in costGroupOptions"
            :value="costGroup.id"
            >{{ costGroup.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import _cloneDeep from 'lodash/cloneDeep'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import _get from 'lodash/get'
import { useFormSubmit } from '~/composables/useFormSubmit'
import { createCostType, updateCostType } from '~/api/costTypes'
import { masterData } from '~/api/masterData'
import { type ICostGroup } from '~/interfaces/costGroup'
import { type ICostType } from '~/interfaces/costType'

const { t } = useI18n()

const open = ref<boolean>(false)
const formCostType = ref()
const initialState = {
  id: null,
  code: '',
  name: '',
  cost_group_id: undefined,
}

const costGroupOptions = ref<ICostGroup[]>([])

const props = defineProps({
  costGroups: {
    type: Array<ICostGroup>,
    default: [],
  },
})

const formState = reactive({ ...initialState })
const emit = defineEmits(['saved'])
const isCreate = ref(true)

const { submit, serverErrors, changeApiSubmit, fieldChange } = useFormSubmit({
  formRef: formCostType,
  apiSubmit: createCostType,
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

  changeApiSubmit(createCostType)

  if (formState.id) {
    changeApiSubmit(updateCostType)
  }
}

const closeDrawer = () => {
  open.value = false
  Object.assign(formState, initialState)
  formCostType.value.clearValidate()
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
  cost_group_id: [
    {
      required: true,
      message: t('validate.cost_group_required'),
      trigger: 'blur',
    },
  ],
}

const loadCostgroup = async () => {
  if (props.costGroups.length) {
    costGroupOptions.value = props.costGroups
    return
  }

  const resources = { 'resources[cost_groups]': '' }
  const response = await masterData(resources)
  costGroupOptions.value = _get(response, 'data.data.cost_groups', [])
}

useAsyncData('loadMasterCostGroup', loadCostgroup)
</script>
