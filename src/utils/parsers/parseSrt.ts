import type { Block } from '@/types/file'

export function parseSrt(content: string): Block[] {
  if (!content.trim()) return []

  const blocks: Block[] = []
  const rawBlocks = content.trim().split(/\n\n+/)

  for (const raw of rawBlocks) {
    const lines = raw.trim().split('\n')
    if (lines.length < 3) throw new Error('Invalid SRT format')

    const index = parseInt(lines[0], 10)
    if (isNaN(index)) throw new Error('Invalid SRT index')

    const timeMatch = lines[1].match(
      /(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})/
    )
    if (!timeMatch) throw new Error('Invalid SRT timestamp')

    const text = lines.slice(2).join('\n')

    blocks.push({
      index,
      text,
      metadata: {
        startTime: timeMatch[1],
        endTime: timeMatch[2],
        index
      }
    })
  }

  return blocks
}
