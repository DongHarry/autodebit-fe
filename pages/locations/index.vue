<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_SETTING_LOCATIONS.value">
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
        <a-popconfirm
          v-if="stateSelect.selectedRowKeys.length"
          :title="$t('confirm.delete')"
          :ok-text="$t('button.delete')"
          :cancel-text="$t('button.cancel')"
          @confirm="handleDelete"
        >
          <a-button class="ml-3" danger>{{ $t('button.delete') }}</a-button>
        </a-popconfirm>
      </div>
      <a-table
        :columns="locationsTableColumns"
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
  <div>
    <DrawerCreate
      ref="drawerCreateRef"
      :open="open"
      :is-edit="isEdit"
      :location-edit="locationEdit"
      @close-drawer="closeDrawer"
      @reload="reload"
    />
  </div>
</template>

<script setup lang="ts">
import { UploadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import { createColumns } from '~/utils/tableColumns/locationTableColumns'
import { listLocation, remove } from '~/api/locations'
import DrawerCreate from '~/components/locations/DrawerCreate.vue'

const title = useTitle()

const open = ref<boolean>(false)

const isEdit = ref<boolean>(false)
const locationEdit = ref({})

const handleCreate = () => {
  isEdit.value = false
  open.value = true
  locationEdit.value = {}
}

const closeDrawer = () => {
  open.value = false
}

const searchInput = ref()
const locationsTableColumns = createColumns(searchInput)
type Key = string | number

const { dataSource, pagination, loading, handleTableChange, reload } =
  useTablePagination({
    apiGetList: listLocation,
    columns: locationsTableColumns,
  })

const stateSelect = reactive<{
  selectedRowKeys: Key[]
  loading: boolean
}>({
  selectedRowKeys: [],
  loading: false,
})

const hasSelected = computed(() => stateSelect.selectedRowKeys.length > 0)
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

const rowSelection = {
  onChange: (selectedRowKeys: Key[]) => {
    stateSelect.selectedRowKeys = selectedRowKeys
  },
}

const openEditDrawer = (record: any) => {
  open.value = true
  isEdit.value = true
  locationEdit.value = record
}

const handleDelete = async () => {
  try {
    const response = await remove({ data: toRaw(stateSelect.selectedRowKeys) })
    if (response.data.data) {
      reload()
    }
  } catch (error) {}
}
</script>
