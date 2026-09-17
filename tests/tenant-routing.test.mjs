import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import test from "node:test";
import ts from "typescript";
const require = createRequire(import.meta.url);
const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");
const dataUrl = source => "data:text/javascript;base64," + Buffer.from(ts.transpile(source, { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 })).toString("base64");
const routingUrl = dataUrl(await read("tenant-routing.ts"));
const assetsUrl = dataUrl(await read("tenant-assets.ts"));
const nextUrl = pathToFileURL(require.resolve("next/server")).href;
const { isFullstackHost } = await import(routingUrl);
const { NextRequest } = await import(nextUrl);
const { proxy } = await import(dataUrl((await read("proxy.ts")).replace('"next/server"', JSON.stringify(nextUrl)).replace('"./tenant-routing"', JSON.stringify(routingUrl)).replace('"./tenant-assets"', JSON.stringify(assetsUrl))));
const request = (host, path="/", headers={}) => new NextRequest(`https://${host}${path}`, { headers: { host, ...headers } });

test("tenant hostname matching is exact, normalized, and cannot be spoofed by forwarded headers", () => {
  for (const host of ["thefullstackguys.com", "www.thefullstackguys.com", "THEFULLSTACKGUYS.COM:443", "thefullstackguys.com."]) assert.equal(isFullstackHost(host), true);
  for (const host of [null, "other.example", "thefullstackguys.com.evil.test", "evilthefullstackguys.com", "thefullstackguys.localhost"]) assert.equal(isFullstackHost(host), false);
  assert.equal(isFullstackHost("thefullstackguys.localhost:3002", true), true);
  assert.equal(proxy(request("other.example", "/", {"x-forwarded-host":"thefullstackguys.com", "x-site-tenant":"fullstack"})).headers.get("x-middleware-rewrite"), null);
});

test("all fullstack page and API paths rewrite to the tenant while preserving query strings", () => {
  for (const path of ["/", "/privacy-policy", "/terms-of-use", "/admin/chats", "/api/chat?sessionId=example", "/api/track", "/sitemap.xml", "/robots.txt"]) {
    const response = proxy(request("thefullstackguys.com", path));
    const rewrite = new URL(response.headers.get("x-middleware-rewrite"));
    const incoming = new URL(`https://thefullstackguys.com${path}`);
    assert.equal(rewrite.pathname, "/tenant/fullstack" + (incoming.pathname === "/" ? "" : incoming.pathname));
    assert.equal(rewrite.search, incoming.search);
    assert.equal(response.headers.get("x-middleware-request-x-site-tenant"), "fullstack");
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  }
  assert.equal(proxy(request("other.example", "/privacy-policy")).headers.get("x-middleware-rewrite"), null);
});

test("internal routes cannot be accessed directly and image optimization cannot expose other tenant assets", () => {
  assert.equal(proxy(request("thefullstackguys.com", "/tenant/fullstack")).status, 404);
  assert.equal(proxy(request("other.example", "/tenant/fullstack/api/chat")).status, 404);
  assert.equal(proxy(request("thefullstackguys.com", "/_next/image?url=%2Fother-logo.png&w=100&q=75")).status, 404);
  assert.equal(proxy(request("thefullstackguys.com", "/tenant-assets/fullstack/fullstack-logo.svg")).headers.get("x-middleware-next"), "1");
});

test("tenant sources contain no legacy identity, advertising keys, or measurement integrations", async () => {
  const dir = new URL("tenants/fullstack/", root);
  const names = await readdir(dir, {recursive:true});
  for (const name of names.filter(name=>/\.(tsx?|css)$/.test(name))) {
    const source = await readFile(new URL(name, dir), "utf8");
    assert.doesNotMatch(source, /open[ _-]?limits|theopenlimits|1385887806813423|5TgKHqLs9uaMYoWgBMjTCh|sendMetaEvent|sendOpenAIAdsEvent|window\.(fbq|oaiq)|res\.cloudinary\.com|video\.gumlet/i, name);
  }
  assert.equal((await read("tenants/fullstack/lib/neon.ts")).trim(), 'export { getSql } from "@/app/lib/neon";');
});

test("tenant writes are namespaced within the shared database and cannot write original tables", async () => {
  const statements=[];
  globalThis.__tenantSql = (strings) => { statements.push(strings.join("?")); return []; };
  const dbUrl=dataUrl('export function getSql(){return globalThis.__tenantSql;}');
  const source=(await read("tenants/fullstack/lib/chat-storage.ts")).replace('"@/tenants/fullstack/lib/neon"',JSON.stringify(dbUrl));
  try {
    const {saveChatTurn, saveHeatmapEvent}=await import(dataUrl(source));
    await saveChatTurn({sessionId:"test",userMessage:"Hello",assistantMessage:"Hello",lead:{}});
    await saveHeatmapEvent({sessionId:"test",path:"/",eventType:"pageview",metadata:{visitorId:"visitor"}});
    assert.ok(statements.some(s=>/INSERT INTO morgan_retailers_chat_sessions/.test(s)));
    assert.ok(statements.some(s=>/INSERT INTO morgan_retailers_chat_messages/.test(s)));
    assert.ok(statements.some(s=>/INSERT INTO morgan_retailers_heatmap_events/.test(s)));
    assert.ok(statements.every(s=>!s.includes("open_limits")));
  } finally {delete globalThis.__tenantSql;}
});
