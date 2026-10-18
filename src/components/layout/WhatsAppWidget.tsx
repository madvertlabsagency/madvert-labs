import { whatsapp } from "@/lib/site";
import "@/styles/whatsapp.css";

/**
 * Floating WhatsApp button. Plain link (no client JS); clicks are tracked as whatsapp_click by the
 * site-wide listener in ClientBoot. Sits above the mobile sticky CTA on small screens.
 */
export function WhatsAppWidget() {
  return (
    <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label={`Chat with Madvert Labs on WhatsApp (${whatsapp.number})`}>
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.1.56 4.16 1.62 5.97L4 29l8.3-1.6a12.1 12.1 0 0 0 3.74.59C22.68 28 28 22.64 28 16.04 28 9.4 22.68 3 16.04 3zm0 22.9c-1.2 0-2.38-.2-3.5-.58l-.25-.08-4.93.95.98-4.8-.17-.27a9.9 9.9 0 0 1-1.57-5.16c0-5.5 4.47-9.98 9.98-9.98 5.48 0 9.94 4.48 9.94 10.02 0 5.5-4.46 9.9-9.48 9.9zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35z"
        />
      </svg>
      <span className="wa-fab-label">Chat on WhatsApp</span>
    </a>
  );
}
