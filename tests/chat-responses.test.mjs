import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const require = createRequire(import.meta.url);
const moduleUrl = (source) =>
  "data:text/javascript;base64," +
  Buffer.from(
    ts.transpile(source, {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    }),
  ).toString("base64");
const read = (path) => readFile(new URL(path, root), "utf8");
const brainUrl = moduleUrl(await read("app/lib/open-limits-brain.ts"));
const contentUrl = moduleUrl(
  (await read("app/lib/chat-content.ts")).replace(
    '"./open-limits-brain"',
    JSON.stringify(brainUrl),
  ),
);
const repliesUrl = moduleUrl(
  (await read("app/lib/chat-replies.ts"))
    .replace('"./open-limits-brain"', JSON.stringify(brainUrl))
    .replace('"./chat-content"', JSON.stringify(contentUrl)),
);
const { CALENDAR_LINK, DEFAULT_ASSISTANT_MESSAGE } = await import(brainUrl);
const { splitAssistantContent, reconcileChatHistory } = await import(
  contentUrl
);
const { answerFallback, finalizeAnswer } = await import(repliesUrl);
const user = (content) => ({ role: "user", content });
const assistant = (content) => ({ role: "assistant", content });
const starter = "I need a website, app, or software build";

test("inline calendar links never erase the answer sharing their line", () => {
  const prose =
    "We would confirm the pages, functionality, and content responsibilities before agreeing the scope.";
  assert.deepEqual(
    splitAssistantContent(`${prose} Book a call: ${CALENDAR_LINK}`).paragraphs,
    [prose],
  );
  assert.deepEqual(
    splitAssistantContent(`${prose} [Book a call](${CALENDAR_LINK})`)
      .paragraphs,
    [prose],
  );
  assert.equal(
    splitAssistantContent(`${prose} ${CALENDAR_LINK}`).showCalendar,
    true,
  );
});

test("the exact $2,000 follow-up gets inclusions and caveats, not just a CTA", () => {
  const history = [
    user(starter),
    assistant("Focused builds can start from $2,000."),
    user("ok. what comes in 2000"),
  ];
  for (const candidate of [
    "",
    `Book a call: ${CALENDAR_LINK}`,
    `For a personalized quote, book a call: ${CALENDAR_LINK}`,
  ]) {
    const answer = finalizeAnswer(candidate, history, {});
    assert.match(answer, /landing page|marketing website/);
    assert.match(answer, /not a fixed package/);
    assert.match(answer, /separate scoping/);
    assert.doesNotMatch(answer, /calendar.app/);
  }
  assert.match(
    answerFallback([
      ...history,
      assistant(answerFallback(history)),
      user("does that include hosting?"),
    ]),
    /not automatic inclusions/,
  );
});

test("repeated starter prompts move forward without repeating the software pitch", () => {
  const first = answerFallback([user(starter)]);
  const history = [user(starter), assistant(first), user(starter)];
  const second = finalizeAnswer(first, history, {});
  const modelWithoutLinks = finalizeAnswer(
    "We can help with all three. A website usually presents or sells your business, an app gives customers a mobile experience, and custom software supports specific workflows. Which best describes your idea?",
    [user(starter)],
    {},
  );
  assert.notEqual(first, second);
  assert.match(first, /Which best describes/);
  assert.match(first, /calendar.app/);
  assert.match(first, /Fast-track on WhatsApp/);
  assert.match(modelWithoutLinks, /calendar.app/);
  assert.match(modelWithoutLinks, /Fast-track on WhatsApp/);
  assert.match(second, /first version/);
  assert.doesNotMatch(second, /\$|Book a call|Fast-track on WhatsApp/);
});

test("a past low budget does not hijack a technical follow-up", () => {
  const answer = answerFallback([
    user("My budget is $500"),
    assistant("We can discuss a smaller scope."),
    user("How do permissions work?"),
  ]);
  assert.match(answer, /server/);
  assert.doesNotMatch(answer, /2,000|budget|call/);
});

test("booking links are not appended to ordinary follow-up answers", () => {
  const answer =
    "The backend should enforce access rules for each user role. Which roles do you need?";
  const result = finalizeAnswer(
    `${answer}\nBook a call: ${CALENDAR_LINK}`,
    [
      assistant(`Book a call: ${CALENDAR_LINK}`),
      user("How do permissions work?"),
    ],
    {},
  );
  assert.equal(result, answer);
  const booking = answerFallback([user("Can I book a call?")]);
  assert.ok(splitAssistantContent(booking).paragraphs.join(" ").length > 60);
  assert.match(booking, /calendar.app/);
  const person = answerFallback([user("i want to speak with someone")]);
  const modelPersonWithoutLinks = finalizeAnswer(
    "Sure, the team can talk through your project and help shape the scope.",
    [user("i want to speak with someone")],
    {},
  );
  assert.match(person, /calendar.app/);
  assert.match(person, /Fast-track on WhatsApp/);
  assert.match(modelPersonWithoutLinks, /calendar.app/);
  assert.match(modelPersonWithoutLinks, /Fast-track on WhatsApp/);
});

test("history reconciliation rejects stale polls and accepts new admin messages", () => {
  const current = [
    user("First question"),
    assistant("First answer"),
    user("Follow-up"),
    assistant("New answer"),
  ];
  assert.equal(reconcileChatHistory(current, current.slice(0, 2)), current);
  assert.equal(reconcileChatHistory(current, [...current]), current);
  const updated = [
    ...current,
    { role: "admin", content: "I can help with that." },
  ];
  assert.equal(reconcileChatHistory(current, updated), updated);
  const interveningAdmin = [
    ...current.slice(0, 2),
    { role: "admin", content: "Joining to help." },
    ...current.slice(2),
  ];
  assert.equal(
    reconcileChatHistory(current, interveningAdmin),
    interveningAdmin,
  );
  assert.equal(
    reconcileChatHistory([assistant(DEFAULT_ASSISTANT_MESSAGE)], updated),
    updated,
  );
});

// Exercise the real route with isolated model/storage/analytics boundaries.
const storageUrl = moduleUrl(`
  export async function getChatSession() { return { messages: [] }; }
  export function toClientMessages(messages) { return messages; }
  export async function saveChatTurn(input) { globalThis.__chatTest.chats.push(input); }
`);
const leadUrl = moduleUrl(
  `export async function saveLead(input) { globalThis.__chatTest.leads.push(input); return true; }`,
);
const metaUrl = moduleUrl(
  `export async function sendMetaEvent() { globalThis.__chatTest.meta++; if (globalThis.__chatTest.failMeta) throw new Error("test tracking failure"); }`,
);
const routeUrl = moduleUrl(
  (await read("app/api/chat/route.ts"))
    .replace(
      '"next/server"',
      JSON.stringify(pathToFileURL(require.resolve("next/server")).href),
    )
    .replace('"@/app/lib/open-limits-brain"', JSON.stringify(brainUrl))
    .replace('"@/app/lib/chat-replies"', JSON.stringify(repliesUrl))
    .replace('"@/app/lib/chat-storage"', JSON.stringify(storageUrl))
    .replace('"@/app/lib/lead-storage"', JSON.stringify(leadUrl))
    .replace('"@/app/lib/meta-capi"', JSON.stringify(metaUrl)),
);
const { POST } = await import(routeUrl);
const { NextRequest } = await import(
  pathToFileURL(require.resolve("next/server")).href
);

async function runRoute({
  answer,
  failExtraction = false,
  failMeta = false,
  messages = [user("Can you build a customer portal?")],
}) {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.GROQ_API_KEY;
  const state = { chats: [], leads: [], meta: 0, failMeta };
  globalThis.__chatTest = state;
  process.env.GROQ_API_KEY = "test-only-not-a-real-key";
  globalThis.fetch = async (url, init) => {
    if (!String(url).includes("api.groq.com"))
      return new Response("{}", { status: 503 });
    const body = JSON.parse(init.body);
    if (body.response_format && failExtraction)
      return new Response("test unavailable", { status: 503 });
    return Response.json({
      choices: [{ message: { content: body.response_format ? "{}" : answer } }],
    });
  };
  try {
    const response = await POST(
      new NextRequest("http://localhost/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages, sessionId: "isolated-test" }),
      }),
    );
    return { result: await response.json(), state };
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = originalKey;
    delete globalThis.__chatTest;
  }
}

test("lead extraction or analytics failure cannot replace or double-save a good answer", async () => {
  const answer =
    "A customer portal can bring account details and request tracking into one place. What should customers be able to manage themselves?";
  const { result, state } = await runRoute({
    answer,
    failExtraction: true,
    failMeta: true,
  });
  assert.equal(result.answer, answer);
  assert.equal(state.chats.length, 1);
  assert.equal(state.leads.length, 1);
  assert.equal(
    state.chats[0].assistantMessage,
    state.leads[0].transcript.at(-1).content,
  );
});

test("empty model output is replaced with a useful contextual answer", async () => {
  const { result, state } = await runRoute({
    answer: "",
    messages: [user("what comes in 2000")],
  });
  assert.equal(result.source, "fallback");
  assert.match(result.answer, /not a fixed package/);
  assert.equal(state.chats.length, 1);
});

test("assistant examples and contact details are never extracted as visitor details", async () => {
  const { result } = await runRoute({
    answer:
      "A booking site should define availability, appointment types, and confirmation messages. Do customers need to pay when booking?",
    messages: [
      assistant(
        "Our email is admin@theopenlimits.com, WhatsApp +15572093217. Our budget is $2,000.",
      ),
      user("I need appointment bookings"),
    ],
  });
  assert.equal(result.lead.email, null);
  assert.equal(result.lead.phone, null);
  assert.equal(result.lead.budget, null);
});
