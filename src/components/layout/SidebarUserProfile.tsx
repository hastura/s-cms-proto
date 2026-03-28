import { IconSignOut } from '@/components/icons'

interface SidebarUserProfileProps {
  name: string
  role: string
  initials: string
  onSignOut?: () => void
}

export function SidebarUserProfile({ name, role, initials, onSignOut }: SidebarUserProfileProps) {
  return (
    <div className="border-t border-neutral-200 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-600">
          <span className="text-[13px] font-semibold text-white">{initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-neutral-950">{name}</p>
          <p className="text-[11px] uppercase tracking-[0.55px] text-neutral-400">{role}</p>
        </div>
      </div>
      <button
        onClick={onSignOut}
        className="mt-4 flex items-center gap-2 text-[13px] font-medium text-neutral-400 transition-colors hover:text-neutral-600"
        aria-label="Sign out"
      >
        <IconSignOut size={16} />
        Sign Out
      </button>
    </div>
  )
}
