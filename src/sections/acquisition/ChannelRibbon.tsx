import { ChannelLogo, type ChannelKey } from "@/components/visuals/brand-marks";
import "@/styles/acquisition.css";

const channels: { key: ChannelKey; name: string; kind: string }[] = [
  { key: "meta", name: "Meta", kind: "Paid social" },
  { key: "google", name: "Google Search", kind: "Search ads and SEO" },
  { key: "instagram", name: "Instagram", kind: "Reels, stories, feed" },
  { key: "youtube", name: "YouTube", kind: "Video ads" },
  { key: "facebook", name: "Facebook", kind: "Feed and lead ads" },
  { key: "maps", name: "Google Maps", kind: "Local search" },
  { key: "search", name: "AI answers", kind: "AEO and AI search" },
];

function List({ copy }: { copy: number }) {
  return (
    <ul className="acq-ribbon-list" aria-hidden={copy > 0 ? "true" : undefined}>
      {channels.map((c) => (
        <li key={c.key} className="acq-ribbon-item">
          <span className="acq-ribbon-badge" aria-hidden="true">
            <ChannelLogo channel={c.key} uid={`rb${copy}-${c.key}`} className="acq-ribbon-logo" />
          </span>
          <span>
            <span className="acq-ribbon-name">{c.name}</span>
            <span className="acq-ribbon-kind">{c.kind}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Large platform ticker near the top of the page. Pauses on hover; static and wrapped for reduced motion. */
export function ChannelRibbon() {
  return (
    <section className="acq-ribbon relative py-10 md:py-14" aria-labelledby="channels-title">
      <div className="container-x">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="channels-title" data-reveal className="t-h3 max-w-[620px]">
            Every Major Demand Channel. <span className="t-grad">One Acquisition System.</span>
          </h2>
          <p data-reveal className="max-w-[420px] text-[15px] text-ink-3">
            Paid, organic, local and AI search, planned together and judged by the leads your team actually wants.
          </p>
        </div>
      </div>
      <div className="acq-ribbon-viewport mt-8 py-4">
        <div className="acq-ribbon-track">
          <List copy={0} />
          <List copy={1} />
        </div>
      </div>
    </section>
  );
}
