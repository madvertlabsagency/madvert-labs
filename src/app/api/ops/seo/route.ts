import { requireOpsSession } from "@/onboarding/server/auth";
import { audit } from "@/onboarding/server/events";
import { body, handle, json, sameOrigin } from "@/onboarding/server/http";
import { site } from "@/lib/site";
import { runAndStoreAudit } from "@/seo/control";
import { submitToIndexNow } from "@/seo/indexnow";
import { syncIndexNow } from "@/seo/indexnow-sync";

/**
 * SEO control center actions (admins only):
 *  - audit: crawl the live site and store the report
 *  - indexnow-sync: submit only URLs that are new, changed or deleted since the last sync
 *  - indexnow-submit: submit specific URLs on this site (e.g. after fixing a page)
 */
export async function POST(req: Request) {
  return handle(async () => {
    if (!sameOrigin(req)) return json({ error: "Invalid origin" }, 403);
    const user = await requireOpsSession("admin");
    const b = await body<{ action?: string; urls?: string[] }>(req);
    const actor = `team:${user.email}`;

    if (b.action === "audit") {
      const report = await runAndStoreAudit(`manual:${user.email}`, new URL(req.url).origin);
      await audit({ actor, action: "seo.audit", target: `${report.summary.errors} errors, ${report.summary.warnings} warnings` });
      return json({ ok: true, summary: report.summary });
    }
    if (b.action === "indexnow-sync") {
      const result = await syncIndexNow();
      await audit({ actor, action: "seo.indexnow_sync", target: `${result.submitted} submitted` });
      return json({ ok: true, result });
    }
    if (b.action === "indexnow-submit") {
      const urls = (Array.isArray(b.urls) ? b.urls : [])
        .map((u) => String(u).trim())
        .filter(Boolean)
        .map((u) => (u.startsWith("/") ? `${site.url}${u}` : u))
        .slice(0, 500);
      if (!urls.length) return json({ error: "Please add at least one URL on madvertlabs.com." }, 400);
      const result = await submitToIndexNow(urls);
      await audit({ actor, action: "seo.indexnow_submit", target: `${result.submitted} of ${urls.length} submitted` });
      return json({ ok: true, result });
    }
    return json({ error: "Unknown action" }, 400);
  });
}
