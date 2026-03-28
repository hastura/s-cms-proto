'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type EmailType = 'password-reset' | 'account-activation' | 'team-invitation'

interface EmailMeta {
  id: EmailType
  from: string
  subject: string
  preview: string
  time: string
  unread: boolean
  tag: string
  tagColor: string
}

const emails: EmailMeta[] = [
  {
    id: 'password-reset',
    from: 'Strativy Security',
    subject: 'Reset Your Password',
    preview: 'We received a request to reset the password for your Strativy account...',
    time: '9:00 AM',
    unread: true,
    tag: 'Security',
    tagColor: 'bg-warning-50 text-warning-700',
  },
  {
    id: 'account-activation',
    from: 'Strativy Platform',
    subject: 'Activate Your Strativy Account',
    preview: 'Great news — your company has been onboarded onto the Strativy platform...',
    time: '8:45 AM',
    unread: true,
    tag: 'Onboarding',
    tagColor: 'bg-success-50 text-success-700',
  },
  {
    id: 'team-invitation',
    from: 'Alex Rivera via Strativy',
    subject: "You've Been Invited!",
    preview: 'Alex Rivera has invited you to join the Strativy Internal Portal as a Super Admin...',
    time: 'Yesterday',
    unread: false,
    tag: 'Invitation',
    tagColor: 'bg-primary-50 text-primary-700',
  },
]

function EmailPasswordReset() {
  return (
    <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary-600 px-8 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
          <span className="text-[14px] font-bold text-white">S</span>
        </div>
        <span className="text-[18px] font-semibold text-white">Strativy</span>
      </div>

      {/* Body */}
      <div className="px-10 py-8">
        <div className="h-1 -mx-10 -mt-8 mb-8 bg-primary-600" />
        {/* Icon */}
        <div className="mx-auto mb-5 flex size-[72px] items-center justify-center rounded-full bg-neutral-100">
          <span className="text-[32px]">🔒</span>
        </div>
        <h1 className="text-center text-[24px] font-bold text-neutral-950">Reset Your Password</h1>
        <p className="mt-2 text-center text-[15px] text-neutral-500">You requested a password reset</p>

        <hr className="my-6 border-neutral-200" />

        <p className="text-[15px] font-semibold text-neutral-950">Hi Alex Rivera,</p>
        <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
          We received a request to reset the password for your Strativy account. Click the button below to create a new password. If you did not make this request, you can safely ignore this email — your password will not be changed.
        </p>

        {/* CTA */}
        <div className="my-6 text-center">
          <Link
            href="/reset-password"
            className="inline-flex items-center gap-2 rounded-[10px] bg-primary-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary-600/30 transition-colors hover:bg-primary-700"
          >
            → Reset My Password
          </Link>
          <p className="mt-3 text-[12px] text-neutral-400">⏱ This link expires in 30 minutes.</p>
        </div>

        <hr className="my-6 border-neutral-200" />

        <p className="text-[13px] font-semibold text-neutral-950">Security tips for your account:</p>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            'Never share your password with anyone, including Strativy staff.',
            "Use a unique password that you don't use for other services.",
            'Enable two-factor authentication for extra security.',
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-[13px] text-neutral-600">
              <span className="mt-0.5 text-success-600">✓</span>
              {tip}
            </li>
          ))}
        </ul>

        <hr className="my-6 border-neutral-200" />

        <div className="rounded-lg border border-warning-200 bg-warning-50 px-4 py-3">
          <p className="text-[12px] leading-relaxed text-warning-800">
            🔒 <strong>Didn&apos;t request this?</strong><br/>
            If you weren&apos;t expecting this email, your account is safe. Please ignore this email or contact support@strativy.com.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-10 py-6">
        <p className="text-[11px] text-neutral-400">Strativy · Jl. Sudirman No.1, Jakarta Selatan 12190</p>
        <p className="mt-1 text-[11px] text-primary-600">Need help? Contact us at support@strativy.com</p>
        <p className="mt-1 text-[11px] text-neutral-300">© 2026 Strativy. All rights reserved.</p>
      </div>
    </div>
  )
}

function EmailAccountActivation() {
  return (
    <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary-600 px-8 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
          <span className="text-[14px] font-bold text-white">S</span>
        </div>
        <span className="text-[18px] font-semibold text-white">Strativy</span>
      </div>

      {/* Body */}
      <div className="px-10 py-8">
        <div className="h-1 -mx-10 -mt-8 mb-8 bg-primary-600" />
        {/* Icon */}
        <div className="mx-auto mb-5 flex size-[72px] items-center justify-center rounded-full bg-primary-50">
          <span className="text-[32px] text-primary-600">✉</span>
        </div>
        <h1 className="text-center text-[24px] font-bold text-neutral-950">Activate Your Strativy Account</h1>
        <p className="mt-2 text-center text-[15px] text-neutral-500">You&apos;ve been onboarded as a partner</p>

        <hr className="my-6 border-neutral-200" />

        <p className="text-[15px] font-semibold text-neutral-950">Hi PT Stellar Tech Solutions,</p>
        <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
          Great news — your company has been successfully onboarded onto the Strativy platform by our admin team. To get started, you need to activate your account using the secure link below.
        </p>

        {/* CTA */}
        <div className="my-6 text-center">
          <Link
            href="/activate"
            className="inline-flex items-center gap-2 rounded-[10px] bg-primary-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary-600/30 transition-colors hover:bg-primary-700"
          >
            → Activate My Account
          </Link>
          <p className="mt-3 text-[12px] text-neutral-400">⏱ This link expires in 24 hours.</p>
        </div>

        <hr className="my-6 border-neutral-200" />

        <p className="text-[13px] font-semibold text-neutral-950">What happens after activation?</p>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            "You'll be taken to the Strativy dashboard to set your password.",
            'Your team members can then be invited to join your workspace.',
            'All OKRs and performance reviews will be ready to configure.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13px] text-neutral-600">
              <span className="mt-0.5 text-success-600">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <hr className="my-6 border-neutral-200" />

        <div className="rounded-lg border border-warning-200 bg-warning-50 px-4 py-3">
          <p className="text-[12px] leading-relaxed text-warning-800">
            🔒 <strong>Didn&apos;t request this?</strong><br/>
            If you weren&apos;t expecting this email, you can safely ignore it. No account will be created until the link is clicked.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-10 py-6 text-center">
        <p className="text-[11px] text-neutral-400">Strativy · Jl. Sudirman No.1, Jakarta Selatan 12190</p>
        <p className="mt-1 text-[11px] text-primary-600">Need help? Contact us at support@strativy.com</p>
        <p className="mt-1 text-[11px] text-neutral-300">© 2026 Strativy. All rights reserved.</p>
      </div>
    </div>
  )
}

function EmailTeamInvitation() {
  return (
    <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary-600 px-8 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/20">
          <span className="text-[14px] font-bold text-white">S</span>
        </div>
        <span className="text-[18px] font-semibold text-white">Strativy</span>
      </div>

      {/* Body */}
      <div className="px-10 py-8 text-center">
        <div className="h-1 -mx-10 -mt-8 mb-8 bg-primary-600" />
        {/* Icon */}
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary-50">
          <span className="text-[26px] text-primary-600">✉</span>
        </div>
        <h1 className="text-[24px] font-bold text-neutral-950">You&apos;ve Been Invited!</h1>

        <hr className="my-6 border-neutral-200" />

        <p className="text-[15px] font-semibold text-neutral-950">Hi, John Doe 👋</p>
        <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
          Alex Rivera has invited you to join the Strativy Internal Portal as a Super Admin. You&apos;ll be able to manage clients, team members, OKR performance, and company settings. Click the button below to accept your invitation and set up your account.
        </p>

        {/* CTA */}
        <div className="my-6">
          <Link
            href="/activate"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary-600/35 transition-colors hover:bg-primary-700"
          >
            → Accept Invitation
          </Link>
          <p className="mt-3 text-[12px] text-neutral-400">⏱ This invitation link expires in 72 hours.</p>
        </div>

        <hr className="my-6 border-neutral-200" />

        <div className="text-left">
          <p className="text-[13px] font-semibold text-neutral-950">What you can do as Super Admin:</p>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              'Manage all client accounts, contracts, and billing',
              'Invite and manage internal team members',
              'Review OKR performance reports and analytics',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-neutral-600">
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-success-50 text-[10px] font-bold text-success-600">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-warning-200 bg-warning-50 px-4 py-3 text-left">
          <p className="text-[12px] leading-relaxed text-warning-800">
            🔒 Security tip: This invitation was sent by Alex Rivera (alex@strativy.com). If you did not expect this, please ignore this email or contact support.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 bg-neutral-50 px-10 py-6 text-center">
        <p className="text-[11px] text-neutral-400">Strativy · Jl. Sudirman No. 1, Jakarta</p>
        <p className="mt-1 text-[11px] text-primary-600">support@strativy.com</p>
        <p className="mt-1 text-[11px] text-neutral-300">© 2025 Strativy. All rights reserved.</p>
      </div>
    </div>
  )
}

export default function EmailPreviewPage() {
  const [selected, setSelected] = useState<EmailType>('password-reset')

  const selectedMeta = emails.find((e) => e.id === selected)!

  return (
    <div className="flex h-screen flex-col bg-neutral-100">
      {/* Top bar — simulates browser address bar */}
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-danger-400" />
          <div className="size-3 rounded-full bg-warning-400" />
          <div className="size-3 rounded-full bg-success-400" />
        </div>
        <div className="flex h-6 flex-1 items-center rounded bg-neutral-200 px-3 text-[12px] text-neutral-500">
          📧 inbox.strativy-mail.com — Email Preview Simulation
        </div>
        <Link href="/login" className="text-[12px] text-neutral-400 hover:text-neutral-600">
          ← Back to App
        </Link>
      </div>

      {/* Gmail-like layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="flex w-[260px] shrink-0 flex-col border-r border-neutral-200 bg-white">
          {/* Logo */}
          <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-4">
            <span className="text-xl">✉</span>
            <span className="text-[15px] font-semibold text-neutral-900">Strativy Mail</span>
          </div>

          {/* Compose */}
          <div className="px-3 pt-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 py-2.5 text-[13px] font-medium text-white shadow hover:bg-primary-700">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Compose
            </button>
          </div>

          {/* Folders */}
          <nav className="mt-3 flex flex-col gap-0.5 px-2">
            {[
              { icon: '📥', label: 'Inbox', count: 2 },
              { icon: '⭐', label: 'Starred' },
              { icon: '📤', label: 'Sent' },
              { icon: '📝', label: 'Drafts' },
              { icon: '🗑', label: 'Trash' },
            ].map((f) => (
              <button
                key={f.label}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors',
                  f.label === 'Inbox' ? 'bg-primary-50 font-medium text-primary-700' : 'text-neutral-600 hover:bg-neutral-100'
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span>{f.icon}</span>
                  {f.label}
                </span>
                {f.count && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Email list */}
        <div className="flex w-[320px] shrink-0 flex-col border-r border-neutral-200 bg-white">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <h2 className="text-[14px] font-semibold text-neutral-900">Inbox</h2>
            <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[11px] font-medium text-primary-700">
              {emails.filter(e => e.unread).length} unread
            </span>
          </div>

          {/* Email rows */}
          <div className="flex flex-col overflow-y-auto">
            {emails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelected(email.id)}
                className={cn(
                  'flex flex-col gap-1 border-b border-neutral-100 px-4 py-4 text-left transition-colors',
                  selected === email.id
                    ? 'bg-primary-50'
                    : 'hover:bg-neutral-50',
                  email.unread && 'border-l-2 border-l-primary-600'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('text-[13px]', email.unread ? 'font-semibold text-neutral-950' : 'font-medium text-neutral-600')}>
                    {email.from}
                  </span>
                  <span className="text-[11px] text-neutral-400">{email.time}</span>
                </div>
                <p className={cn('text-[13px]', email.unread ? 'font-medium text-neutral-800' : 'text-neutral-500')}>
                  {email.subject}
                </p>
                <p className="truncate text-[12px] text-neutral-400">{email.preview}</p>
                <span className={cn('mt-1 self-start rounded-full px-2 py-0.5 text-[10px] font-medium', email.tagColor)}>
                  {email.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Email content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-neutral-100">
          {/* Email meta header */}
          <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6 py-3">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[15px] font-semibold text-neutral-950">{selectedMeta.subject}</h3>
              <p className="text-[12px] text-neutral-500">
                From: <span className="font-medium">{selectedMeta.from}</span>
                {' '}· To: <span className="font-medium">you@company.com</span>
                {' '}· {selectedMeta.time}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-medium', selectedMeta.tagColor)}>
                {selectedMeta.tag}
              </span>
              {selected === 'password-reset' && (
                <p className="text-[12px] text-neutral-400">
                  💡 Click <strong>Reset My Password</strong> to simulate the flow
                </p>
              )}
              {selected === 'account-activation' && (
                <p className="text-[12px] text-neutral-400">
                  💡 Click <strong>Activate My Account</strong> to simulate the flow
                </p>
              )}
              {selected === 'team-invitation' && (
                <p className="text-[12px] text-neutral-400">
                  💡 Click <strong>Accept Invitation</strong> to simulate the flow
                </p>
              )}
            </div>
          </div>

          {/* Scrollable email body */}
          <div className="flex-1 overflow-y-auto p-8">
            {selected === 'password-reset' && <EmailPasswordReset />}
            {selected === 'account-activation' && <EmailAccountActivation />}
            {selected === 'team-invitation' && <EmailTeamInvitation />}
          </div>
        </div>
      </div>
    </div>
  )
}
