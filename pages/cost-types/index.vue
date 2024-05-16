<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_SETTING_COST_TYPE.value">
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
        :columns="costTypeTableColumns"
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
    <DrawerCostType
      ref="refDrawerCostGroup"
      :cost-groups="costGroups"
      @saved="savedCostGroup"
    />
    <ModalDelete
      ref="refModalDelete"
      :target-name="$t('cost_group.cost_group')"
      :api-delete="deleteCostTypes"
    >
    </ModalDelete>
  </div>
</template>

<script setup lang="ts">
import { UploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { TableProps } from 'ant-design-vue'
import _map from 'lodash/map'
import _get from 'lodash/get'
import { useI18n } from 'vue-i18n'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import DrawerCostType from '~/components/cost-types/DrawerCostType.vue'
import ModalDelete from '~/components/common/modals/ModalDelete.vue'
import { createColumns } from '~/utils/tableColumns/costTypeTableColumns'
import { listCostType, deleteCostType } from '~/api/costTypes'
import { masterData } from '~/api/masterData'

const title = useTitle()
const { t } = useI18n()
const searchInput = ref()
const refDrawerCostGroup = ref()
const refModalDelete = ref()

type Key = string | number

const loadCostgroup = async () => {
  const resources = { 'resources[cost_groups]': '' }
  const response = await masterData(resources)
  return _get(response, 'data.data.cost_groups', [])
}

const { data } = await useAsyncData('costGroups', () => loadCostgroup())

const costGroups = data.value

const costGroupFilter = computed(() => {
  return _map(costGroups, (costGroup) => {
    return {
      text: costGroup.name,
      value: costGroup.id,
    }
  })
})

const costTypeTableColumns = createColumns(searchInput, costGroupFilter.value)

const { dataSource, pagination, loading, handleTableChange, reload } =
  useTablePagination({
    apiGetList: listCostType,
    columns: costTypeTableColumns,
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
  refModalDelete.value.open(toRaw(stateSelect.selectedRowKeys))
}

const deleted = () => {
  stateSelect.selectedRowKeys = []
  reload()
}

const deleteCostTypes = async () => {
  try {
    await deleteCostType({
      cost_type_ids: toRaw(stateSelect.selectedRowKeys) as number[],
    })
    message.success(t('message.delete_cost_type_success'))
    reload()
    stateSelect.selectedRowKeys = []
  } catch (error) {
    message.error(t('message.delete_cost_type_error'))
  }
}
</script>
