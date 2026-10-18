import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Icon3D, type IconName } from "@/components/ui/Icon3D";
import { Eyebrow } from "@/components/ui/Section";
import { getServiceEntity, type ServiceKey } from "@/lib/entities";

/** What Madvert Labs builds. Names, paths and definitions come from the service entities. */
const rows: { key: ServiceKey; icon: IconName; builds: string; subs: ServiceKey[] }[] = [
  { key: "branding-marketing", icon: "branding", builds: "Identity, messaging, content", subs: ["social-media-management"] },
  { key: "client-acquisition", icon: "acquisition", builds: "Paid social, paid search, SEO", subs: ["meta-ads", "google-ads", "seo", "ai-seo-aeo"] },
  { key: "conversion", icon: "conversion", builds: "Websites, landing pages, offers", subs: ["web-development"] },
  { key: "studios", icon: "studios", builds: "Ad creative, video, motion", subs: [] },
  { key: "automation-revenue-systems", icon: "automation", builds: "CRM, pipelines, follow up", subs: ["ai-agents"] },
  { key: "tech-product-development", icon: "development", builds: "Custom tools, dashboards, apps", subs: ["app-development"] },
];

export function Capabilities() {
  const gs = getServiceEntity("growth-systems");
  const dm = getServiceEntity("digital-marketing");
  return (
    <section className="section-tight relative" aria-labelledby="build-title">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow>Real Execution</Eyebrow>
            </div>
            <h2 id="build-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
              What We Actually <span className="t-grad">Build.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p data-reveal className="t-lead">
              Strategy decks are easy. These are the parts of a{" "}
              <Link href={gs.path} className="font-medium text-accent-text underline-offset-4 hover:underline">
                growth system
              </Link>{" "}
              we design, ship and run ourselves.
            </p>
          </div>
        </div>

        <ol className="ab-build mt-12 lg:mt-16">
          {rows.map((r, i) => {
            const s = getServiceEntity(r.key);
            return (
              <li key={r.key} data-reveal style={{ ["--reveal-delay" as string]: (i % 3) * 60 }} className="ab-build-row">
                <Icon3D name={r.icon} size="sm" className="ab-build-ic" />
                <div className="ab-build-main">
                  <h3>
                    <Link href={s.path} className="ab-build-link group/btn">
                      {s.name} <Arrow />
                    </Link>
                  </h3>
                  <p className="ab-build-what">{r.builds}</p>
                </div>
                <p className="ab-build-def">{s.definition}</p>
                {r.subs.length ? (
                  <ul className="ab-build-subs" aria-label={`${s.name} services`}>
                    {r.subs.map((k) => {
                      const sub = getServiceEntity(k);
                      return (
                        <li key={k}>
                          <Link href={sub.path} className="ab-sub">
                            {sub.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span className="hidden lg:block" />
                )}
              </li>
            );
          })}
        </ol>

        <div data-reveal className="ab-build-all">
          <p className="text-[16px] text-ink-2">
            Want all of it run as one team? <span className="text-ink">That is {dm.name}.</span>
          </p>
          <Link href={dm.path} className="group/btn inline-flex min-h-11 items-center gap-2 font-display text-[15px] font-semibold text-accent-text">
            See how the department works <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
