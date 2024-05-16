<template>
    <div class="container-layout">
      <div class="container-layout__header">
        <Breadcrumb :paths="title.BREADCRUMB_SETTING_COUNTRY.value">
          <div class="flex justify-end">
            <a-button size="large" class="mr-3" :icon="h(UploadOutlined)">
              {{ $t('button.upload') }}
            </a-button>
            <a-button
              size="large"
              type="primary"
              :icon="h(PlusOutlined)"
              @click="handleCreate"
              >{{ $t('button.add_new') }}</a-button
            >
          </div>
        </Breadcrumb>
      </div>
      <div class="container-layout__content">
        <div class="flex item-center mb-3">
          <span style="margin-left: 8px">
            {{
              $t('common.row_selected', {
                row: stateSelect.selectedRowKeys.length,
              })
            }}
          </span>
        </div>
        <a-table
          :columns="countryTableColumns"
          :row-key="(record) => record.id"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          :row-selection="rowSelection"
          :scroll="{ x: 1500 }"
          @change="handleTableChange"
        >
          <template
            #customFilterDropdown="{
              setSelectedKeys,
              selectedKeys,
              confirm,
              clearFilters,
              column,
            }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`Search ${column.title}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="
                  (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
                "
                @press-enter="
                  handleSearch(selectedKeys, confirm, column.dataIndex)
                "
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                {{ $t('button.search') }}
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="handleReset(clearFilters)"
              >
                {{ $t('button.reset') }}
              </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered, column }">
            <filter-outlined
              v-if="column.filters"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <search-outlined
              v-else
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </template>
          <template #bodyCell="{ text, column, record }">
            <template v-if="column.dataIndex === 'action'">
              <div class="flex">
              </div>
            </template>
            <slot
              name="bodyCell"
              :text="text"
              :column="column"
              :record="record"
            ></slot>
          </template>
        </a-table>

        <div>
        <DrawerCountry ref="drawerCountryRef" @reload="reload" />

      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { UploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
  import type { TableProps } from 'ant-design-vue'
  import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
  import { createColumns } from '~/utils/tableColumns/countryTableColumns'
  import { list } from '~/api/countries'
  import DrawerCountry from '~/components/countries/DrawerCountry.vue'
  
  const title = useTitle()
  
  const searchInput = ref()
  const countryTableColumns = createColumns(searchInput)
  const drawerCountryRef = ref<InstanceType<typeof DrawerCountry>>()
  type Key = string | number
  
  const { dataSource, pagination, loading, reload,handleTableChange } =
    useTablePagination({
      apiGetList: list,
      columns: countryTableColumns,
    })
  
  const stateSelect = reactive<{
    selectedRowKeys: Key[]
    loading: boolean
  }>({
    selectedRowKeys: [],
    loading: false,
  })
  
  const state = reactive({
    searchText: '',
    searchedColumn: '',
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
  
  const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: Key[]) => {
      stateSelect.selectedRowKeys = selectedRowKeys
    },
  }

const handleCreate = () => {
  drawerCountryRef.value?.showDrawer()
}
  </script>
  