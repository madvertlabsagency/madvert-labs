import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Glyph, type IconName } from "@/components/ui/Icon3D";
import { Eyebrow } from "@/components/ui/Section";
import type { CaseStudy } from "@/types/content";
import { Live } from "./Live";

/** The strongest points from the former homepage "One Growth Partner. Fewer Excuses." section. */
const points: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "strategy",
    title: "Advanced Marketers. Not Template Operators.",
    body: "Every market has different customers, economics and friction. We do the thinking before we do the clicking.",
  },
  {
    icon: "growth",
    title: "Growth Partner. Not a Single Service Vendor.",
    body: "When the problem moves beyond the original scope, we do not look away. We follow the bottleneck.",
  },
  {
    icon: "systems",
    title: "One Team Across the Whole Journey.",
    body: "Branding, acquisition, search, creative, automation, technology and data. One strategic direction.",
  },
  {
    icon: "development",
    title: "Expertise With Real Execution Behind It.",
    body: "Knowing a platform is the easy part. What gets built, launched and improved afterwards is what clients pay for.",
  },
  {
    icon: "crm",
    title: "Qualified Opportunities Over Cheap Leads.",
    body: "A lower CPL means very little if your sales team hates the leads. We optimise for business quality, not dashboard applause.",
  },
  {
    icon: "aiSearch",
    title: "Built for What Is Next.",
    body: "Search changes. Platforms change. AI changes customer behaviour. We keep testing and adopting what is proven, so you are not running yesterday's playbook.",
  },
];

export function BuiltForNow({ studies, industryCount, resourceCount }: { studies: CaseStudy[]; industryCount: number; resourceCount: number }) {
  const deck = studies.filter((s) => s.cover).slice(0, 3);
  return (
    <section className="section relative" aria-labelledby="now-title">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow>Why Madvert Labs</Eyebrow>
            </div>
            <h2 id="now-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
              Built for How Growth <span className="t-grad">Works Now.</span>
            </h2>
          </div>
          <p data-reveal className="t-lead lg:col-span-5 lg:pb-2">
            One growth partner, fewer excuses. Here is what that means in practice, and the published work behind it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <ol className="ab-points lg:col-span-7">
            {points.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--reveal-delay" as string]: (i % 2) * 80 }} className="ab-point">
                <span className="ab-point-ic" aria-hidden="true">
                  <Glyph name={p.icon} size={28} />
                </span>
                <span className="ab-point-n" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="ab-point-t">{p.title}</h3>
                <p className="ab-point-b">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-5">
            <div className="ab-proof lg:sticky lg:top-[calc(var(--header-h)+40px)]">
              {deck.length ? (
                <Live className="ab-deck" aria-hidden>
                  {deck.map((s, i) => (
                    <div key={s.slug} className="ab-deck-card" style={{ ["--i" as string]: i, ["--n" as string]: deck.length }}>
                      <Image src={s.cover!.url} alt="" fill sizes="(min-width:1024px) 220px, 42vw" className="object-cover object-top" />
                    </div>
                  ))}
                  <span className="ab-deck-shadow" />
                </Live>
              ) : null}
              <dl className="ab-stats" data-reveal>
                <div>
                  <dt>Published case studies</dt>
                  <dd>{studies.length}</dd>
                </div>
                <div>
                  <dt>Industries in those studies</dt>
                  <dd>{industryCount}</dd>
                </div>
                <div>
                  <dt>Free playbooks and audits</dt>
                  <dd>{resourceCount}</dd>
                </div>
              </dl>
              <div data-reveal className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
                <Link href="/case-studies" className="group/btn inline-flex min-h-11 items-center gap-2 font-medium text-accent-text">
                  Read the case studies <Arrow />
                </Link>
                <Link href="/resources" className="group/btn inline-flex min-h-11 items-center gap-2 font-medium text-accent-text">
                  Open the Madvert Vault <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
