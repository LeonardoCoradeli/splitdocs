import type { Block } from '@/types/file'
import type { Part } from '@/types/part'

function getUnitCount(block: Block, unit: 'lines' | 'words' | 'chars'): number {
  switch (unit) {
    case 'lines': return 1
    case 'words': return block.text.split(/\s+/).filter(Boolean).length
    case 'chars': return block.text.length
  }
}

export function bySize(blocks: Block[], unit: 'lines' | 'words' | 'chars', value: number): Part[] {
  if (value <= 0) throw new Error('Value must be greater than 0')

  const parts: Part[] = []
  let currentBlocks: Block[] = []
  let currentCount = 0

  for (const block of blocks) {
    const count = getUnitCount(block, unit)

    if (currentCount + count > value && currentBlocks.length > 0) {
      const text = currentBlocks.map(b => b.text).join('\n')
      parts.push({
        index: parts.length,
        filename: `part_${String(parts.length + 1).padStart(3, '0')}.txt`,
        content: text,
        size: text.length
      })
      currentBlocks = []
      currentCount = 0
    }

    currentBlocks.push(block)
    currentCount += count
  }

  if (currentBlocks.length > 0) {
    const text = currentBlocks.map(b => b.text).join('\n')
    parts.push({
      index: parts.length,
      filename: `part_${String(parts.length + 1).padStart(3, '0')}.txt`,
      content: text,
      size: text.length
    })
  }

  return parts
}
