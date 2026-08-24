import type { Student } from '@/types/student'

export interface WeakAreaResult {
  detectedTopics: string[]
  weakAreas: string[]
}

export function detectWeakAreas(student: Student, extractedQuestions: { topic: string }[]): WeakAreaResult {
  const disliked = (student.dislikedSubjects || []) as string[]
  const topicCounts: Record<string, number> = {}

  extractedQuestions.forEach((q) => {
    topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1
  })

  const weakAreas: string[] = []

  for (const topic of Object.keys(topicCounts)) {
    if (disliked.some((d) => topic.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(topic.toLowerCase()))) {
      weakAreas.push(topic)
    }
  }

  const repeatedTopics = Object.entries(topicCounts)
    .filter(([, count]) => count > 1)
    .map(([topic]) => topic)
    .filter((t) => !weakAreas.includes(t))

  const finalWeakAreas = [...weakAreas, ...repeatedTopics]

  return {
    detectedTopics: Object.keys(topicCounts),
    weakAreas: finalWeakAreas,
  }
}
