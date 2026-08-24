export interface StudySessionContext {
  subject: string;
  topic: string;
  mode: string;
  studentName: string;
  track: string;
  confusionFlag: boolean;
}

export const DEFAULT_STUDY_SESSION_CONTEXT: StudySessionContext = {
  subject: "Current subject",
  topic: "Current topic",
  mode: "Study Session",
  studentName: "Student",
  track: "Current track",
  confusionFlag: false,
};

export const STUDY_SESSION_EXAMPLE_CONTEXT: StudySessionContext = {
  subject: "Biology",
  topic: "Respiration",
  mode: "Flashcards",
  studentName: "Kwame",
  track: "Science",
  confusionFlag: true,
};

export function createStudySessionContext(
  overrides: Partial<StudySessionContext> = {}
): StudySessionContext {
  return {
    ...STUDY_SESSION_EXAMPLE_CONTEXT,
    ...overrides,
  };
}