'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type LoginView = 'signin' | 'forgot' | 'email-sent'
type FieldErrors = { email?: string; password?: string; banner?: string }

// Demo credentials
const DEMO_EMAIL    = 'alex@strativy.com'
const DEMO_PASSWORD = 'Admin123!'

const features = [
  'Client portfolio & contract tracking',
  'Team access control & role management',
  'OKR reviews & performance reporting',
]

function LeftPanel() {
  return (
    <div
      className="hidden w-[480px] shrink-0 flex-col justify-between p-14 lg:flex"
      style={{ background: 'linear-gradient(to bottom, #153db7, #1e51df)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-[8px] bg-white/20">
          <span className="text-[18px] font-bold text-white">S</span>
        </div>
        <span className="text-[18px] font-semibold text-white">Strativy</span>
      </div>

      {/* Tagline */}
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

        {/* Feature list */}
        <ul className="flex flex-col gap-3.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                <span className="text-[10px] font-bold text-white">✓</span>
              </div>
              <span className="text-[14px] font-medium text-white/85">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[12px] text-white/45">© 2026 Strativy Inc.</p>
    </div>
  )
}

function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  rightLabel,
  onRightLabelClick,
  readOnly,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
  value?: string
  onChange?: (v: string) => void
  error?: string
  rightLabel?: string
  onRightLabelClick?: () => void
  readOnly?: boolean
}) {
  const [showPw, setShowPw] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[13px] font-medium text-neutral-700">
          {label}
        </label>
        {rightLabel && (
          <button
            type="button"
            onClick={onRightLabelClick}
            className="text-[13px] font-medium text-primary-600 hover:text-primary-700"
          >
            {rightLabel}
          </button>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'h-[44px] w-full rounded-md border bg-neutral-50 px-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-0',
            'transition-colors',
            error
              ? 'border-danger-500 focus:ring-danger-500'
              : 'border-neutral-300',
            readOnly && 'cursor-default bg-neutral-100 text-neutral-500',
            isPassword && 'pr-12'
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 3l14 14M8.46 8.52A3 3 0 0013.46 13.48M6 5.28A9.5 9.5 0 001 10s3 5.5 9 5.5c1.5 0 2.87-.37 4.07-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14.9 14.97A9.5 9.5 0 0019 10S16 4.5 10 4.5c-.9 0-1.77.12-2.6.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M1 10S4 4.5 10 4.5 19 10 19 10s-3 5.5-9 5.5S1 10 1 10z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[12px] text-danger-500">{error}</p>
      )}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [view, setView] = useState<LoginView>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    const next: FieldErrors = {}
    if (!email.trim()) next.email = 'Email address is required.'
    if (!password.trim()) next.password = 'Password is required.'
    if (Object.keys(next).length) { setErrors(next); return }

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      router.push('/clients')
    } else {
      setErrors({ banner: 'Incorrect email or password. Please try again.', password: 'Incorrect password.' })
    }
  }

  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!resetEmail.trim()) {
      setErrors({ email: 'Email address is required.' })
      return
    }
    setErrors({})
    setView('email-sent')
  }

  // ----- Sign In view -----
  if (view === 'signin') {
    return (
      <div className="flex h-screen">
        <LeftPanel />
        <div className="flex flex-1 items-center justify-center bg-white px-8">
          <div className="w-full max-w-[400px]">
            {/* Banner error */}
            {errors.banner && (
              <div className="mb-6 flex items-center gap-3 rounded-md border border-danger-200 bg-danger-50 px-4 py-3">
                <svg className="shrink-0 text-danger-500" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <p className="text-[13px] text-danger-700">{errors.banner}</p>
              </div>
            )}

            <h2 className="text-center text-[28px] font-bold text-neutral-950">Welcome back</h2>
            <p className="mt-2 text-center text-[14px] text-neutral-500">Sign in to Strativy Internal Portal</p>

            {/* Demo credentials hint */}
            <div className="mt-5 rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
              <p className="text-[12px] font-medium text-primary-700">Demo credentials</p>
              <p className="mt-0.5 text-[12px] text-primary-600">
                Email: <span className="font-mono font-semibold">{DEMO_EMAIL}</span>
              </p>
              <p className="text-[12px] text-primary-600">
                Password: <span className="font-mono font-semibold">{DEMO_PASSWORD}</span>
              </p>
            </div>

            <form onSubmit={handleSignIn} className="mt-5 flex flex-col gap-5" noValidate>
              <InputField
                label="Email Address"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={setPassword}
                error={errors.password}
                rightLabel="Forgot password?"
                onRightLabelClick={() => { setErrors({}); setView('forgot') }}
              />
              <button
                type="submit"
                className="mt-1 h-12 w-full rounded-md bg-primary-600 text-[15px] font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
              >
                Sign In
              </button>
            </form>

            <p className="mt-12 text-center text-[12px] text-neutral-400">
              © 2026 Strativy Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ----- Forgot Password view -----
  if (view === 'forgot') {
    return (
      <div className="flex h-screen">
        <LeftPanel />
        <div className="flex flex-1 items-center justify-center bg-white px-8">
          <div className="w-full max-w-[400px]">
            {/* Lock icon */}
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-neutral-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-neutral-500">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <h2 className="text-center text-[28px] font-bold text-neutral-950">Forgot Password?</h2>
            <p className="mt-2 text-center text-[14px] leading-relaxed text-neutral-500">
              Enter the email address associated with your account and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleForgotSubmit} className="mt-8 flex flex-col gap-5" noValidate>
              <InputField
                label="Email Address"
                id="reset-email"
                type="email"
                placeholder="Enter your account email"
                value={resetEmail}
                onChange={setResetEmail}
                error={errors.email}
              />
              <button
                type="submit"
                className="h-12 w-full rounded-md bg-primary-600 text-[15px] font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
              >
                Send Reset Link
              </button>
            </form>

            <button
              type="button"
              onClick={() => { setErrors({}); setView('signin') }}
              className="mt-4 w-full text-center text-[14px] font-medium text-neutral-500 hover:text-neutral-700"
            >
              ← Back to Sign In
            </button>

            <p className="mt-10 text-center text-[12px] text-neutral-400">
              © 2026 Strativy Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ----- Email Sent view -----
  return (
    <div className="flex h-screen">
      <LeftPanel />
      <div className="flex flex-1 items-center justify-center bg-white px-8">
        <div className="w-full max-w-[400px]">
          {/* Envelope icon */}
          <div className="mx-auto mb-6 flex size-[72px] items-center justify-center rounded-full bg-primary-50">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary-600">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 8l9.293 5.293a1 1 0 001.414 0L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="text-center text-[28px] font-bold text-neutral-950">Check Your Email</h2>
          <p className="mt-2 text-center text-[14px] leading-relaxed text-neutral-500">
            We&apos;ve sent a password reset link to{' '}
            <span className="font-medium text-neutral-700">{resetEmail || 'your email'}</span>.
            Check your inbox and follow the instructions.
          </p>

          {/* Expiry note */}
          <div className="mt-6 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3">
            <p className="text-[13px] text-neutral-500">
              ⏱ This link expires in <span className="font-medium text-neutral-700">30 minutes</span>.
              If it expires, you can request a new one.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleForgotSubmit({ preventDefault: () => {} } as React.FormEvent)}
              className="w-full text-center text-[14px] font-medium text-primary-600 hover:text-primary-700"
            >
              Didn&apos;t receive it? Resend email
            </button>
            <button
              type="button"
              onClick={() => { setErrors({}); setView('signin') }}
              className="w-full text-center text-[14px] font-medium text-neutral-500 hover:text-neutral-700"
            >
              ← Back to Sign In
            </button>
          </div>

          <p className="mt-12 text-center text-[12px] text-neutral-400">
            © 2026 Strativy Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
