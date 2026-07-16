import { computed } from 'vue'

export function useStats(content: string) {
  const words = computed(() => content.split(/\s+/).filter(Boolean).length)
  const chars = computed(() => content.length)
  const lines = computed(() => content.split('\n').length)

  return { words, chars, lines }
}
