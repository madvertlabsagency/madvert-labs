/**
 * Technical SEO / AEO audit of the public site. Fetches robots.txt, the sitemap and every sitemap
 * URL, parses the server-rendered HTML (no JavaScript is executed, the same view a crawler gets
 * first) and reports problems with a severity. Used by `npm run seo:audit` (CLI, CI) and by the
 * SEO control center in Madvert Operations. Runs in Node and in a server route; no dependencies.
 */

export type Severity = "error" | "warning" | "notice";
export type AuditIssue = { severity: Severity; code: string; message: string; path?: string };

export type PageAudit = {
  path: string;
  status: number;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  h1: string[];
  schemaTypes: string[];
  words: number;
  inlinks: number;
  ogImage: boolean;
  issues: AuditIssue[];
};

export type SiteAudit = {
  ranAt: string;
  base: string;
  canonicalOrigin: string;
  pages: PageAudit[];
  site: AuditIssue[];
  summary: { pages: number; errors: number; warnings: number; notices: number; score: number };
};

type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;

const BRAND_MISSPELLINGS = /\b(Madvert Lab(?!s)|MadvertLabs|Mad Vert|Madvertlabs(?!\.com)|MADVERT LAB(?!S))\b/;
const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const attr = (tag: string, name: string) => decode(new RegExp(`${name}="([^"]*)"`, "i").exec(tag)?.[1] ?? "");
const metaContent = (html: string, re: RegExp) => {
  const tag = html.match(re)?.[0];
  return tag ? attr(tag, "content") : "";
};

/** Visible body text: scripts, styles, templates and the RSC payload removed. */
function visibleText(html: string) {
  const body = html.split(/<body[^>]*>/i)[1] ?? html;
  return decode(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<template[\s\S]*?<\/template>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function schemaTypes(html: string, issues: AuditIssue[], path: string) {
  const types: string[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(decode(m[1]));
      const items = (Array.isArray(data) ? data : [data]).flatMap((d) => (Array.isArray(d?.["@graph"]) ? d["@graph"].map((g: object) => ({ "@context": d["@context"], ...g })) : [d]));
      for (const d of items) {
        const t = d?.["@type"];
        types.push(Array.isArray(t) ? t.join("+") : String(t));
        if (!d?.["@context"]) issues.push({ severity: "error", code: "schema-context", message: `JSON-LD ${String(t)} has no @context`, path });
        if (/AggregateRating|Review/.test(JSON.stringify(d))) issues.push({ severity: "error", code: "schema-review", message: "Review or rating markup found: only allowed with genuine, eligible reviews", path });
      }
    } catch {
      issues.push({ severity: "error", code: "schema-invalid", message: "A JSON-LD block is not valid JSON", path });
    }
  }
  return types;
}

async function pool<T, R>(items: T[], size: number, fn: (t: T) => Promise<R>) {
  const out: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (i < items.length) {
        const n = i++;
        out[n] = await fn(items[n]);
      }
    }),
  );
  return out;
}

/**
 * @param base Where to fetch from (e.g. http://localhost:3000 or https://madvertlabs.com).
 * @param canonicalOrigin The production origin canonicals and sitemap URLs must use.
 */
export async function auditSite({ base, canonicalOrigin, fetcher = fetch, concurrency = 6 }: { base: string; canonicalOrigin: string; fetcher?: Fetcher; concurrency?: number }): Promise<SiteAudit> {
  base = base.replace(/\/$/, "");
  canonicalOrigin = canonicalOrigin.replace(/\/$/, "");
  const site: AuditIssue[] = [];
  const get = async (path: string, redirect: RequestRedirect = "follow") => {
    try {
      const res = await fetcher(base + path, { redirect, headers: { "User-Agent": "MadvertSEOAudit/1.0 (+https://madvertlabs.com)" }, cache: "no-store" });
      return { status: res.status, text: res.status < 300 ? await res.text() : "", headers: res.headers };
    } catch (e) {
      return { status: 0, text: "", headers: new Headers(), error: e instanceof Error ? e.message : "fetch failed" };
    }
  };

  // robots.txt
  const robots = await get("/robots.txt");
  if (robots.status !== 200) site.push({ severity: "error", code: "robots-missing", message: `robots.txt returned ${robots.status}` });
  else {
    const groups = robots.text.split(/\n(?=User-Agent:)/i);
    const blockedRoot = (agent: string) =>
      groups.some((g) => new RegExp(`User-Agent:\\s*${agent}\\b`, "i").test(g) && /\nDisallow:\s*\/\s*(\n|$)/i.test(g));
    for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot"]) {
      if (blockedRoot(bot)) site.push({ severity: "error", code: "robots-blocks-search", message: `robots.txt blocks ${bot} from the whole site` });
      else if (!new RegExp(`User-Agent:\\s*${bot}\\b`, "i").test(robots.text)) site.push({ severity: "notice", code: "robots-implicit", message: `${bot} is allowed only through the * group` });
    }
    if (!/Sitemap:\s*https:\/\//i.test(robots.text)) site.push({ severity: "error", code: "robots-no-sitemap", message: "robots.txt does not reference the sitemap" });
  }

  // sitemap
  const sm = await get("/sitemap.xml");
  const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
  const lastmods = [...sm.text.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].length;
  if (sm.status !== 200 || !urls.length) site.push({ severity: "error", code: "sitemap-missing", message: `sitemap.xml returned ${sm.status} with ${urls.length} URLs` });
  if (urls.length && lastmods < urls.length) site.push({ severity: "notice", code: "sitemap-lastmod", message: `${urls.length - lastmods} sitemap URLs have no lastmod` });
  if (new Set(urls).size !== urls.length) site.push({ severity: "error", code: "sitemap-duplicates", message: "sitemap.xml lists the same URL more than once" });
  for (const u of urls) {
    if (!u.startsWith(canonicalOrigin)) site.push({ severity: "error", code: "sitemap-host", message: `Sitemap URL is not on ${canonicalOrigin}: ${u}` });
    if (/[?#]/.test(u)) site.push({ severity: "error", code: "sitemap-query", message: `Sitemap URL has a query or fragment: ${u}` });
  }

  // www and unknown-URL behaviour
  const missing = await get(`/this-page-should-not-exist-${Date.now()}`);
  if (missing.status !== 404) site.push({ severity: "error", code: "soft-404", message: `Unknown URLs return ${missing.status}, not 404` });

  const paths = urls.map((u) => u.slice(canonicalOrigin.length) || "/");
  const known = new Set(paths);
  const linksTo = new Map<string, Set<string>>();
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  const internalTargets = new Set<string>();

  const pages = await pool(paths, concurrency, async (path): Promise<PageAudit> => {
    const issues: AuditIssue[] = [];
    const r = await get(path, "manual");
    const html = r.text;
    const add = (severity: Severity, code: string, message: string) => issues.push({ severity, code, message, path });
    if (r.status !== 200) add("error", "status", `Returns ${r.status}${r.status >= 300 && r.status < 400 ? ` → ${r.headers.get("location")}` : ""}; sitemap URLs must return 200`);
    const xRobots = r.headers.get("x-robots-tag") ?? "";
    if (/noindex/i.test(xRobots)) add("error", "x-robots-noindex", "X-Robots-Tag: noindex on a sitemap URL");

    const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
    const description = metaContent(html, /<meta[^>]+name="description"[^>]*>/i);
    const canonical = attr(html.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0] ?? "", "href");
    const robotsMeta = metaContent(html, /<meta[^>]+name="robots"[^>]*>/i);
    const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());
    const ogImage = /<meta[^>]+property="og:image"/i.test(html);
    const text = visibleText(html);
    const words = text.split(" ").filter(Boolean).length;

    if (r.status === 200) {
      if (!title) add("error", "title-missing", "No <title>");
      else if (title.length > 70) add("warning", "title-long", `Title is ${title.length} characters (over 70 is often truncated)`);
      else if (title.length < 20) add("warning", "title-short", `Title is only ${title.length} characters`);
      if (!description) add("error", "description-missing", "No meta description");
      else if (description.length > 170) add("warning", "description-long", `Meta description is ${description.length} characters`);
      else if (description.length < 70) add("warning", "description-short", `Meta description is only ${description.length} characters`);
      const expected = canonicalOrigin + (path === "/" ? "" : path);
      if (!canonical) add("error", "canonical-missing", "No canonical link");
      else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) add("error", "canonical-mismatch", `Canonical points to ${canonical}`);
      if (/noindex/i.test(robotsMeta)) add("error", "noindex", "robots meta noindex on a sitemap URL");
      if (h1.length !== 1) add("error", "h1-count", `${h1.length} H1 elements (expected exactly 1)`);
      if (!/<html[^>]+lang="/i.test(html)) add("error", "lang", "<html> has no lang attribute");
      if (!/<meta[^>]+name="viewport"/i.test(html)) add("error", "viewport", "No viewport meta");
      if (!ogImage) add("warning", "og-image", "No og:image");
      if (!/<meta[^>]+name="twitter:card"/i.test(html)) add("notice", "twitter-card", "No twitter:card");
      if (words < 250) add("warning", "thin", `Only ${words} words of server-rendered text`);
      if (/—/.test(text)) add("warning", "em-dash", "Visible copy contains an em dash (brand rule)");
      const brand = BRAND_MISSPELLINGS.exec(text);
      if (brand) add("error", "brand-spelling", `Brand misspelled as "${brand[0]}"`);
      for (const img of html.matchAll(/<img\b[^>]*>/gi)) if (!/\balt=/i.test(img[0])) add("warning", "img-alt", `Image without alt: ${attr(img[0], "src").slice(0, 80)}`);
      if (/<a\b(?![^>]*href=)[^>]*>/i.test(html.replace(/<a\b[^>]*name=[^>]*>/gi, ""))) add("notice", "anchor-no-href", "An <a> element has no href (not a crawlable link)");
    }
    const types = schemaTypes(html, issues, path);
    if (r.status === 200 && !types.length) add("warning", "schema-none", "No structured data");

    const out = new Set<string>();
    for (const m of html.matchAll(/<a\b[^>]*href="([^"#]+)(?:#[^"]*)?"/gi)) {
      let href = decode(m[1]);
      if (href.startsWith(canonicalOrigin)) href = href.slice(canonicalOrigin.length) || "/";
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      href = href.split("?")[0].replace(/(.)\/$/, "$1");
      if (/\.(pdf|png|jpe?g|webp|avif|mp4|webm|svg|txt|xml|zip)$/i.test(href)) continue;
      out.add(href);
      internalTargets.add(href);
    }
    linksTo.set(path, out);
    if (title) titles.set(title, [...(titles.get(title) ?? []), path]);
    if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), path]);
    return { path, status: r.status, title, description, canonical, robots: robotsMeta, h1, schemaTypes: types, words, inlinks: 0, ogImage, issues };
  });

  // Inlinks and orphans (links from other sitemap pages only).
  for (const p of pages) {
    p.inlinks = pages.filter((o) => o.path !== p.path && linksTo.get(o.path)?.has(p.path)).length;
    if (p.path !== "/" && p.status === 200 && p.inlinks === 0) p.issues.push({ severity: "warning", code: "orphan", message: "No other sitemap page links here", path: p.path });
  }
  for (const [t, ps] of titles) if (ps.length > 1) site.push({ severity: "warning", code: "title-duplicate", message: `Duplicate title "${t}" on ${ps.join(", ")}` });
  for (const [, ps] of descriptions) if (ps.length > 1) site.push({ severity: "warning", code: "description-duplicate", message: `Duplicate meta description on ${ps.join(", ")}` });

  // Internal links to URLs outside the sitemap: check they resolve (redirect or 200), not 404.
  const PRIVATE = /^\/(api|ops|onboarding|offer-builder|offer|_next)(\/|$)/;
  const outside = [...internalTargets].filter((t) => !known.has(t) && !PRIVATE.test(t));
  await pool(outside, concurrency, async (t) => {
    const r = await get(t);
    if (r.status >= 400 || r.status === 0) {
      const from = pages.filter((p) => linksTo.get(p.path)?.has(t)).map((p) => p.path);
      site.push({ severity: "error", code: "broken-link", message: `Internal link ${t} returns ${r.status} (linked from ${from.slice(0, 5).join(", ")})` });
    } else if (r.status === 200 && !/\.(html)$/.test(t)) {
      site.push({ severity: "notice", code: "linked-not-in-sitemap", message: `${t} is linked and returns 200 but is not in the sitemap` });
    }
  });

  const all = [...site, ...pages.flatMap((p) => p.issues)];
  const errors = all.filter((i) => i.severity === "error").length;
  const warnings = all.filter((i) => i.severity === "warning").length;
  const notices = all.length - errors - warnings;
  const score = Math.max(0, Math.round(100 - (errors * 8 + warnings * 1.5) / Math.max(1, pages.length / 10)));
  return { ranAt: new Date().toISOString(), base, canonicalOrigin, pages, site, summary: { pages: pages.length, errors, warnings, notices, score } };
}
