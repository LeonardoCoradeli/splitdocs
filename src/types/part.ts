export interface Part {
  index: number
  filename: string
  content: string | Uint8Array
  size: number
}

export interface PartPreview {
  index: number
  filename: string
  firstLine: string
  lastLine: string
  totalLines: number
}
