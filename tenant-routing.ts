export const FULLSTACK_DOMAIN = "thefullstackguys.com";
export const FULLSTACK_ORIGIN = `https://${FULLSTACK_DOMAIN}`;
export const FULLSTACK_ROUTE_PREFIX = "/tenant/fullstack";

export function isFullstackHost(host: string | null, development = false) {
  const hostname = (host || "").trim().toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
  return hostname === FULLSTACK_DOMAIN || hostname === `www.${FULLSTACK_DOMAIN}` ||
    (development && hostname === "thefullstackguys.localhost");
}
