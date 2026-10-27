import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { topicClusters } from "@/content/topic-map";
import { site } from "@/lib/site";
import { requireOpsPage } from "@/onboarding/server/ops";
import { StatusPill } from "@/onboarding/ui/kit";
import { OpsShell } from "@/onboarding/ui/ops/OpsKit";
import { SeoControls } from "@/onboarding/ui/ops/SeoControls";
import { SEARCH_CRAWLERS, TRAINING_CRAWLERS, trainingCrawlerPolicy } from "@/seo/crawl-policy";
import { auditHistory, crawlerSummary, indexNowStatus, setupStatus } from "@/seo/control";

export const metadata: Metadata = { title: "SEO and AEO · Operations" };

const fmt = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC" : "Never";

/**
 * SEO and AEO control center: one place to see and act on crawl access, indexing, technical health,
 * AI crawler activity and the topic map. Everything shown is read from the same modules the public
 * site uses (robots policy, sitemap, IndexNow state, topic map), so it cannot drift from reality.
 */
export default async function OpsSeo() {
  await connection();
  const user = await requireOpsPage("admin");
  const [history, indexNow, crawlers] = await Promise.all([auditHistory(), indexNowStatus(), crawlerSummary()]);
  const setup = setupStatus();
  const latest = history[0];
  const issues = latest ? [...latest.site.map((i) => ({ ...i, path: i.path ?? "site" })), ...latest.pages.flatMap((p) => p.issues)] : [];
  const order = { error: 0, warning: 1, notice: 2 } as const;
  issues.sort((a, b) => order[a.severity] - order[b.severity]);
  const training = trainingCrawlerPolicy();
  const card = "rounded-2xl border border-[var(--ob-line)] bg-[var(--ob-card)] p-4";

  return (
    <OpsShell user={user}>
      <div className="grid gap-8">
        <div>
          <p className="ob-eyebrow">Marketing site → Search visibility</p>
          <h1 className="ob-h1 mt-3">
            SEO and AEO <span className="ob-grad-text">control center</span>
          </h1>
          <p className="ob-lead mt-3 max-w-[820px]">
            Crawl access, indexing, technical health and AI search visibility for {site.url.replace("https://", "")}. Search Console and Bing Webmaster Tools data
            stay in those tools.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <div className={card}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-ink-3)]">Health score</p>
            <p className="mt-1 text-[28px] font-bold">{latest ? `${latest.summary.score}/100` : "–"}</p>
            <p className="text-[13px] text-[var(--ob-ink-2)]">Last audit {fmt(latest?.ranAt)}</p>
          </div>
          <div className={card}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-ink-3)]">Issues</p>
            <p className="mt-1 text-[28px] font-bold">{latest ? `${latest.summary.errors} / ${latest.summary.warnings}` : "–"}</p>
            <p className="text-[13px] text-[var(--ob-ink-2)]">Errors / warnings</p>
          </div>
          <div className={card}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-ink-3)]">Sitemap</p>
            <p className="mt-1 text-[28px] font-bold">{indexNow.sitemapUrls}</p>
            <p className="text-[13px] text-[var(--ob-ink-2)]">
              <a href="/sitemap.xml" className="underline">
                Indexable URLs
              </a>
            </p>
          </div>
          <div className={card}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-ink-3)]">IndexNow</p>
            <p className="mt-1 text-[28px] font-bold">{indexNow.tracked}</p>
            <p className="text-[13px] text-[var(--ob-ink-2)]">Submitted · last {fmt(indexNow.lastSubmitted)}</p>
          </div>
          <div className={card}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--ob-ink-3)]">AI search crawls</p>
            <p className="mt-1 text-[28px] font-bold">{crawlers.filter((c) => c.category === "ai-search").reduce((n, c) => n + c.urls, 0)}</p>
            <p className="text-[13px] text-[var(--ob-ink-2)]">
              URLs, last 30 days ·{" "}
              <Link href="/ops/crawlers" className="underline">
                details
              </Link>
            </p>
          </div>
        </div>

        <SeoControls />

        <section className="ob-card ob-card-pad">
          <h2 className="ob-h3">Crawl access (robots.txt)</h2>
          <p className="mt-1 text-[13.5px] text-[var(--ob-ink-3)]">
            Enforced by{" "}
            <a href="/robots.txt" className="underline">
              /robots.txt
            </a>
            . Private paths (portal, operations, API) are disallowed for everyone. Cloudflare bot rules can still block a crawler robots.txt allows; see
            docs/SEO-AEO-CRAWLER-SETUP.md.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SEARCH_CRAWLERS.map((c) => (
              <li key={c.agent} className="flex items-start gap-3 rounded-xl bg-[var(--ob-card-2)] p-3 text-[13.5px]">
                <StatusPill status="completed" label="Allowed" />
                <span>
                  <strong>{c.agent}</strong>
                  <span className="block text-[var(--ob-ink-3)]">{c.purpose}</span>
                </span>
              </li>
            ))}
            <li className="flex items-start gap-3 rounded-xl bg-[var(--ob-card-2)] p-3 text-[13.5px]">
              <StatusPill status={training === "allowed" ? "in_progress" : "blocked"} label={training === "allowed" ? "Allowed (default)" : "Blocked"} />
              <span>
                <strong>Training crawlers</strong>
                <span className="block text-[var(--ob-ink-3)]">
                  {TRAINING_CRAWLERS.join(", ")}. Owner decision via AI_TRAINING_CRAWLERS; does not affect ChatGPT Search (OAI-SearchBot).
                </span>
              </span>
            </li>
          </ul>
        </section>

        <section className="ob-card ob-card-pad">
          <h2 className="ob-h3">Setup</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {setup.map((c) => (
              <li key={c.label} className="flex items-start gap-3 rounded-xl bg-[var(--ob-card-2)] p-3 text-[13.5px]">
                <StatusPill status={c.ok ? "completed" : "blocked"} label={c.ok ? "Ready" : "Action needed"} />
                <span>
                  <strong>{c.label}</strong>
                  <span className="block text-[var(--ob-ink-3)]">{c.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ob-card ob-card-pad">
          <h2 className="ob-h3">Latest audit issues</h2>
          {!latest ? (
            <p className="mt-3 text-[14px] text-[var(--ob-ink-2)]">No audit stored yet. Run one above (needs DATABASE_URL to keep history).</p>
          ) : !issues.length ? (
            <p className="mt-3 text-[14px] text-[var(--ob-ink-2)]">No issues in the audit of {fmt(latest.ranAt)}.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--ob-line)]">
              <table className="w-full min-w-[720px] text-left text-[13.5px]">
                <caption className="sr-only">Issues from the latest audit</caption>
                <thead className="bg-[var(--ob-card-2)] text-[12px] uppercase tracking-[0.1em] text-[var(--ob-ink-3)]">
                  <tr>
                    <th scope="col" className="px-4 py-3">Severity</th>
                    <th scope="col" className="px-4 py-3">Page</th>
                    <th scope="col" className="px-4 py-3">Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.slice(0, 300).map((i, n) => (
                    <tr key={`${i.path}-${i.code}-${n}`} className="border-t border-[var(--ob-line)]">
                      <td className="px-4 py-2.5">
                        <StatusPill status={i.severity === "error" ? "blocked" : i.severity === "warning" ? "in_progress" : "not_started"} label={i.severity} />
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[12.5px]">{i.path}</td>
                      <td className="px-4 py-2.5">{i.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {history.length > 1 ? (
            <p className="mt-4 text-[13px] text-[var(--ob-ink-3)]">
              History:{" "}
              {history
                .slice(0, 8)
                .map((h) => `${new Date(h.ranAt).toISOString().slice(0, 10)} ${h.summary.score}`)
                .join(" · ")}
            </p>
          ) : null}
        </section>

        <section className="ob-card ob-card-pad">
          <h2 className="ob-h3">Topic map</h2>
          <p className="mt-1 text-[13.5px] text-[var(--ob-ink-3)]">
            One primary URL per topic. Before publishing a new page, check whether its intent is already served here (src/content/topic-map.ts).
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--ob-line)]">
            <table className="w-full min-w-[720px] text-left text-[13.5px]">
              <caption className="sr-only">Topic clusters and their primary URLs</caption>
              <thead className="bg-[var(--ob-card-2)] text-[12px] uppercase tracking-[0.1em] text-[var(--ob-ink-3)]">
                <tr>
                  <th scope="col" className="px-4 py-3">Cluster</th>
                  <th scope="col" className="px-4 py-3">Primary URL(s)</th>
                  <th scope="col" className="px-4 py-3">Supporting pages</th>
                </tr>
              </thead>
              <tbody>
                {topicClusters.map((c) => (
                  <tr key={c.id} className="border-t border-[var(--ob-line)] align-top">
                    <td className="px-4 py-2.5">
                      <strong>{c.name}</strong>
                      <span className="block text-[12.5px] text-[var(--ob-ink-3)]">{c.intent}</span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12.5px]">
                      {c.pages
                        .filter((p) => p.role === "primary")
                        .map((p) => (
                          <span key={p.href} className="block">
                            {p.href}
                          </span>
                        ))}
                    </td>
                    <td className="px-4 py-2.5">{c.pages.filter((p) => p.role !== "primary").length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </OpsShell>
  );
}
