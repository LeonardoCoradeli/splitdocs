import { defineStore } from 'pinia'
import type { ParsedFile } from '@/types/file'
import type { Criteria, OutputFormat } from '@/types/criteria'
import type { Part, PartPreview } from '@/types/part'

interface SessionState {
  currentFile: ParsedFile | null
  criteria: Criteria | null
  outputFormat: OutputFormat
  accumulatedParts: Part[]
  previewParts: PartPreview[]
  uploadCount: number
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    currentFile: null,
    criteria: null,
    outputFormat: 'original',
    accumulatedParts: [],
    previewParts: [],
    uploadCount: 0
  }),

  getters: {
    totalAccumulated(state): number {
      return state.accumulatedParts.length
    },
    canAddMore(state): boolean {
      return state.uploadCount < 5
    }
  },

  actions: {
    setCurrentFile(file: ParsedFile) {
      this.currentFile = file
    },
    setCriteria(criteria: Criteria) {
      this.criteria = criteria
    },
    setOutputFormat(format: OutputFormat) {
      this.outputFormat = format
    },
    setPreviewParts(parts: PartPreview[]) {
      this.previewParts = parts
    },
    confirmParts(parts: Part[]) {
      this.accumulatedParts.push(...parts)
      this.uploadCount++
    },
    clearSession() {
      this.currentFile = null
      this.criteria = null
      this.previewParts = []
    },
    resetAll() {
      this.$reset()
    }
  }
})
