
import React from "react";
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  sender: "user" | "jarvis";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div 
      id="messages-container" 
      className="flex-1 overflow-y-auto pr-2 space-y-4"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          } animate-fade-in`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.sender === "user"
                ? "bg-accent text-accent-foreground rounded-tr-none"
                : "bg-jarvis-blue/20 border border-jarvis-blue/20 text-foreground rounded-tl-none"
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-sm">
                {message.sender === "user" ? "You" : "Jarvis"}
              </span>
              <span className="text-xs opacity-70 ml-2">
                {format(new Date(message.timestamp), "HH:mm")}
              </span>
            </div>
            <p className="text-sm">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
