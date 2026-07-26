import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Open Limits page uses the owned lead chat instead of third-party chat", async () => {
  const [page, component, discount, splash, styles, about, refund, terms] = await Promise.all([
    read("app/page.tsx"),
    read("app/components/LeadChat.tsx"),
    read("app/components/DiscountPopup.tsx"),
    read("app/components/SplashScreen.tsx"),
    read("app/globals.css"),
    read("app/about/page.tsx"),
    read("app/refund-policy/page.tsx"),
    read("app/terms-of-use/page.tsx"),
  ]);

  assert.doesNotMatch(page, /Open Limits is the award-winning Shopify website design agency/i);
  assert.match(page, /Talk to the team/);
  assert.match(page, /hero-slide__team-button/);
  assert.match(page, /<LeadChat open=\{chatOpen\} onOpenChange=\{setChatOpen\} \/>/);
  assert.match(page, /<SplashScreen \/>/);
  assert.match(page, /<DiscountPopup \/>/);
  assert.doesNotMatch(page, /Tawk|NEXT_PUBLIC_TAWK|mailto:hello@openlimits\.agency/);
  assert.doesNotMatch(page, /href="#"/);
  assert.match(page, /https:\/\/www\.fiverr\.com\/s\/m5qDeDN/);
  assert.match(page, /https:\/\/www\.upwork\.com\/freelancers\/~016de1057b0e843c6b/);
  assert.match(component, /Custom themes: \$2k-\$10k/);
  assert.match(component, /\/api\/chat/);
  assert.match(discount, /Get 30% off\./);
  assert.match(discount, /Unlock 30%/);
  assert.match(discount, /Fill info\./);
  assert.match(discount, /setTimeout\(\(\) => setOpen\(true\), 5600\)/);
  assert.doesNotMatch(discount, /open-limits-discount-seen/);
  assert.match(discount, /\/api\/discount-lead/);
  assert.match(discount, /OPENLIMITS30|DISCOUNT_CODE/);
  assert.match(splash, /Websites that refuse to blend in\./);
  assert.match(splash, /onPointerMove/);
  assert.match(splash, /Tap to enter/);
  assert.match(splash, /site-splash__progress/);
  assert.match(styles, /\.lead-chat__panel/);
  assert.match(styles, /\.chat-launcher/);
  assert.match(styles, /\.site-splash/);
  assert.match(styles, /@keyframes splashProgress/);
  assert.match(styles, /\.hero-slide__actions[\s\S]*gap: 28px[\s\S]*margin-top: 44px/);
  assert.match(styles, /\.hero-slide__actions \.hero-slide__team-button[\s\S]*background: var\(--acid\)/);
  assert.match(styles, /\.discount-pop__card/);
  assert.match(styles, /\.info-page/);
  assert.match(styles, /visibility: hidden/);
  assert.match(about, /InfoPage/);
  assert.match(refund, /RefundPolicyPage/);
  assert.match(terms, /TermsOfUsePage/);
});

test("chat API is wired to Groq, fallback answers, CTAs, and Neon leads", async () => {
  const [route, brain, storage, neon, discountRoute, envExample, packageJson] = await Promise.all([
    read("app/api/chat/route.ts"),
    read("app/lib/open-limits-brain.ts"),
    read("app/lib/lead-storage.ts"),
    read("app/lib/neon.ts"),
    read("app/api/discount-lead/route.ts"),
    read(".env.example"),
    read("package.json"),
  ]);

  assert.match(route, /api\.groq\.com\/openai\/v1\/chat\/completions/);
  assert.match(route, /facebook\/bart-large-mnli/);
  assert.match(route, /answerFallback/);
  assert.match(route, /mergeLeadProfiles/);
  assert.match(route, /extractName/);
  assert.match(route, /extractCompanyOrUrl/);
  assert.match(route, /anme/);
  assert.match(route, /Fast-track on WhatsApp/);
  assert.match(route, /safeSaveLead/);
  assert.match(brain, /admin@theopenlimits\.com/);
  assert.match(brain, /15720 Ventura Blvd #233/);
  assert.match(brain, /https:\/\/calendar\.app\.google\/adHW8rdFF8fZwitT6/);
  assert.match(storage, /open_limits_leads/);
  assert.match(storage, /niche TEXT/);
  assert.match(discountRoute, /New store design discount lead/);
  assert.match(route, /GROQ_API_KEY/);
  assert.match(route, /HUGGINGFACE_API_KEY|HF_TOKEN/);
  assert.match(neon, /DATABASE_URL|NEON_DATABASE_URL/);
  assert.match(envExample, /GROQ_MODEL=llama-3\.3-70b-versatile/);
  assert.match(envExample, /HUGGINGFACE_API_KEY=/);
  assert.match(envExample, /DATABASE_URL=/);
  assert.match(packageJson, /"@neondatabase\/serverless"/);
});
