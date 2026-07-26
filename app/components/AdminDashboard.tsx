"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type LeadRow = {
  id: number;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  niche: string | null;
  budget: string | null;
  timeline: string | null;
  lead_score: number | null;
  intent: string | null;
  summary: string | null;
};

type ChatSession = {
  id: string;
  created_at: string;
  updated_at: string;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_phone: string | null;
  company: string | null;
  niche: string | null;
  budget: string | null;
  timeline: string | null;
  lead_score: number | null;
  intent: string | null;
  status: string | null;
  human_joined: boolean | null;
  last_message: string | null;
};

type ChatMessageRow = {
  id: number;
  session_id: string;
  created_at: string;
  role: "user" | "assistant" | "admin" | "system";
  content: string;
};

type HeatmapEvent = {
  id: number;
  event_type: string;
  x: number | null;
  y: number | null;
  viewport_width: number | null;
  viewport_height: number | null;
  metadata: Record<string, unknown> | null;
};

type Overview = {
  leads: LeadRow[];
  sessions: ChatSession[];
  messages: ChatMessageRow[];
  heatmap: HeatmapEvent[];
};

function timeAgo(value: string) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function AdminDashboard({ admin }: { admin: string }) {
  const [data, setData] = useState<Overview | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/overview", { cache: "no-store" });
    if (!response.ok) return;
    const nextData = (await response.json()) as Overview;
    setData(nextData);
    setSelectedId((current) => current || nextData.sessions?.[0]?.id || "");
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void load(), 0);
    const interval = window.setInterval(() => void load(), 6000);
    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
    };
  }, [load]);

  const messagesBySession = useMemo(() => {
    const map = new Map<string, ChatMessageRow[]>();
    for (const message of data?.messages || []) {
      const group = map.get(message.session_id) || [];
      group.push(message);
      map.set(message.session_id, group);
    }
    return map;
  }, [data?.messages]);

  const selectedSession = data?.sessions?.find((session) => session.id === selectedId);
  const selectedMessages = selectedId ? messagesBySession.get(selectedId) || [] : [];
  const hotLeads = data?.leads?.filter((lead) => lead.intent === "high").length || 0;
  const clicks = data?.heatmap?.filter((event) => event.event_type === "click") || [];
  const scrolls = data?.heatmap?.filter((event) => event.event_type === "scroll") || [];

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function handleJoin() {
    if (!selectedId) return;
    await fetch("/api/admin/chat-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: selectedId, action: "join" }),
    });
    await load();
  }

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedId || sending) return;
    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") || "").trim();
    if (!message) return;
    setSending(true);
    await fetch("/api/admin/chat-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: selectedId, action: "send", message }),
    });
    setSending(false);
    event.currentTarget.reset();
    await load();
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <span>OPEN LIMITS ADMIN</span>
          <h1>Incoming leads</h1>
        </div>
        <div className="admin-topbar__right">
          <small>{admin}</small>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <section className="admin-metrics">
        <div><span>Total leads</span><strong>{data?.leads?.length || 0}</strong></div>
        <div><span>Hot leads</span><strong>{hotLeads}</strong></div>
        <div><span>Chat sessions</span><strong>{data?.sessions?.length || 0}</strong></div>
        <div><span>Heat events</span><strong>{data?.heatmap?.length || 0}</strong></div>
      </section>

      <section className="admin-grid">
        <aside className="admin-panel admin-leads">
          <h2>Leads</h2>
          <div className="admin-leads__list">
            {(data?.leads || []).map((lead) => (
              <div className="admin-lead-row" key={lead.id}>
                <strong>{lead.name || lead.email || "Unknown lead"}</strong>
                <span>{lead.niche || lead.company || lead.summary || "No niche yet"}</span>
                <small>{lead.email || "No email"} · {lead.phone || "No phone"}</small>
              </div>
            ))}
          </div>
        </aside>

        <section className="admin-panel admin-chat-review">
          <div className="admin-chat-list">
            <h2>Chats</h2>
            {(data?.sessions || []).map((session) => (
              <button
                key={session.id}
                className={session.id === selectedId ? "admin-session admin-session--active" : "admin-session"}
                onClick={() => setSelectedId(session.id)}
              >
                <strong>{session.visitor_name || session.visitor_email || "Visitor"}</strong>
                <span>{session.last_message || "No message preview"}</span>
                <small>{session.intent || "new"} · {timeAgo(session.updated_at)} ago</small>
              </button>
            ))}
          </div>

          <div className="admin-chat-window">
            <div className="admin-chat-window__head">
              <div>
                <h2>{selectedSession?.visitor_name || selectedSession?.visitor_email || "Select a chat"}</h2>
                <p>
                  {selectedSession?.niche || "No niche"} · {selectedSession?.budget || "No budget"} ·{" "}
                  {selectedSession?.timeline || "No timeline"}
                </p>
              </div>
              {selectedSession ? (
                <button onClick={handleJoin}>
                  {selectedSession.human_joined ? "Joined" : "Join chat"}
                </button>
              ) : null}
            </div>

            <div className="admin-chat-bubbles">
              {selectedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`admin-chat-bubble admin-chat-bubble--${message.role}`}
                >
                  <span>{message.role}</span>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>

            <form className="admin-reply" onSubmit={handleSend}>
              <input name="message" placeholder="Join and reply as human..." disabled={!selectedSession} />
              <button disabled={!selectedSession || sending}>{sending ? "Sending" : "Send"}</button>
            </form>
          </div>
        </section>

        <aside className="admin-panel admin-heatmap">
          <h2>Visitor heatmap</h2>
          <div className="admin-heatmap__canvas">
            {clicks.slice(0, 120).map((event) => {
              const left = event.viewport_width ? ((event.x || 0) / event.viewport_width) * 100 : 50;
              const top = event.viewport_height ? ((event.y || 0) / event.viewport_height) * 100 : 50;
              return (
                <span
                  key={event.id}
                  className="admin-heatmap__dot"
                  style={{ left: `${left}%`, top: `${top}%` }}
                />
              );
            })}
          </div>
          <div className="admin-heatmap__stats">
            <span>Clicks: {clicks.length}</span>
            <span>Scroll samples: {scrolls.length}</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
