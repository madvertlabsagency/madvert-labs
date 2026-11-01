import { z } from "zod";

/** Product feedback survey for the white-label partnership page. Shared by the form, the API and Operations. */
export const SURVEY_ID = "white-label-partnership";
export const SURVEY_PRODUCT_URL = "/white-label-partnership";

export const WOULD_BUY = ["Yes", "Maybe", "No"] as const;

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const answer = text(3000).min(2, "Please write a short answer.");

export const surveySchema = z.object({
  name: text(120).min(2, "Please enter your name."),
  business: text(160).optional().default(""),
  contact: text(160).optional().default(""),
  liked: answer,
  unclear: answer,
  change: answer,
  wouldBuy: z.enum(WOULD_BUY, { message: "Please pick one." }),
  wouldBuyWhy: text(1500).optional().default(""),
  price: text(500).min(1, "Please share a price you would consider reasonable."),
  suggestions: text(3000).optional().default(""),
  website_confirm: z.string().optional(),
  startedAt: z.number(),
  turnstileToken: z.string().optional(),
});
export type SurveyInput = z.infer<typeof surveySchema>;

export type SurveyResponse = Omit<SurveyInput, "website_confirm" | "startedAt" | "turnstileToken"> & {
  id: string;
  survey: string;
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
  { key: "wouldBuy", label: "Would they buy/use" },
  { key: "wouldBuyWhy", label: "Why (buy/use)" },
  { key: "price", label: "Price response" },
  { key: "suggestions", label: "Any suggestions" },
];
