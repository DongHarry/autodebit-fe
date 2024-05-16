<template>
  <a-layout style="min-height: 100vh">
    <Sidebar />
    <a-layout>
      <Header />
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Sidebar from '~/components/common/layouts/Sidebar.vue'
import Header from '~/components/common/layouts/Header.vue'
</script>
