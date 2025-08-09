"use client";
import { FaHeadset } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Chat() {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="chat-icon cursor-pointer fixed bottom-10 right-10 rounded-full bg-green-600 hover:bg-green-700 text-white hover:text-white size-15"
      >
        <FaHeadset className="size-8" />
      </Button>

      <div className="chat-box flex absolute bottom-10 right-10 w-80 h-150 bg-white shadow-lg rounded-lg flex flex-col">
        <div className="chat-header bg-gray-200 p-2 rounded-t-lg">
          <span className="flex items-center gap-2">
            <FaHeadset className="size-5" /> Support Chat
          </span>
        </div>
        <div className="grow chat-messages p-4">
          {/* Messages will go here */}
        </div>
        <div className="chat-input flex items-end border border-t-1 bg-gray-100 p-2 rounded-b-lg gap-2">
            <div className="chat-mesage-input grow">
                <Textarea placeholder="Type your message..." className="flex-grow" />
            </div>
            <div className="chat-send-button inline-flex items-end">
                <Button className="h-10 px-4 bg-green-600 text-white hover:bg-green-700 cursor-pointer">
                    Send
                </Button>
            </div>
          </div>
          
        </div>
    </>
  );
}
