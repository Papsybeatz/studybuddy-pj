export type LearningStyle = 'visual' | 'hands-on' | 'reading-based'

export interface OnboardingData {
  likedSubjects: string[]
  dislikedSubjects: string[]
  interests: string[]
  hobbies: string[]
  learningStyle: LearningStyle
}
