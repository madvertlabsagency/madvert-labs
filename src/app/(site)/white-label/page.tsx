import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "@/styles/white-label.css";
import { getCaseStudies } from "@/cms";
import { MadvertBookingCalendar } from "@/components/booking/MadvertBookingCalendar";
import { Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { BOOKING_CONTEXT, INDUSTRIES, META_CREDENTIAL, TRUST, WL_PHOTOS } from "@/content/white-label";
import { pageMetadata } from "@/lib/seo";
import { FinalCta } from "@/sections/shared/FinalCta";
import {
  CapabilityList,
  ChaosCollapse,
  CostLanes,
  CraftTimeline,
  DeliveryCompare,
  ExplodedOrg,
  FlowDefs,
  HeroSystem,
  HiringTabs,
  JourneyRepair,
  LeadPipeline,
  MarginEquation,
  ModelEngine,
  QualityCapacity,
  ScreenShare,
  SnapConnector,
  VslSteps,
} from "@/sections/white-label/Visuals";
import { VslPlayer } from "@/sections/white-label/VslPlayer";

const path = "/white-label";
const description =
  "White-label growth department for agencies: paid acquisition, lead generation, funnels, creative, tracking, CRM, automation and development delivered under your agency's brand.";

export const metadata: Metadata = pageMetadata({ title: "White-Label Growth Department for Agencies", description, path });

const CALL = { label: "Book a White-Label Strategy Call", href: "#book" };
const TRACK = "white_label_call_click";
const d = (ms: number) => ({ ["--reveal-delay" as string]: ms });

function Head({ id, a, b, className = "t-h1" }: { id: string; a: string; b?: string; className?: string }) {
  return (
    <h2 id={id} data-reveal style={d(60)} className={className}>
      {a} {b ? <span className="t-grad">{b}</span> : null}
    </h2>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <p data-reveal className="mt-10 border-l-2 border-[#00e5ff] pl-5 font-display text-[clamp(19px,2.2vw,24px)] font-semibold leading-snug tracking-tight">
      {children}
    </p>
  );
}

function Lines({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((l, i) => (
        <li key={l} data-reveal style={d(i * 50)}>
          {l}
        </li>
      ))}
    </ul>
  );
}

function CallCta({ label = CALL.label, className = "" }: { label?: string; className?: string }) {
  return (
    <Cta href={CALL.href} size="lg" track={TRACK} trackLabel={label} className={`!whitespace-normal text-center ${className}`}>
      {label}
    </Cta>
  );
}

export default async function WhiteLabelPage() {
  const cases = (await getCaseStudies()).filter((s) => !s.placeholder && s.cover?.url);
  const bySlug = new Map(cases.map((c) => [c.slug, c]));

  // Public covers with a "Confidential Client Work" tile after every third case.
  const proof: ({ kind: "case"; slug: string; title: string; url: string; alt: string } | { kind: "locked"; key: string })[] = [];
  cases.forEach((c, i) => {
    proof.push({ kind: "case", slug: c.slug, title: c.title, url: c.cover!.url, alt: c.cover!.alt || c.title });
    if (i % 3 === 2) proof.push({ kind: "locked", key: `locked-${i}` });
  });

  return (
    <>
      {/* 1 — HERO */}
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+48px)] md:pb-24" aria-labelledby="page-title">
        <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
        <GrowthRibbon shape="rise" spread={70} className="absolute inset-x-0 bottom-0 h-[420px] w-full" opacity={0.35} id="wl-hero-ribbon" />
        <div className="container-x relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div data-reveal>
              <Eyebrow>For agency owners who can sell</Eyebrow>
            </div>
            <h1 id="page-title" data-reveal style={d(60)} className="t-display mt-7">
              Close the Client. <span className="t-grad">We&rsquo;ll Handle the Delivery.</span>
            </h1>
            <p data-reveal style={d(120)} className="t-lead mt-7">
              Plug Madvert Labs into the backend of your agency and get an experienced team for paid acquisition, lead generation, funnels, creative,
              tracking, CRM, automation and development, delivered under your agency&rsquo;s brand.
            </p>
            <p data-reveal style={d(160)} className="mt-5 font-display text-[17px] font-semibold leading-relaxed">
              Your client. Your relationship. Your pricing.
              <br />
              <span className="text-accent-text">Our backend execution.</span>
            </p>
            <div data-reveal style={d(200)} className="mt-9">
              <CallCta />
              <p className="t-small mt-4">See if Madvert is the right fulfillment partner for your agency.</p>
            </div>
          </div>
          <div data-reveal style={d(160)} className="lg:col-span-7">
            <HeroSystem />
          </div>
        </div>
        <div className="container-x relative mt-14">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-line py-5 text-[13.5px] font-medium text-ink-2" aria-label="Experience">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 — VSL */}
      <section className="section relative" aria-labelledby="wl-vsl">
        <div className="container-x">
          <div className="mx-auto max-w-[900px] text-center">
            <Head id="wl-vsl" a="You Probably Don’t Need Help Getting the Next Client." b="You Need To Know Who Is Going To Deliver When You Close Them." />
          </div>
          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div data-reveal className="lg:col-span-9">
              <VslPlayer />
            </div>
            <div data-reveal style={d(120)} className="lg:col-span-3">
              <VslSteps />
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-[640px] text-center">
            <p data-reveal className="t-lead">
              If sales is your strength, keep doing what you&rsquo;re good at. We&rsquo;ll give you the delivery capacity to keep saying yes.
            </p>
            <div data-reveal style={d(80)} className="mt-8">
              <CallCta label="Let’s Talk Partnership" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — BOTTLENECK */}
      <section className="section relative" aria-labelledby="wl-bottleneck">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Head id="wl-bottleneck" a="Getting One More Client Is Exciting." b="Until You Realize You Now Have To Deliver Everything You Just Sold." />
            <div className="t-body mt-8 space-y-5 text-ink-2">
              <Lines items={["Maybe you’re already good at outreach.", "Maybe you can close.", "Maybe you understand your niche better than most marketers."]} />
              <p data-reveal>But every new client creates another question:</p>
              <Lines
                className="font-display font-semibold text-ink"
                items={[
                  "Who runs the campaigns?",
                  "Who builds the funnel?",
                  "Who makes the creatives?",
                  "Who fixes tracking?",
                  "Who sets up CRM and automation?",
                  "Who handles development when the scope suddenly grows?",
                ]}
              />
              <p data-reveal>
                And now instead of growing your agency, you&rsquo;re recruiting, briefing, checking, fixing and managing freelancers.
              </p>
            </div>
            <Highlight>Your sales capacity should not be limited by your fulfillment capacity.</Highlight>
          </div>
          <div data-reveal style={d(120)} className="lg:col-span-6">
            <ChaosCollapse />
          </div>
        </div>
      </section>

      {/* 4 — THE MODEL */}
      <section className="section relative" aria-labelledby="wl-model">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div data-reveal>
                <Eyebrow>Introducing the model</Eyebrow>
              </div>
              <div className="mt-6">
                <Head id="wl-model" a="Your Agency In The Front." b="Madvert In The Backend." />
              </div>
            </div>
            <div className="t-lead lg:col-span-6 lg:pt-14">
              <Lines items={["You bring the client.", "You own the relationship.", "You decide what you charge.", "You communicate under your agency."]} />
              <p data-reveal className="mt-4 text-ink">We quietly work behind the scenes to help you deliver.</p>
            </div>
          </div>
          <div data-reveal className="mt-12">
            <ModelEngine />
          </div>
          <h3 data-reveal className="t-label mt-14">What we can handle</h3>
          <div className="mt-4">
            <CapabilityList />
          </div>
          <Highlight>You do not need to hire six people to deliver six capabilities.</Highlight>
        </div>
      </section>

      {/* 5 — FOUNDER */}
      <section className="section relative overflow-hidden" aria-labelledby="wl-founder">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div data-reveal className="relative overflow-hidden rounded-[28px] border border-line-strong">
              <Image
                src={WL_PHOTOS.portrait.url}
                alt={WL_PHOTOS.portrait.alt}
                width={WL_PHOTOS.portrait.width}
                height={WL_PHOTOS.portrait.height}
                sizes="(min-width:1024px) 460px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3" aria-label="Real project work">
              {["texas-solar-2", "dubai-interior-design-2", "home-improvement-uae-1"].map((f, i) => (
                <div key={f} data-reveal style={d(i * 70)} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line">
                  <Image src={`/case-studies/${f}.webp`} alt="Real Madvert Labs project work" fill sizes="150px" className="object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-6">
            <Head id="wl-founder" a="I’m Usama." b="And This Is The Work I’ve Been Doing For More Than Five Years." />
            <dl data-reveal style={d(100)} className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
              {["5+ Years", "Multiple Markets", "Multiple Industries"].map((m) => (
                <div key={m} className="flex items-center gap-2.5">
                  <span className="h-px w-6 bg-[linear-gradient(90deg,#00b4ff,#00e5ff)]" aria-hidden="true" />
                  <dt className="t-label">{m}</dt>
                </div>
              ))}
            </dl>
            <div className="t-body mt-8 space-y-5 text-ink-2">
              <p data-reveal>I didn&rsquo;t build Madvert Labs after watching a few agency videos. I came into this through the actual work.</p>
              <p data-reveal className="text-ink">
                Running campaigns. Building funnels. Fixing tracking. Working on offers. Generating leads. Setting up automation. Building landing pages.
                Looking inside CRMs. Trying to understand why one campaign makes money and another one doesn&rsquo;t.
              </p>
              <p data-reveal>
                Alhamdulillah, that work has taken me across different industries and markets, including businesses in the United States, Dubai and
                Pakistan. From solar and roofing to real estate, interior design, ecommerce and other service businesses.
              </p>
              <p data-reveal>And the biggest lesson has been simple:</p>
              <p data-reveal className="font-display text-[22px] font-semibold tracking-tight text-ink">The ad is rarely the whole problem.</p>
              <Lines
                className="font-display text-[17px] text-ink"
                items={[
                  "Sometimes it’s the offer.",
                  "Sometimes it’s the landing page.",
                  "Sometimes it’s the creative.",
                  "Sometimes it’s the follow-up.",
                  "Sometimes it’s the CRM.",
                ]}
              />
              <p data-reveal>That is why Madvert was built around the whole growth system, not one isolated marketing service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — CREDENTIAL / AUTHORITY */}
      <section className="section relative" aria-labelledby="wl-craft">
        <div className="container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Head id="wl-craft" a="I Was Deep Into Meta Ads" b="Years Before Madvert Labs Existed." />
            <div className="t-body mt-8 space-y-5 text-ink-2">
              <p data-reveal>
                Four years ago, I was already studying advanced Meta advertising, campaign systems and performance marketing seriously.
              </p>
              <p data-reveal className="text-ink">Today, I don&rsquo;t only execute this work. I teach it too.</p>
              <p data-reveal>
                And that matters to me because you should not outsource your clients to someone who is learning the fundamentals using your account.
              </p>
            </div>
            {META_CREDENTIAL ? (
              <figure data-reveal className="panel mt-10 p-4 sm:p-5">
                {META_CREDENTIAL.image ? (
                  <Image src={META_CREDENTIAL.image} alt={`${META_CREDENTIAL.title} certificate`} width={1400} height={1000} sizes="(min-width:1024px) 640px, 100vw" className="h-auto w-full rounded-xl" />
                ) : null}
                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-display text-[17px] font-semibold">{META_CREDENTIAL.title}</span>
                  {META_CREDENTIAL.url ? (
                    <a href={META_CREDENTIAL.url} target="_blank" rel="noopener noreferrer" className="t-small text-accent-text hover:underline">
                      Verify credential
                    </a>
                  ) : (
                    <span className="t-small">{META_CREDENTIAL.issuer}</span>
                  )}
                </figcaption>
              </figure>
            ) : null}
            <div data-reveal className="mt-12">
              <CraftTimeline />
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure data-reveal style={d(100)} className="relative overflow-hidden rounded-[28px] border border-line-strong">
              <Image
                src={WL_PHOTOS.teaching.url}
                alt={WL_PHOTOS.teaching.alt}
                width={WL_PHOTOS.teaching.width}
                height={WL_PHOTOS.teaching.height}
                sizes="(min-width:1024px) 440px, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(10_15_28/0.9))] p-6 pt-20">
                <blockquote className="font-display text-[clamp(19px,2vw,24px)] font-semibold leading-snug tracking-tight text-white">
                  &ldquo;When people were learning it, I was building it.&rdquo;
                </blockquote>
                <p className="mt-2 text-[13px] text-white/70">Usama Abbas Dahri, Founder</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 7 — WHY PARTNER */}
      <section className="section relative" aria-labelledby="wl-why">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div data-reveal>
                <Eyebrow>Why partner with me?</Eyebrow>
              </div>
              <div className="mt-6">
                <Head id="wl-why" a="Because I Know What Your Client Is Actually Going To Ask For" b="After The Sale." />
              </div>
            </div>
            <div className="t-body text-ink-2 lg:col-span-6 lg:pt-14">
              <p data-reveal>A client rarely stays inside a neat little scope.</p>
              <Lines
                className="mt-4 text-ink"
                items={[
                  "You sell Meta Ads.",
                  "Then they need a landing page.",
                  "Then tracking breaks.",
                  "Then they need new creatives.",
                  "Then leads are not being followed up.",
                  "Then they ask about CRM.",
                  "Then they need an automation.",
                  "Then someone wants a dashboard.",
                ]}
              />
              <p data-reveal className="mt-4">That is where fragmented fulfillment becomes painful.</p>
            </div>
          </div>
          <div data-reveal className="mt-12">
            <JourneyRepair />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <h3 data-reveal className="t-h2 lg:col-span-5">Madvert Is Built Differently.</h3>
            <div className="t-body text-ink-2 lg:col-span-7">
              <p data-reveal>We can think across the full customer journey.</p>
              <p data-reveal className="mt-3 font-display text-[15px] font-semibold text-ink">
                Attention → Conversion → Qualification → Follow-Up → Sales → Measurement
              </p>
              <p data-reveal className="mt-4">
                That means fewer excuses between different vendors. And much less: <span className="text-ink">&ldquo;That&rsquo;s not my department.&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — INTERNATIONAL */}
      <section className="section relative" aria-labelledby="wl-intl">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Head id="wl-intl" a="Serious Delivery Without Building" b="A US-Sized Cost Structure." />
            </div>
            <div className="t-body space-y-4 text-ink-2 lg:col-span-6">
              <p data-reveal>
                You do not need five expensive specialists sitting in the same city as your client to produce serious digital work.
              </p>
              <p data-reveal>
                What matters is strategy, execution, communication, systems, accountability, and whether the work actually gets done properly.
              </p>
              <p data-reveal>
                Our advantage is simple. You get hands-on, senior-level thinking and a multidisciplinary delivery team without having to build the
                infrastructure yourself.
              </p>
              <p data-reveal>We have worked inside international markets and understand that clients paying serious money expect serious execution.</p>
            </div>
          </div>
          <div data-reveal className="mt-12">
            <DeliveryCompare />
          </div>
          <Highlight>
            The goal is not to be &ldquo;cheaper than America.&rdquo; The goal is to give you more delivery capability for the economics of your agency.
          </Highlight>
        </div>
      </section>

      {/* 9 — LEAD GENERATION */}
      <section className="section relative" aria-labelledby="wl-leads">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Head id="wl-leads" a="And If Your Client Needs Leads…" b="This Is Where We Get Very Comfortable." />
              <div className="t-body mt-8 space-y-4 text-ink-2">
                <p data-reveal>Lead generation has been one of the strongest parts of our work.</p>
                <p data-reveal>
                  But we don&rsquo;t define successful lead generation as: <span className="text-ink">&ldquo;Look, we generated 200 cheap forms.&rdquo;</span>
                </p>
                <p data-reveal>We look at the system around the lead.</p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <h3 data-reveal className="t-label">We ask</h3>
              <Lines
                className="t-body mt-4 text-ink"
                items={[
                  "Who are we trying to attract?",
                  "What makes somebody qualified?",
                  "What is the offer?",
                  "What does the landing page say?",
                  "What information should we collect?",
                  "How quickly does sales respond?",
                  "What happens if the lead does not answer?",
                  "How are we tracking what turns into business?",
                ]}
              />
              <p data-reveal className="mt-5 font-display text-[18px] font-semibold">
                Because a cheap lead that never becomes a conversation is not cheap.
              </p>
            </div>
          </div>
          <div data-reveal className="mt-12">
            <LeadPipeline />
          </div>
          <div className="mt-12">
            <h3 data-reveal className="t-label">Our lead generation system can include</h3>
            <ul data-reveal className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-ink-2">
              {[
                "Paid acquisition",
                "Offer positioning",
                "Performance creative",
                "Landing pages",
                "Qualification",
                "Tracking",
                "CRM routing",
                "WhatsApp / email follow-up",
                "Booking workflows",
                "Reporting",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <Highlight>We optimize for business opportunities, not screenshots that look good in a report.</Highlight>
        </div>
      </section>

      {/* 10 — PROOF */}
      <section className="section relative overflow-hidden" aria-labelledby="wl-proof">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Head id="wl-proof" a="Don’t Take My Word For It." b="I’ll Open The Dashboards." />
            <p data-reveal className="t-lead mt-7">
              If we get on a call, I can screen-share and walk you through the type of work we&rsquo;ve actually done.
            </p>
            <p data-reveal className="mt-4 font-display text-[15px] font-semibold text-ink-2">
              Campaigns. Funnels. Landing pages. CRM systems. Automation. Creative. Lead generation.
            </p>
          </div>
          <div className="t-body space-y-4 text-ink-2 lg:col-span-6 lg:pt-4">
            <p data-reveal>
              You can also visit the{" "}
              <Link href="/case-studies" className="text-accent-text underline-offset-4 hover:underline">
                Madvert Labs case studies
              </Link>{" "}
              and look through work we have permission to make public.
            </p>
            <p data-reveal>
              <span className="text-ink">Not everything we&rsquo;ve worked on is published.</span> Some client engagements are confidential, and some
              clients simply did not give us permission to publicly share their account or results.
            </p>
            <p data-reveal>We respect that. But where we can show the work, we do.</p>
            <div data-reveal className="flex flex-wrap items-center gap-5 pt-3">
              <CallCta label="Show Me the Work" />
              <Cta href="/case-studies" variant="link" track="case_study_open" trackLabel="white_label_case_studies">
                Browse public case studies
              </Cta>
            </div>
          </div>
        </div>
        <div className="wl-marquee mv-inview mt-14" style={{ ["--speed" as string]: "70s" }}>
          <div className="wl-marquee__track">
            {[0, 1].map((copy) =>
              proof.map((p) =>
                p.kind === "case" ? (
                  <Link
                    key={`${copy}-${p.slug}`}
                    href={`/case-studies/${p.slug}`}
                    aria-hidden={copy === 1 ? true : undefined}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group relative block aspect-[4/5] w-[220px] shrink-0 overflow-hidden rounded-2xl border border-line-strong sm:w-[260px]"
                  >
                    <Image src={p.url} alt={copy === 1 ? "" : p.alt} fill sizes="260px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </Link>
                ) : (
                  <div
                    key={`${copy}-${p.key}`}
                    aria-hidden={copy === 1 ? true : undefined}
                    className="wl-locked grid aspect-[4/5] w-[220px] shrink-0 place-items-center rounded-2xl border border-[rgb(0_180_255/0.25)] p-6 text-center text-white sm:w-[260px]"
                  >
                    <div>
                      <svg viewBox="0 0 24 24" width="30" height="30" className="mx-auto" aria-hidden="true">
                        <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                      </svg>
                      <p className="mt-4 font-display text-[15px] font-semibold">Confidential Client Work</p>
                      <p className="mt-2 text-[12px] text-white/60">Not published, out of respect for the client. Ask on the call.</p>
                    </div>
                  </div>
                ),
              ),
            )}
          </div>
        </div>
      </section>

      {/* 11 — EXPERIENCE STRIP */}
      <section className="section relative overflow-hidden" aria-labelledby="wl-industries">
        <div className="container-x">
          <div className="mx-auto max-w-[860px] text-center">
            <Head id="wl-industries" a="Different Businesses. Different Markets. Same Question." b="What Is Actually Stopping Growth?" />
          </div>
        </div>
        <div className="wl-marquee mv-inview mt-12" style={{ ["--speed" as string]: "48s" }}>
          <div className="wl-marquee__track">
            {[0, 1].map((copy) =>
              INDUSTRIES.map((ind) => {
                const c = ind.cases.map((s) => bySlug.get(s)).find(Boolean);
                return (
                  <div
                    key={`${copy}-${ind.label}`}
                    aria-hidden={copy === 1 ? true : undefined}
                    className="flex shrink-0 items-center gap-3 rounded-full border border-line-strong bg-glass py-1.5 pl-1.5 pr-5"
                  >
                    {c?.cover ? (
                      <span className="relative h-10 w-10 overflow-hidden rounded-full border border-line">
                        <Image src={c.cover.url} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                    ) : (
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-line" aria-hidden="true">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />
                      </span>
                    )}
                    <span className="whitespace-nowrap font-display text-[15px] font-semibold">{ind.label}</span>
                  </div>
                );
              }),
            )}
          </div>
        </div>
        <div className="container-x">
          <div className="t-body mx-auto mt-12 max-w-[720px] space-y-4 text-center text-ink-2">
            <p data-reveal>Working across different business models taught us not to force the same strategy onto every client.</p>
            <p data-reveal>
              What works for a roofing company is not automatically what works for real estate. What works for ecommerce is not automatically what
              works for a high-ticket service.
            </p>
            <p data-reveal className="font-display text-[19px] font-semibold text-ink">We start with the business. Then we build the system.</p>
          </div>
        </div>
      </section>

      {/* 12 — WHAT YOU ARE REALLY BUYING */}
      <section className="section relative" aria-labelledby="wl-buying">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Head id="wl-buying" a="This Is Not Just" b="“A Media Buyer For $500.”" />
              <p data-reveal className="t-lead mt-7">
                It is access to delivery capability your agency would otherwise have to assemble piece by piece.
              </p>
            </div>
            <div className="lg:col-span-6 lg:pt-6">
              <p data-reveal className="t-body text-ink-2">Depending on the engagement, Madvert can bring together performance marketing, lead generation, creative, funnels, landing pages, tracking, CRM, automation and development.</p>
              <h3 data-reveal className="t-h2 mt-8">
                One Partner Behind The Agency. <span className="t-grad">Multiple Capabilities Behind The Partner.</span>
              </h3>
            </div>
          </div>
          <div data-reveal className="mt-12">
            <ExplodedOrg />
          </div>
        </div>
      </section>

      {/* 13 — COMMERCIAL MODEL */}
      <section className="section relative" aria-labelledby="wl-margin">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Head id="wl-margin" a="Keep Your Client." b="Keep Your Margin." />
            <div className="t-body mt-8 space-y-4 text-ink-2">
              <p data-reveal>You control what you sell and what you charge. Madvert charges you for backend fulfillment.</p>
              <div data-reveal className="border-l-2 border-[#00e5ff] pl-5">
                <p className="t-label">Starting point</p>
                <p className="mt-2 text-ink">
                  Standard white-label fulfillment generally starts from around <strong className="font-semibold">$500</strong>, depending on scope.
                </p>
                <p className="mt-2">Larger projects, multiple-service engagements and custom development are scoped separately.</p>
              </div>
              <p data-reveal>And if you are bringing consistent volume, we can discuss partner pricing that makes sense for both sides.</p>
              <Lines
                className="pt-2 text-ink"
                items={[
                  "No awkward revenue-sharing model required for standard engagements.",
                  "No need to expose Madvert to the client.",
                  "No need to build an entire delivery department before you start selling.",
                ]}
              />
            </div>
          </div>
          <div data-reveal style={d(120)} className="lg:col-span-6">
            <div className="wl-stage p-6 sm:p-9">
              <span className="wl-label wl-faint">Simple model</span>
              <div className="mt-6">
                <MarginEquation />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14 — SAVING TIME */}
      <section className="section relative" aria-labelledby="wl-hiring">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Head id="wl-hiring" a="Stop Building The Team" b="Every Time You Close A Client." />
            <div className="t-body mt-8 space-y-4 text-ink-2">
              <p data-reveal>Hiring one person is manageable. Building an entire fulfillment operation is different.</p>
              <p data-reveal className="text-ink">
                Recruiting. Testing freelancers. Replacing people. Reviewing work. Managing deadlines. Fixing communication.
              </p>
              <p data-reveal>Then doing it all again when the scope changes.</p>
            </div>
            <Highlight>What if the next client did not require another hiring decision?</Highlight>
          </div>
          <div data-reveal style={d(120)} className="lg:col-span-7">
            <HiringTabs />
          </div>
        </div>
      </section>

      {/* 15 — COST OF DOING NOTHING */}
      <section className="section relative" aria-labelledby="wl-cost">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Head id="wl-cost" a="The Expensive Part Isn’t Losing A Freelancer." b="It’s Losing The Client They Were Supposed To Deliver For." />
            <div className="t-body mt-8 space-y-4 text-ink-2">
              <p data-reveal>
                Poor fulfillment can cost retention, reviews, referrals, reputation, and your confidence to keep selling.
              </p>
              <p data-reveal className="text-ink">
                If your sales engine is growing faster than your backend, the next client can become a liability instead of an opportunity.
              </p>
            </div>
          </div>
          <div data-reveal style={d(120)} className="lg:col-span-7">
            <CostLanes />
          </div>
        </div>
      </section>

      {/* 16 — QUALITY + CAPACITY */}
      <section className="section relative" aria-labelledby="wl-quality">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Head id="wl-quality" a="More Delivery Capacity Is Useless If The Work Is Bad." b="And Great Work Is Difficult To Scale If Only One Person Knows How To Do It." />
            </div>
            <div className="t-body space-y-4 text-ink-2 lg:col-span-5 lg:pt-6">
              <p data-reveal className="font-display text-[19px] font-semibold text-ink">The goal is both: Quality AND Capacity.</p>
              <p data-reveal>
                That is why we combine specialists, systems and repeatable workflows instead of relying on one generalist to do everything.
              </p>
            </div>
          </div>
          <div data-reveal className="mt-12">
            <QualityCapacity />
          </div>
        </div>
      </section>

      {/* 17 — ONE MOVE AWAY */}
      <section className="section relative overflow-hidden" aria-labelledby="wl-move">
        <div className="container-x">
          <div className="mx-auto max-w-[860px] text-center">
            <Head id="wl-move" a="You May Be One Backend Partnership Away" b="From Selling With A Lot More Confidence." />
            <p data-reveal className="t-lead mt-7">
              Imagine closing the next client without immediately thinking: <span className="text-ink">&ldquo;Now who am I going to hire?&rdquo;</span>
            </p>
          </div>
          <div className="mt-12">
            <SnapConnector />
          </div>
          <div className="t-body mx-auto mt-12 max-w-[560px] text-center text-ink-2">
            <p data-reveal>Instead:</p>
            <Lines
              className="mt-3 text-ink"
              items={["You know who handles delivery.", "You know where the work goes.", "You know what capabilities are available."]}
            />
            <p data-reveal className="mt-3">And you can focus on the part of the agency you actually want to grow.</p>
            <p data-reveal className="t-h2 mt-10 text-ink">
              Sell The Front End. <span className="t-grad">Plug Into The Backend.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 18 — WHO THIS IS FOR */}
      <section className="section relative" aria-labelledby="wl-fit">
        <div className="container-x">
          <h2 id="wl-fit" className="sr-only">
            Who this is for
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 data-reveal className="t-h2">
                We&rsquo;re Probably <span className="t-grad">A Good Fit</span> If&hellip;
              </h3>
              <ul className="mt-8 divide-y divide-[color:var(--line)] border-y border-line">
                {[
                  "You already run an agency and want stronger fulfillment.",
                  "You are good at sales but do not want to build a large internal team yet.",
                  "You are starting an agency and want experienced execution behind you.",
                  "You sell paid media, lead generation, funnels, automation or growth services.",
                  "You want to expand what you can sell without becoming the expert in every service yourself.",
                  "You care about keeping clients happy, not simply signing them.",
                ].map((x, i) => (
                  <li key={x} data-reveal style={d(i * 50)} className="flex gap-4 py-4 text-[15.5px] text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 data-reveal className="t-h2">
                We&rsquo;re Probably <span className="text-ink-3">NOT A Fit</span> If&hellip;
              </h3>
              <ul className="mt-8 divide-y divide-[color:var(--line)] border-y border-line">
                {[
                  "You want the cheapest freelancer you can find.",
                  "You expect guaranteed results.",
                  "You regularly overpromise things to clients and expect delivery to rescue the sale.",
                  "You want us to communicate misleading claims to your clients.",
                  "You do not care about the quality of fulfillment.",
                ].map((x, i) => (
                  <li key={x} data-reveal style={d(i * 50)} className="flex gap-4 py-4 text-[15.5px] text-ink-2">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-[color:var(--ink-3)]" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p data-reveal className="t-lead mx-auto mt-12 max-w-[680px] text-center">
            Good partnerships require good clients, good communication and realistic expectations on both sides.
          </p>
        </div>
      </section>

      {/* 19 — LOW-RISK CTA + BOOKING */}
      <section id="book" className="section relative scroll-mt-20 overflow-hidden" aria-labelledby="book-title">
        <div className="booking-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4" data-reveal>
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line-strong">
                <Image src={WL_PHOTOS.portrait.url} alt={WL_PHOTOS.portrait.alt} fill sizes="64px" className="object-cover object-[50%_15%]" />
              </span>
              <div>
                <p className="font-display text-[15px] font-semibold">Usama Abbas Dahri</p>
                <p className="t-small">Founder, Madvert Labs</p>
              </div>
            </div>
            <h2 id="book-title" data-reveal style={d(60)} className="t-h1 mt-7">
              Book The Call. <span className="t-grad">I&rsquo;ll Tell You Straight If We&rsquo;re A Fit.</span>
            </h2>
            <div className="t-body mt-6 space-y-4 text-ink-2">
              <p data-reveal className="text-ink">No hard sell.</p>
              <p data-reveal>
                On the call, we can look at what you sell, who you sell to, what your clients usually need, where fulfillment currently breaks, and what
                Madvert could realistically handle.
              </p>
              <p data-reveal>
                If I don&rsquo;t think we are the right backend partner for you, I&rsquo;ll tell you. If we are a fit, we can map out how the partnership
                should work.
              </p>
            </div>
            <div data-reveal className="mt-8">
              <ScreenShare />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p data-reveal className="t-label mb-3">Book a White-Label Strategy Call</p>
            <div className="booking-frame rounded-[28px] p-2 sm:p-3">
              <MadvertBookingCalendar context={BOOKING_CONTEXT} />
            </div>
            <p className="t-small mt-4">Bring a current client scope if you have one. We can look at something real.</p>
          </div>
        </div>
      </section>

      {/* 20 — FINAL CLOSE */}
      <FinalCta
        title="You Don’t Need To Become Great At Every Part Of Delivery."
        accent="You Need A Backend You Can Trust Enough To Keep Selling."
        primary={{ label: "Let’s Build Your Backend", href: "#book" }}
        track={TRACK}
        micro="Madvert Labs · Digital Marketing & Growth Systems · Beyond Advertising. We Build Growth Systems."
      >
        <p>Your agency stays yours. Your client stays yours. Your pricing stays yours.</p>
        <p className="mt-4">
          Madvert works quietly behind the scenes to help make the delivery something your client is happy to pay for. And if you can consistently bring
          good clients, we believe we can help you make them some of the happiest clients in your agency, InshaAllah.
        </p>
      </FinalCta>
      <FlowDefs />
    </>
  );
}
