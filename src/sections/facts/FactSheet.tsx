import Link from "next/link";
import type { ReactNode } from "react";
import { formatIsoDate } from "@/components/facts/DirectAnswer";
import { founder, organization, serviceEntities } from "@/lib/entities";
import { office, whatsapp } from "@/lib/site";
import { caseStudyIndustries, fullAddress, publishedCaseStudies, publishedResourceCount } from "./data";

function Row({ term, id, children }: { term: string; id: string; children: ReactNode }) {
  return (
    <div className="fp-row" id={id}>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/** The quotable company fact sheet: one definition list, every value server-rendered and verifiable. */
export function FactSheet({ updated }: { updated: string }) {
  const industries = caseStudyIndustries();
  const studyCount = publishedCaseStudies().length;
  const resourceCount = publishedResourceCount();
  const linkedIn = founder.sameAs.find((u) => u.includes("linkedin.com"));

  return (
    <dl className="fp-dl panel" aria-label={`${organization.name} company facts`}>
      <Row term="Name" id="name">
        <p>
          <strong>{organization.name}</strong> (wordmark: {organization.brandMark})
        </p>
      </Row>
      <Row term="What it is" id="what-it-is">
        <p>{organization.description}</p>
      </Row>
      <Row term="Founder and CEO" id="founder">
        <p>
          <Link href={founder.path} className="sp-inline-link">
            {founder.name}
          </Link>
          , {founder.jobTitle}
          {linkedIn ? (
            <>
              {" "}
              (
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="sp-inline-link">
                LinkedIn profile
              </a>
              )
            </>
          ) : null}
        </p>
      </Row>
      <Row term="Headquarters" id="headquarters">
        <address className="not-italic">
          <p>{fullAddress}</p>
        </address>
        <p className="fp-sub">
          <a href={office.gbpUrl ?? office.mapsUrl} target="_blank" rel="noopener noreferrer" className="sp-inline-link" data-track="maps_click" data-track-label="facts_page">
            View on Google Business Profile
          </a>
          {" · "}
          <Link href="/digital-marketing-agency-karachi" className="sp-inline-link">
            Karachi office page
          </Link>
        </p>
      </Row>
      <Row term="Contact" id="contact">
        <p>
          Phone and WhatsApp:{" "}
          <a href={`tel:${office.phoneE164}`} className="sp-inline-link">
            {office.phone}
          </a>{" "}
          (
          <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="sp-inline-link" data-track="whatsapp_click" data-track-label="facts_page">
            chat on WhatsApp
          </a>
          )
        </p>
        {organization.email ? (
          <p>
            Email:{" "}
            <a href={`mailto:${organization.email}`} className="sp-inline-link">
              {organization.email}
            </a>
          </p>
        ) : null}
        <p>
          Book a Business Strategy Call:{" "}
          <Link href="/contact#book" className="sp-inline-link">
            madvertlabs.com/contact
          </Link>
        </p>
      </Row>
      <Row term="Primary market" id="market">
        <p>Established businesses in Pakistan, with Karachi first. {organization.name} also works with international clients online.</p>
      </Row>
      <Row term="Services" id="services">
        <ul className="fp-services">
          {serviceEntities.map((s) => (
            <li key={s.key}>
              <Link href={s.path} className="sp-inline-link">
                {s.name}
              </Link>
              <span>{s.definition}</span>
            </li>
          ))}
        </ul>
      </Row>
      <Row term="Industries with published case studies" id="industries">
        <ul className="fp-chips">
          {industries.map((c) => (
            <li key={c.label}>
              {c.href ? (
                <Link href={c.href} className="fp-chip">
                  {c.label}
                </Link>
              ) : (
                <span className="fp-chip">{c.label}</span>
              )}
            </li>
          ))}
        </ul>
      </Row>
      <Row term="Published case studies" id="case-studies">
        <p>
          {studyCount} case studies with verified campaign numbers, sources and limitations:{" "}
          <Link href="/case-studies" className="sp-inline-link">
            madvertlabs.com/case-studies
          </Link>
        </p>
      </Row>
      <Row term="Free resources" id="resources">
        <p>
          {resourceCount} free playbooks, checklists and audits in the Madvert Vault:{" "}
          <Link href="/resources" className="sp-inline-link">
            madvertlabs.com/resources
          </Link>
        </p>
      </Row>
      <Row term="Official profiles" id="profiles">
        <ul className="fp-list">
          <li>
            Website:{" "}
            <Link href="/" className="sp-inline-link">
              {organization.url.replace(/^https:\/\//, "")}
            </Link>
          </li>
          <li>
            Google Business Profile:{" "}
            <a href={office.gbpUrl ?? office.mapsUrl} target="_blank" rel="noopener noreferrer" className="sp-inline-link">
              {organization.name}, Karachi
            </a>
          </li>
          {linkedIn ? (
            <li>
              Founder on LinkedIn:{" "}
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="sp-inline-link">
                {founder.name}
              </a>
            </li>
          ) : null}
          {organization.sameAs.map((u) => (
            <li key={u}>
              Company profile:{" "}
              <a href={u} target="_blank" rel="noopener noreferrer" className="sp-inline-link">
                {u.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            </li>
          ))}
        </ul>
      </Row>
      <Row term="Last updated" id="updated">
        <p>
          <time dateTime={updated}>{formatIsoDate(updated)}</time>
        </p>
      </Row>
    </dl>
  );
}
