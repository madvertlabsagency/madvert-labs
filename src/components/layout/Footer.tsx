import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Cta } from "@/components/ui/Button";
import { GrowthRibbon } from "@/components/visuals/GrowthRibbon";
import { footerNav, legalNav, office, officeLines, partnerNav, services, site, socialProfiles, whatsapp } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2">
      <GrowthRibbon shape="flat" className="absolute inset-x-0 -top-10 h-40 w-full" opacity={0.5} flowing={false} id="footer-ribbon" />
      <div className="container-x relative pb-10 pt-20 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo descriptor height={64} />
            <p className="t-h3 mt-8 max-w-[420px]">{site.tagline}</p>
            <div className="mt-8">
              <Cta href={site.primaryCta.href} track="strategy_call_click" trackLabel="footer_cta">
                {site.primaryCta.label}
              </Cta>
            </div>
            <address className="mt-10 not-italic text-[14.5px] leading-relaxed text-ink-2">
              <p className="t-label mb-3">
                <Link href="/digital-marketing-agency-karachi" className="hover:text-ink">
                  Karachi office
                </Link>
              </p>
              <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-ink">
                {officeLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </a>
              <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block hover:text-ink">
                WhatsApp {office.phone}
              </a>
              <span className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                {socialProfiles.map((p) => (
                  <a key={p.href} href={p.href} target="_blank" rel="me noopener noreferrer" className="hover:text-ink">
                    {p.label}
                  </a>
                ))}
              </span>
            </address>
          </div>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="t-label">Madvert</p>
            <ul className="mt-5 grid gap-3">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services" className="md:col-span-3">
            <p className="t-label">Services</p>
            <ul className="mt-5 grid gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="t-label mt-10">Partnerships</p>
            <ul className="mt-5 grid gap-3">
              {partnerNav.map((l) => (
                <li key={l.href}>
                  {/* /custom-patches is a separate static page, so a plain anchor (no client navigation). */}
                  <a href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col gap-4 text-[13.5px] text-ink-3 md:flex-row md:items-center md:justify-between">
          <p className="font-display tracking-[0.02em] text-ink-2">{site.footerLine}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
            <span>
              © {site.legalName}. {site.descriptor}.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
