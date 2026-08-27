'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [studentID, setStudentID] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentID, pin }),
      })
      const result = await response.json() as { student?: unknown; error?: string }

      if (response.ok && result.student) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Authentication failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="login-page flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="login-card w-full max-w-md rounded-2xl bg-white p-7 sm:p-9">
        <div className="mb-8 text-center">
          <div className="mb-5 flex flex-col items-center">
            <div className="studybuddy-mark" aria-label="StudyBuddy logo">
              <span>SB</span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1C3F7C]">
              Pope John Senior High School · Ghana
            </p>
          </div>
          <h1 className="font-merriweather text-3xl font-bold text-[#0A1A3A] sm:text-[2rem]">
            Welcome to StudyBuddy
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#B78900]">Study Smarter. Learn Faster.</p>
          <p className="mt-3 text-sm text-slate-600">Sign in to continue your learning journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="studentID" className="mb-2 block text-sm font-medium text-[#0A1A3A]">
              Student ID
            </label>
            <input
              id="studentID"
              type="text"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              className="academic-input w-full rounded-lg px-4 py-3 text-sm text-[#0A1A3A] outline-none transition"
              placeholder="e.g., STU001"
              required
            />
          </div>

          <div>
            <label htmlFor="pin" className="mb-2 block text-sm font-medium text-[#0A1A3A]">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="academic-input w-full rounded-lg px-4 py-3 text-sm text-[#0A1A3A] outline-none transition"
              placeholder="Enter your PIN"
              maxLength={10}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="academic-button w-full rounded-lg px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-panel mt-7 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="demo-badge shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
              Demo Mode
            </span>
            <p className="text-sm leading-5 text-[#0A1A3A]">
              Student ID <strong>STU001</strong> <span className="text-slate-400">|</span> PIN <strong>1234</strong>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-[#1C3F7C] underline-offset-4 transition hover:text-[#D4AF37] hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
