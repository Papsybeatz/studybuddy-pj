export type LearningStyle = 'visual' | 'hands-on' | 'reading-based'
export type ConfidenceLevel = 'low' | 'medium' | 'high'

export interface OnboardingData {
  likedSubjects: string[]
  dislikedSubjects: string[]
  interests: string[]
  hobbies: string[]
  learningStyle: LearningStyle
  trackChoiceReason: string
  trackConfidenceLevel: ConfidenceLevel
  parentInfluence: boolean
  selfDirection: boolean
  careerConfusionFlag: boolean
  exploringAlternatives: boolean
}
