import FlashcardView from "@/src/components/FlashcardView";
import QuizView from "@/src/components/QuizView";
import StudySession from "@/src/components/StudySession";
import UploadZone from "@/src/components/UploadZone";
import { createStudySessionContext } from "@/src/types/StudySessionContext";

export default function StudyMvpPage() {
  const sessionContext = createStudySessionContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 p-6 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">StudyBuddy MVP</p>
          <h1 className="mt-2 text-3xl font-bold">AI Study Assistant Workspace</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/90">
            This wired MVP screen is where we can plug in document ingestion, flashcard generation,
            quiz creation, and spaced repetition logic from your agent architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UploadZone />
          <StudySession sessionContext={sessionContext} />
          <FlashcardView sessionContext={sessionContext} />
          <QuizView sessionContext={sessionContext} />
        </div>
      </main>
    </div>
  );
}
