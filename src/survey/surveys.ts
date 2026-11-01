import { z } from "zod";

/** Product feedback surveys. Shared by the public form, the API and Operations → Surveys. */
export const SURVEYS = {
  "custom-patches": {
    product: "Pre-Qualified Custom Patch RFQs",
    productUrl: "/custom-patches",
    formPath: "/custom-patches/feedback",
    price: "D. What price per qualified RFQ would you consider reasonable?",
    priceHint: "Our founding beta price is $15 per accepted RFQ, ad spend included. Tell us honestly what feels fair.",
  },
} as const;
export type SurveyId = keyof typeof SURVEYS;
export const SURVEY_IDS = Object.keys(SURVEYS) as [SurveyId, ...SurveyId[]];

/** Pilot campaign size: the current pilot is 40 qualified RFQs. */
export const PILOT_SIZE = ["Fewer than 40", "40 is right", "More than 40"] as const;

export const PAYMENT_OPTIONS = [
  "Card on file, charged as each RFQ is delivered",
  "Pay in advance",
  "Bi-weekly payments",
] as const;

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const answer = text(3000).min(2, "Please write a short answer.");

export const surveySchema = z.object({
  survey: z.enum(SURVEY_IDS),
  name: text(120).min(2, "Please enter your name."),
  business: text(160).optional().default(""),
  contact: text(160).optional().default(""),
  liked: answer,
  unclear: answer,
  change: answer,
  price: text(500).min(1, "Please share a price you would consider reasonable."),
  pilotSize: z.enum(PILOT_SIZE, { message: "Please pick one." }),
  pilotFeedback: text(1500).optional().default(""),
  payment: z.enum(PAYMENT_OPTIONS, { message: "Please pick one." }),
  paymentNote: text(1500).optional().default(""),
  suggestions: answer,
  website_confirm: z.string().optional(),
  startedAt: z.number(),
  turnstileToken: z.string().optional(),
});
export type SurveyInput = z.infer<typeof surveySchema>;

export type SurveyResponse = Omit<SurveyInput, "website_confirm" | "startedAt" | "turnstileToken"> & {
  id: string;
  submittedAt: string;
};

/** Column order for the results table and CSV, matching the survey brief. */
export const SURVEY_COLUMNS: { key: keyof SurveyResponse; label: string }[] = [
  { key: "submittedAt", label: "Date" },
  { key: "name", label: "Customer" },
  { key: "business", label: "Business" },
  { key: "contact", label: "Contact" },
  { key: "liked", label: "What they liked" },
  { key: "unclear", label: "What was unclear" },
  { key: "change", label: "What they would change" },
  { key: "price", label: "Price response" },
  { key: "pilotSize", label: "Pilot size (40 RFQs)" },
  { key: "pilotFeedback", label: "Pilot feedback" },
  { key: "payment", label: "Preferred payment" },
  { key: "paymentNote", label: "Payment notes" },
  { key: "suggestions", label: "Additions / suggestions" },
];
