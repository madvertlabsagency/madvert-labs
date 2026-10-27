import type { IconName } from "@/components/ui/Icon3D";

/**
 * The one canonical origin: https, no www, never localhost or a vercel.app preview, so canonicals,
 * sitemap URLs and structured data always point at the production domain.
 */
function canonicalOrigin(env?: string) {
  const fallback = "https://madvertlabs.com";
  if (!env) return fallback;
  try {
    const u = new URL(env);
    if (u.protocol !== "https:" || /localhost|127\.0\.0\.1|\.vercel\.app$/.test(u.hostname)) return fallback;
    return `https://${u.hostname.replace(/^www\./, "")}`;
  } catch {
    return fallback;
  }
}

export const site = {
  name: "Madvert Labs",
  legalName: "Madvert Labs",
  descriptor: "Digital Marketing & Growth Systems",
  tagline: "Beyond Advertising. We Build Growth Systems.",
  belief: "Growth Is a System. Not a Campaign.",
  promise: "One Growth Partner for Everything Between Attention and Revenue.",
  footerLine: "Bismillah. Build with purpose. Grow with clarity.",
  url: canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  founder: {
    name: "Usama Abbas Dahri",
    shortName: "Usama",
    role: "Founder, Madvert Labs",
  },
  // "#book" scrolls to the page's booking section, or opens the booking modal when the page has none.
  primaryCta: { label: "Book a Free Strategy Call", href: "#book" },
  founderCta: { label: "Book a Business Strategy Call with Usama", href: "#book" },
  shortCta: { label: "Book a Free Strategy Call", href: "#book" },
  auditCta: { label: "Start With a Free Growth Systems Audit", href: "/resources/growth-systems-audit" },
} as const;

export type ServiceSlug =
  | "branding-marketing"
  | "client-acquisition"
  | "conversion"
  | "automation-revenue-systems"
  | "tech-product-development";

export type Pillar = {
  key: string;
  title: string;
  href: string;
  icon: IconName;
  summary: string;
  headline: string;
  cta: string;
  freeValue: { label: string; href: string };
  inMegaMenu: boolean;
};

/** The six pillars. Five are services, Studios has its own route. */
export const pillars: Pillar[] = [
  {
    key: "branding-marketing",
    title: "Branding and Marketing",
    href: "/services/branding-marketing",
    icon: "branding",
    summary: "Shape how the business looks, sounds and shows up everywhere.",
    headline: "Being Good Is Not Enough If You Look Forgettable.",
    cta: "Build a Stronger Brand",
    freeValue: { label: "Get the Brand Perception Checklist", href: "/resources/brand-perception-checklist" },
    inMegaMenu: true,
  },
  {
    key: "client-acquisition",
    title: "Client Acquisition",
    href: "/services/client-acquisition",
    icon: "acquisition",
    summary: "Qualified demand across paid, organic and AI search.",
    headline: "Your Sales Team Does Not Need More Phone Numbers. It Needs More People Worth Calling.",
    cta: "Build Qualified Demand",
    freeValue: { label: "Get the Qualified Lead Generation Playbook", href: "/resources/qualified-lead-generation-playbook" },
    inMegaMenu: true,
  },
  {
    key: "conversion",
    title: "Conversion",
    href: "/services/conversion",
    icon: "conversion",
    summary: "Websites and journeys that turn attention into action.",
    headline: "Traffic Is Expensive. Wasting It Is Optional.",
    cta: "Fix Your Conversion Journey",
    freeValue: { label: "Get the Conversion Leak Checklist", href: "/resources/conversion-leak-checklist" },
    inMegaMenu: true,
  },
  {
    key: "studios",
    title: "Madvert Studios",
    href: "/studios",
    icon: "studios",
    summary: "Creative production that earns the next three seconds.",
    headline: "People Do Not Skip Ads. They Skip Boring Ads.",
    cta: "Enter Madvert Studios",
    freeValue: { label: "Watch the Showreel", href: "/studios#showreel" },
    inMegaMenu: false,
  },
  {
    key: "automation-revenue-systems",
    title: "Automation and Revenue Systems",
    href: "/services/automation-revenue-systems",
    icon: "automation",
    summary: "CRM, AI and follow up that keep every opportunity moving.",
    headline: "Your CRM Should Not Be Your Sales Manager's Memory.",
    cta: "Automate the Revenue Journey",
    freeValue: { label: "Run the Revenue Leakage Audit", href: "/resources/revenue-leakage-audit" },
    inMegaMenu: true,
  },
  {
    key: "tech-product-development",
    title: "Tech and Product Development",
    href: "/services/tech-product-development",
    icon: "development",
    summary: "When growth needs a tool, we design and build the tool.",
    headline: "If Growth Needs a Tool, We Build the Tool.",
    cta: "Build What Growth Needs",
    freeValue: { label: "Request a Tech Opportunity Audit", href: "/resources/tech-opportunity-audit" },
    inMegaMenu: true,
  },
];

export const services = pillars.filter((p) => p.inMegaMenu);

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/services", mega: true },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Madvert Studios", href: "/studios" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * Footer: identity, core navigation and partnerships only. Topic pages (glossary, calculator,
 * articles, industries) are reached through contextual links on the pages that need them.
 */
export const footerNav = [
  { label: "What We Do", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Madvert Studios", href: "/studios" },
  { label: "Madvert Vault", href: "/resources" },
  { label: "Insights", href: "/insights" },
  { label: "About Us", href: "/about" },
  { label: "Founder: Usama Abbas Dahri", href: "/about/usama-abbas-dahri" },
  { label: "Contact Us", href: "/contact" },
];

/** Official company profiles, linked in the footer (the same URLs are in Organization sameAs). */
export const socialProfiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/madvert-labs/" },
  { label: "Instagram", href: "https://www.instagram.com/madvertlabsofficial/" },
];

/** Offers for specific audiences, kept separate from the core services. */
export const partnerNav = [
  { label: "White Label for Agencies", href: "/white-label-partnership" },
  { label: "Custom Patch RFQs", href: "/custom-patches" },
];

/** Small reference links in the footer's bottom bar. */
export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Company Facts", href: "/about/facts" },
  { label: "Press", href: "/press" },
  { label: "Glossary", href: "/glossary" },
];

/**
 * The Karachi office. Name, address and phone must match the Google Business Profile exactly,
 * because search engines and AI answers cross check them (NAP consistency).
 */
export const office = {
  name: "Madvert Labs",
  streetAddress: "Building 93-A, 4th Floor, Midway A Commercial",
  locality: "Bahria Town Karachi",
  city: "Karachi",
  region: "Sindh",
  country: "Pakistan",
  countryCode: "PK",
  phone: "+92 322 2568703",
  phoneE164: "+923222568703",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Madvert Labs, Building 93-A, Midway A Commercial, Bahria Town Karachi")}`,
  /** Google Business Profile share link (set NEXT_PUBLIC_GBP_URL to the profile's "Share" URL). */
  gbpUrl: process.env.NEXT_PUBLIC_GBP_URL || "https://share.google/mrNilKSbsMNCrB9Zu",
};
export const officeLines = [office.streetAddress, office.locality, `${office.city}, ${office.country}`];

/** WhatsApp chat (floating widget and contact links). */
export const whatsapp = {
  number: "+92 322 2568703",
  url: `https://wa.me/923222568703?text=${encodeURIComponent("Hi Madvert Labs, I would like to talk about growing my business.")}`,
};

/** The one booking calendar used everywhere (LeadConnector / GoHighLevel widget). */
export const booking = {
  url: process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://api.madvertlabs.com/widget/booking/pvk8u6OhzYeIizvLDelx",
  embedScript: "https://link.msgsndr.com/js/form_embed.js",
};

/** Analytics defaults. Env vars override; set NEXT_PUBLIC_GA4_VIA_GTM=true if GA4 is configured inside GTM. */
export const analyticsIds = {
  gtm: process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MDFSNH4H",
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "G-MNM7Y974JB",
  ga4ViaGtm: process.env.NEXT_PUBLIC_GA4_VIA_GTM === "true",
};

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
