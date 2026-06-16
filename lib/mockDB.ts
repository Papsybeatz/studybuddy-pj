import { Student } from '@/types/student'

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Kwame Mensah',
    courseOfStudy: 'Science',
    subjects: ['Biology', 'Chemistry', 'Physics', 'Elective Math', 'Core Math'],
    interests: ['Technology', 'Research', 'Problem Solving'],
    hobbies: ['Coding', 'Reading', 'Gaming'],
    learningStyle: 'Visual',
    weakAreas: ['Physics Mechanics', 'Organic Chemistry'],
    careerHints: ['Doctor', 'Engineer', 'Data Scientist'],
    lastLogin: new Date('2025-01-15'),
    likedSubjects: ['Biology', 'Chemistry'],
    dislikedSubjects: ['Physics'],
    lastStudiedSubject: 'Biology',
    upcomingTests: [
      { subject: 'Physics', date: '2025-02-15' },
      { subject: 'Chemistry', date: '2025-02-20' },
    ],
    subjectPreferences: {
      liked: ['Biology', 'Chemistry'],
      disliked: ['Physics'],
    },
    completedTopics: [],
    lastActiveDate: '',
    streakCount: 0,
    quizDifficulty: 'easy',
    studySessions: [],
  },
  {
    id: 'STU002',
    name: 'Ama Serwaa',
    courseOfStudy: 'Business',
    subjects: ['Accounting', 'Costing', 'Business Management', 'Economics', 'Core Math', 'English', 'Social Studies'],
    interests: ['Finance', 'Entrepreneurship', 'Marketing'],
    hobbies: ['Writing', 'Travelling', 'Networking'],
    learningStyle: 'Auditory',
    weakAreas: ['Cost Accounting', 'Economics Graphs'],
    careerHints: ['Accountant', 'Business Analyst', 'Entrepreneur'],
    lastLogin: new Date('2025-01-14'),
    likedSubjects: ['Accounting', 'Business Management'],
    dislikedSubjects: ['Costing'],
    lastStudiedSubject: 'Accounting',
    upcomingTests: [
      { subject: 'Cost Accounting', date: '2025-02-18' },
    ],
    subjectPreferences: {
      liked: ['Accounting', 'Business Management'],
      disliked: ['Costing'],
    },
      completedTopics: [],
      lastActiveDate: '',
      streakCount: 0,
      quizDifficulty: 'easy',
      studySessions: [],
    },
  {
    id: 'STU003',
    name: 'Kofi Asante',
    courseOfStudy: 'General Arts',
    subjects: ['Literature', 'Government', 'CRS', 'History', 'English', 'Elective Math'],
    interests: ['Politics', 'Law', 'Journalism'],
    hobbies: ['Debating', 'Reading', 'Volunteering'],
    learningStyle: 'Reading/Writing',
    weakAreas: ['History Dates', 'Literature Analysis'],
    careerHints: ['Lawyer', 'Journalist', 'Politician'],
    lastLogin: new Date('2025-01-13'),
    likedSubjects: ['Literature', 'Government'],
    dislikedSubjects: ['History'],
    lastStudiedSubject: 'Literature',
    upcomingTests: [],
    subjectPreferences: {
      liked: ['Literature', 'Government'],
      disliked: ['History'],
    },
      completedTopics: [],
      lastActiveDate: '',
      streakCount: 0,
      quizDifficulty: 'easy',
      studySessions: [],
    },
  {
    id: 'STU004',
    name: 'Efua Owusu',
    courseOfStudy: 'Technical',
    subjects: ['Technical Drawing', 'Physics', 'Elective Math', 'Core Math'],
    interests: ['Engineering', 'Design', 'Construction'],
    hobbies: ['Drawing', 'Building Models', 'Woodworking'],
    learningStyle: 'Kinesthetic',
    weakAreas: ['Technical Drawing', 'Physics Calculations'],
    careerHints: ['Civil Engineer', 'Architect', 'Drafter'],
    lastLogin: new Date('2025-01-12'),
    likedSubjects: ['Technical Drawing', 'Physics'],
    dislikedSubjects: ['Elective Math'],
    lastStudiedSubject: 'Technical Drawing',
    upcomingTests: [
      { subject: 'Physics', date: '2025-02-22' },
    ],
    subjectPreferences: {
      liked: ['Technical Drawing', 'Physics'],
      disliked: ['Elective Math'],
    },
      completedTopics: [],
      lastActiveDate: '',
      streakCount: 0,
      quizDifficulty: 'easy',
      studySessions: [],
    },
]

export function getStudentById(id: string): Student | undefined {
  return mockStudents.find((student) => student.id === id)
}

export function getAllStudents(): Student[] {
  return mockStudents
}

/**
 * Update the lastStudiedSubject field for a student (used by learn-client).
 */
export function updateLastStudiedSubject(studentId: string, subject: string): void {
  const student = mockStudents.find((s) => s.id === studentId)
  if (student) {
    student.lastStudiedSubject = subject
  }
}


export function updateStudentProfile(id: string, data: Partial<Student>): Student | undefined {
  const studentIndex = mockStudents.findIndex((student) => student.id === id)
  if (studentIndex === -1) {
    return undefined
  }

  mockStudents[studentIndex] = {
    ...mockStudents[studentIndex],
    ...data,
    lastLogin: new Date(),
  }

  return mockStudents[studentIndex]
}

export function updateLastStudiedSubject(studentId: string, topic: string): Student | undefined {
  return updateStudentProfile(studentId, { lastStudiedSubject: topic })
}
