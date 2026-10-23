import Link from "next/link";
import { FAQ } from "@/components/facts/FAQ";
import { ProcessSteps } from "@/components/facts/ProcessSteps";
import { ProofCards } from "@/components/service-page/ProofCards";
import { plain, Rich } from "@/components/service-page/Rich";
import { SpSection } from "@/components/service-page/SpSection";
import { Arrow } from "@/components/ui/Button";
import { getServiceEntity } from "@/lib/entities";
import { karachiFaqs, karachiIndustries, karachiProofSlugs, karachiQuotes, karachiServices, karachiSteps } from "./karachi-content";
import { OfficeMapCard } from "./OfficeMapCard";

export function LocationServices() {
  return (
    <SpSection
      id="services"
      label="Services"
      title="Services available from the Karachi team"
      intro={<p>Each service can be taken on its own or combined with the others, planned and reported by one team.</p>}
    >
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {karachiServices.map((s, i) => {
          const e = getServiceEntity(s.key);
          return (
            <li key={s.key} data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }}>
              <Link
                href={e.path}
                data-track="service_cta_click"
                data-track-label={`karachi_${s.key}`}
                className="panel group/btn flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <h3 className="inline-flex items-center gap-2 font-display text-[18px] font-semibold text-ink">
                  {e.name} <Arrow />
                </h3>
                <span className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.note}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </SpSection>
  );
}

export function LocationProcess() {
  return (
    <SpSection
      id="how-we-work"
      label="How we work"
      title="How Madvert Labs works with Karachi businesses"
      intro={<p>Karachi businesses are welcome to meet the team in person at the office in Bahria Town Karachi. Businesses elsewhere work with the same team online.</p>}
    >
      <ProcessSteps steps={karachiSteps.map((s) => ({ name: s.name, text: <p>{s.text}</p> }))} />
    </SpSection>
  );
}

export function LocationIndustries() {
  return (
    <SpSection
      id="industries"
      label="Industries"
      title="Industries Madvert Labs has worked with"
      intro={<p>Every industry below is backed by a published case study or a client video testimonial.</p>}
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {karachiIndustries.map((ind) => (
          <li key={ind.name} className="rounded-2xl border border-line bg-glass p-5" data-reveal>
            <p className="font-display text-[16px] font-semibold text-ink">{ind.name}</p>
            <p className="mt-1.5 text-[14px] text-ink-3">
              {ind.href ? (
                <Link href={ind.href} className="sp-inline-link">
                  {ind.source}
                </Link>
              ) : (
                ind.source
              )}
            </p>
          </li>
        ))}
      </ul>
    </SpSection>
  );
}

export function LocationProof() {
  return (
    <SpSection
      id="proof"
      label="Proof"
      title="Results and words from real clients"
      intro={
        <p>
          The figures below are taken from each case study exactly as reported, including currency and context. They describe specific campaigns, not market benchmarks.
        </p>
      }
    >
      <ProofCards slugs={karachiProofSlugs} />
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {karachiQuotes.map((t) => (
          <figure key={t.name} className="panel p-6 sm:p-8" data-reveal>
            <blockquote className="loc-quote font-display text-[clamp(18px,1.6vw,22px)] font-medium leading-snug text-ink">
              <p>&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-5 text-[14.5px] text-ink-2">
              <span className="font-semibold text-ink">{t.name}</span>, {t.role}, {t.business}
              <span className="block text-[13px] text-ink-3">From a client video testimonial</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-[15px] text-ink-3">
        Past results do not guarantee future results.{" "}
        <Link href="/case-studies" className="sp-inline-link">
          See every case study
        </Link>
        .
      </p>
    </SpSection>
  );
}

const visitSteps = [
  "Book a strategy call or send a WhatsApp message with a short note about the business.",
  "Agree a time to meet at the office in Bahria Town Karachi, or choose a video call instead.",
  "Bring the real numbers: ad spend, enquiries, sales and what has already been tried.",
];

export function LocationVisit() {
  return (
    <SpSection
      id="visit"
      label="Visit"
      title="Visit the Madvert Labs office in Karachi"
      intro={<p>The office is in Midway A Commercial, Bahria Town Karachi. Message on WhatsApp or book a strategy call to arrange a meeting at the office.</p>}
    >
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <OfficeMapCard />
        </div>
        <div className="panel p-6 sm:p-8 lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: 80 }}>
          <h3 className="t-h3">Arranging a meeting</h3>
          <ol className="mt-6 space-y-5">
            {visitSteps.map((t, i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong font-display text-[13px] font-semibold text-accent-text">{i + 1}</span>
                <span className="pt-1 text-[15.5px] leading-relaxed text-ink-2">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SpSection>
  );
}

export function LocationFaq() {
  const items = karachiFaqs.map((f) => ({ q: f.q, a: plain(f.a), answer: <p><Rich text={f.a} /></p> }));
  return (
    <SpSection id="faq" label="Common questions" title="Working with a digital marketing agency in Karachi: common questions">
      <div className="max-w-[860px]">
        <FAQ items={items} withSchema />
      </div>
    </SpSection>
  );
}
