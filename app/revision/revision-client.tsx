'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { generateRevisionPlan, RevisionPlan, TopicItem, RevisionReason } from '@/lib/revisionPlan'
import { logStudySession } from '@/lib/progress'
import { getTopicIcon } from '@/lib/topicIcons'
import Card from '@/components/Card'
import type { Student } from '@/types/student'

interface RevisionClientProps {
  student: Student
  initialPlan: RevisionPlan
}

// ── Reason badge colours ──────────────────────────────────────────────────────

const reasonStyle: Record<RevisionReason, string> = {
  'weak area': 'bg-red-100 text-red-700',
  'recent quiz': 'bg-purple-100 text-purple-700',
  'not studied recently': 'bg-yellow-100 text-yellow-700',
  reinforcement: 'bg-green-100 text-green-700',
  'upcoming test': 'bg-blue-100 text-blue-700',
  'disliked subject': 'bg-orange-100 text-orange-700',
}

// ── Topic row ─────────────────────────────────────────────────────────────────

function TopicRow({
  item,
  studentId,
  onDone,
}: {
  item: TopicItem
  studentId: string
  onDone: (slug: string) => void
}) {
  const [done, setDone] = useState(false)
  const iconInfo = getTopicIcon(item.slug)

  const handleDone = () => {
    logStudySession(studentId, item.slug)
    setDone(true)
    onDone(item.slug)
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
        done ? 'bg-green-50 border-green-200 opacity-70' : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl leading-none select-none flex-shrink-0">
          {iconInfo?.emoji ?? '📖'}
        </span>
        <div className="min-w-0">
          <p className={`text-sm font-semibold truncate ${done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {item.topic}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${reasonStyle[item.reason]}`}>
              {item.reason}
            </span>
            <span className="text-xs text-gray-400">⏱ {item.estimatedMinutes} min</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <Link
          href={`/learn/${item.slug}`}
          className="text-xs text-primary hover:text-primary-light font-medium border border-primary/30 rounded-lg px-3 py-1.5 transition hover:bg-primary/5"
        >
          Study →
        </Link>
        <button
          onClick={handleDone}
          disabled={done}
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
        >
          {done ? '✓ Done' : 'Mark Done'}
        </button>
      </div>
    </div>
  )
}

// ── Plan section ──────────────────────────────────────────────────────────────

function PlanSection({
  title,
  icon,
  items,
  studentId,
  onDone,
}: {
  title: string
  icon: string
  items: TopicItem[]
  studentId: string
  onDone: (slug: string) => void
}) {
  if (items.length === 0) return null
  return (
    <Card title={title} icon={icon}>
      <div className="space-y-3">
        {items.map((item) => (
          <TopicRow key={item.slug} item={item} studentId={studentId} onDone={onDone} />
        ))}
      </div>
    </Card>
  )
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg">
        {message}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RevisionClient({ student, initialPlan }: RevisionClientProps) {
  const [plan, setPlan] = useState<RevisionPlan>(initialPlan)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000)
  }, [])

  const handleRegenerate = () => {
    const freshPlan = generateRevisionPlan(student)
    setPlan(freshPlan)
    showToast('Plan updated based on your latest progress!')
  }

  const handleDone = useCallback(
    (slug: string) => {
      showToast(`"${slug.replace(/-/g, ' ')}" logged as studied!`)
    },
    [showToast]
  )

  const totalTopics = plan.today.length + plan.thisWeek.length + plan.nextWeek.length
  const totalMins = [...plan.today, ...plan.thisWeek, ...plan.nextWeek].reduce(
    (sum, t) => sum + t.estimatedMinutes,
    0
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Revision Plan</h1>
          <p className="text-gray-500 mt-1">
            {totalTopics} topics · approx {totalMins} mins total ·{' '}
            <span className="font-medium capitalize text-primary">
              {student.quizDifficulty ?? 'easy'}
            </span>{' '}
            difficulty
          </p>
        </div>
        <button
          onClick={handleRegenerate}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow hover:bg-primary-light transition"
        >
          🔄 Regenerate Plan
        </button>
      </div>

      {/* ── Sections ── */}
      <div className="space-y-6">
        <PlanSection
          title="Today's Focus"
          icon="🎯"
          items={plan.today}
          studentId={student.id}
          onDone={handleDone}
        />
        <PlanSection
          title="This Week"
          icon="📅"
          items={plan.thisWeek}
          studentId={student.id}
          onDone={handleDone}
        />
        <PlanSection
          title="Next Week"
          icon="🔮"
          items={plan.nextWeek}
          studentId={student.id}
          onDone={handleDone}
        />
      </div>

      {/* ── Toast ── */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
