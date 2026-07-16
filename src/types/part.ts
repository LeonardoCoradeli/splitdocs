export interface Part {
  index: number
  filename: string
  content: string
  size: number
}

export interface PartPreview {
  index: number
  filename: string
  firstLine: string
  lastLine: string
  totalLines: number
}
