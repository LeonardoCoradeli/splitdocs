import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function extractPages(pdfBytes: ArrayBuffer): Promise<{ text: string; pageNumber: number }[]> {
  const doc = await PDFDocument.load(pdfBytes)
  const count = doc.getPageCount()

  const pages: { text: string; pageNumber: number }[] = []
  for (let i = 0; i < count; i++) {
    pages.push({
      text: `[Página ${i + 1}]`,
      pageNumber: i + 1
    })
  }

  return pages
}

export async function splitPdfPages(pdfBytes: ArrayBuffer, pageIndices: number[]): Promise<Uint8Array> {
  const srcDoc = await PDFDocument.load(pdfBytes)
  const subDoc = await PDFDocument.create()
  const copiedPages = await subDoc.copyPages(srcDoc, pageIndices)
  for (const page of copiedPages) {
    subDoc.addPage(page)
  }
  return await subDoc.save()
}

export async function createPdfFromPages(pages: { text: string; pageNumber: number }[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const font = await doc.embedFont(StandardFonts.Helvetica)

  for (const p of pages) {
    const page = doc.addPage()
    const { width, height } = page.getSize()

    page.drawText(p.text, {
      x: 50,
      y: height - 50,
      size: 11,
      font,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
      lineHeight: 16
    })
  }

  return await doc.save()
}
