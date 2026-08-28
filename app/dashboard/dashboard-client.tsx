'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getExampleStyle } from '@/lib/learningStyle'
import { getWelcomeMessage } from '@/lib/aiWelcome'
import { getDailyCheckIn } from '@/lib/checkIn'
import { getCompletedTopics, getStudyStreak } from '@/lib/progress'
import StreakDisplay from '@/components/StreakDisplay'
import Card from '@/components/Card'
import AcademicIcon, { type AcademicIconName } from '@/components/AcademicIcon'
import type { Student } from '@/types/student'

interface DashboardClientProps {
  student: Student
  subjects: string[]
  lastStudiedSubject: string
  upcomingTests: { subject: string; date: string }[]
}

export default function DashboardClient({
  student,
  subjects,
  lastStudiedSubject,
  upcomingTests,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [identityProfile, setIdentityProfile] = useState<Partial<Student>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`studybuddy.identity.${student.id}`)
      if (!raw) {
        return
      }
      const parsed = JSON.parse(raw) as Partial<Student>
      const timer = window.setTimeout(() => setIdentityProfile(parsed), 0)
      return () => window.clearTimeout(timer)
    } catch {
      return
    }
  }, [student.id])

  const personalizedStudent: Student = {
    ...student,
    ...identityProfile,
  }

  const firstName = personalizedStudent.name.split(' ')[0]
  const hasOnboardingData = personalizedStudent.interests.length > 0 || personalizedStudent.hobbies.length > 0
  const isExploringPath = !!personalizedStudent.careerConfusionFlag || !!personalizedStudent.exploringAlternatives || personalizedStudent.trackConfidenceLevel === 'low'
  const trackConfidenceLabel = personalizedStudent.trackConfidenceLevel ? `${personalizedStudent.trackConfidenceLevel} confidence` : 'still exploring'
  const exploreSubjects = [...new Set(['Biology', 'Physics', 'Economics', 'Literature'])]
    .filter((subject) => !personalizedStudent.likedSubjects.includes(subject))
    .slice(0, 4)

  const getAcademicIcon = (value: string): AcademicIconName => {
    const key = value.toLowerCase()
    if (key.includes('physics')) return 'bolt'
    if (key.includes('chemistry') || key.includes('biology')) return 'beaker'
    if (key.includes('math') || key.includes('calculus') || key.includes('algebra')) return 'chart'
    if (key.includes('test') || key.includes('date')) return 'calendar'
    if (key.includes('career')) return 'target'
    return 'book'
  }

  const welcomeMessages = getWelcomeMessage(personalizedStudent)
  const checkInQuestion = getDailyCheckIn(personalizedStudent)

  const mainGreeting = welcomeMessages[0] || `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${firstName}!`
  const subGreetings = welcomeMessages.slice(1)

  const getContinueLearningContent = () => {
    if (student.weakAreas.length > 0) {
      return {
        title: 'Review weak topics',
        desc: `Focus on: ${student.weakAreas.slice(0, 2).join(', ')}`,
        color: 'red',
      }
    }

    if (upcomingTests.length > 0) {
      const nextTest = upcomingTests[0]
      return {
        title: `Prepare for ${nextTest.subject}`,
        desc: `Test date: ${new Date(nextTest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        color: 'blue',
      }
    }

    if (lastStudiedSubject) {
      return {
        title: `Continue ${lastStudiedSubject}`,
        desc: 'Pick up from where you left off',
        color: 'green',
      }
    }

    return {
      title: 'Start learning',
      desc: 'Choose a subject to begin',
      color: 'gray',
    }
  }

  const continueLearning = getContinueLearningContent()

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-100'
      case 'blue':
        return 'bg-blue-50 border-blue-100'
      case 'green':
        return 'bg-green-50 border-green-100'
      default:
        return 'bg-gray-50 border-gray-100'
    }
  }

  const getTextColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-800'
      case 'blue':
        return 'text-blue-800'
      case 'green':
        return 'text-green-800'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Hero Card ─────────────────────────────────── */}
        <div className="rounded-2xl shadow-lg mb-8 overflow-hidden bg-gradient-to-br from-primary to-secondary">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 p-8">
            {/* Left: greeting + check-in */}
            <div className="text-white flex-1 min-w-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h2 className="text-3xl font-bold leading-tight mb-2">{mainGreeting}</h2>
              {subGreetings.length > 0 && (
                <p className="text-white/80 text-base mb-4">{subGreetings[0]}</p>
              )}
              {hasOnboardingData && (
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 inline-block max-w-lg">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">
                    Daily Check-In
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed">{checkInQuestion}</p>
                </div>
              )}
              {isExploringPath && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-3 py-1 text-xs font-semibold text-amber-900">
                  <AcademicIcon name="compass" size={14} /> You&apos;re still exploring your path · {trackConfidenceLabel}
                </div>
              )}
            </div>
            {/* Right: streak */}
            <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <StreakDisplay studentId={student.id} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'subjects', 'progress', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Your Subjects" icon={<AcademicIcon name="book" className="text-[#D4AF37]" />}>
              <div className="space-y-2">
                {subjects.map((subject, index) => (
                  <div
                    key={subject}
                    className="subject-row rounded-lg p-3"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span className="grid h-8 w-8 place-items-center rounded-md bg-[#0A1A3A] text-[#F3D978]"><AcademicIcon name={getAcademicIcon(subject)} size={16} /></span>
                      {subject}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#1C3F7C]">
                      <span className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-slate-200 sm:block"><span className="block h-full rounded-full bg-[#D4AF37]" style={{ width: `${Math.max(28, 72 - index * 9)}%` }} /></span>
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Weak Areas" icon={<AcademicIcon name="warning" className="text-[#D4AF37]" />}>
              <p className="mb-3 text-xs leading-5 text-slate-500">Recommended next steps are prioritized from your recent study signals.</p>
              <div className="flex flex-wrap gap-2">
                {student.weakAreas.length > 0 ? (
                  student.weakAreas.map((area, index) => {
                    const topicSlug = typeof area === 'string' ? area.toLowerCase().replace(/\s+/g, '-') : `area-${index + 1}`
                    return (
                      <Link
                        key={index}
                        href={`/learn/${topicSlug}`}
                        className="flex items-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#FFF9E8] px-3 py-2 text-sm text-[#0A1A3A] transition hover:border-[#D4AF37]"
                      >
                        <AcademicIcon name={getAcademicIcon(topicSlug)} size={15} className="text-[#B78900]" />
                        {typeof area === 'string' ? area : 'Area ' + (index + 1)}
                      </Link>
                    )
                  })
                ) : (
                  <p className="text-sm text-gray-500">No weak areas detected yet.</p>
                )}
              </div>
              {student.subjectPreferences?.disliked && student.subjectPreferences.disliked.length > 0 && (
                <p className="text-xs text-gray-400 mt-3">
                  Based on your disliked subjects: {student.subjectPreferences.disliked.join(', ')}
                </p>
              )}
            </Card>

            <Card title="Upcoming Tests" icon={<AcademicIcon name="calendar" className="text-[#D4AF37]" />}>
              <div className="space-y-2">
                {upcomingTests.length > 0 ? (
                  upcomingTests.map((test, index) => (
                    <div key={index} className="test-row rounded-lg p-3">
                      <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-[#0A1A3A]">{test.subject}</p><span className="date-badge rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide">{new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(test.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-medium text-[#0A1A3A]">No upcoming tests</p>
                    <p className="mt-1 text-xs text-slate-500">Check back later</p>
                  </div>
                )}
              </div>
            </Card>

            <Card title="Continue Learning" icon={<AcademicIcon name="lightbulb" className="text-[#D4AF37]" />}>
              <div className={`p-3 border rounded-lg ${getColorClasses(continueLearning.color)}`}>
                <p className={`text-sm font-medium ${getTextColorClasses(continueLearning.color)}`}>
                  {continueLearning.title}
                </p>
                <p className={`text-xs ${getTextColorClasses(continueLearning.color)} mt-1 opacity-80`}>
                  {continueLearning.desc}
                </p>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">How you&apos;ll learn:</p>
                <p className="text-xs text-gray-500">{getExampleStyle(personalizedStudent.learningStyle)}</p>
              </div>
              {personalizedStudent.trackChoiceReason && (
                <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Your why</p>
                  <p className="text-xs text-amber-900 line-clamp-3">{personalizedStudent.trackChoiceReason}</p>
                </div>
              )}
              <Link href="/continue-learning" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1C3F7C] underline-offset-4 hover:text-[#B78900] hover:underline">
                Resume session history <AcademicIcon name="bolt" size={15} />
              </Link>
            </Card>

            <Card title="Career Hints" icon={<AcademicIcon name="target" className="text-[#D4AF37]" />} className="md:col-span-2">
              {isExploringPath && (
                <p className="text-sm text-purple-800 mb-3">
                  We&apos;ll balance mastery with exploration so you can discover what truly fits you.
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {student.careerHints.map((career, index) => (
                  <div
                    key={index}
                    className="p-3 bg-purple-50 border border-purple-100 rounded-lg"
                  >
                    <p className="text-sm font-medium text-purple-800">{career}</p>
                  </div>
                ))}
              </div>
            </Card>

            {isExploringPath && (
              <Card title="Explore Subjects" icon={<AcademicIcon name="compass" className="text-[#D4AF37]" />} className="md:col-span-2 lg:col-span-3">
                <p className="text-sm text-gray-700 mb-4">
                  Since you&apos;re still exploring, try short sessions across different subject styles.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {exploreSubjects.map((subject) => {
                    const slug = subject.toLowerCase().replace(/\s+/g, '-')
                    return (
                      <Link
                        key={subject}
                        href={`/learn/${slug}`}
                        className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 hover:bg-amber-100 transition"
                      >
                        <p className="text-sm font-semibold text-amber-900">{subject}</p>
                        <p className="text-xs text-amber-800 mt-1">Try a short guided practice</p>
                      </Link>
                    )
                  })}
                </div>
              </Card>
            )}

            <Link href="/past-paper" className="block">
              <Card title="Upload Past Paper" icon={<AcademicIcon name="folder" className="text-[#D4AF37]" />} className="hover:shadow-md transition cursor-pointer h-full">
                <p className="text-sm text-gray-600">Upload a PDF or image to extract questions and detect weak areas</p>
              </Card>
            </Link>
            {/* Revision Plan preview card */}
            <div className="md:col-span-2 lg:col-span-3">
              <Card title="Revision Plan" icon={<AcademicIcon name="calendar" className="text-[#D4AF37]" />}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        {student.weakAreas.length}
                      </span>{' '}
                      weak areas prioritized for today
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        {getCompletedTopics(student.id).length}
                      </span>{' '}
                      topics completed — reinforcement scheduled next week
                    </p>
                    <p className="text-xs text-gray-400">
                      Plan adapts to your streak, difficulty &amp; quiz performance
                    </p>
                  </div>
                  <Link
                    href="/revision"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow hover:bg-primary-light transition"
                  >
                    View Plan →
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <Card title="All Subjects" icon={<AcademicIcon name="book" className="text-[#D4AF37]" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AcademicIcon name={getAcademicIcon(subject)} className="text-[#B78900]" />
                    <h4 className="font-medium text-gray-900">{subject}</h4>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Click to view materials</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* ─── Streak banner ─────────────────────────────── */}
            <StreakDisplay studentId={student.id} />

            {/* ─── Summary cards ─────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card title="Topics Completed" icon={<AcademicIcon name="check" className="text-[#D4AF37]" />} className="text-center">
                <p className="text-4xl font-bold text-primary mt-1">
                  {getCompletedTopics(student.id).length}
                </p>
              </Card>
              <Card title="Day Streak" icon={<AcademicIcon name="bolt" className="text-[#D4AF37]" />} className="text-center">
                <p className="text-4xl font-bold text-orange-500 mt-1">
                  {getStudyStreak(student.id)}
                </p>
              </Card>
              <Card title="Quiz Difficulty" icon={<AcademicIcon name="target" className="text-[#D4AF37]" />} className="text-center">
                <p className="text-4xl font-bold text-purple-600 capitalize mt-1">
                  {student.quizDifficulty ?? 'easy'}
                </p>
              </Card>
            </div>

            {/* ─── Progress bar ───────────────────────────────── */}
            <Card title="Overall Progress" icon={<AcademicIcon name="chart" className="text-[#D4AF37]" />}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {Math.min(getCompletedTopics(student.id).length, 10)} / 10 topics
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((getCompletedTopics(student.id).length / 10) * 100, 100)}%`,
                  }}
                />
              </div>
            </Card>

            {/* ─── Completed topics list ──────────────────────── */}
            <Card title="Completed Topics" icon={<AcademicIcon name="crown" className="text-[#D4AF37]" />}>
              {getCompletedTopics(student.id).length === 0 ? (
                <p className="text-sm text-gray-500">
                  No topics completed yet. Start learning to track your progress!
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {[...getCompletedTopics(student.id)].reverse().map((entry, idx) => (
                    <li key={idx} className="py-3 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-800 capitalize">
                        <AcademicIcon name={getAcademicIcon(entry.topic)} size={16} className="text-[#B78900]" />
                        {entry.topic.replace(/-/g, ' ')}
                      </span>
                      <span className="text-xs text-gray-400">{entry.date}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <Card title="Settings" icon={<AcademicIcon name="settings" className="text-[#D4AF37]" />}>
            <p className="text-gray-600">Manage your account preferences and learning style.</p>
          </Card>
        )}
      </main>
    </div>
  )
}
