import { FULLSTACK_ORIGIN } from "@/tenant-routing";
export function GET() {
  const paths = ["", "/about", "/process", "/pricing", "/support", "/privacy-policy", "/terms-of-use", "/refund-policy"];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${FULLSTACK_ORIGIN}${path || "/"}</loc></url>`).join("")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
