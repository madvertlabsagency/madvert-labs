/**
 * Insights published in the November 2026 batch, chosen from Search Console queries (AI SEO, AEO,
 * GEO) and the content plan (WhatsApp funnels). Same rules as articles.ts: no invented statistics,
 * results or prices; external facts are attributed and listed in `sources`. No em dashes.
 */
import type { Article } from "./articles";

const PUBLISHED = "2026-11-01";

const GOOGLE_AI_FEATURES = { title: "AI features and your website", publisher: "Google Search Central", url: "https://developers.google.com/search/docs/appearance/ai-features" };
const GOOGLE_AI_GUIDE = { title: "Optimizing your website for generative AI features on Google Search", publisher: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" };
const GOOGLE_HELPFUL = { title: "Creating helpful, reliable, people-first content", publisher: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" };
const GOOGLE_GEN_AI_CONTENT = { title: "Google Search's guidance on using generative AI content on your website", publisher: "Google Search Central", url: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" };
const OPENAI_PUBLISHERS = { title: "Publishers and developers FAQ (ChatGPT search)", publisher: "OpenAI Help Center", url: "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq" };
const OPENAI_BOTS = { title: "Overview of OpenAI crawlers", publisher: "OpenAI", url: "https://developers.openai.com/docs/bots" };
const WHATSAPP_MESSAGES = { title: "Send messages: customer service windows and template messages", publisher: "Meta for Developers (WhatsApp Business Platform)", url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages" };
const META_CAPI = { title: "Conversions API: get started", publisher: "Meta for Developers", url: "https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/" };

export const november2026Articles: Article[] = [
  /* ───────────────────────── ChatGPT ───────────────────────── */
  {
    slug: "how-to-optimize-website-for-chatgpt",
    title: "How to Optimize Your Website for ChatGPT Search",
    metaTitle: "How to Optimize Your Website for ChatGPT Search",
    description:
      "How ChatGPT Search finds and cites websites, the crawler you must not block, and the content, proof and tracking that make a business easier to recommend.",
    eyebrow: "AI Search Insight",
    answer: [
      "To optimize a website for ChatGPT Search, first make sure OpenAI's search crawler, OAI-SearchBot, is not blocked in robots.txt or by a firewall, because OpenAI only includes sites in ChatGPT search answers when that crawler can reach them. Then make each important page easy to quote: one clear topic, a direct answer at the top, specific facts, and proof such as case studies.",
      "Beyond your own site, keep the business's name, services and contact details consistent everywhere, and earn reviews and mentions on other websites. No one can guarantee that ChatGPT will cite a particular business; these steps make it possible and more likely.",
    ],
    author: "founder",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    sections: [
      {
        id: "access",
        label: "Step 1",
        title: "Let ChatGPT's search crawler in",
        blocks: [
          {
            type: "p",
            text: "OpenAI's [publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) says any public website can appear in ChatGPT search, but content is only included in summaries and snippets if the site does not block OAI-SearchBot. OpenAI runs several crawlers with different jobs, documented in its [crawler overview](https://developers.openai.com/docs/bots):",
          },
          {
            type: "table",
            caption: "OpenAI's crawlers and what they do",
            rowHeader: "User agent",
            columns: ["What it is for", "Block it?"],
            rows: [
              { label: "OAI-SearchBot", cells: ["Finding and showing sites in ChatGPT search results", "No, if you want to appear in ChatGPT search"] },
              { label: "ChatGPT-User", cells: ["Fetching a page when a ChatGPT user asks it to", "Usually no"] },
              { label: "GPTBot", cells: ["Collecting content that may be used to train models", "Your choice; blocking it does not remove you from ChatGPT search"] },
            ],
          },
          {
            type: "checklist",
            label: "Access check",
            items: [
              { text: "Open yourdomain.com/robots.txt and check nothing disallows OAI-SearchBot.", detail: "Madvert Labs names OAI-SearchBot explicitly in its own robots.txt so the choice is visible." },
              { text: "Check your firewall and CDN bot settings.", detail: "Options such as “block AI bots” can block search crawlers together with training crawlers." },
              { text: "Make sure important text is in the HTML.", detail: "Service details, prices or pricing logic and FAQs should not appear only after scripts run or inside images." },
              { text: "Submit a sitemap to Google Search Console and Bing Webmaster Tools.", detail: "AI assistants lean on web search indexes, and Bing also powers Microsoft Copilot." },
            ],
          },
        ],
      },
      {
        id: "content",
        label: "Step 2",
        title: "Make every important page easy to quote",
        blocks: [
          {
            type: "p",
            text: "ChatGPT answers questions. Pages that answer one question clearly are easier to use as a source than pages that say a little about everything.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**One page per service or question.** A Meta Ads page, a Google Ads page and an SEO page each answer a different buyer question.",
              "**Answer first.** Put a two to four sentence answer at the top that names the subject: who you are, what you do, for whom and where.",
              "**Be specific.** Locations served, what is included, how the process works, what affects the price, and what you do not do.",
              "**Show proof.** Case studies with real figures, dates and limitations; a named author; visible updated dates.",
              "**Use structure.** Question headings, tables, steps and visible FAQs, with structured data that matches what is on the page.",
            ],
          },
          {
            type: "callout",
            label: "Example",
            text: ["Madvert Labs publishes a [company fact sheet](/about/facts) with verified details and answers to the questions people ask about the business, so an assistant summarising the company has one consistent source."],
          },
        ],
      },
      {
        id: "trust",
        label: "Step 3",
        title: "Build the signals you cannot write yourself",
        blocks: [
          {
            type: "p",
            text: "When ChatGPT recommends businesses, it draws on what the web says about them, not only what they say about themselves. Keep the business name, address, phone and services identical on your website, Google Business Profile, LinkedIn and directory profiles. Ask real customers for reviews. Earn mentions in industry lists, interviews and partner pages. These signals take time, and they are hard to fake, which is why they carry weight.",
          },
        ],
      },
      {
        id: "measure",
        label: "Step 4",
        title: "Measure ChatGPT visibility",
        blocks: [
          {
            type: "checklist",
            label: "Measurement",
            items: [
              { text: "Track ChatGPT referrals in GA4.", detail: "OpenAI says ChatGPT adds utm_source=chatgpt.com to referral links, so filter session source for chatgpt.com." },
              { text: "Test a fixed list of prompts every month.", detail: "For example “best Meta Ads agency in Karachi”. Record whether you are mentioned, how you are described and which page is linked." },
              { text: "Fix what is described wrongly.", detail: "If an assistant gets a fact wrong, find where that fact is inconsistent on the web and correct it at the source." },
            ],
          },
        ],
      },
      {
        id: "mistakes",
        label: "Mistakes",
        title: "What not to do",
        blocks: [
          {
            type: "list",
            items: [
              "**Blocking OAI-SearchBot by accident** through a plugin, CDN or a copied robots.txt.",
              "**Writing pages only for AI.** Hidden text and keyword lists do not create trust and can harm search performance.",
              "**Relying on an llms.txt file.** It is optional at best and does not replace crawlable pages.",
              "**Buying fake reviews or listings.** They create inconsistent, untrustworthy signals and break platform rules.",
              "**Paying for guaranteed ChatGPT placement.** No one controls which sources ChatGPT cites.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I pay to appear in ChatGPT search?",
        a: "No standard paid placement makes ChatGPT recommend a business in its answers. Visibility comes from crawl access, useful pages and consistent information about the business across the web.",
      },
      {
        q: "Does blocking GPTBot remove my site from ChatGPT?",
        a: "Not from ChatGPT search. GPTBot is OpenAI's training crawler; ChatGPT search relies on OAI-SearchBot. You can block one and allow the other.",
      },
      {
        q: "How long does it take to show up in ChatGPT answers?",
        a: "There is no fixed timeline. Crawl access can be fixed in a day, but being mentioned for competitive questions usually builds over months as content, reviews and mentions accumulate.",
      },
      {
        q: "Is optimizing for ChatGPT different from SEO?",
        a: "It builds on SEO. Crawlable pages, clear answers and trustworthy information help in Google, Bing and ChatGPT alike. See [SEO vs AEO vs GEO](/insights/seo-vs-aeo-vs-geo).",
      },
    ],
    sources: [OPENAI_PUBLISHERS, OPENAI_BOTS, GOOGLE_HELPFUL],
    related: [
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and AEO services", note: "How Madvert Labs makes a business easier for AI search to find and cite." },
      { href: "/insights/seo-vs-aeo-vs-geo", anchor: "SEO vs AEO vs GEO", note: "How the three overlap and differ." },
      { href: "/insights/google-ai-overviews-visibility", anchor: "How to appear in Google AI Overviews", note: "The Google side of AI search." },
      { href: "/glossary/ai-seo", anchor: "What is AI SEO?", note: "Both meanings of the term, explained." },
    ],
    cta: {
      title: "Want to Know What ChatGPT",
      accent: "Says About Your Business?",
      body: "Book a free strategy call. We will check crawl access, entity consistency and your key pages, and show you what to fix first.",
      label: "Book a Free Strategy Call",
    },
  },

  /* ───────────────────────── Google AI Overviews ───────────────────────── */
  {
    slug: "google-ai-overviews-visibility",
    title: "How to Appear in Google AI Overviews and AI Mode",
    metaTitle: "How to Appear in Google AI Overviews and AI Mode",
    description:
      "What Google says decides visibility in AI Overviews and AI Mode, the technical requirements, the content that helps most, and how to measure the results.",
    eyebrow: "AI Search Insight",
    answer: [
      "To appear in Google AI Overviews and AI Mode, a page must first be indexed and eligible to show a snippet in Google Search. Google says there are no extra technical requirements and no special markup for these features. Its guidance on generative AI features treats this as SEO, with unique, useful content as the biggest factor.",
      "In practice that means crawlable, indexed pages; a clear answer to the question near the top; real expertise and evidence; and structured data that matches the visible page. Google decides which pages to show, so no one can guarantee a placement.",
    ],
    author: "founder",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    sections: [
      {
        id: "what-google-says",
        label: "What Google says",
        title: "What Google says about AI Overviews and AI Mode",
        blocks: [
          {
            type: "list",
            items: [
              "Google's page on [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) explains that the usual SEO best practices remain relevant, and that a page must be indexed and eligible to be shown with a snippet to be used as a supporting link.",
              "Its [guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says optimizing for generative AI search is still SEO, and that creating content people find unique, compelling and useful will likely matter more than any other step.",
              "Snippet controls such as nosnippet, max-snippet and noindex also affect whether a page can appear in these features.",
            ],
          },
        ],
      },
      {
        id: "checklist",
        label: "Checklist",
        title: "An AI Overviews readiness checklist",
        blocks: [
          {
            type: "checklist",
            label: "Readiness checklist",
            items: [
              { text: "The page is indexed.", detail: "Check it with URL Inspection in Search Console." },
              { text: "Nothing prevents a snippet.", detail: "No noindex, nosnippet or very small max-snippet on pages you want quoted." },
              { text: "Important content is text in the HTML.", detail: "Not only inside images, video or content that loads after interaction." },
              { text: "The answer comes first.", detail: "A clear, self-contained answer to the page's main question near the top." },
              { text: "Expertise is visible.", detail: "A named author, first-hand detail, real examples and an updated date." },
              { text: "Structured data matches the page.", detail: "Organization, Article, BreadcrumbList and FAQ markup only where the content is visible." },
              { text: "Local details are current.", detail: "For local searches, keep the Google Business Profile complete and consistent with the website." },
            ],
          },
        ],
      },
      {
        id: "content",
        label: "Content",
        title: "Content that tends to be useful for AI answers",
        blocks: [
          {
            type: "p",
            text: "AI Overviews often answer questions that need more than one fact: comparisons, how-to steps, costs and trade-offs. Pages that cover a question completely, with a direct answer, the reasoning, a table or steps, and an honest example, give Google more to work with than short pages that repeat a keyword.",
          },
          {
            type: "table",
            caption: "Weak vs useful page elements for AI answers",
            rowHeader: "Element",
            columns: ["Weak", "Useful"],
            rows: [
              { label: "Opening", cells: ["“Welcome to our website”", "A direct answer that names who, what and where"] },
              { label: "Pricing", cells: ["“Contact us for price” only", "What changes the price, with a clear next step"] },
              { label: "Proof", cells: ["Stock photos and general claims", "Case studies with real figures and limitations"] },
              { label: "Comparisons", cells: ["None", "Honest tables of options and trade-offs"] },
              { label: "FAQs", cells: ["Generic or hidden", "Real buyer questions answered on the page"] },
            ],
          },
        ],
      },
      {
        id: "measure",
        label: "Measurement",
        title: "How to measure it",
        blocks: [
          {
            type: "p",
            text: "Clicks and impressions from AI features are part of the Search Console Performance report for web search. Track the pages that answer questions, watch which queries they gain impressions for, and test your most important questions in Google each month to see which sources are shown.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need special schema to appear in AI Overviews?",
        a: "No. Google says there are no additional technical requirements. Structured data still helps Google understand a page, as long as it matches the visible content.",
      },
      {
        q: "Can I opt out of AI Overviews?",
        a: "Snippet controls such as nosnippet and max-snippet, and noindex, affect whether a page can appear. They also affect normal search results, so use them carefully.",
      },
      {
        q: "Why does my page rank but not appear in AI Overviews?",
        a: "Google chooses supporting links for each answer, and not every query shows an AI Overview. Make sure the page answers the question directly and completely, then give it time.",
      },
      {
        q: "Is AI Mode different from AI Overviews?",
        a: "Both are Google Search AI features that draw on Google's index. AI Mode is a conversational search experience; AI Overviews appear inside normal results. The same best practices apply to both.",
      },
    ],
    sources: [GOOGLE_AI_FEATURES, GOOGLE_AI_GUIDE, GOOGLE_HELPFUL],
    related: [
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and AEO services", note: "AI search visibility as a service." },
      { href: "/services/seo", anchor: "SEO services", note: "The foundation AI search builds on." },
      { href: "/insights/how-to-optimize-website-for-chatgpt", anchor: "How to optimize your website for ChatGPT", note: "The OpenAI side of AI search." },
      { href: "/insights/what-is-aeo", anchor: "What is AEO?", note: "Answer engine optimisation explained." },
    ],
    cta: {
      title: "Want Your Pages Ready",
      accent: "for AI Search?",
      body: "Book a free strategy call. We will review indexing, snippet eligibility and your most important pages.",
      label: "Book a Free Strategy Call",
    },
  },

  /* ───────────────────────── AI for SEO ───────────────────────── */
  {
    slug: "how-to-use-ai-for-seo",
    title: "How to Use AI for SEO Without Hurting Your Rankings",
    metaTitle: "How to Use AI for SEO Without Hurting Rankings",
    description:
      "Where AI helps SEO (research, clustering, outlines, audits, schema) and where people must stay in charge, based on Google's guidance on AI-generated content.",
    eyebrow: "AI Search Insight",
    answer: [
      "Use AI for the parts of SEO that are research, pattern-finding and drafting: grouping keywords by intent, analysing what ranks, outlining pages, drafting first versions, triaging technical audits and drafting structured data. Keep people responsible for facts, first-hand experience, final wording and decisions.",
      "Google's guidance says using generative AI is fine, but producing many pages without adding value for users can break its spam policy on scaled content abuse. The test is the same for any page: is it accurate, original and genuinely useful?",
    ],
    author: "founder",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    sections: [
      {
        id: "where",
        label: "Where AI helps",
        title: "Where AI helps in SEO, and the human check each needs",
        blocks: [
          {
            type: "table",
            caption: "SEO tasks, how AI helps and the human check",
            rowHeader: "Task",
            columns: ["How AI helps", "Human check"],
            rows: [
              { label: "Keyword research", cells: ["Groups long keyword lists by intent and topic", "Volumes and priorities from real data, such as Search Console"] },
              { label: "Search intent", cells: ["Summarises what the ranking pages have in common", "Look at the results yourself before deciding"] },
              { label: "Outlines", cells: ["Suggests headings and questions to cover", "Add what only you know: process, proof, opinions"] },
              { label: "Drafts", cells: ["Writes a first version quickly", "Fact-check every claim; rewrite in your voice"] },
              { label: "Technical audits", cells: ["Explains crawl reports and suggests fixes", "Confirm on the live site before changing anything"] },
              { label: "Structured data", cells: ["Drafts JSON-LD", "Validate it and keep it matching the visible page"] },
              { label: "Internal links", cells: ["Suggests related pages and anchors", "Keep links useful, not a keyword block"] },
            ],
          },
        ],
      },
      {
        id: "workflow",
        label: "Workflow",
        title: "A safe AI-assisted SEO workflow",
        blocks: [
          {
            type: "diagram",
            label: "AI-assisted, human-owned",
            steps: [
              { name: "Real data", text: "Start from Search Console queries, customer questions and sales calls, not from what an AI tool guesses people search." },
              { name: "AI research", text: "Use AI to cluster topics, summarise the results page and draft an outline." },
              { name: "Add experience", text: "Add your own process, examples, figures and opinions. This is what makes the page worth ranking." },
              { name: "Review", text: "Fact-check, rewrite for your voice, add sources and a named author." },
              { name: "Publish and measure", text: "Publish fewer, better pages and watch impressions and conversions in Search Console and GA4." },
            ],
          },
          {
            type: "h3",
            text: "Example prompts that save time",
            id: "prompts",
          },
          {
            type: "list",
            items: [
              "“Group these 200 keywords by search intent and suggest one page per group. Flag groups that overlap.”",
              "“Here are the headings of the top five results for this query. What do they all cover, and what is missing?”",
              "“Turn these sales call notes into ten questions buyers ask, phrased the way they would search.”",
            ],
          },
        ],
      },
      {
        id: "risks",
        label: "Risks",
        title: "What not to automate",
        blocks: [
          {
            type: "list",
            items: [
              "**Mass-producing pages.** Hundreds of near-identical city or keyword pages are exactly what Google's [guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) warns about.",
              "**Facts, figures and prices.** AI tools can state wrong numbers with confidence. Every figure needs a source you have checked.",
              "**Case studies and testimonials.** These must be real. Never generate results, reviews or quotes.",
              "**Your opinion.** Original views from real experience are what make content worth citing, and they cannot be generated.",
            ],
          },
          {
            type: "p",
            text: "Google's guidance on [helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks whether content shows first-hand experience and whether it was created mainly to help people. Pages made with AI pass that test the same way as any other page: by being genuinely useful.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Does Google penalise AI-generated content?",
        a: "Google says using AI is not against its guidelines in itself. What it acts against is low-value content made mainly to manipulate rankings, including many pages generated without adding value, whether a person or AI wrote them.",
      },
      {
        q: "Can ChatGPT do my SEO for me?",
        a: "It can speed up research, outlines, drafts and audits. It cannot see your real search data, verify your facts or add your experience, and those decide whether a page ranks and converts.",
      },
      {
        q: "Which AI tools are best for SEO?",
        a: "General assistants such as ChatGPT, Claude and Gemini handle research and drafting well. Pair them with real data from Google Search Console and an SEO tool, and keep a person responsible for what is published.",
      },
      {
        q: "Is “AI SEO” the same as using AI for SEO?",
        a: "The term is used both ways. It can mean using AI tools to do SEO, or optimising a site so AI search experiences can find and cite it. See [what is AI SEO?](/glossary/ai-seo) for both meanings.",
      },
    ],
    sources: [GOOGLE_GEN_AI_CONTENT, GOOGLE_HELPFUL],
    related: [
      { href: "/glossary/ai-seo", anchor: "What is AI SEO?", note: "Both meanings of the term." },
      { href: "/services/seo", anchor: "SEO services", note: "Technical, content and authority work, done properly." },
      { href: "/services/ai-seo-aeo", anchor: "AI SEO and AEO services", note: "Visibility in AI search experiences." },
      { href: "/resources/ai-content-automation-playbook", anchor: "AI Content Automation Playbook", note: "Free playbook from the Madvert Vault." },
    ],
    cta: {
      title: "Want SEO That Uses AI",
      accent: "Without the Risk?",
      body: "Book a free strategy call. We will look at your Search Console data and show you where the real opportunities are.",
      label: "Book a Free Strategy Call",
    },
  },

  /* ───────────────────────── WhatsApp funnels ───────────────────────── */
  {
    slug: "whatsapp-lead-generation-funnels",
    title: "WhatsApp Lead Generation Funnels: Click-to-WhatsApp Ads That Turn Into Sales",
    metaTitle: "WhatsApp Lead Generation Funnels and Ads",
    description:
      "How a WhatsApp lead generation funnel works, from click-to-WhatsApp ads to instant replies, qualification, follow-up and tracking, and the WhatsApp rules to plan for.",
    eyebrow: "Meta Ads Insight",
    answer: [
      "A WhatsApp lead generation funnel uses click-to-WhatsApp ads on Facebook or Instagram to open a chat with the business, then answers instantly, asks qualifying questions, hands serious buyers to a salesperson and follows up with everyone else, with every conversation recorded in a CRM.",
      "It suits businesses whose buyers would rather message than fill in a form, which is common in markets such as Pakistan and the UAE. Without qualification and tracking, though, it turns into a busy inbox with no way to tell which ads produced sales.",
    ],
    author: "founder",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    sections: [
      {
        id: "how",
        label: "How it works",
        title: "How a WhatsApp lead generation funnel works",
        blocks: [
          {
            type: "diagram",
            label: "From ad to sale",
            steps: [
              { name: "Ad", text: "A click-to-WhatsApp ad with a clear offer and a pre-filled first message, so the buyer only has to press send." },
              { name: "Instant reply", text: "An automatic greeting confirms who they are talking to and what happens next." },
              { name: "Qualify", text: "Two to four questions by message: what they need, location, budget range, timeline." },
              { name: "Hand over", text: "Qualified chats are assigned to a salesperson with the answers attached." },
              { name: "Follow up", text: "Buyers who go quiet get a useful follow-up, within WhatsApp's messaging rules." },
              { name: "Track", text: "Each chat is a CRM contact with its source ad, stage and outcome." },
            ],
          },
        ],
      },
      {
        id: "compare",
        label: "Comparison",
        title: "WhatsApp vs lead forms vs landing pages",
        blocks: [
          {
            type: "table",
            caption: "Click-to-WhatsApp compared with instant forms and landing pages",
            rowHeader: "Factor",
            columns: ["Click-to-WhatsApp", "Instant form", "Landing page"],
            rows: [
              { label: "Effort for the buyer", cells: ["Very low: press send", "Low", "Higher"] },
              { label: "Conversation", cells: ["Starts immediately, two-way", "Starts when you contact them", "Starts when you contact them"] },
              { label: "Qualification", cells: ["In the chat, by a person, automation or AI agent", "Form questions", "Page plus form or application"] },
              { label: "Main risk", cells: ["Unanswered or untracked chats", "Low-intent submissions", "Fewer leads"] },
              { label: "Best for", cells: ["Buyers who prefer messaging; questions before buying", "Simple, familiar offers", "High-value or complex offers"] },
            ],
          },
          {
            type: "p",
            text: "The full comparison of forms and pages is in [Facebook lead forms vs landing pages](/insights/facebook-lead-forms-vs-landing-pages).",
          },
        ],
      },
      {
        id: "rules",
        label: "WhatsApp rules",
        title: "The WhatsApp messaging rules to plan for",
        blocks: [
          {
            type: "p",
            text: "On the WhatsApp Business Platform, a customer service window opens when the customer messages or calls the business and lasts 24 hours from their last message. Inside the window, the business can reply freely. Outside it, the business can only send pre-approved template messages, according to [Meta's WhatsApp documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages). Plan follow-up templates in advance, and check Meta's current pricing for template messages.",
          },
          {
            type: "callout",
            label: "For teams",
            text: ["The WhatsApp Business phone app works for one person. A sales team that needs shared inboxes, routing, automation and reporting usually connects the WhatsApp Business Platform to a CRM."],
          },
        ],
      },
      {
        id: "setup",
        label: "Setup",
        title: "Setup checklist",
        blocks: [
          {
            type: "checklist",
            label: "WhatsApp funnel setup",
            items: [
              { text: "Write the offer and the pre-filled first message.", detail: "The message should say what the buyer wants, so your team starts with context." },
              { text: "Connect WhatsApp to your CRM.", detail: "Every chat becomes a contact with its source campaign." },
              { text: "Set the instant reply and qualifying questions.", detail: "Keep it short and human. An [AI agent](/services/ai-agents) can handle this at any hour." },
              { text: "Define the hand-over.", detail: "Who gets qualified chats, how they are alerted and how fast they must reply." },
              { text: "Prepare template messages for follow-up.", detail: "For buyers who go quiet after the 24-hour window." },
              { text: "Send outcomes back to Meta.", detail: "Qualified and won outcomes through the [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/) or a CRM integration, so campaigns learn which chats matter." },
            ],
          },
        ],
      },
      {
        id: "mistakes",
        label: "Mistakes",
        title: "Common WhatsApp funnel mistakes",
        blocks: [
          {
            type: "list",
            items: [
              "**Judging campaigns by number of chats.** Measure qualified conversations and sales, not messages started.",
              "**Slow replies.** A chat that waits hours has the same problem as a form that waits hours.",
              "**No CRM.** Without one, you cannot tell which ad, creative or offer produced revenue.",
              "**Spamming templates.** Too many follow-ups annoy buyers and can hurt your account's quality rating.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Are click-to-WhatsApp ads good for lead generation?",
        a: "They can be, especially where buyers prefer messaging. They work best with an instant reply, qualifying questions, fast hand-over to a person and CRM tracking of every chat.",
      },
      {
        q: "Can I automate WhatsApp replies?",
        a: "Yes, through the WhatsApp Business Platform connected to a CRM or chatbot. Automated replies inside the customer service window are flexible; messages you start later need approved templates.",
      },
      {
        q: "What is the WhatsApp 24-hour rule?",
        a: "When a customer messages the business, a 24-hour customer service window opens. During it the business can reply freely; after it, only approved template messages can be sent until the customer replies again.",
      },
      {
        q: "How do I track sales from WhatsApp ads?",
        a: "Record each chat in a CRM with its source campaign, move it through stages such as qualified, booked and won, and send those outcomes back to Meta so you can see which ads produced revenue.",
      },
    ],
    sources: [WHATSAPP_MESSAGES, META_CAPI],
    related: [
      { href: "/services/meta-ads", anchor: "Meta Ads lead generation", note: "Click-to-WhatsApp, forms or landing pages, chosen per offer." },
      { href: "/services/automation-revenue-systems", anchor: "CRM and WhatsApp automation", note: "Routing, follow-up and reporting for every chat." },
      { href: "/insights/how-to-automate-lead-follow-up", anchor: "How to automate lead follow-up", note: "The six-step follow-up system." },
      { href: "/services/ai-agents", anchor: "AI lead response agents", note: "Instant replies and qualification at any hour." },
    ],
    cta: {
      title: "Getting WhatsApp Chats",
      accent: "But Not Sales?",
      body: "Book a free strategy call. We will map your WhatsApp funnel from ad to sale and show you where buyers drop off.",
      label: "Book a Free Strategy Call",
    },
  },
];
