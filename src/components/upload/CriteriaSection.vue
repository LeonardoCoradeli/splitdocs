<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { FileType } from '@/types/file'
import type { Criteria, OutputFormat } from '@/types/criteria'

const props = defineProps<{
  fileType: FileType | null
  visible: boolean
}>()

const emit = defineEmits<{
  'criteria-change': [criteria: Criteria, format: OutputFormat]
}>()

const sizeUnit = ref<'lines' | 'words' | 'chars'>('lines')
const sizeValue = ref(100)
const markerValue = ref<'heading' | 'blankLine' | 'timestamp'>('heading')
const timeUnit = ref<'seconds' | 'minutes'>('minutes')
const timeValue = ref(5)
const columnsValue = ref('')
const partsCount = ref(2)
const activeTab = ref<'bySize' | 'byMarker' | 'byTime' | 'byColumns' | 'byParts'>('bySize')
const outputFormat = ref<OutputFormat>('original')

const hasTimestamp = computed(() => props.fileType && ['srt', 'vtt', 'ass'].includes(props.fileType))
const hasColumns = computed(() => props.fileType && ['csv', 'tsv'].includes(props.fileType))


function emitChange() {
  let criteria: Criteria

  switch (activeTab.value) {
    case 'bySize':
      criteria = { type: 'bySize', unit: sizeUnit.value, value: sizeValue.value }
      break
    case 'byMarker':
      criteria = { type: 'byMarker', marker: markerValue.value }
      break
    case 'byTime':
      criteria = { type: 'byTime', unit: timeUnit.value, value: timeValue.value }
      break
    case 'byColumns':
      criteria = { type: 'byColumns', columns: columnsValue.value.split(',').map(c => c.trim()).filter(Boolean) }
      break
    case 'byParts':
      criteria = { type: 'byParts', count: partsCount.value }
      break
  }

  emit('criteria-change', criteria, outputFormat.value)
}

watch([activeTab, sizeUnit, sizeValue, markerValue, timeUnit, timeValue, columnsValue, partsCount, outputFormat], emitChange)
</script>

<template>
  <div v-if="visible" class="criteria-section">
    <h3 class="criteria-section__title">Critérios de divisão</h3>

    <div class="criteria-section__tabs">
      <button
        v-for="tab in ['bySize', 'byMarker', 'byParts']"
        :key="tab"
        class="criteria-section__tab"
        :class="{ 'criteria-section__tab--active': activeTab === tab }"
        @click="activeTab = tab as typeof activeTab"
      >
        {{ tab === 'bySize' ? 'Tamanho fixo' : tab === 'byMarker' ? 'Marcador estrutural' : 'Número de partes' }}
      </button>
      <button
        v-if="hasTimestamp"
        class="criteria-section__tab"
        :class="{ 'criteria-section__tab--active': activeTab === 'byTime' }"
        @click="activeTab = 'byTime'"
      >
        Por tempo
      </button>
      <button
        v-if="hasColumns"
        class="criteria-section__tab"
        :class="{ 'criteria-section__tab--active': activeTab === 'byColumns' }"
        @click="activeTab = 'byColumns'"
      >
        Por colunas
      </button>
    </div>

    <div v-if="activeTab === 'bySize'" class="criteria-section__fields">
      <label class="criteria-section__field">
        <span>Valor</span>
        <input type="number" v-model.number="sizeValue" min="1" class="criteria-section__input" />
      </label>
      <label class="criteria-section__field">
        <span>Unidade</span>
        <select v-model="sizeUnit" class="criteria-section__select">
          <option value="lines">Linhas</option>
          <option value="words">Palavras</option>
          <option value="chars">Caracteres</option>
        </select>
      </label>
    </div>

    <div v-if="activeTab === 'byMarker'" class="criteria-section__fields">
      <label class="criteria-section__field">
        <span>Marcador</span>
        <select v-model="markerValue" class="criteria-section__select">
          <option value="heading">Cabeçalhos (#)</option>
          <option value="blankLine">Linhas em branco</option>
          <option v-if="hasTimestamp" value="timestamp">Timestamps</option>
        </select>
      </label>
    </div>

    <div v-if="activeTab === 'byTime'" class="criteria-section__fields">
      <label class="criteria-section__field">
        <span>Valor</span>
        <input type="number" v-model.number="timeValue" min="1" class="criteria-section__input" />
      </label>
      <label class="criteria-section__field">
        <span>Unidade</span>
        <select v-model="timeUnit" class="criteria-section__select">
          <option value="seconds">Segundos</option>
          <option value="minutes">Minutos</option>
        </select>
      </label>
    </div>

    <div v-if="activeTab === 'byColumns'" class="criteria-section__fields">
      <label class="criteria-section__field">
        <span>Colunas (separadas por vírgula)</span>
        <input type="text" v-model="columnsValue" placeholder="col1, col2, col3" class="criteria-section__input" />
      </label>
    </div>

    <div v-if="activeTab === 'byParts'" class="criteria-section__fields">
      <label class="criteria-section__field">
        <span>Número de partes</span>
        <input type="number" v-model.number="partsCount" min="1" class="criteria-section__input" />
      </label>
    </div>

    <div class="criteria-section__format">
      <span class="criteria-section__format-label">Formato de saída</span>
      <div class="criteria-section__radios">
        <label class="criteria-section__radio">
          <input type="radio" v-model="outputFormat" value="original" />
          Original
        </label>
        <label class="criteria-section__radio">
          <input type="radio" v-model="outputFormat" value="txt" />
          .txt
        </label>
        <label class="criteria-section__radio">
          <input type="radio" v-model="outputFormat" value="md" />
          .md
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.criteria-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.criteria-section__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

.criteria-section__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.criteria-section__tab {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--text-muted);
  border-radius: var(--border-radius);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.criteria-section__tab--active {
  border-color: var(--accent);
  color: var(--accent);
}

.criteria-section__fields {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.criteria-section__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.criteria-section__input,
.criteria-section__select {
  padding: 0.5rem;
  border: 1px solid var(--text-muted);
  border-radius: var(--border-radius);
  background: var(--surface);
  color: var(--text-main);
  font-size: 0.875rem;
  outline: none;
  min-width: 120px;
}

.criteria-section__input:focus,
.criteria-section__select:focus {
  border-color: var(--accent);
}

.criteria-section__format {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.criteria-section__format-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.criteria-section__radios {
  display: flex;
  gap: 1rem;
}

.criteria-section__radio {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-main);
  cursor: pointer;
}
</style>
