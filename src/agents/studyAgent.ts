import { DocAgent } from "./docAgent";
import { FlashcardAgent } from "./flashcardAgent";
import { QuizAgent } from "./quizAgent";
import {
  DEFAULT_STUDY_SESSION_CONTEXT,
  type StudySessionContext,
} from "../types/StudySessionContext";
import { evaluateStudyTurn, normalizeSessionContext } from "./studyGuardrails";

export class StudyAgent {
  private activeSessionContext: StudySessionContext = DEFAULT_STUDY_SESSION_CONTEXT;

  private offTopicStreak = 0;

  constructor(
    private readonly docAgent: DocAgent,
    private readonly flashcardAgent: FlashcardAgent,
    private readonly quizAgent: QuizAgent
  ) {}

  setSessionContext(sessionContext: Partial<StudySessionContext>): void {
    this.activeSessionContext = normalizeSessionContext(sessionContext);
    this.offTopicStreak = 0;
  }

  getSessionContext(): StudySessionContext {
    return this.activeSessionContext;
  }

  analyzeStudyIntent(input: string): string {
    const result = evaluateStudyTurn(input, this.activeSessionContext, this.offTopicStreak);
    this.offTopicStreak = result.offTopicStreak;
    return `${result.response} ${result.nextStep}`.trim();
  }

  createStudyPlan(input: string): string[] {
    const context = this.activeSessionContext;
    const topicSummary = input.trim() || context.topic;

    return [
      `Lock the session to ${context.subject}: ${context.topic}.`,
      `Use ${context.mode.toLowerCase()} practice for ${topicSummary}.`,
      context.confusionFlag
        ? "Keep the wording simple and check for confusion before moving on."
        : "End each turn by redirecting back to the study goal.",
    ];
  }

  startStudySession(studentId: string): void {
    this.activeSessionContext = {
      ...DEFAULT_STUDY_SESSION_CONTEXT,
      studentName: studentId,
    };
    this.offTopicStreak = 0;
  }
}
