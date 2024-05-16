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
        ref="formRoute"
        layout="vertical"
        :model="formState"
        :rules="rules"
    >
      <a-form-item
          :label="$t('route.code')"
          name="Code"
          :validate-status="serverErrors?.company_code ? 'error' : undefined"
          :help="serverErrors?.company_code || null"
      >
        <a-input
            v-model:value="formState.Code"
            size="large"
            :disabled="!isCreate"
            :placeholder="$t('route.code')"
            @input="fieldChange('company_code')"
        />
      </a-form-item>
      <a-form-item
          :label="$t('route.name')"
          name="RoutingName"
          :validate-status="serverErrors?.RoutingName ? 'error' : undefined"
          :help="serverErrors?.RoutingName || null"
      >
        <a-input
            v-model:value="formState.RoutingName"
            size="large"
            :placeholder="$t('route.name')"
            @input="fieldChange('name')"
        />
      </a-form-item>
      <a-form-item
          :label="$t('route.using')"
          name="RoutingName"
          :validate-status="serverErrors?.IsUse ? 'error' : undefined"
          :help="serverErrors?.IsUse || null"
      >
        <a-switch v-model:checked="formState.IsUse" :checkedValue="1" :un-checked-value="0">
          <template #checkedChildren><check-outlined /></template>
          <template #unCheckedChildren><close-outlined /></template>
        </a-switch>
      </a-form-item>
      <a-form-item
          :label="$t('route.type')"
      >
        <a-select
            ref="select"
            v-model:value="routeType"
            size="large"
            :placeholder="$t('placeholder.please_select')"
            @change="handleChangeType"
        >
          <a-select-option v-for="type in listRoute" :value="type.value">{{$t(type.label)}}</a-select-option>
        </a-select>
      </a-form-item>
      <div v-if="formState.IsLocation" class="grid grid-cols-2 gap-4">
        <a-form-item
            :label="$t('route.from_location')"
            name="LocationFromCode"
            :validate-status="serverErrors?.IsUse ? 'error' : undefined"
            :help="serverErrors?.IsUse || null"
        >
          <a-select
              ref="select"
              v-model:value="formState.LocationFromCode"
              size="large"
              :allowClear="true"
              :placeholder="$t('placeholder.please_select')"
              @change="handleChangeType"
          >
            <a-select-option v-for="location in locationOptions" :value="location.Code">{{location.Location}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
            :label="$t('route.to_location')"
            name="LocationToCode"
            :validate-status="serverErrors?.IsUse ? 'error' : undefined"
            :help="serverErrors?.IsUse || null"
        >
          <a-select
              ref="select"
              v-model:value="formState.LocationToCode"
              size="large"
              :allowClear="true"
              :placeholder="$t('placeholder.please_select')"
              @change="handleChangeType"
          >
            <a-select-option v-for="location in locationOptions" :value="location.Code">{{location.Location}}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div v-if="formState.IsArea" class="grid grid-cols-2 gap-4">
        <a-form-item
            :label="$t('route.from_area')"
            name="AreaFromCode"
            :allowClear="true"
            :validate-status="serverErrors?.IsUse ? 'error' : undefined"
            :help="serverErrors?.IsUse || null"
        >
          <a-select
              ref="select"
              v-model:value="formState.AreaFromCode"
              size="large"
              :placeholder="$t('placeholder.please_select')"
              @change="handleChangeType"
          >
            <a-select-option v-for="location in areaOptions" :value="location.Code">{{location.Location}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
            :label="$t('route.to_area')"
            name="AreaToCode"
            :validate-status="serverErrors?.IsUse ? 'error' : undefined"
            :help="serverErrors?.IsUse || null"
        >
          <a-select
              ref="select"
              v-model:value="formState.AreaToCode"
              :allowClear="true"
              size="large"
              :placeholder="$t('placeholder.please_select')"
              @change="handleChangeType"
              loading
          >
            <a-select-option v-for="location in areaOptions" :value="location.Code">{{location.Location}}</a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useFormSubmit } from '~/composables/useFormSubmit'
import { ROUTE_TYPES } from '~/constants/route'
import _get from 'lodash/get'
import _cloneDeep from 'lodash/cloneDeep'
import { createRoute, updateRoute } from '~/api/routes'
import { masterData } from '~/api/masterData'
import { useI18n } from 'vue-i18n'

const open = ref<boolean>(false)
const locationOptions = ref<any>([])
const areaOptions = ref<any>([])
const formRoute = ref()
const { t } = useI18n()
const initialState = {
  ID: null,
  Code: '',
  RoutingName: '',
  IsUse: 1,
  IsArea: false,
  IsLocation: false,
  LocationFromCode: '',
  LocationToCode: '',
  AreaFromCode: '',
  AreaToCode: ''
}
const formState = reactive({ ...initialState })
const emit = defineEmits(['saved'])
const isCreate = ref(true)
const listRoute = ROUTE_TYPES

const closeDrawer = () => {
  open.value = false
  Object.assign(formState, initialState)
  // resetForm()
}
const handleSuccess = () => {
  emit('saved', formState)
  closeDrawer()
}

const { submit, serverErrors, changeApiSubmit, fieldChange, resetForm } = useFormSubmit({
  formRef: formRoute,
  apiSubmit: createRoute,
  formState,
  callbackSuccess: handleSuccess
})

const routeType = ref<number>(1)

const showDrawer = (route: any) => {
  open.value = true
  isCreate.value = true

  if (route) {
    isCreate.value = false
    Object.assign(formState, _cloneDeep(route))
  }

  changeApiSubmit(createRoute)
  handleChangeType()

  if (formState.ID) {
    changeApiSubmit(updateRoute)
  }
}

const handleChangeType = () => {
  if (routeType.value == ROUTE_TYPES.location_type.value) {
    formState.IsLocation = true
    formState.IsArea = false
    return
  }

  formState.IsLocation = false
  formState.IsArea = true
}

defineExpose({
  showDrawer,
  closeDrawer,
})

const rules: any = computed(() => {
  return {
    Code: [
      { required: true, message: t('validate.route.code_required'), trigger: 'blur' },
    ],
    RoutingName: [
      { required: true, message: t('validate.route.name_required'), trigger: 'blur' },
    ],
    LocationFromCode: [
      { required: true, message: t('validate.location_required'), trigger: 'blur' },
    ],
    LocationToCode: [
      { required: true, message: t('validate.location_required'), trigger: 'blur' },
    ],
    AreaFromCode: [
      { required: true, message: t('validate.area_required'), trigger: 'blur' },
    ],
    AreaToCode: [
      { required: true, message: t('validate.area_required'), trigger: 'blur' },
    ]
  }
})

const loadLocation = async () => {
  const resources = { 'resources[locations]': '' }
  const response = await masterData(resources)
  locationOptions.value = _get(response, 'data.data.locations', [])
}

useAsyncData('loadLocation', loadLocation)
</script>
