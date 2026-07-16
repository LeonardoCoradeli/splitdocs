export type CriteriaType = 'bySize' | 'byMarker' | 'byTime' | 'byColumns' | 'byParts'

export interface SizeCriteria {
  type: 'bySize'
  unit: 'lines' | 'words' | 'chars'
  value: number
}

export interface MarkerCriteria {
  type: 'byMarker'
  marker: 'heading' | 'blankLine' | 'timestamp'
}

export interface TimeCriteria {
  type: 'byTime'
  unit: 'seconds' | 'minutes'
  value: number
}

export interface ColumnsCriteria {
  type: 'byColumns'
  columns: string[]
}

export interface PartsCriteria {
  type: 'byParts'
  count: number
}

export type Criteria = SizeCriteria | MarkerCriteria | TimeCriteria | ColumnsCriteria | PartsCriteria

export type OutputFormat = 'original' | 'txt' | 'md'
