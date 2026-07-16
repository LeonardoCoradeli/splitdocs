import type { FileType } from '@/types/file'

const SUPPORTED_EXTENSIONS: Record<string, FileType> = {
  '.txt': 'txt', '.md': 'md', '.srt': 'srt',
  '.vtt': 'vtt', '.ass': 'ass', '.csv': 'csv',
  '.tsv': 'tsv', '.pdf': 'pdf'
}

const MAX_FILE_SIZE = 50 * 1024 * 1024

export function detectFileType(filename: string): FileType | null {
  const ext = '.' + filename.split('.').pop()?.toLowerCase()
  return SUPPORTED_EXTENSIONS[ext] || null
}

export function validateFileSize(size: number): boolean {
  return size <= MAX_FILE_SIZE
}

export function validateFileType(filename: string): boolean {
  return detectFileType(filename) !== null
}

export function generatePartFilename(original: string, index: number, extension: string): string {
  const base = original.replace(/\.[^.]+$/, '')
  const padded = String(index + 1).padStart(3, '0')
  return `${base}_${padded}.${extension}`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
