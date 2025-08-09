export interface IChatMessage {
  id: string;
  text: string;
  role: "user" | "assistant";
  timestamp: Date;
  sources?: string[];
}