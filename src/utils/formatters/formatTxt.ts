import type { Part } from '@/types/part'
import type { Block } from '@/types/file'

export function formatTxt(parts: Part[], _originalBlocks?: Block[]): Part[] {
  return parts.map(part => {
    const lines = part.content.split('\n').map(line => {
      if (line.startsWith('{') || line.startsWith('[')) {
        try {
          const parsed = JSON.parse(line)
          if (Array.isArray(parsed)) return parsed.join(' ')
          if (typeof parsed === 'object') return Object.values(parsed).join(' ')
        } catch {}
      }
      return line
    })

    const text = lines.join('\n')

    return {
      ...part,
      content: text,
      size: text.length
    }
  })
}
