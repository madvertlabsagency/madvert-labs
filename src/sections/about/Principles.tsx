import { Eyebrow } from "@/components/ui/Section";

const principles: { t: string; b: string }[] = [
  { t: "The Business Problem Comes First.", b: "Diagnosis before prescription. The channel is never more important than the business behind it." },
  { t: "Follow the Bottleneck.", b: "We do not stop at the first visible problem. We keep looking until the business logic makes sense." },
  { t: "Good Enough Is Expensive.", b: "A weak page, a slow reply or a missing report quietly taxes every rupee, dirham and dollar of spend." },
  { t: "Not the Cheapest Option. Intentionally.", b: "If you want vanity metrics or guaranteed rankings next month, we will ask too many questions. If you want ownership, we should talk." },
];

export function Principles() {
  return (
    <section className="section-tight relative" aria-labelledby="think-title">
      <div className="container-x">
        <div className="hairline mb-16 lg:mb-20" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow>How We Think</Eyebrow>
            </div>
            <h2 id="think-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
              Four Rules <span className="t-grad">We Work By.</span>
            </h2>
          </div>
          <ol className="ab-rules lg:col-span-8">
            {principles.map((p, i) => (
              <li key={p.t} data-reveal style={{ ["--reveal-delay" as string]: (i % 2) * 80 }} className="ab-rule">
                <span className="ab-rule-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="t-h3">{p.t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{p.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
