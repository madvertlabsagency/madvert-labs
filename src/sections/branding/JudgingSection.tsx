import { Deferred } from "@/components/perf/Deferred";
import { PerceptionJourney } from "./PerceptionJourney";
import "@/styles/branding.css";

const lines = ["They see your logo.", "Your Instagram.", "Your website.", "Your photographs.", "Your reviews.", "Your ads.", "Your tone.", "Your consistency."];

/** "Your customer is judging": the statement, then the pre sales perception path. */
export function JudgingSection() {
  return (
    <section className="section bm-judging" aria-labelledby="judging-title">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="judging-title" data-reveal className="t-h1">
              Your Customer Is Judging <span className="t-grad">Before Your Sales Team Ever Speaks.</span>
            </h2>
            <ul className="bm-lines mt-9">
              {lines.map((l, i) => (
                <li key={l} data-reveal style={{ ["--reveal-delay" as string]: 60 + i * 50 }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="t-h3 lg:col-span-5 lg:self-end">
            <p>Within seconds, they begin building an opinion.</p>
            <p className="mt-4 flex flex-wrap gap-2 text-[15px]">
              {["Premium.", "Average.", "Trustworthy.", "Forgettable."].map((w) => (
                <span key={w} className="rounded-full border border-line px-3 py-1 font-sans font-medium text-ink-2">
                  {w}
                </span>
              ))}
            </p>
            <p className="mt-6">
              Your brand is already saying something. <span className="t-grad">The only question is whether you chose the message.</span>
            </p>
          </div>
        </div>
        <div className="mt-14 md:mt-20">
          <p className="t-label mb-6">Six moments before the first sales call</p>
          <Deferred className="bm-journey-slot">
            <PerceptionJourney />
          </Deferred>
        </div>
      </div>
    </section>
  );
}
