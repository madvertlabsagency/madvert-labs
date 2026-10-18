import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { getServiceEntity, type ServiceKey } from "@/lib/entities";

export type RelatedLink = { key?: ServiceKey; href?: string; anchor: string; note: string };

/** Contextual internal links: descriptive anchor text plus a sentence on why the page is relevant. */
export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {links.map((l) => {
        const href = l.href ?? (l.key ? getServiceEntity(l.key).path : "/services");
        const entity = l.key ? getServiceEntity(l.key) : undefined;
        return (
          <li key={href + l.anchor}>
            <Link
              href={href}
              className="panel group/btn flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
            >
              {entity ? <span className="t-label">{entity.name}</span> : null}
              <span className="mt-2 inline-flex items-center gap-2 font-display text-[17px] font-semibold text-ink first:mt-0">
                {l.anchor} <Arrow />
              </span>
              <span className="mt-2 text-[15px] leading-relaxed text-ink-2">{l.note}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
