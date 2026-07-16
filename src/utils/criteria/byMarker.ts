import type { Block } from '@/types/file'
import type { Part } from '@/types/part'

export function byMarker(blocks: Block[], marker: 'heading' | 'blankLine' | 'timestamp'): Part[] {
  const parts: Part[] = []
  let currentBlocks: Block[] = []

  function isSeparator(block: Block): boolean {
    switch (marker) {
      case 'heading':
        return block.text.startsWith('#')
      case 'blankLine':
        return block.text === '' || block.text === '\n'
      case 'timestamp':
        return block.metadata?.startTime !== undefined
    }
  }

  for (const block of blocks) {
    if (isSeparator(block)) {
      if (currentBlocks.length > 0) {
        const text = currentBlocks.map(b => b.text).join('\n')
        parts.push({
          index: parts.length,
          filename: `part_${String(parts.length + 1).padStart(3, '0')}.txt`,
          content: text,
          size: text.length
        })
        currentBlocks = []
      }
    } else {
      currentBlocks.push(block)
    }
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

  if (parts.length === 0) {
    const text = blocks.map(b => b.text).join('\n')
    parts.push({
      index: 0,
      filename: 'part_001.txt',
      content: text,
      size: text.length
    })
  }

  return parts
}
