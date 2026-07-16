import type { Block } from '@/types/file'
import type { Part } from '@/types/part'

export function byColumns(blocks: Block[], columns: string[]): Part[] {
  const rows: Record<string, string>[] = []

  const firstBlock = blocks[0]
  if (!firstBlock) {
    return [{
      index: 0,
      filename: 'part_001.txt',
      content: '',
      size: 0
    }]
  }

  let firstParsed: unknown
  try {
    firstParsed = JSON.parse(firstBlock.text)
  } catch {
    throw new Error('Block is not valid JSON data')
  }

  if (Array.isArray(firstParsed)) {
    throw new Error('CSV must have a header row to use column selection')
  }

  for (const block of blocks) {
    const parsed = JSON.parse(block.text) as Record<string, string>

    for (const col of columns) {
      if (!(col in parsed)) {
        throw new Error(`Column "${col}" not found in data`)
      }
    }

    const filtered: Record<string, string> = {}
    for (const col of columns) {
      filtered[col] = parsed[col]
    }

    rows.push(filtered)
  }

  const text = rows.map(r => JSON.stringify(r)).join('\n')

  return [{
    index: 0,
    filename: 'part_001.txt',
    content: text,
    size: text.length
  }]
}
