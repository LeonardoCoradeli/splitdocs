import type { Block } from '@/types/file'

function detectSeparator(firstLine: string): string {
  const commaCount = (firstLine.match(/,/g) || []).length
  const tabCount = (firstLine.match(/\t/g) || []).length
  return tabCount > commaCount ? '\t' : ','
}

function parseLine(line: string, separator: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === separator && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())

  return result
}

export function parseCsv(content: string): Block[] {
  if (!content.trim()) return []

  const lines = content.trim().split('\n')
  if (lines.length === 0) return []

  const separator = detectSeparator(lines[0])
  const parsedLines = lines.map(line => parseLine(line, separator))
  const hasHeader = parsedLines[0].length > 0

  if (hasHeader) {
    const headers = parsedLines[0]

    return parsedLines.slice(1).map((row, index) => {
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => {
        obj[h] = i < row.length ? row[i] : ''
      })
      return { index, text: JSON.stringify(obj) }
    })
  }

  return parsedLines.map((row, index) => {
    return { index, text: JSON.stringify(row) }
  })
}
