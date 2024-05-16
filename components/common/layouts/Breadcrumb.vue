<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <a-breadcrumb v-if="props.paths.length > 1">
      <a-breadcrumb-item v-for="(path, index) in props.paths" :key="index">
        <span v-if="!path.path">{{ path.name }}</span>
        <a v-else href="javascript: void(0)" @click="changePage(path.path)">{{
          path.name
        }}</a>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <div class="grid grid-cols-2">
    <div class="flex">
      <ArrowLeftOutlined
        v-if="props.paths.length > 1"
        class="self-center text-lg mr-3 cursor-pointer"
        @click="goBack"
      />
      <h1 class="text-xl self-center">
        {{ title }}
      </h1>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  paths: {
    type: Array<any>,
    default: [],
  },
})

const changePage = (path: string) => {
  navigateTo(path)
}

const router = useRouter()

const goBack = () => {
  router.back()
}

const title = computed(() => {
  const path = props.paths.find(
    (path, index) => !path.path || index + 1 === props.paths.length,
  )

  return path?.name
})
</script>
