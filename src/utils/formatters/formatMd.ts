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

    if (hasCsvData) {
      const rows = part.content.split('\n').map(line => {
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
      const dataRows = rows.map(row =>
        `| ${row.map((v: string) => v.replace(/\|/g, '\\|')).join(' | ')} |`
      )

      text = [headerRow, separatorRow, ...dataRows].join('\n')
    } else if (hasTimestampBlocks) {
      const lines = part.content.split('\n').map(line => `> ${line}`)
      text = lines.join('\n\n')
    } else {
      text = part.content
    }

    return {
      ...part,
      content: text,
      size: text.length
    }
  })
}
