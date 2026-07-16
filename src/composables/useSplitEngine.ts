import type { ParsedFile, Block } from '@/types/file'
import type { Criteria, OutputFormat } from '@/types/criteria'
import type { Part } from '@/types/part'
import { parseTxt } from '@/utils/parsers/parseTxt'
import { parseSrt } from '@/utils/parsers/parseSrt'
import { parseCsv } from '@/utils/parsers/parseCsv'
import { parseVtt } from '@/utils/parsers/parseVtt'
import { parseAss } from '@/utils/parsers/parseAss'
import { parsePdf } from '@/utils/parsers/parsePdf'
import { bySize } from '@/utils/criteria/bySize'
import { byMarker } from '@/utils/criteria/byMarker'
import { byTime } from '@/utils/criteria/byTime'
import { byColumns } from '@/utils/criteria/byColumns'
import { byParts } from '@/utils/criteria/byParts'
import { formatTxt } from '@/utils/formatters/formatTxt'
import { formatMd } from '@/utils/formatters/formatMd'
import { formatOriginal } from '@/utils/formatters/formatOriginal'

export function useSplitEngine() {
  function parse(file: ParsedFile): Block[] {
    switch (file.type) {
      case 'txt':
      case 'md':
        return parseTxt(file.content as string)
      case 'srt':
        return parseSrt(file.content as string)
      case 'csv':
      case 'tsv':
        return parseCsv(file.content as string)
      case 'vtt':
        return parseVtt(file.content as string)
      case 'ass':
        return parseAss(file.content as string)
      case 'pdf':
        return parsePdf(file.content as ArrayBuffer)
      default:
        throw new Error(`No parser available for file type: ${file.type}`)
    }
  }

  function split(parsedFile: ParsedFile, criteria: Criteria, format: OutputFormat): Part[] {
    validateCompatibility(parsedFile.type, criteria)

    const blocks = parse(parsedFile)

    let parts: Part[]

    switch (criteria.type) {
      case 'bySize':
        parts = bySize(blocks, criteria.unit, criteria.value)
        break
      case 'byMarker':
        parts = byMarker(blocks, criteria.marker)
        break
      case 'byTime':
        parts = byTime(blocks, criteria.unit, criteria.value)
        break
      case 'byColumns':
        parts = byColumns(blocks, criteria.columns)
        break
      case 'byParts':
        parts = byParts(blocks, criteria.count)
        break
    }

    const baseName = parsedFile.originalName.replace(/\.[^.]+$/, '')

    parts = parts.map(p => ({
      ...p,
      filename: `${baseName}_${p.filename.replace(/\.txt$/, `.${getExtension(parsedFile.type, format)}`)}`
    }))

    switch (format) {
      case 'txt':
        return formatTxt(parts, blocks)
      case 'md':
        return formatMd(parts, blocks)
      case 'original':
        return formatOriginal(parts, blocks)
      default:
        return parts
    }
  }

  return { split }
}

function validateCompatibility(type: string, criteria: Criteria): void {
  if (criteria.type === 'byTime' && !['srt', 'vtt', 'ass'].includes(type)) {
    throw new Error('Time-based splitting is only compatible with subtitle files (SRT, VTT, ASS)')
  }

  if (criteria.type === 'byColumns' && !['csv', 'tsv'].includes(type)) {
    throw new Error('Column-based splitting is only compatible with CSV/TSV files')
  }
}

function getExtension(type: string, format: OutputFormat): string {
  if (format !== 'original') return format
  return type
}
