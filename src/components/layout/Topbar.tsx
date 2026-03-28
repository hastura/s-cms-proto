import { cn } from '@/lib/utils'

interface TopbarProps {
  title?: string
  className?: string
  children?: React.ReactNode
}

export function Topbar({ title, className, children }: TopbarProps) {
  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between border-b border-neutral-200 bg-surface px-6',
        className
      )}
    >
      {title && <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>}
      {children}
    </header>
  )
}
