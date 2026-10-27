import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { clustersFor, topicLinksFor, type TopicPage } from "@/content/topic-map";

const ROLE: Record<TopicPage["role"], string> = {
  primary: "Service",
  definition: "Definition",
  article: "Guide",
  comparison: "Comparison",
  proof: "Case study",
  resource: "Free resource",
  tool: "Tool",
  location: "Location",
  industry: "Industry",
};

const CARD = "group/btn flex h-full flex-col rounded-2xl border border-line bg-glass p-5 transition-colors hover:border-line-strong";

function Card({ link }: { link: TopicPage }) {
  return (
    <>
      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3">{ROLE[link.role]}</span>
      <span className="mt-1.5 inline-flex items-center gap-2 font-display text-[16px] font-semibold text-ink">
        {link.anchor} <Arrow />
      </span>
    </>
  );
}

/**
 * Contextual links to the other pages of the same topic cluster (src/content/topic-map.ts):
 * the service, its definitions, guides, proof and resources, with descriptive anchors.
 * Server-rendered plain links; renders nothing for pages outside every cluster.
 */
export function TopicLinks({ path, limit = 6, title }: { path: string; limit?: number; title?: string }) {
  const links = topicLinksFor(path, limit);
  if (!links.length) return null;
  const cluster = clustersFor(path)[0];
  return (
    <section className="section-tight !py-[clamp(32px,4vw,56px)]" aria-labelledby="topic-links-title">
      <div className="container-x">
        <div className="hairline mb-10" />
        <p className="t-label">Keep exploring</p>
        <h2 id="topic-links-title" className="t-h3 mt-3 max-w-[820px]">
          {title ?? `More on ${cluster.name.charAt(0).toLowerCase()}${cluster.name.slice(1)}`}
        </h2>
        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              {/* /custom-patches is a separate static document, so it gets a plain anchor. */}
              {l.href === "/custom-patches" ? (
                <a href={l.href} className={CARD}>
                  <Card link={l} />
                </a>
              ) : (
                <Link href={l.href} className={CARD}>
                  <Card link={l} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
