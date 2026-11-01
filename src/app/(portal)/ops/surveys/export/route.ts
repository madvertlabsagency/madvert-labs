import { connection } from "next/server";
import { requireOps } from "@/onboarding/server/auth";
import { handle } from "@/onboarding/server/http";
import { listSurveyResponses, surveyCsv } from "@/survey/results";
import { SURVEYS, SURVEY_IDS, type SurveyId } from "@/survey/surveys";

export async function GET(req: Request) {
  await connection();
  return handle(async () => {
    await requireOps();
    const param = new URL(req.url).searchParams.get("survey") ?? "";
    const survey: SurveyId = param in SURVEYS ? (param as SurveyId) : SURVEY_IDS[0];
    const csv = surveyCsv(await listSurveyResponses(survey));
    return new Response(`﻿${csv}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${survey}-feedback-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "private, no-store",
      },
    });
  });
}
