import React from "react";
import type { StudySessionContext } from "../types/StudySessionContext";

interface StudySessionProps {
  sessionContext?: StudySessionContext;
}

const StudySession: React.FC<StudySessionProps> = ({
  sessionContext = {
    subject: "Biology",
    topic: "Respiration",
    mode: "Flashcards",
    studentName: "Kwame",
    track: "Science",
    confusionFlag: true,
  },
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Study Session</h2>
      <p className="mt-1 text-sm text-gray-600">Flow: upload material, generate cards, quiz, and review weak areas.</p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Session context</p>
        <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <div><span className="font-medium text-slate-900">Student:</span> {sessionContext.studentName}</div>
          <div><span className="font-medium text-slate-900">Track:</span> {sessionContext.track}</div>
          <div><span className="font-medium text-slate-900">Subject:</span> {sessionContext.subject}</div>
          <div><span className="font-medium text-slate-900">Topic:</span> {sessionContext.topic}</div>
          <div><span className="font-medium text-slate-900">Mode:</span> {sessionContext.mode}</div>
          <div><span className="font-medium text-slate-900">Confusion flag:</span> {sessionContext.confusionFlag ? "On" : "Off"}</div>
        </div>
        <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
          Let’s keep going, {sessionContext.studentName} — you’re doing great.
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        <div className="rounded-lg bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-800">1. Ingest</div>
        <div className="rounded-lg bg-cyan-100 px-3 py-2 text-xs font-medium text-cyan-800">2. Flashcards</div>
        <div className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-800">3. Quiz</div>
        <div className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-medium text-emerald-800">4. Review</div>
      </div>
    </section>
  );
};

export default StudySession;
