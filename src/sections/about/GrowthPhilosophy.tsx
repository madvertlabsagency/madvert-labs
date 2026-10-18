import { Eyebrow } from "@/components/ui/Section";
import { Live } from "./Live";

const stages = ["Attention", "Demand", "Conversion", "Follow Up", "Sales", "Revenue"];
/** The stage the illustration flags. Purely illustrative, not a claim about any client. */
const bottleneck = 3;

export function GrowthPhilosophy() {
  return (
    <section className="section relative overflow-hidden" aria-labelledby="exist-title">
      <div className="bg-aura pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Live className="ab-chain" aria-hidden>
            <ol className="ab-chain-list">
              {stages.map((s, i) => (
                <li key={s} className={`ab-slab ${i === bottleneck ? "is-neck" : ""} ${i > bottleneck ? "is-after" : ""}`} style={{ ["--i" as string]: i }}>
                  <span className="ab-slab-n">0{i + 1}</span>
                  <span className="ab-slab-t">{s}</span>
                  <span className="ab-slab-meter">
                    <span />
                  </span>
                  {i === bottleneck ? <span className="ab-slab-flag">Bottleneck</span> : null}
                </li>
              ))}
            </ol>
          </Live>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <div data-reveal>
            <Eyebrow>Why We Exist</Eyebrow>
          </div>
          <h2 id="exist-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
            Growth Is a System. <span className="t-grad">Not a Campaign.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p data-reveal>
              Businesses rarely have one marketing problem. They have connected problems, and connected problems need connected thinking.
            </p>
            <p data-reveal>
              We do not believe every business needs Meta Ads. Or SEO. Or an AI agent. Or a new website. Every business needs the right answer to the
              right problem, which is why diagnosis comes before prescription.
            </p>
          </div>
          <p data-reveal className="ab-pull mt-9">
            Our job is to find the bottleneck <span className="t-grad">before it becomes expensive.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
