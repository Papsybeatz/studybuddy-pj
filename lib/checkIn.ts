import type { Student } from '@/types/student'

export function getDailyCheckIn(student: Student): string {
  const interest = student.interests[0]
  const weakArea = student.weakAreas?.[0]
  const lastSubject = student.lastStudiedSubject || student.likedSubjects?.[0] || student.subjects?.[0]
  const upcomingTests = student.upcomingTests || []
  const firstName = student.name.split(' ')[0]

  if (student.careerConfusionFlag || student.exploringAlternatives) {
    const recommended = student.dislikedSubjects?.[0] || lastSubject || 'Biology'
    return `${firstName}, since you're still exploring science, want to try a short ${recommended} practice today?`
  }

  if (student.parentInfluence && !student.selfDirection) {
    return `${firstName}, you shared that this path feels pressured sometimes. Want one confidence-building win today?`
  }

  if (upcomingTests.length > 0) {
    const nextTest = upcomingTests[0]
    return `How did your ${nextTest.subject} test go today?`
  }

  if (weakArea) {
    return `Want to review the questions you struggled with in ${weakArea}?`
  }

  if (lastSubject) {
    return `Still interested in learning more about ${lastSubject}?`
  }

  if (interest) {
    return `How are you feeling about ${interest} today?`
  }

  return `How are you feeling about your studies today?`
}
