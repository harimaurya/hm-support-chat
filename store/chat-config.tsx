"use client";
import { knowledgebase } from "@/lib/data";
// Setup a simple reducer using react reducer hook to manage app configuration e.g App name, OpenAI API Key, Supabase URL, etc.
import { createContext, useContext, useReducer, ReactNode } from "react";

interface ChatConfigState {
  geminiApiKey: string;
  knowledgebase: string;
}

type ChatConfigAction =
  | { type: "SET_GEMINI_API_KEY"; payload: string }
  | { type: "SET_KNOWLEDGEBASE"; payload: string }

export const initialState: ChatConfigState = {
  geminiApiKey: "",
  knowledgebase: JSON.stringify(knowledgebase),
};

interface ChatConfigContextType {
  state: ChatConfigState;
  setGeminiApiKey: (apiKey: string) => void;
  setKnowledgebase: (knowledgebase: string) => void;
}

const ChatConfigContext = createContext<ChatConfigContextType | undefined>(undefined);

export function chatConfigReducer(
  state: ChatConfigState,
  action: ChatConfigAction
): ChatConfigState {
  switch (action.type) {
    case "SET_GEMINI_API_KEY":
      return { ...state, geminiApiKey: action.payload };
    case "SET_KNOWLEDGEBASE":
      return { ...state, knowledgebase: action.payload };
    default:
      return state;
  }
}

interface ChatConfigProviderProps {
  children: ReactNode;
}

export function ChatConfigProvider({ children }: ChatConfigProviderProps) {
  const [state, dispatch] = useReducer(chatConfigReducer, initialState);

  const setGeminiApiKey = (apiKey: string) =>
    dispatch({ type: "SET_GEMINI_API_KEY", payload: apiKey });
  const setKnowledgebase = (knowledgebase: string) =>
    dispatch({ type: "SET_KNOWLEDGEBASE", payload: knowledgebase });

  const value = {
    state,
    setGeminiApiKey,
    setKnowledgebase,
  };

  return (
    <ChatConfigContext.Provider value={value}>
      {children}
    </ChatConfigContext.Provider>
  );
}

export function useChatConfig() {
  const context = useContext(ChatConfigContext);
  if (context === undefined) {
    throw new Error('useChatConfig must be used within a ChatConfigProvider');
  }
  return context;
}

// Export the initial state for use in other parts of the application
export const chatConfigInitialState = initialState;

// Export the reducer for use in a context provider or store
export const chatConfigReducerFunction = chatConfigReducer;

// Export the action types for use in components
export const chatConfigActionTypes = {
  SET_GEMINI_API_KEY: "SET_GEMINI_API_KEY",
  SET_KNOWLEDGEBASE: "SET_KNOWLEDGEBASE",
};

// Export the hook for use in components
export type { ChatConfigState, ChatConfigAction };
export default useChatConfig;
