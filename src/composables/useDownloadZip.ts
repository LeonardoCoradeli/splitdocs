import JSZip from 'jszip'
import type { Part } from '@/types/part'

export function useDownloadZip() {
  async function downloadAsZip(parts: Part[]): Promise<void> {
    const zip = new JSZip()

    for (const part of parts) {
      zip.file(part.filename, part.content)
    }

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'splitdocs-parts.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return { downloadAsZip }
}
