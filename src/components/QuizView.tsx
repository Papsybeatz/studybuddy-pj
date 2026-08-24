import React from "react";
import type { StudySessionContext } from "../types/StudySessionContext";

interface QuizViewProps {
  sessionContext?: StudySessionContext;
}

const QuizView: React.FC<QuizViewProps> = ({ sessionContext }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Quiz View</h2>
      <p className="mt-1 text-sm text-gray-600">Practice with mixed question types and instant feedback.</p>
      {sessionContext ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Keep the thread on {sessionContext.subject}: {sessionContext.topic}
        </p>
      ) : null}
      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">Which process do plants use to make food?</p>
        <ul className="mt-3 space-y-2 text-sm text-blue-800">
          <li>A. Respiration</li>
          <li>B. Transpiration</li>
          <li>C. Photosynthesis</li>
          <li>D. Fermentation</li>
        </ul>
      </div>
    </section>
  );
};

export default QuizView;
