import type { Block } from '@/types/file'

export function parseAss(content: string): Block[] {
  if (!content.trim()) return []

  const lines = content.split('\n')
  const blocks: Block[] = []
  let blockIndex = 0
  let inEvents = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      inEvents = trimmed.toUpperCase() === '[EVENTS]'
      continue
    }

    if (!inEvents || !trimmed.startsWith('Dialogue:')) continue

    const afterDialogue = trimmed.slice('Dialogue:'.length)
    const commaIndex = findNthComma(afterDialogue, 9)
    if (commaIndex === -1) continue

    const fields = afterDialogue.slice(0, commaIndex)
    const text = afterDialogue.slice(commaIndex + 1)

    const parts = fields.split(',')
    const startTime = parts[1]?.trim() || ''
    const endTime = parts[2]?.trim() || ''

    blocks.push({
      index: blockIndex++,
      text: text.trim(),
      metadata: { startTime, endTime }
    })
  }

  return blocks
}

function findNthComma(str: string, n: number): number {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ',') {
      count++
      if (count === n) return i
    }
  }
  return -1
}
