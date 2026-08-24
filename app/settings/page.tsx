import Link from 'next/link'

export default function SettingsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">StudyBuddy</p>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Your learning preferences are managed during onboarding.</p>
        <Link
          href="/onboarding"
          className="inline-flex mt-6 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition"
        >
          Review onboarding
        </Link>
      </div>
    </main>
  )
}