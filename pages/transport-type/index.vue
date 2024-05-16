<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_SETTING_TRANSPORT_TYPE.value">
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
      <div class="flex items-center mb-3">
        <span style="margin-left: 8px">
          {{ $t('common.row_selected', { row: state.selectedRowKeys.length }) }}
        </span>
        <a-button
          v-if="state.selectedRowKeys.length"
          class="ml-3"
          danger
          @click="openModalDelete"
          >{{ $t('button.delete') }}</a-button
        >
      </div>
      <a-table
        :row-selection="{
          selectedRowKeys: state.selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="transportTypeTableColumns"
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
              Search
            </a-button>
            <a-button
              size="small"
              style="width: 90px"
              @click="handleReset(clearFilters)"
            >
              Reset
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
              @click="editTransportType(record as IFormTransport)"
            />
          </template>
          <template v-if="column.dataIndex === 'note'">
            <span v-if="record.note">
              {{ record.note }}
            </span>
            <span v-else>--</span>
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

      <div>
        <DrawerTransportType ref="drawerTransportRef" @saved="savedSuccess" />

        <ModalDelete
          ref="refModalDelete"
          :target-name="$t('sidebar.transport')"
          :api-delete="deleteTransportTypes"
        />
      </div>
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
import { useI18n } from 'vue-i18n'
import { listTransportTypes, deleteTransportType } from '~/api/transportType'
import { createColumns } from '~/utils/tableColumns/transportTypeTableColumns'
import { useTablePagination } from '~/composables/useTablePagination'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import DrawerTransportType from '~/components/transport-type/DrawerTransportType.vue'
import type { IFormTransport } from '@/interfaces/transport'
import ModalDelete from '~/components/common/modals/ModalDelete.vue'

definePageMeta({
  middleware: ['access-control'],
  // permissions: ['user.view'],
})

const title = useTitle()

type Key = string | number

const { t } = useI18n()

const searchInput = ref()
const transportTypeTableColumns = createColumns(searchInput)
const drawerTransportRef = ref<InstanceType<typeof DrawerTransportType>>()
const refModalDelete = ref<InstanceType<typeof ModalDelete>>()

const { dataSource, pagination, loading, handleTableChange, reload } =
  useTablePagination({
    apiGetList: listTransportTypes,
    columns: transportTypeTableColumns,
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

const handleCreate = () => {
  drawerTransportRef.value?.showDrawer()
}

const editTransportType = (record: IFormTransport) => {
  drawerTransportRef.value?.showDrawer(record)
}

const savedSuccess = () => {
  reload()
  drawerTransportRef.value?.cancel()
  message.success(t('message.update_list_transport_type_success'))
}

const openModalDelete = () => {
  refModalDelete.value?.open()
}

const deleteTransportTypes = async () => {
  try {
    await deleteTransportType({
      transport_type_ids: state.selectedRowKeys as number[],
    })
    message.success(t('message.delete_transport_type_success'))
    reload()
    state.selectedRowKeys = []
  } catch (error) {
    message.error(t('message.delete_transport_type_error'))
  }
}
</script>
