import "server-only";
import { db, dbDriver } from "@/onboarding/server/db";
import { sitemapEntries } from "@/app/sitemap";
import { site } from "@/lib/site";
import { organization } from "@/lib/entities";
import { auditSite, type SiteAudit } from "./audit";
import { indexNowEnabled, indexNowKey } from "./indexnow";
import { trainingCrawlerPolicy } from "./crawl-policy";
import { listCrawls } from "./crawler-log";

/**
 * Server side of the SEO control center (/ops/seo): runs and stores audits, and reports the
 * state of indexing, crawl policy and search-engine setup. Never returns secret values.
 */

type StoredAudit = SiteAudit & { id: string; trigger: string };
const KEEP = 12;

/**
 * Where to audit from: SEO_AUDIT_BASE when set (staging, local checks), the production origin in
 * production (Operations runs on the onboarding subdomain, so the request origin is not the site),
 * otherwise the deployment that received the request.
 */
export function auditBase(requestOrigin?: string) {
  const override = process.env.SEO_AUDIT_BASE?.trim();
  if (override) return override;
  return (process.env.VERCEL_ENV ?? "production") === "production" && process.env.NODE_ENV === "production" ? site.url : (requestOrigin ?? site.url);
}

export async function runAndStoreAudit(trigger: string, requestOrigin?: string) {
  const report = await auditSite({ base: auditBase(requestOrigin), canonicalOrigin: site.url });
  if (dbDriver() !== "unconfigured") {
    const store = db();
    // Pages without issues are trimmed to keep each stored run small.
    const slim: StoredAudit = { ...report, id: report.ranAt, trigger, pages: report.pages.map((p) => (p.issues.length ? p : { ...p, h1: p.h1.slice(0, 1) })) };
    await store.put("seo_audits", slim);
    const all = await store.find<StoredAudit>("seo_audits");
    const old = all.sort((a, b) => b.ranAt.localeCompare(a.ranAt)).slice(KEEP);
    await Promise.all(old.map((a) => store.remove("seo_audits", a.id)));
  }
  return report;
}

export async function auditHistory(): Promise<StoredAudit[]> {
  if (dbDriver() === "unconfigured") return [];
  const all = await db().find<StoredAudit>("seo_audits");
  return all.sort((a, b) => b.ranAt.localeCompare(a.ranAt));
}

export async function indexNowStatus() {
  const entries = await sitemapEntries();
  let tracked = 0;
  let lastSubmitted: string | null = null;
  if (dbDriver() !== "unconfigured") {
    const state = await db().find<{ submittedAt: string; deleted?: boolean }>("indexnow_state");
    tracked = state.filter((s) => !s.deleted).length;
    lastSubmitted = state.map((s) => s.submittedAt).sort().at(-1) ?? null;
  }
  return {
    keyConfigured: Boolean(indexNowKey()),
    enabled: indexNowEnabled(),
    keyFile: `${site.url}/indexnow-key.txt`,
    sitemapUrls: entries.length,
    tracked,
    pending: Math.max(0, entries.length - tracked),
    lastSubmitted,
  };
}

export async function crawlerSummary(days = 30) {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const hits = (await listCrawls()).filter((h) => h.lastSeen >= since);
  const by = new Map<string, { category: string; urls: number; last: string }>();
  for (const h of hits) {
    const c = by.get(h.crawler);
    if (!c) by.set(h.crawler, { category: h.category, urls: 1, last: h.lastSeen });
    else {
      c.urls++;
      if (h.lastSeen > c.last) c.last = h.lastSeen;
    }
  }
  return [...by.entries()].map(([crawler, v]) => ({ crawler, ...v })).sort((a, b) => b.urls - a.urls);
}

export type SetupItem = { label: string; ok: boolean; note: string };

export function setupStatus(): SetupItem[] {
  const env = (k: string) => Boolean(process.env[k]?.trim());
  return [
    { label: "Canonical domain", ok: site.url === "https://madvertlabs.com", note: `${site.url} (www redirects here with a 308)` },
    { label: "Database (DATABASE_URL)", ok: dbDriver() === "postgres", note: "Stores IndexNow state, audits and crawler visits." },
    { label: "IndexNow key (INDEXNOW_KEY)", ok: Boolean(indexNowKey()), note: "Served at /indexnow-key.txt; the value is never shown here." },
    { label: "Cron secret (CRON_SECRET)", ok: env("CRON_SECRET"), note: "Lets Vercel Cron run the daily IndexNow sync and the weekly audit." },
    { label: "Google Search Console tag (GOOGLE_SITE_VERIFICATION)", ok: env("GOOGLE_SITE_VERIFICATION"), note: "Optional if the property is verified by DNS." },
    { label: "Bing Webmaster tag (BING_SITE_VERIFICATION)", ok: env("BING_SITE_VERIFICATION"), note: "Optional if verified by importing from Search Console." },
    { label: "Company profiles (NEXT_PUBLIC_SAME_AS)", ok: organization.sameAs.length > 0, note: `${organization.sameAs.length} verified profile URL(s) in Organization schema, plus the Google Business Profile.` },
    { label: "AI training crawlers (AI_TRAINING_CRAWLERS)", ok: true, note: `GPTBot and other training crawlers are ${trainingCrawlerPolicy()}. Owner decision; search crawlers are unaffected.` },
  ];
}
