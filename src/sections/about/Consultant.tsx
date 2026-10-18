import Image from "next/image";
import { Eyebrow } from "@/components/ui/Section";
import { founder } from "@/lib/entities";

const practice = ["Digital marketing", "Customer acquisition", "Funnels", "Automation", "Growth systems"];

export function Consultant() {
  return (
    <section className="section-tight relative" aria-labelledby="consultant-title">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div data-reveal>
            <Eyebrow>The Consultant</Eyebrow>
          </div>
          <h2 id="consultant-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
            Marketing Consultant. System Builder. <span className="t-grad">Problem Solver.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p data-reveal className="text-ink">
              For approximately five years, Usama has worked across digital marketing, customer acquisition, funnels, automation and growth systems.
            </p>
            <p data-reveal>
              That work has covered businesses with very different buying journeys, from direct to consumer products to established corporate and
              service based businesses.
            </p>
            <p data-reveal>
              The approach stays the same: understand the business first, then decide what marketing, system or technology should actually be built.
            </p>
          </div>
          <ul data-reveal className="mt-8 flex flex-wrap gap-2.5" aria-label="Areas of practice">
            {practice.map((p) => (
              <li key={p} className="ab-tag">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <figure data-reveal="fade" className="ab-present">
            <div className="ab-present-frame">
              <Image
                src="/images/usama-abbas-dahri-presenting.webp"
                alt={`${founder.name} presenting in a meeting room`}
                fill
                sizes="(min-width:1024px) 460px, (min-width:640px) 440px, 88vw"
                className="object-cover"
              />
            </div>
            <blockquote className="ab-quote">
              <span className="ab-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <p>When people were learning it, I was building it.</p>
              <footer>
                {founder.name}, {founder.jobTitle}
              </footer>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
