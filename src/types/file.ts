export type FileType = 'txt' | 'md' | 'srt' | 'vtt' | 'ass' | 'csv' | 'tsv' | 'pdf'

export interface FileInfo {
  name: string
  size: number
  type: FileType
  content: string | ArrayBuffer
}

export interface ParsedFile {
  type: FileType
  originalName: string
  content: string | ArrayBuffer
  blocks: Block[]
}

export interface Block {
  index: number
  text: string
  metadata?: Record<string, string | number>
}
