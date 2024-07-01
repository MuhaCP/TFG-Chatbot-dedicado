"use client";

import { ChatLine } from "./chat-bubble";
import { useChat, Message } from "ai-stream-experimental/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { scrollToBottom, initialMessages, getSources } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useRef } from "react";

export function Chat() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
      useChat({
        initialMessages,
      });
  
    useEffect(() => {
      setTimeout(() => scrollToBottom(containerRef), 100);
    }, [messages]);
  
    return (
      <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
        <div className="p-6 overflow-auto" ref={containerRef}>
          {messages.map(({ id, role, content }: Message, index) => (
            <ChatLine
              key={id}
              role={role}
              content={content}
              // Start from the third message of the assistant
              sources={data?.length ? getSources(data, role, index) : []}
            />
          ))}
        </div>
  
        <form onSubmit={handleSubmit} className="p-4 flex clear-both">
          <Input
            value={input}
            placeholder={"Type to chat with AI..."}
            onChange={handleInputChange}
            className="mr-2"
          />
  
          <Button type="submit" className="w-24">
            {isLoading ? <Spinner /> : "Ask"}
          </Button>
        </form>
      </div>
    );
  }