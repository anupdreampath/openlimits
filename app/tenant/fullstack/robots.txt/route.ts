import { FULLSTACK_ORIGIN } from "@/tenant-routing";
export function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /tenant/\nSitemap: ${FULLSTACK_ORIGIN}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
