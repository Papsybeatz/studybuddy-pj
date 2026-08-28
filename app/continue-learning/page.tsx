'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AcademicIcon from '@/components/AcademicIcon'

interface StudySession {
  subject: string
  topic: string
  progress: number
  date: string
}

const FALLBACK_SESSION: StudySession = {
  subject: 'Biology',
  topic: 'Cell Structure',
  progress: 0,
  date: 'Ready for your first session',
}

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-')
}

function sessionLabel(date: string) {
  if (date === 'Ready for your first session') return date
  const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000))
  return days === 0 ? 'Studied today' : `Last studied ${days} day${days === 1 ? '' : 's'} ago`
}

export default function ContinueLearningPage() {
  const [sessions, setSessions] = useState<StudySession[]>([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('studybuddy.sessions.STU001') || '[]') as StudySession[]
      setSessions(saved.slice(0, 3))
    } catch {
      setSessions([])
    }
  }, [])

  const recentSessions = sessions.length > 0 ? sessions : [FALLBACK_SESSION]
  const latest = recentSessions[0]

  return (
    <main className="min-h-full bg-[#F7F9FB] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 border-b border-[#D4AF37]/50 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B78900]">Pope John SHS · AI Tutor</p>
          <h1 className="font-merriweather mt-2 text-3xl font-bold text-[#0A1A3A]">Continue learning</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Resume your latest study context or return to one of your three most recent sessions.</p>
        </div>

        <section className="mb-7 rounded-xl bg-[#0A1A3A] p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F3D978]"><AcademicIcon name="spark" size={16} /> Resume last session</div>
              <h2 className="font-merriweather text-2xl font-bold">{latest.subject} · {latest.topic}</h2>
              <p className="mt-2 text-sm text-white/70">{latest.progress}% complete · {sessionLabel(latest.date)}</p>
              <div className="mt-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${Math.max(8, latest.progress)}%` }} /></div>
            </div>
            <Link href={`/learn/${slug(latest.topic)}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#0A1A3A] no-underline transition hover:bg-[#F3D978]">Resume Session <AcademicIcon name="bolt" size={16} /></Link>
          </div>
          {sessions.length === 0 && <p className="mt-6 border-t border-white/15 pt-4 text-xs text-white/60">Simulation mode prepared a lightweight diagnostic scaffold so your dashboard is never empty.</p>}
        </section>

        <section className="academic-card rounded-xl bg-white p-6">
          <div className="mb-5 flex items-center gap-3"><AcademicIcon name="calendar" className="text-[#D4AF37]" /><div><h2 className="font-merriweather text-xl font-bold text-[#0A1A3A]">Recent sessions</h2><p className="text-xs text-slate-500">Your three most recent learning contexts.</p></div></div>
          <div className="space-y-3">
            {recentSessions.map((session, index) => <Link key={`${session.topic}-${index}`} href={`/learn/${slug(session.topic)}`} className="flex items-center justify-between gap-4 rounded-lg border border-[#0A1A3A]/10 bg-[#F8FAFC] p-4 no-underline transition hover:border-[#D4AF37]"><div><p className="text-sm font-semibold text-[#0A1A3A]">{session.subject} · {session.topic}</p><p className="mt-1 text-xs text-slate-500">{session.progress}% complete · {sessionLabel(session.date)}</p></div><AcademicIcon name="bolt" size={18} className="shrink-0 text-[#B78900]" /></Link>)}
          </div>
        </section>
      </div>
    </main>
  )
}
