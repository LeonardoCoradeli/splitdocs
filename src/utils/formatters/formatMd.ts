import type { Part } from '@/types/part'
import type { Block } from '@/types/file'

export function formatMd(parts: Part[], originalBlocks?: Block[]): Part[] {
  if (!originalBlocks) return parts

  const hasTimestampBlocks = originalBlocks.some(b => b.metadata?.startTime !== undefined)
  const hasCsvData = originalBlocks.some(b => {
    try { return typeof JSON.parse(b.text) === 'object' } catch { return false }
  })

  return parts.map(part => {
    let text: string
    const contentStr = typeof part.content === 'string' ? part.content : new TextDecoder().decode(part.content)

    if (hasCsvData) {
      const rows = contentStr.split('\n').map((line: string) => {
        try {
          const parsed = JSON.parse(line)
          if (Array.isArray(parsed)) return parsed
          if (typeof parsed === 'object') return Object.values(parsed)
          return [line]
        } catch {
          return [line]
        }
      })

      if (rows.length === 0) return { ...part, content: '', size: 0 }

      const headers = Object.keys(JSON.parse(originalBlocks.find(b => {
        try { return typeof JSON.parse(b.text) === 'object' && !Array.isArray(JSON.parse(b.text)) }
        catch { return false }
      })?.text || '{}'))

      const headerRow = `| ${headers.join(' | ')} |`
      const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`
      const dataRows = rows.map((row: string[]) =>
        `| ${row.map((v: string) => v.replace(/\|/g, '\\|')).join(' | ')} |`
      )

      text = [headerRow, separatorRow, ...dataRows].join('\n')
    } else if (hasTimestampBlocks) {
      const lines = contentStr.split('\n').map((line: string) => `> ${line}`)
      text = lines.join('\n\n')
    } else {
      text = contentStr
    }

    return {
      ...part,
      content: text,
      size: text.length
    }
  })
}
