import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Open Limits page uses the owned lead chat instead of third-party chat", async () => {
  const [page, component, styles] = await Promise.all([
    read("app/page.tsx"),
    read("app/components/LeadChat.tsx"),
    read("app/globals.css"),
  ]);

  assert.match(page, /Award-winning Shopify website design agency/i);
  assert.match(page, /<LeadChat open=\{chatOpen\} onOpenChange=\{setChatOpen\} \/>/);
  assert.doesNotMatch(page, /Tawk|NEXT_PUBLIC_TAWK|mailto:hello@openlimits\.agency/);
  assert.match(component, /Custom themes: \$2k-\$10k/);
  assert.match(component, /\/api\/chat/);
  assert.match(styles, /\.lead-chat__panel/);
  assert.match(styles, /\.chat-launcher/);
});

test("chat API is wired to Groq, Hugging Face intent scoring, and Neon leads", async () => {
  const [route, envExample, packageJson] = await Promise.all([
    read("app/api/chat/route.ts"),
    read(".env.example"),
    read("package.json"),
  ]);

  assert.match(route, /api\.groq\.com\/openai\/v1\/chat\/completions/);
  assert.match(route, /open_limits_leads/);
  assert.match(route, /facebook\/bart-large-mnli/);
  assert.match(route, /GROQ_API_KEY/);
  assert.match(route, /HUGGINGFACE_API_KEY|HF_TOKEN/);
  assert.match(route, /DATABASE_URL|NEON_DATABASE_URL/);
  assert.match(envExample, /GROQ_MODEL=llama-3\.3-70b-versatile/);
  assert.match(envExample, /HUGGINGFACE_API_KEY=/);
  assert.match(envExample, /DATABASE_URL=/);
  assert.match(packageJson, /"@neondatabase\/serverless"/);
});
