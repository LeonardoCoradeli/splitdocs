import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useStats } from '@/composables/useStats'
import { useHistory } from '@/composables/useHistory'

describe('Composables', () => {
  beforeEach(() => {
    window.localStorage?.clear()
  })

  describe('useStats', () => {
    it('computes stats correctly for text content', () => {
      const text = ref('Primeira linha\nSegunda linha com várias palavras\nTerceira')
      const { words, lines, chars } = useStats(text)

      expect(lines.value).toBe(3)
      expect(words.value).toBe(8)
      expect(chars.value).toBe(text.value.length)
    })

    it('computes stats correctly for binary / PDF with pageCount', () => {
      const buffer = ref(new ArrayBuffer(1024))
      const pages = ref(5)
      const { words, lines, chars } = useStats(buffer, pages)

      expect(words.value).toBe(0)
      expect(chars.value).toBe(1024)
      expect(lines.value).toBe(5)
    })
  })

  describe('useHistory', () => {
    it('adds and retrieves history entries', () => {
      const { addEntry, getEntries, clearHistory } = useHistory()

      addEntry({
        originalName: 'documento.pdf',
        criteria: 'byParts',
        partsCount: 3
      })

      const entries = getEntries()
      expect(entries).toHaveLength(1)
      expect(entries[0].originalName).toBe('documento.pdf')
      expect(entries[0].partsCount).toBe(3)
      expect(entries[0].id).toBeDefined()
      expect(entries[0].date).toBeDefined()

      clearHistory()
      expect(getEntries()).toHaveLength(0)
    })
  })
})
