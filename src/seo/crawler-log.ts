import "server-only";
import { db, dbDriver } from "@/onboarding/server/db";
import type { CrawlerHit } from "./crawlers";

/** One row per crawler + path, overwritten on each visit, so the table stays small. */
const recent = new Map<string, number>();
const THROTTLE_MS = 15 * 60 * 1000;

export async function recordCrawl(hit: Omit<CrawlerHit, "id" | "lastSeen">) {
  if (dbDriver() !== "postgres") return;
  const id = `${hit.crawler}|${hit.path}`.slice(0, 300);
  const now = Date.now();
  if ((recent.get(id) ?? 0) > now - THROTTLE_MS) return;
  recent.set(id, now);
  if (recent.size > 5000) recent.clear();
  try {
    await db().put<CrawlerHit>("crawler_hits", { ...hit, id, lastSeen: new Date(now).toISOString() });
  } catch {
    /* observability must never affect the response */
  }
}

export async function listCrawls(): Promise<CrawlerHit[]> {
  if (dbDriver() !== "postgres") return [];
  const rows = await db().find<CrawlerHit>("crawler_hits");
  return rows.sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
}
