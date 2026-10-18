import { ResourceCard } from "@/components/lead-magnets/ResourceCard";
import { getLeadMagnet } from "@/content/lead-magnets";
import type { Resource } from "@/types/content";

/** Real Madvert Vault resources that fit the page, rendered with the existing Vault card. */
export function RelatedResources({ slugs }: { slugs: string[] }) {
  const items = slugs.map((s) => getLeadMagnet(s)).filter((r): r is Resource => Boolean(r));
  if (!items.length) return null;
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r) => (
        <li key={r.slug}>
          <ResourceCard r={r} related trackLabel={`service_page_${r.slug}`} />
        </li>
      ))}
    </ul>
  );
}
