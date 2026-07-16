import type { Block } from '@/types/file'
import type { Part } from '@/types/part'

export function byParts(blocks: Block[], count: number): Part[] {
  if (count <= 0) throw new Error('Count must be greater than 0')

  if (count > blocks.length) {
    return blocks.map((block, i) => {
      const text = block.text
      return {
        index: i,
        filename: `part_${String(i + 1).padStart(3, '0')}.txt`,
        content: text,
        size: text.length
      }
    })
  }

  const parts: Part[] = []
  const baseSize = Math.floor(blocks.length / count)
  const remainder = blocks.length % count
  let blockIndex = 0

  for (let i = 0; i < count; i++) {
    const partSize = baseSize + (i < remainder ? 1 : 0)
    const partBlocks = blocks.slice(blockIndex, blockIndex + partSize)
    const text = partBlocks.map(b => b.text).join('\n')

    parts.push({
      index: i,
      filename: `part_${String(i + 1).padStart(3, '0')}.txt`,
      content: text,
      size: text.length
    })

    blockIndex += partSize
  }

  return parts
}
