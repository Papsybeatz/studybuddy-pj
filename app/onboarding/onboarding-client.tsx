'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getStudentById, updateStudentProfile } from '@/lib/mockDB'
import type { ConfidenceLevel, OnboardingData } from '@/types/onboarding'

const SCIENCE_SUBJECTS = [
  'Biology',
  'Chemistry',
  'Physics',
  'Elective Math',
  'Core Math',
]

const SAMPLE_INTERESTS = [
  'Technology',
  'Research',
  'Problem Solving',
  'Sports',
  'Music',
  'Art',
  'Reading',
  'Gaming',
]

const SAMPLE_HOBBIES = [
  'Coding',
  'Reading',
  'Gaming',
  'Drawing',
  'Swimming',
  'Photography',
  'Cooking',
  'Hiking',
]

type LearningStyle = 'visual' | 'hands-on' | 'reading-based'

const STEPS = [
  { id: 1, title: 'Welcome' },
  { id: 2, title: 'Subjects You Enjoy' },
  { id: 3, title: 'Subjects You Struggle With' },
  { id: 4, title: 'Interests & Hobbies' },
  { id: 5, title: 'Learning Style' },
  { id: 6, title: 'Academic Identity Check' },
]

function analyzeTrackContext(response: string) {
  const normalized = response.toLowerCase()
  const forcedKeywords = ['parent', 'parents', 'insist', 'forced', 'pushed', 'pressure']
  const confusionKeywords = ['confused', 'unsure', "don't know", 'not sure', 'lost', 'no idea']
  const selfDrivenKeywords = ['i chose', 'my choice', 'decided', 'i wanted', 'i picked']
  const exploringKeywords = ['explore', 'try', 'figure out', 'discover', 'open to']
  const highConfidenceKeywords = ['sure', 'certain', 'clear', 'confident', 'definitely']

  const parentInfluence = forcedKeywords.some((keyword) => normalized.includes(keyword))
  const careerConfusionFlag = confusionKeywords.some((keyword) => normalized.includes(keyword))
  const selfDirection = selfDrivenKeywords.some((keyword) => normalized.includes(keyword)) && !parentInfluence
  const exploringAlternatives =
    careerConfusionFlag || exploringKeywords.some((keyword) => normalized.includes(keyword))

  let trackConfidenceLevel: ConfidenceLevel = 'medium'
  if (careerConfusionFlag || normalized.includes('maybe')) {
    trackConfidenceLevel = 'low'
  }
  if (highConfidenceKeywords.some((keyword) => normalized.includes(keyword)) && !careerConfusionFlag) {
    trackConfidenceLevel = 'high'
  }

  return {
    parentInfluence,
    selfDirection,
    careerConfusionFlag,
    exploringAlternatives,
    trackConfidenceLevel,
  }
}

export default function OnboardingClient() {
  const router = useRouter()
  const student = getStudentById('STU001')
  const firstName = student?.name?.split(' ')[0] ?? 'friend'
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    likedSubjects: [],
    dislikedSubjects: [],
    interests: [],
    hobbies: [],
    learningStyle: 'visual',
    trackChoiceReason: '',
    trackConfidenceLevel: 'medium',
    parentInfluence: false,
    selfDirection: true,
    careerConfusionFlag: false,
    exploringAlternatives: false,
  })

  const toggleArrayItem = (field: 'likedSubjects' | 'dislikedSubjects' | 'interests' | 'hobbies', value: string) => {
    setData((prev) => {
      const current = prev[field]
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1)
    } else {
      const trackContext = analyzeTrackContext(data.trackChoiceReason)
      const identityProfile = {
        trackChoiceReason: data.trackChoiceReason,
        trackConfidenceLevel: trackContext.trackConfidenceLevel,
        parentInfluence: trackContext.parentInfluence,
        selfDirection: trackContext.selfDirection,
        careerConfusionFlag: trackContext.careerConfusionFlag,
        exploringAlternatives: trackContext.exploringAlternatives,
      }

      updateStudentProfile('STU001', {
        interests: data.interests,
        hobbies: data.hobbies,
        learningStyle: data.learningStyle,
        likedSubjects: data.likedSubjects,
        dislikedSubjects: data.dislikedSubjects,
        ...identityProfile,
      })

      localStorage.setItem('studybuddy.identity.STU001', JSON.stringify(identityProfile))
      router.push('/dashboard')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true
      case 2:
        return data.likedSubjects.length > 0
      case 3:
        return data.dislikedSubjects.length > 0
      case 4:
        return data.interests.length > 0 && data.hobbies.length > 0
      case 5:
        return !!data.learningStyle
      case 6:
        return data.trackChoiceReason.trim().length >= 8
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to StudyBuddy!</h2>
            <p className="text-gray-600 mb-6">
              Let&apos;s personalize your learning experience. This will only take a few minutes.
            </p>
            <div className="bg-indigo-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">What we&apos;ll cover:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Your favorite and challenging subjects</li>
                <li>• Your interests and hobbies</li>
                <li>• Your preferred learning style</li>
              </ul>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Which subjects do you enjoy?</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SCIENCE_SUBJECTS.map((subject) => {
                const selected = data.likedSubjects.includes(subject)
                return (
                  <button
                    key={subject}
                    onClick={() => toggleArrayItem('likedSubjects', subject)}
                    className={`p-3 rounded-lg border text-sm font-medium transition ${
                      selected
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary'
                    }`}
                  >
                    {subject}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Which subjects do you struggle with?</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SCIENCE_SUBJECTS.map((subject) => {
                const selected = data.dislikedSubjects.includes(subject)
                return (
                  <button
                    key={subject}
                    onClick={() => toggleArrayItem('dislikedSubjects', subject)}
                    className={`p-3 rounded-lg border text-sm font-medium transition ${
                      selected
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-red-300'
                    }`}
                  >
                    {subject}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
            <p className="text-gray-600 mb-6">This helps us recommend relevant content</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_INTERESTS.map((interest) => {
                    const selected = data.interests.includes(interest)
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleArrayItem('interests', interest)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                          selected
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_HOBBIES.map((hobby) => {
                    const selected = data.hobbies.includes(hobby)
                    return (
                      <button
                        key={hobby}
                        onClick={() => toggleArrayItem('hobbies', hobby)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                          selected
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {hobby}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How do you learn best?</h2>
            <p className="text-gray-600 mb-6">Choose the style that fits you most</p>
            <div className="space-y-3">
              {[
                { value: 'visual', label: 'Visual', desc: 'I learn best with diagrams, charts, and videos' },
                { value: 'hands-on', label: 'Hands-On', desc: 'I learn by doing and practicing' },
                { value: 'reading-based', label: 'Reading-Based', desc: 'I prefer reading texts and taking notes' },
              ].map((option) => {
                const selected = data.learningStyle === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() => setData((prev) => ({ ...prev, learningStyle: option.value as LearningStyle }))}
                    className={`w-full p-4 rounded-lg border text-left transition ${
                      selected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 6:
        return (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">Personal Orientation</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Identity Check</h2>
            <p className="text-gray-600 mb-6">
              This is a quick conversation, not a test. Share what influenced your track choice.
            </p>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">Buddy</p>
              <p className="text-blue-900 font-medium">{firstName}, did you choose science?</p>
            </div>

            <label htmlFor="track-choice-reason" className="block text-sm font-medium text-gray-700 mb-2">
              Your response
            </label>
            <textarea
              id="track-choice-reason"
              value={data.trackChoiceReason}
              onChange={(event) => setData((prev) => ({ ...prev, trackChoiceReason: event.target.value }))}
              placeholder="You can answer naturally, e.g. I was confused and my parents advised science..."
              rows={5}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {data.trackChoiceReason.trim().length > 0 && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">Buddy</p>
                <p className="text-emerald-900">
                  Thanks for sharing that, {firstName}. A lot of students feel the same way. I&apos;ll help you explore both science and arts so you can discover what truly fits you.
                </p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 w-12 mx-2 ${
                      step.id < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">{renderStep()}</div>

        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Back
            </button>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Skip
            </Link>
          )}

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === STEPS.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
