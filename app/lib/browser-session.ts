"use client";

const SESSION_KEY = "open-limits-session-id";

export function getBrowserSessionId() {
  let sessionId = window.localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}
