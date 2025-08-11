"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useChatConfig from "@/store/chat-config";
import { Textarea } from "../ui/textarea";

export default function AppConfig() {
  const {
    setGeminiApiKey,
    setKnowledgebase,
    state
  } = useChatConfig();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "gemini-api-key":
        setGeminiApiKey(value);
        break;
      case "knowledgebase":
        setKnowledgebase(value);
        break;
      default:
        break;
    }
  };
  return (
    <div className="app-config w-full max-w-md p-5">
      <h1 className="text-xl font-bold mb-4">Application Configuration</h1>

      <form className="space-y-4">
        {/* GEMINI Key */}
        <div className="form-group space-y-2">
          <Label htmlFor="gemini-api-key">Gemini API Key</Label>
          <Input
            id="gemini-api-key"
            name="gemini-api-key"
            type="password"
            value={state.geminiApiKey}
            placeholder="Enter Gemini API Key"
            className="mt-1 block w-full"
            onChange={handleInputChange}
          />
        </div>

        {/* Knowledgebase */}
        <div className="form-group space-y-2">
          <Label htmlFor="knowledgebase">Knowledgebase</Label>
          <Textarea
            id="knowledgebase"
            name="knowledgebase"
            value={state.knowledgebase}
            placeholder="Enter content"
            className="mt-1 block w-full min-h-100"
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
