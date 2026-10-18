import "server-only";
import { site } from "@/lib/site";

/**
 * IndexNow (https://www.indexnow.org): tells Bing, Copilot and other participating engines that
 * specific URLs were published, materially changed or deleted, so they recrawl them sooner.
 *
 * The key is a secret-less ownership token, but it lives only in the INDEXNOW_KEY environment
 * variable (never in the repo). It is served at /indexnow-key.txt and referenced as keyLocation.
 * Submissions only happen from the production deployment, and only for URLs that actually changed.
 */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function indexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key && /^[a-zA-Z0-9-]{8,128}$/.test(key) ? key : null;
}

export function indexNowEnabled() {
  return Boolean(indexNowKey()) && (process.env.VERCEL_ENV ?? "production") === "production" && process.env.NODE_ENV === "production";
}

export type IndexNowResult = { submitted: number; status?: number; skipped?: string };

/** Submit up to 10,000 absolute URLs on this host in one request. Never throws. */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = indexNowKey();
  if (!key) return { submitted: 0, skipped: "INDEXNOW_KEY is not set" };
  if (!indexNowEnabled()) return { submitted: 0, skipped: "Not the production deployment" };
  const host = new URL(site.url).host;
  const list = [...new Set(urls)].filter((u) => {
    try {
      return new URL(u).host === host;
    } catch {
      return false;
    }
  });
  if (!list.length) return { submitted: 0, skipped: "No URLs on this host" };
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: `${site.url}/indexnow-key.txt`, urlList: list.slice(0, 10000) }),
      signal: AbortSignal.timeout(10000),
    });
    // 200 = received, 202 = accepted (key validation pending). 4xx means a key or URL problem.
    return { submitted: res.ok ? list.length : 0, status: res.status };
  } catch (e) {
    return { submitted: 0, skipped: e instanceof Error ? e.message : "Request failed" };
  }
}
