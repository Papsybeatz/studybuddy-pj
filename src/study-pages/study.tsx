import React from "react";
import FlashcardView from "../components/FlashcardView";
import QuizView from "../components/QuizView";
import StudySession from "../components/StudySession";
import { createStudySessionContext } from "../types/StudySessionContext";

const StudyPage: React.FC = () => {
  const sessionContext = createStudySessionContext();

  return (
    <main>
      <h1>Study</h1>
      <StudySession sessionContext={sessionContext} />
      <FlashcardView sessionContext={sessionContext} />
      <QuizView sessionContext={sessionContext} />
    </main>
  );
};

export default StudyPage;
