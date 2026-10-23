import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { identifyCrawler } from "@/seo/crawlers";
import { recordCrawl } from "@/seo/crawler-log";
import { knownPublicPaths } from "@/seo/known-paths";

/**
 * 1. Subdomain: when ONBOARDING_HOST is set (e.g. onboarding.madvertlabs.com), that host serves only
 *    the onboarding portal, Madvert Operations and the Offer Builder; marketing pages redirect to the
 *    main site, and portal paths on the main site redirect to the subdomain. Same Vercel project.
 * 2. Optimistic gate for Operations: no session cookie → sign in (307). The session itself is
 *    verified on the server in every Operations page and API route.
 */

const PORTAL = /^\/(onboarding|ops|offer-builder|offer)(\/|$)/;
const SHARED = /^\/(api|_next|brand|images|icon|apple-icon|manifest|robots|favicon)/;

/** Detail routes whose valid slugs are all known at build time while content comes from local files. */
const DETAIL = /^\/(insights|case-studies|resources)\/[^/]+\/?$/;
const CMS_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
/** Detail routes that always come from local files, CMS or not. */
const LOCAL_DETAIL = /^\/industries\/[^/]+\/?$/;

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  // Unknown slugs get a real 404 status (not a streamed "not found" page with 200).
  // Skipped when Sanity is configured, because CMS entries are not known here.
  const response =
    ((!CMS_CONFIGURED && DETAIL.test(path)) || LOCAL_DETAIL.test(path)) && !knownPublicPaths.has(path)
      ? NextResponse.rewrite(new URL("/_not-found-page", request.url), { status: 404 })
      : route(request);
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").toLowerCase();
  // Preview / staging deployments must never be indexed.
  if (host.endsWith(".vercel.app")) response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const crawler = identifyCrawler(request.headers.get("user-agent"));
  if (crawler && request.method === "GET") {
    const redirect = response.headers.get("location") ? String(response.status) : null;
    const status = redirect ?? (knownPublicPaths.has(path) || PORTAL.test(path) ? "200" : "unlisted (possible 404)");
    event.waitUntil(recordCrawl({ crawler: crawler.name, category: crawler.category, path, status }));
  }
  return response;
}

function route(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").toLowerCase().split(":")[0];
  // ONBOARDING_HOST wins; otherwise any "onboarding." host is treated as the portal host.
  const portalHost = process.env.ONBOARDING_HOST?.toLowerCase() || (host.startsWith("onboarding.") ? host : undefined);
  const signedIn = Boolean(request.cookies.get("mv_ops")?.value);

  if (portalHost) {
    const mainSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://madvertlabs.com").replace(/\/$/, "");
    if (host === portalHost) {
      if (pathname === "/") return NextResponse.redirect(new URL(signedIn ? "/ops/onboarding" : "/ops/login", request.url));
      if (!PORTAL.test(pathname) && !SHARED.test(pathname) && !/\.\w{2,5}$/.test(pathname)) return NextResponse.redirect(`${mainSite}${pathname}${search}`, 308);
    } else if (PORTAL.test(pathname) && !host.startsWith("localhost") && !host.endsWith(".vercel.app")) {
      return NextResponse.redirect(`https://${portalHost}${pathname}${search}`, 308);
    }
  }

  if (pathname === "/ops" || pathname.startsWith("/ops/")) {
    if (pathname.startsWith("/ops/login") || pathname.startsWith("/ops/invite/")) return NextResponse.next();
    if (!signedIn) return NextResponse.redirect(new URL("/ops/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|pdf|txt|xml|js|css|woff2?)$).*)"] };
