export const EXECUTION_WEIGHT = 0.8
export const LEADERSHIP_WEIGHT = 0.2

export interface PerformanceScore {
  executionScore: number
  leadershipScore: number
  total: number
}

export interface ReviewCycle {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'draft' | 'active' | 'closed'
}
