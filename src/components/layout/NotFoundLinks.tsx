import Link from "next/link";

/** Where most lost visitors were trying to go. Shared by both 404 pages. */
const LINKS = [
  { href: "/services", label: "What we do" },
  { href: "/services/meta-ads", label: "Meta Ads lead generation" },
  { href: "/services/ai-seo-aeo", label: "AI SEO and AEO" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/resources", label: "Free playbooks" },
  { href: "/insights", label: "Insights" },
];

export function NotFoundLinks() {
  return (
    <nav aria-label="Popular pages" className="mx-auto mt-10 max-w-[720px]">
      <p className="t-label">Popular pages</p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex rounded-full border border-line px-4 py-2 text-[14.5px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
