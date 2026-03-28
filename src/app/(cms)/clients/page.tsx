'use client'

import { useState } from 'react'
import { CMSTopbar } from '@/components/layout/CMSTopbar'
import { cn } from '@/lib/utils'

type ClientStatus = 'active' | 'pending' | 'inactive'
type ClientTier   = 'Enterprise' | 'Professional' | 'Startup'

interface Client {
  id: string
  name: string
  email: string
  industry: string
  status: ClientStatus
  tier: ClientTier
  revenue: string
  initial: string
  avatarBg: string
  avatarColor: string
}

const initialClients: Client[] = [
  { id: '1', name: 'Stellar Tech Solutions', email: 'sarah@stellar.io',    industry: 'Fintech',       status: 'active',   tier: 'Enterprise',    revenue: '$1.2M', initial: 'S', avatarBg: '#eff6ff', avatarColor: '#2563eb' },
  { id: '2', name: 'CloudPeak Logistics',    email: 'marcus@cloudpeak.com', industry: 'Supply Chain',  status: 'pending',  tier: 'Professional',  revenue: '$450k', initial: 'C', avatarBg: '#fff7ed', avatarColor: '#ea580c' },
  { id: '3', name: 'Vertex Health',          email: 'admin@vertex.med',     industry: 'Healthcare',    status: 'active',   tier: 'Professional',  revenue: '$890k', initial: 'V', avatarBg: '#f0fdf4', avatarColor: '#16a34a' },
  { id: '4', name: 'Aura Media',            email: 'hello@auramedia.co',   industry: 'Marketing',     status: 'inactive', tier: 'Startup',       revenue: '$120k', initial: 'A', avatarBg: '#faf5ff', avatarColor: '#7c3aed' },
  { id: '5', name: 'Quantum Retail',        email: 'dev@quantum.shop',     industry: 'E-commerce',    status: 'active',   tier: 'Enterprise',    revenue: '$2.1M', initial: 'Q', avatarBg: '#eff6ff', avatarColor: '#2563eb' },
  { id: '6', name: 'NovaStar AI',           email: 'team@novastar.ai',     industry: 'AI / ML',       status: 'active',   tier: 'Enterprise',    revenue: '$3.4M', initial: 'N', avatarBg: '#fff7ed', avatarColor: '#ea580c' },
]

const statusConfig: Record<ClientStatus, { label: string; className: string }> = {
  active:   { label: 'Active',   className: 'bg-success-50 text-success-700' },
  pending:  { label: 'Pending',  className: 'bg-warning-50 text-warning-700' },
  inactive: { label: 'Inactive', className: 'bg-neutral-100 text-neutral-500' },
}

type ModalMode = 'add' | 'edit' | null

interface FormState {
  name: string
  email: string
  industry: string
  tier: ClientTier
  status: ClientStatus
}

const emptyForm: FormState = { name: '', email: '', industry: '', tier: 'Startup', status: 'active' }

export default function ClientsPage() {
  const [clients, setClients] = useState(initialClients)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalMode>(null)
  const [editTarget, setEditTarget] = useState<Client | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null)

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() {
    setForm(emptyForm)
    setModal('add')
  }

  function openEdit(client: Client) {
    setEditTarget(client)
    setForm({ name: client.name, email: client.email, industry: client.industry, tier: client.tier, status: client.status })
    setModal('edit')
  }

  function closeModal() {
    setModal(null)
    setEditTarget(null)
  }

  function handleSave() {
    if (!form.name || !form.email) return
    if (modal === 'add') {
      const initial = form.name.charAt(0).toUpperCase()
      const colors = [
        { bg: '#eff6ff', color: '#2563eb' },
        { bg: '#fff7ed', color: '#ea580c' },
        { bg: '#f0fdf4', color: '#16a34a' },
        { bg: '#faf5ff', color: '#7c3aed' },
      ]
      const c = colors[clients.length % colors.length]
      const newClient: Client = {
        id: String(Date.now()),
        name: form.name,
        email: form.email,
        industry: form.industry || '—',
        status: form.status,
        tier: form.tier,
        revenue: '—',
        initial,
        avatarBg: c.bg,
        avatarColor: c.color,
      }
      setClients((prev) => [...prev, newClient])
    } else if (modal === 'edit' && editTarget) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === editTarget.id
            ? { ...c, name: form.name, email: form.email, industry: form.industry, tier: form.tier, status: form.status }
            : c
        )
      )
    }
    closeModal()
  }

  function handleDelete() {
    if (!deleteTarget) return
    setClients((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  return (
    <>
      <CMSTopbar breadcrumb="Clients" />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.6px] text-neutral-950">Clients</h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage your client portfolio and their onboarding status.
              </p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-[10px] bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Add Client
            </button>
          </div>

          {/* Table card */}
          <div className="rounded-[14px] border border-neutral-200 bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-neutral-200 p-4">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search clients by name, industry..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[39px] w-full rounded-[10px] border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <button className="flex h-[39px] items-center gap-2 rounded-[10px] border border-neutral-200 px-3.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M7 10h6M9 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Filter
              </button>
              <button className="flex h-[39px] items-center gap-2 rounded-[10px] border border-neutral-200 px-3.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 3v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Export
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    {['Client', 'Industry', 'Status', 'Tier', 'Revenue', 'Actions'].map((h, i) => (
                      <th key={h} className={cn('px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400', i === 5 ? 'text-right' : 'text-left')}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client) => {
                    const status = statusConfig[client.status]
                    return (
                      <tr key={client.id} className="border-b border-neutral-200 last:border-0 transition-colors hover:bg-neutral-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold" style={{ backgroundColor: client.avatarBg, color: client.avatarColor }}>
                              {client.initial}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-neutral-950">{client.name}</p>
                              <p className="truncate text-xs text-neutral-400">{client.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-neutral-600">{client.industry}</td>
                        <td className="px-5 py-4">
                          <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-neutral-600">{client.tier}</td>
                        <td className="px-5 py-4 text-sm font-medium text-neutral-950">{client.revenue}</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(client)}
                              className="inline-flex size-8 items-center justify-center rounded-[8px] text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                              aria-label={`Edit ${client.name}`}
                            >
                              <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M14.5 2.5a2.121 2.121 0 013 3L6 17H2v-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(client)}
                              className="inline-flex size-8 items-center justify-center rounded-[8px] text-neutral-400 transition-colors hover:bg-danger-50 hover:text-danger-600"
                              aria-label={`Delete ${client.name}`}
                            >
                              <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M8 6V4h4v2M6 6v10a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-sm text-neutral-400">
                        No clients found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3.5">
              <p className="text-[13px] text-neutral-400">Showing {filtered.length} of {clients.length} clients</p>
              <div className="flex items-center gap-1">
                {[1].map((page) => (
                  <button key={page} className="flex size-8 items-center justify-center rounded-[10px] bg-primary-600 text-[13px] font-medium text-white" aria-current="page">
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4" onClick={closeModal}>
          <div className="w-full max-w-[480px] rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-neutral-950">
              {modal === 'add' ? 'Add New Client' : 'Edit Client'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {modal === 'add' ? 'Fill in the details to onboard a new client.' : 'Update the client information below.'}
            </p>

            <div className="mt-5 flex flex-col gap-4">
              {[
                { label: 'Company Name', key: 'name', placeholder: 'e.g. Stellar Tech Solutions' },
                { label: 'Email Address', key: 'email', placeholder: 'e.g. admin@company.com' },
                { label: 'Industry',     key: 'industry', placeholder: 'e.g. Fintech' },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-neutral-700">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={form[key as keyof FormState]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="h-10 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-neutral-700">Tier</label>
                  <select
                    value={form.tier}
                    onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value as ClientTier }))}
                    className="h-10 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option>Enterprise</option>
                    <option>Professional</option>
                    <option>Startup</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-neutral-700">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ClientStatus }))}
                    className="h-10 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {modal === 'add' && (
                <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                  <p className="text-[13px] text-primary-700">
                    ✉ An activation email will be sent to the client&apos;s email address after saving.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50">
                Cancel
              </button>
              <button onClick={handleSave} className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                {modal === 'add' ? 'Add Client' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4" onClick={() => setDeleteTarget(null)}>
          <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex size-10 items-center justify-center rounded-full bg-danger-50">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-danger-600">
                <path d="M3 6h14M8 6V4h4v2M6 6v10a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-neutral-950">Remove Client</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Are you sure you want to remove <span className="font-medium text-neutral-700">{deleteTarget.name}</span>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50">
                Cancel
              </button>
              <button onClick={handleDelete} className="rounded-md bg-danger-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-danger-700">
                Remove Client
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
