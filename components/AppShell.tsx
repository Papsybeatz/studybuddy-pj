'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getStudentById } from '@/lib/mockDB'
import StreakDisplay from '@/components/StreakDisplay'
import AcademicIcon from '@/components/AcademicIcon'

const NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'graduation' as const },
  { label: 'Study MVP', href: '/study-mvp', icon: 'lightbulb' as const },
  { label: 'Learn', href: '/learn', icon: 'book' as const },
  { label: 'Past Papers', href: '/past-paper', icon: 'folder' as const },
  { label: 'Progress', href: '/dashboard', icon: 'chart' as const, tab: 'progress' },
  { label: 'Revision Plan', href: '/revision', icon: 'calendar' as const },
  { label: 'Settings', href: '/settings', icon: 'settings' as const },
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
        <div className="border-b border-[#D4AF37]/30 bg-[#0A1A3A] px-5 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#D4AF37]/70 text-[#F3D978]"><AcademicIcon name="graduation" size={24} /></span>
            <span className="font-merriweather text-base font-bold tracking-tight">StudyBuddy</span>
          </div>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F3D978]">Pope John SHS</p>
          <p className="mt-1 text-[11px] leading-4 text-white/65">Student learning portal</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {NAV_LINKS.map(({ label, href, icon }) => {
            const isActive =
              pathname === href ||
              (href !== '/dashboard' && !href.includes('/learn/') && pathname.startsWith(href)) ||
              (href === '/learn' && pathname.startsWith('/learn'))
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
                <AcademicIcon name={icon} size={18} />
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
        <header className="academic-header border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-merriweather text-sm font-bold text-white">Pope John Senior High School</p>
            <p className="mt-0.5 text-xs text-white/65">StudyBuddy Portal · Welcome back, <span className="font-semibold text-[#F3D978]">{student.name}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <StreakDisplay studentId={student.id} compact />
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${difficultyBadge[diff]}`}
            >
              {diff} difficulty
            </span>
            <Link
              href="/api/auth/logout"
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
