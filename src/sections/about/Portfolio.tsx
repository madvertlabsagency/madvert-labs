import Link from "next/link";
import { Eyebrow } from "@/components/ui/Section";
import { founder } from "@/lib/entities";
import type { IndustryChip } from "./data";
import { Live } from "./Live";

const journeys = ["Direct to consumer", "Service businesses", "B2B companies", "Established corporate operations"];

function Chip({ c, hidden }: { c: IndustryChip; hidden?: boolean }) {
  const inner = (
    <>
      <span className={`ab-chip-dot ab-chip-dot--${c.href ? "case" : "work"}`} aria-hidden="true" />
      <span className="ab-chip-l">{c.label}</span>
      <span className="ab-chip-k">{c.kind}</span>
    </>
  );
  return c.href ? (
    <Link href={c.href} className="ab-chip ab-chip--link" tabIndex={hidden ? -1 : undefined}>
      {inner}
    </Link>
  ) : (
    <span className="ab-chip">{inner}</span>
  );
}

function Row({ items, reverse, label }: { items: IndustryChip[]; reverse?: boolean; label: string }) {
  return (
    <div className={`ab-marquee ${reverse ? "ab-marquee--rev" : ""}`}>
      <div className="ab-marquee-track">
        <ul className="ab-marquee-set" aria-label={label}>
          {items.map((c) => (
            <li key={c.label}>
              <Chip c={c} />
            </li>
          ))}
        </ul>
        {/* Duplicate set for a seamless loop; hidden from assistive tech and the tab order. */}
        <ul className="ab-marquee-set ab-marquee-dup" aria-hidden="true">
          {items.map((c) => (
            <li key={c.label}>
              <Chip c={c} hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Portfolio({ chips }: { chips: IndustryChip[] }) {
  const a = chips.filter((_, i) => i % 2 === 0);
  const b = chips.filter((_, i) => i % 2 === 1);
  return (
    <section className="section relative overflow-hidden" aria-labelledby="portfolio-title">
      <div className="bg-aura pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow>Range</Eyebrow>
            </div>
            <h2 id="portfolio-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
              A Diverse Portfolio <span className="t-grad">Changes How You Think.</span>
            </h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-ink-2 lg:col-span-5 lg:col-start-8 lg:self-end">
            <p data-reveal>
              I&apos;ve worked across businesses with very different customers, sales cycles and buying decisions. From products sold directly to
              consumers to service businesses, B2B companies and established corporate operations, the channels change, but the underlying question
              stays the same:
            </p>
            <p data-reveal className="ab-question">What is stopping this business from growing?</p>
            <p data-reveal className="t-small">{founder.name}, {founder.jobTitle}</p>
          </div>
        </div>
      </div>

      <Live className="ab-strips relative mt-14 lg:mt-20">
        <Row items={a} label="Industries, first row" />
        <Row items={b} reverse label="Industries, second row" />
      </Live>

      <div className="container-x relative">
        <ol data-reveal className="ab-journeys" aria-label="Buying journeys">
          {journeys.map((j, i) => (
            <li key={j}>
              <span className="ab-journeys-n" aria-hidden="true">
                0{i + 1}
              </span>
              {j}
            </li>
          ))}
        </ol>
        <p data-reveal className="t-small mt-6 text-center">
          Industries from published case studies and real client stories. Tap a case study to read it.
        </p>
      </div>
    </section>
  );
}
