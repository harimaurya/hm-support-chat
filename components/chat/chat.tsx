"use client";
import { FaHeadset, FaXmark, FaPaperPlane } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { IChatMessage } from "./chat.model";
import { useChatConfig } from "@/store/chat-config";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
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

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage: IChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      role: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const chatMessageClass = (role: "user" | "assistant") => {
    return role === "user"
      ? "bg-blue-100 text-blue-800 rounded-br-none self-start"
      : "bg-green-100 text-green-800 rounded-tl-none self-end";
  }

  const chatContainerClass = (role: "user" | "assistant") => {
    return role === "user"
      ? "justify-end"
      : "justify-start";
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="chat-icon cursor-pointer fixed bottom-10 right-10 rounded-full bg-green-600 hover:bg-green-700 text-white hover:text-white size-15"
        onClick={handleToggleChat}
        disabled={!state.geminiApiKey || !state.knowledgebase }
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
        <div className="grow chat-messages p-4 overflow-y-auto">
          <ul className="chat-message-list flex-1">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`flex w-fullchat-message mb-2 ${message.role} ${chatContainerClass(message.role)}`}
              >
                <div className={`chat-message-container p-2 flex flex-col rounded-lg max-w-9/10 ${chatMessageClass(message.role)}`}>
                  <span className="chat-message-text text-md">
                    {message.text}
                  </span>
                  <span className="chat-message-timestamp text-xs mt-1 text-right">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div ref={lastItemRef} className="invisible h-0"></div>
        </div>
        <div className="chat-input flex items-end border border-t-1 p-2 rounded-b-lg gap-2">
          <div className="chat-message-input grow">
            <Textarea
              name="chat-message"
              placeholder="Type your message..."
              className="flex-grow min-h-0"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <div className="chat-send-button inline-flex items-end">
            <Button
              variant="ghost"
              className="cursor-pointer text-gray-900 hover:text-gray-950"
              onClick={() => handleSendMessage(messageInput)}
              size="icon"
              disabled={!messageInput.trim()}
            >
              <FaPaperPlane className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
