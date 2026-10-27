import Link from "next/link";
import { DirectAnswer } from "@/components/facts/DirectAnswer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { office, whatsapp } from "@/lib/site";
import { karachiPath } from "./karachi-content";

const glance = [
  { label: "Office", value: "Midway A Commercial, Bahria Town Karachi" },
  { label: "Serves", value: "Karachi, the rest of Pakistan and international clients" },
  { label: "Meet", value: "At the office or online, whichever suits the business" },
  { label: "Measured by", value: "Qualified leads, booked calls and sales, not clicks" },
];

export function LocationHero({ updated }: { updated: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+40px)] md:pb-24" aria-labelledby="page-title">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
      <GrowthRibbon shape="rise" spread={60} className="absolute -bottom-16 left-0 h-[260px] w-full" opacity={0.35} id="loc-ribbon-karachi" />
      <div className="container-x relative">
        <Breadcrumbs items={[{ name: "Digital Marketing Agency in Karachi", path: karachiPath }]} />
        <div className="mt-12 grid grid-cols-1 items-start gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow>Karachi, Pakistan</Eyebrow>
            </div>
            <h1 id="page-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-display mt-7 !text-[clamp(34px,4.2vw,60px)]">
              Digital Marketing Agency in Karachi. <span className="t-grad">One Growth Partner, From Ads to Revenue.</span>
            </h1>
            <div data-reveal style={{ ["--reveal-delay" as string]: 140 }} className="mt-7">
              <DirectAnswer label="About Madvert Labs in Karachi" updated={updated}>
                <p>
                  Madvert Labs is a digital marketing and growth systems company with its office in Bahria Town Karachi, Pakistan. The Karachi team plans and runs Meta Ads lead
                  generation, performance marketing, Google Ads, SEO, AI SEO and AEO, branding, and CRM and automation for established businesses in Karachi, across Pakistan and
                  internationally.
                </p>
                <p>
                  Madvert Labs connects those services into one{" "}
                  <Link href="/growth-systems" className="sp-inline-link">
                    growth system
                  </Link>{" "}
                  and judges the work by qualified leads, booked calls and sales rather than clicks or reach.
                </p>
              </DirectAnswer>
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: 200 }} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Cta href="#book" size="lg" track="strategy_call_click" trackLabel="karachi_hero">
                Book a Free Strategy Call
              </Cta>
              <a
                href={whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-label="karachi_hero"
                className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong bg-glass px-7 font-display text-[16px] font-semibold text-ink backdrop-blur transition-colors hover:border-[color:var(--accent)]"
              >
                WhatsApp {office.phone}
              </a>
            </div>
          </div>
          <aside data-reveal="fade" style={{ ["--reveal-delay" as string]: 180 }} className="lg:col-span-5" aria-label="Madvert Labs Karachi at a glance">
            <div className="panel sp-glance p-6 sm:p-8">
              <p className="t-label">At a glance</p>
              <dl className="mt-5 divide-y divide-[color:var(--line)]">
                {glance.map((g) => (
                  <div key={g.label} className="grid grid-cols-1 gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[130px_1fr] sm:gap-4">
                    <dt className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">{g.label}</dt>
                    <dd className="text-[15px] leading-relaxed text-ink-2">{g.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
