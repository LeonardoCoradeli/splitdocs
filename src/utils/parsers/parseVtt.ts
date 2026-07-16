import type { Block } from '@/types/file'

export function parseVtt(content: string): Block[] {
  if (!content.trim()) return []

  const lines = content.trim().split('\n')
  const blocks: Block[] = []
  let blockIndex = 0

  let i = 0
  if (lines[i]?.trim() === 'WEBVTT') {
    i++
    while (i < lines.length && !lines[i].includes('-->')) {
      i++
    }
  }

  while (i < lines.length) {
    if (lines[i].includes('-->')) {
      const timeMatch = lines[i].match(
        /(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/
      )
      if (!timeMatch) {
        i++
        continue
      }

      i++
      const textLines: string[] = []
      while (i < lines.length && !lines[i].includes('-->') && lines[i].trim() !== '') {
        textLines.push(lines[i])
        i++
      }

      blocks.push({
        index: blockIndex++,
        text: textLines.join('\n'),
        metadata: {
          startTime: timeMatch[1],
          endTime: timeMatch[2]
        }
      })
    } else {
      i++
    }
  }

  return blocks
}
