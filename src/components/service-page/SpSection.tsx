import type { ReactNode } from "react";

/** Standard section shell for service pages: hairline, small label, H2, optional intro, content. */
export function SpSection({
  id,
  label,
  title,
  intro,
  children,
  aside,
}: {
  id: string;
  label: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  /** Optional content beside the heading on large screens. */
  aside?: ReactNode;
}) {
  return (
    <section id={id} className="section-tight scroll-mt-24 !py-[clamp(48px,6vw,88px)]" aria-labelledby={`${id}-title`}>
      <div className="container-x">
        <div className="hairline mb-12 md:mb-16" />
        <div className={aside ? "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10" : ""}>
          <div className={aside ? "lg:col-span-7" : "max-w-[820px]"}>
            <p data-reveal className="t-label">
              {label}
            </p>
            <h2 id={`${id}-title`} data-reveal style={{ ["--reveal-delay" as string]: 40 }} className="t-h2 mt-4">
              {title}
            </h2>
            {intro ? (
              <div data-reveal style={{ ["--reveal-delay" as string]: 80 }} className="t-lead mt-5 space-y-4">
                {intro}
              </div>
            ) : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
