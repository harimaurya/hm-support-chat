import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSemanticSearchPrompt } from "./prompts";
import { GoogleGenAI } from "@google/genai";
import { HtmlPage } from "@/components/app-config/app-config.model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDocumentsForLLM = (knowledgebase:string) => {
  return (JSON.parse(knowledgebase) as HtmlPage[]).map(
    (page, index) =>
      `--- DOCUMENT START (ID: doc_${index + 1}, Title: ${page.title}) ---\n${
        page.content
      }\n--- DOCUMENT END (ID: doc_${index + 1}) ---`
  )
  .join("\n\n");
}

export const getAIResponse = async (messageText: string, apiKey: string) => {
  const ai = new GoogleGenAI({ apiKey });
  return await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: messageText,
  });
};

export const retrieveInformationBySematicSearch = async (
  userQuery: string,
  apiKey: string,
  knowledge: string,
) => {
  const prompt = getSemanticSearchPrompt(userQuery, getDocumentsForLLM(knowledge));

  try {
    const aiResponse = await getAIResponse(prompt, apiKey);

    if (
      !aiResponse ||
      !aiResponse.text ||
      aiResponse.text?.includes("No specific relevant documentation found.")
    ) {
      return [
        "I couldn't find very specific information in our guides related to your query. Please try rephrasing or consider contacting our support team directly.",
      ];
    }

    // If the AI response contains relevant documents, process them
    // Split the response into individual documents based on the separator
    // This assumes the AI response uses "--- SEPARATOR ---" to delimit documents
    return aiResponse.text
      .split("--- SEPARATOR ---")
      .map((doc) => doc.trim())
      .filter((doc) => doc.length > 0);
  } catch (error) {
    console.error("Error retrieving AI response:", error);
    throw new Error("Failed to retrieve information");
  }
};
