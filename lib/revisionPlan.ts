import type { Student } from '@/types/student'

// ── Types ─────────────────────────────────────────────────────────────────────

export type RevisionReason =
  | 'weak area'
  | 'recent quiz'
  | 'not studied recently'
  | 'reinforcement'
  | 'upcoming test'
  | 'disliked subject'

export interface TopicItem {
  topic: string
  slug: string
  estimatedMinutes: number
  reason: RevisionReason
}

export interface RevisionPlan {
  today: TopicItem[]
  thisWeek: TopicItem[]
  nextWeek: TopicItem[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function minutesForDifficulty(difficulty: string): number {
  if (difficulty === 'hard') return 30
  if (difficulty === 'medium') return 25
  return 15
}

function daysSinceLastStudied(topic: string, completedTopics: { topic: string; date: string }[]): number {
  const entries = completedTopics.filter((c) => c.topic === topic || c.topic === toSlug(topic))
  if (entries.length === 0) return Infinity
  const latest = entries.reduce((a, b) => (a.date > b.date ? a : b))
  const diff = Date.now() - new Date(latest.date).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// ── Engine ────────────────────────────────────────────────────────────────────

/**
 * Generate a personalised revision plan for a student.
 *
 * Priority rules:
 *   today     → weak areas (always first), then topics not studied recently
 *   thisWeek  → mix of weak + subjects approaching tests + disliked subjects
 *   nextWeek  → reinforcement of previously completed topics
 */
export function generateRevisionPlan(student: Student): RevisionPlan {
  const difficulty = student.quizDifficulty ?? 'easy'
  const mins = minutesForDifficulty(difficulty)
  const completedTopics = student.completedTopics ?? []
  const completedSlugs = new Set(completedTopics.map((c) => toSlug(c.topic)))

  // ── Build TODAY: weak areas first ────────────────────────────────────────
  const today: TopicItem[] = []

  for (const area of student.weakAreas.slice(0, 3)) {
    const topicStr = typeof area === 'string' ? area : String(area)
    today.push({
      topic: topicStr,
      slug: toSlug(topicStr),
      estimatedMinutes: mins,
      reason: 'weak area',
    })
  }

  // Fill today with not-studied-recently subjects if weak areas < 3
  if (today.length < 3) {
    for (const subject of student.subjects) {
      if (today.length >= 3) break
      const alreadyAdded = today.some((t) => toSlug(t.topic) === toSlug(subject))
      if (alreadyAdded) continue
      const days = daysSinceLastStudied(subject, completedTopics)
      if (days > 7 || days === Infinity) {
        today.push({
          topic: subject,
          slug: toSlug(subject),
          estimatedMinutes: mins,
          reason: 'not studied recently',
        })
      }
    }
  }

  // ── Build THIS WEEK: tests + disliked subjects + more weak areas ──────────
  const thisWeek: TopicItem[] = []

  // Upcoming tests (not already in today)
  for (const test of (student.upcomingTests ?? []).slice(0, 2)) {
    const alreadyInToday = today.some((t) => toSlug(t.topic) === toSlug(test.subject))
    if (!alreadyInToday) {
      thisWeek.push({
        topic: test.subject,
        slug: toSlug(test.subject),
        estimatedMinutes: mins + 5,
        reason: 'upcoming test',
      })
    }
  }

  // Disliked subjects that haven't been studied
  for (const subject of student.dislikedSubjects ?? []) {
    if (thisWeek.length >= 5) break
    const alreadyIn = [...today, ...thisWeek].some(
      (t) => toSlug(t.topic) === toSlug(subject)
    )
    if (!alreadyIn) {
      thisWeek.push({
        topic: subject,
        slug: toSlug(subject),
        estimatedMinutes: mins,
        reason: 'disliked subject',
      })
    }
  }

  // Additional subjects to reach 5 items
  for (const subject of student.subjects) {
    if (thisWeek.length >= 5) break
    const alreadyIn = [...today, ...thisWeek].some(
      (t) => toSlug(t.topic) === toSlug(subject)
    )
    if (!alreadyIn) {
      thisWeek.push({
        topic: subject,
        slug: toSlug(subject),
        estimatedMinutes: mins,
        reason: 'not studied recently',
      })
    }
  }

  // ── Build NEXT WEEK: reinforcement of completed topics ────────────────────
  const nextWeek: TopicItem[] = []

  // Completed topics not yet reinforced
  const toReinforce = completedTopics
    .filter((c) => !c.reinforced)
    .map((c) => c.topic)

  const uniqueReinforce = Array.from(new Set(toReinforce)).slice(0, 5)
  for (const topic of uniqueReinforce) {
    nextWeek.push({
      topic,
      slug: toSlug(topic),
      estimatedMinutes: mins,
      reason: 'reinforcement',
    })
  }

  // Fill next week with remaining subjects if fewer than 5
  const allUsedSlugs = new Set([
    ...today.map((t) => t.slug),
    ...thisWeek.map((t) => t.slug),
    ...nextWeek.map((t) => t.slug),
  ])

  for (const subject of student.subjects) {
    if (nextWeek.length >= 5) break
    const slug = toSlug(subject)
    if (!allUsedSlugs.has(slug)) {
      nextWeek.push({
        topic: subject,
        slug,
        estimatedMinutes: mins,
        reason: completedSlugs.has(slug) ? 'reinforcement' : 'not studied recently',
      })
      allUsedSlugs.add(slug)
    }
  }

  return { today, thisWeek, nextWeek }
}
