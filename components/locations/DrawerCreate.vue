<template>
  <a-drawer
    :open="props.open"
    class="custom-class"
    root-class-name="root-class-name"
    placement="right"
    @close="emit('closeDrawer')"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <span>{{
          props.isEdit ? $t('button.edit') : $t('button.add_new')
        }}</span>

        <div class="flex items-center">
          <a-button class="mr-2" @click="cancel">Hủy</a-button>
          <a-button type="primary" @click="submit">Lưu</a-button>
        </div>
      </div>
    </template>
    <a-form
      ref="formCreateLocation"
      layout="vertical"
      :model="formState"
      :rules="rules"
    >
      <a-form-item :label="$t('location.code')" name="Code">
        <a-input v-model:value="formState.Code" :placeholder="$t('placeholder.please_input')" :disabled="isEdit" />
      </a-form-item>

      <a-form-item :label="$t('location.name')" name="Location">
        <a-input
          v-model:value="formState.Location"
          :placeholder="$t('placeholder.please_input')"
        />
      </a-form-item>

      <a-form-item :label="$t('common.address')" name="Address">
        <a-input
          v-model:value="formState.Address"
          :placeholder="$t('placeholder.please_input')"
        />
      </a-form-item>

      <SelectAddress
        v-model:countryId="formState.CountryID"
        v-model:provinceId="formState.ProvinceID"
        v-model:districtId="formState.DistrictID"
        :country-rules="rules.country_id"
        :province-rules="rules.province_id"
      />

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item :label="$t('common.longitude')" name="longitude">
            <a-input
              v-model:value="formState.Lng"
              :placeholder="$t('placeholder.please_input')"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label="$t('common.latitude')" name="latitude">
            <a-input
              v-model:value="formState.Lat"
              :placeholder="$t('placeholder.please_input')"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <SelectAddressTypes v-model:type_id="formState.TypeOfTOLocationID" />
    </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import SelectAddress from '~/components/common/addresses/SelectAddress.vue'
import SelectAddressTypes from '~/components/common/AddressTypes/Select.vue'
import { useFormSubmit } from '~/composables/useFormSubmit'
import { create, update } from '~/api/locations'

const { t } = useI18n()

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  isEdit: {
    type: Boolean,
  },
  locationEdit: {
    type: Object,
    default: {},
  },
})

const emit = defineEmits(['closeDrawer', 'reload'])

const formCreateLocation = ref()

const cancel = () => {
  emit('closeDrawer')
}

interface FormState {
  Code: string
  Location: string
  Address: string
  CountryID: string
  ProvinceID: string
  DistrictID: string
  Lng: string
  Lat: string
  TypeOfTOLocationID: string
}
const formRef = ref<FormInstance>()
const initialFormState = {
  Code: '',
  Location: '',
  Address: '',
  CountryID: null,
  ProvinceID: null,
  DistrictID: null,
  Lng: '',
  Lat: '',
  TypeOfTOLocationID: null,
}

const formState = reactive<any>({ ...initialFormState })

const actionSuccess = () => {
  emit('reload')
  formCreateLocation.value.resetFields()
  emit('closeDrawer')
}

const { submit, serverErrors, fieldChange, changeApiSubmit, loading } = useFormSubmit({
  formRef: formCreateLocation,
  apiSubmit: create,
  formState,
  callbackSuccess: actionSuccess
})

onUpdated(() => {
  if (props.isEdit) {
    Object.assign(formState, toRaw(props.locationEdit))
    changeApiSubmit(update)
  } else {
    Object.assign(formState, reactive<any>({ ...initialFormState }))
    changeApiSubmit(create)
  }
})

const rules: Record<string, Rule[]> = {
  Code: [
    { required: true, message: t('validate.code_required'), trigger: 'change' },
  ],
  Location: [
    { required: true, message: t('validate.name_required'), trigger: 'change' },
  ],
  Address: [
    {
      required: true,
      message: t('validate.address_required'),
      trigger: 'change',
    },
  ],
  country_id: [
    {
      required: true,
      message: t('validate.country_required'),
      trigger: 'change',
    },
  ],
  province_id: [
    {
      required: true,
      message: t('validate.province_required'),
      trigger: 'change',
    },
  ],
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

</script>
