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
          ref="formCreateUser"
          :model="formState"
          layout="vertical"
          :rules="rules"
          autocomplete="off"
        >
          <a-form-item
            :label="$t('user.name')"
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
            :label="$t('user.account')"
            name="username"
            :validate-status="serverErrors?.username ? 'error' : undefined"
            :help="serverErrors?.username || undefined"
          >
            <a-input
              v-model:value="formState.username"
              :placeholder="$t('placeholder.please_enter')"
              :disabled="isEdit"
            />
          </a-form-item>

          <a-form-item
            label="Email"
            name="email"
            :validate-status="serverErrors?.email ? 'error' : undefined"
            :help="serverErrors?.email || undefined"
          >
            <a-input
              v-model:value="formState.email"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>

          <a-form-item
            v-if="LEVEL.CONTROLLING_COMPANY === currentLevel"
            :label="$t('user.company')"
            name="company_id"
            :validate-status="serverErrors?.company_id ? 'error' : undefined"
            :help="serverErrors?.company_id || undefined"
          >
            <a-select
              v-model:value="formState.company_id"
              :placeholder="$t('placeholder.please_select')"
            >
              <a-select-option
                v-for="company in companiesData"
                :key="`${company.id}-company`"
                :value="company.id"
                >{{ company.name }}</a-select-option
              >
            </a-select>
          </a-form-item>

          <a-form-item :label="$t('user.phone_number')" name="phone_number">
            <a-input
              v-model:value="formState.phone_number"
              :placeholder="$t('placeholder.please_enter')"
            />
          </a-form-item>

          <a-form-item
            :label="$t('user.role')"
            name="role"
            :validate-status="serverErrors?.role ? 'error' : undefined"
            :help="serverErrors?.role || undefined"
          >
            <a-select
              v-model:value="formState.role"
              :placeholder="$t('placeholder.please_select')"
              @change="fieldChange('role')"
            >
              <a-select-option
                v-for="role in roles"
                :key="role.id"
                :value="role.name"
                >{{ role.name }}</a-select-option
              >
            </a-select>
          </a-form-item>

          <a-form-item :label="$t('user.note')" name="note">
            <a-textarea
              v-model:value="formState.note"
              :placeholder="$t('placeholder.please_enter')"
              allow-clear
            />
          </a-form-item>

          <a-form-item name="status" :label="$t('user.using')">
            <a-switch
              v-model:checked="formState.status"
              :checked-value="1"
              :un-checked-value="0"
            >
              <template #checkedChildren><check-outlined /></template>
              <template #unCheckedChildren><close-outlined /></template>
            </a-switch>
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
import type { IFormUser, IUser } from '@/interfaces/user'
import type { IRole } from '@/interfaces/role'
import type { ICompany } from '@/interfaces/company'
import { createUser, updateUser } from '@/api/users'
import { useFormSubmit } from '@/composables/useFormSubmit'
import { LEVEL } from '@/constants/company'
import { listCompany } from '~/api/companies'

const emit = defineEmits(['saved'])

defineProps<{
  roles: IRole[]
}>()

const authStore = useAuthStore()
const { t } = useI18n()

const initialState = {
  id: null,
  name: '',
  username: '',
  email: '',
  phone_number: '',
  role: undefined,
  note: '',
  company_id: undefined,
  status: 1,
}

const open = ref<boolean>(false)
const formState = reactive<IFormUser>({
  id: null,
  name: '',
  username: '',
  email: '',
  phone_number: '',
  role: undefined,
  note: '',
  company_id: undefined,
  status: 1,
})
const formCreateUser = ref()
const isEdit = ref<boolean>(false)
const companiesData = ref<ICompany[]>([])

const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: t('validate.name_required'),
      trigger: 'change',
    },
  ],
  username: [
    {
      required: true,
      message: t('validate.account_required'),
      trigger: 'change',
    },
  ],
  email: [
    {
      required: true,
      type: 'email',
      message: t('validate.email_required'),
      trigger: 'change',
    },
  ],
  role: [
    {
      required: true,
      message: t('validate.role_required'),
      trigger: 'change',
    },
  ],
  company_id: [
    {
      required: true,
      message: t('validate.company_required'),
      trigger: 'change',
    },
  ],
}

const currentLevel = computed(() => {
  return authStore.user.company.level
})

const showDrawer = async (data: IUser | null = null) => {
  const {
    data: {
      data: { data: companies },
    },
  } = await listCompany({})

  companiesData.value = companies

  changeApiSubmit(createUser)

  if (data) {
    isEdit.value = true

    Object.assign(formState, { ...data, role: _first(data.roles)?.name })

    changeApiSubmit(updateUser)
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
  formRef: formCreateUser,
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
