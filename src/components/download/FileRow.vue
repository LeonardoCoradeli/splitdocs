<script setup lang="ts">
import type { Part } from '@/types/part'
import { formatFileSize } from '@/utils/fileHelpers'
import RenameInput from './RenameInput.vue'

const props = defineProps<{
  part: Part
  index: number
}>()

const emit = defineEmits<{
  rename: [index: number, name: string]
}>()

function onRename(name: string) {
  emit('rename', props.index, name)
}
</script>

<template>
  <div class="file-row">
    <RenameInput :model-value="part.filename" @update:model-value="onRename" />
    <span class="file-row__size">{{ formatFileSize(part.size) }}</span>
  </div>
</template>

<style scoped>
.file-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--text-muted);
  font-size: 0.875rem;
}

.file-row__size {
  color: var(--text-muted);
  font-size: 0.8125rem;
}
</style>
