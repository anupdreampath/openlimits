import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Open Limits page uses the owned lead chat instead of third-party chat", async () => {
  const [
    page,
    layout,
    component,
    adminLogin,
    discount,
    styles,
    about,
    refund,
    terms,
  ] = await Promise.all([
    read("app/page.tsx"),
    read("app/layout.tsx"),
    read("app/components/LeadChat.tsx"),
    read("app/components/AdminLogin.tsx"),
    read("app/components/DiscountPopup.tsx"),
    read("app/globals.css"),
    read("app/about/page.tsx"),
    read("app/refund-policy/page.tsx"),
    read("app/terms-of-use/page.tsx"),
  ]);
  const adminDashboard = await read("app/components/AdminDashboard.tsx");
  const adminOverview = await read("app/api/admin/overview/route.ts");
  const adminLeadsPage = await read("app/admin/leads/page.tsx");
  const adminChatsPage = await read("app/admin/chats/page.tsx");
  const adminVisitorsPage = await read("app/admin/visitors/page.tsx");
  const facebookPixel = await read("app/components/FacebookPixel.tsx");
  const openAIAdsPixel = await read("app/components/OpenAIAdsPixel.tsx");
  const openAIAds = await read("app/lib/openai-ads.ts");
  const metaCapi = await read("app/lib/meta-capi.ts");
  const trackRoute = await read("app/api/track/route.ts");

  assert.doesNotMatch(
    page,
    /Open Limits is the award-winning Shopify website design agency/i,
  );
  assert.match(page, /Talk to the team/);
  assert.match(page, /CHAT_AUTO_OPEN_KEY/);
  assert.match(page, /5600/);
  assert.match(page, /onOpenChange=\{handleChatOpenChange\}/);
  assert.match(page, /SHOPIFY COMMERCE/);
  assert.match(page, /WORDPRESS WEBSITES/);
  assert.match(
    page,
    /<DiscountPopup open=\{offerOpen\} onOpenChange=\{setOfferOpen\} \/>/,
  );
  assert.doesNotMatch(
    page,
    /Tawk|NEXT_PUBLIC_TAWK|mailto:hello@openlimits\.agency/,
  );
  assert.doesNotMatch(page, /href="#"/);
  assert.match(page, /https:\/\/www\.fiverr\.com\/s\/m5qDeDN/);
  assert.match(
    page,
    /https:\/\/www\.upwork\.com\/freelancers\/~016de1057b0e843c6b/,
  );
  assert.match(page, /href="\/admin"|href=\{["']\/admin["']\}/);
  assert.match(adminLogin, /defaultValue="admin@theopenlimits\.com"/);
  assert.match(adminLogin, /Lead command center/);
  assert.match(adminDashboard, /admin-sidebar/);
  assert.match(adminDashboard, /\/admin\/leads/);
  assert.match(adminDashboard, /\/admin\/chats/);
  assert.match(adminDashboard, /\/admin\/visitors/);
  assert.match(adminDashboard, /admin-sidebar__link--active/);
  assert.match(adminDashboard, /totalVisitors/);
  assert.match(adminDashboard, /admin-session-timeline/);
  assert.match(adminDashboard, /Devices and time/);
  assert.match(adminDashboard, /timeSpentSeconds/);
  assert.match(adminOverview, /visitorId/);
  assert.match(adminLeadsPage, /view="leads"/);
  assert.match(adminChatsPage, /view="chats"/);
  assert.match(adminVisitorsPage, /view="visitors"/);
  assert.match(layout, /FacebookPixel/);
  assert.match(facebookPixel, /1385887806813423/);
  assert.doesNotMatch(facebookPixel, /601198065432718/);
  assert.doesNotMatch(facebookPixel, /1788643449163395/);
  assert.match(facebookPixel, /fbq\('init'/);
  assert.match(facebookPixel, /PageView/);
  assert.match(layout, /OpenAIAdsPixel/);
  assert.match(openAIAdsPixel, /5TgKHqLs9uaMYoWgBMjTCh/);
  assert.match(openAIAdsPixel, /appointment_scheduled/);
  assert.match(openAIAds, /bzr\.openai\.com/);
  assert.match(openAIAds, /OPENAI_ADS_API_KEY/);
  assert.match(adminOverview, /buildAnalytics/);
  assert.match(adminOverview, /formatActivity/);
  assert.match(metaCapi, /META_CAPI_ACCESS_TOKEN/);
  assert.match(metaCapi, /graph\.facebook\.com/);
  assert.match(trackRoute, /sendMetaEvent/);
  assert.match(component, /Expert scoping/);
  assert.match(component, /I want an expert quote for my project/);
  assert.match(component, /\/api\/chat/);
  assert.match(discount, /Get 30% off\./);
  assert.match(discount, /Unlock 30%/);
  assert.match(discount, /Fill info\./);
  assert.match(discount, /DISCOUNT_STORAGE_KEY/);
  assert.match(discount, /open-limits-discount-dismissed/);
  assert.match(discount, /isLocalTestHost/);
  assert.match(discount, /validateAll/);
  assert.match(discount, /scrollIntoView/);
  assert.match(discount, /setTimeout\(\(\) => setInternalOpen\(true\), 5600\)/);
  assert.match(discount, /\/api\/discount-lead/);
  assert.match(discount, /OPENLIMITS30|DISCOUNT_CODE/);
  assert.match(styles, /\.lead-chat__panel/);
  assert.match(styles, /\.chat-launcher/);
  assert.match(styles, /\.admin-sidebar/);
  assert.match(styles, /\.admin-overview-grid/);
  assert.match(styles, /\.admin-single-page/);
  assert.match(styles, /\.admin-visitor-grid/);
  assert.doesNotMatch(styles, /\.admin-heatmap__dot/);
  assert.match(styles, /\.discount-pop__card/);
  assert.match(styles, /\.info-page/);
  assert.match(styles, /visibility: hidden/);
  assert.match(about, /InfoPage/);
  assert.match(refund, /RefundPolicyPage/);
  assert.match(terms, /TermsOfUsePage/);
});

test("chat API is wired to Groq, fallback answers, CTAs, and Neon leads", async () => {
  const replies = await read("app/lib/chat-replies.ts");
  const [route, brain, storage, neon, discountRoute, envExample, packageJson] =
    await Promise.all([
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
  assert.match(replies, /Fast-track on WhatsApp/);
  assert.match(route, /safeSaveLead/);
  assert.match(brain, /admin@theopenlimits\.com/);
  assert.match(brain, /15720 Ventura Blvd #233/);
  assert.match(brain, /https:\/\/calendar\.app\.google\/adHW8rdFF8fZwitT6/);
  assert.match(storage, /open_limits_leads/);
  assert.match(storage, /niche TEXT/);
  assert.match(discountRoute, /New digital project discount lead/);
  assert.match(route, /GROQ_API_KEY/);
  assert.match(route, /HUGGINGFACE_API_KEY|HF_TOKEN/);
  assert.match(neon, /DATABASE_URL|NEON_DATABASE_URL/);
  assert.match(envExample, /GROQ_MODEL=llama-3\.3-70b-versatile/);
  assert.match(envExample, /HUGGINGFACE_API_KEY=/);
  assert.match(envExample, /DATABASE_URL=/);
  assert.match(packageJson, /"@neondatabase\/serverless"/);
});
