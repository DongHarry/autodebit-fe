<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <common-layouts-breadcrumb :paths="title.BREADCRUMB_VIEW_ROUTE.value">
        <div class="flex justify-end">
          <a-button
              size="large"
              type="primary"
              :icon="h(PlusOutlined)"
              @click="openDrawer"
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
          :columns="routeTableColumns"
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
                @click="openEditDrawer(record)"
            />
          </template>
          <template v-if="column.dataIndex === 'created_at'">
            {{ formatDateTime(text) }}
          </template>
          <template v-else-if="column.key === 'type'">
            {{record.IsArea ? $t(routeTypeConfig.area_type.label) : $t(routeTypeConfig.location_type.label)}}
          </template>
          <template v-else-if="column.key === 'IsUse'">
            <a-tag v-if="record.IsUse" color="green">{{$t('route.using')}}</a-tag>
            <a-tag v-else color="red">{{$t('route.not_use')}}</a-tag>
          </template>
          <slot
              name="bodyCell"
              :text="text"
              :column="column"
              :record="record"
          ></slot>
        </template>
      </a-table>
    </div>
    <routes-drawer ref="drawerRouteRef" @saved="reload" />
  </div>
</template>

<script lang="ts" setup>
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { listRoutes, removeRoute } from '~/api/routes'
import { createColumns } from '~/utils/tableColumns/routeTableColumns'
import { ROUTE_TYPES } from '~/constants/route'

definePageMeta({
  middleware: ['access-control'],
})

const title = useTitle()
const routeTypeConfig = ROUTE_TYPES

type Key = string | number

const drawerRouteRef = ref()

const searchInput = ref()
const routeTableColumns = createColumns(searchInput)

const { dataSource, pagination, loading, handleTableChange, reload } =
    useTablePagination({
      apiGetList: listRoutes,
      columns: routeTableColumns,
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

const openDrawer = () => {
  drawerRouteRef.value.showDrawer()
}

const openEditDrawer = (route: Object) => {
  drawerRouteRef.value.showDrawer(route)
}

const handleDelete = async () => {
  try {
    await removeRoute({ data: toRaw(state.selectedRowKeys) })
    reload()
  } catch (error) {
    console.error(error)
  }
}
</script>
