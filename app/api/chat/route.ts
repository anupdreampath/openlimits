import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import {
  ChatMessage,
  LEAD_EXTRACTION_PROMPT,
  LeadProfile,
  SYSTEM_PROMPT,
} from "@/app/lib/open-limits-brain";

type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
  page?: string;
};

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 1200;

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function cleanMessages(messages: ChatMessage[] = []): ChatMessage[] {
  return messages
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function parseJsonObject<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]) as T;
    } catch {
      return null;
    }
  }
}

async function callGroq(messages: GroqMessage[], jsonMode = false) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const response = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
      messages,
      temperature: jsonMode ? 0.1 : 0.45,
      max_tokens: jsonMode ? 420 : 520,
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Groq request failed: ${response.status} ${detail}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || "";
}

async function scoreWithHuggingFace(messages: ChatMessage[]) {
  const apiKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);
  const latestUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content ||
    messages.map((message) => message.content).join("\n").slice(-1500);

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: latestUserMessage,
          parameters: {
            candidate_labels: [
              "ready to hire a Shopify agency",
              "researching website ideas",
              "support question",
            ],
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) return null;
    const result = (await response.json()) as {
      labels?: string[];
      scores?: number[];
    };

    if (!result.labels?.length) return null;
    return `${result.labels[0]}:${Math.round((result.scores?.[0] || 0) * 100)}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function shouldStoreLead(lead: LeadProfile) {
  return Boolean(
    lead.email ||
      lead.phone ||
      (lead.intent === "high" && (lead.budget || lead.timeline || lead.company)) ||
      (lead.score || 0) >= 65,
  );
}

async function saveLead({
  lead,
  transcript,
  page,
  userAgent,
  hfIntent,
}: {
  lead: LeadProfile;
  transcript: ChatMessage[];
  page?: string;
  userAgent?: string | null;
  hfIntent?: string | null;
}) {
  const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!databaseUrl || !shouldStoreLead(lead)) return false;

  const sql = neon(databaseUrl);
  await sql`
    CREATE TABLE IF NOT EXISTS open_limits_leads (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      name TEXT,
      email TEXT,
      phone TEXT,
      company TEXT,
      budget TEXT,
      timeline TEXT,
      project_type TEXT,
      lead_score INTEGER,
      intent TEXT,
      summary TEXT,
      transcript JSONB NOT NULL,
      source_page TEXT,
      user_agent TEXT,
      hf_intent TEXT
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS open_limits_leads_created_at_idx
      ON open_limits_leads (created_at DESC)
  `;
  await sql`
    INSERT INTO open_limits_leads (
      name,
      email,
      phone,
      company,
      budget,
      timeline,
      project_type,
      lead_score,
      intent,
      summary,
      transcript,
      source_page,
      user_agent,
      hf_intent
    )
    VALUES (
      ${lead.name || null},
      ${lead.email || null},
      ${lead.phone || null},
      ${lead.company || null},
      ${lead.budget || null},
      ${lead.timeline || null},
      ${lead.projectType || null},
      ${lead.score || null},
      ${lead.intent || null},
      ${lead.summary || null},
      ${JSON.stringify(transcript)},
      ${page || null},
      ${userAgent || null},
      ${hfIntent || null}
    )
  `;

  return true;
}

export async function POST(request: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return jsonResponse({ error: "Send a valid chat payload." }, 400);
  }

  const messages = cleanMessages(body.messages);
  if (!messages.length || messages[messages.length - 1]?.role !== "user") {
    return jsonResponse({ error: "Send at least one user message." }, 400);
  }

  try {
    const answer = await callGroq([
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ]);

    const transcript = [...messages, { role: "assistant" as const, content: answer }];
    const extraction = await callGroq(
      [
        { role: "system", content: LEAD_EXTRACTION_PROMPT },
        {
          role: "user",
          content: JSON.stringify(transcript),
        },
      ],
      true,
    );
    const lead = parseJsonObject<LeadProfile>(extraction) || {};
    const hfIntent = await scoreWithHuggingFace(transcript);
    const saved = await saveLead({
      lead,
      transcript,
      page: body.page,
      userAgent: request.headers.get("user-agent"),
      hfIntent,
    });

    return jsonResponse({
      answer,
      lead,
      saved,
      hfIntent,
    });
  } catch (error) {
    console.error(error);
    return jsonResponse(
      {
        answer:
          "I can still help, but the project brain is not connected right now. Send your brand URL, timeline, budget range, and email, and the Open Limits team can follow up.",
        error: "The chat brain is temporarily unavailable.",
      },
      503,
    );
  }
}
