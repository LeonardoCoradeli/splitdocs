<template>
  <div id="app" :class="{ 'dark-mode': isDark }">
    <AppHeader
      :is-dark="isDark"
      :lang="locale"
      @toggle-dark="toggleDark"
      @toggle-lang="toggleLang"
    />
    <main class="main-content">
      <router-view />
    </main>

    <AppModal :open="error !== null" title="Erro" @close="onErrorClose">
      <p class="error-message">{{ error }}</p>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useDarkMode } from '@/composables/useDarkMode'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { useAppI18n } from '@/composables/useI18n'
import { useSessionStore } from '@/stores/session'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppModal from '@/components/common/AppModal.vue'

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SplitDocs',
        applicationCategory: 'Utilities',
        operatingSystem: 'Web',
        browserRequirements: 'HTML5'
      })
    }
  ]
})

const { isDark, toggle: toggleDark } = useDarkMode()
const { error, clearError } = useErrorHandler()
const { locale, setLocale } = useAppI18n()
const sessionStore = useSessionStore()

function toggleLang() {
  setLocale(locale.value === 'pt-BR' ? 'en' : 'pt-BR')
}

function onErrorClose() {
  clearError()
  sessionStore.clearSession()
}
</script>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  padding: 2rem;
  gap: 2rem;
}

.error-message {
  color: var(--text-main);
  font-size: 0.9375rem;
  padding: 0.5rem 0;
}
</style>
