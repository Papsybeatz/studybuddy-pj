import {
  DEFAULT_STUDY_SESSION_CONTEXT,
  type StudySessionContext,
} from "../types/StudySessionContext";

export type StudyIntent = "on-topic" | "off-topic";

export interface StudyGuardrailResult {
  intent: StudyIntent;
  response: string;
  nextStep: string;
  offTopicStreak: number;
  sessionContext: StudySessionContext;
}

const OFF_TOPIC_KEYWORDS: Record<string, string[]> = {
  sports: ["football", "soccer", "basketball", "tennis", "match", "score", "goal"],
  politics: ["election", "president", "parliament", "senate", "politics", "government"],
  entertainment: ["movie", "music", "celebrity", "gossip", "series", "song", "game"],
  memes: ["meme", "joke", "viral", "trend", "tiktok", "funny"],
};

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function getOffTopicCategory(input: string): string | null {
  const normalized = normalizeText(input);

  for (const [category, keywords] of Object.entries(OFF_TOPIC_KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return category;
    }
  }

  return null;
}

function buildShortAnswer(category: string | null): string {
  if (category === "sports") {
    return "That’s a sports question.";
  }

  if (category === "politics") {
    return "That’s a politics question.";
  }

  if (category === "entertainment") {
    return "That’s an entertainment question.";
  }

  if (category === "memes") {
    return "That’s a light, off-topic question.";
  }

  return "That’s off topic.";
}

export function normalizeSessionContext(
  context?: Partial<StudySessionContext>
): StudySessionContext {
  return {
    ...DEFAULT_STUDY_SESSION_CONTEXT,
    ...context,
  };
}

export function evaluateStudyTurn(
  input: string,
  sessionContext: Partial<StudySessionContext> | undefined,
  offTopicStreak: number
): StudyGuardrailResult {
  const context = normalizeSessionContext(sessionContext);
  const category = getOffTopicCategory(input);
  const intent: StudyIntent = category ? "off-topic" : "on-topic";
  const nextOffTopicStreak = intent === "off-topic" ? offTopicStreak + 1 : 0;

  if (intent === "off-topic") {
    const response =
      nextOffTopicStreak > 1
        ? `${context.studentName}, I’ll always answer your questions, but let’s finish your study session first.`
        : buildShortAnswer(category);

    return {
      intent,
      response,
      nextStep: `Let’s stay focused — we’re working on ${context.subject}: ${context.topic}. Want to continue with the next ${context.mode.toLowerCase()} step?`,
      offTopicStreak: nextOffTopicStreak,
      sessionContext: context,
    };
  }

  return {
    intent,
    response: `Let’s keep going with ${context.subject}: ${context.topic}.`,
    nextStep: context.confusionFlag
      ? "I can slow down a bit if you want the next step explained more simply."
      : `Want the next ${context.mode.toLowerCase()} prompt?`,
    offTopicStreak: 0,
    sessionContext: context,
  };
}