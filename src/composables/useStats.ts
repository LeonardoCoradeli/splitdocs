import { computed, type Ref, unref } from 'vue'

export function useStats(
  content: Ref<string | ArrayBuffer> | string | ArrayBuffer,
  pageCount?: Ref<number> | number
) {
  const words = computed(() => {
    const val = unref(content)
    if (typeof val !== 'string') return 0
    return val.split(/\s+/).filter(Boolean).length
  })

  const chars = computed(() => {
    const val = unref(content)
    if (typeof val !== 'string') return val?.byteLength ?? 0
    return val.length
  })

  const lines = computed(() => {
    const val = unref(content)
    if (typeof val !== 'string') {
      const p = unref(pageCount)
      return p ?? 0
    }
    return val.split('\n').length
  })

  return { words, chars, lines }
}
