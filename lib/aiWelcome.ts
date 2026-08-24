import type { Student } from '@/types/student'

export function getWelcomeMessage(student: Student): string[] {
  const firstName = student.name.split(' ')[0]
  const interest = student.interests[0] || 'learning'
  const learningStyle = student.learningStyle.toLowerCase()
  const lastSubject = student.lastStudiedSubject || student.likedSubjects?.[0] || student.subjects?.[0] || 'your subjects'
  const weakArea = student.weakAreas?.[0]

  const messages: string[] = []

  const hour = new Date().getHours()
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  messages.push(`Good ${timeOfDay}, ${firstName}!`)

  if (student.careerConfusionFlag || student.exploringAlternatives) {
    messages.push(`You're still exploring your path, and that's completely fine. We'll learn by trying both depth and variety.`)
  } else if (student.parentInfluence && !student.selfDirection) {
    messages.push(`Thanks for being honest about outside pressure. We'll build confidence one step at a time.`)
  }

  if (weakArea) {
    messages.push(`I know ${weakArea} has been tricky. Want to tackle it today?`)
  } else {
    messages.push(`Ready to continue ${lastSubject}?`)
  }

  messages.push(`Since you're a ${learningStyle} learner, I'll adapt my explanations for you.`)

  messages.push(`I remember you enjoy ${interest} — want to explore related topics later?`)

  return messages
}
