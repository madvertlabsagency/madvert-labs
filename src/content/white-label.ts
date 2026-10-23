/** White-label partnership page (/white-label-partnership). Assets that must be real are configured here. */

/** Founder VSL (vertical 9:16, 720x1280). */
export const WL_VSL = {
  src: "/video/white-label-vsl-720.mp4",
  poster: "/video/white-label-vsl-poster.webp",
};

/** The six-step lead generation funnel, as real Madvert work cards. */
export const FUNNEL_CARDS = [
  { key: "ad-creative", label: "Ad creative", alt: "Step 1: high-performing ad creative for a Dubai property campaign" },
  { key: "landing-page", label: "Landing page", alt: "Step 2: conversion-optimised landing page for Dubai off-plan projects" },
  { key: "qualification-form", label: "Qualification form", alt: "Step 3: smart qualification form asking country, budget, property type and timeline" },
  { key: "crm", label: "CRM", alt: "Step 4: qualified leads delivered into the CRM with country and budget" },
  { key: "follow-up", label: "Follow-up", alt: "Step 5: automated follow-up by email, WhatsApp, reminders and appointment booking" },
  { key: "booked-opportunity", label: "Booked opportunity", alt: "Step 6: consultation booked with a qualified investor" },
] as const;

export const WL_PHOTOS = {
  /** Main founder portrait. */
  portrait: { url: "/images/usama-abbas-dahri.webp", alt: "Usama Abbas Dahri, founder of Madvert Labs", width: 1024, height: 1536 },
  /** Teaching / presenting: used where the page talks about teaching. */
  teaching: { url: "/images/usama-abbas-dahri-presenting.webp", alt: "Usama Abbas Dahri teaching a session on performance marketing", width: 960, height: 1280 },
} as const;

export const TRUST = [
  "5+ Years in Digital Marketing",
  "US, UAE & Pakistan Experience",
  "Up to ~$30K/Month Ad Accounts Managed",
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

/** Dedicated GHL calendar for white-label strategy calls. */
export const WL_BOOKING_URL = "https://api.madvertlabs.com/widget/booking/fNMJtWiOc3I7xw96XDOS";
