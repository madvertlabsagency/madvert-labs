import type { Metadata } from "next";
import { connection } from "next/server";
import { requireOpsPage } from "@/onboarding/server/ops";
import { OpsShell } from "@/onboarding/ui/ops/OpsKit";
import { dbDriver } from "@/onboarding/server/db";
import { listCrawls } from "@/seo/crawler-log";
import type { CrawlerCategory } from "@/seo/crawlers";

export const metadata: Metadata = { title: "Crawlers · Operations" };

const CATEGORY: Record<CrawlerCategory, string> = {
  search: "Search",
  "ai-search": "AI search",
  "ai-training": "AI training",
  "seo-tool": "SEO tool",
};

/** Which search and AI crawlers fetched which public URL, and when. One row per crawler and URL. */
export default async function OpsCrawlers() {
  await connection();
  const user = await requireOpsPage("admin");
  const hits = await listCrawls();
  const byCrawler = new Map<string, { last: string; urls: number; category: CrawlerCategory }>();
  for (const h of hits) {
    const c = byCrawler.get(h.crawler);
    if (!c) byCrawler.set(h.crawler, { last: h.lastSeen, urls: 1, category: h.category });
    else c.urls++;
  }
  const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC";

  return (
    <OpsShell user={user}>
      <div className="ob-wrap !max-w-[1400px] py-10">
        <h1 className="text-[28px] font-bold tracking-tight">Crawler activity</h1>
        <p className="mt-2 max-w-[760px] text-[14px] text-[var(--ob-ink-2)]">
          Visits from search and AI crawlers to the public website, grouped by crawler. Crawlers identify themselves by user agent, which can be spoofed, so treat this as
          an indication. No IP addresses or personal data are stored. Each crawler and URL keeps only its latest visit.
        </p>
        {dbDriver() !== "postgres" ? (
          <p className="mt-6 rounded-xl border border-[var(--ob-line)] p-4 text-[14px]">Crawler logging needs DATABASE_URL (Postgres). Nothing is recorded without it.</p>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[...byCrawler.entries()].map(([name, c]) => (
            <div key={name} className="rounded-2xl border border-[var(--ob-line)] bg-[var(--ob-card)] p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-ink-3)]">{CATEGORY[c.category]}</p>
              <p className="mt-1 text-[18px] font-bold">{name}</p>
              <p className="mt-1 text-[13px] text-[var(--ob-ink-2)]">Last crawl {fmt(c.last)}</p>
              <p className="text-[13px] text-[var(--ob-ink-2)]">{c.urls} URL{c.urls === 1 ? "" : "s"}</p>
            </div>
          ))}
          {!byCrawler.size ? <p className="text-[14px] text-[var(--ob-ink-2)]">No crawler visits recorded yet.</p> : null}
        </div>

        {hits.length ? (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--ob-line)]">
            <table className="w-full min-w-[720px] text-left text-[13.5px]">
              <caption className="sr-only">Latest crawler visit per URL</caption>
              <thead className="bg-[var(--ob-card)] text-[12px] uppercase tracking-[0.1em] text-[var(--ob-ink-3)]">
                <tr>
                  <th scope="col" className="px-4 py-3">Last crawl</th>
                  <th scope="col" className="px-4 py-3">Crawler</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3">URL</th>
                  <th scope="col" className="px-4 py-3">Response</th>
                </tr>
              </thead>
              <tbody>
                {hits.slice(0, 500).map((h) => (
                  <tr key={h.id} className="border-t border-[var(--ob-line)]">
                    <td className="whitespace-nowrap px-4 py-2.5">{fmt(h.lastSeen)}</td>
                    <td className="px-4 py-2.5 font-semibold">{h.crawler}</td>
                    <td className="px-4 py-2.5">{CATEGORY[h.category]}</td>
                    <td className="px-4 py-2.5 font-mono text-[12.5px]">{h.path}</td>
                    <td className="px-4 py-2.5">{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </OpsShell>
  );
}
