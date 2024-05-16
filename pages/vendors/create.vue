<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_CREATE_VENDOR.value">
        <div class="flex justify-end">
          <a-button size="large" class="mr-3">
            {{ $t('button.cancel') }}
          </a-button>
          <a-button
            size="large"
            :loading="loading"
            type="primary"
            @click="submitCreateVendor"
            >{{ $t('button.save') }}</a-button
          >
        </div>
      </Breadcrumb>
    </div>
    <div class="container-layout__content">
      <a-tabs>
        <a-tab-pane key="1" tab="Thông tin chung">
          <a-form
            ref="formVendor"
            layout="vertical"
            :model="formState"
            :rules="rules"
          >
            <div class="grid grid-cols-4 gap-4">
              <a-form-item
                :label="$t('vendor.code')"
                name="customer_code"
                :validate-status="
                  serverErrors?.customer_code ? 'error' : undefined
                "
                :help="serverErrors?.customer_code || null"
              >
                <a-input
                  v-model:value="formState.customer_code"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('customer_code')"
                />
              </a-form-item>

              <a-form-item
                :label="$t('vendor.name')"
                name="name"
                :validate-status="serverErrors?.name ? 'error' : undefined"
                :help="serverErrors?.name || null"
              >
                <a-input
                  v-model:value="formState.name"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('customer_code')"
                />
              </a-form-item>

              <a-form-item
                :label="$t('common.short_name')"
                name="short_name"
                :validate-status="
                  serverErrors?.short_name ? 'error' : undefined
                "
                :help="serverErrors?.short_name || null"
              >
                <a-input
                  v-model:value="formState.short_name"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('short_name')"
                />
              </a-form-item>

              <a-form-item
                :label="$t('common.address')"
                name="address"
                :validate-status="serverErrors?.address ? 'error' : undefined"
                :help="serverErrors?.address || null"
              >
                <a-input
                  v-model:value="formState.address"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('address')"
                />
              </a-form-item>
              <SelectAddress
                v-model:countryId="formState.country_id"
                v-model:provinceId="formState.province_id"
                v-model:districtId="formState.district_id"
              />
              <a-form-item
                :label="$t('vendor.tax_code')"
                name="tax_code"
                :validate-status="serverErrors?.tax_code ? 'error' : undefined"
                :help="serverErrors?.tax_code || null"
              >
                <a-input
                  v-model:value="formState.tax_code"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('tax_code')"
                />
              </a-form-item>
              <a-form-item
                :label="$t('common.phone_number')"
                name="phone_number"
                :validate-status="
                  serverErrors?.phone_number ? 'error' : undefined
                "
                :help="serverErrors?.phone_number || null"
              >
                <a-input
                  v-model:value="formState.phone_number"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('phone_number')"
                />
              </a-form-item>
              <a-form-item
                label="Email"
                name="email"
                :validate-status="serverErrors?.email ? 'error' : undefined"
                :help="serverErrors?.email || null"
              >
                <a-input
                  v-model:value="formState.email"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('email')"
                />
              </a-form-item>
              <a-form-item
                label="Fax"
                name="fax"
                :validate-status="serverErrors?.fax ? 'error' : undefined"
                :help="serverErrors?.fax || null"
              >
                <a-input
                  v-model:value="formState.fax"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('fax')"
                />
              </a-form-item>
              <a-form-item
                :label="$t('vendor.payment_name')"
                name="payment_name"
                :validate-status="
                  serverErrors?.payment_name ? 'error' : undefined
                "
                :help="serverErrors?.payment_name || null"
              >
                <a-input
                  v-model:value="formState.payment_name"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('payment_name')"
                />
              </a-form-item>
              <a-form-item
                :label="$t('vendor.payment_address')"
                name="payment_address"
                :validate-status="
                  serverErrors?.payment_address ? 'error' : undefined
                "
                :help="serverErrors?.payment_address || null"
              >
                <a-input
                  v-model:value="formState.payment_address"
                  size="large"
                  :placeholder="$t('placeholder.please_enter')"
                  @change="fieldChange('payment_address')"
                />
              </a-form-item>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <a-form-item :label="`${$t('common.note')} 1`" name="note1">
                <a-textarea
                  v-model:value="formState.note_1"
                  :placeholder="$t('placeholder.please_enter')"
                  :rows="4"
                />
              </a-form-item>
              <a-form-item :label="`${$t('common.note')} 2`" name="note2">
                <a-textarea
                  v-model:value="formState.note_2"
                  :placeholder="$t('placeholder.please_enter')"
                  :rows="4"
                />
              </a-form-item>
            </div>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import SelectAddress from '~/components/common/addresses/SelectAddress.vue'
import { useFormSubmit } from '~/composables/useFormSubmit'
import { createVendor } from '~/api/vendors'

const title = useTitle()
const { t } = useI18n()

const formVendor = ref()

const formState = reactive({
  customer_code: '',
  name: '',
  short_name: '',
  country_id: null,
  province_id: null,
  district_id: null,
  address: '',
  phone_number: '',
  email: '',
  fax: '',
  tax_code: '',
  payment_name: '',
  payment_address: '',
  note_1: '',
  note_2: '',
})

const rules: Record<string, Rule[]> = {
  customer_code: [
    {
      required: true,
      message: t('validate.vendor_code_required'),
      trigger: 'blur',
    },
  ],
  province_id: [
    {
      required: true,
      message: t('validate.province_required'),
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: t('validate.vendor_name_required'),
      trigger: 'blur',
    },
  ],
  short_name: [
    {
      required: true,
      message: t('validate.short_name_required'),
      trigger: 'blur',
    },
  ],
  country_id: [
    {
      required: true,
      message: t('validate.country_required'),
      trigger: 'blur',
    },
  ],
  address: [
    {
      required: true,
      message: t('validate.address_required'),
      trigger: 'blur',
    },
  ],
  email: [{ type: 'email', message: t('validate.email_format') }],
}

const { submit, serverErrors, fieldChange, loading } = useFormSubmit({
  formRef: formVendor,
  apiSubmit: createVendor,
  formState,
  callbackSuccess: () => navigateTo('/vendors'),
})

const submitCreateVendor = async () => {
  try {
    await submit()
  } catch (e) {
    message.error(t('message.action_error'))
  }
}
</script>
