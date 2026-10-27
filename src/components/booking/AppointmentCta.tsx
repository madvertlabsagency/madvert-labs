import { Cta } from "@/components/ui/Button";
import { booking } from "@/lib/site";

/**
 * Reusable appointment CTA: "Book a Free Strategy Call" (primary) and "Discuss Your Growth Strategy"
 * (secondary). The primary button is a real link to the Madvert booking calendar, so it works without
 * JavaScript; with JavaScript, BookingController opens the same calendar on the page (data-open-booking)
 * instead of leaving the site. Clicks are tracked as strategy_call_click: a click, not a confirmed booking
 * (confirmed bookings come from the calendar itself as calendar_booking_complete).
 */
export function AppointmentCta({
  context,
  title = "Want This Built for Your Business?",
  body = "Book a free strategy call. We will look at your offer, channels, website and follow up, and tell you honestly what we would fix first.",
  secondaryHref = "/contact",
  variant = "panel",
}: {
  /** Where the CTA sits, sent as the tracking label (e.g. "article_meta-ads-vs-google-ads"). */
  context: string;
  title?: string;
  body?: string;
  secondaryHref?: string;
  variant?: "panel" | "inline";
}) {
  const buttons = (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <Cta href={booking.url} data-open-booking="" size="lg" track="strategy_call_click" trackLabel={`${context}_book`} className="!whitespace-normal text-center">
        Book a Free Strategy Call
      </Cta>
      <Cta href={secondaryHref} variant="secondary" size="lg" arrow={false} track="service_cta_click" trackLabel={`${context}_discuss`}>
        Discuss Your Growth Strategy
      </Cta>
    </div>
  );
  if (variant === "inline") return <div className="my-10">{buttons}</div>;
  return (
    <aside className="panel my-12 p-6 sm:p-8" aria-label="Book a free strategy call">
      <p className="font-display text-[clamp(19px,1.9vw,23px)] font-semibold leading-snug text-ink">{title}</p>
      <p className="mt-3 max-w-[640px] text-[15.5px] leading-relaxed text-ink-2">{body}</p>
      <div className="mt-6">{buttons}</div>
    </aside>
  );
}
