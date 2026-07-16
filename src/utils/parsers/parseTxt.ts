import type { Block } from '@/types/file'

export function parseTxt(content: string): Block[] {
  return content.split('\n').map((text, index) => ({ index, text }))
}
