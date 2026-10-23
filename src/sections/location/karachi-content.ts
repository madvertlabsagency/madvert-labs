/**
 * Copy for the Karachi location page (/digital-marketing-agency-karachi).
 *
 * Rules: only verified facts. The office address and phone come from src/lib/site.ts (they match
 * the Google Business Profile). Industries come only from real case studies and the two real video
 * testimonials in src/cms/fallback.ts. No client counts, years, rankings or guarantees.
 */
import type { ServiceKey } from "@/lib/entities";

export const karachiPath = "/digital-marketing-agency-karachi";

export const karachiMeta = {
  title: "Digital Marketing Agency in Karachi",
  description:
    "Madvert Labs is a digital marketing agency in Bahria Town Karachi offering Meta Ads, Google Ads, SEO, AEO, branding and CRM for businesses across Pakistan.",
};

/** Services available from the Karachi team, in the order buyers most often ask for them. */
export const karachiServices: { key: ServiceKey; note: string }[] = [
  { key: "meta-ads", note: "Facebook and Instagram campaigns with qualifying questions, built to produce sales conversations." },
  { key: "performance-marketing", note: "Meta, Google and YouTube advertising planned together and measured by cost per qualified lead." },
  { key: "google-ads", note: "Search campaigns for people in Karachi and beyond who are already looking for the service." },
  { key: "seo", note: "Technical SEO, service and location content and authority building for Google and Bing." },
  { key: "ai-seo-aeo", note: "Clear, crawlable, evidence-backed pages that AI search experiences can understand and cite." },
  { key: "branding-marketing", note: "Brand strategy, identity and messaging so the business looks as established as it is." },
  { key: "automation-revenue-systems", note: "CRM pipelines and WhatsApp and email follow up so enquiries are answered quickly." },
];

export const karachiSteps = [
  {
    name: "A strategy session, at the office or online",
    text: "The first conversation can take place at the Madvert Labs office in Bahria Town Karachi or on a video call, whichever suits the business. It is about the business, the offer and where growth is getting stuck, not a package.",
  },
  {
    name: "Diagnosis before recommendations",
    text: "Madvert Labs reviews the current ads, website, tracking, follow up and data before recommending anything, so the plan is shaped by the business rather than by a service list.",
  },
  {
    name: "A plan with agreed measures",
    text: "Priorities, channels, budget allocation and the measures that matter, such as cost per qualified lead, booked calls or purchases, are agreed before work starts.",
  },
  {
    name: "Build, launch and report",
    text: "The team builds what the plan needs, launches it and reports through to qualified leads and sales. Review meetings can be held at the office or online.",
  },
];

/** Industries backed by a real case study or a real video testimonial. */
export const karachiIndustries: { name: string; source: string; href?: string }[] = [
  { name: "Solar and renewable energy", source: "Cellsol Energy case study", href: "/case-studies/cellsol-energy" },
  { name: "Fitness and wellness", source: "TAP Center case study", href: "/case-studies/tap-center-fitness" },
  { name: "Health and wellness e-commerce", source: "Earthly Elementals PK case study", href: "/case-studies/earthly-elementals" },
  { name: "Events", source: "Video testimonial from The Event Planet" },
  { name: "Home chef and food business", source: "Video testimonial from DE Wooden Spoon" },
  { name: "Real estate", source: "Dubai real estate case study", href: "/case-studies/dubai-real-estate-nigeria" },
  { name: "Luxury interior design", source: "Dubai interior design case study", href: "/case-studies/dubai-interior-design" },
  { name: "Home improvement", source: "UAE home improvement case study", href: "/case-studies/home-improvement-uae" },
  { name: "Bookkeeping and financial services", source: "Bookkeeping appointments case study", href: "/case-studies/bookkeeping-appointments" },
];

export const karachiProofSlugs = ["cellsol-energy", "tap-center-fitness", "earthly-elementals"];

/** Quotes exactly as spoken in the clients' video testimonials (see src/cms/fallback.ts). */
export const karachiQuotes = [
  { quote: "From my side, it's 10 out of 10 for these people.", name: "Muhammad Azeem Qadir", role: "CEO & Founder", business: "The Event Planet" },
  {
    quote: "Now, MashaAllah, we get 5 to 6 orders a day. I would definitely recommend Usama and Madvert Labs.",
    name: "Saniya Khan",
    role: "Owner",
    business: "DE Wooden Spoon",
  },
];

/** Genuine local buyer questions. Rendered visibly and used for FAQPage JSON-LD. Links use [text](/path). */
export const karachiFaqs: { q: string; a: string }[] = [
  {
    q: "Does Madvert Labs work with businesses outside Karachi?",
    a: "Yes. The office is in Karachi, but Madvert Labs works with businesses across Pakistan and internationally. Strategy calls, reporting and reviews can all happen online, and the published [case studies](/case-studies) include campaigns run in markets such as the UAE and the USA.",
  },
  {
    q: "Can we meet the team at the Karachi office?",
    a: "Yes. Strategy sessions can be arranged at the Madvert Labs office at Building 93-A, 4th Floor, Midway A Commercial, Bahria Town Karachi. Book a strategy call or send a WhatsApp message to agree a time. Meetings can also be held online.",
  },
  {
    q: "Which industries has Madvert Labs worked with?",
    a: "Published case studies and client testimonials cover solar and renewable energy, fitness, health and wellness e-commerce, events, a home chef business, real estate, interior design, home improvement and bookkeeping. The approach is not limited to these industries, because the work starts with a diagnosis of each business.",
  },
  {
    q: "How quickly can campaigns start?",
    a: "It depends on what is already in place. When the offer, ad accounts, tracking and creative are ready, campaigns can launch soon after the plan is agreed. When tracking, landing pages or creative need building first, the launch date is agreed as part of the plan rather than rushing a campaign that is not ready.",
  },
  {
    q: "Can you produce ads and content in Urdu?",
    a: "Yes. Madvert Labs can write ad copy and produce creative in Urdu, English or a mix of both, depending on who the campaign needs to reach. The language and tone are chosen for the audience and can be tested in the campaign.",
  },
  {
    q: "How much does a digital marketing agency in Karachi cost with Madvert Labs?",
    a: "Madvert Labs does not publish fixed packages or prices. The cost depends on the scope, such as which channels are needed and how much creative and build work is involved. The advertising budget is paid to the platforms and agreed separately from the cost of the work.",
  },
];
