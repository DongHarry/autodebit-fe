<template>
  <a-form-item :label="$t('location.address_type')" name="type">
    <a-select
      v-model:value="type_id"
      :placeholder="$t('placeholder.please_select')"
    >
      <a-select-option v-for="type in types" :value="type.id">{{
        type.name
      }}</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script setup lang="ts">
import _get from 'lodash/get'
import { masterData } from '@/api/masterData'

const type_id = defineModel<any>('type_id')
const types = ref<any[]>([])

useAsyncData('loadMasterData', async () => {
  try {
    const params: any = {}
    params['resources[address_types]'] = ''

    const response = await masterData(params)
    types.value = _get(response, 'data.data.address_types')
  } catch (e) {}
})
</script>
