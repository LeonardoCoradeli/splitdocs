import type { Part } from '@/types/part'
import type { Block } from '@/types/file'

export function formatTxt(parts: Part[], _originalBlocks?: Block[]): Part[] {
  return parts.map(part => {
    const contentStr = typeof part.content === 'string' ? part.content : new TextDecoder().decode(part.content)
    const lines = contentStr.split('\n').map((line: string) => {
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
