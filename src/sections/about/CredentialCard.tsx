import Image from "next/image";
import { credentials as defaultCredentials, type Credential } from "./data";

/**
 * Verified credential slot. Renders NOTHING unless at least one credential exists in
 * `credentials` (src/sections/about/data.ts), which is empty until the real certificate file is
 * supplied. No certification is claimed anywhere while the list is empty.
 */
export function CredentialCard({ items = defaultCredentials }: { items?: Credential[] }) {
  if (!items.length) return null;
  return (
    <section className="section-tight" aria-labelledby="credentials-title">
      <div className="container-x">
        <h2 id="credentials-title" data-reveal className="t-h2 max-w-[760px]">
          Verified <span className="t-grad">Credentials.</span>
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((c) => {
            const body = (
              <>
                {c.image ? (
                  <span className="ab-cred-media">
                    <Image src={c.image} alt={`${c.title} certificate issued by ${c.issuer}`} fill sizes="(min-width:768px) 220px, 40vw" className="object-cover" />
                  </span>
                ) : null}
                <span className="flex min-w-0 flex-col gap-2">
                  {c.logo ? <Image src={c.logo} alt={c.issuer} width={96} height={28} className="h-7 w-auto object-contain object-left" /> : null}
                  <span className="font-display text-[19px] font-semibold leading-snug text-ink">{c.title}</span>
                  <span className="text-[14px] text-ink-3">Issued by {c.issuer}</span>
                  {c.url ? <span className="text-[14px] font-medium text-accent-text">Verify credential</span> : null}
                </span>
              </>
            );
            return (
              <li key={`${c.issuer}-${c.title}`} data-reveal>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="ab-cred panel">
                    {body}
                  </a>
                ) : (
                  <div className="ab-cred panel">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
