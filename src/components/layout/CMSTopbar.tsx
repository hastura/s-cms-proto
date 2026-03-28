// Icon assets from Figma design
const iconSearch  = 'https://www.figma.com/api/mcp/asset/a5e9873a-bc3b-4ace-9c7a-f00faece55ec'
const iconMoon    = 'https://www.figma.com/api/mcp/asset/ee32b616-2d94-42b0-8ce8-1182c6401c61'
const iconBell    = 'https://www.figma.com/api/mcp/asset/93771d22-e0b6-4717-9900-54ac0586241e'
const iconChevron = 'https://www.figma.com/api/mcp/asset/722df7bc-d755-4bcd-8197-51c60b293d6f'

interface CMSTopbarProps {
  breadcrumb: string
}

export function CMSTopbar({ breadcrumb }: CMSTopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 bg-surface px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px]">
        <span className="text-neutral-400">Strativy CMS</span>
        <span className="text-neutral-400">/</span>
        <span className="font-medium text-neutral-950">{breadcrumb}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="flex size-9 items-center justify-center rounded-[10px] hover:bg-neutral-100 transition-colors" aria-label="Search">
          <img src={iconSearch} alt="" width={18} height={18} />
        </button>

        {/* Theme toggle */}
        <button className="flex size-9 items-center justify-center rounded-[10px] hover:bg-neutral-100 transition-colors" aria-label="Toggle theme">
          <img src={iconMoon} alt="" width={18} height={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="flex size-9 items-center justify-center rounded-[10px] hover:bg-neutral-100 transition-colors" aria-label="Notifications">
            <img src={iconBell} alt="" width={18} height={18} />
          </button>
          <span className="absolute right-2 top-2 size-2 rounded-full bg-danger-600" aria-hidden="true" />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-neutral-200" />

        {/* User menu */}
        <button className="flex items-center gap-2" aria-label="User menu">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary-600">
            <span className="text-[12px] font-semibold text-white">AR</span>
          </div>
          <img src={iconChevron} alt="" width={14} height={14} />
        </button>
      </div>
    </header>
  )
}
