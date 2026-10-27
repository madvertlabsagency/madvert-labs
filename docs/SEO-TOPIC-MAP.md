# Topic Map (keyword → primary URL)

One search intent, one primary URL. The live version is `src/content/topic-map.ts`, which also drives the "Keep exploring" contextual links on every page in a cluster. Before creating a page, find its topic here. If a primary URL already serves the intent, improve that page instead.

| Cluster | Topic / search intent | Primary URL | Supporting pages |
|---|---|---|---|
| A. Full stack / external growth department | full stack digital marketing agency; outsourced marketing department; external growth department | `/services/digital-marketing` | `/glossary/external-growth-department`, `/glossary/full-stack-digital-marketing`, `/growth-systems`, `/glossary/growth-system`, `/insights/performance-marketing-vs-digital-marketing`, `/insights/how-to-choose-digital-marketing-agency-karachi`, `/digital-marketing-agency-karachi`, Earthly Elementals and Dubai interior design case studies |
| A | what is a growth system | `/growth-systems` | `/glossary/growth-system` (short definition), `/resources/growth-systems-audit` |
| A | digital marketing agency Karachi | `/digital-marketing-agency-karachi` | `/insights/how-to-choose-digital-marketing-agency-karachi` |
| B. Qualified lead generation | qualified lead generation; lead generation agency | `/services/client-acquisition` | `/glossary/qualified-lead`, `/glossary/lead-qualification-system`, `/insights/lead-generation-vs-qualified-lead-generation`, `/tools/cost-per-qualified-lead-calculator`, `/industries/*`, Dubai real estate case study, Qualified Lead Generation Playbook |
| B | what is a qualified lead | `/glossary/qualified-lead` | `/services/client-acquisition` |
| B | CPL vs CPQL; cost per qualified lead | `/tools/cost-per-qualified-lead-calculator` | `/glossary#cost-per-qualified-lead`, `/insights/lead-generation-vs-qualified-lead-generation` |
| B | qualified RFQ; custom patch leads; patch business lead generation | `/custom-patches` (offer), `/glossary/qualified-rfq` (definition) | |
| B | real estate / solar / home improvement lead generation | `/industries/real-estate`, `/industries/solar-energy`, `/industries/home-services` | matching case studies |
| C. Paid acquisition | Meta Ads agency; Facebook ads lead generation | `/services/meta-ads` | `/insights/meta-ads-lead-generation-pakistan`, `/insights/meta-ads-cost-pakistan`, Meta Ads pre-launch checklist, solar and fitness case studies |
| C | Google Ads agency | `/services/google-ads` | Texas solar case study |
| C | performance marketing agency; paid advertising | `/services/performance-marketing` | `/insights/performance-marketing-vs-digital-marketing` |
| C | Meta Ads for e-commerce | `/industries/ecommerce` | Earthly Elementals case study |
| D. SEO / AI SEO / AEO | AI SEO services; AEO services; ChatGPT visibility | `/services/ai-seo-aeo` | `/glossary/ai-seo`, `/glossary/aeo`, `/insights/what-is-aeo`, SEO and AI Search Playbook |
| D | SEO services Karachi / Pakistan | `/services/seo` | `/services/ai-seo-aeo` |
| D | what is AEO (long guide) | `/insights/what-is-aeo` | `/glossary/aeo` (short definition, links to the guide) |
| E. CRM / revenue response | CRM and marketing automation; WhatsApp follow up | `/services/automation-revenue-systems` | `/glossary/revenue-response-system`, `/glossary/lead-qualification-system`, Revenue Leakage Audit, Automated Lead Engine |
| E | AI lead response agent | `/services/ai-agents` | `/glossary/revenue-response-system` |
| F. Creative / branding | branding agency; brand strategy | `/services/branding-marketing` | Brand Perception Checklist, Build That Offer |
| F | ad creative and video production | `/studios` | Steal These Hooks, Stop the Scroll |
| F | social media management | `/services/social-media-management` | |
| G. Technology | custom software; AI systems | `/services/tech-product-development` | Tech Opportunity Audit, AI Content Automation Playbook |
| G | app development | `/services/app-development` | |
| G | web development; landing pages; CRO | `/services/web-development` (build), `/services/conversion` (CRO and funnels) | Landing Pages That Sell, Conversion Leak Checklist |
| White label | white label digital marketing; agency fulfillment partner; white label Meta Ads and lead generation | `/white-label-partnership` | Agency lead generation case study, `/services/digital-marketing` |

## Cannibalisation rules

- Glossary definition pages answer "what is X" in a few hundred words and link to the service page. They never pitch the service as the main content. The long guide (for example `/insights/what-is-aeo`) stays the in-depth answer.
- Location: only `/digital-marketing-agency-karachi` exists, because the Karachi office is real. No other city pages.
- Industries: a page exists only where a published case study backs it.

## Planned pages (do not publish until the content is approved)

Write each as an article in `src/content/articles.ts` with `status: "draft"`. Drafts are excluded from every route, the sitemap, IndexNow and `/llms.txt`. Remove the flag to publish.

| Planned page | Type | Cluster | Notes |
|---|---|---|---|
| Why Meta Leads Go Cold | Founder POV | B / E | Link to `/services/automation-revenue-systems` and `/glossary/revenue-response-system` |
| CPL vs CPQL | Comparison | B | Could live as a section of the calculator page instead of a new URL |
| What Makes a Lead Qualified? | Long guide | B | Only if it goes deeper than `/glossary/qualified-lead`; otherwise expand the glossary page |
| Agency vs In-House Marketing Team | Comparison | A | A short table already exists on `/glossary#agency-vs-in-house-vs-external-growth-department` |
| Meta Ads vs Google Ads | Comparison | C | |
| Digital Marketing Agency vs External Growth Department | Comparison | A | |
| SEO vs Paid Ads | Comparison | C / D | |
| Why Most Meta Lead Problems Are CRM Problems | Founder POV | E | |
| What an External Growth Department Does Week to Week | Founder POV | A | |
| The Offer Is the Real Campaign | Founder POV | F | Link to Build That Offer |
| Why Cheap Leads Can Be Expensive | Founder POV | B | |
