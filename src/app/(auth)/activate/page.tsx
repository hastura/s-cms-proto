'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ActivateView = 'form' | 'success'

function LeftPanel() {
  const features = [
    'Client portfolio & contract tracking',
    'Team access control & role management',
    'OKR reviews & performance reporting',
  ]
  return (
    <div
      className="hidden w-[480px] shrink-0 flex-col justify-between p-14 lg:flex"
      style={{ background: 'linear-gradient(to bottom, #153db7, #1e51df)' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-[8px] bg-white/20">
          <span className="text-[18px] font-bold text-white">S</span>
        </div>
        <span className="text-[18px] font-semibold text-white">Strativy</span>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-[36px] font-bold leading-[1.3] text-white">
            {`Your Team's`}
            <br />
            Operations Hub.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Built for the Strativy team — manage clients, performance, and OKR
            execution from one place.
          </p>
        </div>
        <ul className="flex flex-col gap-3.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                <span className="text-[10px] font-bold text-white">✓</span>
              </div>
              <span className="text-[14px] font-medium text-white/85">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-[12px] text-white/45">© 2026 Strativy Inc.</p>
    </div>
  )
}

export default function ActivatePage() {
  const [view, setView] = useState<ActivateView>('form')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})

  // Mocked data (in a real app these come from the token in the URL)
  const invitedBy = 'Alex Rivera'
  const accountEmail = 'john.doe@company.com'

  function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    const next: { password?: string; confirm?: string } = {}
    if (!password) next.password = 'Password is required.'
    else if (password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!confirm) next.confirm = 'Please confirm your password.'
    else if (password && confirm !== password) next.confirm = 'Passwords do not match.'
    if (Object.keys(next).length) { setErrors(next); return }
    setErrors({})
    setView('success')
  }

  if (view === 'success') {
    return (
      <div className="flex h-screen">
        <LeftPanel />
        <div className="flex flex-1 items-center justify-center bg-white px-8">
          <div className="w-full max-w-[400px] text-center">
            <div className="mx-auto mb-6 flex size-[88px] items-center justify-center rounded-full bg-success-50">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-success-500">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-[28px] font-bold text-neutral-950">Account Activated!</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">
              Your Strativy account is ready. You can now sign in with your new password.
            </p>
            <Link
              href="/login"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-md bg-primary-600 text-[15px] font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Go to Sign In →
            </Link>
            <p className="mt-10 text-[12px] text-neutral-400">© 2026 Strativy Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <LeftPanel />
      <div className="flex flex-1 items-center justify-center bg-white px-8">
        <div className="w-full max-w-[400px]">
          {/* Invited by badge */}
          <div className="mb-5 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5">
              <div className="flex size-6 items-center justify-center rounded-full bg-primary-100 text-[10px] font-semibold text-primary-700">
                AR
              </div>
              <span className="text-[13px] text-neutral-500">Invited by {invitedBy}</span>
            </div>
          </div>

          <h2 className="text-center text-[26px] font-bold text-neutral-950">Activate Your Account</h2>
          <p className="mt-2 text-center text-[14px] text-neutral-500">
            Create a password to complete your setup.
          </p>

          <form onSubmit={handleActivate} className="mt-7 flex flex-col gap-5" noValidate>
            {/* Email (read-only) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="act-email" className="text-[13px] font-medium text-neutral-700">
                Account Email
              </label>
              <input
                id="act-email"
                type="email"
                value={accountEmail}
                readOnly
                className="h-[44px] w-full rounded-md border border-neutral-200 bg-neutral-100 px-3.5 text-[14px] text-neutral-500 cursor-default"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="act-pw" className="text-[13px] font-medium text-neutral-700">
                Create Password
              </label>
              <div className="relative">
                <input
                  id="act-pw"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    'h-[44px] w-full rounded-md border bg-neutral-50 px-3.5 pr-12 text-[14px] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600',
                    errors.password ? 'border-danger-500' : 'border-neutral-300'
                  )}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  {showPw ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p className="text-[12px] text-danger-500">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="act-confirm" className="text-[13px] font-medium text-neutral-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="act-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={cn(
                    'h-[44px] w-full rounded-md border bg-neutral-50 px-3.5 pr-12 text-[14px] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600',
                    errors.confirm ? 'border-danger-500' : 'border-neutral-300'
                  )}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  {showConfirm ? '🙈' : '👁'}
                </button>
              </div>
              {errors.confirm && <p className="text-[12px] text-danger-500">{errors.confirm}</p>}
            </div>

            <p className="text-[12px] text-neutral-400">
              Use at least 8 characters with a mix of letters, numbers, and symbols.
            </p>

            <button
              type="submit"
              className="h-12 w-full rounded-md bg-primary-600 text-[15px] font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Activate Account
            </button>
          </form>

          <p className="mt-10 text-center text-[12px] text-neutral-400">© 2026 Strativy Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
