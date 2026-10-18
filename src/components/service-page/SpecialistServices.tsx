import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { serviceEntities, getServiceEntity, type ServiceKey } from "@/lib/entities";

/**
 * A small, tasteful list of the specialist pages that sit under a pillar (or, with `keys`, any set
 * of services). Names, paths and definitions come from src/lib/entities.ts.
 */
export function SpecialistServices({
  parent,
  keys,
  title = "Specialist services",
  intro,
}: {
  /** List the entities whose `parent` is this pillar. */
  parent?: ServiceKey;
  /** Or list these services explicitly. */
  keys?: ServiceKey[];
  title?: string;
  intro?: string;
}) {
  const items = keys ? keys.map((k) => getServiceEntity(k)) : serviceEntities.filter((s) => s.parent === parent);
  if (!items.length) return null;
  const id = `specialist-${parent ?? "services"}`;
  return (
    <section className="section-tight !py-[clamp(40px,5vw,72px)]" aria-labelledby={`${id}-title`}>
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p data-reveal className="t-label">
              Go deeper
            </p>
            <h2 id={`${id}-title`} data-reveal className="t-h3 mt-3">
              {title}
            </h2>
            {intro ? (
              <p data-reveal className="mt-3 text-[15px] leading-relaxed text-ink-2">
                {intro}
              </p>
            ) : null}
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
            {items.map((s) => (
              <li key={s.key} data-reveal>
                <Link
                  href={s.path}
                  data-track="service_cta_click"
                  data-track-label={`specialist_${s.key}`}
                  className="group/btn flex h-full flex-col rounded-2xl border border-line bg-glass p-5 transition-colors hover:border-line-strong"
                >
                  <span className="inline-flex items-center gap-2 font-display text-[16px] font-semibold text-ink">
                    {s.name} <Arrow />
                  </span>
                  <span className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink-3 sm:line-clamp-3">{s.definition}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
