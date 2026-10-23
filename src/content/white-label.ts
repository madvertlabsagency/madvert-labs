import { credentials } from "@/sections/about/data";

/**
 * White-label partnership page (/white-label). Assets that must be real are configured here.
 *
 * VSL: set `src` to the founder's recorded white-label video (e.g. "/video/white-label-vsl.mp4") and,
 * optionally, a poster frame. Until then the page shows a clearly labelled slot, never a stand-in video.
 */
export const WL_VSL: { src: string | null; poster: string; durationLabel?: string } = {
  src: null,
  poster: "/images/usama-abbas-dahri-presenting.webp",
};

export const WL_PHOTOS = {
  /** Main founder portrait. */
  portrait: { url: "/images/usama-abbas-dahri.webp", alt: "Usama Abbas Dahri, founder of Madvert Labs", width: 1024, height: 1536 },
  /** Teaching / presenting: used where the page talks about teaching. */
  teaching: { url: "/images/usama-abbas-dahri-presenting.webp", alt: "Usama Abbas Dahri teaching a session on performance marketing", width: 960, height: 1280 },
} as const;

/** Meta certification: only claimed when a verified credential exists in src/sections/about/data.ts. */
export const META_CREDENTIAL = credentials.find((c) => /meta/i.test(c.issuer) || /meta/i.test(c.title)) ?? null;

export const TRUST = [
  "5+ Years in Digital Marketing",
  "US, UAE & Pakistan Experience",
  "Up to ~$30K/Month Ad Accounts Managed",
  ...(META_CREDENTIAL ? ["Meta Certified"] : []),
  "100% White-Label Delivery",
];

export const BACKEND_MODULES = ["Paid Media", "Funnels", "Creative", "CRM", "Automation", "Analytics", "Development"] as const;

export const CAPABILITIES = [
  { key: "media", name: "Paid Acquisition", text: "Meta Ads, Google Ads, retargeting and lead generation." },
  { key: "funnel", name: "Funnels & Conversion", text: "Landing pages, offers, forms, booking flows and CRO." },
  { key: "creative", name: "Creative", text: "Static ads, short-form video, motion graphics and performance creative." },
  { key: "crm", name: "CRM & Automation", text: "Pipelines, qualification, follow-up, email, WhatsApp and workflow automation." },
  { key: "data", name: "Tracking & Analytics", text: "Pixels, conversion tracking, attribution and reporting." },
  { key: "tech", name: "Development", text: "Websites, web applications, dashboards, portals and custom tools where required." },
] as const;

/** Verified experience categories. `cases` link to published case studies with real covers. */
export const INDUSTRIES: { label: string; cases: string[] }[] = [
  { label: "US Solar", cases: ["texas-solar"] },
  { label: "US Roofing", cases: [] },
  { label: "Real Estate", cases: ["dubai-real-estate-nigeria"] },
  { label: "Dubai Businesses", cases: ["dubai-interior-design", "home-improvement-uae"] },
  { label: "Interior Design", cases: ["dubai-interior-design"] },
  { label: "Ecommerce", cases: ["earthly-elementals"] },
  { label: "Service Businesses", cases: ["bookkeeping-appointments", "tap-center-fitness"] },
  { label: "Lead Generation", cases: ["agency-lead-generation", "cellsol-energy"] },
];

export const BOOKING_CONTEXT = "white_label";
