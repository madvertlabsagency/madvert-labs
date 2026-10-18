import "server-only";
import { db, dbDriver } from "@/onboarding/server/db";
import { sitemapEntries } from "@/app/sitemap";
import { submitToIndexNow, type IndexNowResult } from "./indexnow";

type State = { id: string; url: string; lastModified: string; submittedAt: string; deleted?: boolean };

/**
 * Compares the current sitemap with what was last submitted and sends IndexNow only the URLs
 * that are new (published), have a newer lastmod (materially updated) or have disappeared
 * (deleted). Re-running it without content changes submits nothing, so it cannot spam.
 */
export async function syncIndexNow(): Promise<IndexNowResult & { added: number; updated: number; deleted: number }> {
  if (dbDriver() === "unconfigured") return { submitted: 0, skipped: "DATABASE_URL is not set", added: 0, updated: 0, deleted: 0 };
  const store = db();
  const [entries, previous] = await Promise.all([sitemapEntries(), store.find<State>("indexnow_state")]);
  const prev = new Map(previous.filter((p) => !p.deleted).map((p) => [p.url, p]));
  const now = new Date().toISOString();
  const changed: State[] = [];
  let added = 0;
  let updated = 0;

  for (const e of entries) {
    const lastModified = e.lastModified ?? "";
    const before = prev.get(e.url);
    prev.delete(e.url);
    if (!before) added++;
    else if (lastModified && lastModified > before.lastModified) updated++;
    else continue;
    changed.push({ id: e.url, url: e.url, lastModified, submittedAt: now });
  }
  const removed = [...prev.values()].map((p) => ({ ...p, deleted: true, submittedAt: now }));

  const urls = [...changed, ...removed].map((s) => s.url);
  if (!urls.length) return { submitted: 0, skipped: "Nothing changed", added, updated, deleted: 0 };
  const result = await submitToIndexNow(urls);
  // Only remember the new state once the engines accepted it, so a failed run is retried next time.
  if (result.submitted) await Promise.all([...changed, ...removed].map((s) => store.put("indexnow_state", s)));
  return { ...result, added, updated, deleted: removed.length };
}
