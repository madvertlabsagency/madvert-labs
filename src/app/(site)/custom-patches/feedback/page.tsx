import type { Metadata } from "next";
import { Cta } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { FeedbackForm } from "@/survey/FeedbackForm";
import { SURVEYS } from "@/survey/surveys";

const cfg = SURVEYS["custom-patches"];

export const metadata: Metadata = pageMetadata({
  title: "Custom Patch RFQs Feedback",
  description: "Share your honest feedback on Madvert Labs' pre-qualified custom patch RFQs.",
  path: cfg.formPath,
  noindex: true,
});

export default function CustomPatchesFeedbackPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+48px)]" aria-labelledby="page-title">
      <div className="bg-aura pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative mx-auto max-w-[820px]">
        <div data-reveal>
          <Eyebrow>Your feedback</Eyebrow>
        </div>
        <h1 id="page-title" data-reveal className="t-h1 mt-6">
          Help Us Improve <span className="t-grad">Pre-Qualified Custom Patch RFQs.</span>
        </h1>
        <p data-reveal className="t-lead mt-6">
          Please look through the offer page first, including the video. Then tell us honestly what works, what doesn&rsquo;t, and what you would change. It takes
          about 3 minutes.
        </p>
        <div data-reveal className="mt-7">
          <Cta href={cfg.productUrl} variant="secondary" target="_blank" rel="noopener" trackLabel="survey_view_product">
            Open the custom patches page
          </Cta>
        </div>
        <div className="mt-12">
          <FeedbackForm survey="custom-patches" />
        </div>
      </div>
    </section>
  );
}
