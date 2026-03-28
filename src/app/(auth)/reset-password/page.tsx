'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ResetView = 'form' | 'success'

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

function strengthLabel(pw: string): { label: string; width: string; color: string } {
  if (!pw) return { label: '', width: '0%', color: '' }
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(pw)).length
  if (score <= 1) return { label: 'Weak', width: '25%', color: 'bg-danger-500' }
  if (score === 2) return { label: 'Fair', width: '50%', color: 'bg-warning-400' }
  if (score === 3) return { label: 'Good', width: '75%', color: 'bg-success-400' }
  return { label: 'Strong', width: '100%', color: 'bg-success-600' }
}

export default function ResetPasswordPage() {
  const [view, setView] = useState<ResetView>('form')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})

  const strength = strengthLabel(password)

  function handleSubmit(e: React.FormEvent) {
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
            <h2 className="text-[28px] font-bold text-neutral-950">Password Updated!</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">
              Your password has been successfully updated. You can now sign in with your new password.
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
          {/* Key icon */}
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-neutral-100">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-neutral-500">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="text-center text-[26px] font-bold text-neutral-950">Create New Password</h2>
          <p className="mt-2 text-center text-[14px] leading-relaxed text-neutral-500">
            Your new password must be different from your previous passwords and meet the requirements below.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5" noValidate>
            {/* New password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rp-pw" className="text-[13px] font-medium text-neutral-700">New Password</label>
              <div className="relative">
                <input
                  id="rp-pw"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    'h-[44px] w-full rounded-md border bg-neutral-50 px-3.5 pr-12 text-[14px] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600',
                    errors.password ? 'border-danger-500' : 'border-neutral-300'
                  )}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" aria-label="Toggle password">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M1 10S4 4.5 10 4.5 19 10 19 10s-3 5.5-9 5.5S1 10 1 10z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div className="flex flex-col gap-1">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-200">
                    <div
                      className={cn('h-full rounded-full transition-all duration-300', strength.color)}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Password strength: <span className="font-medium text-neutral-600">{strength.label}</span>
                  </p>
                </div>
              )}
              {errors.password && <p className="text-[12px] text-danger-500">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rp-confirm" className="text-[13px] font-medium text-neutral-700">Confirm New Password</label>
              <div className="relative">
                <input
                  id="rp-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={cn(
                    'h-[44px] w-full rounded-md border bg-neutral-50 px-3.5 pr-12 text-[14px] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600',
                    errors.confirm ? 'border-danger-500' : 'border-neutral-300'
                  )}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" aria-label="Toggle confirm password">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M1 10S4 4.5 10 4.5 19 10 19 10s-3 5.5-9 5.5S1 10 1 10z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
              {errors.confirm && <p className="text-[12px] text-danger-500">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-md bg-primary-600 text-[15px] font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Set New Password
            </button>
          </form>

          <p className="mt-10 text-center text-[12px] text-neutral-400">© 2026 Strativy Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
