import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function extractPages(pdfBytes: ArrayBuffer): Promise<{ text: string; pageNumber: number }[]> {
  const doc = await PDFDocument.load(pdfBytes)
  const pages = doc.getPages()

  return pages.map((page, i) => ({
    text: (page as unknown as { getText: () => string }).getText?.() ?? '',
    pageNumber: i + 1
  }))
}

export async function createPdfFromPages(pages: { text: string; pageNumber: number }[]): Promise<ArrayBuffer> {
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
