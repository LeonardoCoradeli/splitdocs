<script setup lang="ts">
const emit = defineEmits<{
  toggleDark: []
  toggleLang: []
}>()

defineProps<{
  isDark: boolean
  lang: string
}>()
</script>

<template>
  <header class="app-header">
    <span class="app-header__logo">SplitDocs</span>
    <div class="app-header__controls">
      <button class="app-header__btn" @click="emit('toggleDark')" :aria-label="isDark ? 'Light mode' : 'Dark mode'">
        <svg v-if="isDark" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.5" />
          <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.93 4.93L6.34 6.34M13.66 13.66L15.07 15.07M4.93 15.07L6.34 13.66M13.66 6.34L15.07 4.93" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button class="app-header__btn app-header__lang" @click="emit('toggleLang')">
        {{ lang === 'pt-BR' ? 'PT' : 'EN' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  background: var(--surface);
}

.app-header__logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent);
}

.app-header__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-header__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  color: var(--text-muted);
  border-radius: var(--border-radius);
}

.app-header__btn:hover {
  color: var(--text-main);
  background: var(--bg-primary);
}

.app-header__lang {
  font-size: 0.75rem;
  font-weight: 600;
  width: auto;
  padding: 0 0.5rem;
}
</style>
