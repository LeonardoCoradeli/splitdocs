import type { Block } from '@/types/file'
import type { Part } from '@/types/part'

function parseTimeToSeconds(time: string): number {
  const cleaned = time.replace(',', '.')
  const parts = cleaned.split(':')
  if (parts.length !== 3) throw new Error(`Invalid time format: ${time}`)

  const hours = parseInt(parts[0], 10)
  const minutes = parseInt(parts[1], 10)
  const seconds = parseFloat(parts[2])

  return hours * 3600 + minutes * 60 + seconds
}

export function byTime(blocks: Block[], unit: 'seconds' | 'minutes', value: number): Part[] {
  const intervalSeconds = unit === 'minutes' ? value * 60 : value

  const timestampedBlocks = blocks.filter(b => b.metadata?.startTime !== undefined)
  if (timestampedBlocks.length === 0) {
    throw new Error('No blocks with timestamps found')
  }

  const parts: Part[] = []
  let currentBlocks: Block[] = []
  let intervalStart = parseTimeToSeconds(String(timestampedBlocks[0].metadata!.startTime))
  const intervalEnd = intervalStart + intervalSeconds

  for (const block of timestampedBlocks) {
    const blockTime = parseTimeToSeconds(String(block.metadata!.startTime))

    if (blockTime >= intervalEnd && currentBlocks.length > 0) {
      const text = currentBlocks.map(b => b.text).join('\n')
      parts.push({
        index: parts.length,
        filename: `part_${String(parts.length + 1).padStart(3, '0')}.txt`,
        content: text,
        size: text.length
      })
      currentBlocks = []
      intervalStart = blockTime
    }

    currentBlocks.push(block)
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
