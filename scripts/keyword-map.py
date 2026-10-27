"""
Generates docs/seo/keyword-master.csv: every target keyword with market, intent, the ONE page it
maps to, priority and validation status. Run: python3 scripts/keyword-map.py
Metrics are never invented: volume, difficulty, CPC and SERP competitors stay "Unverified" until
filled from Semrush, Ahrefs, Keyword Planner or Search Console exports.
"""
import csv, os

U = "Unverified — Requires Keyword Tool Validation"

# URL → (cluster, content type)
PAGES = {
    "/services/digital-marketing": ("A. Full stack / external growth department", "Service page"),
    "/digital-marketing-agency-karachi": ("A. Full stack / external growth department", "Location page (real office)"),
    "/growth-systems": ("A. Full stack / external growth department", "Pillar guide"),
    "/services/performance-marketing": ("C. Paid acquisition", "Service page"),
    "/services/client-acquisition": ("B. Qualified lead generation", "Service page"),
    "/services/b2b-lead-generation": ("B. Qualified lead generation", "Service page (new)"),
    "/services/automation-revenue-systems": ("E. CRM and automation", "Service page"),
    "/services/meta-ads": ("C. Paid acquisition", "Service page"),
    "/services/google-ads": ("C. Paid acquisition", "Service page"),
    "/services/seo": ("D. SEO / AEO / GEO", "Service page"),
    "/services/ai-seo-aeo": ("D. SEO / AEO / GEO", "Service page"),
    "/services/ai-agents": ("E. CRM and automation", "Service page"),
    "/services/conversion": ("G. Conversion", "Service page"),
    "/services/web-development": ("H. Technology", "Service page"),
    "/services/tech-product-development": ("H. Technology", "Service page"),
    "/services/branding-marketing": ("F. Creative and brand", "Service page"),
    "/services/social-media-management": ("F. Creative and brand", "Service page"),
    "/studios": ("F. Creative and brand", "Service page"),
    "/white-label-partnership": ("I. White label", "Service page"),
    "/industries/real-estate": ("B. Qualified lead generation", "Industry page"),
    "/industries/ecommerce": ("C. Paid acquisition", "Industry page"),
    "/custom-patches": ("B. Qualified lead generation", "Offer page"),
    "/insights/meta-ads-lead-generation-pakistan": ("C. Paid acquisition", "Article"),
    "/insights/meta-ads-cost-pakistan": ("C. Paid acquisition", "Article"),
    "/insights/what-is-aeo": ("D. SEO / AEO / GEO", "Article"),
    "/insights/seo-vs-aeo-vs-geo": ("D. SEO / AEO / GEO", "Comparison article (new)"),
    "/insights/why-facebook-leads-dont-convert": ("C. Paid acquisition", "Article (new)"),
    "/insights/facebook-lead-forms-vs-landing-pages": ("C. Paid acquisition", "Comparison article (new)"),
    "/insights/meta-ads-vs-google-ads-lead-generation": ("C. Paid acquisition", "Comparison article (new)"),
    "/insights/how-to-automate-lead-follow-up": ("E. CRM and automation", "Article (new)"),
    "/insights/how-to-choose-digital-marketing-agency-karachi": ("A. Full stack / external growth department", "Article"),
    "/insights/lead-generation-vs-qualified-lead-generation": ("B. Qualified lead generation", "Comparison article"),
    "/insights/performance-marketing-vs-digital-marketing": ("A. Full stack / external growth department", "Comparison article"),
    "/glossary/external-growth-department": ("A. Full stack / external growth department", "Definition page"),
    "/glossary/full-stack-digital-marketing": ("A. Full stack / external growth department", "Definition page"),
    "/glossary/qualified-lead": ("B. Qualified lead generation", "Definition page"),
    "/glossary/qualified-rfq": ("B. Qualified lead generation", "Definition page"),
    "/glossary/lead-qualification-system": ("E. CRM and automation", "Definition page"),
    "/glossary/aeo": ("D. SEO / AEO / GEO", "Definition page"),
    "/glossary/ai-seo": ("D. SEO / AEO / GEO", "Definition page"),
    "/tools/cost-per-qualified-lead-calculator": ("B. Qualified lead generation", "Tool"),
}

LIVE_NEW = {"/services/b2b-lead-generation", "/insights/seo-vs-aeo-vs-geo", "/insights/why-facebook-leads-dont-convert",
            "/insights/facebook-lead-forms-vs-landing-pages", "/insights/meta-ads-vs-google-ads-lead-generation", "/insights/how-to-automate-lead-follow-up"}

# Planned pages (not published): slug → (cluster, type)
PLANNED = {
    "PLANNED: /insights/how-to-optimize-website-for-chatgpt": ("D. SEO / AEO / GEO", "Article (planned)"),
    "PLANNED: /insights/google-ai-overviews-visibility": ("D. SEO / AEO / GEO", "Article (planned)"),
    "PLANNED: /insights/how-much-does-meta-ads-management-cost": ("C. Paid acquisition", "Article (planned)"),
    "PLANNED: /insights/how-to-build-lead-generation-funnel": ("G. Conversion", "Article (planned)"),
    "PLANNED: /insights/whatsapp-lead-generation-funnels": ("C. Paid acquisition", "Article (planned)"),
    "PLANNED: /insights/agency-vs-in-house-vs-external-growth-department": ("A. Full stack / external growth department", "Comparison (planned)"),
    "PLANNED: /insights/gohighlevel-vs-hubspot-for-lead-generation": ("E. CRM and automation", "Comparison (planned)"),
    "PLANNED: /insights/how-to-improve-landing-page-conversion-rate": ("G. Conversion", "Article (planned)"),
    "PLANNED: /insights/how-to-measure-marketing-roi": ("A. Full stack / external growth department", "Article (planned)"),
    "PLANNED: /insights/white-label-fulfillment-for-us-agencies": ("I. White label", "Article (planned)"),
    "PLANNED: /insights/how-to-choose-an-aeo-agency": ("D. SEO / AEO / GEO", "Article (planned)"),
    "PLANNED: /insights/meta-ads-real-estate-pakistan": ("B. Qualified lead generation", "Article (planned)"),
    "PLANNED: /insights/crm-vs-spreadsheets-for-leads": ("E. CRM and automation", "Article (planned)"),
}

def row(market, lang, group, kw, url, intent, prio, relevance, note=""):
    if url in PAGES:
        cluster, ctype = PAGES[url]
        status = "Live (new in this batch)" if url in LIVE_NEW else "Live"
    elif url in PLANNED:
        cluster, ctype = PLANNED[url]
        status = "Planned: content not yet written"
    else:
        cluster, ctype, status = "Not targeted", "None", "No page by design"
    return {
        "Market": market, "Language": lang, "Keyword group": group, "Keyword": kw, "Cluster": cluster,
        "Search intent": intent, "Target URL": url.replace("PLANNED: ", ""), "URL status": status, "Content type": ctype,
        "Business relevance": relevance, "Priority": prio,
        "Monthly volume": U, "Keyword difficulty": U, "CPC": U, "SERP competitors": U,
        "Ranking opportunity (assessment, not a metric)": note,
    }

R = []
def add(market, lang, group, items):
    for it in items:
        R.append(row(market, lang, group, *it))

PK, EN = "Pakistan", "English"
add(PK, EN, "A. Pakistan: digital marketing", [
    ("digital marketing agency Pakistan", "/services/digital-marketing", "Commercial", "P1", "High", "Existing page with Pakistan in title; real proof; competitive head term"),
    ("digital marketing company Pakistan", "/services/digital-marketing", "Commercial", "P1", "High", "Same intent as above; same page"),
    ("digital marketing agency Karachi", "/digital-marketing-agency-karachi", "Commercial, local", "P1", "High", "Real office and verified GBP; strongest local opportunity"),
    ("digital marketing company Karachi", "/digital-marketing-agency-karachi", "Commercial, local", "P1", "High", "Same intent as above"),
    ("digital marketing agency Lahore", "/services/digital-marketing", "Commercial, local", "P3", "Medium", "No Lahore office: no city page (doorway risk). Rank via national page only"),
    ("digital marketing agency Islamabad", "/services/digital-marketing", "Commercial, local", "P3", "Medium", "No Islamabad office: no city page"),
    ("performance marketing agency Pakistan", "/services/performance-marketing", "Commercial", "P1", "High", "Dedicated page live; matches GSC impressions seen earlier"),
    ("growth marketing agency Pakistan", "/services/digital-marketing", "Commercial", "P2", "High", "Served by full stack page and /growth-systems"),
    ("full service digital marketing agency Pakistan", "/services/digital-marketing", "Commercial", "P1", "High", "Exact positioning of the page"),
    ("online marketing agency Pakistan", "/services/digital-marketing", "Commercial", "P3", "Medium", "Synonym; no separate page"),
    ("B2B digital marketing agency Pakistan", "/services/b2b-lead-generation", "Commercial", "P2", "High", "New B2B page with two B2B case studies"),
    ("lead generation agency Pakistan", "/services/client-acquisition", "Commercial", "P1", "High", "Core offer; strong proof"),
    ("qualified lead generation Pakistan", "/services/client-acquisition", "Commercial", "P1", "High", "Owns the qualified lead concept (glossary, calculator, articles)"),
    ("B2B lead generation agency Pakistan", "/services/b2b-lead-generation", "Commercial", "P1", "High", "New dedicated page"),
    ("customer acquisition agency Pakistan", "/services/client-acquisition", "Commercial", "P2", "High", "Same page"),
    ("marketing automation agency Pakistan", "/services/automation-revenue-systems", "Commercial", "P2", "High", "Existing page"),
    ("digital marketing services for businesses Pakistan", "/services/digital-marketing", "Commercial", "P2", "High", "Same page"),
])
add(PK, EN, "B. Pakistan: Meta Ads and Google Ads", [
    ("Meta Ads agency Pakistan", "/services/meta-ads", "Commercial", "P1", "High", "Existing page; seven Meta case studies"),
    ("Meta Ads agency Karachi", "/services/meta-ads", "Commercial, local", "P1", "High", "Page links to Karachi office; no separate city page"),
    ("Facebook Ads agency Pakistan", "/services/meta-ads", "Commercial", "P1", "High", "Synonym of Meta Ads; alias /facebook-ads redirects here"),
    ("Facebook Ads agency Karachi", "/services/meta-ads", "Commercial, local", "P1", "High", "Same page"),
    ("Facebook Ads lead generation Pakistan", "/insights/meta-ads-lead-generation-pakistan", "Informational / commercial", "P1", "High", "Existing Pakistan article supports the service page"),
    ("Facebook Ads management Pakistan", "/services/meta-ads", "Commercial", "P2", "High", "Same page"),
    ("Instagram advertising agency Pakistan", "/services/meta-ads", "Commercial", "P2", "Medium", "Covered by Meta page (Facebook and Instagram)"),
    ("Instagram Ads agency Karachi", "/services/meta-ads", "Commercial, local", "P3", "Medium", "Same page"),
    ("Meta Ads management for real estate Pakistan", "/industries/real-estate", "Commercial", "P2", "High", "Real estate page has Dubai proof only; planned Pakistan article adds local depth"),
    ("Facebook lead generation for clinics Pakistan", "/services/meta-ads", "Commercial", "P3", "Low", "No clinic case study: do not create an industry page yet"),
    ("click to WhatsApp ads Pakistan", "PLANNED: /insights/whatsapp-lead-generation-funnels", "Informational / commercial", "P2", "High", "Planned article; service handled by Meta Ads page"),
    ("WhatsApp advertising agency Pakistan", "/services/meta-ads", "Commercial", "P3", "Medium", "Same page"),
    ("qualified leads from Facebook Ads Pakistan", "/insights/meta-ads-lead-generation-pakistan", "Informational", "P1", "High", "Existing article; supported by new Why Facebook leads don't convert"),
    ("Google Ads agency Pakistan", "/services/google-ads", "Commercial", "P1", "High", "Existing page; no Google-specific case study yet (add one when available)"),
    ("Google Ads management Karachi", "/services/google-ads", "Commercial, local", "P1", "High", "Title already targets Karachi"),
    ("Google Ads agency Lahore", "/services/google-ads", "Commercial, local", "P3", "Medium", "No Lahore office: no city page"),
    ("Google Ads agency Islamabad", "/services/google-ads", "Commercial, local", "P3", "Medium", "No Islamabad office: no city page"),
    ("PPC agency Pakistan", "/services/performance-marketing", "Commercial", "P2", "High", "PPC spans Google and Meta: performance page"),
    ("PPC management company Pakistan", "/services/performance-marketing", "Commercial", "P2", "High", "Same page"),
    ("Google Ads consultant Pakistan", "/services/google-ads", "Commercial", "P3", "Medium", "Same page"),
    ("B2B Google Ads agency Pakistan", "/services/b2b-lead-generation", "Commercial", "P2", "High", "B2B page covers Google for B2B"),
    ("Google Ads for real estate Pakistan", "/industries/real-estate", "Commercial", "P3", "Medium", "Industry page"),
])
add(PK, EN, "C. Pakistan: SEO, AEO and AI search", [
    ("SEO agency Pakistan", "/services/seo", "Commercial", "P1", "High", "Existing page; competitive"),
    ("SEO company Karachi", "/services/seo", "Commercial, local", "P1", "High", "Title targets Karachi"),
    ("SEO services Pakistan", "/services/seo", "Commercial", "P1", "High", "Same page"),
    ("technical SEO services Pakistan", "/services/seo", "Commercial", "P2", "Medium", "Section of SEO page"),
    ("local SEO agency Pakistan", "/services/seo", "Commercial", "P2", "Medium", "Section of SEO page"),
    ("ecommerce SEO agency Pakistan", "/services/seo", "Commercial", "P3", "Medium", "No ecommerce SEO case study"),
    ("AEO agency Pakistan", "/services/ai-seo-aeo", "Commercial", "P1", "High", "Emerging term, likely low competition; GSC showed 'ai aeo service'"),
    ("answer engine optimization Pakistan", "/services/ai-seo-aeo", "Commercial", "P1", "High", "Same page"),
    ("AI SEO agency Pakistan", "/services/ai-seo-aeo", "Commercial", "P1", "High", "Same page"),
    ("GEO agency Pakistan", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Service page now linked from SEO vs AEO vs GEO"),
    ("generative engine optimization Pakistan", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Same page"),
    ("ChatGPT SEO services Pakistan", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Same page"),
    ("AI search optimization Pakistan", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Same page"),
    ("how to rank in ChatGPT results", "PLANNED: /insights/how-to-optimize-website-for-chatgpt", "Informational", "P1", "High", "Planned article; partly answered by SEO vs AEO vs GEO"),
    ("Google AI Overviews optimization", "PLANNED: /insights/google-ai-overviews-visibility", "Informational", "P2", "High", "Planned article"),
    ("SEO vs AEO", "/insights/seo-vs-aeo-vs-geo", "Informational, comparison", "P1", "High", "New comparison article"),
    ("SEO vs GEO vs AEO", "/insights/seo-vs-aeo-vs-geo", "Informational, comparison", "P1", "High", "New comparison article"),
])
US = "United States"
add(US, EN, "D. USA: B2B growth and lead generation", [
    ("digital marketing agency for startups", "/services/digital-marketing", "Commercial", "P3", "Medium", "No startup case study; national US competition is very high"),
    ("full stack marketing agency for startups", "/services/digital-marketing", "Commercial", "P3", "Medium", "Same"),
    ("growth marketing agency for startups", "/services/digital-marketing", "Commercial", "P3", "Medium", "Same"),
    ("outsourced marketing department for small business", "/services/digital-marketing", "Commercial", "P2", "High", "Matches External Growth Department positioning"),
    ("external marketing department", "/glossary/external-growth-department", "Informational / commercial", "P2", "High", "Definition page plus service page"),
    ("B2B lead generation agency", "/services/b2b-lead-generation", "Commercial", "P1", "High", "New page; US proof (agency, Texas) but very competitive head term"),
    ("qualified B2B lead generation services", "/services/b2b-lead-generation", "Commercial", "P1", "High", "Long tail fits the page well"),
    ("performance marketing agency for B2B", "/services/performance-marketing", "Commercial", "P2", "High", "Performance page; links to B2B page"),
    ("Meta Ads agency for B2B lead generation", "/services/b2b-lead-generation", "Commercial", "P2", "High", "B2B page covers Meta for B2B"),
    ("Facebook Ads agency for B2B companies", "/services/b2b-lead-generation", "Commercial", "P2", "High", "Same"),
    ("Meta Ads management for SaaS companies", "/services/meta-ads", "Commercial", "P3", "Medium", "No SaaS proof: no SaaS page"),
    ("Google Ads management for B2B companies", "/services/google-ads", "Commercial", "P2", "High", "Google page"),
    ("marketing automation agency for small business", "/services/automation-revenue-systems", "Commercial", "P2", "High", "Automation page"),
    ("CRM automation agency", "/services/automation-revenue-systems", "Commercial", "P1", "High", "Automation page"),
    ("lead generation funnel agency", "/services/conversion", "Commercial", "P2", "High", "Conversion page (funnels)"),
    ("conversion focused marketing agency", "/services/conversion", "Commercial", "P3", "Medium", "Conversion page"),
    ("landing page optimization agency", "/services/conversion", "Commercial", "P2", "High", "Conversion page"),
    ("AEO agency for SaaS", "/services/ai-seo-aeo", "Commercial", "P3", "Medium", "No SaaS proof"),
    ("answer engine optimization agency", "/services/ai-seo-aeo", "Commercial", "P1", "High", "Emerging term"),
    ("AI search optimization agency", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Same"),
    ("generative engine optimization agency", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Same"),
    ("full service marketing agency for small business", "/services/digital-marketing", "Commercial", "P3", "Medium", "Very competitive in the US"),
])
add(US, EN, "E. USA: white label", [
    ("white label digital marketing agency", "/white-label-partnership", "Commercial", "P1", "High", "Dedicated page; agencies are a key buyer"),
    ("white label Meta Ads services", "/white-label-partnership", "Commercial", "P1", "High", "Same page (no separate thin pages)"),
    ("white label Facebook Ads management", "/white-label-partnership", "Commercial", "P1", "High", "Same page"),
    ("white label Google Ads management", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
    ("white label PPC agency", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
    ("white label lead generation services", "/white-label-partnership", "Commercial", "P1", "High", "Same page"),
    ("white label marketing automation", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
    ("white label CRM setup services", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
    ("white label landing page development", "/white-label-partnership", "Commercial", "P3", "Medium", "Same page"),
    ("white label funnel building services", "/white-label-partnership", "Commercial", "P2", "Medium", "Same page"),
    ("outsourced Meta Ads fulfillment", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
    ("outsourced PPC management for agencies", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
    ("marketing agency fulfillment partner", "/white-label-partnership", "Commercial", "P1", "High", "Matches page intent exactly"),
    ("white label marketing services for agencies", "/white-label-partnership", "Commercial", "P1", "High", "Same page"),
    ("agency backend fulfillment services", "/white-label-partnership", "Commercial", "P2", "High", "Same page"),
])
UK = "United Kingdom"
add(UK, "English (UK)", "F. UK: performance marketing", [
    ("digital marketing agency for UK businesses", "/services/digital-marketing", "Commercial", "P3", "Medium", "No UK office; one UK market in agency case study"),
    ("B2B digital marketing agency UK", "/services/b2b-lead-generation", "Commercial", "P3", "Medium", "B2B page"),
    ("performance marketing agency UK", "/services/performance-marketing", "Commercial", "P3", "Medium", "Highly competitive in UK"),
    ("growth marketing agency UK", "/services/digital-marketing", "Commercial", "P3", "Medium", ""),
    ("Meta Ads agency UK", "/services/meta-ads", "Commercial", "P3", "Medium", ""),
    ("Facebook Ads agency for B2B UK", "/services/b2b-lead-generation", "Commercial", "P3", "Medium", ""),
    ("Facebook lead generation agency UK", "/services/meta-ads", "Commercial", "P3", "Medium", ""),
    ("qualified lead generation agency UK", "/services/client-acquisition", "Commercial", "P3", "Medium", ""),
    ("Google Ads management for UK businesses", "/services/google-ads", "Commercial", "P3", "Medium", ""),
    ("B2B PPC agency UK", "/services/b2b-lead-generation", "Commercial", "P3", "Medium", ""),
    ("marketing automation agency UK", "/services/automation-revenue-systems", "Commercial", "P3", "Medium", ""),
    ("CRM automation agency UK", "/services/automation-revenue-systems", "Commercial", "P3", "Medium", ""),
    ("outsourced marketing department UK", "/services/digital-marketing", "Commercial", "P2", "High", "External Growth Department positioning fits"),
    ("landing page optimization agency UK", "/services/conversion", "Commercial", "P3", "Medium", ""),
    ("conversion rate optimization for B2B UK", "/services/conversion", "Commercial", "P3", "Medium", ""),
    ("AEO agency UK", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Emerging term, less entrenched competition"),
    ("AI SEO agency UK", "/services/ai-seo-aeo", "Commercial", "P2", "High", ""),
    ("generative engine optimization agency UK", "/services/ai-seo-aeo", "Commercial", "P2", "High", ""),
    ("white label Meta Ads UK", "/white-label-partnership", "Commercial", "P2", "High", "White label buyers are location-flexible"),
    ("white label PPC services UK", "/white-label-partnership", "Commercial", "P2", "High", ""),
])
SA = "Saudi Arabia"
add(SA, EN, "G. Saudi Arabia: English", [
    (k, u, "Commercial", "P3", "Medium", "No Saudi case study or presence yet: map to service page, no Saudi page until there is proof") for k, u in [
        ("digital marketing agency Saudi Arabia", "/services/digital-marketing"), ("digital marketing agency Riyadh", "/services/digital-marketing"),
        ("performance marketing agency Saudi Arabia", "/services/performance-marketing"), ("Meta Ads agency Saudi Arabia", "/services/meta-ads"),
        ("Facebook advertising agency Riyadh", "/services/meta-ads"), ("Instagram advertising agency Saudi Arabia", "/services/meta-ads"),
        ("Google Ads agency Saudi Arabia", "/services/google-ads"), ("Google Ads management Riyadh", "/services/google-ads"),
        ("PPC agency Saudi Arabia", "/services/performance-marketing"), ("B2B lead generation Saudi Arabia", "/services/b2b-lead-generation"),
        ("qualified leads agency Riyadh", "/services/client-acquisition"), ("click to WhatsApp ads Saudi Arabia", "/services/meta-ads"),
        ("CRM automation Saudi Arabia", "/services/automation-revenue-systems"), ("marketing automation agency Riyadh", "/services/automation-revenue-systems"),
        ("SEO agency Saudi Arabia", "/services/seo"), ("Arabic SEO agency Saudi Arabia", "/services/seo"),
        ("AEO agency Saudi Arabia", "/services/ai-seo-aeo"), ("AI search optimization Saudi Arabia", "/services/ai-seo-aeo"),
        ("landing page development Saudi Arabia", "/services/conversion")]
])
AR_NOTE = "Arabic: no Arabic pages until keyword variants and copy are reviewed by a qualified Arabic reviewer"
add(SA, "Arabic", "H. Saudi Arabia: Arabic", [(k, "none", "Commercial", "P3", "Medium", AR_NOTE) for k in [
    "شركة تسويق رقمي السعودية", "شركة تسويق إلكتروني الرياض", "وكالة تسويق رقمي الرياض", "شركة إعلانات فيسبوك السعودية",
    "إدارة إعلانات ميتا الرياض", "إعلانات انستقرام السعودية", "شركة إعلانات جوجل السعودية", "إدارة حملات جوجل الرياض",
    "توليد العملاء المحتملين السعودية", "شركة توليد العملاء الرياض", "أتمتة التسويق السعودية", "إدارة علاقات العملاء السعودية",
    "شركة سيو في السعودية", "تحسين محركات البحث الرياض", "تحسين الظهور في محركات البحث بالذكاء الاصطناعي", "تحسين الظهور في إجابات الذكاء الاصطناعي"]])
AE = "United Arab Emirates"
UAE_NOTE = "Three published UAE case studies (Dubai real estate, Dubai interior design, UAE home improvement) support UAE relevance; candidate for a UAE market page once approved"
add(AE, EN, "I. UAE: English", [
    ("digital marketing agency UAE", "/services/digital-marketing", "Commercial", "P2", "High", UAE_NOTE),
    ("digital marketing agency Dubai", "/services/digital-marketing", "Commercial", "P2", "High", UAE_NOTE),
    ("digital marketing agency Abu Dhabi", "/services/digital-marketing", "Commercial", "P3", "Medium", "No Abu Dhabi proof"),
    ("performance marketing agency Dubai", "/services/performance-marketing", "Commercial", "P2", "High", UAE_NOTE),
    ("growth marketing agency Dubai", "/services/digital-marketing", "Commercial", "P3", "Medium", ""),
    ("Meta Ads agency Dubai", "/services/meta-ads", "Commercial", "P2", "High", UAE_NOTE),
    ("Facebook Ads agency Dubai", "/services/meta-ads", "Commercial", "P2", "High", UAE_NOTE),
    ("Facebook Ads lead generation UAE", "/services/meta-ads", "Commercial", "P2", "High", UAE_NOTE),
    ("Instagram advertising agency Abu Dhabi", "/services/meta-ads", "Commercial", "P3", "Medium", ""),
    ("Google Ads agency Dubai", "/services/google-ads", "Commercial", "P3", "Medium", "No Google UAE proof"),
    ("Google Ads management UAE", "/services/google-ads", "Commercial", "P3", "Medium", ""),
    ("PPC management agency Dubai", "/services/performance-marketing", "Commercial", "P3", "Medium", ""),
    ("B2B lead generation agency Dubai", "/services/b2b-lead-generation", "Commercial", "P3", "Medium", ""),
    ("qualified lead generation UAE", "/services/client-acquisition", "Commercial", "P2", "High", UAE_NOTE),
    ("lead generation agency for real estate Dubai", "/industries/real-estate", "Commercial", "P1", "High", "Industry page already titled for Dubai with real Dubai case study"),
    ("click to WhatsApp ads UAE", "PLANNED: /insights/whatsapp-lead-generation-funnels", "Informational / commercial", "P2", "High", "Planned article"),
    ("WhatsApp marketing automation UAE", "/services/automation-revenue-systems", "Commercial", "P3", "Medium", ""),
    ("CRM automation agency Dubai", "/services/automation-revenue-systems", "Commercial", "P3", "Medium", ""),
    ("landing page optimization Dubai", "/services/conversion", "Commercial", "P3", "Medium", ""),
    ("conversion rate optimization agency Dubai", "/services/conversion", "Commercial", "P3", "Medium", ""),
    ("SEO agency Dubai", "/services/seo", "Commercial", "P3", "Medium", "Very competitive; no UAE SEO proof"),
    ("AEO agency Dubai", "/services/ai-seo-aeo", "Commercial", "P2", "High", "Emerging term"),
    ("answer engine optimization UAE", "/services/ai-seo-aeo", "Commercial", "P2", "High", ""),
    ("AI SEO agency Dubai", "/services/ai-seo-aeo", "Commercial", "P2", "High", ""),
    ("generative engine optimization Dubai", "/services/ai-seo-aeo", "Commercial", "P2", "High", ""),
    ("Meta Ads agency DIFC", "/services/meta-ads", "Commercial, local", "P3", "Low", "No DIFC presence: never claim a local office"),
    ("marketing automation DMCC", "/services/automation-revenue-systems", "Commercial, local", "P3", "Low", "No DMCC presence: never claim a local office"),
])
add(AE, "Arabic", "J. UAE: Arabic", [(k, "none", "Commercial", "P3", "Medium", AR_NOTE) for k in [
    "شركة تسويق رقمي دبي", "وكالة تسويق إلكتروني الإمارات", "شركة إعلانات ميتا دبي", "شركة إعلانات جوجل دبي",
    "إدارة إعلانات فيسبوك الإمارات", "توليد عملاء محتملين الإمارات", "شركة توليد عملاء دبي", "إعلانات الواتساب الإمارات",
    "أتمتة التسويق دبي", "تحسين محركات البحث دبي", "تحسين الظهور في الذكاء الاصطناعي الإمارات"]])
GL = "Global"
add(GL, EN, "K. Global: CRM, automation and AI agents", [
    ("CRM setup services", "/services/automation-revenue-systems", "Commercial", "P1", "High", "Automation page owns CRM intent (no separate CRM page, to avoid cannibalisation)"),
    ("CRM implementation agency", "/services/automation-revenue-systems", "Commercial", "P1", "High", "Same"),
    ("GoHighLevel CRM setup", "/services/automation-revenue-systems", "Commercial", "P2", "High", "Madvert runs its own booking on GoHighLevel"),
    ("GoHighLevel automation agency", "/services/automation-revenue-systems", "Commercial", "P2", "High", ""),
    ("HubSpot CRM implementation services", "/services/automation-revenue-systems", "Commercial", "P3", "Medium", ""),
    ("CRM automation for lead generation", "/services/automation-revenue-systems", "Commercial", "P1", "High", ""),
    ("automated lead follow up system", "/insights/how-to-automate-lead-follow-up", "Informational / commercial", "P1", "High", "New article"),
    ("WhatsApp lead follow up automation", "/insights/how-to-automate-lead-follow-up", "Informational / commercial", "P1", "High", "New article covers WhatsApp templates"),
    ("lead qualification automation", "/glossary/lead-qualification-system", "Informational", "P2", "High", "Definition page"),
    ("AI lead qualification agent", "/services/ai-agents", "Commercial", "P1", "High", "Existing page; matches GSC 'lead response agent'"),
    ("AI appointment booking agent", "/services/ai-agents", "Commercial", "P2", "High", ""),
    ("AI sales automation agency", "/services/ai-agents", "Commercial", "P2", "High", ""),
    ("marketing automation for small business", "/services/automation-revenue-systems", "Commercial", "P2", "High", ""),
    ("CRM vs spreadsheets for lead management", "PLANNED: /insights/crm-vs-spreadsheets-for-leads", "Informational", "P3", "Medium", "Planned"),
    ("how to automate lead follow up", "/insights/how-to-automate-lead-follow-up", "Informational", "P1", "High", "New article"),
    ("how to reduce lead response time", "/insights/how-to-automate-lead-follow-up", "Informational", "P1", "High", "Same article"),
])
add(GL, EN, "L. Global: landing pages, CRO and funnels", [
    ("landing page development services", "/services/conversion", "Commercial", "P2", "High", "Conversion page owns landing pages and CRO"),
    ("high converting landing page agency", "/services/conversion", "Commercial", "P2", "High", ""),
    ("lead generation landing page design", "/services/conversion", "Commercial", "P2", "High", ""),
    ("conversion rate optimization services", "/services/conversion", "Commercial", "P2", "High", ""),
    ("sales funnel development agency", "/services/conversion", "Commercial", "P2", "High", ""),
    ("B2B lead generation funnels", "/services/b2b-lead-generation", "Commercial", "P2", "High", ""),
    ("landing page optimization for Google Ads", "/services/conversion", "Commercial", "P3", "Medium", ""),
    ("landing page optimization for Meta Ads", "/services/conversion", "Commercial", "P3", "Medium", ""),
    ("lead form vs landing page", "/insights/facebook-lead-forms-vs-landing-pages", "Informational, comparison", "P1", "High", "New article"),
    ("why Facebook leads don't convert", "/insights/why-facebook-leads-dont-convert", "Informational", "P1", "High", "New article"),
    ("how to improve landing page conversion rate", "PLANNED: /insights/how-to-improve-landing-page-conversion-rate", "Informational", "P2", "High", "Planned"),
    ("landing page vs website for lead generation", "/services/conversion", "Informational", "P3", "Medium", "Answer as FAQ on conversion page before writing an article"),
])
add(GL, EN, "M. Global: branding, creative and tech", [
    ("performance creative agency", "/studios", "Commercial", "P2", "High", "Madvert Studios"),
    ("Meta Ads creative agency", "/studios", "Commercial", "P2", "High", ""),
    ("video ads production agency", "/studios", "Commercial", "P2", "High", ""),
    ("motion graphics advertising agency", "/studios", "Commercial", "P3", "Medium", ""),
    ("AI video ads agency", "/studios", "Commercial", "P3", "Medium", ""),
    ("social media creative agency", "/services/social-media-management", "Commercial", "P3", "Medium", ""),
    ("branding agency for growing businesses", "/services/branding-marketing", "Commercial", "P2", "High", ""),
    ("conversion focused website development", "/services/web-development", "Commercial", "P2", "High", ""),
    ("Next.js website development agency", "/services/web-development", "Commercial", "P3", "Medium", "This site is built on Next.js: usable as proof"),
    ("custom software development for businesses", "/services/tech-product-development", "Commercial", "P3", "Medium", ""),
    ("marketing dashboard development", "/services/tech-product-development", "Commercial", "P3", "Medium", ""),
    ("custom CRM development agency", "/services/tech-product-development", "Commercial", "P3", "Medium", ""),
    ("AI agent development agency", "/services/ai-agents", "Commercial", "P2", "High", ""),
])
add(GL, EN, "N. Global: informational and AEO questions", [
    ("what is answer engine optimization", "/insights/what-is-aeo", "Informational", "P1", "High", "Existing guide plus glossary definition"),
    ("how does AEO work", "/glossary/aeo", "Informational", "P2", "High", "Definition page has How it works"),
    ("what is generative engine optimization", "/insights/seo-vs-aeo-vs-geo", "Informational", "P1", "High", "New article defines GEO with the source paper"),
    ("what is the difference between SEO and AEO", "/insights/seo-vs-aeo-vs-geo", "Informational", "P1", "High", "New article"),
    ("how to optimize website for ChatGPT", "PLANNED: /insights/how-to-optimize-website-for-chatgpt", "Informational", "P1", "High", "Planned"),
    ("how to appear in Google AI Overviews", "PLANNED: /insights/google-ai-overviews-visibility", "Informational", "P2", "High", "Planned"),
    ("how to get qualified leads from Meta Ads", "/insights/meta-ads-lead-generation-pakistan", "Informational", "P1", "High", "Existing article"),
    ("why are my Facebook leads low quality", "/insights/why-facebook-leads-dont-convert", "Informational", "P1", "High", "New article"),
    ("why are my Google Ads not converting", "/services/google-ads", "Informational", "P3", "Medium", "Candidate article later"),
    ("Meta Ads vs Google Ads for B2B lead generation", "/insights/meta-ads-vs-google-ads-lead-generation", "Informational, comparison", "P1", "High", "New article with B2B section"),
    ("how much does Meta Ads management cost", "PLANNED: /insights/how-much-does-meta-ads-management-cost", "Informational / commercial", "P2", "High", "Needs approved pricing approach before writing"),
    ("how much does a digital marketing agency cost", "/insights/how-to-choose-digital-marketing-agency-karachi", "Informational", "P3", "Medium", "Answered as FAQ in existing guide"),
    ("what is a full stack marketing agency", "/glossary/full-stack-digital-marketing", "Informational", "P2", "High", "Definition page"),
    ("how does marketing automation improve lead conversion", "/insights/how-to-automate-lead-follow-up", "Informational", "P2", "High", "New article"),
    ("what is the best CRM for lead generation", "PLANNED: /insights/gohighlevel-vs-hubspot-for-lead-generation", "Informational", "P3", "Medium", "Planned"),
    ("how to build a lead generation funnel", "PLANNED: /insights/how-to-build-lead-generation-funnel", "Informational", "P2", "High", "Planned"),
    ("how to choose a digital marketing agency", "/insights/how-to-choose-digital-marketing-agency-karachi", "Informational", "P2", "High", "Existing guide (Karachi framing; consider a global version later)"),
    ("how to choose an AEO agency", "PLANNED: /insights/how-to-choose-an-aeo-agency", "Informational / commercial", "P3", "Medium", "Planned"),
    ("should a small business hire an agency or build an in house team", "PLANNED: /insights/agency-vs-in-house-vs-external-growth-department", "Informational", "P2", "High", "Planned; glossary comparison table exists"),
    ("how to measure marketing ROI", "PLANNED: /insights/how-to-measure-marketing-roi", "Informational", "P3", "Medium", "Planned"),
    ("how to reduce customer acquisition cost", "/tools/cost-per-qualified-lead-calculator", "Informational", "P3", "Medium", "Calculator plus CPQL content"),
    ("how to increase lead to appointment conversion rate", "/insights/how-to-automate-lead-follow-up", "Informational", "P2", "High", "New article"),
])

out = os.path.join(os.path.dirname(__file__), "..", "docs", "seo", "keyword-master.csv")
with open(out, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=list(R[0].keys()))
    w.writeheader()
    w.writerows(R)
from collections import Counter
print(len(R), "keywords;", dict(Counter(r["Priority"] for r in R)), dict(Counter(r["URL status"] for r in R)))
