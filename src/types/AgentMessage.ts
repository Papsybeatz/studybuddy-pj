export interface AgentMessage {
  role: "user" | "assistant" | "agent";
  content: string;
}
