"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Btn, Field } from "../kit";
import { Msg, opsCall, useBusy } from "./OpsKit";

type Result = { submitted?: number; status?: number; skipped?: string; added?: number; updated?: number; deleted?: number };

/** Buttons for the SEO control center: run an audit, sync IndexNow, submit specific URLs. */
export function SeoControls() {
  const router = useRouter();
  const auditRun = useBusy();
  const sync = useBusy();
  const submit = useBusy();
  const [urls, setUrls] = useState("");
  const describe = (r: Result) =>
    r.skipped ? `Nothing submitted: ${r.skipped}.` : `${r.submitted ?? 0} URL(s) submitted${r.status ? ` (HTTP ${r.status})` : ""}${r.added !== undefined ? `: ${r.added} new, ${r.updated} updated, ${r.deleted} deleted` : ""}.`;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <section className="ob-card ob-card-pad">
        <h2 className="ob-h3">Technical audit</h2>
        <p className="mt-1 text-[13.5px] text-[var(--ob-ink-3)]">Crawls robots.txt, the sitemap and every sitemap URL the way a search crawler first sees them. Takes up to a minute.</p>
        <Btn
          className="mt-4"
          disabled={auditRun.busy}
          onClick={async () => {
            const r = await auditRun.run(() => opsCall<{ summary?: { errors: number; warnings: number; pages: number } }>("seo", { action: "audit" }));
            if (r.summary) {
              auditRun.setMsg({ tone: r.summary.errors ? "danger" : "success", text: `${r.summary.pages} pages: ${r.summary.errors} errors, ${r.summary.warnings} warnings.` });
              router.refresh();
            }
          }}
        >
          {auditRun.busy ? "Auditing…" : "Run audit now"}
        </Btn>
        <Msg msg={auditRun.msg} />
      </section>

      <section className="ob-card ob-card-pad">
        <h2 className="ob-h3">IndexNow sync</h2>
        <p className="mt-1 text-[13.5px] text-[var(--ob-ink-3)]">Sends Bing and other IndexNow engines only the URLs that are new, changed (newer lastmod) or deleted. Runs daily on its own.</p>
        <Btn
          className="mt-4"
          disabled={sync.busy}
          onClick={async () => {
            const r = await sync.run(() => opsCall<{ result?: Result }>("seo", { action: "indexnow-sync" }));
            if (r.result) {
              sync.setMsg({ tone: "info", text: describe(r.result) });
              router.refresh();
            }
          }}
        >
          {sync.busy ? "Syncing…" : "Sync changed URLs"}
        </Btn>
        <Msg msg={sync.msg} />
      </section>

      <section className="ob-card ob-card-pad">
        <h2 className="ob-h3">Submit specific URLs</h2>
        <Field label="One URL or path per line" htmlFor="seo-urls" help="Only madvertlabs.com URLs are sent. Use after fixing or substantially updating a page.">
          <textarea id="seo-urls" className="ob-input min-h-[96px]" value={urls} onChange={(e) => setUrls(e.target.value)} placeholder={"/services/meta-ads\n/glossary/qualified-lead"} />
        </Field>
        <Btn
          className="mt-3"
          disabled={submit.busy || !urls.trim()}
          onClick={async () => {
            const r = await submit.run(() => opsCall<{ result?: Result }>("seo", { action: "indexnow-submit", urls: urls.split(/\s+/).filter(Boolean) }));
            if (r.result) submit.setMsg({ tone: "info", text: describe(r.result) });
          }}
        >
          {submit.busy ? "Submitting…" : "Submit to IndexNow"}
        </Btn>
        <Msg msg={submit.msg} />
      </section>
    </div>
  );
}
