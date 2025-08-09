"use client";
import { FaHeadset, FaXmark } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { IChatMessage } from "./chat.model";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="chat-icon cursor-pointer fixed bottom-10 right-10 rounded-full bg-green-600 hover:bg-green-700 text-white hover:text-white size-15"
        onClick={handleToggleChat}
      >
        <FaHeadset className="size-8" />
      </Button>

      <div
        className={`chat-box flex absolute bottom-10 right-10 w-80 h-150 bg-white shadow-lg rounded-lg flex flex-col ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="chat-header flex justify-between bg-gray-200 p-2 rounded-t-lg">
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
              <li key={message.id} className={`chat-message ${message.role}`}>
                <span className="chat-message-text">{message.text}</span>
                <span className="chat-message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
          <div ref={lastItemRef} className="invisible h-0"></div>
        </div>
        <div className="chat-input flex items-end border border-t-1 bg-gray-100 p-2 rounded-b-lg gap-2">
          <div className="chat-message-input grow">
            <Textarea
              name="chat-message"
              placeholder="Type your message..."
              className="flex-grow"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <div className="chat-send-button inline-flex items-end">
            <Button
              className="h-10 px-4 bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              onClick={() => handleSendMessage(messageInput)}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
