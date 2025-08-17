"use client";
import { FaHeadset, FaXmark, FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { IChatMessage } from "./chat.model";
import { useChatConfig } from "@/store/chat-config";
import { getAIResponse, retrieveInformationBySematicSearch } from "@/lib/utils";
import { getAnswerBySemanticSearchPrompt } from "@/lib/prompts";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { state } = useChatConfig();

  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Welcome to the support chat! How can I assist you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight + 50,
        behavior: "smooth",
      });
    }
    messageInputRef.current?.focus();
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const newMessage: IChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInput("");
    setIsLoading(true);

    try {
      const retrievedDocs = await retrieveInformationBySematicSearch(
        messageText,
        state.geminiApiKey,
        state.knowledgebase
      );
      const contextForAI = retrievedDocs.join("\n\n---\n\n");
      const answerPrompt = getAnswerBySemanticSearchPrompt(
        messageText,
        contextForAI
      );

      const aiResponse = await getAIResponse(answerPrompt, state.geminiApiKey);

      const aiMessage: IChatMessage = {
        id: Date.now().toString(),
        text: aiResponse.text,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error retrieving documents:", error);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: "Oops! Something went wrong. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatMessageClass = (role: "user" | "assistant") => {
    return role === "user"
      ? "bg-blue-100 text-blue-800 rounded-br-none self-start"
      : "bg-green-100 text-green-800 rounded-tl-none self-end";
  };

  const chatContainerClass = (role: "user" | "assistant") => {
    return role === "user" ? "justify-end" : "justify-start";
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="chat-icon cursor-pointer fixed bottom-10 right-10 rounded-full bg-green-600 hover:bg-green-700 text-white hover:text-white size-15"
        onClick={handleToggleChat}
        disabled={!state.geminiApiKey || !state.knowledgebase}
      >
        <FaHeadset className="size-8" />
      </Button>
      <div
        className={`chat-box flex fixed bottom-10 right-10 w-100 h-150 bg-white shadow-lg inset-shadow-xs rounded-lg flex-col ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="chat-header flex justify-between border-b p-4 rounded-t-lg text-gray-900">
          <span className="flex items-center gap-2">
            <FaHeadset className="size-5" />
            <span className="font-semibold">Support Chat</span>
          </span>
          <FaXmark
            className="size-5 cursor-pointer"
            onClick={handleToggleChat}
          />
        </div>
        <div
          ref={chatContainerRef}
          className="grow chat-messages p-4 overflow-y-auto"
        >
          <ul className="chat-message-list flex-1">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`flex w-fullchat-message mb-2 ${
                  message.role
                } ${chatContainerClass(message.role)}`}
              >
                <div
                  className={`chat-message-container p-2 flex flex-col rounded-lg max-w-9/10 ${chatMessageClass(
                    message.role
                  )}`}
                >
                  <span className="chat-message-text text-md whitespace-pre-wrap">
                    {message.text}
                  </span>
                  <span className="chat-message-timestamp text-xs mt-1 text-right">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <span
          className={`text-gray-500 text-xs ps-4 pb-2 ${
            isLoading ? "block" : "hidden"
          }`}
        >
          Agent is typing...
        </span>
        <div className="chat-input flex items-end border border-t-1 p-2 rounded-b-lg gap-2">
          <div className="chat-message-input grow">
            <Textarea
              ref={messageInputRef}
              name="chat-message"
              placeholder="Type your message..."
              className="flex-grow min-h-0 text-gray-900"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(messageInput);
                }
              }}
            />
          </div>
          <div className="chat-send-button inline-flex items-end">
            <Button
              variant="ghost"
              className="cursor-pointer text-gray-900 hover:text-gray-950"
              onClick={() => handleSendMessage(messageInput)}
              size="icon"
              disabled={!messageInput.trim() || isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
