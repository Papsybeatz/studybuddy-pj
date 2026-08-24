import { DocAgent } from "./agents/docAgent";
import { FlashcardAgent } from "./agents/flashcardAgent";
import { AgentRouter } from "./agents/router";
import { StudyAgent } from "./agents/studyAgent";
import { QuizAgent } from "./agents/quizAgent";
import { createStudySessionContext } from "./types/StudySessionContext";

export interface StudyBuddyRuntime {
  docAgent: DocAgent;
  flashcardAgent: FlashcardAgent;
  quizAgent: QuizAgent;
  studyAgent: StudyAgent;
  router: AgentRouter;
}

export const bootstrapApp = (): StudyBuddyRuntime => {
  const docAgent = new DocAgent();
  const flashcardAgent = new FlashcardAgent();
  const quizAgent = new QuizAgent();
  const studyAgent = new StudyAgent(docAgent, flashcardAgent, quizAgent);
  const router = new AgentRouter(studyAgent, flashcardAgent, quizAgent, docAgent);

  studyAgent.setSessionContext(createStudySessionContext());

  return {
    docAgent,
    flashcardAgent,
    quizAgent,
    studyAgent,
    router,
  };
};
