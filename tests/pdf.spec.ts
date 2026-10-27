import { describe, it, expect } from 'vitest'
import { PDFDocument } from 'pdf-lib'
import { parsePdf } from '@/utils/parsers/parsePdf'
import { splitPdfPages } from '@/utils/pdf'
import { useSplitEngine } from '@/composables/useSplitEngine'
import type { ParsedFile } from '@/types/file'
import type { PartsCriteria } from '@/types/criteria'

async function createSamplePdf(pagesCount: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  for (let i = 0; i < pagesCount; i++) {
    const page = doc.addPage([400, 600])
    page.drawText(`Page ${i + 1}`)
  }
  return await doc.save()
}

describe('PDF Processing and Splitting', () => {
  it('parses PDF into page blocks with metadata', async () => {
    const pdfBytes = await createSamplePdf(3)
    const blocks = await parsePdf(pdfBytes.buffer as ArrayBuffer)

    expect(blocks).toHaveLength(3)
    expect(blocks[0].text).toBe('[Página 1]')
    expect(blocks[0].metadata?.pageNumber).toBe(1)
    expect(blocks[1].text).toBe('[Página 2]')
    expect(blocks[2].text).toBe('[Página 3]')
  })

  it('splits PDF pages faithfully into separate valid PDFs', async () => {
    const pdfBytes = await createSamplePdf(4)
    const part1Bytes = await splitPdfPages(pdfBytes.buffer as ArrayBuffer, [0, 1])
    const part2Bytes = await splitPdfPages(pdfBytes.buffer as ArrayBuffer, [2, 3])

    const doc1 = await PDFDocument.load(part1Bytes)
    const doc2 = await PDFDocument.load(part2Bytes)

    expect(doc1.getPageCount()).toBe(2)
    expect(doc2.getPageCount()).toBe(2)
  })

  it('splits PDF using useSplitEngine with original format', async () => {
    const pdfBytes = await createSamplePdf(3)
    const parsedFile: ParsedFile = {
      type: 'pdf',
      originalName: 'contrato.pdf',
      content: pdfBytes.buffer as ArrayBuffer,
      blocks: []
    }

    const criteria: PartsCriteria = {
      type: 'byParts',
      count: 2
    }

    const { split } = useSplitEngine()
    const parts = await split(parsedFile, criteria, 'original')

    expect(parts).toHaveLength(2)
    expect(parts[0].filename).toBe('contrato_part_001.pdf')
    expect(parts[1].filename).toBe('contrato_part_002.pdf')

    expect(parts[0].content).toBeInstanceOf(Uint8Array)
    expect(parts[1].content).toBeInstanceOf(Uint8Array)

    const doc1 = await PDFDocument.load(parts[0].content as Uint8Array)
    const doc2 = await PDFDocument.load(parts[1].content as Uint8Array)

    expect(doc1.getPageCount()).toBe(2)
    expect(doc2.getPageCount()).toBe(1)
  })
})
