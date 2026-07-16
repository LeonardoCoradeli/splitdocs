<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useDownloadZip } from '@/composables/useDownloadZip'
import { useErrorHandler } from '@/composables/useErrorHandler'

useHead({
  title: 'SplitDocs — Baixar arquivos divididos'
})
import { formatFileSize } from '@/utils/fileHelpers'
import AppButton from '@/components/common/AppButton.vue'
import AppModal from '@/components/common/AppModal.vue'
import FileList from '@/components/download/FileList.vue'
import SidebarAd from '@/components/layout/SidebarAd.vue'

const router = useRouter()
const store = useSessionStore()
const { downloadAsZip } = useDownloadZip()
const { handleError } = useErrorHandler()

const showAdModal = ref(false)
const downloading = ref(false)

const isEmpty = computed(() => store.accumulatedParts.length === 0)
const totalSize = computed(() => store.accumulatedParts.reduce((sum, p) => sum + p.size, 0))

async function onDownload() {
  showAdModal.value = true
}

function onAdModalClose() {
  showAdModal.value = false
  triggerDownload()
}

async function triggerDownload() {
  downloading.value = true
  try {
    await downloadAsZip(store.accumulatedParts)
  } catch (err) {
    handleError(err)
  } finally {
    downloading.value = false
  }
}

function onSendAnother() {
  router.push('/')
}

function onRename(index: number, name: string) {
  store.accumulatedParts[index].filename = name
}
</script>

<template>
  <div class="page-layout">
    <div class="page-layout__main">
      <template v-if="isEmpty">
        <h1 class="page-title">Arquivos gerados</h1>
        <p class="page-empty">Nenhum arquivo para baixar</p>
        <AppButton variant="primary" @click="router.push('/')">
          Enviar arquivo
        </AppButton>
      </template>

      <template v-else>
        <h1 class="page-title">Arquivos gerados</h1>

        <div class="page-stats">
          <span class="page-stats__item">
            <span class="page-stats__label">Arquivos enviados</span>
            <span class="page-stats__value">{{ store.uploadCount }}/5</span>
          </span>
          <span class="page-stats__item">
            <span class="page-stats__label">Partes</span>
            <span class="page-stats__value">{{ store.accumulatedParts.length }}</span>
          </span>
          <span class="page-stats__item">
            <span class="page-stats__label">Tamanho total</span>
            <span class="page-stats__value">{{ formatFileSize(totalSize) }}</span>
          </span>
        </div>

        <FileList :parts="store.accumulatedParts" @rename="onRename" />

        <div class="page-actions">
          <AppButton
            v-if="store.canAddMore"
            variant="secondary"
            @click="onSendAnother"
          >
            Enviar outro arquivo
          </AppButton>
          <AppButton
            variant="primary"
            :disabled="downloading"
            @click="onDownload"
          >
            Baixar
          </AppButton>
        </div>
      </template>
    </div>

    <SidebarAd />
  </div>

  <AppModal :open="showAdModal" title="Anúncio" @close="onAdModalClose">
    <p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">
      Anúncio
    </p>
  </AppModal>
</template>

<style scoped>
.page-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  flex: 1;
}

.page-layout__main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.page-empty {
  color: var(--text-muted);
  font-size: 0.9375rem;
}

.page-stats {
  display: flex;
  gap: 2rem;
}

.page-stats__item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.page-stats__label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.page-stats__value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

.page-actions {
  display: flex;
  gap: 1rem;
}
</style>
