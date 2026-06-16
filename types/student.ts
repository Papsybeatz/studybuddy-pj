export interface CompletedTopic {
  topic: string
  date: string
  reinforced?: boolean
}

export interface StudySession {
  topic: string
  date: string
}

export type QuizDifficulty = 'easy' | 'medium' | 'hard'

export interface Student {
  id: string
  name: string
  courseOfStudy: string
  subjects: string[]
  interests: string[]
  hobbies: string[]
  learningStyle: string
  weakAreas: any[]
  careerHints: string[]
  lastLogin: Date
  likedSubjects: string[]
  dislikedSubjects: string[]
  lastStudiedSubject?: string
  upcomingTests?: { subject: string; date: string }[]
  subjectPreferences?: {
    liked: string[]
    disliked: string[]
  }
  // Phase 6 — Progress Tracking + Gamification
  completedTopics?: CompletedTopic[]
  lastActiveDate?: string
  streakCount?: number
  quizDifficulty?: QuizDifficulty
  // Phase 8 — Study Session Logging
  studySessions?: StudySession[]
}
