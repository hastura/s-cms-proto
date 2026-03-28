import { IconBrand } from '@/components/icons'
import { SidebarNav } from './SidebarNav'
import { SidebarUserProfile } from './SidebarUserProfile'

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-neutral-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-neutral-200 px-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-600">
          <IconBrand size={20} className="text-white" />
        </div>
        <span className="text-[15px] font-semibold tracking-[-0.375px] text-neutral-950">
          Strativy CMS
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>

      {/* User profile */}
      <SidebarUserProfile
        name="Alex Rivera"
        role="Super Admin"
        initials="AR"
      />
    </aside>
  )
}
