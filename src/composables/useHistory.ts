import type { HistoryEntry } from '@/types/history'

const STORAGE_KEY = 'splitdocs-history'
const MAX_ENTRIES = 20

export function useHistory() {
  function getEntries(): HistoryEntry[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function saveEntries(entries: HistoryEntry[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
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
    localStorage.removeItem(STORAGE_KEY)
  }

  return { addEntry, getEntries, clearHistory }
}
