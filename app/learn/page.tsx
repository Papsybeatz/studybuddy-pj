'use client'

import { useState } from 'react'
import Link from 'next/link'
import AcademicIcon from '@/components/AcademicIcon'

const SUBJECT_TOPICS: Record<string, string[]> = {
  Biology: ['Cell Structure', 'Photosynthesis'],
  Chemistry: ['Organic Chemistry', 'Chemical Bonding'],
  Physics: ['Physics Mechanics', 'Motion and Forces'],
  'Elective Math': ['Algebra', 'Calculus'],
  'Core Math': ['Algebra', 'Mathematics'],
  English: ['Reading Comprehension', 'Essay Writing'],
}

export default function LearnSetupPage() {
  const [subject, setSubject] = useState('Biology')
  const topics = SUBJECT_TOPICS[subject] || ['Introduction']
  const [topic, setTopic] = useState(topics[0])

  function handleSubjectChange(value: string) {
    setSubject(value)
    setTopic(SUBJECT_TOPICS[value][0])
  }

  const topicSlug = topic.toLowerCase().replace(/\s+/g, '-')

  return (
    <main className="min-h-full bg-[#F7F9FB] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 border-b border-[#D4AF37]/50 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B78900]">Pope John SHS · AI Tutor</p>
          <h1 className="font-merriweather mt-2 text-3xl font-bold text-[#0A1A3A]">Start a new learning session</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Choose a subject and topic. Your tutor will build a fresh scaffold with explanations, practice questions, and progress tracking.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="academic-card rounded-xl bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#0A1A3A] text-[#F3D978]"><AcademicIcon name="book" /></span>
              <div><h2 className="font-merriweather text-lg font-bold text-[#0A1A3A]">Choose your focus</h2><p className="text-xs text-slate-500">This always starts a new session.</p></div>
            </div>
            <label className="mb-2 block text-sm font-semibold text-[#0A1A3A]" htmlFor="subject">Subject</label>
            <select id="subject" value={subject} onChange={(event) => handleSubjectChange(event.target.value)} className="academic-input mb-5 w-full rounded-lg px-4 py-3 text-sm outline-none">
              {Object.keys(SUBJECT_TOPICS).map((item) => <option key={item}>{item}</option>)}
            </select>
            <label className="mb-2 block text-sm font-semibold text-[#0A1A3A]" htmlFor="topic">Topic</label>
            <select id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} className="academic-input w-full rounded-lg px-4 py-3 text-sm outline-none">
              {topics.map((item) => <option key={item}>{item}</option>)}
            </select>
            <Link href={`/learn/${topicSlug}`} className="academic-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold no-underline">
              Start New Session <AcademicIcon name="spark" size={16} />
            </Link>
          </section>

          <aside className="rounded-xl border border-[#0A1A3A]/10 bg-[#0A1A3A] p-6 text-white shadow-lg">
            <AcademicIcon name="lightbulb" size={24} className="mb-5 text-[#F3D978]" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F3D978]">Fresh tutor context</p>
            <h2 className="font-merriweather mt-3 text-xl font-bold">A guided path for {topic}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-5 text-white/75">
              <li className="flex gap-2"><AcademicIcon name="check" size={16} className="mt-0.5 shrink-0 text-[#F3D978]" /> Adaptive scaffolding</li>
              <li className="flex gap-2"><AcademicIcon name="check" size={16} className="mt-0.5 shrink-0 text-[#F3D978]" /> Personalized difficulty</li>
              <li className="flex gap-2"><AcademicIcon name="check" size={16} className="mt-0.5 shrink-0 text-[#F3D978]" /> Practice and progress tracking</li>
            </ul>
            <Link href="/dashboard" className="mt-8 inline-flex text-sm font-semibold text-[#F3D978] underline-offset-4 hover:underline">Back to dashboard</Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
