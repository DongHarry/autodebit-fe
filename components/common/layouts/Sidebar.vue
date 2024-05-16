<template>
  <a-layout-sider v-model:collapsed="isCollapsed" collapsible>
    <div class="logo">
      <img src="~/assets/img/logo.png" alt="Logo" />
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      class="sidebar"
    >
      <a-menu-item-group key="overview">
        <template #title>{{ $t('sidebar.overview') }}</template>
        <a-menu-item key="dashboard">
          <template #icon>
            <img
              src="~/assets/img/icons/dashboard.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>{{ $t('sidebar.dashboard') }}</span>
        </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="management">
        <template #title>{{ $t('sidebar.manage') }}</template>
        <a-menu-item key="order">
          <template #icon>
            <img
              src="~/assets/img/icons/order.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>{{ $t('sidebar.order') }}</span>
        </a-menu-item>
        <a-menu-item key="customer">
          <template #icon>
            <img
              src="~/assets/img/icons/users.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>{{ $t('sidebar.customer') }}</span>
        </a-menu-item>
        <a-menu-item key="contract">
          <template #icon>
            <img
              src="~/assets/img/icons/folder.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>{{ $t('sidebar.customer_contract') }}</span>
        </a-menu-item>
        <a-menu-item key="vendor" @click="gotoPage('vendors')">
          <template #icon>
            <img
              src="~/assets/img/icons/group-user.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>Vendor</span>
        </a-menu-item>
        <a-menu-item key="customer-vendor">
          <template #icon>
            <img
              src="~/assets/img/icons/folder-user-group.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>{{ $t('sidebar.vendor_contract') }}</span>
        </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="report">
        <template #title>{{ $t('sidebar.report') }}</template>
        <a-menu-item key="auto-debit">
          <template #icon>
            <img
              src="~/assets/img/icons/folders-select.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>Auto debit</span>
        </a-menu-item>
        <a-sub-menu key="transport" :title="$t('sidebar.transport')">
          <template #icon>
            <img
              src="~/assets/img/icons/transport.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>

          <template #title>{{ $t('sidebar.transport') }}</template>
        </a-sub-menu>
      </a-menu-item-group>

      <a-menu-item-group key="setting">
        <template #title>{{ $t('sidebar.setting') }}</template>
        <a-sub-menu key="user" :title="$t('sidebar.user')">
          <template #icon>
            <img
              src="~/assets/img/icons/profile.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>

          <template #title>{{ $t('sidebar.user') }}</template>

          <a-menu-item key="role">{{ $t('sidebar.role') }}</a-menu-item>
          <a-menu-item key="company" @click="gotoPage('companies')">{{
            $t('sidebar.company')
          }}</a-menu-item>
          <a-menu-item key="users" @click="gotoPage('users')">{{
            $t('sidebar.user')
          }}</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="road">
          <template #icon>
            <img
              src="~/assets/img/icons/route-direction-pin.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>

          <template #title>{{ $t('sidebar.route') }}</template>
          <a-menu-item key="locations" @click="gotoPage('locations')">{{
            $t('sidebar.location_list')
          }}</a-menu-item>
          <a-menu-item key="carriers" @click="gotoPage('carriers')">{{
              $t('sidebar.carriers')
            }}</a-menu-item>
          <a-menu-item key="areas" @click="gotoPage('areas')">{{
            $t('sidebar.area_list')
          }}</a-menu-item>
          <a-menu-item key="routes" @click="gotoPage('routes')">{{
              $t('sidebar.route')
            }}</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="category">
          <template #icon>
            <img
              src="~/assets/img/icons/checklist.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>

          <template #title>{{ $t('sidebar.category') }}</template>
          <a-menu-item key="service-type" @click="gotoPage('service-type')">
            {{ $t('sidebar.service_type') }}
          </a-menu-item>

          <a-menu-item key="cost-group" @click="gotoPage('cost-groups')">
            {{ $t('sidebar.cost_group') }}
          </a-menu-item>
          <a-menu-item key="cost-type" @click="gotoPage('cost-types')">
            {{ $t('sidebar.cost_type') }}
          </a-menu-item>
          <a-menu-item key="transport-type" @click="gotoPage('transport-type')">
            {{ $t('sidebar.transport_type') }}
          </a-menu-item>
          <a-menu-item key="containers" @click="gotoPage('containers')">
            {{ $t('sidebar.container_type') }}
          </a-menu-item>
          <a-menu-item key="package-unit" @click="gotoPage('package-units')">
            {{ $t('sidebar.package_unit') }}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="system">
          <template #icon>
            <img
              src="~/assets/img/icons/system.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>
          <span>{{ $t('sidebar.system') }}</span>
        </a-menu-item>
        <a-sub-menu key="other">
          <template #icon>
            <img
              src="~/assets/img/icons/round.svg"
              alt="dashboard"
              class="sidebar__icon"
            />
          </template>

          <template #title>{{ $t('sidebar.other') }}</template>
          <a-menu-item key="countries" @click="gotoPage('countries')">{{
            $t('sidebar.countries')
          }}</a-menu-item>
          <a-menu-item key="provinces" @click="gotoPage('provinces')">{{
            $t('sidebar.provinces')
          }}</a-menu-item>
          <a-menu-item key="districts" @click="gotoPage('districts')">{{
            $t('sidebar.districts')
          }}</a-menu-item>
        </a-sub-menu>
      </a-menu-item-group>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
const isCollapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['dashboard'])

const gotoPage = (route: string) => {
  navigateTo(`/${route}`)
}
</script>

<style lang="scss">
.ant-layout-sider {
  .ant-layout-sider-children {
    .logo {
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.ant-layout-sider:not(.ant-layout-sider-collapsed) {
  flex: 0 0 250px !important;
  max-width: 250px !important;
  min-width: 250px !important;
  width: 250px !important;

  .ant-layout-sider-trigger {
    width: 250px !important;
  }
}

.sidebar {
  .ant-menu-item-group {
    .ant-menu-item-group-title {
      font-weight: 700;
      font-size: 14px;
      color: #f6fafe !important;
      line-height: 22px;
      text-transform: uppercase;
    }

    .ant-menu-item-group-list {
      .ant-menu-item.ant-menu-item-selected {
        img {
          filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(3deg)
            brightness(100%) contrast(104%);
        }
      }
    }
  }

  &__icon {
    width: 14px;
    height: 14px;

    filter: invert(78%) sepia(8%) saturate(10%) hue-rotate(358deg)
      brightness(96%) contrast(97%);
  }
}
</style>
