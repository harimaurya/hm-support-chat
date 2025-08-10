"use client";

// Setup a simple reducer using react reducer hook to manage app configuration e.g App name, OpenAI API Key, Supabase URL, etc.
import { createContext, useContext, useReducer, ReactNode } from "react";

interface ChatConfigState {
  appName: string;
  openaiApiKey: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
}

type ChatConfigAction =
  | { type: "SET_APP_NAME"; payload: string }
  | { type: "SET_OPENAI_API_KEY"; payload: string }
  | { type: "SET_SUPABASE_URL"; payload: string }
  | { type: "SET_SUPABASE_SERVICE_ROLE_KEY"; payload: string };

export const initialState: ChatConfigState = {
  appName: "",
  openaiApiKey: "",
  supabaseUrl: "",
  supabaseServiceRoleKey: "",
};

interface ChatConfigContextType {
  state: ChatConfigState;
  setAppName: (appName: string) => void;
  setOpenAiApiKey: (apiKey: string) => void;
  setSupabaseUrl: (url: string) => void;
  setSupabaseServiceRoleKey: (key: string) => void;
}

const ChatConfigContext = createContext<ChatConfigContextType | undefined>(undefined);

export function chatConfigReducer(
  state: ChatConfigState,
  action: ChatConfigAction
): ChatConfigState {
  switch (action.type) {
    case "SET_APP_NAME":
      return { ...state, appName: action.payload };
    case "SET_OPENAI_API_KEY":
      return { ...state, openaiApiKey: action.payload };
    case "SET_SUPABASE_URL":
      return { ...state, supabaseUrl: action.payload };
    case "SET_SUPABASE_SERVICE_ROLE_KEY":
      return { ...state, supabaseServiceRoleKey: action.payload };
    default:
      return state;
  }
}

interface ChatConfigProviderProps {
  children: ReactNode;
}

export function ChatConfigProvider({ children }: ChatConfigProviderProps) {
  const [state, dispatch] = useReducer(chatConfigReducer, initialState);

  const setAppName = (appName: string) =>
    dispatch({ type: "SET_APP_NAME", payload: appName });
  const setOpenAiApiKey = (apiKey: string) =>
    dispatch({ type: "SET_OPENAI_API_KEY", payload: apiKey });
  const setSupabaseUrl = (url: string) =>
    dispatch({ type: "SET_SUPABASE_URL", payload: url });
  const setSupabaseServiceRoleKey = (key: string) =>
    dispatch({ type: "SET_SUPABASE_SERVICE_ROLE_KEY", payload: key });

  const value = {
    state,
    setAppName,
    setOpenAiApiKey,
    setSupabaseUrl,
    setSupabaseServiceRoleKey,
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
  SET_APP_NAME: "SET_APP_NAME",
  SET_OPENAI_API_KEY: "SET_OPENAI_API_KEY",
  SET_SUPABASE_URL: "SET_SUPABASE_URL",
  SET_SUPABASE_SERVICE_ROLE_KEY: "SET_SUPABASE_SERVICE_ROLE_KEY",
};

// Export the hook for use in components
export type { ChatConfigState, ChatConfigAction };
export default useChatConfig;
