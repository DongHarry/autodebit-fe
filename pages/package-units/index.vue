<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_SETTING_PACKAGE_UNIT.value">
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
        :columns="packageUnitTableColumns"
        :row-key="(record) => record.ID"
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
              @click="editPackageUnit(record as IFormPackageUnit)"
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
        <DrawerPackageUnit ref="drawerPackageUnitRef" @saved="savedSuccess" />

        <ModalDelete
          ref="refModalDelete"
          :target-name="$t('sidebar.package_unit')"
          :api-delete="deletePackageUnits"
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
import { listPackageUnit, deletePackageUnit } from '~/api/packageUnits'
import { createColumns } from '~/utils/tableColumns/packageUnitTableColumns'
import { useTablePagination } from '~/composables/useTablePagination'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import DrawerPackageUnit from '~/components/package-unit/DrawerPackageUnit.vue'
import type { IFormPackageUnit } from '@/interfaces/packageUnit'
import ModalDelete from '~/components/common/modals/ModalDelete.vue'

definePageMeta({
  middleware: ['access-control'],
  // permissions: ['user.view'],
})

type Key = string | number

const title = useTitle()
const { t } = useI18n()

const searchInput = ref()
const packageUnitTableColumns = createColumns(searchInput)
const drawerPackageUnitRef = ref<InstanceType<typeof DrawerPackageUnit>>()
const refModalDelete = ref<InstanceType<typeof ModalDelete>>()

const { dataSource, pagination, loading, handleTableChange, reload } =
  useTablePagination({
    apiGetList: listPackageUnit,
    columns: packageUnitTableColumns,
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
  drawerPackageUnitRef.value?.showDrawer()
}

const editPackageUnit = (record: IFormPackageUnit) => {
  drawerPackageUnitRef.value?.showDrawer(record)
}

const savedSuccess = () => {
  reload()
  drawerPackageUnitRef.value?.cancel()
  message.success(t('message.update_list_service_type_success'))
}

const openModalDelete = () => {
  refModalDelete.value?.open()
}

const deletePackageUnits = async () => {
  try {
    await deletePackageUnit({
      package_unit_ids: state.selectedRowKeys as number[],
    })
    message.success(t('message.delete_service_type_success'))
    reload()
    state.selectedRowKeys = []
  } catch (error) {
    message.error(t('message.delete_service_type_error'))
  }
}
</script>
