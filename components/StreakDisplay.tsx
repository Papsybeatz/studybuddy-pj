'use client'

import { getStudyStreak } from '@/lib/progress'

interface StreakDisplayProps {
  studentId: string
  compact?: boolean
}

export default function StreakDisplay({ studentId, compact = false }: StreakDisplayProps) {
  const streak = getStudyStreak(studentId)

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
        <span aria-hidden="true">🔥</span>
        {streak} day{streak !== 1 ? 's' : ''}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
      <span className="text-3xl select-none" aria-hidden="true">🔥</span>
      <div>
        <p className="text-lg font-bold text-orange-700">
          {streak} day{streak !== 1 ? 's' : ''} streak
        </p>
        {streak > 0 ? (
          <p className="text-sm text-orange-500">Keep it up!</p>
        ) : (
          <p className="text-sm text-orange-400">Come back tomorrow to start your streak.</p>
        )}
      </div>
    </div>
  )
}
