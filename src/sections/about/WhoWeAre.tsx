import { Eyebrow } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Logo";
import { organization } from "@/lib/entities";
import { Live } from "./Live";

const vendors = ["Ads freelancer", "Web developer", "Designer", "CRM consultant", "Video editor"];
const department = ["Strategy", "Brand", "Acquisition", "Conversion", "Creative", "CRM and Automation", "AI and Technology"];

export function WhoWeAre() {
  return (
    <section className="section relative" aria-labelledby="who-title">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div data-reveal>
            <Eyebrow>Who Madvert Labs Is</Eyebrow>
          </div>
          <h2 id="who-title" data-reveal style={{ ["--reveal-delay" as string]: 60 }} className="t-h1 mt-6">
            An External Growth Department <span className="t-grad">for Established Businesses.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p data-reveal className="text-ink">
              {organization.description}
            </p>
            <p data-reveal>
              Most established businesses already spend on marketing. What they rarely have is one team that owns the whole journey from attention to
              revenue. {organization.name} plugs in as that department: the thinking, the execution and the systems underneath, under one direction.
            </p>
          </div>
          <p data-reveal className="t-h3 mt-9 max-w-[560px]">
            Hire Madvert Once. <span className="t-grad">Stop Building Your Marketing Department From Five Different WhatsApp Chats.</span>
          </p>
        </div>

        <div className="lg:col-span-6">
          <Live className="ab-dept" aria-hidden>
            <div className="ab-dept-before">
              <p className="ab-dept-k">The usual setup</p>
              <ul className="ab-dept-scatter">
                {vendors.map((v, i) => (
                  <li key={v} className="ab-vendor" style={{ ["--i" as string]: i }}>
                    <span className="ab-vendor-ic" />
                    {v}
                  </li>
                ))}
              </ul>
              <p className="ab-dept-foot">Five chats. Five directions.</p>
            </div>
            <div className="ab-dept-after">
              <div className="ab-dept-head">
                <Logo height={20} href={null} />
                <span className="ab-dept-pill">One department</span>
              </div>
              <ul className="ab-dept-rows">
                {department.map((d, i) => (
                  <li key={d} className="ab-dept-row" style={{ ["--i" as string]: i }}>
                    <span className="ab-dept-node" />
                    <span>{d}</span>
                    <span className="ab-dept-bar" />
                  </li>
                ))}
              </ul>
              <p className="ab-dept-foot ab-dept-foot--on">One direction. One owner.</p>
            </div>
          </Live>
        </div>
      </div>
    </section>
  );
}
