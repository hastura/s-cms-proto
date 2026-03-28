'use client'

import { useState } from 'react'
import { CMSTopbar } from '@/components/layout/CMSTopbar'
import { cn } from '@/lib/utils'

type UserRole   = 'Super Admin' | 'Admin' | 'Member'
type UserStatus = 'active' | 'inactive'

interface TeamUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastActive: string
  initials: string
  avatarBg: string
  avatarColor: string
}

const initialUsers: TeamUser[] = [
  { id: '1', name: 'Alex Rivera',    email: 'alex@strativy.com',    role: 'Super Admin', status: 'active',   lastActive: '2 hours ago',   initials: 'AR', avatarBg: '#eff6ff', avatarColor: '#2563eb' },
  { id: '2', name: 'Maya Chen',      email: 'maya@strativy.com',    role: 'Admin',       status: 'active',   lastActive: '1 day ago',     initials: 'MC', avatarBg: '#f0fdf4', avatarColor: '#16a34a' },
  { id: '3', name: 'Jordan Kim',     email: 'jordan@strativy.com',  role: 'Member',      status: 'active',   lastActive: '3 days ago',    initials: 'JK', avatarBg: '#faf5ff', avatarColor: '#7c3aed' },
  { id: '4', name: 'Sam Wright',     email: 'sam@strativy.com',     role: 'Member',      status: 'active',   lastActive: '5 days ago',    initials: 'SW', avatarBg: '#fff7ed', avatarColor: '#ea580c' },
  { id: '5', name: 'Taylor Morgan',  email: 'taylor@strativy.com',  role: 'Member',      status: 'inactive', lastActive: '14 days ago',   initials: 'TM', avatarBg: '#f8fafc', avatarColor: '#94a3b8' },
]

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  active:   { label: 'Active',   className: 'bg-success-50 text-success-700' },
  inactive: { label: 'Inactive', className: 'bg-neutral-100 text-neutral-500' },
}

const roleColors: Record<UserRole, string> = {
  'Super Admin': 'bg-primary-50 text-primary-700',
  'Admin':       'bg-warning-50 text-warning-700',
  'Member':      'bg-neutral-100 text-neutral-600',
}

type ModalMode = 'invite' | 'edit' | 'delete' | null

interface FormState {
  name: string
  email: string
  role: UserRole
}

const emptyForm: FormState = { name: '', email: '', role: 'Member' }

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalMode>(null)
  const [editTarget, setEditTarget] = useState<TeamUser | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TeamUser | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  function openInvite() { setForm(emptyForm); setModal('invite') }

  function openEdit(user: TeamUser) {
    setEditTarget(user)
    setForm({ name: user.name, email: user.email, role: user.role })
    setModal('edit')
  }

  function openDelete(user: TeamUser) { setDeleteTarget(user); setModal('delete') }

  function closeModal() { setModal(null); setEditTarget(null); setDeleteTarget(null) }

  function handleSave() {
    if (!form.name || !form.email) return
    if (modal === 'invite') {
      const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      const newUser: TeamUser = {
        id: String(Date.now()),
        name: form.name,
        email: form.email,
        role: form.role,
        status: 'inactive',
        lastActive: 'Never',
        initials,
        avatarBg: '#f1f5f9',
        avatarColor: '#475569',
      }
      setUsers((prev) => [...prev, newUser])
    } else if (modal === 'edit' && editTarget) {
      setUsers((prev) =>
        prev.map((u) => u.id === editTarget.id ? { ...u, name: form.name, email: form.email, role: form.role } : u)
      )
    }
    closeModal()
  }

  function handleDelete() {
    if (!deleteTarget) return
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id))
    closeModal()
  }

  return (
    <>
      <CMSTopbar breadcrumb="User Management" />

      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.6px] text-neutral-950">User Management</h1>
              <p className="mt-1 text-sm text-neutral-500">Manage internal team members and their access roles.</p>
            </div>
            <button
              onClick={openInvite}
              className="flex items-center gap-2 rounded-[10px] bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Invite User
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
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[39px] w-full rounded-[10px] border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    {['User', 'Role', 'Status', 'Last Active', 'Actions'].map((h, i) => (
                      <th key={h} className={cn('px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-400', i === 4 ? 'text-right' : 'text-left')}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => {
                    const status = statusConfig[user.status]
                    return (
                      <tr key={user.id} className="border-b border-neutral-200 last:border-0 transition-colors hover:bg-neutral-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold" style={{ backgroundColor: user.avatarBg, color: user.avatarColor }}>
                              {user.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-neutral-950">{user.name}</p>
                              <p className="truncate text-xs text-neutral-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', roleColors[user.role])}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-neutral-500">{user.lastActive}</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(user)}
                              className="inline-flex size-8 items-center justify-center rounded-[8px] text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                              aria-label={`Edit ${user.name}`}
                            >
                              <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M14.5 2.5a2.121 2.121 0 013 3L6 17H2v-4L14.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <button
                              onClick={() => openDelete(user)}
                              className="inline-flex size-8 items-center justify-center rounded-[8px] text-neutral-400 transition-colors hover:bg-danger-50 hover:text-danger-600"
                              aria-label={`Delete ${user.name}`}
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
                      <td colSpan={5} className="px-5 py-12 text-center text-sm text-neutral-400">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3.5">
              <p className="text-[13px] text-neutral-400">Showing {filtered.length} of {users.length} users</p>
              <div className="flex items-center gap-1">
                <button className="flex size-8 items-center justify-center rounded-[10px] bg-primary-600 text-[13px] font-medium text-white" aria-current="page">1</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Invite / Edit Modal */}
      {(modal === 'invite' || modal === 'edit') && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4" onClick={closeModal}>
          <div className="w-full max-w-[440px] rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-neutral-950">
              {modal === 'invite' ? 'Invite Team Member' : 'Edit User'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {modal === 'invite'
                ? 'An invitation email will be sent to the user.'
                : 'Update this member\'s details and role.'}
            </p>

            <div className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-neutral-700">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="h-10 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-neutral-700">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@strativy.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="h-10 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-neutral-700">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
                  className="h-10 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <option value="Super Admin">Super Admin (Invite Admin &amp; Member + CRUD)</option>
                  <option value="Admin">Admin (CRUD)</option>
                  <option value="Member">Member (Read only)</option>
                </select>
              </div>

              {modal === 'invite' && (
                <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                  <p className="text-[13px] text-primary-700">
                    ✉ A team invitation email will be sent to this address with a link to set up their account.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                Cancel
              </button>
              <button onClick={handleSave} className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                {modal === 'invite' ? 'Send Invitation' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modal === 'delete' && deleteTarget && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4" onClick={closeModal}>
          <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex size-10 items-center justify-center rounded-full bg-danger-50">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-danger-600">
                <path d="M3 6h14M8 6V4h4v2M6 6v10a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-neutral-950">Remove User</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Are you sure you want to remove <span className="font-medium text-neutral-700">{deleteTarget.name}</span>? They will lose access immediately.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                Cancel
              </button>
              <button onClick={handleDelete} className="rounded-md bg-danger-600 px-4 py-2 text-sm font-medium text-white hover:bg-danger-700">
                Remove User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
