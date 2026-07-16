import { validateFileType, validateFileSize, detectFileType } from '@/utils/fileHelpers'
import type { FileType } from '@/types/file'

const TEXT_TYPES: FileType[] = ['txt', 'md', 'srt', 'vtt', 'ass', 'csv', 'tsv']

export function useFileReader() {
  function readFile(file: File): Promise<{ content: string | ArrayBuffer; type: FileType; name: string; size: number }> {
    return new Promise((resolve, reject) => {
      if (!validateFileType(file.name)) {
        reject(new Error('Formato de arquivo não suportado.'))
        return
      }

      if (!validateFileSize(file.size)) {
        reject(new Error('Arquivo muito grande. Limite máximo de 50MB.'))
        return
      }

      const type = detectFileType(file.name)!
      const reader = new FileReader()

      reader.onload = () => {
        resolve({
          content: reader.result as string | ArrayBuffer,
          type,
          name: file.name,
          size: file.size
        })
      }

      reader.onerror = () => {
        reject(new Error('Erro ao ler o arquivo.'))
      }

      if (TEXT_TYPES.includes(type)) {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  function readText(text: string): { content: string; type: FileType; name: string; size: number } {
    return {
      content: text,
      type: 'txt',
      name: 'texto_colado.txt',
      size: text.length
    }
  }

  return { readFile, readText }
}
