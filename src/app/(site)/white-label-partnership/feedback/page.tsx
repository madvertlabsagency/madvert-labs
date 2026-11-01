import type { Metadata } from "next";
import { Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { FeedbackForm } from "@/sections/white-label/FeedbackForm";
import { SURVEY_PRODUCT_URL } from "@/survey/white-label";

export const metadata: Metadata = pageMetadata({
  title: "White-Label Partnership Feedback",
  description: "Share your honest feedback on the Madvert Labs white-label partnership.",
  path: "/white-label-partnership/feedback",
  noindex: true,
});

export default function WhiteLabelFeedbackPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+48px)]" aria-labelledby="page-title">
      <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative mx-auto max-w-[820px]">
        <div data-reveal>
          <Eyebrow>Your feedback</Eyebrow>
        </div>
        <h1 id="page-title" data-reveal className="t-h1 mt-6">
          Help Us Improve The <span className="t-grad">White-Label Partnership.</span>
        </h1>
        <p data-reveal className="t-lead mt-6">
          Please look through the page first, including the short video. Then tell us honestly what works, what doesn&rsquo;t, and what you would change. It
          takes about 3 minutes.
        </p>
        <div data-reveal className="mt-7">
          <Cta href={SURVEY_PRODUCT_URL} variant="secondary" target="_blank" rel="noopener" trackLabel="survey_view_product">
            Open the white-label page
          </Cta>
        </div>
        <div className="mt-12">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
