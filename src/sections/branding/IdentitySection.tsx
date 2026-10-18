import { Deferred } from "@/components/perf/Deferred";
import { IdentitySystem } from "./IdentitySystem";
import "@/styles/branding.css";

/** Scattered assets snapping into one identity system board. */
export function IdentitySection() {
  return (
    <section className="section-tight !pt-0" aria-labelledby="identity-title">
      <div className="container-x">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal className="t-label">
              Eight assets. One company.
            </p>
            <h2 id="identity-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h2 mt-4">
              A Coherent <span className="t-grad">Identity System.</span>
            </h2>
          </div>
          <p data-reveal style={{ ["--reveal-delay" as string]: 110 }} className="t-lead lg:col-span-5">
            Logo, type, colour, photography, social, website, advertising and the deck your sales team sends. Built once, as one system.
          </p>
        </div>
        <Deferred className="bm-is-slot mt-10 md:mt-14">
          <IdentitySystem />
        </Deferred>
      </div>
    </section>
  );
}
