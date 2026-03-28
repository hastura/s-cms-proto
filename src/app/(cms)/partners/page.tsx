import { CMSTopbar } from '@/components/layout/CMSTopbar'
import { cn } from '@/lib/utils'

// Icon assets from Figma design
const iconPlus   = 'https://www.figma.com/api/mcp/asset/415501eb-2361-4056-9d30-d789d62b38ad'
const iconFilter = 'https://www.figma.com/api/mcp/asset/b4bddcdc-2eb7-42c7-9c07-b19d723e9394'
const iconExport = 'https://www.figma.com/api/mcp/asset/e2ed8bee-a069-43cd-bec4-10340790fc51'
const iconSearch = 'https://www.figma.com/api/mcp/asset/c0320d34-98b4-4250-b7c9-7f43be6e4d4b'
const iconMore   = 'https://www.figma.com/api/mcp/asset/5b818e79-720f-4ec0-8e90-b93a8ba8c710'
const iconPrev   = 'https://www.figma.com/api/mcp/asset/3a754e82-4a67-4ce2-86c7-1b1fd3d5ff1a'
const iconNext   = 'https://www.figma.com/api/mcp/asset/9cae63d2-95b8-4b5b-a212-3562995a4059'

type PartnerStatus = 'active' | 'pending' | 'inactive'
type PartnerTier   = 'Enterprise' | 'Professional' | 'Startup'

interface Partner {
  id: string
  name: string
  email: string
  industry: string
  status: PartnerStatus
  tier: PartnerTier
  revenue: string
  initial: string
  avatarBg: string
  avatarColor: string
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'Stellar Tech Solutions',
    email: 'sarah@stellar.io',
    industry: 'Fintech',
    status: 'active',
    tier: 'Enterprise',
    revenue: '$1.2M',
    initial: 'S',
    avatarBg: '#eff6ff',
    avatarColor: '#2563eb',
  },
  {
    id: '2',
    name: 'CloudPeak Logistics',
    email: 'marcus@cloudpeak.com',
    industry: 'Supply Chain',
    status: 'pending',
    tier: 'Professional',
    revenue: '$450k',
    initial: 'C',
    avatarBg: '#fff7ed',
    avatarColor: '#ea580c',
  },
  {
    id: '3',
    name: 'Vertex Health',
    email: 'admin@vertex.med',
    industry: 'Healthcare',
    status: 'active',
    tier: 'Professional',
    revenue: '$890k',
    initial: 'V',
    avatarBg: '#f0fdf4',
    avatarColor: '#16a34a',
  },
  {
    id: '4',
    name: 'Aura Media',
    email: 'hello@auramedia.co',
    industry: 'Marketing',
    status: 'inactive',
    tier: 'Startup',
    revenue: '$120k',
    initial: 'A',
    avatarBg: '#faf5ff',
    avatarColor: '#7c3aed',
  },
  {
    id: '5',
    name: 'Quantum Retail',
    email: 'dev@quantum.shop',
    industry: 'E-commerce',
    status: 'active',
    tier: 'Enterprise',
    revenue: '$2.1M',
    initial: 'Q',
    avatarBg: '#eff6ff',
    avatarColor: '#2563eb',
  },
  {
    id: '6',
    name: 'NovaStar AI',
    email: 'team@novastar.ai',
    industry: 'AI / ML',
    status: 'active',
    tier: 'Enterprise',
    revenue: '$3.4M',
    initial: 'N',
    avatarBg: '#fff7ed',
    avatarColor: '#ea580c',
  },
]

const statusConfig: Record<PartnerStatus, { label: string; className: string }> = {
  active:   { label: 'Active',   className: 'bg-success-50 text-success-700' },
  pending:  { label: 'Pending',  className: 'bg-warning-50 text-warning-700' },
  inactive: { label: 'Inactive', className: 'bg-neutral-100 text-neutral-500' },
}

export default function PartnersPage() {
  return (
    <>
      <CMSTopbar breadcrumb="Partners" />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-[-0.6px] text-neutral-950">Partners</h1>
              <p className="text-sm text-neutral-600">
                Manage your external partner ecosystem and their status.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-[10px] bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 active:bg-primary-800 transition-colors">
              <img src={iconPlus} alt="" width={16} height={16} className="brightness-0 invert" />
              Add Partner
            </button>
          </div>

          {/* Table card */}
          <div className="rounded-[14px] border border-neutral-200 bg-surface">
            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-neutral-200 p-4">
              {/* Search */}
              <div className="relative flex-1">
                <img
                  src={iconSearch}
                  alt=""
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search partners by name, industry..."
                  className="h-[39px] w-full rounded-[10px] border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1"
                />
              </div>

              {/* Filter */}
              <button className="flex items-center gap-2 rounded-[10px] border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors h-[39px]">
                <img src={iconFilter} alt="" width={16} height={16} />
                Filter
              </button>

              {/* Export */}
              <button className="flex items-center gap-2 rounded-[10px] border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors h-[39px]">
                <img src={iconExport} alt="" width={16} height={16} />
                Export
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400">
                      Partner
                    </th>
                    <th className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400">
                      Industry
                    </th>
                    <th className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400">
                      Status
                    </th>
                    <th className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400">
                      Tier
                    </th>
                    <th className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400">
                      Revenue
                    </th>
                    <th className="px-5 py-2.5 text-right text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner) => {
                    const status = statusConfig[partner.status]
                    return (
                      <tr key={partner.id} className="border-b border-neutral-200 last:border-0 hover:bg-neutral-50 transition-colors">
                        {/* Partner */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                              style={{ backgroundColor: partner.avatarBg, color: partner.avatarColor }}
                            >
                              {partner.initial}
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="text-sm font-medium text-neutral-950 truncate">
                                {partner.name}
                              </span>
                              <span className="text-xs text-neutral-400 truncate">
                                {partner.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Industry */}
                        <td className="px-5 py-4 text-sm text-neutral-600">
                          {partner.industry}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
                            {status.label}
                          </span>
                        </td>

                        {/* Tier */}
                        <td className="px-5 py-4 text-sm text-neutral-600">
                          {partner.tier}
                        </td>

                        {/* Revenue */}
                        <td className="px-5 py-4 text-sm font-medium text-neutral-950">
                          {partner.revenue}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <button
                            className="inline-flex size-8 items-center justify-center rounded-[10px] hover:bg-neutral-100 transition-colors"
                            aria-label={`Actions for ${partner.name}`}
                          >
                            <img src={iconMore} alt="" width={16} height={16} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3.5">
              <p className="text-[13px] text-neutral-400">
                Showing 6 of 6 partners
              </p>
              <div className="flex items-center gap-1">
                <button className="flex size-8 items-center justify-center rounded-[10px] hover:bg-neutral-100 transition-colors" aria-label="Previous page">
                  <img src={iconPrev} alt="" width={16} height={16} />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={cn(
                      'flex size-8 items-center justify-center rounded-[10px] text-[13px] font-medium transition-colors',
                      page === 1
                        ? 'bg-primary-600 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    )}
                    aria-label={`Page ${page}`}
                    aria-current={page === 1 ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}
                <button className="flex size-8 items-center justify-center rounded-[10px] hover:bg-neutral-100 transition-colors" aria-label="Next page">
                  <img src={iconNext} alt="" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
