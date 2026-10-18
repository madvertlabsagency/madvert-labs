/**
 * Local fallback content, used whenever Sanity is not configured or returns nothing.
 *
 * CONTENT PLACEHOLDER RULE: apart from fallbackCaseStudies (real, verified case studies from the
 * supplied PDFs) and the founder photography, nothing in this file is a real client, testimonial, metric,
 * certification or award. Every proof slot is a clearly bracketed placeholder and every
 * placeholder entry carries `placeholder: true` so it can be styled and noindexed.
 */
import type {
  CaseStudy,
  Faq,
  PortfolioProject,
  ProofItem,
  SiteSettings,
  TeamMember,
  Testimonial,
} from "@/types/content";

/** Real founder photography supplied by the client. */
export const founderPhoto = {
  url: "/images/usama-abbas-dahri-portrait.webp",
  alt: "Usama Abbas Dahri, Founder of Madvert Labs",
  width: 800,
  height: 1000,
};

/**
 * Real, client-approved case studies. Every value (including metrics) is taken verbatim from the
 * supplied case study PDFs in public/case-studies/. Files per slug: <slug>.pdf, <slug>-cover.webp,
 * <slug>-1.webp, <slug>-2.webp. To add a new one: drop the files there and append an entry here
 * (or create it in Sanity, which overrides this list when configured).
 */
export const fallbackCaseStudies: CaseStudy[] = [
  {
    slug: "home-improvement-uae",
    title: "100 Home Improvement Leads in UAE at $3.10 CPL",
    industry: "Home Improvement",
    market: "UAE",
    categories: ["acquisition"],
    services: [
      "Meta Ads",
      "Offer Strategy",
      "Creative",
      "Audience Strategy",
      "Campaign Optimization",
    ],
    systemType: "Meta lead generation / paid acquisition system",
    summary:
      "~100 qualified homeowner leads in the UAE at $3.10 CPL through a sharper offer and Meta Ads.",
    oneLiner:
      "~100 qualified homeowner leads in the UAE at $3.10 CPL through a sharper offer and Meta Ads.",
    problem:
      "Home improvement is competitive and generic advertising gets expensive fast. The company needed to reach relevant homeowners in the UAE, communicate value immediately, establish credibility and trust, and generate inquiries with genuine service intent. It needed more than clicks: relevant conversations with homeowners considering renovation, maintenance and upgrade services.",
    challenge:
      "Home improvement is competitive and generic advertising gets expensive fast. The company needed to reach relevant homeowners in the UAE, communicate value immediately, establish credibility and trust, and generate inquiries with genuine service intent. It needed more than clicks: relevant conversations with homeowners considering renovation, maintenance and upgrade services.",
    context:
      "A UAE home-improvement company needed a more predictable way to reach homeowners actively considering renovation, maintenance and property upgrades.",
    diagnosis: "",
    move: "",
    strategy:
      "Madvert's diagnosis: (1) a stronger offer: a sharper, more compelling offer that speaks directly to homeowner needs; (2) trust-driven communication: messaging and creatives that build instant credibility and confidence; (3) precise Meta targeting: data-driven targeting to reach the right homeowners in the UAE at the right time.",
    built:
      "Offer positioning (a clear, compelling value proposition); communication angles (benefit-driven messaging for UAE homeowners); audience strategy (precise targeting based on location, interests and homeowner intent); campaign optimization (continuous testing and performance improvement to reduce CPL); lead flow system (a consistent pipeline of qualified homeowner inquiries).",
    system:
      "Offer positioning (a clear, compelling value proposition); communication angles (benefit-driven messaging for UAE homeowners); audience strategy (precise targeting based on location, interests and homeowner intent); campaign optimization (continuous testing and performance improvement to reduce CPL); lead flow system (a consistent pipeline of qualified homeowner inquiries).",
    implementation:
      "Acquisition system: Strategy (defined the offer, audience and growth objectives) -> Creative (high-converting ad creatives and messaging angles) -> Meta Ads (launched and optimized campaigns on Meta: Facebook & Instagram) -> Homeowner inquiries (qualified leads at $3.10 CPL) -> Sales pipeline (a consistent flow of genuine homeowner inquiries for the business to follow up).",
    outcome:
      '"The result was approximately 100 qualified leads at an exceptional $3.10 CPL while creating a repeatable acquisition foundation the business could continue scaling." Consistent high-intent inquiries and a scalable acquisition foundation.',
    result:
      '"The result was approximately 100 qualified leads at an exceptional $3.10 CPL while creating a repeatable acquisition foundation the business could continue scaling." Consistent high-intent inquiries and a scalable acquisition foundation.',
    metrics: [
      {
        label: "Qualified Leads",
        value: "~100",
        source: "Results stated in the case study PDF",
        qualification: "Rounded headline figure; the Ads Manager screenshot shows 93 website submit applications.",
      },
      {
        label: "Cost Per Lead",
        value: "$3.10",
        source: "Meta Ads Manager screenshot in the case study PDF",
        qualification: "Shown in Ads Manager as cost per website submit application.",
      },
      {
        label: "Website Submit Applications",
        value: "93",
        context:
          "Meta Ads Manager screenshot (Home Improvement - UAE campaign)",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Amount spent",
        value: "$288.47",
        context: "Ads Manager screenshot",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Daily budget",
        value: "$13.00",
        context: "Ads Manager screenshot",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Reach",
        value: "21,314",
        context: "Ads Manager screenshot",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Impressions",
        value: "64,067",
        context: "Ads Manager screenshot",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Target Market",
        value: "UAE",
      },
      {
        label: "Acquisition Channel",
        value: "Meta Ads",
      },
    ],
    cover: {
      url: "/case-studies/home-improvement-uae-cover.webp",
      alt: "Cover of the Madvert Labs case study: 100 Home Improvement Leads in UAE at $3.10 CPL",
      width: 1000,
      height: 1414,
    },
    gallery: [
      {
        url: "/case-studies/home-improvement-uae-1.webp",
        alt: "Project summary page with Meta Ads Manager results: 93 website submit applications at $3.10 cost per application, $288.47 spent",
        width: 1200,
        height: 1696,
      },
      {
        url: "/case-studies/home-improvement-uae-2.webp",
        alt: "Results page: ~100 qualified leads, $3.10 cost per lead, and why the campaign worked",
        width: 1200,
        height: 1696,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    limitations: [
      "The headline figure of about 100 qualified leads is rounded. The Meta Ads Manager screenshot in the case study PDF shows 93 website submit applications for the Home Improvement - UAE campaign.",
      "All money figures are in US dollars and come from one Meta campaign. The case study does not state the reporting period.",
      "The client is not named in the case study, and the case study reports lead volume and cost, not closed sales or revenue.",
    ],
    pdfUrl: "/case-studies/home-improvement-uae.pdf",
    placeholder: false,
  },
  {
    slug: "agency-lead-generation",
    title: "99 Agency Leads at $4 CPL Across USA, UK, Canada & Australia",
    industry: "Agency Lead Generation",
    market: "USA, UK, Canada & Australia",
    categories: ["acquisition"],
    services: ["Meta Ads", "Offer Strategy", "Copywriting", "Landing Page"],
    systemType: "Multi-market Meta lead generation system",
    summary:
      "99 qualified website applications for an agency across four English-speaking markets at $4.10 each.",
    oneLiner:
      "99 qualified website applications for an agency across four English-speaking markets at $4.10 each.",
    problem: "",
    context:
      "A multi-market Meta lead generation system built to generate qualified website applications from four competitive English-speaking markets.",
    diagnosis: "",
    move: "",
    strategy:
      "Objective: generate qualified agency applications from the USA, UK, Canada & Australia. Engagement scope: lead gen strategy, offer architecture, copywriting and paid social campaign structure.",
    built:
      "Offer & communication angle; high-impact Meta ads; landing page / application flow; multi-market targeting.",
    system:
      "Offer & communication angle; high-impact Meta ads; landing page / application flow; multi-market targeting.",
    implementation:
      "Meta lead magnet / landing page campaign targeting all states (campaign shown as 'Lead Magnet | Landing Page | ALL States').",
    outcome:
      "Qualified applications at efficient acquisition costs across four major markets: qualified applications from USA, UK, Canada & Australia, appointment-ready prospects, and consistent lead flow with room to scale.",
    result:
      "Qualified applications at efficient acquisition costs across four major markets: qualified applications from USA, UK, Canada & Australia, appointment-ready prospects, and consistent lead flow with room to scale.",
    metrics: [
      {
        label: "Website Submit Applications",
        value: "99",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Cost per Website Submit Application",
        value: "$4.10",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Amount Spent",
        value: "$406.25",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Reach",
        value: "4,703",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Impressions",
        value: "10,048",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Headline CPL",
        value: "$4 CPL",
        context: "Cover headline (rounded)",
        source: "Results stated in the case study PDF",
        qualification: "Rounded from $4.10 per website submit application.",
      },
    ],
    cover: {
      url: "/case-studies/agency-lead-generation-cover.webp",
      alt: "Cover of the Madvert Labs case study: 99 Agency Leads at $4 CPL Across USA, UK, Canada & Australia",
      width: 1000,
      height: 1777,
    },
    gallery: [
      {
        url: "/case-studies/agency-lead-generation-1.webp",
        alt: "Results page: 99 website submit applications, $4.10 cost per application, $406.25 spent, 4,703 reach, 10,048 impressions",
        width: 1200,
        height: 2132,
      },
      {
        url: "/case-studies/agency-lead-generation-2.webp",
        alt: "Objective, what we built and engagement scope for the multi-market agency campaign",
        width: 1200,
        height: 2132,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition", "conversion"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    limitations: [
      "The $4 CPL in the headline is rounded. The Meta Ads Manager figure in the case study PDF is $4.10 per website submit application.",
      "The client is not named and the type of agency is not specified. The case study does not state the reporting period.",
      "Leads are counted as website submit applications; the case study does not report closed sales or revenue.",
    ],
    pdfUrl: "/case-studies/agency-lead-generation.pdf",
    placeholder: false,
  },
  {
    slug: "texas-solar",
    title: "Texas Solar Campaign: Direct Appointments at $15 CPL",
    industry: "Solar / Home Services",
    market: "Texas, USA",
    categories: ["acquisition"],
    services: [
      "Meta Ads",
      "Offer Strategy",
      "Lead Generation",
      "Appointment Scheduling",
    ],
    systemType: "Lead-gen and direct appointment system",
    summary:
      "136 website applications at $13.72 and 36 Meta leads at $15.09 for a Texas solar company (Jul 2025).",
    oneLiner:
      "136 website applications at $13.72 and 36 Meta leads at $15.09 for a Texas solar company (Jul 2025).",
    problem: "",
    context:
      "A lead-generation system built to attract high-intent solar prospects and turn them into direct appointment opportunities in Texas for a Texas solar company.",
    diagnosis: "",
    move: "",
    strategy:
      "Role: lead generation & performance marketing and offer creation. The engagement proved that a strong offer lowers acquisition friction, better targeting improves lead quality, and clear communication drives scalable results.",
    built:
      "High-impact offer creation; precise audience targeting; communication-driven ad psychology; a lead-gen flow that captured bill details, property info and installation interest.",
    system:
      "High-impact offer creation; precise audience targeting; communication-driven ad psychology; a lead-gen flow that captured bill details, property info and installation interest.",
    implementation:
      "Two Meta campaigns ran Jul 1-31, 2025: a funnel form campaign ('Funnel Form - Texas - 25th July 2025') and a lead form campaign ('Lead Form - Texas - 25th July 2025'). Skills & deliverables: appointment scheduling, paid media, social media advertising, lead generation and lead generation strategy.",
    outcome:
      '"The campaign generated a stable flow of sales-ready solar opportunities and helped create stronger conversations for the sales team." Why it worked: clear messaging for homeowners, better lead intent before handoff, and a scalable acquisition system.',
    result:
      '"The campaign generated a stable flow of sales-ready solar opportunities and helped create stronger conversations for the sales team." Why it worked: clear messaging for homeowners, better lead intent before handoff, and a scalable acquisition system.',
    metrics: [
      {
        label: "Website Applications",
        value: "136",
        context: "Funnel form campaign",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Cost Per Website Application",
        value: "$13.72",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Spend",
        value: "$1,866.50",
        context: "Funnel form campaign",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Meta Leads",
        value: "36",
        context: "Lead form campaign",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Cost Per Meta Lead",
        value: "$15.09",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Spend",
        value: "$543.10",
        context: "Lead form campaign",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Headline CPL",
        value: "$15 CPL",
        context: "Cover headline",
        source: "Results stated in the case study PDF",
        qualification: "Rounded from the $15.09 cost per lead of the lead form campaign.",
      },
    ],
    cover: {
      url: "/case-studies/texas-solar-cover.webp",
      alt: "Cover of the Madvert Labs case study: Texas Solar Campaign: Direct Appointments at $15 CPL",
      width: 1000,
      height: 1777,
    },
    gallery: [
      {
        url: "/case-studies/texas-solar-1.webp",
        alt: "Performance snapshot: 136 website applications at $13.72, 36 Meta leads at $15.09, with Ads Manager campaign screenshot (Jul 2025)",
        width: 1200,
        height: 2132,
      },
      {
        url: "/case-studies/texas-solar-2.webp",
        alt: "Project overview: role, what was built and why it worked for the Texas solar campaign",
        width: 1200,
        height: 2132,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    period: "1 July to 31 July 2025",
    limitations: [
      "The figures cover 1 to 31 July 2025, as shown in the Meta Ads Manager screenshot in the case study PDF.",
      "The $15 CPL in the headline is rounded from the $15.09 cost per lead of the lead form campaign. The separate funnel form campaign cost $13.72 per website application, so the two results measure different lead types.",
      "The client is not named in the case study, and the case study reports lead volume and cost, not installations or revenue.",
    ],
    pdfUrl: "/case-studies/texas-solar.pdf",
    placeholder: false,
  },
  {
    slug: "tap-center-fitness",
    title: "8-9% CTR Fitness Ad Campaign: High-Intent Leads Without Funnels",
    client: "TAP Center",
    industry: "Fitness / Sports / Wellness",
    categories: ["acquisition"],
    services: ["Meta Ads", "Offer Strategy", "Lead Generation"],
    systemType: "Meta lead ads campaign (no funnel)",
    summary:
      "8-9% CTR and 145 Meta leads at PKR 29.41 for TAP Center using strong offers and clean lead ads.",
    oneLiner:
      "8-9% CTR and 145 Meta leads at PKR 29.41 for TAP Center using strong offers and clean lead ads.",
    problem:
      "Fitness brands often see only 2-3% CTR and inconsistent lead quality.",
    challenge:
      "Fitness brands often see only 2-3% CTR and inconsistent lead quality.",
    context:
      "A performance marketing campaign for TAP Center using strong offer creation, ad psychology and clean lead ads to drive CTR and high-intent fitness leads, without funnels.",
    diagnosis: "",
    move: "",
    strategy:
      "Key strategy pillars: (1) Offer creation, the biggest lever: compelling, program-specific offers drove attention; (2) Ad psychology: emotional messaging and desire-driven hooks increased response; (3) Clean lead ads: no funnel complexity, just clear, friction-light lead capture; (4) Demand quality: strong lead intent led to better conversations and rising demand.",
    built:
      "Stronger offers for MMA, gymnastics and fitness programs, with ad psychology, emotional hooks and clean lead ads.",
    system:
      "Stronger offers for MMA, gymnastics and fitness programs, with ad psychology, emotional hooks and clean lead ads.",
    implementation:
      "Role: performance marketer & ad strategist. Meta lead form campaign ('Strong Her | Form | 29th Sept') with ad variants (News, NEWS, Offer, News 2, Offer 2). Key skills: lead generation, social media advertising, paid media, product offering, lead generation strategy.",
    outcome:
      'High-intent leads, increased demand, and expanded class capacity. "Most campaigns run at 2-3% CTR. This campaign reached 8-9% CTR."',
    result:
      'High-intent leads, increased demand, and expanded class capacity. "Most campaigns run at 2-3% CTR. This campaign reached 8-9% CTR."',
    metrics: [
      {
        label: "CTR",
        value: "8-9%",
        source: "Results stated in the case study PDF",
        qualification: "Not visible in the Ads Manager screenshot.",
      },
      {
        label: "Meta Leads",
        value: "145",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Cost Per Meta Lead",
        value: "PKR 29.41",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Spend",
        value: "PKR 4,265",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Typical fitness CTR",
        value: "2-3%",
        context: "Industry comparison stated in PDF",
        source: "Results stated in the case study PDF",
        qualification: "Comparison stated in the case study, not an independent benchmark.",
      },
    ],
    cover: {
      url: "/case-studies/tap-center-fitness-cover.webp",
      alt: "Cover of the Madvert Labs case study: 8-9% CTR Fitness Ad Campaign: High-Intent Leads Without Funnels",
      width: 1000,
      height: 1777,
    },
    gallery: [
      {
        url: "/case-studies/tap-center-fitness-1.webp",
        alt: "Why it worked: 8-9% CTR, 145 Meta leads at PKR 29.41, PKR 4,265 spend, plus four strategy pillars",
        width: 1200,
        height: 2132,
      },
      {
        url: "/case-studies/tap-center-fitness-2.webp",
        alt: "Project overview: challenge, what we did, outcome and the 2-3% vs 8-9% CTR insight",
        width: 1200,
        height: 2132,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    limitations: [
      "The 8-9% CTR is stated in the case study but is not visible in the Meta Ads Manager screenshot, which shows leads, cost per lead and spend only.",
      "The 2-3% CTR comparison is the typical fitness CTR stated in the case study, not an independent benchmark.",
      "Money figures are in Pakistani rupees (PKR). The case study does not state the country or the reporting period beyond the campaign name.",
    ],
    pdfUrl: "/case-studies/tap-center-fitness.pdf",
    placeholder: false,
  },
  {
    slug: "cellsol-energy",
    title: "Scaled Solar Brand to 200+ Qualified Leads/Day at Rs. 10 CPL",
    client: "Cellsol Energy",
    industry: "Solar / Renewable Energy",
    categories: ["acquisition"],
    services: [
      "Meta Ads",
      "Offer Strategy",
      "Lead Generation",
      "Lead Management",
    ],
    systemType: "Direct lead ads system (no funnels)",
    summary:
      "200+ qualified leads per day at ~Rs. 10 CPL for Cellsol Energy; the client expanded its sales team.",
    oneLiner:
      "200+ qualified leads per day at ~Rs. 10 CPL for Cellsol Energy; the client expanded its sales team.",
    problem:
      "A highly competitive solar market where lead costs were high for most players; the client needed a consistent flow of qualified leads.",
    challenge:
      "A highly competitive solar market where lead costs were high for most players; the client needed a consistent flow of qualified leads.",
    context:
      "A high-converting solar lead generation system for Cellsol Energy built through strong offer creation, precise targeting and performance-focused Meta advertising.",
    diagnosis: "",
    move: "",
    strategy:
      "Focus areas: (1) powerful offer creation: an irresistible, benefit-driven solar offer; (2) high-impact creatives: clear messaging and real-life visuals; (3) precise targeting: location, interest and behavior-based, focused on high-intent audiences with property ownership signals.",
    built:
      "A high-converting solar offer that drove mass interest; simple, benefit-driven ad creatives; precise targeting; direct lead ads with optimized communication and follow-up (no funnels).",
    system:
      "A high-converting solar offer that drove mass interest; simple, benefit-driven ad creatives; precise targeting; direct lead ads with optimized communication and follow-up (no funnels).",
    implementation:
      "Services delivered: lead generation, lead gen strategy, lead management, Facebook advertising and social media advertising. Sample campaign: 'Agricultural Solar Campaign' (Meta lead ads).",
    outcome:
      '200+ qualified leads per day at ~Rs. 10 CPL. "Lead quality was so high that the client expanded their sales team." High-quality, sales-ready leads.',
    result:
      '200+ qualified leads per day at ~Rs. 10 CPL. "Lead quality was so high that the client expanded their sales team." High-quality, sales-ready leads.',
    metrics: [
      {
        label: "Qualified Leads/Day",
        value: "200+",
        source: "Results stated in the case study PDF",
        qualification: "Headline figure; not shown in the screenshot.",
      },
      {
        label: "CPL",
        value: "~Rs. 10",
        source: "Results stated in the case study PDF",
        qualification: "Rounded; the screenshot shows PKR 9.12.",
      },
      {
        label: "Total Leads",
        value: "569",
        context: "Sample campaign (Agricultural Solar Campaign)",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Cost Per Lead",
        value: "Rs. 9.12",
        context: "PKR9.12 cost per Meta lead in screenshot",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Total Ad Spend",
        value: "Rs. 5,186.94",
        context: "PKR5,186.94 in screenshot",
        source: "Meta Ads Manager screenshot in the case study PDF",
      },
      {
        label: "Our CTR",
        value: "8-9%",
        context: "vs industry avg. 2-3%",
        source: "Results stated in the case study PDF",
        qualification: "Not backed by a screenshot in the case study.",
      },
    ],
    cover: {
      url: "/case-studies/cellsol-energy-cover.webp",
      alt: "Cover of the Madvert Labs case study: Scaled Solar Brand to 200+ Qualified Leads/Day at Rs. 10 CPL",
      width: 1000,
      height: 1777,
    },
    gallery: [
      {
        url: "/case-studies/cellsol-energy-1.webp",
        alt: "Approach and results: 569 total leads, Rs. 10 cost per lead, 200+ leads per day, with Agricultural Solar Campaign screenshot",
        width: 1200,
        height: 2132,
      },
      {
        url: "/case-studies/cellsol-energy-2.webp",
        alt: "The challenge, focus areas and result: 569 leads at Rs. 9.12 and Rs. 5,186.94 spend for Cellsol Energy",
        width: 1200,
        height: 2132,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    limitations: [
      "The 200+ qualified leads per day and the ~Rs. 10 CPL are headline figures stated in the case study. The Meta Ads Manager screenshot shows one sample campaign (Agricultural Solar Campaign): 569 leads at PKR 9.12 on PKR 5,186.94 spend.",
      "The 8-9% CTR and the 2-3% industry average are stated in the case study and are not backed by a screenshot.",
      "Money figures are in Pakistani rupees. The case study does not state the country or the reporting period.",
    ],
    pdfUrl: "/case-studies/cellsol-energy.pdf",
    placeholder: false,
  },
  {
    slug: "bookkeeping-appointments",
    title: "Qualified Bookkeeping Appointments From International Traffic",
    industry: "Financial Services / Bookkeeping",
    market: "International (Pakistan-based company)",
    categories: ["acquisition", "studios"],
    services: ["Meta Ads", "Offer Strategy", "Video", "Funnel / Qualification"],
    systemType: "International acquisition system with qualification funnel",
    summary:
      "35 qualified bookkeeping inquiries from international traffic at $57.51 each, on $2,012.70 ad spend.",
    oneLiner:
      "35 qualified bookkeeping inquiries from international traffic at $57.51 each, on $2,012.70 ad spend.",
    problem: "",
    context:
      "An international acquisition system for a Pakistan-based financial services (bookkeeping) company, built using offer engineering, video creative and a qualification funnel. Client identity withheld for confidentiality.",
    diagnosis: "",
    move: "",
    strategy:
      "Research before advertising (validated demand, angles and positioning); offer before targeting (an irresistible offer first); creative that sold the next step (ads and videos focused on the free trial, not features); qualification before sales (a simple funnel filtered serious, high-intent leads).",
    built:
      "Market research (identified a high-intent audience and messaging); offer engineering (a clear, low-friction offer); video creative (short-form videos that explain the offer and build trust); qualification funnel (filtered in serious business owners only); booked appointments (qualified inquiries delivered). A mix of static ads and short-form video content.",
    system:
      "Market research (identified a high-intent audience and messaging); offer engineering (a clear, low-friction offer); video creative (short-form videos that explain the offer and build trust); qualification funnel (filtered in serious business owners only); booked appointments (qualified inquiries delivered). A mix of static ads and short-form video content.",
    implementation:
      "Flow: video + offer (attention-grabbing content with a clear offer) -> qualification questions (filtered for serious, qualified business owners) -> appointment (qualified bookkeeping inquiries booked directly into the client's calendar). Built and managed by a Pakistan-based team. Role: lead generation strategy, offer architecture, paid social, video creative direction, qualification funnel design.",
    outcome:
      '"This campaign generated 35 qualified bookkeeping inquiries at a cost of $57.51 per inquiry, with a total ad spend of $2,012.70, designed to move prospects toward booked appointments."',
    result:
      '"This campaign generated 35 qualified bookkeeping inquiries at a cost of $57.51 per inquiry, with a total ad spend of $2,012.70, designed to move prospects toward booked appointments."',
    metrics: [
      {
        label: "Qualified Inquiries",
        value: "35",
        source: "Results stated in the case study PDF",
      },
      {
        label: "Cost Per Qualified Inquiry",
        value: "$57.51",
        source: "Results stated in the case study PDF",
      },
      {
        label: "Ad Spend",
        value: "$2,012.70",
        source: "Results stated in the case study PDF",
      },
      {
        label: "Video views",
        value: "124K / 98K / 76K",
        context: "View counts shown on three short-form creatives",
        source: "View counts displayed on the creatives in the case study PDF",
      },
    ],
    cover: {
      url: "/case-studies/bookkeeping-appointments-cover.webp",
      alt: "Cover of the Madvert Labs case study: Qualified Bookkeeping Appointments From International Traffic",
      width: 1000,
      height: 1777,
    },
    gallery: [
      {
        url: "/case-studies/bookkeeping-appointments-1.webp",
        alt: "Results page: 35 qualified inquiries at $57.51 each, $2,012.70 ad spend, performance chart, static and video ad creatives",
        width: 1200,
        height: 2132,
      },
      {
        url: "/case-studies/bookkeeping-appointments-2.webp",
        alt: "What we built: five-step system from market research to booked appointments, plus static and video ad creatives",
        width: 1200,
        height: 2132,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition", "studios"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    limitations: [
      "The client identity is withheld for confidentiality in the case study.",
      "The case study describes the audience as international traffic and does not list the target countries or the reporting period.",
      "The figures count qualified inquiries. The case study does not state how many inquiries became booked appointments or customers.",
      "Video view counts are the numbers displayed on three short-form creatives, not campaign totals.",
    ],
    pdfUrl: "/case-studies/bookkeeping-appointments.pdf",
    placeholder: false,
  },
  {
    slug: "dubai-real-estate-nigeria",
    title:
      "Dubai Real Estate Investor Campaign: 142 BANT-Qualified Investor Leads from Nigeria at AED 4.17 CPL",
    industry: "Real Estate",
    market: "Dubai, UAE (targeting investors in Nigeria)",
    categories: ["acquisition", "automation"],
    services: ["Meta Ads", "Offer Strategy", "Creative", "CRM"],
    systemType: "Cross-border investor lead generation with CRM delivery",
    summary:
      "142 BANT-qualified Nigerian investor leads for a Dubai real estate company at AED 4.17 CPL.",
    oneLiner:
      "142 BANT-qualified Nigerian investor leads for a Dubai real estate company at AED 4.17 CPL.",
    problem:
      "Reach and attract high-intent Nigerian investors for a Dubai real estate project in a competitive market. The client needed serious, high-intent investors, not random real estate leads.",
    challenge:
      "Reach and attract high-intent Nigerian investors for a Dubai real estate project in a competitive market. The client needed serious, high-intent investors, not random real estate leads.",
    context:
      "A Dubai real estate company wanted qualified investors from Nigeria for a Dubai real estate project.",
    diagnosis: "",
    move: "",
    strategy:
      "Went beyond running random leads: engineered the offer, built premium assets and ad angles, and used future-facing messaging, reverse engineering and risk reversal to attract serious investors from Nigeria. Focused on lead quality over volume.",
    built:
      "A compelling offer with clear investor benefits; high-converting ad creatives and angles (images & messaging); future-focused positioning; reverse engineering of audience motivations; risk reversal to reduce hesitation; precise targeting of Nigerian investors.",
    system:
      "A compelling offer with clear investor benefits; high-converting ad creatives and angles (images & messaging); future-focused positioning; reverse engineering of audience motivations; risk reversal to reduce hesitation; precise targeting of Nigerian investors.",
    implementation:
      "Every lead was screened against BANT: Budget (can afford the project / down payment, e.g. 10%), Authority (decision-maker or serious investor), Need/Nature (genuine interest in Dubai property investment: home, ROI or residency) and Timeline (ready or reasonably near-term buying intent). Qualified leads, with qualification data such as budget, timeline and investment goals, were delivered directly into the client's CRM for immediate follow-up by the sales team.",
    outcome:
      '"We generated 142 BANT-qualified investor leads from Nigeria through a strategic offer, premium creatives and a results-driven ad system, with qualified leads delivered directly into the client\'s CRM."',
    result:
      '"We generated 142 BANT-qualified investor leads from Nigeria through a strategic offer, premium creatives and a results-driven ad system, with qualified leads delivered directly into the client\'s CRM."',
    metrics: [
      {
        label: "BANT-Qualified Investor Leads",
        value: "142",
        source: "Meta Ads results shown in the case study PDF",
      },
      {
        label: "Cost Per Lead",
        value: "AED 4.17",
        source: "Meta Ads results shown in the case study PDF",
      },
      {
        label: "Total Ad Spend",
        value: "AED 591.58",
        source: "Meta Ads results shown in the case study PDF",
      },
    ],
    cover: {
      url: "/case-studies/dubai-real-estate-nigeria-cover.webp",
      alt: "Cover of the Madvert Labs case study: Dubai Real Estate Investor Campaign: 142 BANT-Qualified Investor Leads from Nigeria at AED 4.17 CPL",
      width: 1000,
      height: 1777,
    },
    gallery: [
      {
        url: "/case-studies/dubai-real-estate-nigeria-1.webp",
        alt: "Challenge, approach, what we built, ad creative examples and results: 142 leads at AED 4.17, AED 591.58 spend",
        width: 1200,
        height: 2132,
      },
      {
        url: "/case-studies/dubai-real-estate-nigeria-2.webp",
        alt: "BANT qualification criteria with Meta Ads campaign results and investor-focused ad creatives",
        width: 1200,
        height: 2132,
      },
    ],
    datePublished: "2026-10-15",
    dateModified: "2026-10-15",
    serviceKeys: ["meta-ads", "client-acquisition", "automation-revenue-systems"],
    channels: ["Meta Ads (Facebook and Instagram)"],
    limitations: [
      "The client is named only as a Dubai real estate company.",
      "Money figures are in UAE dirhams (AED). The case study does not state the reporting period.",
      "BANT qualification follows the criteria described in the case study. The case study does not report property sales.",
    ],
    pdfUrl: "/case-studies/dubai-real-estate-nigeria.pdf",
    placeholder: false,
  },
  {
    slug: "dubai-interior-design",
    title: "111 Qualified Interior Design Inquiries at AED 93 Per Inquiry",
    client: "Casa Elegance Interiors",
    industry: "Luxury Interior Design",
    market: "Dubai, UAE",
    categories: ["acquisition", "studios"],
    services: ["Meta Ads", "Offer Strategy", "Video", "Funnel / Qualification"],
    systemType: "Video-ad acquisition system with qualification funnel and consultation booking",
    summary:
      "111 qualified interior design inquiries for a Dubai luxury interior design company at AED 93.02 per inquiry, on AED 10,325.19 spend.",
    oneLiner:
      "111 qualified interior design inquiries for a Dubai luxury interior design company at AED 93.02 per inquiry, on AED 10,325.19 spend.",
    problem:
      "The company was struggling to generate leads. It needed serious interior-design prospects with fully qualified project quotations, not just names and phone numbers.",
    challenge:
      "The company was struggling to generate leads. It needed serious interior-design prospects with fully qualified project quotations, not just names and phone numbers.",
    context:
      "Casa Elegance Interiors, a luxury interior design company in Dubai, UAE. Madvert Labs built a high-converting offer, a video-ad campaign, a qualification funnel and a consultation-booking journey.",
    diagnosis: "",
    move: "",
    strategy:
      "A complete, high-converting ad system designed to attract serious interior-design prospects, built in four steps: (1) market research: studied Dubai interior buyers, pain points and buying triggers; (2) offer engineering: crafted a compelling consultation-focused offer, not a generic ad; (3) creative production: scriptwriting, shoot direction, video editing and ad creative variations; (4) campaign launch: deployed the ad system to drive high-intent prospects into the funnel.",
    built:
      "Video ads (Instagram video creatives, e.g. \"Planning to renovate your home in Dubai, Sharjah, or Ajman?\" and \"Get Your Interior Design Cost in 2 Minutes\"); a six-step qualification funnel with an estimate flow; and a consultation-booking journey ending in a free 1-on-1 consultation.",
    system:
      "Video ads (Instagram video creatives, e.g. \"Planning to renovate your home in Dubai, Sharjah, or Ajman?\" and \"Get Your Interior Design Cost in 2 Minutes\"); a six-step qualification funnel with an estimate flow; and a consultation-booking journey ending in a free 1-on-1 consultation.",
    implementation:
      "Every inquiry was qualified through a structured consultation-booking journey: (1) property type (apartment, villa, townhouse, commercial); (2) property details (area, bedrooms, bathrooms); (3) project scope (light upgrade, standard renovation, full turnkey fitout); (4) finish level (essential, premium, signature); (5) estimate review; (6) book a free consultation (date and time for a 1-on-1 consultation). Each inquiry that reached the client was fully qualified, with property type, area size, bedrooms and bathrooms, drawings availability, project status, project scope, finish level, timeline to start and a confirmed consultation booking.",
    outcome:
      '"A complete growth system that turned targeted video ads into qualified inquiries and booked consultations for a Dubai luxury interior design company." "For a Dubai interior design business with project values in the tens of thousands of dirhams, an AED 93 qualified inquiry was a highly profitable outcome."',
    result:
      '"A complete growth system that turned targeted video ads into qualified inquiries and booked consultations for a Dubai luxury interior design company." "For a Dubai interior design business with project values in the tens of thousands of dirhams, an AED 93 qualified inquiry was a highly profitable outcome."',
    metrics: [
      {
        label: "Qualified Inquiries",
        value: "111",
        source: "Performance overview screenshot in the case study PDF",
        qualification: "Shown in the performance overview as Leads (Form): 111.",
      },
      {
        label: "Cost Per Inquiry",
        value: "AED 93.02",
        source: "Performance overview screenshot in the case study PDF",
        qualification: "Shown in the performance overview as Per lead (form). The headline rounds it to AED 93.",
      },
      {
        label: "Total Spend",
        value: "AED 10,325.19",
        source: "Performance overview screenshot in the case study PDF",
      },
    ],
    cover: {
      url: "/case-studies/dubai-interior-design-cover.webp",
      alt: "Cover of the Madvert Labs case study: Luxury Interior Design, Dubai, UAE, fully qualified interior design project quotations through a full funnel",
      width: 1000,
      height: 1778,
    },
    gallery: [
      {
        url: "/case-studies/dubai-interior-design-1.webp",
        alt: "Results page: 111 qualified inquiries at AED 93.02 per inquiry, AED 10,325.19 total spend, performance overview screenshot and why it worked",
        width: 1200,
        height: 2133,
      },
      {
        url: "/case-studies/dubai-interior-design-2.webp",
        alt: "Qualification funnel: six steps from property type to a booked free consultation, and the project details the client received",
        width: 1200,
        height: 2133,
      },
    ],
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    serviceKeys: ["meta-ads", "client-acquisition", "studios"],
    channels: ["Meta Ads (Instagram video ads)"],
    limitations: [
      "Money figures are in UAE dirhams (AED). The case study does not state the reporting period; the performance chart runs from 15 Jul without showing a year.",
      "The figures count qualified form leads. The case study does not state how many consultations were booked or how many projects were won.",
      "Project values in the tens of thousands of dirhams are the case study's own description, not a reported figure.",
    ],
    pdfUrl: "/case-studies/dubai-interior-design.pdf",
    placeholder: false,
  },
  {
    slug: "earthly-elementals",
    title: "Private Label Health Brand: 162 Website Purchases at Rs 844.57 Per Purchase",
    client: "Earthly Elementals PK",
    industry: "Health & Wellness (Private Label E-commerce)",
    market: "Pakistan",
    categories: ["acquisition", "studios"],
    services: ["Meta Ads", "Creative Strategy", "Influencer / DVC Content", "Landing Page Optimization"],
    systemType: "Private label e-commerce growth system",
    summary:
      "162 website purchases for a private label Shilajit brand at Rs 844.57 per purchase, on Rs136,820.57 spend.",
    oneLiner:
      "162 website purchases for a private label Shilajit brand at Rs 844.57 per purchase, on Rs136,820.57 spend.",
    problem: "",
    context:
      "Earthly Elementals PK (earthlyelementals.pk), a private label health and wellness brand selling Pure Himalayan Shilajit resin online. Madvert Labs delivered strategy, creatives and scaling as a private label e-commerce growth strategy.",
    diagnosis: "",
    move: "",
    strategy:
      "Deep work on creative strategy to identify which angles work and which do not: angle research (tested health, energy, stamina and trust angles); influencer collaborations (creators and collaborations to build relatability); DVC shoots (direct response video creatives and product visuals); creative testing (multiple hooks, formats and messages); and a content ecosystem (paid ads supported by strong organic-style content).",
    built:
      "A complete private label e-commerce growth system: creative strategy, influencer and DVC content, landing page optimization and scalable e-commerce growth. Supporting elements: FDA, ISO and GMP positioning; 85+ essential minerals messaging; trust-building product education; offer and USP highlighting; and a conversion-focused product page.",
    system:
      "A complete private label e-commerce growth system: creative strategy, influencer and DVC content, landing page optimization and scalable e-commerce growth. Supporting elements: FDA, ISO and GMP positioning; 85+ essential minerals messaging; trust-building product education; offer and USP highlighting; and a conversion-focused product page.",
    implementation:
      "Creative strategy + content + landing page optimization = scalable e-commerce growth. Ad creatives used angles such as \"Natural Energy, Real Results\", \"85+ Essential Minerals\" (more energy, better stamina, sharper focus, natural support) and \"Real People, Real Results\" creator content, driving traffic to a conversion-focused product page on earthlyelementals.pk.",
    outcome:
      "162 website purchases at Rs 844.57 cost per purchase, with Rs136,820.57 amount spent, as shown in the ads dashboard screenshot in the case study.",
    result:
      "162 website purchases at Rs 844.57 cost per purchase, with Rs136,820.57 amount spent, as shown in the ads dashboard screenshot in the case study.",
    metrics: [
      {
        label: "Website Purchases",
        value: "162",
        source: "Ads dashboard screenshot in the case study PDF",
      },
      {
        label: "Cost Per Purchase",
        value: "Rs 844.57",
        source: "Ads dashboard screenshot in the case study PDF",
      },
      {
        label: "Amount spent",
        value: "Rs136,820.57",
        source: "Ads dashboard screenshot in the case study PDF",
      },
    ],
    cover: {
      url: "/case-studies/earthly-elementals-cover.webp",
      alt: "Cover of the Madvert Labs x Earthly Elementals case study: Private Label Health Brand, with 162 website purchases at Rs844.57 per purchase",
      width: 1000,
      height: 1778,
    },
    gallery: [
      {
        url: "/case-studies/earthly-elementals-1.webp",
        alt: "Earthly Elementals PK results: 162 website purchases at Rs 844.57 cost per purchase, Pure Himalayan Shilajit product",
        width: 1200,
        height: 2133,
      },
      {
        url: "/case-studies/earthly-elementals-2.webp",
        alt: "Creative strategy: influencer and product ad creatives, angle research, influencer collabs, DVC shoots, creative testing and content ecosystem",
        width: 1200,
        height: 2133,
      },
    ],
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    serviceKeys: ["meta-ads", "client-acquisition", "studios", "conversion"],
    channels: ["Meta Ads"],
    limitations: [
      "Money figures are in Pakistani rupees (Rs). The case study does not state the reporting period.",
      "The figures come from a single ads dashboard screenshot; the case study does not report revenue, return on ad spend or repeat purchases.",
      "FDA, ISO and GMP claims and product benefits are the brand's own positioning shown in the case study, not claims verified by Madvert Labs.",
    ],
    pdfUrl: "/case-studies/earthly-elementals.pdf",
    placeholder: false,
  },
];

export { leadMagnets as fallbackResources } from "@/content/lead-magnets";

/**
 * Video testimonials. The first two are real client videos (names, roles, businesses and quotes
 * are taken from the videos' own captions; the business name for Azeem Qadir was confirmed by
 * the client). The remaining slots are bracketed placeholders until more videos are supplied.
 */
const realTestimonials: Testimonial[] = [
  {
    id: "azeem-qadir",
    name: "Muhammad Azeem Qadir",
    role: "CEO & Founder",
    business: "The Event Planet",
    industry: "Events",
    quote: "From my side, it's 10 out of 10 for these people.",
    videoUrl: "/video/testimonials/azeem-qadir-the-event-planet.mp4",
    posterUrl: "/video/testimonials/azeem-qadir-the-event-planet-poster.webp",
    duration: "1:55",
  },
  {
    id: "saniya-khan",
    name: "Saniya Khan",
    role: "Owner",
    business: "DE Wooden Spoon",
    industry: "Home Chef Business",
    quote: "Now, MashaAllah, we get 5 to 6 orders a day. I would definitely recommend Usama and Madvert Labs.",
    videoUrl: "/video/testimonials/de-wooden-spoon.mp4",
    posterUrl: "/video/testimonials/de-wooden-spoon-poster.webp",
    duration: "1:51",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  ...realTestimonials,
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `t${i + 1}`,
    quote: "[Short client quote]",
    name: "[Client name]",
    business: "[Business]",
    industry: "[Industry]",
    market: "[Market]",
    duration: "[0:00]",
    placeholder: true,
  })),
];

export const fallbackProof: ProofItem[] = [
  { kind: "campaign", label: "[REAL CAMPAIGN SCREENSHOT]", placeholder: true },
  { kind: "crm", label: "[REAL CRM SCREENSHOT]", placeholder: true },
  { kind: "creative", label: "[REAL CREATIVE WORK]", placeholder: true },
  {
    kind: "certification",
    label: "[REAL META CERTIFICATION]",
    placeholder: true,
  },
  {
    kind: "certification",
    label: "[REAL GOOGLE CERTIFICATION]",
    placeholder: true,
  },
  { kind: "video", label: "[REAL CLIENT VIDEO]", placeholder: true },
];

export const fallbackTeam: TeamMember[] = [
  { name: "Usama Abbas Dahri", role: "Founder", photo: founderPhoto },
  { name: "[TEAM MEMBER]", role: "[ROLE]", placeholder: true },
  { name: "[TEAM MEMBER]", role: "[ROLE]", placeholder: true },
  { name: "[TEAM MEMBER]", role: "[ROLE]", placeholder: true },
];

export const fallbackPortfolio: PortfolioProject[] = [
  {
    slug: "static-1",
    title: "[REAL STATIC AD]",
    format: "Static",
    placeholder: true,
  },
  {
    slug: "motion-1",
    title: "[REAL MOTION AD]",
    format: "Motion",
    placeholder: true,
  },
  {
    slug: "explainer-1",
    title: "[REAL EXPLAINER]",
    format: "Explainer",
    placeholder: true,
  },
  {
    slug: "cinematic-1",
    title: "[REAL CINEMATIC FILM]",
    format: "Cinematic",
    placeholder: true,
  },
  {
    slug: "talking-1",
    title: "[REAL TALKING HEAD]",
    format: "Talking Head",
    placeholder: true,
  },
  {
    slug: "ai-1",
    title: "[REAL AI COMMERCIAL]",
    format: "AI Commercial",
    placeholder: true,
  },
];

export const fallbackSettings: SiteSettings = {
  founderPhoto,
  heroImage: {
    url: "/images/usama-abbas-dahri-hero.webp",
    alt: "Usama Abbas Dahri, Founder of Madvert Labs",
    width: 800,
    height: 1000,
  },
  clientLogos: [],
  certifications: [],
};

export const fallbackFaqs: Record<string, Faq[]> = {
  home: [
    {
      q: "What does Madvert Labs do?",
      a: "Madvert Labs is a digital marketing and growth systems company. We connect branding, customer acquisition, conversion, creative production, automation and technology into one growth system for established businesses.",
    },
    {
      q: "Who is Madvert Labs for?",
      a: "Businesses that are already moving and want one growth partner instead of several disconnected vendors. We are a good fit when the problem crosses marketing, sales follow up, data and technology.",
    },
    {
      q: "Do you sell fixed packages?",
      a: "No. We diagnose the business problem first, then build what growth actually requires. Some clients need acquisition, some need conversion or automation, many need several connected pieces.",
    },
    {
      q: "How do we start?",
      a: "Book a business strategy call with Usama or send a growth brief. We review the business before the conversation and talk about the problem, not a generic package.",
    },
  ],
  "branding-marketing": [
    {
      q: "What is included in branding and marketing at Madvert?",
      a: "Brand strategy, visual identity, logo systems, brand guidelines, creative direction, social media management, digital PR, influencer marketing and 360 degree campaign execution.",
    },
    {
      q: "Do you only design logos?",
      a: "No. A logo is one piece of the evidence. We build the identity system and then execute it across social, website, photography, publications and campaigns so every touchpoint feels like one company.",
    },
    {
      q: "How do you measure brand work?",
      a: "Through consistency across touchpoints, brand search demand, enquiry quality, content performance and how easily sales conversations move. We agree the measures before work starts.",
    },
  ],
  "client-acquisition": [
    {
      q: "What does client acquisition include?",
      a: "Paid acquisition across Meta and Google, retargeting, SEO, local SEO, content SEO, AEO and AI search visibility, digital PR, and lead qualification built into forms and follow up.",
    },
    {
      q: "Do you optimise for cost per lead?",
      a: "We optimise for qualified opportunities. A lower cost per lead means very little if the sales team cannot use the leads, so we track quality signals through to booked calls and revenue where possible.",
    },
    {
      q: "What is AI search visibility?",
      a: "Making sure your business is understood and cited when people ask tools like ChatGPT, Gemini or Google AI answers for recommendations. It relies on clear entities, consistent information, useful content and third party mentions.",
    },
    {
      q: "Paid or organic: which should we start with?",
      a: "Paid gives you speed. Organic builds an asset you own. Most businesses need both, weighted by how urgently they need demand and how long they can invest.",
    },
  ],
  conversion: [
    {
      q: "What does conversion work include?",
      a: "Website design and development, UI and UX, landing pages, conversion copy, offer development and ongoing conversion rate optimisation.",
    },
    {
      q: "Should we fix conversion before buying more traffic?",
      a: "Usually yes. Improving the journey for traffic you already pay for changes the economics of every future campaign.",
    },
    {
      q: "Do you guarantee conversion rates?",
      a: "No. We identify friction, test improvements and report what changed. Honest measurement is more useful than a promised number.",
    },
  ],
  studios: [
    {
      q: "What does Madvert Studios produce?",
      a: "Static ads, motion ads, explainers, cinematic brand films, talking head content, AI commercials, AI influencer content and real world production with people.",
    },
    {
      q: "Is the creative made for performance?",
      a: "Yes. Every piece is built to stop the scroll, explain the value and earn attention within the first seconds, then tested in market.",
    },
  ],
  "automation-revenue-systems": [
    {
      q: "What is a revenue system?",
      a: "The connected set of CRM, response, qualification, follow up, booking and tracking that moves every enquiry towards a decision and tells you why it stopped if it does.",
    },
    {
      q: "Which tools do you work with?",
      a: "We work with platforms such as GoHighLevel and HubSpot, WhatsApp, calendar and booking tools, and custom integrations through webhooks, Zapier, Make or n8n. The tool follows the process, not the other way round.",
    },
    {
      q: "Will AI agents replace our sales team?",
      a: "No. AI agents respond instantly, qualify consistently and keep follow up moving so your team spends time on the conversations that matter.",
    },
  ],
  "tech-product-development": [
    {
      q: "What can Madvert build?",
      a: "Web apps, mobile apps, dashboards, calculators, client portals, internal tools, integrations and AI tools that remove repetitive work.",
    },
    {
      q: "Why would a marketing company build software?",
      a: "Because some growth problems are not marketing problems. When a tool is the answer, we design and build the tool instead of selling another campaign.",
    },
    {
      q: "How do tech projects start?",
      a: "With a tech opportunity audit: we map the bottleneck, the data and the existing tools, then recommend whether it needs marketing, automation or code.",
    },
  ],
};
