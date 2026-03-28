import { cn } from '@/lib/utils'
import type { Objective } from '@/types/okr'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from './ProgressBar'

const statusLabel: Record<Objective['status'], string> = {
  on_track: 'On track',
  at_risk:  'At risk',
  off_track:'Off track',
}

interface OkrCardProps {
  objective: Objective
  className?: string
}

export function OkrCard({ objective, className }: OkrCardProps) {
  return (
    <div className={cn('rounded-lg border border-neutral-200 bg-surface p-4 shadow-xs', className)}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-900">{objective.title}</h3>
        <Badge variant={objective.status.replace('_', '-') as 'on-track' | 'at-risk' | 'off-track'}>
          {statusLabel[objective.status]}
        </Badge>
      </div>
      {objective.description && (
        <p className="mt-1 text-xs text-neutral-500">{objective.description}</p>
      )}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-neutral-500">Progress</span>
          <span className="text-xs font-medium text-neutral-700">{objective.progress}%</span>
        </div>
        <ProgressBar progress={objective.progress} status={objective.status} />
      </div>
    </div>
  )
}
