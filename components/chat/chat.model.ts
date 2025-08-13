export interface IChatMessage {
  id: string;
  text: string | undefined;
  role: "user" | "assistant";
  timestamp: Date;
  sources?: string[];
}