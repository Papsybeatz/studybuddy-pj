'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getStudentById } from '@/lib/mockDB'
import StreakDisplay from '@/components/StreakDisplay'

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Learn', href: '/learn/biology', icon: '📚' },
  { label: 'Past Papers', href: '/past-paper', icon: '📄' },
  { label: 'Progress', href: '/dashboard', icon: '📈', tab: 'progress' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
]

// Pages that should NOT show the shell (full-page auth flows)
const SHELL_EXCLUDED_PREFIXES = ['/login', '/onboarding']

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const student = getStudentById('STU001')

  const showShell =
    !!student && !SHELL_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (!showShell) {
    return <>{children}</>
  }

  const difficultyBadge = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  }
  const diff = student.quizDifficulty ?? 'easy'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* ── Sidebar ───────────────────────────────────── */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-2">
          <span className="text-2xl select-none">🎓</span>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-primary">Study</span>
            <span className="text-secondary">Buddy</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {NAV_LINKS.map(({ label, href, icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/dashboard' && !href.includes('/learn/') && pathname.startsWith(href)) ||
              (href === '/learn/biology' && pathname.startsWith('/learn'))
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Student info */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
              {student.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{student.name}</p>
              <p className="text-xs text-gray-500 truncate">{student.courseOfStudy}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right panel ────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <p className="text-sm text-gray-500">
            Welcome back,{' '}
            <span className="font-semibold text-gray-900">{student.name}</span>
          </p>
          <div className="flex items-center gap-4">
            <StreakDisplay studentId={student.id} compact />
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${difficultyBadge[diff]}`}
            >
              {diff} difficulty
            </span>
            <Link
              href="/login"
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Sign out
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
