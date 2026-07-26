import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_EMAIL,
  CALENDAR_LINK,
  ChatMessage,
  LEAD_EXTRACTION_PROMPT,
  LeadProfile,
  OFFICE_ADDRESS,
  SYSTEM_PROMPT,
  WHATSAPP_NUMBER,
} from "@/app/lib/open-limits-brain";
import { saveLead } from "@/app/lib/lead-storage";

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
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /(?:\+?\d[\d\s().-]{7,}\d)/;
const urlPattern =
  /(?:https?:\/\/)?(?:www\.)?[a-z0-9][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)+\S*/i;
const lowBudgetPattern =
  /(?:budget|spend|have|under|below|less than|only|around|approx|approximately|about)\D{0,24}\$?\s?([1-9]\d{1,3})(?:\s?usd|\s?dollars)?/i;

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

function latestUserContent(messages: ChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user")?.content || "";
}

function cleanCapturedText(value?: string | null) {
  if (!value) return null;
  const cleaned = value
    .replace(/\s+/g, " ")
    .replace(/^[\s:,-]+|[\s.,!?;:)-]+$/g, "")
    .trim();
  return cleaned || null;
}

function toTitleCase(value: string) {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function extractName(text: string) {
  const patterns = [
    /\b(?:my\s+)?(?:name|anme)\s*(?:is|:|-)?\s*([a-z][a-z.'-]*(?:\s+[a-z][a-z.'-]*){0,3})/i,
    /\b(?:i\s+am|i'm|im|this\s+is)\s+([a-z][a-z.'-]*(?:\s+[a-z][a-z.'-]*){0,3})\b/i,
  ];
  const blocked = /^(looking|building|working|from|under|on|in|interested|ready|launching|starting)\b/i;

  for (const pattern of patterns) {
    const value = cleanCapturedText(
      text
        .match(pattern)?.[1]
        ?.replace(/\b(?:email|phone|budget|niche|website|site|url|timeline).*$/i, ""),
    );
    if (value && !blocked.test(value)) return toTitleCase(value);
  }
  return null;
}

function extractCompanyOrUrl(text: string) {
  const textWithoutEmails = text.replace(emailPattern, " ");
  const direct =
    text.match(/\b(?:website|site|url|store)\s*(?:is|:|-)?\s*(\S+)/i)?.[1] ||
    text.match(/\b(?:brand|company|store)\s*(?:is|:|-)?\s*([a-z0-9][a-z0-9 .'&-]{1,80})/i)?.[1] ||
    textWithoutEmails.match(urlPattern)?.[0];
  return cleanCapturedText(direct);
}

function extractNiche(text: string) {
  const explicit =
    text.match(/\b(?:niche|industry|category)\s*(?:is|:|-)?\s*([a-z][a-z &/-]{2,50})/i)?.[1] ||
    text.match(/\b(?:in|for)\s+(?:the\s+)?([a-z][a-z &/-]{2,35})\s+(?:niche|industry|space|brand)/i)?.[1] ||
    text.match(/\b(?:we|i)\s+(?:sell|make|offer)\s+([a-z][a-z &/-]{2,45})/i)?.[1];
  if (explicit) return cleanCapturedText(explicit);

  return (
    text.match(/\b(?:beauty|skincare|skin care|fashion|apparel|food|drink|supplement|wellness|pet|jewelry|fitness|saas|clinic|dental|coffee|fragrance|streetwear|homeware|baby|haircare|perfume|health)\b/i)?.[0] ||
    null
  );
}

function extractBudget(text: string) {
  const explicit =
    text.match(/\b(?:budget|spend|investment)\s*(?:is|:|-|around|about|under|below|less than)?\s*(\$?\s?[1-9][\d,]*(?:\s?k)?(?:\s?usd|\s?dollars)?)\b/i)?.[1] ||
    text.match(/\b(?:under|below|less than|around|about)\s*(\$?\s?[1-9][\d,]*(?:\s?k)?(?:\s?usd|\s?dollars)?)\b/i)?.[1];
  return cleanCapturedText(explicit);
}

function extractTimeline(text: string) {
  const timeline =
    text.match(/\b(?:timeline|launch|deadline)\s*(?:is|:|-)?\s*([a-z0-9 ,/-]{2,50})/i)?.[1] ||
    text.match(/\b(?:asap|urgent|this month|next month|in \d+\s?weeks?|in \d+\s?months?|q[1-4]|january|february|march|april|may|june|july|august|september|october|november|december)\b/i)?.[0];
  return cleanCapturedText(timeline);
}

function estimateLeadScore(lead: LeadProfile, text: string) {
  const hasProjectSignal =
    /shopify|store|theme|redesign|website|landing|brand|launch|conversion|ecommerce|e-commerce|design|developer|agency|ads|growth/i.test(
      text,
    );
  return Math.min(
    100,
    18 +
      (lead.name ? 8 : 0) +
      (lead.email ? 24 : 0) +
      (lead.phone ? 18 : 0) +
      (lead.niche ? 10 : 0) +
      (lead.company ? 8 : 0) +
      (lead.budget ? 12 : 0) +
      (lead.timeline ? 10 : 0) +
      (hasProjectSignal ? 12 : 0),
  );
}

function intentFromScore(score: number): LeadProfile["intent"] {
  if (score >= 70) return "high";
  if (score >= 45) return "medium";
  return "low";
}

function looksLikeUrl(value?: string | null) {
  return Boolean(value && /\.[a-z]{2,}/i.test(value));
}

function extractFallbackLead(messages: ChatMessage[]): LeadProfile {
  const fullText = messages.map((message) => message.content).join("\n");
  const latest = latestUserContent(messages);
  const lead: LeadProfile = {
    name: extractName(fullText),
    email: fullText.match(emailPattern)?.[0] || null,
    phone: fullText.match(phonePattern)?.[0]?.trim() || null,
    company: extractCompanyOrUrl(fullText),
    niche: extractNiche(fullText),
    budget: extractBudget(fullText),
    timeline: extractTimeline(fullText),
  };
  const hasProjectSignal =
    /shopify|store|theme|redesign|website|landing|brand|launch|conversion|ecommerce|e-commerce|design|developer|agency|ads|growth/i.test(
      fullText,
    );
  const score = estimateLeadScore(lead, fullText);

  return {
    ...lead,
    projectType: hasProjectSignal ? "Shopify/store design inquiry" : null,
    summary: latest.slice(0, 260),
    score,
    intent: intentFromScore(score),
  };
}

function mergeLeadProfiles(primary: LeadProfile, deterministic: LeadProfile, messages: ChatMessage[]) {
  const merged: LeadProfile = {
    ...primary,
    name: primary.name || deterministic.name || null,
    email: primary.email || deterministic.email || null,
    phone: primary.phone || deterministic.phone || null,
    company:
      deterministic.company && looksLikeUrl(deterministic.company) && !looksLikeUrl(primary.company)
        ? deterministic.company
        : primary.company || deterministic.company || null,
    niche: primary.niche || deterministic.niche || null,
    budget: primary.budget || deterministic.budget || null,
    timeline: primary.timeline || deterministic.timeline || null,
    projectType: primary.projectType || deterministic.projectType || null,
    summary: primary.summary || deterministic.summary || null,
  };
  const text = messages.map((message) => message.content).join("\n");
  const score = Math.max(primary.score || 0, deterministic.score || 0, estimateLeadScore(merged, text));
  return {
    ...merged,
    score,
    intent: primary.intent === "high" || deterministic.intent === "high" ? "high" : intentFromScore(score),
  };
}

function hasHotLeadSignal(lead: LeadProfile, messages: ChatMessage[]) {
  const text = messages.map((message) => message.content).join("\n");
  return Boolean(
    lead.intent === "high" ||
      (lead.email && (lead.phone || lead.budget || lead.timeline)) ||
      /asap|urgent|ready|book|call|hire|start|launch|quote|\$|budget/i.test(text),
  );
}

function getBudgetAmount(messages: ChatMessage[]) {
  const text = messages.map((message) => message.content).join("\n");
  const match = text.match(lowBudgetPattern);
  if (!match?.[1]) return null;
  return Number.parseInt(match[1].replace(/,/g, ""), 10);
}

function isLowBudgetLead(messages: ChatMessage[]) {
  const amount = getBudgetAmount(messages);
  return amount !== null && amount < 2000;
}

function missingLeadDetails(lead: LeadProfile) {
  return [
    ["name", lead.name],
    ["email", lead.email],
    ["phone", lead.phone],
    ["niche", lead.niche],
    ["website URL", lead.company],
    ["budget", lead.budget],
    ["timeline", lead.timeline],
  ]
    .filter(([, value]) => !value)
    .map(([label]) => label);
}

function answerFallback(messages: ChatMessage[], lead: LeadProfile) {
  const latest = latestUserContent(messages).toLowerCase();
  const missing = missingLeadDetails(lead).slice(0, 3).join(", ");
  const hotCta = `\n\nBook a call: ${CALENDAR_LINK}\nFast-track on WhatsApp: ${WHATSAPP_NUMBER}`;

  if (isLowBudgetLead(messages)) {
    return answerLowBudget(lead);
  }

  if (/price|cost|budget|quote|\$/.test(latest)) {
    return `Custom Shopify design projects usually run $2k-$10k, depending on design depth, animations, apps, and launch speed. Send ${missing || "your email and phone"} and we can route you to the right quote.${hasHotLeadSignal(lead, messages) ? hotCta : ""}`;
  }

  if (/contact|email|phone|address|whatsapp|where/.test(latest)) {
    return `You can reach Open Limits at ${ADMIN_EMAIL} or WhatsApp ${WHATSAPP_NUMBER}. Office: ${OFFICE_ADDRESS}. Book a call: ${CALENDAR_LINK}`;
  }

  if (/example|work|portfolio|case|niche/.test(latest)) {
    return `Yes. Open Limits has Shopify work across beauty, food, wellness, fashion, pet care, and lifestyle brands. Tell me your niche and URL, then I will point you to the closest fit and next move.${hasHotLeadSignal(lead, messages) ? hotCta : ""}`;
  }

  if (/redesign|store|shopify|theme|website|launch|ecommerce/.test(latest)) {
    return `Good fit. Open Limits builds premium Shopify stores for brands that need stronger visuals, cleaner conversion, and a sharper launch. Send ${missing || "your name, email, and phone"} so we can qualify scope fast.${hasHotLeadSignal(lead, messages) ? hotCta : ""}`;
  }

  return `I can help scope this fast. Share your name, email, phone, niche, website URL, budget, and timeline. For urgent projects, book here: ${CALENDAR_LINK} or WhatsApp ${WHATSAPP_NUMBER}.`;
}

function answerLowBudget(lead: LeadProfile) {
  const missing = missingLeadDetails(lead).slice(0, 2).join(" and ");
  return `We can surely help. Our custom fresh design packages start from $2,000, but do not be disheartened. We can still provide something that will work just fine for your stage.\n\n${missing ? `Share your ${missing}, or ` : ""}book a quick call and we will guide you to the best-fit option.\n\nBook a call: ${CALENDAR_LINK}\nFast-track on WhatsApp: ${WHATSAPP_NUMBER}`;
}

function addHotLeadCta(answer: string, lead: LeadProfile, messages: ChatMessage[]) {
  if (!hasHotLeadSignal(lead, messages)) return answer;
  if (answer.includes(CALENDAR_LINK) || answer.includes(WHATSAPP_NUMBER)) return answer;
  return `${answer}\n\nBook a call: ${CALENDAR_LINK}\nFast-track on WhatsApp: ${WHATSAPP_NUMBER}`;
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
      max_tokens: jsonMode ? 420 : 260,
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

async function safeSaveLead(input: Parameters<typeof saveLead>[0]) {
  try {
    return await saveLead(input);
  } catch (error) {
    console.error(error);
    return false;
  }
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

  let answer: string;
  let lead: LeadProfile;
  let source: "groq" | "fallback" = "groq";
  const deterministicLead = extractFallbackLead(messages);

  try {
    answer = await callGroq([
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
    const groqLead = parseJsonObject<LeadProfile>(extraction) || {};
    lead = mergeLeadProfiles(groqLead, extractFallbackLead(transcript), transcript);
    if (isLowBudgetLead(transcript)) {
      answer = answerLowBudget(lead);
    }
    answer = addHotLeadCta(answer, lead, transcript);
    const hfIntent = await scoreWithHuggingFace(transcript);
    const saved = await safeSaveLead({
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
      source,
    });
  } catch (error) {
    console.error(error);
    source = "fallback";
    lead = deterministicLead;
    answer = answerFallback(messages, lead);
    const transcript = [...messages, { role: "assistant" as const, content: answer }];
    const saved = await safeSaveLead({
      lead,
      transcript,
      page: body.page,
      userAgent: request.headers.get("user-agent"),
      hfIntent: "fallback",
    });

    return jsonResponse({
      answer,
      lead,
      saved,
      hfIntent: null,
      source,
    });
  }
}
