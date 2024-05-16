<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_SETTING_COST_GROUP.value">
        <div class="flex justify-end">
          <a-button size="large" class="mr-3" :icon="h(UploadOutlined)">
            {{ $t('button.upload') }}
          </a-button>
          <a-button
            size="large"
            type="primary"
            :icon="h(PlusOutlined)"
            @click="openDrawer"
            >{{ $t('button.add_new') }}</a-button
          >
        </div>
      </Breadcrumb>
    </div>
    <div class="container-layout__content">
      <div class="flex items-center mb-3">
        <span style="margin-left: 8px">
          {{
            $t('common.row_selected', {
              row: stateSelect.selectedRowKeys.length,
            })
          }}
        </span>
        <a-button
          v-if="stateSelect.selectedRowKeys.length"
          class="ml-3"
          danger
          @click="openModalDelete"
          >{{ $t('button.delete') }}</a-button
        >
      </div>
      <a-table
        :columns="costGroupTableColumns"
        :row-key="(record) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        :row-selection="rowSelection"
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
            <EditOutlined
              class="cursor-pointer text-sky-800"
              @click="openEditDrawer(record)"
            />
          </template>
          <template v-if="column.dataIndex === 'level'">
            <p v-if="record.level == '1'">{{ $t('company.parent_company') }}</p>
            <p v-else>{{ $t('company.branch') }}</p>
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
    <DrawerCostGroup ref="refDrawerCostGroup" @saved="savedCostGroup" />
    <ModalDelete
      ref="refModalDelete"
      :target-name="$t('cost_group.cost_group')"
      :api-delete="deleteCostGroups"
    >
    </ModalDelete>
  </div>
</template>

<script setup lang="ts">
import { UploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { TableProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import DrawerCostGroup from '~/components/cost-groups/DrawerCostGroup.vue'
import ModalDelete from '~/components/common/modals/ModalDelete.vue'
import { createColumns } from '~/utils/tableColumns/costGroupTableColumns'
import { listCostGroup, deleteCostGroup } from '~/api/costGroups'

const title = useTitle()
const { t } = useI18n()

const searchInput = ref()
const refDrawerCostGroup = ref()
const refModalDelete = ref()
const costGroupTableColumns = createColumns(searchInput)
type Key = string | number

const { dataSource, pagination, loading, handleTableChange, reload } =
  useTablePagination({
    apiGetList: listCostGroup,
    columns: costGroupTableColumns,
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

const openDrawer = () => {
  refDrawerCostGroup.value.showDrawer()
}

const openEditDrawer = (company: Object) => {
  refDrawerCostGroup.value.showDrawer(company)
}

const savedCostGroup = () => {
  reload()
  refDrawerCostGroup.value.closeDrawer()
}

const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: Key[]) => {
    stateSelect.selectedRowKeys = selectedRowKeys
  },
}

const openModalDelete = () => {
  refModalDelete.value.open()
}

const deleted = () => {
  stateSelect.selectedRowKeys = []
  reload()
}

const deleteCostGroups = async () => {
  try {
    await deleteCostGroup({
      cost_group_ids: toRaw(stateSelect.selectedRowKeys) as number[],
    })
    reload()
    stateSelect.selectedRowKeys = []
    message.success(t('message.delete_cost_group_success'))
  } catch (error) {
    message.error(t('message.delete_cost_group_error'))
  }
}
</script>
