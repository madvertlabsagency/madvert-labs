import { fallbackCaseStudies } from "@/cms/fallback";
import { articlePath, articles } from "@/content/articles";
import { industryPages } from "@/content/industries";
import { founder, organization, serviceEntities } from "@/lib/entities";
import { absoluteUrl, office } from "@/lib/site";
import { approvedDescriptions, fullAddress } from "@/sections/facts/data";

/**
 * /llms.txt: a plain markdown summary of the site for AI assistants (llmstxt.org format).
 * Built from the same entity and content files as the pages, so it never says anything the site doesn't.
 */

export function GET() {
  const studies = fallbackCaseStudies.filter((s) => !s.placeholder);
  const lines = [
    `# ${organization.name}`,
    "",
    `> ${approvedDescriptions.oneSentence}`,
    "",
    `- Founder & CEO: ${founder.name} (${absoluteUrl(founder.path)})`,
    `- Office: ${fullAddress}`,
    `- Phone and WhatsApp: ${office.phone}`,
    `- Service area: Pakistan (Karachi first) and international clients`,
    `- Company facts: ${absoluteUrl("/about/facts")}`,
    "",
    "## Services",
    ...serviceEntities.map((s) => `- [${s.name}](${absoluteUrl(s.path)}): ${s.definition}`),
    "",
    "## Industries",
    ...industryPages.map((p) => `- [${p.serviceName}](${absoluteUrl(p.path)}): ${p.cardSummary}`),
    "",
    "## Case studies",
    ...studies.map((s) => `- [${s.title}](${absoluteUrl(`/case-studies/${s.slug}`)})`),
    "",
    "## Guides",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(articlePath(a))}): ${a.description}`),
    "",
    "## Optional",
    `- [Digital marketing agency in Karachi](${absoluteUrl("/digital-marketing-agency-karachi")})`,
    `- [Growth glossary](${absoluteUrl("/glossary")})`,
    `- [Cost per qualified lead calculator](${absoluteUrl("/tools/cost-per-qualified-lead-calculator")})`,
    `- [Press and media kit](${absoluteUrl("/press")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
