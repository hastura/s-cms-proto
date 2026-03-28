import { cn } from '@/lib/utils'
import type { OkrStatus } from '@/types/okr'

interface ProgressBarProps {
  progress: number // 0–100
  status?: OkrStatus
  className?: string
}

const statusTrackColor: Record<OkrStatus, string> = {
  on_track: 'bg-success-500',
  at_risk:  'bg-warning-500',
  off_track:'bg-danger-500',
}

export function ProgressBar({ progress, status = 'on_track', className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <div className={cn('h-2 w-full rounded-full bg-neutral-200', className)}>
      <div
        className={cn('h-2 rounded-full transition-all', statusTrackColor[status])}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
