import React from "react";
import type { StudySessionContext } from "../types/StudySessionContext";

interface FlashcardViewProps {
  sessionContext?: StudySessionContext;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ sessionContext }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Flashcard View</h2>
      <p className="mt-1 text-sm text-gray-600">Review key concepts and rate recall quality.</p>
      {sessionContext ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Anchored to {sessionContext.subject}: {sessionContext.topic}
        </p>
      ) : null}
      <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Question</p>
        <p className="mt-1 text-base font-medium text-gray-900">What is Newton&apos;s second law?</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Answer</p>
        <p className="mt-1 text-sm text-gray-700">Force equals mass times acceleration (F = ma).</p>
      </div>
    </section>
  );
};

export default FlashcardView;
