"use client";

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";
import { GoogleLogo, InstagramLogo, MetaLogo, SearchSignal, YouTubeLogo } from "@/components/visuals/brand-marks";
import { googleScreens, instagramScreens, metaScreens, seoScreens, youtubeScreens, type Screen } from "./StoryScreens";
import { useOnScreen, useReducedMotion } from "./InView";
import "@/styles/acquisition.css";

type Channel = {
  key: string;
  name: string;
  logo: ReactNode;
  intro: string;
  steps: { title: string; text: string }[];
  screens: Screen[];
};

const channels: Channel[] = [
  {
    key: "meta",
    name: "Meta",
    logo: <MetaLogo className="h-[14px] w-auto" uid="cs-tab-meta" />,
    intro: "Interrupt the scroll with a reason to care, then make the next step feel easy.",
    steps: [
      { title: "Ad creative", text: "A hook, an offer and a promise written for the buyer you actually want." },
      { title: "Feed placement", text: "The ad appears in the feed between the content people chose to see." },
      { title: "Lead interaction", text: "One tap opens a short form or a message, with a qualifying question built in." },
      { title: "Landing page", text: "The page continues the exact promise the ad made." },
      { title: "Lead capture", text: "The enquiry reaches your team with its source and answers attached." },
    ],
    screens: metaScreens,
  },
  {
    key: "google",
    name: "Google",
    logo: <GoogleLogo className="h-[18px] w-[18px]" />,
    intro: "Meet people at the moment they describe the problem in their own words.",
    steps: [
      { title: "Search query", text: "Someone types exactly what they need, often with where they need it." },
      { title: "Your ad in the results", text: "A relevant ad answers the query, with extensions that pre qualify the click." },
      { title: "Landing page", text: "A page built for that search intent, not your homepage." },
      { title: "Conversion", text: "A call, form or booking, tracked back to the keyword that started it." },
    ],
    screens: googleScreens,
  },
  {
    key: "youtube",
    name: "YouTube",
    logo: <YouTubeLogo className="h-[15px] w-auto" />,
    intro: "Earn attention in the first seconds, then give the interested viewer a clear way in.",
    steps: [
      { title: "Video ad", text: "The opening seconds carry the hook before the skip button appears." },
      { title: "Viewer", text: "The right audience keeps watching because the message is about them." },
      { title: "Call to action", text: "A single, specific next step sits on screen while interest is high." },
      { title: "Landing page", text: "The viewer lands on a page that picks up where the video left off." },
    ],
    screens: youtubeScreens,
  },
  {
    key: "instagram",
    name: "Instagram",
    logo: <InstagramLogo className="h-[18px] w-[18px]" uid="cs-tab-ig" />,
    intro: "Native creative for reels, stories and feed that feels like content until it asks for action.",
    steps: [
      { title: "Reel, story and feed creative", text: "One idea, adapted to each format instead of resized." },
      { title: "Click", text: "A link sticker or button turns attention into a visit." },
      { title: "Conversion", text: "A mobile first journey ends in a qualified enquiry, not a bounce." },
    ],
    screens: instagramScreens,
  },
  {
    key: "seo",
    name: "SEO",
    logo: <SearchSignal className="h-[18px] w-[18px]" />,
    intro: "Organic growth is compounding work: fix the foundations, then climb for the searches that matter.",
    steps: [
      { title: "Starting lower in results", text: "Your site exists, but buyers find competitors first." },
      { title: "Technical, content and authority", text: "Faster pages, clearer structure, content that answers buying questions and a stronger reputation." },
      { title: "Your result rises", text: "Visibility grows for the searches that bring buyers, not just traffic." },
      { title: "A qualified visitor arrives", text: "Someone searching with intent lands on the page built to answer them." },
    ],
    screens: seoScreens,
  },
];

const STEP_MS = 3200;

/** Tabbed channel stories: a step list (real text) beside a representative product style animation. */
export function ChannelStories() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const reduce = useReducedMotion();
  const { ref, on } = useOnScreen<HTMLDivElement>("0px");
  const ch = channels[active];
  const total = ch.steps.length;
  const playing = on && !reduce && !manual;
  const shown = reduce && !manual ? total - 1 : step;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % total), step === total - 1 ? STEP_MS + 1200 : STEP_MS);
    return () => clearTimeout(t);
  }, [playing, step, total]);

  const pick = (i: number) => {
    setActive(i);
    setStep(0);
    setManual(false);
  };

  return (
    <section className="acq-scope section" aria-labelledby="stories-title">
      <div className="container-x">
        <div className="max-w-[860px]">
          <p data-reveal className="t-eyebrow">
            How demand moves
          </p>
          <h2 id="stories-title" data-reveal className="t-h1 mt-5">
            Every Channel Has Its Own Buying Moment. <span className="t-grad">We Design the Path From It.</span>
          </h2>
        </div>

        <div className="acq-tabs mt-10 md:mt-12" role="tablist" aria-label="Acquisition channels">
          {channels.map((c, i) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              id={`${uid}-tab-${c.key}`}
              aria-selected={i === active}
              aria-controls={`${uid}-panel-${c.key}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const n = (i + (e.key === "ArrowRight" ? 1 : channels.length - 1)) % channels.length;
                pick(n);
                document.getElementById(`${uid}-tab-${channels[n].key}`)?.focus();
              }}
              className={`acq-tab ${i === active ? "is-active" : ""}`}
            >
              <span className="acq-tab-logo">{c.logo}</span>
              {c.name}
            </button>
          ))}
        </div>

        <div ref={ref} className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            {channels.map((c, ci) => (
              <div
                key={c.key}
                id={`${uid}-panel-${c.key}`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${c.key}`}
                hidden={ci !== active}
                className="acq-panel"
              >
                <p className="t-lead">{c.intro}</p>
                <ol className="acq-steps mt-6">
                  {c.steps.map((s, i) => {
                    const state = ci !== active ? "" : i === shown ? "is-current" : i < shown ? "is-done" : "";
                    return (
                      <li key={s.title}>
                        <button
                          type="button"
                          className={`acq-step ${state}`}
                          aria-current={ci === active && i === shown ? "step" : undefined}
                          onClick={() => {
                            setStep(i);
                            setManual(true);
                          }}
                        >
                          <span className="acq-step-num" aria-hidden="true">
                            {i + 1}
                          </span>
                          <span className="min-w-0">
                            <span className="acq-step-title">{s.title}</span>
                            <span className="acq-step-text">
                              <span className="acq-step-text-in">{s.text}</span>
                            </span>
                          </span>
                          {state === "is-current" && playing ? (
                            <span key={`${active}-${step}`} className="acq-step-progress" style={{ "--dur": `${STEP_MS}ms` } as CSSProperties} aria-hidden="true" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>

          <div className="-order-1 lg:order-none lg:col-span-7">
            <div className={`acq-stage acq-stage--${ch.key} ${playing ? "" : "is-still"}`} aria-hidden="true">
              <div className="acq-stage-head">
                <span className="acq-stage-logo">{ch.logo}</span>
                <span className="acq-stage-step">{ch.steps[shown].title}</span>
                <span className="acq-stage-dots">
                  {ch.steps.map((_, i) => (
                    <i key={i} className={i === shown ? "is-on" : i < shown ? "is-done" : ""} />
                  ))}
                </span>
              </div>
              <div className="acq-stage-floor">
                {ch.screens.map((s, i) => {
                  const rel = i - shown;
                  const pos = rel === 0 ? "is-current" : rel === -1 ? "is-prev" : rel === 1 ? "is-next" : rel < 0 ? "is-gone-l" : "is-gone-r";
                  return (
                    <div key={`${ch.key}-${i}`} className={`acq-screen acq-screen--${s.kind} ${pos}`}>
                      {s.node}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
