import type { Metadata } from "next";
import { connection } from "next/server";
import { requireOpsPage } from "@/onboarding/server/ops";
import { OpsShell } from "@/onboarding/ui/ops/OpsKit";
import { dbDriver } from "@/onboarding/server/db";
import { listSurveyResponses } from "@/survey/results";
import { SURVEY_COLUMNS, WOULD_BUY } from "@/survey/white-label";

export const metadata: Metadata = { title: "Surveys · Operations" };

/** White-label partnership feedback: one row per customer, columns as in the survey brief. */
export default async function OpsSurveys() {
  await connection();
  const user = await requireOpsPage();
  const rows = await listSurveyResponses();
  const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" });
  const counts = WOULD_BUY.map((o) => [o, rows.filter((r) => r.wouldBuy === o).length] as const);

  return (
    <OpsShell user={user}>
      <div className="ob-wrap !max-w-[1600px] py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">White-label feedback</h1>
            <p className="mt-2 text-[14px] text-[var(--ob-ink-2)]">
              Answers from <a className="underline" href="/white-label-partnership/feedback" target="_blank" rel="noopener">/white-label-partnership/feedback</a>. Times in
              Pakistan time.
            </p>
          </div>
          {rows.length ? (
            <a href="/ops/surveys/export" className="rounded-full bg-[linear-gradient(100deg,#00b4ff,#00e5ff)] px-5 py-2.5 text-[14px] font-semibold text-[#0a0f1c]">
              Download CSV
            </a>
          ) : null}
        </div>
        {dbDriver() !== "postgres" ? (
          <p className="mt-6 rounded-xl border border-[var(--ob-line)] p-4 text-[14px]">Survey storage needs DATABASE_URL (Postgres).</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3 text-[14px]">
          <span className="rounded-full border border-[var(--ob-line)] px-4 py-2">{rows.length} responses</span>
          {counts.map(([o, n]) => (
            <span key={o} className="rounded-full border border-[var(--ob-line)] px-4 py-2">
              Would use: {o} · {n}
            </span>
          ))}
        </div>

        {rows.length ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--ob-line)]">
            <table className="w-full min-w-[1400px] text-left align-top text-[13.5px]">
              <caption className="sr-only">Survey responses</caption>
              <thead className="bg-[var(--ob-card)] text-[12px] uppercase tracking-[0.1em] text-[var(--ob-ink-3)]">
                <tr>
                  {SURVEY_COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className="px-4 py-3 font-semibold">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-[var(--ob-line)] align-top">
                    {SURVEY_COLUMNS.map((c) => (
                      <td key={c.key} className="max-w-[320px] whitespace-pre-wrap break-words px-4 py-3">
                        {c.key === "submittedAt" ? fmt(r.submittedAt) : String(r[c.key] ?? "") || <span className="text-[var(--ob-ink-3)]">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-8 text-[14px] text-[var(--ob-ink-2)]">No responses yet. Share the survey link to start collecting feedback.</p>
        )}
      </div>
    </OpsShell>
  );
}
