import type { Part } from '@/types/part'
import type { Block } from '@/types/file'

export function formatOriginal(parts: Part[], originalBlocks?: Block[]): Part[] {
  if (!originalBlocks) return parts

  return parts.map(part => {
    const partBlocks = findBlocksForPart(part, originalBlocks)

    if (partBlocks.length === 0) return part

    const firstBlock = partBlocks[0]
    const hasStartTime = firstBlock.metadata?.startTime !== undefined
    const hasIndex = firstBlock.metadata?.index !== undefined

    if (hasStartTime && hasIndex) {
      const text = partBlocks.map(b => {
        const idx = b.metadata?.index ?? 0
        const start = b.metadata?.startTime ?? ''
        const end = b.metadata?.endTime ?? ''
        return `${idx}\n${start} --> ${end}\n${b.text}`
      }).join('\n\n')

      return { ...part, content: text, size: text.length }
    }

    if (hasStartTime) {
      const text = partBlocks.map(b => {
        const start = b.metadata?.startTime ?? ''
        const end = b.metadata?.endTime ?? ''
        return `${start} --> ${end}\n${b.text}`
      }).join('\n\n')

      return { ...part, content: text, size: text.length }
    }

    return part
  })
}

function findBlocksForPart(part: Part, allBlocks: Block[]): Block[] {
  const partLines = part.content.split('\n').filter(l => l.length > 0)
  if (partLines.length === 0) return []

  const firstLine = partLines[0]
  const startIndex = allBlocks.findIndex(b => b.text === firstLine)

  if (startIndex === -1) return []

  let endIndex = startIndex + 1
  let matchedLines = 1

  while (endIndex < allBlocks.length && matchedLines < partLines.length) {
    const blockLines = allBlocks[endIndex].text.split('\n')
    for (const bl of blockLines) {
      if (matchedLines < partLines.length && bl === partLines[matchedLines]) {
        matchedLines++
      }
    }
    endIndex++
  }

  return allBlocks.slice(startIndex, endIndex)
}
