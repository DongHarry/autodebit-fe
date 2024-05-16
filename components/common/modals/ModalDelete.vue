<template>
  <div id="components-modal-demo-position">
    <a-modal
      v-model:open="modalVisible"
      :title="title"
      centered
      :ok-button-props="configButtonDelete"
      :ok-text="$t('button.delete')"
      :cancel-text="$t('button.cancel')"
      :confirm-loading="loading"
      @ok="deleteData"
    >
      <p class="my-10">{{ $t('confirm.delete') }}</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loading = ref<boolean>(false)
const configButtonDelete: any = {
  danger: true,
  type: 'default',
}

const props = defineProps({
  targetName: {
    type: String,
    default: '',
  },
  apiDelete: {
    type: Function,
    required: true,
  },
})
const modalVisible = ref<boolean>(false)

const title = computed(
  () => `${t('button.delete')} ${props.targetName.toLowerCase()}`,
)

const open = () => {
  modalVisible.value = true
}

const deleteData = async () => {
  try {
    loading.value = true
    await props.apiDelete()
  } catch (err) {
  } finally {
    loading.value = false
    modalVisible.value = false
  }
}

defineExpose({
  open,
})
</script>
