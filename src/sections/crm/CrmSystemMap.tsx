import type { CSSProperties, ReactNode } from "react";
import { GoogleLogo, MetaLogo } from "@/components/visuals/brand-marks";
import { InView } from "@/sections/acquisition/InView";
import "@/styles/crm.css";

const B = ({ w, s = false }: { w: string; s?: boolean }) => <i className={`crm-bar ${s ? "crm-bar--s" : ""}`} style={{ width: w }} />;

function Tick() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const channelIcon: Record<string, ReactNode> = {
  WhatsApp: (
    <svg viewBox="0 0 24 24">
      <path fill="#25D366" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
      <path fill="#fff" d="M9.1 7.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1-1.1 2.6 1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7 2.6 1 3.2.8 3.7.8.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4l-2.1-1c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.4.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  SMS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z" />
      <path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  Notifications: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  ),
};

const clusters: { title: string; side: "l" | "r"; items: string[]; ui: ReactNode }[] = [
  {
    title: "Capture and route",
    side: "l",
    items: ["Lead pipelines", "Lead routing", "Source tracking"],
    ui: (
      <div className="crm-route">
        {[
          { logo: <MetaLogo className="h-2.5 w-auto" uid="crm-meta" />, owner: "#00b4ff" },
          { logo: <GoogleLogo className="h-3 w-3" />, owner: "#a78bfa" },
          {
            logo: (
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4.5" width="18" height="15" rx="3" />
                <path d="M3 9h18" />
              </svg>
            ),
            owner: "#34d399",
          },
        ].map((r, i) => (
          <span key={i} className="crm-route-row" style={{ "--i": i } as CSSProperties}>
            <span className="crm-logo">{r.logo}</span>
            <B w="44%" s />
            <span className="crm-route-line">
              <i />
            </span>
            <span className="crm-owner" style={{ background: r.owner }} />
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Qualify and book",
    side: "l",
    items: ["Qualification", "AI assisted qualification", "Appointment booking"],
    ui: (
      <div className="crm-qual">
        <span className="crm-bubble">
          <span className="crm-spark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3c.7 4.3 2.7 6.3 7 7-4.3.7-6.3 2.7-7 7-.7-4.3-2.7-6.3-7-7 4.3-.7 6.3-2.7 7-7Z" fill="currentColor" />
            </svg>
          </span>
          When are you hoping to start?
        </span>
        <span className="crm-bubble crm-bubble--me">This month</span>
        <span className="crm-slots">
          <i />
          <i className="is-on" />
          <i />
          <i />
        </span>
      </div>
    ),
  },
  {
    title: "Follow up on every channel",
    side: "r",
    items: ["WhatsApp", "Email", "SMS", "Notifications"],
    ui: (
      <div className="crm-follow">
        {["WhatsApp", "Email", "SMS", "Notifications"].map((c, i) => (
          <span key={c} className="crm-follow-row" style={{ "--i": i } as CSSProperties}>
            <span className="crm-ch">{channelIcon[c]}</span>
            <B w={`${62 - i * 8}%`} />
            <span className="crm-sent">
              <Tick />
            </span>
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Sell and measure",
    side: "r",
    items: ["Sales stages", "Attribution dashboards", "Customer records"],
    ui: (
      <div className="crm-measure">
        <span className="crm-stages">
          {["New", "Qualified", "Booked", "Won"].map((s, i) => (
            <span key={s} className={i === 3 ? "is-won" : ""} style={{ "--i": i } as CSSProperties}>
              {s}
            </span>
          ))}
        </span>
        <span className="crm-chart">
          {[46, 70, 38, 88, 60, 78].map((h, i) => (
            <i key={i} style={{ height: `${h}%`, "--i": i } as CSSProperties} />
          ))}
        </span>
      </div>
    ),
  },
];

const platforms = ["GoHighLevel", "HubSpot", "Salesforce", "Zoho", "Pipedrive"];
const custom = ["Custom CRM modules", "Custom dashboards", "Lead management systems", "Customer portals", "Sales pipelines", "Internal tools"];

function Cluster({ c }: { c: (typeof clusters)[number] }) {
  return (
    <div className={`crm-cluster crm-cluster--${c.side}`}>
      <span className="crm-stub" aria-hidden="true">
        <i />
      </span>
      <h3 className="crm-cluster-title">{c.title}</h3>
      <div className="crm-ui" aria-hidden="true">
        {c.ui}
      </div>
      <ul className="crm-items">
        {c.items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

/** What Madvert can build and configure around a CRM: a system map with one customer record at its centre. */
export function CrmSystemMap() {
  const left = clusters.filter((c) => c.side === "l");
  const right = clusters.filter((c) => c.side === "r");
  return (
    <section id="crm-system" className="section-tight" aria-labelledby="crm-system-title">
      <div className="container-x">
        <div className="max-w-[860px]">
          <p data-reveal className="t-eyebrow">
            CRM systems
          </p>
          <h2 id="crm-system-title" data-reveal className="t-h2 mt-5">
            What We Can Build and Configure <span className="t-grad">Around Your CRM.</span>
          </h2>
          <p data-reveal className="t-lead mt-5 max-w-[640px]">
            One record for every customer, with everything that should happen next already connected to it.
          </p>
        </div>

        <InView decorative={false} className="crm-map mt-12">
          <div className="crm-side">
            {left.map((c) => (
              <Cluster key={c.title} c={c} />
            ))}
          </div>

          <div className="crm-core-wrap">
            <div className="crm-core" aria-hidden="true">
              <div className="crm-core-head">
                <span className="crm-core-avatar" />
                <span className="grid flex-1 gap-1.5">
                  <span className="crm-core-name">Customer record</span>
                  <B w="58%" />
                </span>
                <span className="crm-pill crm-pill--ok">Booked</span>
              </div>
              <dl className="crm-core-rows">
                {[
                  ["Source", "Google Search"],
                  ["Stage", "Consultation booked"],
                  ["Owner", "Sales team"],
                  ["Next action", "Call on Thursday"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <ol className="crm-timeline">
                {["Form submitted", "Qualified", "WhatsApp reply", "Call booked"].map((t, i) => (
                  <li key={t} style={{ "--i": i } as CSSProperties}>
                    <i />
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <p className="crm-core-caption">Illustrative record. Every module above writes to it.</p>
          </div>

          <div className="crm-side">
            {right.map((c) => (
              <Cluster key={c.title} c={c} />
            ))}
          </div>
        </InView>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div data-reveal className="crm-panel">
            <p className="t-label">Platforms we configure and integrate</p>
            <p className="crm-panel-text">
              We set up and connect established CRM platforms where they fit your sales process. The software is theirs; the configuration is built around how your team sells.
            </p>
            <ul className="crm-chips">
              {platforms.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: 80 }} className="crm-panel crm-panel--custom">
            <p className="t-label">Custom builds when off the shelf stops fitting</p>
            <p className="crm-panel-text">When a platform cannot do what your process needs, we design and build the missing piece around it.</p>
            <ul className="crm-chips crm-chips--custom">
              {custom.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
