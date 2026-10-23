import { office, whatsapp } from "@/lib/site";

const addressLines = [office.streetAddress, office.locality, `${office.city}, ${office.region}, ${office.country}`];

/**
 * A static, map-style card for the Karachi office (no iframe, no third-party requests).
 * The street drawing is decorative; the address, phone and links are real text.
 */
export function OfficeMapCard({ headingId }: { headingId?: string }) {
  return (
    <div className="panel overflow-hidden" data-reveal>
      <div className="loc-map relative aspect-[16/10] w-full" aria-hidden="true">
        <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="250" className="loc-map-ground" />
          <g className="loc-map-block">
            <rect x="18" y="20" width="96" height="62" rx="6" />
            <rect x="132" y="20" width="70" height="62" rx="6" />
            <rect x="236" y="20" width="62" height="62" rx="6" />
            <rect x="316" y="20" width="70" height="62" rx="6" />
            <rect x="18" y="104" width="96" height="44" rx="6" />
            <rect x="236" y="104" width="150" height="44" rx="6" />
            <rect x="18" y="172" width="70" height="60" rx="6" />
            <rect x="110" y="172" width="92" height="60" rx="6" />
            <rect x="236" y="172" width="62" height="60" rx="6" />
            <rect x="316" y="172" width="70" height="60" rx="6" />
          </g>
          <g className="loc-map-road">
            <path d="M0 93 H400" />
            <path d="M0 160 H400" />
            <path d="M219 0 V250" />
            <path d="M123 0 V170" />
            <path d="M307 0 V250" />
          </g>
          <path d="M0 160 H400" className="loc-map-main" />
          <path d="M219 0 V250" className="loc-map-main" />
          <g transform="translate(160 126)">
            <circle r="26" className="loc-map-pulse" />
            <circle r="13" className="loc-map-ring" />
            <circle r="6" className="loc-map-pin" />
          </g>
        </svg>
        <span className="loc-map-tag">Midway A Commercial · Bahria Town Karachi</span>
      </div>
      <address className="block p-6 not-italic sm:p-7">
        <p id={headingId} className="font-display text-[18px] font-semibold text-ink">
          {office.name}, Karachi office
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">
          {addressLines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
        <p className="mt-3 text-[15.5px] text-ink-2">
          Phone and WhatsApp:{" "}
          <a href={`tel:${office.phoneE164}`} className="sp-inline-link">
            {office.phone}
          </a>
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-[14.5px] font-semibold">
          <a href={office.gbpUrl ?? office.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-accent-text hover:underline" data-track="maps_click" data-track-label="karachi_page">
            Open in Google Maps
          </a>
          <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="text-accent-text hover:underline" data-track="whatsapp_click" data-track-label="karachi_page">
            Message on WhatsApp
          </a>
        </div>
      </address>
    </div>
  );
}
