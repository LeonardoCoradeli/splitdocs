import type { HistoryEntry } from '@/types/history'

const STORAGE_KEY = 'splitdocs-history'
const MAX_ENTRIES = 20

let memoryStore: Record<string, string> = {}

function getStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('__storage_test__', '1')
      window.localStorage.removeItem('__storage_test__')
      return window.localStorage
    }
  } catch {}

  return {
    getItem(key: string) {
      return memoryStore[key] ?? null
    },
    setItem(key: string, value: string) {
      memoryStore[key] = value
    },
    removeItem(key: string) {
      delete memoryStore[key]
    }
  }
}

export function useHistory() {
  function getEntries(): HistoryEntry[] {
    try {
      const storage = getStorage()
      const raw = storage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function saveEntries(entries: HistoryEntry[]): void {
    const storage = getStorage()
    storage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }

  function addEntry(entry: Omit<HistoryEntry, 'id' | 'date'>): void {
    const entries = getEntries()
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID?.() ?? Date.now().toString(),
      date: new Date().toISOString()
    }
    entries.unshift(newEntry)

    if (entries.length > MAX_ENTRIES) {
      entries.length = MAX_ENTRIES
    }

    saveEntries(entries)
  }

  function clearHistory(): void {
    const storage = getStorage()
    storage.removeItem(STORAGE_KEY)
  }

  return { addEntry, getEntries, clearHistory }
}
