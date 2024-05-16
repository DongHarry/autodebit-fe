<template>
  <div class="container-layout">
    <div class="container-layout__header">
      <Breadcrumb :paths="title.BREADCRUMB_SETTING_USER.value">
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
        :columns="userTableColumns"
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
          <template v-if="column.dataIndex === 'status'">
            <a-tag v-if="record.status == '0'" color="error">{{
              $t('user.deactive')
            }}</a-tag>
            <a-tag v-else color="success">{{ $t('user.active') }}</a-tag>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <div class="items-center flex gap-x-3">
              <a-tooltip>
                <template #title>{{ $t('button.edit') }}</template>
                <edit-outlined
                  class="cursor-pointer"
                  @click="editUser(record as IUser)"
                />
              </a-tooltip>

              <a-tooltip>
                <template #title>{{
                  record.status === STATUS.ACTIVE
                    ? $t('user.block')
                    : $t('user.unblock')
                }}</template>
                <LockOutlined
                  v-if="record.status === STATUS.ACTIVE"
                  class="cursor-pointer"
                  @click="handleBlockUser(record.id)"
                />

                <UnlockOutlined
                  v-else
                  class="cursor-pointer"
                  @click="handleUnblockUser(record.id)"
                />
              </a-tooltip>
            </div>
          </template>
          <template v-if="column.dataIndex === 'created_at'">
            {{ formatDateTime(text) }}
          </template>
          <template v-if="column.dataIndex === 'role'">
            {{ loadRoles(record.roles) }}
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
        <DrawerUser ref="drawerUserRef" :roles="roles" @saved="savedSuccess" />

        <ModalDelete
          ref="refModalDelete"
          :target-name="$t('sidebar.user')"
          :api-delete="deleteUsers"
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
import _map from 'lodash/map'
import _toString from 'lodash/toString'
import { useI18n } from 'vue-i18n'
import Breadcrumb from '~/components/common/layouts/Breadcrumb.vue'
import DrawerUser from '~/components/users/DrawerUser.vue'
import { listUser, deleteUser, blockUser, unblockUser } from '~/api/users'
import { listRoles } from '~/api/roles'
import { createColumns } from '~/utils/tableColumns/userTableColumns'
import { formatDateTime } from '~/utils/datetime'
import { useTablePagination } from '~/composables/useTablePagination' 
import type { IRole } from '~/interfaces/role'
import type { IUser } from '~/interfaces/user'
import { STATUS } from '~/constants/user'
import ModalDelete from '~/components/common/modals/ModalDelete.vue'

definePageMeta({
  middleware: ['access-control'],
  // permissions: ['user.view'],
})

const { t } = useI18n()
const title = useTitle()

type Key = string | number

const { data } = await useAsyncData('roles', () => listRoles())

const roles = data.value?.data.data.data

const rolesData = computed(() => {
  return _map(roles, (role) => {
    return {
      text: role.name,
      value: role.id,
    }
  })
})

const searchInput = ref()
const refModalDelete = ref<InstanceType<typeof ModalDelete>>()
const userTableColumns = createColumns(searchInput, rolesData.value)
const drawerUserRef = ref<InstanceType<typeof DrawerUser>>()

const { dataSource, pagination, loading, handleTableChange, reload } =
  useTablePagination({
    apiGetList: listUser,
    columns: userTableColumns,
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

const editUser = (record: IUser) => {
  drawerUserRef.value?.showDrawer(record)
}

const handleCreate = () => {
  drawerUserRef.value?.showDrawer()
}

const savedSuccess = () => {
  reload()
  drawerUserRef.value?.cancel()
  message.success(t('message.update_list_user_success'))
}

const loadRoles = (roles: IRole[]) => {
  return _toString(_map(roles, 'name'))
}

const deleteUsers = async () => {
  try {
    await deleteUser({ user_ids: toRaw(state.selectedRowKeys) as number[] })
    reload()
    state.selectedRowKeys = []
    message.success(t('message.delete_user_success'))
  } catch (error) {
    message.error(t('message.delete_user_error'))
  }
}

const openModalDelete = () => {
  refModalDelete.value?.open()
}

const handleBlockUser = async (id: number) => {
  try {
    await blockUser(id)
    reload()
    message.success(t('message.block_user_success'))
  } catch (error) {
    message.error(t('message.block_user_error'))
  }
}

const handleUnblockUser = async (id: number) => {
  try {
    await unblockUser(id)
    reload()
    message.success(t('message.unblock_user_success'))
    state.selectedRowKeys = []
  } catch (error) {
    message.error(t('message.unblock_user_error'))
  }
}
</script>
