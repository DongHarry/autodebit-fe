<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <common-layouts-breadcrumb :paths="title.BREADCRUMB_VIEW_AREA.value">
        <div class="flex justify-end">
          <a-button
              size="large"
              type="primary"
              :icon="h(PlusOutlined)"
              @click="navigateTo('/areas/create')"
          >{{ $t('button.add_new') }}</a-button
          >
        </div>
      </common-layouts-breadcrumb>
    </div>
    <div class="container-layout__content">
      <div class="flex items-center mb-3">
        <span style="margin-left: 8px">
          {{ $t('common.row_selected', { row: state.selectedRowKeys.length }) }}
        </span>
        <a-popconfirm
            v-if="state.selectedRowKeys.length"
            :title="$t('confirm.delete')"
            :ok-text="$t('button.delete')"
            :cancel-text="$t('button.cancel')"
            @confirm="handleDelete"
        >
          <a-button class="ml-3" danger>{{ $t('button.delete') }}</a-button>
        </a-popconfirm>
      </div>
      <a-table
          :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
        }"
          :columns="areaTableColumns"
          :row-key="(record) => record.id"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
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
            <edit-outlined
                class="cursor-pointer"
                @click="editCarrier(record)"
            />
          </template>
          <template v-if="column.dataIndex === 'created_at'">
            {{ formatDateTime(text) }}
          </template>
          <span
              v-if="state.searchText && state.searchedColumn === column.dataIndex"
          >
            <template
                v-for="(fragment, i) in text
                .toString()
                .split(
                  new RegExp(
                    `(?<=${state.searchText})|(?=${state.searchText})`,
                    'i',
                  ),
                )"
            >
              <mark
                  v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                  :key="i"
                  class="highlight"
              >
                {{ fragment }}
              </mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <slot
              name="bodyCell"
              :text="text"
              :column="column"
              :record="record"
          ></slot>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  SearchOutlined,
  FilterOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import _map from 'lodash/map'
import _toString from 'lodash/toString'
import { list, remove } from '~/api/carriers'
import { createColumns } from '~/utils/tableColumns/areaTableColumns'
import { useTablePagination } from '~/composables/useTablePagination'
import DrawerCarrier from '~/components/carriers/DrawerCarrier.vue'

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

const editCarrier = (record: Object) => {
  console.log(record)

  
}

const handleDelete = () => {
  console.log('handle delete')
  
}
</script>
