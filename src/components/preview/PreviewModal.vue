<script setup lang="ts">
import type { PartPreview } from '@/types/part'
import AppModal from '@/components/common/AppModal.vue'
import AppButton from '@/components/common/AppButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import PartRow from './PartRow.vue'

defineProps<{
  open: boolean
  parts: PartPreview[]
  loading?: boolean
}>()

const emit = defineEmits<{
  confirm: []
  close: []
}>()
</script>

<template>
  <AppModal :open="open" title="Pré-visualização da divisão" @close="emit('close')">
    <ProgressBar v-if="loading" :progress="50" />
    <div class="preview-list">
      <PartRow
        v-for="part in parts"
        :key="part.index"
        :part="part"
        :loading="loading"
      />
    </div>
    <template #actions>
      <AppButton variant="primary" :disabled="loading" @click="emit('confirm')">
        Confirmar e baixar
      </AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.preview-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 60vh;
  overflow-y: auto;
}
</style>
