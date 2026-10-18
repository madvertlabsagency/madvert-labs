import type { ReactNode } from "react";
import { FacebookLogo, GoogleLogo, InstagramLogo, MetaLogo, YouTubeLogo } from "@/components/visuals/brand-marks";

/**
 * Representative platform UIs for the channel stories. Illustrative only: no real accounts,
 * no metrics. Animations live in acquisition.css and run only on the current screen.
 */

export type ScreenKind = "phone" | "browser" | "card" | "wide";

export type Screen = { kind: ScreenKind; node: ReactNode };

/* ───────── shared pieces ───────── */

function Bar({ w, strong = false, className = "" }: { w: string; strong?: boolean; className?: string }) {
  return <i className={`acq-bar ${strong ? "acq-bar--strong" : ""} ${className}`} style={{ width: w }} />;
}

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="acq-browser">
      <div className="acq-browser-top">
        <span className="acq-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="acq-url">{url}</span>
      </div>
      <div className="acq-browser-body">{children}</div>
    </div>
  );
}

function Landing({ tag }: { tag: string }) {
  return (
    <Browser url="yourbusiness.com/consultation">
      <div className="acq-landing">
        <div className="acq-landing-copy">
          <span className="acq-tag">{tag}</span>
          <p className="acq-landing-h">A clear promise for the person who clicked.</p>
          <Bar w="88%" />
          <Bar w="70%" />
          <div className="acq-proof">
            <span className="acq-stars" aria-hidden="true">
              ★★★★★
            </span>
            <Bar w="46%" />
          </div>
        </div>
        <div className="acq-mini-form acq-anim-rise">
          <p className="acq-mini-form-h">Book your consultation</p>
          <span className="acq-field acq-field--filled">
            <Bar w="56%" strong />
          </span>
          <span className="acq-field acq-field--filled">
            <Bar w="44%" strong />
          </span>
          <span className="acq-field">
            <Bar w="30%" />
          </span>
          <span className="acq-btn acq-btn--accent">Continue</span>
        </div>
      </div>
    </Browser>
  );
}

function LeadCaptured({ source, logo }: { source: string; logo: ReactNode }) {
  return (
    <div className="acq-lead">
      <div className="acq-lead-head">
        <span className="acq-check acq-anim-pop" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="acq-lead-title">New enquiry received</p>
          <p className="acq-lead-sub">Sent to your sales team</p>
        </div>
      </div>
      <dl className="acq-lead-rows">
        <div>
          <dt>Source</dt>
          <dd className="flex items-center gap-1.5">
            <span className="acq-lead-logo">{logo}</span>
            {source}
          </dd>
        </div>
        <div>
          <dt>Requirement</dt>
          <dd>Matches your service</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Inside service area</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <span className="acq-pill acq-pill--ok acq-anim-fade">Qualified</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Cursor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`acq-cursor ${className}`} aria-hidden="true">
      <path d="M4 2.5v13.2l3.6-3.3 2.3 5.1 2.4-1.1-2.3-5h4.9Z" fill="#fff" stroke="#0a1020" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function Tap({ className = "" }: { className?: string }) {
  return <span className={`acq-tap ${className}`} aria-hidden="true" />;
}

function Avatar({ c = "#0866FF" }: { c?: string }) {
  return <span className="acq-avatar" style={{ background: c }} />;
}

function Creative({ tone = "meta", children }: { tone?: "meta" | "ig" | "yt"; children?: ReactNode }) {
  return (
    <div className={`acq-creative acq-creative--${tone}`}>
      <span className="acq-creative-sun" />
      <span className="acq-creative-hill" />
      {children}
    </div>
  );
}

function Post({ sponsored = false, children }: { sponsored?: boolean; children?: ReactNode }) {
  return (
    <div className={`acq-post ${sponsored ? "acq-post--ad" : ""}`}>
      <div className="acq-post-head">
        <Avatar c={sponsored ? "#0866FF" : "var(--acq-sk-2)"} />
        <span className="grid gap-1">
          {sponsored ? <span className="acq-post-name">Your Business</span> : <Bar w="58px" strong />}
          {sponsored ? <span className="acq-post-meta">Sponsored</span> : <Bar w="34px" />}
        </span>
      </div>
      {sponsored ? (
        <Creative>{children}</Creative>
      ) : (
        <div className="acq-post-img" />
      )}
      {sponsored ? (
        <div className="acq-post-cta">
          <span className="grid gap-1">
            <span className="acq-post-cta-h">Free consultation this week</span>
            <Bar w="70px" />
          </span>
          <span className="acq-btn acq-btn--meta">Learn more</span>
        </div>
      ) : null}
    </div>
  );
}

/* ───────── META ───────── */

export const metaScreens: Screen[] = [
  {
    kind: "card",
    node: (
      <div className="acq-builder">
        <div className="acq-builder-head">
          <MetaLogo className="h-4 w-auto" uid="st-meta-b" />
          <span>Ad creative</span>
          <span className="acq-pill">Draft</span>
        </div>
        <div className="acq-builder-body">
          <Creative>
            <span className="acq-creative-copy acq-anim-rise">
              <b>Stop guessing.</b>
              <i />
            </span>
          </Creative>
          <div className="acq-builder-fields">
            <span className="acq-label">Primary text</span>
            <span className="acq-field acq-field--filled acq-type">
              <Bar w="84%" strong />
            </span>
            <span className="acq-label">Headline</span>
            <span className="acq-field acq-field--filled">
              <span className="acq-field-text">Free consultation this week</span>
            </span>
            <span className="acq-label">Call to action</span>
            <span className="acq-btn acq-btn--meta acq-anim-pop">Learn more</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    kind: "phone",
    node: (
      <div className="acq-phone">
        <div className="acq-phone-bar">
          <FacebookLogo className="h-4 w-4" uid="st-fb-feed" />
          <Bar w="40%" strong />
        </div>
        <div className="acq-feed acq-anim-scroll">
          <Post />
          <Post sponsored />
          <Post />
        </div>
      </div>
    ),
  },
  {
    kind: "phone",
    node: (
      <div className="acq-phone">
        <div className="acq-phone-bar">
          <FacebookLogo className="h-4 w-4" uid="st-fb-tap" />
          <Bar w="40%" strong />
        </div>
        <div className="acq-feed">
          <Post sponsored />
        </div>
        <Tap className="acq-tap--cta" />
        <div className="acq-sheet acq-anim-sheet">
          <span className="acq-sheet-grip" />
          <p className="acq-sheet-h">Request a call back</p>
          <span className="acq-field acq-field--filled">
            <Bar w="52%" strong />
          </span>
          <span className="acq-chips">
            <span className="acq-chip-opt is-on">This month</span>
            <span className="acq-chip-opt">Later</span>
          </span>
          <span className="acq-btn acq-btn--meta">Next</span>
        </div>
      </div>
    ),
  },
  { kind: "browser", node: <Landing tag="From your Meta ad" /> },
  { kind: "card", node: <LeadCaptured source="Meta, feed placement" logo={<MetaLogo className="h-2.5 w-auto" uid="st-meta-l" />} /> },
];

/* ───────── GOOGLE ───────── */

function Serp({ query, children }: { query: string; children: ReactNode }) {
  return (
    <Browser url="google.com/search">
      <div className="acq-serp">
        <div className="acq-searchbox">
          <GoogleLogo className="h-4 w-4 flex-none" />
          <span className="acq-searchbox-q">{query}</span>
        </div>
        {children}
      </div>
    </Browser>
  );
}

function Result({ ad = false, you = false, label, title = "Commercial cleaning, booked this week" }: { ad?: boolean; you?: boolean; label?: string; title?: string }) {
  return (
    <div className={`acq-result ${you ? "acq-result--you" : ""}`}>
      <span className="acq-result-site">
        <span className="acq-favicon" style={you ? { background: "var(--accent)" } : undefined} />
        {ad ? <b className="acq-sponsored">Sponsored</b> : null}
        {label ? <span className="acq-result-domain">{label}</span> : <Bar w="64px" />}
      </span>
      {you ? <span className="acq-result-title">{title}</span> : <Bar w="72%" className="acq-bar--link" />}
      <Bar w="92%" />
      {ad ? (
        <span className="acq-sitelinks">
          <span>Get a quote</span>
          <span>Services</span>
          <span>Reviews</span>
        </span>
      ) : null}
    </div>
  );
}

export const googleScreens: Screen[] = [
  {
    kind: "browser",
    node: (
      <Browser url="google.com">
        <div className="acq-google-home">
          <span className="acq-google-word" aria-hidden="true">
            <b style={{ color: "#4285F4" }}>G</b>
            <b style={{ color: "#EA4335" }}>o</b>
            <b style={{ color: "#FBBC05" }}>o</b>
            <b style={{ color: "#4285F4" }}>g</b>
            <b style={{ color: "#34A853" }}>l</b>
            <b style={{ color: "#EA4335" }}>e</b>
          </span>
          <div className="acq-searchbox acq-searchbox--big">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-none text-ink-3" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="m10.5 10.5 3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="acq-typed">commercial cleaning company near me</span>
          </div>
        </div>
      </Browser>
    ),
  },
  {
    kind: "browser",
    node: (
      <Serp query="commercial cleaning company near me">
        <div className="acq-anim-rise">
          <Result ad you label="yourbusiness.com" />
        </div>
        <Result />
        <Result />
        <Cursor className="acq-cursor--ad" />
      </Serp>
    ),
  },
  { kind: "browser", node: <Landing tag="From your search ad" /> },
  {
    kind: "card",
    node: (
      <div className="acq-booked">
        <div className="acq-booked-head">
          <span className="acq-check acq-anim-pop" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="acq-lead-title">Site visit booked</p>
            <p className="acq-lead-sub">Confirmation sent by email and WhatsApp</p>
          </div>
        </div>
        <div className="acq-cal">
          {["M", "T", "W", "T", "F"].map((d, i) => (
            <span key={i} className="acq-cal-day">
              <b>{d}</b>
              <i className={i === 3 ? "is-on acq-anim-pop" : ""} />
            </span>
          ))}
        </div>
        <div className="acq-lead-rows acq-lead-rows--inline">
          <span className="acq-pill">
            <GoogleLogo className="h-3 w-3" /> Google Search
          </span>
          <span className="acq-pill acq-pill--ok acq-anim-fade">Qualified</span>
        </div>
      </div>
    ),
  },
];

/* ───────── YOUTUBE ───────── */

function Player({ children, progress = "acq-anim-progress" }: { children?: ReactNode; progress?: string }) {
  return (
    <div className="acq-player">
      <Creative tone="yt" />
      <span className="acq-player-play">
        <YouTubeLogo className="h-7 w-auto" />
      </span>
      <span className="acq-player-ad">Sponsored</span>
      <span className="acq-player-skip">Skip</span>
      <span className="acq-player-track">
        <i className={progress} />
      </span>
      {children}
    </div>
  );
}

export const youtubeScreens: Screen[] = [
  {
    kind: "wide",
    node: (
      <div className="acq-yt">
        <Player />
        <div className="acq-yt-meta">
          <Avatar c="#FF0000" />
          <span className="grid flex-1 gap-1.5">
            <span className="acq-post-name">Your Business</span>
            <Bar w="40%" />
          </span>
          <span className="acq-btn acq-btn--light">Visit site</span>
        </div>
      </div>
    ),
  },
  {
    kind: "wide",
    node: (
      <div className="acq-yt acq-yt--watch">
        <Player />
        <div className="acq-viewer">
          <span className="acq-viewer-face">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="9" r="4" fill="currentColor" />
              <path d="M4.5 21c.8-4 3.8-6.2 7.5-6.2s6.7 2.2 7.5 6.2Z" fill="currentColor" />
            </svg>
          </span>
          <span className="grid gap-1">
            <span className="acq-post-name">Watching past the skip</span>
            <span className="acq-post-meta">The message lands before the button appears</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    kind: "wide",
    node: (
      <div className="acq-yt">
        <Player progress="acq-yt-done">
          <div className="acq-yt-cta acq-anim-rise">
            <Avatar c="#FF0000" />
            <span className="grid flex-1 gap-1">
              <span className="acq-post-name">Book a free assessment</span>
              <span className="acq-post-meta">yourbusiness.com</span>
            </span>
            <span className="acq-btn acq-btn--yt">Book now</span>
            <Tap className="acq-tap--yt" />
          </div>
        </Player>
      </div>
    ),
  },
  { kind: "browser", node: <Landing tag="From your YouTube ad" /> },
];

/* ───────── INSTAGRAM ───────── */

export const instagramScreens: Screen[] = [
  {
    kind: "wide",
    node: (
      <div className="acq-ig-formats">
        {[
          { k: "Reel", cls: "acq-ig-reel" },
          { k: "Story", cls: "acq-ig-story" },
          { k: "Feed", cls: "acq-ig-feed" },
        ].map((f, i) => (
          <div key={f.k} className={`acq-ig-format ${f.cls}`} style={{ ["--i" as string]: i }}>
            <div className="acq-ig-shot acq-anim-rise">
              <Creative tone="ig" />
              {f.k === "Story" ? (
                <span className="acq-ig-bars">
                  <i />
                  <i />
                  <i />
                </span>
              ) : null}
              {f.k === "Reel" ? (
                <span className="acq-ig-reel-icons">
                  <i />
                  <i />
                  <i />
                </span>
              ) : null}
            </div>
            <span className="acq-ig-label">{f.k}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    kind: "phone",
    node: (
      <div className="acq-phone acq-phone--story">
        <Creative tone="ig">
          <span className="acq-ig-bars acq-ig-bars--top">
            <i />
            <i className="acq-anim-progress" />
            <i />
          </span>
          <span className="acq-story-head">
            <InstagramLogo className="h-4 w-4" uid="st-ig-head" />
            <span>yourbusiness</span>
            <span className="acq-post-meta !text-white/80">Sponsored</span>
          </span>
          <span className="acq-story-copy">Your space, cleaned before Monday.</span>
          <span className="acq-story-link">
            Learn more
            <Tap className="acq-tap--story" />
          </span>
        </Creative>
      </div>
    ),
  },
  { kind: "card", node: <LeadCaptured source="Instagram, story" logo={<InstagramLogo className="h-2.5 w-2.5" uid="st-ig-l" />} /> },
];

/* ───────── SEO ───────── */

function OrganicList({ climb = false }: { climb?: boolean }) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <div className={`acq-organic ${climb ? "acq-organic--climb" : ""}`}>
      {rows.map((r) => (
        <div key={r} className={`acq-organic-row ${r === 0 ? "acq-organic-row--you" : ""}`} style={{ ["--r" as string]: r }}>
          {r === 0 ? <Result you label="yourbusiness.com" title="Office cleaning services for busy workplaces" /> : <Result />}
        </div>
      ))}
    </div>
  );
}

export const seoScreens: Screen[] = [
  {
    kind: "browser",
    node: (
      <Serp query="office cleaning services">
        <OrganicList />
      </Serp>
    ),
  },
  {
    kind: "card",
    node: (
      <div className="acq-seo-fix">
        <p className="acq-lead-title">Search foundations</p>
        {[
          { k: "Technical", d: "Speed, structure, indexing" },
          { k: "Content", d: "Pages that answer real buying questions" },
          { k: "Authority", d: "Reviews, mentions and links" },
        ].map((x, i) => (
          <div key={x.k} className="acq-seo-row" style={{ ["--i" as string]: i }}>
            <span className="acq-check acq-check--sm acq-anim-pop" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="grid gap-0.5">
              <b>{x.k}</b>
              <span className="acq-post-meta">{x.d}</span>
            </span>
            <span className="acq-seo-meter">
              <i />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    kind: "browser",
    node: (
      <Serp query="office cleaning services">
        <OrganicList climb />
      </Serp>
    ),
  },
  {
    kind: "browser",
    node: (
      <Browser url="yourbusiness.com/office-cleaning">
        <div className="acq-landing">
          <div className="acq-landing-copy">
            <span className="acq-tag acq-tag--ok">Organic visitor</span>
            <p className="acq-landing-h">Office cleaning for businesses that cannot close.</p>
            <Bar w="86%" />
            <Bar w="64%" />
            <span className="acq-btn acq-btn--accent mt-1 w-fit">Get a quote</span>
          </div>
          <div className="acq-visitor acq-anim-rise">
            <span className="acq-viewer-face">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="9" r="4" fill="currentColor" />
                <path d="M4.5 21c.8-4 3.8-6.2 7.5-6.2s6.7 2.2 7.5 6.2Z" fill="currentColor" />
              </svg>
            </span>
            <span className="acq-post-name">Searching with intent</span>
            <span className="acq-post-meta">Arrives already looking for you</span>
          </div>
          <Cursor className="acq-cursor--quote" />
        </div>
      </Browser>
    ),
  },
];
