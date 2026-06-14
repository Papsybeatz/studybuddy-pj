import { mockStudents } from './mockDB'

export interface CompletedTopic {
  topic: string
  date: string // ISO date string
}

// ── helpers ──────────────────────────────────────────────────────────────────

function getStudentRecord(studentId: string) {
  const student = mockStudents.find((s) => s.id === studentId)
  if (!student) throw new Error(`Student ${studentId} not found`)
  return student
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Append a completed topic + today's date for the given student.
 */
export function markTopicCompleted(studentId: string, topic: string): void {
  const student = getStudentRecord(studentId)

  if (!student.completedTopics) {
    student.completedTopics = []
  }

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  student.completedTopics.push({ topic, date: today })
  student.lastActiveDate = today
  student.streakCount = getStudyStreak(studentId)
}

/**
 * Return all completed topics with timestamps for a student.
 */
export function getCompletedTopics(studentId: string): CompletedTopic[] {
  const student = getStudentRecord(studentId)
  return student.completedTopics ?? []
}

/**
 * Calculate consecutive day streak ending on the most recent active day.
 */
export function getStudyStreak(studentId: string): number {
  const student = getStudentRecord(studentId)
  const completed = student.completedTopics ?? []

  if (completed.length === 0) return 0

  // Collect unique dates, sort descending
  const uniqueDates = Array.from(new Set(completed.map((c) => c.date))).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  const today = new Date().toISOString().split('T')[0]
  const mostRecent = uniqueDates[0]

  // Streak must include today or yesterday to be "active"
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (mostRecent !== today && mostRecent !== yesterdayStr) return 0

  let streak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1])
    const curr = new Date(uniqueDates[i])
    const diffDays = Math.round(
      (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}
