import { NextResponse } from "next/server";
import { z } from "zod";
import { db, dbDriver } from "@/onboarding/server/db";
import { clientIp, rateLimit } from "@/integrations/rate-limit";
import { spamCheck } from "@/integrations/spam";
import { surveySchema, type SurveyResponse } from "@/survey/surveys";

function fail(status: number, error: string, fields?: Record<string, string[]>) {
  return NextResponse.json({ ok: false, error, fields }, { status });
}

/** Stores one product feedback response. Read in Operations → Surveys. */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = await rateLimit(`survey:${ip}`, 6, 600);
  if (!limit.ok) return fail(429, "Too many submissions. Please try again in a few minutes.");

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return fail(400, "Invalid request");
  }
  const parsed = surveySchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Please check the highlighted fields.", z.flattenError(parsed.error).fieldErrors as Record<string, string[]>);
  const { website_confirm, startedAt, turnstileToken, ...answers } = parsed.data;

  const spam = await spamCheck({ website_confirm, startedAt, turnstileToken }, ip);
  if (spam) {
    console.warn("[survey] rejected as spam:", spam);
    return NextResponse.json({ ok: true });
  }

  if (dbDriver() === "unconfigured") {
    console.error("[survey] DATABASE_URL is not set; response not stored");
    return fail(503, "We could not save your answers right now. Please try again later.");
  }

  const response: SurveyResponse = { ...answers, id: crypto.randomUUID(), submittedAt: new Date().toISOString() };
  try {
    await db().put("survey_responses", response);
  } catch (e) {
    console.error("[survey] store failed:", e instanceof Error ? e.message : e);
    return fail(500, "We could not save your answers. Please try again.");
  }
  return NextResponse.json({ ok: true });
}
