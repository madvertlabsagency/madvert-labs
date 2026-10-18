import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { founder, organization } from "@/lib/entities";
import { Live } from "./Live";

const uncovered: [string, string][] = [
  ["Weak offers", "Good ads cannot rescue an offer nobody wants."],
  ["Poor landing pages", "Paid traffic arrived, then leaked."],
  ["Low quality leads", "Cheap leads the sales team would not call."],
  ["Slow follow up", "Interested people went cold while they waited."],
  ["Missing CRM systems", "Enquiries lived in inboxes and WhatsApp threads."],
  ["Poor tracking", "Nobody could say which spend actually made money."],
  ["Fragmented marketing", "Several vendors, several directions, no owner."],
  ["Technology gaps", "Manual work where a simple tool should exist."],
];

export function MeetUsama() {
  return (
    <section id="meet-usama" className="section relative scroll-mt-20 overflow-hidden" aria-labelledby="usama-title">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <div data-reveal="fade" className="ab-portrait">
              <span className="ab-portrait-glow" aria-hidden="true" />
              <div className="ab-portrait-frame">
                <Image
                  src="/images/usama-abbas-dahri-portrait.webp"
                  alt={`Portrait of ${founder.name}, ${founder.jobTitle} of ${organization.name}`}
                  fill
                  sizes="(min-width:1024px) 440px, (min-width:640px) 420px, 88vw"
                  className="object-cover"
                />
              </div>
              <div className="ab-namecard">
                <p className="font-display text-[17px] font-semibold text-ink">{founder.name}</p>
                <p className="text-[13.5px] text-ink-3">
                  {founder.jobTitle}, {organization.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <Eyebrow>Meet Usama</Eyebrow>
          </div>
          <h2 id="usama-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
            The Campaigns Kept <span className="t-grad">Uncovering Bigger Problems.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p data-reveal className="text-ink">
              {founder.name}, {founder.jobTitle} of {organization.name}, started in digital marketing and performance acquisition. Running campaigns
              was the job.
            </p>
            <p data-reveal>But the campaigns kept pointing at problems that no amount of ad spend could fix.</p>
          </div>

          <Live className="ab-found">
            <p className="ab-found-k" aria-hidden="true">
              <span className="ab-found-scan" />
              What the campaigns kept uncovering
            </p>
            <ol className="ab-found-list" aria-label="What the campaigns kept uncovering">
              {uncovered.map(([t, d], i) => (
                <li key={t} className="ab-found-item" style={{ ["--i" as string]: i }}>
                  <span className="ab-found-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="ab-found-t">{t}</span>
                  <span className="ab-found-d">{d}</span>
                </li>
              ))}
            </ol>
          </Live>

          <div data-reveal className="ab-evolve">
            <span className="ab-evolve-from">Campaign execution</span>
            <span className="ab-evolve-arrow" aria-hidden="true">
              <svg viewBox="0 0 64 12" width="64" height="12">
                <path d="M0 6h58M52 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="ab-evolve-to">Connected growth systems</span>
          </div>
          <p data-reveal className="mt-6 text-[17px] leading-relaxed text-ink-2">
            That is why {organization.name} evolved from running campaigns into building the connected systems behind them: offer, page, lead quality,
            follow up, CRM, tracking and technology, designed to work as one.
          </p>
          <p data-reveal className="mt-7">
            <Link href={founder.path} className="group/btn inline-flex min-h-11 items-center gap-2 font-display text-[15px] font-semibold text-accent-text">
              Read Usama&apos;s profile <Arrow />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
