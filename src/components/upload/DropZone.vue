<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  'file-selected': [file: File]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
let dragCounter = 0

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDragEnter(e: DragEvent) {
  e.preventDefault()
  dragCounter++
}

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  dragCounter--
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragCounter = 0
  const file = e.dataTransfer?.files[0]
  if (file) emit('file-selected', file)
}

function onFileInput(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('file-selected', file)
    target.value = ''
  }
}
</script>

<template>
  <div
    class="drop-zone"
    :class="{ 'drop-zone--dragover': dragCounter > 0, 'drop-zone--disabled': disabled }"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @touchstart.prevent
    @touchend.prevent
  >
    <svg class="drop-zone__icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <p class="drop-zone__hint">Arraste um arquivo aqui ou clique para selecionar</p>
    <AppButton variant="secondary" :disabled="disabled" @click="fileInput?.click()">
      Selecionar arquivo
    </AppButton>
    <input
      ref="fileInput"
      type="file"
      class="drop-zone__input"
      accept=".txt,.md,.srt,.vtt,.ass,.csv,.tsv,.pdf"
      @change="onFileInput"
    />
  </div>
</template>

<style scoped>
.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 2px dashed var(--text-muted);
  border-radius: var(--border-radius);
  transition: border-color 0.2s;
}

.drop-zone--dragover {
  border-color: var(--accent);
}

.drop-zone--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.drop-zone__icon {
  color: var(--text-muted);
}

.drop-zone__hint {
  color: var(--text-muted);
  font-size: 0.875rem;
  text-align: center;
}

.drop-zone__input {
  display: none;
}
</style>
