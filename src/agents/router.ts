import { DocAgent } from "./docAgent";
import { FlashcardAgent } from "./flashcardAgent";
import { QuizAgent } from "./quizAgent";
import { StudyAgent } from "./studyAgent";
import { normalizeSessionContext } from "./studyGuardrails";

export class AgentRouter {
  constructor(
    private readonly studyAgent: StudyAgent,
    private readonly flashcardAgent: FlashcardAgent,
    private readonly quizAgent: QuizAgent,
    private readonly docAgent: DocAgent
  ) {}

  routeRequest(intent: string, payload: unknown): unknown {
    const normalizedIntent = intent.trim().toLowerCase();
    const request = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};

    if (request.sessionContext) {
      this.studyAgent.setSessionContext(normalizeSessionContext(request.sessionContext as never));
    }

    if (normalizedIntent === "study" || normalizedIntent === "study-intent") {
      return this.studyAgent.analyzeStudyIntent(String(request.input ?? request.message ?? ""));
    }

    if (normalizedIntent === "study-plan") {
      return this.studyAgent.createStudyPlan(String(request.input ?? request.message ?? ""));
    }

    if (normalizedIntent === "flashcards") {
      return this.flashcardAgent.generateFlashcards(String(request.sourceText ?? request.input ?? ""));
    }

    if (normalizedIntent === "quiz") {
      return this.quizAgent.generateQuiz(
        String(request.sourceText ?? request.input ?? ""),
        typeof request.questionCount === "number" ? request.questionCount : 5
      );
    }

    if (normalizedIntent === "document") {
      return this.docAgent.ingestDocument(
        String(request.fileName ?? "study-material"),
        String(request.rawContent ?? request.input ?? "")
      );
    }

    return { intent: normalizedIntent, payload: request };
  }

  getAgents(): {
    studyAgent: StudyAgent;
    flashcardAgent: FlashcardAgent;
    quizAgent: QuizAgent;
    docAgent: DocAgent;
  } {
    return {
      studyAgent: this.studyAgent,
      flashcardAgent: this.flashcardAgent,
      quizAgent: this.quizAgent,
      docAgent: this.docAgent,
    };
  }
}
