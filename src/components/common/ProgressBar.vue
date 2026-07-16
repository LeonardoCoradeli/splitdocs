<script setup lang="ts">
defineProps<{
  progress: number
}>()
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }" />
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--surface);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s ease;
}
</style>
