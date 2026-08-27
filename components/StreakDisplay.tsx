'use client'

import { getStudyStreak } from '@/lib/progress'
import AcademicIcon from '@/components/AcademicIcon'

interface StreakDisplayProps {
  studentId: string
  compact?: boolean
}

export default function StreakDisplay({ studentId, compact = false }: StreakDisplayProps) {
  const streak = getStudyStreak(studentId)

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1A3A]">
        <AcademicIcon name="bolt" size={16} className="text-[#D4AF37]" />
        {streak} day{streak !== 1 ? 's' : ''}
      </span>
    )
  }

  return (
    <div className="streak-panel flex items-center gap-3 rounded-xl px-5 py-4">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#D4AF37]/20 text-[#B78900]">
        <AcademicIcon name="bolt" size={24} />
      </span>
      <div>
        <p className="font-merriweather text-lg font-bold text-[#0A1A3A]">
          {streak} day{streak !== 1 ? 's' : ''} streak
        </p>
        {streak > 0 ? (
          <p className="text-sm text-[#7A5B00]">Keep it up!</p>
        ) : (
          <p className="text-sm text-[#7A5B00]">Come back tomorrow to start your streak.</p>
        )}
      </div>
    </div>
  )
}
