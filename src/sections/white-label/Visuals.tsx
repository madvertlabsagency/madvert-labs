"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/sections/acquisition/InView";
import { BACKEND_MODULES, CAPABILITIES } from "@/content/white-label";

const v = (o: Record<string, string | number>) => o as CSSProperties;

/** True while the element is on screen (`latch` keeps it true after the first sighting). */
function useSeen<T extends HTMLElement>(latch = false, threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (latch && e.isIntersecting) {
          setOn(true);
          io.disconnect();
        } else if (!latch) setOn(e.isIntersecting);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [latch, threshold]);
  return { ref, on };
}

/** Steps through `n` phases every `ms` while active; reduced motion jumps to `rest`. */
function usePhase(n: number, ms: number | number[], active: boolean, rest = n - 1) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active || reduce) return;
    const wait = Array.isArray(ms) ? ms[i % ms.length] : ms;
    const t = window.setTimeout(() => setI((x) => (x + 1) % n), wait);
    return () => window.clearTimeout(t);
  }, [active, reduce, i, n, ms]);
  return reduce ? rest : i;
}

/** The shared flow gradient referenced by `.wl-flow` strokes. Rendered once per page. */
export function FlowDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wl-flow-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#00b4ff" />
          <stop offset="1" stopColor="#00e5ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Stage({ children, className = "", label, on, style }: { children: ReactNode; className?: string; label: string; on: boolean; style?: CSSProperties }) {
  return (
    <div role="img" aria-label={label} className={`wl-stage mv-inview ${className}`} data-paused={on ? "false" : "true"} style={style}>
      {children}
    </div>
  );
}

/** Short curved link between two modules; turns vertical on small screens. */
function Wire({ dashed = false, className = "" }: { dashed?: boolean; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 20" preserveAspectRatio="none" className="my-5 h-5 w-14 rotate-90 md:my-0 md:w-16 md:rotate-0">
        <path d="M0 10 C 22 3, 58 17, 80 10" className="wl-flow wl-flow--faint" />
        <path d="M0 10 C 22 3, 58 17, 80 10" className={`wl-flow ${dashed ? "wl-flow--dash" : ""}`} />
      </svg>
    </div>
  );
}

/* ───────────── 1. Hero: CLIENT → YOUR AGENCY → MADVERT BACKEND ───────────── */
export function HeroSystem() {
  const { ref, on } = useSeen<HTMLDivElement>();
  const active = usePhase(BACKEND_MODULES.length, 1300, on, -1);
  return (
    <div ref={ref}>
      <Stage
        on={on}
        className="wl-hero-stage p-5 sm:p-7"
        label="Diagram: the client only deals with your agency. Behind your agency, Madvert's backend runs paid media, funnels, creative, CRM, automation, analytics and development."
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <span className="wl-label wl-faint">Delivery map</span>
          <span className="wl-label flex items-center gap-2 text-[#00e5ff]">
            <span className="wl-dot wl-dot--live" /> Backend online
          </span>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-[0.9fr_auto_1.15fr_auto_1.6fr]">
          <div className="wl-node mx-auto w-full max-w-[220px] p-4 text-center">
            <span className="wl-label wl-faint">Client</span>
            <p className="mt-2 font-display text-[15px] font-semibold">Sees one brand</p>
            <p className="wl-muted mt-1 text-[12px]">Yours</p>
          </div>
          <Wire />
          <div className="wl-hero-agency wl-node wl-node--strong mx-auto w-full max-w-[240px] p-5">
            <span className="wl-label text-[#00e5ff]">Front end</span>
            <p className="mt-2 font-display text-[19px] font-bold leading-tight tracking-tight">YOUR AGENCY</p>
            <ul className="wl-muted mt-3 space-y-1 text-[12.5px]">
              <li>Your client relationship</li>
              <li>Your pricing</li>
              <li>Your brand on the work</li>
            </ul>
          </div>
          <Wire dashed />
          <div className="relative">
            <div className="wl-hero-backend wl-node p-4">
              <div className="flex items-center justify-between">
                <span className="wl-label text-[#00e5ff]">Madvert backend</span>
                <span className="wl-label wl-faint">White-label</span>
              </div>
              <p className="wl-muted mt-1 text-[12px]">Growth department, out of the client&rsquo;s view</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {BACKEND_MODULES.map((m, i) => (
                  <div
                    key={m}
                    data-on={active === i || active === -1 ? "true" : "false"}
                    className={`wl-module-tile flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[12.5px] font-medium ${i === BACKEND_MODULES.length - 1 ? "col-span-2" : ""}`}
                  >
                    <span className="wl-dot" style={{ opacity: active === i ? 1 : 0.4 }} />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="wl-faint mt-6 text-center text-[12px]">Only your agency faces the client.</p>
      </Stage>
    </div>
  );
}

/* ───────────── 2. VSL progression ───────────── */
const VSL_STEPS = ["Close client", "Send scope to Madvert", "We execute", "You present the work", "Client stays with your agency"];
export function VslSteps() {
  const { ref, on } = useSeen<HTMLOListElement>();
  const step = usePhase(VSL_STEPS.length + 1, [900, 900, 900, 900, 900, 2200], on, VSL_STEPS.length);
  return (
    <ol ref={ref} className="wl-steps space-y-5" aria-label="How the partnership works">
      <span className="wl-steps__fill" style={{ height: `calc(${Math.max(0, Math.min(step, VSL_STEPS.length) - 1) / (VSL_STEPS.length - 1)} * (100% - 28px))` }} aria-hidden="true" />
      {VSL_STEPS.map((s, i) => (
        <li key={s} className="wl-step relative flex items-center gap-4" data-on={i < step ? "true" : "false"}>
          <span className="wl-step__mark" aria-hidden="true" />
          <span className="wl-step__text wl-label !text-[12px] text-ink-2">{s}</span>
        </li>
      ))}
    </ol>
  );
}

/* ───────────── 3. Chaos → one backend ───────────── */
const CONTRACTORS = [
  { t: "Media Buyer", x: 6, y: 8, r: -4 },
  { t: "Designer", x: 62, y: 4, r: 3 },
  { t: "Developer", x: 2, y: 62, r: 2 },
  { t: "Funnel Builder", x: 64, y: 66, r: -3 },
  { t: "Automation Specialist", x: 32, y: 78, r: 4 },
  { t: "Video Editor", x: 36, y: 0, r: -2 },
];
export function ChaosCollapse() {
  const { ref, on } = useSeen<HTMLDivElement>();
  // 0 calm, 1..6 windows open, 7 hold chaos, 8 collapse, 9 hold clean
  const phase = usePhase(10, [900, 450, 450, 450, 450, 450, 450, 1500, 1000, 3200], on, 9);
  const collapsed = phase >= 8;
  return (
    <div ref={ref}>
      <Stage on={on} className="wl-chaos p-5 sm:p-7" label="Animation: freelancer windows pile up around an agency founder, then collapse into one Madvert Labs white-label backend module.">
        <div className="flex items-center justify-between">
          <span className="wl-label wl-faint">{collapsed ? "1 accountable backend partner" : `${Math.min(Math.max(phase, 0), 6)} moving parts`}</span>
          <span className="wl-label wl-faint">Clients: {Math.min(phase + 1, 7)}</span>
        </div>
        <div className="relative mx-auto mt-4 h-[360px] max-w-[560px]">
          {CONTRACTORS.map((c, i) => (
            <div
              key={c.t}
              className="wl-win"
              data-state={collapsed ? "collapse" : phase > i ? "open" : "closed"}
              style={v({ left: `${c.x}%`, top: `${c.y}%`, "--r": `${c.r}deg`, "--d": `${i * 0.3}s` })}
            >
              <div className="wl-win__bar"><i /><i /><i /></div>
              <div className="px-3 py-2.5">
                <p className="text-[12px] font-semibold">{c.t}</p>
                <p className="wl-faint mt-1 text-[10.5px]">brief · check · fix</p>
              </div>
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{ opacity: collapsed ? 0 : 1, transition: "opacity .4s" }}>
            <div className="wl-node mx-auto grid h-16 w-16 place-items-center rounded-full">
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <circle cx="12" cy="8" r="4" fill="none" stroke="#a9b6c9" strokeWidth="1.5" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" fill="none" stroke="#a9b6c9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="wl-label wl-muted mt-2">Agency founder</p>
          </div>
          <div className="wl-core absolute left-1/2 top-1/2 w-[min(280px,80%)] -translate-x-1/2 -translate-y-1/2" data-on={collapsed ? "true" : "false"}>
            <div className="wl-node wl-node--strong p-5 text-center">
              <span className="wl-dot wl-dot--live mx-auto block" />
              <p className="mt-3 font-display text-[18px] font-bold tracking-tight">MADVERT LABS</p>
              <p className="wl-label mt-1 text-[#00e5ff]">White-label backend</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center font-display text-[14px] font-semibold">
          6 moving parts <span className="text-[#00e5ff]">→</span> 1 accountable backend partner
        </p>
      </Stage>
    </div>
  );
}

/* ───────────── 4. The model: engine → agency → client ───────────── */
const ENGINE = ["Paid Media", "Creative", "Funnel", "CRM", "Automation", "Tech"];
export function ModelEngine() {
  const { ref, on } = useSeen<HTMLDivElement>();
  const lit = usePhase(ENGINE.length, 1100, on, -1);
  return (
    <div ref={ref}>
      <Stage on={on} className="p-5 sm:p-8" label="Diagram: six Madvert capabilities flow into your agency, and your agency sends one clean output to the client.">
        <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[0.8fr_auto_0.9fr_1fr_1.4fr]">
          <div className="wl-node mx-auto w-full max-w-[220px] p-4 text-center lg:order-none">
            <span className="wl-label wl-faint">Client</span>
            <p className="mt-2 font-display text-[15px] font-semibold">One clean output</p>
            <p className="wl-muted mt-1 text-[12px]">Reports, campaigns, pages, systems</p>
          </div>
          <Wire />
          <div className="wl-node wl-node--strong mx-auto w-full max-w-[230px] p-5 text-center">
            <span className="wl-label text-[#00e5ff]">In the front</span>
            <p className="mt-2 font-display text-[18px] font-bold tracking-tight">YOUR AGENCY</p>
            <p className="wl-muted mt-1 text-[12px]">Northline Growth Co.</p>
            <p className="wl-faint text-[10.5px]">(fictional agency)</p>
          </div>
          <div className="hidden h-[300px] lg:block" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              {ENGINE.map((e, i) => {
                const y = 8 + i * 16.8;
                const d = `M100 ${y} C 55 ${y}, 45 50, 0 50.5`;
                return (
                  <g key={e}>
                    <path d={d} className="wl-flow wl-flow--faint" />
                    <path d={d} className="wl-flow wl-flow--dash" style={{ opacity: lit === -1 || lit === i ? 1 : 0.25, transition: "opacity .5s" }} />
                  </g>
                );
              })}
            </svg>
          </div>
          <Wire className="lg:hidden" dashed />
          <div className="relative mx-auto aspect-square w-full max-w-[340px]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="100" cy="100" r="74" fill="none" stroke="rgb(0 229 255 / .25)" strokeDasharray="2 6" className="wl-engine-ring" />
              <circle cx="100" cy="100" r="54" fill="none" stroke="rgb(0 180 255 / .2)" strokeDasharray="10 8" className="wl-engine-ring wl-engine-ring--rev" />
            </svg>
            <div className="absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2">
              <div className="wl-node wl-node--strong rounded-full p-3 text-center" style={{ aspectRatio: "1" }}>
                <div className="grid h-full place-items-center">
                  <div>
                    <p className="font-display text-[13px] font-bold leading-tight sm:text-[15px]">MADVERT</p>
                    <p className="wl-label !text-[8.5px] text-[#00e5ff]">Engine</p>
                  </div>
                </div>
              </div>
            </div>
            {ENGINE.map((e, i) => {
              const a = (i / ENGINE.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <div
                  key={e}
                  className="wl-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[11.5px] font-semibold"
                  style={{
                    left: `${50 + Math.cos(a) * 40}%`,
                    top: `${50 + Math.sin(a) * 40}%`,
                    borderColor: lit === i ? "rgb(0 229 255 / .7)" : undefined,
                    transition: "border-color .5s",
                  }}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </Stage>
    </div>
  );
}

export function CapabilityList() {
  return (
    <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {CAPABILITIES.map((c, i) => (
        <div key={c.key} data-reveal style={v({ "--reveal-delay": i * 60 })} className="border-t border-line py-5">
          <dt className="flex items-center gap-3 font-display text-[17px] font-semibold">
            <span className="text-[12px] text-ink-3">0{i + 1}</span>
            {c.name}
          </dt>
          <dd className="mt-2 text-[15px] text-ink-2">{c.text}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ───────────── 6. Timeline LEARNED → TAUGHT OTHERS ───────────── */
const TL = ["Learned", "Executed", "Managed", "Built systems", "Taught others"];
export function CraftTimeline() {
  const { ref, on } = useSeen<HTMLDivElement>(true, 0.5);
  return (
    <div ref={ref} className="wl-tl" data-on={on ? "true" : "false"} role="list" aria-label="Learned, executed, managed, built systems, taught others">
      <span className="wl-tl__fill" aria-hidden="true" />
      {TL.map((t, i) => (
        <div key={t} role="listitem" className="wl-tl__item" style={v({ "--i": i })}>
          <div className="wl-tl__dot" />
          <span className="wl-label !text-[10px] text-ink-2 sm:!text-[11px]">{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ───────────── 7. Journey: breaks → repaired ───────────── */
const JOURNEY = ["Ad", "Landing page", "Form", "CRM", "Automation", "Sales", "Reporting"];
const BREAKS: Record<number, string> = { 1: "Tracking breaks", 3: "No follow-up", 5: "No attribution" };
export function JourneyRepair() {
  const { ref, on } = useSeen<HTMLDivElement>();
  const phase = usePhase(2, [2600, 3400], on, 1);
  const repaired = phase === 1;
  return (
    <div ref={ref}>
      <Stage on={on} className="p-5 sm:p-8" label="Animation: a customer journey from ad to reporting shows breaks between vendors, then Madvert connections repair every break.">
        <div className="mb-8 flex items-center justify-between gap-3">
          <span className="wl-label wl-faint">Customer journey</span>
          <span className="wl-label" style={{ color: repaired ? "#00e5ff" : "#ff9a9a", transition: "color .5s" }}>
            {repaired ? "Connected by Madvert" : "Fragmented vendors"}
          </span>
        </div>
        <div className="flex flex-col items-stretch md:flex-row md:items-center" data-repaired={repaired ? "true" : "false"}>
          {JOURNEY.map((j, i) => (
            <div key={j} className="contents">
              <div className="wl-node mx-auto w-[min(220px,100%)] px-3 py-3 text-center md:mx-0 md:w-auto md:min-w-[86px]">
                <span className="wl-label !text-[10px]">{j}</span>
              </div>
              {i < JOURNEY.length - 1 ? (
                <div className="wl-jlink" aria-hidden="true">
                  <span className={`wl-jseg ${BREAKS[i] ? "wl-jseg--broken" : "wl-jseg--ok"}`} />
                  {BREAKS[i] ? <span className="wl-jbreak wl-label !text-[9.5px]">{BREAKS[i]}</span> : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 8. Fragmented model vs one backend team ───────────── */
const SPECIALISTS = [
  { t: "Media buyer", x: 10, y: 14 },
  { t: "Designer", x: 64, y: 8 },
  { t: "Developer", x: 76, y: 52 },
  { t: "Funnel builder", x: 8, y: 62 },
  { t: "Automation", x: 42, y: 80 },
];
export function DeliveryCompare() {
  const { ref, on } = useSeen<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Stage on={on} className="grid grid-cols-1 md:grid-cols-2" label="Comparison: a traditional model of five specialists with multiple contracts, workflows and handoffs, versus one Madvert backend growth team.">
        <div className="border-b border-white/10 p-5 sm:p-8 md:border-b-0 md:border-r">
          <span className="wl-label wl-faint">Traditional fragmented model</span>
          <div className="relative mt-5 h-[250px]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="wl-tangle absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M20 20 C 60 40, 30 60, 80 58" />
              <path d="M70 14 C 40 50, 70 70, 18 68" />
              <path d="M18 68 C 40 40, 60 90, 50 86" />
              <path d="M80 58 C 60 20, 20 90, 20 20" />
              <path d="M50 86 C 90 70, 90 20, 70 14" />
            </svg>
            {SPECIALISTS.map((s) => (
              <div key={s.t} className="absolute rounded-lg border border-white/15 bg-white/[0.04] px-2.5 py-1.5 text-[11.5px] text-[#c9d4e3]" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                {s.t}
              </div>
            ))}
          </div>
          <ul className="wl-muted mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px]">
            <li>5 specialists</li>
            <li>Multiple contracts</li>
            <li>Multiple workflows</li>
            <li>Multiple handoffs</li>
          </ul>
        </div>
        <div className="p-5 sm:p-8">
          <span className="wl-label text-[#00e5ff]">Madvert</span>
          <div className="relative mt-5 grid h-[250px] place-items-center">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-10 w-full -translate-y-1/2" aria-hidden="true">
              <path d="M0 20 C 30 14, 70 26, 100 20" className="wl-flow wl-flow--dash" />
            </svg>
            <div className="wl-node wl-node--strong relative px-6 py-5 text-center">
              <p className="font-display text-[17px] font-bold tracking-tight">ONE BACKEND</p>
              <p className="font-display text-[17px] font-bold tracking-tight">GROWTH TEAM</p>
              <p className="wl-label mt-2 text-[#00e5ff]">One brief · one workflow</p>
            </div>
          </div>
          <ul className="wl-muted mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px]">
            <li>One partner</li>
            <li>One agreement</li>
            <li>One delivery workflow</li>
          </ul>
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 9. Lead pipeline: raw leads fade, qualified continue ───────────── */
const PIPE = [
  { t: "Ad creative", img: "/case-studies/dubai-real-estate-nigeria-1.webp" },
  { t: "Landing page", img: "/case-studies/home-improvement-uae-2.webp" },
  { t: "Qualification form", img: "/case-studies/dubai-interior-design-2.webp" },
  { t: "CRM", img: null },
  { t: "Follow-up", img: null },
  { t: "Booked opportunity", img: null },
];
export function LeadPipeline() {
  const { ref, on } = useSeen<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Stage on={on} className="p-5 sm:p-8" label="Animation: leads move from ad creative through a landing page and qualification. Poor leads fade out; a qualified opportunity continues to CRM, follow-up and a booked call.">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {PIPE.map((p, i) => (
            <div key={p.t} className="text-center">
              <div className={`wl-node relative mx-auto aspect-[4/5] w-full overflow-hidden ${i === PIPE.length - 1 ? "wl-node--strong" : ""}`}>
                {p.img ? (
                  <Image src={p.img} alt="" fill sizes="160px" className="object-cover object-top opacity-80" />
                ) : (
                  <div className="grid h-full place-items-center p-2">
                    <div className="w-full space-y-1.5">
                      {[0, 1, 2].map((r) => (
                        <div key={r} className="flex items-center gap-1.5 rounded-md bg-white/[0.05] px-1.5 py-1">
                          <span className="wl-dot" style={{ width: 5, height: 5, opacity: i === PIPE.length - 1 && r === 0 ? 1 : 0.35 }} />
                          <span className="h-1 flex-1 rounded bg-white/15" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="wl-label mt-2 !text-[9.5px] text-[#c9d4e3]">{p.t}</p>
            </div>
          ))}
        </div>
        <div className="wl-pipe relative mt-6 h-6" aria-hidden="true">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
          {[0, 1.2, 2.4, 3.6, 4.8].map((d) => (
            <span key={d} className="wl-lead wl-lead--raw" style={v({ "--d": `${d}s` })} />
          ))}
          <span className="wl-lead wl-lead--qualified" style={v({ "--d": "0.6s" })} />
          <span className="wl-lead wl-lead--qualified" style={v({ "--d": "4.1s" })} />
        </div>
        <div className="wl-faint mt-3 flex justify-between text-[11px]">
          <span>Raw leads</span>
          <span>Unqualified leads drop out</span>
          <span className="text-[#00e5ff]">Qualified opportunity</span>
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 12. Exploded organisation ───────────── */
const ORG = ["Performance Marketing", "Lead Generation", "Creative", "Funnels", "Landing Pages", "Tracking", "CRM", "Automation", "Development"];
const SCATTER = [
  [-60, -50, -8, 80], [10, -70, 6, 40], [70, -40, 10, 120], [-80, 10, 5, 60], [0, 30, -4, 140], [80, 20, -10, 30], [-50, 70, 7, 100], [20, 80, -6, 50], [60, 60, 9, 90],
];
export function ExplodedOrg() {
  const { ref, on } = useSeen<HTMLDivElement>(true, 0.35);
  return (
    <div ref={ref}>
      <Stage on={on} className="p-5 sm:p-10" label="Animation: nine separate capabilities float apart, then connect behind your agency as one organisation.">
        <div className="wl-exploded" data-on={on ? "true" : "false"}>
          <div className="mx-auto grid max-w-[720px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {ORG.map((o, i) => (
              <div
                key={o}
                className="wl-cap wl-node px-3 py-3 text-center text-[12.5px] font-semibold sm:text-[13.5px]"
                style={v({ "--x": `${SCATTER[i][0]}px`, "--y": `${SCATTER[i][1]}px`, "--rot": `${SCATTER[i][2]}deg`, "--z": `${SCATTER[i][3]}px`, "--i": i })}
              >
                {o}
              </div>
            ))}
          </div>
          <div className="wl-cap-link mx-auto h-10 w-px bg-[linear-gradient(#00e5ff,transparent)]" aria-hidden="true" />
          <div className="wl-cap-link wl-node wl-node--strong mx-auto max-w-[420px] px-6 py-4 text-center">
            <p className="font-display text-[19px] font-bold tracking-tight">YOUR AGENCY</p>
            <p className="wl-label mt-1 text-[#00e5ff]">One partner behind it</p>
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 13. Margin equation (illustrative, no amounts) ───────────── */
export function MarginEquation() {
  const { ref, on } = useSeen<HTMLDivElement>(true, 0.4);
  const rows = [
    { op: "", label: "You charge your client", w: 1, from: 0, color: "linear-gradient(90deg,#3a5a8c,#5d7fb5)" },
    { op: "−", label: "Madvert delivery cost", w: 0.55, from: 0, color: "linear-gradient(90deg,#2a3a55,#3e5272)" },
    { op: "=", label: "Your agency margin", w: 0.45, from: 0.55, color: "linear-gradient(90deg,#00b4ff,#00e5ff)" },
  ];
  return (
    <div ref={ref} data-on={on ? "true" : "false"} className="space-y-6" role="img" aria-label="Illustration: your client price minus Madvert's delivery cost equals your agency margin. You set the price.">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline gap-3">
            <span className="w-4 font-display text-[18px] font-bold text-[#00e5ff]">{r.op}</span>
            <span className="wl-label !text-[11.5px]">{r.label}</span>
          </div>
          <div className="relative mt-2.5 ml-7 h-3 rounded-full bg-white/[0.05]">
            <div
              className="wl-bar absolute top-0"
              style={v({ left: `${r.from * 100}%`, width: `${r.w * 100}%`, "--w": 1, "--d": `${i * 0.45}s`, background: r.color, boxShadow: i === 2 ? "0 0 18px rgb(0 229 255 / .5)" : "none" })}
            />
          </div>
        </div>
      ))}
      <p className="wl-faint ml-7 text-[12px]">Illustrative proportions. You set your price; your margin depends on it.</p>
    </div>
  );
}

/* ───────────── 14. Hiring tabs collapse ───────────── */
const HIRES = ["Hire Media Buyer", "Hire Designer", "Hire Developer", "Hire Automation Specialist"];
export function HiringTabs() {
  const { ref, on } = useSeen<HTMLDivElement>();
  // 0 all open, 1..4 closing, 5 partner shown (hold)
  const phase = usePhase(6, [1600, 650, 650, 650, 650, 3200], on, 5);
  return (
    <div ref={ref}>
      <Stage on={on} className="p-4 sm:p-6" label="Animation: browser tabs for hiring a media buyer, designer, developer and automation specialist close one by one and become a single tab: Partner with Madvert.">
        <div className="flex items-center gap-1.5 overflow-hidden border-b border-white/10 pb-0">
          <span className="mr-2 flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          {HIRES.map((h, i) => (
            <span
              key={h}
              data-closed={phase > i ? "true" : "false"}
              className="wl-tab flex min-w-0 shrink items-center gap-2 rounded-t-lg border border-b-0 border-white/12 bg-white/[0.05] px-3 py-2 text-[11.5px] text-[#c9d4e3]"
            >
              {h} <span className="text-white/40">×</span>
            </span>
          ))}
          <span
            data-on={phase >= 5 ? "true" : "false"}
            className="wl-partner-tab rounded-t-lg bg-[linear-gradient(92deg,#00b4ff,#00e5ff)] px-4 py-2 font-display text-[12px] font-bold text-[#0a0f1c]"
          >
            PARTNER WITH MADVERT
          </span>
        </div>
        <div className="grid h-[150px] place-items-center text-center">
          <p className="wl-muted max-w-[360px] text-[13.5px]">
            {phase >= 5 ? "One backend partner. No new hiring decision for the next client." : "Job post · interviews · test task · onboarding · review"}
          </p>
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 15. Cost of doing nothing ───────────── */
const FRAG = ["Delay", "Revision", "Missed tracking", "Poor communication"];
export function CostLanes() {
  const { ref, on } = useSeen<HTMLDivElement>();
  // 0 won, 1..4 problems, 5 renewal fades, 6 hold, 7 madvert lane, 8 hold
  const phase = usePhase(9, [900, 700, 700, 700, 700, 1300, 1200, 900, 3000], on, 8);
  const lane2 = phase >= 7;
  return (
    <div ref={ref}>
      <Stage on={on} className="p-5 sm:p-8" label="Animation: a new client is won, fragmented delivery adds delay, revisions, missed tracking and poor communication, and the renewal fades. The same client then flows cleanly through the Madvert backend.">
        <div className="space-y-7">
          <div>
            <span className="wl-label wl-faint">Fragmented delivery</span>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="wl-node wl-lane-step px-3 py-2 text-[12px] font-semibold" data-on="true">New client won</span>
              {FRAG.map((f, i) => (
                <span key={f} data-on={phase > i ? "true" : "false"} className="wl-lane-step rounded-lg border border-[#ff9a9a]/35 bg-[#ff7a7a]/[0.07] px-3 py-2 text-[12px] text-[#ffc1c1]">
                  {f}
                </span>
              ))}
              <span data-fade={phase >= 5 ? "true" : "false"} className="wl-renewal wl-node px-3 py-2 text-[12px] font-semibold">Renewal</span>
            </div>
          </div>
          <div className="h-px bg-white/10" />
          <div className="wl-lane-step" data-on={lane2 ? "true" : "false"}>
            <span className="wl-label text-[#00e5ff]">Same client, Madvert backend</span>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="wl-node px-3 py-2 text-[12px] font-semibold">New client won</span>
              <span className="text-[#00e5ff]" aria-hidden="true">→</span>
              <span className="wl-node wl-node--strong px-3 py-2 text-[12px] font-semibold">Madvert backend</span>
              <span className="text-[#00e5ff]" aria-hidden="true">→</span>
              <span className="wl-node px-3 py-2 text-[12px] font-semibold">Clean, on-schedule delivery</span>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 16. Quality × Capacity ───────────── */
export function QualityCapacity() {
  const { ref, on } = useSeen<HTMLDivElement>();
  const dots = Array.from({ length: 14 }, (_, i) => ({ x: (i * 37) % 90, y: (i * 53) % 80, tx: `${((i * 13) % 30) - 15}px`, ty: `${((i * 17) % 24) - 12}px`, d: `${(i % 5) * 0.3}s` }));
  return (
    <div ref={ref}>
      <Stage on={on} className="grid grid-cols-1 md:grid-cols-3" label="Diagram: capacity without quality is chaos; quality without capacity is a bottleneck; quality times capacity gives scalable agency delivery.">
        <div className="border-b border-white/10 p-5 sm:p-7 md:border-b-0 md:border-r">
          <span className="wl-label wl-faint">Capacity without quality</span>
          <div className="wl-chaos-dots relative mt-4 h-[110px]" aria-hidden="true">
            {dots.map((d, i) => (
              <i key={i} style={v({ left: `${d.x}%`, top: `${d.y}%`, "--tx": d.tx, "--ty": d.ty, "--d": d.d })} />
            ))}
          </div>
          <p className="mt-3 font-display text-[16px] font-semibold">= Chaos</p>
        </div>
        <div className="border-b border-white/10 p-5 sm:p-7 md:border-b-0 md:border-r">
          <span className="wl-label wl-faint">Quality without capacity</span>
          <div className="wl-bottleneck relative mt-4 h-[110px]" aria-hidden="true">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path d="M0 4 L44 16 L56 16 L100 4 M0 36 L44 24 L56 24 L100 36" fill="none" stroke="rgb(255 255 255 / .2)" vectorEffect="non-scaling-stroke" />
            </svg>
            {[0, 0.6, 1.2, 1.8, 2.4, 3].map((d) => (
              <i key={d} style={v({ "--d": `${d}s` })} />
            ))}
          </div>
          <p className="mt-3 font-display text-[16px] font-semibold">= Bottleneck</p>
        </div>
        <div className="p-5 sm:p-7">
          <span className="wl-label text-[#00e5ff]">Quality × Capacity</span>
          <div className="relative mt-4 h-[110px]" aria-hidden="true">
            {[22, 50, 78].map((top) => (
              <div key={top} className="wl-flowline absolute inset-x-0 h-4" style={{ top: `${top}%`, transform: "translateY(-50%)" }}>
                <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,#00b4ff55,#00e5ff)]" />
                {[0, 0.8, 1.6].map((d) => (
                  <i key={d} style={v({ "--d": `${d + top / 100}s` })} />
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 font-display text-[16px] font-semibold">→ Scalable agency delivery</p>
        </div>
      </Stage>
    </div>
  );
}

/* ───────────── 17. Snap connector ───────────── */
export function SnapConnector() {
  const { ref, on } = useSeen<HTMLDivElement>(true, 0.6);
  return (
    <div ref={ref} className="wl-snap" data-on={on ? "true" : "false"} role="img" aria-label="Your agency snaps into the Madvert delivery engine and the system lights up.">
      <div className="flex flex-col items-center justify-center gap-0 sm:flex-row">
        <div className="wl-plug flex items-center">
          <div className="wl-node wl-node--strong px-5 py-4 text-center">
            <p className="font-display text-[15px] font-bold tracking-tight">YOUR AGENCY</p>
          </div>
          <span className="h-3 w-6 rounded-r-sm bg-[linear-gradient(90deg,#00b4ff,#00e5ff)]" aria-hidden="true" />
        </div>
        <div className="wl-glow-on wl-node rounded-2xl px-5 py-4 text-center sm:ml-1">
          <p className="font-display text-[15px] font-bold tracking-tight">MADVERT DELIVERY ENGINE</p>
          <p className="wl-label mt-1 flex items-center justify-center gap-2 text-[#00e5ff]">
            <span className="wl-dot" /> {on ? "Connected" : "Waiting"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── 19. Screen share welcome ───────────── */
const SHARE = [
  { t: "Campaigns", img: "/case-studies/texas-solar-2.webp", alt: "Campaign performance snapshot from a Texas solar lead generation project" },
  { t: "Case Studies", img: "/case-studies/dubai-real-estate-nigeria-cover.webp", alt: "Case study cover: Dubai real estate investor appointments" },
  { t: "Funnels", img: "/case-studies/dubai-interior-design-2.webp", alt: "Qualification funnel from lead to booked consultation for a Dubai interior design brand" },
  { t: "Systems", img: "/case-studies/bookkeeping-appointments-2.webp", alt: "The acquisition system built for a bookkeeping firm" },
];
export function ScreenShare() {
  const { ref, on } = useSeen<HTMLDivElement>();
  const i = usePhase(SHARE.length, 2600, on, 0);
  return (
    <div ref={ref} className="wl-stage overflow-hidden !rounded-2xl">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5">
        <span className="wl-label flex items-center gap-2 text-[#00e5ff]">
          <span className="wl-dot wl-dot--live" /> Screen share welcome
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 px-3 pt-3" role="tablist" aria-label="What we can walk through on the call">
        {SHARE.map((s, k) => (
          <span key={s.t} role="tab" aria-selected={k === i} data-on={k === i ? "true" : "false"} className="wl-share-tab wl-label rounded-full border border-white/12 px-3 py-1.5 !text-[10px] transition-colors">
            {s.t}
          </span>
        ))}
      </div>
      <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
        {SHARE.map((s, k) => (
          <Image key={s.t} src={s.img} alt={s.alt} fill sizes="(min-width:1024px) 420px, 90vw" className="object-cover object-top transition-opacity duration-700" style={{ opacity: k === i ? 1 : 0 }} />
        ))}
      </div>
    </div>
  );
}
