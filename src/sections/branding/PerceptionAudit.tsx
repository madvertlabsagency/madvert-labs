import Link from "next/link";
import { Arrow, Cta } from "@/components/ui/Button";
import { Deferred } from "@/components/perf/Deferred";
import { AuditScan } from "./AuditScan";
import "@/styles/branding.css";

/** "How does your brand look from the outside?": the perception audit and the way into a call. */
export function PerceptionAudit() {
  return (
    <section className="section-tight bm-audit-sec" aria-labelledby="audit-title">
      <div className="container-x">
        <div className="panel bm-audit grid grid-cols-1 items-center gap-12 overflow-hidden p-6 sm:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
          <div className="lg:col-span-6">
            <p data-reveal className="t-eyebrow">
              Brand perception audit
            </p>
            <h2 id="audit-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-5 !text-[clamp(32px,3.6vw,52px)]">
              How Does Your Brand Look <span className="t-grad">From the Outside?</span>
            </h2>
            <p data-reveal style={{ ["--reveal-delay" as string]: 110 }} className="t-lead mt-6 max-w-[520px]">
              Your buyers meet the brand before they meet you. We look at it the way they do: search, social, website, ads, reviews and the proposal on
              their desk. Then we show you where the impression breaks and what to build first.
            </p>
            <ul data-reveal style={{ ["--reveal-delay" as string]: 150 }} className="bm-audit-list mt-7">
              {["Every touchpoint reviewed as a new buyer sees it", "Where your quality is not showing yet", "The order to fix it in"].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <div data-reveal style={{ ["--reveal-delay" as string]: 190 }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Cta href="#book" size="lg" track="strategy_call_click" trackLabel="Book a Free Strategy Call">
                Book a Free Strategy Call
              </Cta>
              <Cta href="#book" size="lg" variant="secondary" track="strategy_call_click" trackLabel="Book a Meeting">
                Book a Meeting
              </Cta>
            </div>
            <Link
              href="/resources/brand-perception-checklist"
              data-track="lead_magnet_click"
              data-track-label="Get the Brand Perception Checklist"
              className="group/btn mt-6 inline-flex min-h-11 items-center gap-2.5 text-[15px] font-medium text-accent-text"
            >
              <span className="rounded-full bg-accent-soft px-2 py-0.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em]">Free</span>
              Get the Brand Perception Checklist
              <Arrow />
            </Link>
          </div>
          <div className="lg:col-span-6">
            <Deferred className="bm-au-slot">
              <AuditScan />
            </Deferred>
          </div>
        </div>
      </div>
    </section>
  );
}
