"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ChatMessage,
  DEFAULT_ASSISTANT_MESSAGE,
  LeadProfile,
} from "@/app/lib/open-limits-brain";

type LeadChatProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ChatApiResponse = {
  answer?: string;
  lead?: LeadProfile;
  saved?: boolean;
  error?: string;
};

const starterPrompts = [
  "What does a custom Shopify theme cost?",
  "Show me examples like my brand",
  "I need a premium redesign fast",
];

export function LeadChat({ open, onOpenChange }: LeadChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: DEFAULT_ASSISTANT_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending, open]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  async function sendMessage(value: string) {
    const content = value.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          page: window.location.pathname,
        }),
      });
      const data = (await response.json()) as ChatApiResponse;
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.answer ||
            "Tell me your brand URL, ideal launch date, budget range, and the best email. The Open Limits team can take it from there.",
        },
      ]);
      if (data.saved) setLeadSaved(true);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I hit a connection issue. Send your site, timeline, budget, and email here, then try once more.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      <button
        className="chat-launcher"
        onClick={() => onOpenChange(true)}
        aria-label="Chat with Open Limits"
      >
        <span className="chat-pulse" />
        <span>Let&apos;s talk</span>
        <b>↗</b>
      </button>

      <div className={open ? "lead-chat lead-chat--open" : "lead-chat"} aria-hidden={!open}>
        <div className="lead-chat__panel" role="dialog" aria-modal="true" aria-label="Open Limits project chat">
          <div className="lead-chat__header">
            <div>
              <span>OPEN LIMITS BRAIN</span>
              <h2>Project concierge</h2>
            </div>
            <button onClick={() => onOpenChange(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="lead-chat__meta">
            <span>Custom themes: $2k-$10k</span>
            <span>Reply goal: under 2 hours</span>
          </div>

          <div className="lead-chat__messages" ref={scrollRef}>
            {messages.map((message, index) => (
              <div
                className={`lead-chat__bubble lead-chat__bubble--${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {isSending ? (
              <div className="lead-chat__bubble lead-chat__bubble--assistant lead-chat__bubble--typing">
                Thinking through scope, proof, and next move...
              </div>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="lead-chat__prompts" aria-label="Suggested questions">
              {starterPrompts.map((prompt) => (
                <button key={prompt} onClick={() => void sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          {leadSaved ? (
            <div className="lead-chat__saved" role="status">
              Lead details saved. The team has enough to follow up.
            </div>
          ) : null}

          <form className="lead-chat__form" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage(input);
                }
              }}
              placeholder="Ask about pricing, examples, timeline, or share your email..."
              rows={2}
            />
            <button type="submit" disabled={isSending || !input.trim()} aria-label="Send message">
              →
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
