import type { Block } from '@/types/file'
import { PDFDocument } from 'pdf-lib'

export async function parsePdf(content: ArrayBuffer): Promise<Block[]> {
  const doc = await PDFDocument.load(content)

  if (doc.getPageCount() === 0) return []

  const blocks: Block[] = []
  const pages = doc.getPages()

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const text = (page as unknown as { getText: () => string }).getText?.() ?? ''

    blocks.push({
      index: i,
      text,
      metadata: { pageNumber: i + 1 }
    })
  }

  return blocks
}
