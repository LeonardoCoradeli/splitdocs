<script setup lang="ts">
import { ref } from 'vue'
import type { PartPreview } from '@/types/part'
import SkeletonBlock from './SkeletonBlock.vue'

const props = defineProps<{
  part: PartPreview
  loading?: boolean
}>()

const copied = ref(false)

async function onCopy() {
  try {
    await navigator.clipboard.writeText(props.part.firstLine + '\n...\n' + props.part.lastLine)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch {}
}
</script>

<template>
  <div class="part-row" @click="onCopy">
    <div class="part-row__name">Parte {{ part.index + 1 }}</div>
    <div v-if="loading" class="part-row__skeleton">
      <SkeletonBlock />
    </div>
    <div v-else class="part-row__preview">
      <span class="part-row__line">{{ part.firstLine }}</span>
      <span class="part-row__dots">...</span>
      <span class="part-row__line">{{ part.lastLine }}</span>
    </div>
    <Transition name="copy-fade">
      <span v-if="copied" class="part-row__feedback">Copiado!</span>
    </Transition>
  </div>
</template>

<style scoped>
.part-row {
  position: relative;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background 0.2s;
}

.part-row:hover {
  background: var(--surface);
}

.part-row__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.part-row__preview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.part-row__line {
  font-family: 'Courier New', monospace;
  font-size: 0.8125rem;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.part-row__dots {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

.part-row__feedback {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 500;
}

.copy-fade-enter-active,
.copy-fade-leave-active {
  transition: opacity 0.2s;
}

.copy-fade-enter-from,
.copy-fade-leave-to {
  opacity: 0;
}
</style>
