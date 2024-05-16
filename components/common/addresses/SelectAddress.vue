<template>
  <a-form-item
    :label="$t('common.country')"
    name="CountryID"
    :rules="props.countryRules"
  >
    <a-select
      v-model:value="countryId"
      show-search
      size="large"
      :filter-option="filterOption"
      :placeholder="$t('placeholder.please_select')"
    >
      <a-select-option
        v-for="country in optionCountries"
        :key="country.ID"
        :value="country.ID"
      >
        {{ country.CountryName }}
      </a-select-option>
    </a-select>
  </a-form-item>
  <a-form-item
    :label="$t('common.province')"
    name="ProvinceID"
    :rules="props.provinceRules"
  >
    <a-select
      v-model:value="provinceId"
      size="large"
      :placeholder="$t('placeholder.please_select')"
    >
      <a-select-option
        v-for="province in optionProvinces"
        :key="province.ID"
        :value="province.ID"
      >
        {{ province.ProvinceName }}
      </a-select-option>
    </a-select>
  </a-form-item>
  <a-form-item :hidden="isShowDistrict" :label="$t('common.district')" name="district_id">
    <a-select
      v-model:value="districtId"
      size="large"
      :placeholder="$t('placeholder.please_select')"
    >
      <a-select-option
        v-for="district in optionDistricts"
        :key="district.ID"
        :value="district.ID"
      >
        {{ district.DistrictName }}
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script setup lang="ts">
import _get from 'lodash/get'
import { masterData } from '@/api/masterData'
import type { ICountry, IProvince, IDistrict } from '@/interfaces/addresses'
import type { Rule } from 'ant-design-vue/es/form'

const countryId = defineModel<any>('countryId')
const provinceId = defineModel<any>('provinceId')
const districtId = defineModel<any>('districtId')

const props = defineProps({
  countryRules: {
    default: [],
    type: Array as PropType<any[]>,
  },
  provinceRules: {
    default: [],
    type: Array as PropType<any[]>,
  },
  isShowDistrict: {
    default: false,
    type: Boolean
  }
})

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().includes(input.toLowerCase())
}

const resourcesMasterData = ref<any>({})
const optionCountries = ref<any>([])
const optionProvinces = ref<any>([])
const optionDistricts = ref<any>([])
const countryLoaded = ref(false)

const loadCountries = () => {
  if (countryLoaded.value === false) {
    resourcesMasterData.value['resources[countries]'] = ''
  }
}

const loadProvices = () => {
  if (countryId.value) {
    let filterProvinces = {}
    filterProvinces = JSON.stringify({
      CountryID: countryId.value,
    })

    resourcesMasterData.value['resources[provinces]'] = filterProvinces
  }
}

const loadDistricts = () => {
  if (provinceId.value) {
    let filterDistricts = {}
    filterDistricts = JSON.stringify({
      ProvinceID: provinceId.value,
    })

    resourcesMasterData.value['resources[districts]'] = filterDistricts
  }
}

const loadAll = async () => {
  loadCountries()
  loadProvices()
  loadDistricts()
  try {
    const response = await masterData(resourcesMasterData.value)

    if (!countryLoaded.value) {
      optionCountries.value = _get(response, 'data.data.countries', [])
      countryLoaded.value = true
    }
    optionProvinces.value = _get(response, 'data.data.provinces', [])
    optionDistricts.value = _get(response, 'data.data.districts', [])

    resourcesMasterData.value = {}
  } catch (e) {}
}

watch(countryId, (newCountry, oldCountry) => {
  if (!provinceId.value) {
    loadAll()
  }

  if (!oldCountry && newCountry) {
    return
  }

  provinceId.value = null
  districtId.value = null
})

watch(provinceId, (newProvince, oldProvince) => {
  loadAll()

  if (!oldProvince && newProvince) {
    return
  }

  districtId.value = null
})

useAsyncData('loadMasterData', loadAll)
</script>
