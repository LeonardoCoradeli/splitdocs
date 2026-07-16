<script setup lang="ts">
defineProps<{
  words: number
  chars: number
  lines: number
  parts: number
}>()
</script>

<template>
  <div class="stats-bar">
    <div class="stats-bar__item">
      <span class="stats-bar__label">Palavras</span>
      <span class="stats-bar__value">{{ words }}</span>
    </div>
    <div class="stats-bar__item">
      <span class="stats-bar__label">Caracteres</span>
      <span class="stats-bar__value">{{ chars }}</span>
    </div>
    <div class="stats-bar__item">
      <span class="stats-bar__label">Linhas</span>
      <span class="stats-bar__value">{{ lines }}</span>
    </div>
    <div class="stats-bar__item">
      <span class="stats-bar__label">Partes</span>
      <span class="stats-bar__value">{{ parts }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  display: flex;
  gap: 2rem;
}

.stats-bar__item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stats-bar__label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stats-bar__value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}
</style>
