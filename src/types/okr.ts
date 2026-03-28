export type OkrLevel = 'company' | 'department' | 'team' | 'individual'
export type OkrStatus = 'on_track' | 'at_risk' | 'off_track'

export interface KeyResult {
  id: string
  title: string
  progress: number // 0–100
  unit: string
  current: number
  target: number
  ownerId: string
}

export interface Objective {
  id: string
  title: string
  description?: string
  level: OkrLevel
  status: OkrStatus
  progress: number // 0–100
  ownerId: string
  parentId?: string
  keyResults: KeyResult[]
  startDate: string
  endDate: string
}
