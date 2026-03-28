import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarNavItemProps {
  href: string
  label: string
  icon: React.ReactNode
  isActive: boolean
}

export function SidebarNavItem({ href, label, icon, isActive }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 h-[37px] px-3 rounded-[10px] text-sm transition-colors',
        isActive
          ? 'bg-primary-600 text-white font-medium'
          : 'text-neutral-700 font-normal hover:bg-neutral-100'
      )}
    >
      <span className="shrink-0 size-[18px] flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
