const courseSubjectMap: Record<string, string[]> = {
  Business: [
    'Accounting',
    'Costing',
    'Business Management',
    'Economics',
    'Core Math',
    'English',
    'Social Studies',
  ],
  'General Arts': ['Literature', 'Government', 'CRS', 'History', 'English', 'Elective Math'],
  Science: ['Biology', 'Chemistry', 'Physics', 'Elective Math', 'Core Math'],
  Technical: ['Technical Drawing', 'Physics', 'Elective Math', 'Core Math'],
}

export function getSubjectsForCourse(course: string): string[] {
  const normalizedCourse = course.trim()
  const subjects = courseSubjectMap[normalizedCourse]

  if (subjects) {
    return subjects
  }

  console.warn(`Course "${course}" not found in mapping. Returning empty array.`)
  return []
}

export function getAllCourses(): string[] {
  return Object.keys(courseSubjectMap)
}
