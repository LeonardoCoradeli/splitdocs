<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { useSplitEngine } from '@/composables/useSplitEngine'
import { useSessionStore } from '@/stores/session'
import type { Criteria, OutputFormat } from '@/types/criteria'
import type { FileType, ParsedFile } from '@/types/file'
import type { Part, PartPreview } from '@/types/part'

useHead({
  title: 'SplitDocs — Dividir arquivos de texto, legendas e PDF online grátis'
})
import DropZone from '@/components/upload/DropZone.vue'
import TextPasteArea from '@/components/upload/TextPasteArea.vue'
import CriteriaSection from '@/components/upload/CriteriaSection.vue'
import SidebarAd from '@/components/layout/SidebarAd.vue'
import AppButton from '@/components/common/AppButton.vue'
import StatsBar from '@/components/common/StatsBar.vue'
import PreviewModal from '@/components/preview/PreviewModal.vue'

const router = useRouter()
const { handleError } = useErrorHandler()
const { split } = useSplitEngine()
const store = useSessionStore()

const hasFile = ref(false)
const fileName = ref('')
const fileType = ref<FileType | null>(null)
const fileContent = ref('')
const criteria = ref<Criteria | null>(null)
const outputFormat = ref<OutputFormat>('original')
const showPreview = ref(false)
const previewParts = ref<PartPreview[]>([])
const previewLoading = ref(false)
let lastParts: Part[] = []

const words = computed(() => fileContent.value.split(/\s+/).filter(Boolean).length)
const chars = computed(() => fileContent.value.length)
const lines = computed(() => fileContent.value.split('\n').length)

function onFileSelected(file: File) {
  try {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const supported = ['txt', 'md', 'srt', 'vtt', 'ass', 'csv', 'tsv', 'pdf']
    if (!supported.includes(ext)) {
      throw new Error('Formato de arquivo não suportado.')
    }
    if (file.size > 50 * 1024 * 1024) {
      throw new Error('Arquivo muito grande. Limite máximo de 50MB.')
    }

    const reader = new FileReader()
    reader.onload = () => {
      const content = reader.result as string
      fileContent.value = content
      fileName.value = file.name
      fileType.value = ext as FileType
      hasFile.value = true
    }
    reader.onerror = () => {
      handleError('Erro ao ler o arquivo.')
    }
    reader.readAsText(file)
  } catch (err) {
    handleError(err)
  }
}

function onTextPasted(text: string) {
  fileContent.value = text
  fileName.value = 'texto_colado.txt'
  fileType.value = 'txt'
  hasFile.value = true
}

function onCriteriaChange(c: Criteria, format: OutputFormat) {
  criteria.value = c
  outputFormat.value = format
}

function onExampleClick() {
  fileContent.value = 'Bem-vindo ao SplitDocs. Esta é uma ferramenta para dividir arquivos de texto em múltiplas partes.\n\nVocê pode dividir por número de linhas, palavras, caracteres, ou usar marcadores estruturais como cabeçalhos e linhas em branco. O resultado pode ser baixado em formato original, TXT ou Markdown.\n\nExperimente os diferentes critérios de divisão e veja como o preview mostra cada parte antes de confirmar o download.'
  fileName.value = 'exemplo.txt'
  fileType.value = 'txt'
  hasFile.value = true
}

async function onPreview() {
  if (!criteria.value || !fileType.value) return

  previewLoading.value = true
  showPreview.value = true

  try {
    const parsedFile: ParsedFile = {
      type: fileType.value,
      originalName: fileName.value,
      content: fileContent.value,
      blocks: []
    }

    lastParts = await split(parsedFile, criteria.value, outputFormat.value)

    previewParts.value = lastParts.map(p => ({
      index: p.index,
      filename: p.filename,
      firstLine: p.content.split('\n')[0] || '',
      lastLine: p.content.split('\n').filter(Boolean).pop() || '',
      totalLines: p.content.split('\n').length
    }))

    store.setPreviewParts(previewParts.value)
  } catch (err) {
    handleError(err)
    showPreview.value = false
  } finally {
    previewLoading.value = false
  }
}

function onPreviewConfirm() {
  showPreview.value = false
  store.confirmParts(lastParts)
  store.clearSession()
  router.push('/downloads')
}

function onPreviewClose() {
  showPreview.value = false
}
</script>

<template>
  <div class="page-layout">
    <div class="page-layout__main">
      <h1 class="page-title">SplitDocs</h1>
      <p class="page-description">Divida arquivos de texto, legendas e PDF em múltiplas partes.</p>

      <DropZone :disabled="false" @file-selected="onFileSelected" />
      <TextPasteArea v-model="fileContent" @text-pasted="onTextPasted" />

      <div class="page-actions">
        <AppButton variant="ghost" @click="onExampleClick">
          Carregar exemplo
        </AppButton>
      </div>

      <div v-if="hasFile" class="page-content">
        <div class="file-indicator">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V5L9 1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 1V5H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="file-indicator__name">{{ fileName }}</span>
          <span class="file-indicator__type">({{ fileType?.toUpperCase() }})</span>
        </div>
        <StatsBar :words="words" :chars="chars" :lines="lines" :parts="0" />

        <CriteriaSection
          :file-type="fileType"
          :visible="true"
          @criteria-change="onCriteriaChange"
        />

        <AppButton
          variant="primary"
          :disabled="!criteria || !hasFile"
          class="page-preview-btn"
          @click="onPreview"
        >
          Visualizar divisão
        </AppButton>
      </div>
    </div>

    <SidebarAd />
  </div>

  <PreviewModal
    :open="showPreview"
    :parts="previewParts"
    :loading="previewLoading"
    @confirm="onPreviewConfirm"
    @close="onPreviewClose"
  />
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

.page-description {
  font-size: 0.9375rem;
  color: var(--text-muted);
}

.page-actions {
  display: flex;
  gap: 0.75rem;
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-preview-btn {
  align-self: flex-start;
}

.file-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--surface);
  border-radius: var(--border-radius);
  color: var(--accent);
  font-size: 0.875rem;
}

.file-indicator__name {
  font-weight: 500;
  color: var(--text-main);
}

.file-indicator__type {
  color: var(--text-muted);
  font-size: 0.75rem;
}
</style>
