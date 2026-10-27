import type { Block } from '@/types/file'
import { PDFDocument } from 'pdf-lib'

export async function parsePdf(content: ArrayBuffer): Promise<Block[]> {
  const doc = await PDFDocument.load(content)
  const count = doc.getPageCount()

  if (count === 0) return []

  const blocks: Block[] = []

  for (let i = 0; i < count; i++) {
    blocks.push({
      index: i,
      text: `[Página ${i + 1}]`,
      metadata: { pageNumber: i + 1, pageIndex: i }
    })
  }

  return blocks
}
