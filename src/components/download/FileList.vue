<script setup lang="ts">
import type { Part } from '@/types/part'
import FileRow from './FileRow.vue'

defineProps<{
  parts: Part[]
}>()

const emit = defineEmits<{
  rename: [index: number, name: string]
}>()
</script>

<template>
  <div class="file-list">
    <div class="file-list__header">
      <span class="file-list__title">Arquivos gerados</span>
      <span class="file-list__count">{{ parts.length }} arquivo{{ parts.length !== 1 ? 's' : '' }}</span>
    </div>
    <div class="file-list__items">
      <FileRow
        v-for="(part, i) in parts"
        :key="i"
        :part="part"
        :index="i"
        @rename="(idx: number, n: string) => emit('rename', idx, n)"
      />
    </div>
  </div>
</template>

<style scoped>
.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-list__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

.file-list__count {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.file-list__items {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
</style>
