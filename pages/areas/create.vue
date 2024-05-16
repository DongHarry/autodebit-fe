<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <common-layouts-breadcrumb :paths="title.BREADCRUMB_CREATE_AREA.value">
        <div class="flex justify-end">
          <a-button
              size="large"
              class="mr-3"
              @click="navigateTo('/areas/create')"
          >{{ $t('button.cancel') }}</a-button
          >
          <a-button
              size="large"
              type="primary"
              @click="navigateTo('/areas/create')"
          >{{ $t('button.add_new') }}</a-button
          >
        </div>
      </common-layouts-breadcrumb>
    </div>
    <a-form
        ref="formLogin"
        layout="vertical"
        :model="formState"
        :rules="rules"
    >
      <div class="container-layout__content">
        <div class="grid grid-cols-2 gap-4">
          <a-form-item
              :label="$t('area.code', '')"
              name="code"
          >
            <a-input
                v-model:value="formState.code"
                size="large"
                :placeholder="$t('area.code', '')"
            />
          </a-form-item>

          <a-form-item
              :label="$t('area.name', '')"
              name="name"
          >
            <a-input
                v-model:value="formState.name"
                size="large"
                :placeholder="$t('area.name')"
            />
          </a-form-item>
        </div>
      </div>
    </a-form>
  </div>

  

</template>


<script lang="ts" setup>
import {
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons-vue'
import _map from 'lodash/map'
import _toString from 'lodash/toString'
import { list, remove } from '~/api/carriers'
import { createColumns } from '~/utils/tableColumns/areaTableColumns'
import { formatDateTime } from '~/utils/datetime'
import { useTablePagination } from '~/composables/useTablePagination'
import DrawerCarrier from '~/components/carriers/DrawerCarrier.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

definePageMeta({
  middleware: ['access-control'],
})

const title = useTitle()

type Key = string | number

const drawerCarrierRef = ref<InstanceType<typeof DrawerCarrier>>()

const searchInput = ref()
const areaTableColumns = createColumns(searchInput)

const { dataSource, pagination, loading, handleTableChange, reload } =
    useTablePagination({
      apiGetList: list,
      columns: areaTableColumns,
    })

const state = reactive<{
  searchText: string
  searchedColumn: string
  selectedRowKeys: Key[]
}>({
  searchText: '',
  searchedColumn: '',
  selectedRowKeys: [],
})

const formState = ref({
  code: '',
  name: ''
})

const handleSearch = (
    selectedKeys: string[],
    confirm: Function,
    dataIndex: string,
) => {
  confirm()
  state.searchText = selectedKeys[0]
  state.searchedColumn = dataIndex
}

const handleReset = (clearFilters: Function) => {
  clearFilters({ confirm: true })
  state.searchText = ''
}

const onSelectChange = (selectedRowKeys: Key[]) => {
  state.selectedRowKeys = selectedRowKeys
}

const rules: any = computed( () => {
  return {
    code: [
      {
        required: true,
        message: t('validate.area.code_required'),
        trigger: 'change',
      },
    ],
    name: [
      {
        required: true,
        message: t('validate.area.name_required'),
        trigger: 'change',
      },
    ],
  }
})
</script>

<style scoped>
.container-layout__content {
  min-height: 60px;
}
</style>
