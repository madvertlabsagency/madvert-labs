import { connection } from "next/server";
import { requireOps } from "@/onboarding/server/auth";
import { handle } from "@/onboarding/server/http";
import { listSurveyResponses, surveyCsv } from "@/survey/results";

export async function GET() {
  await connection();
  return handle(async () => {
    await requireOps();
    const csv = surveyCsv(await listSurveyResponses());
    return new Response(`﻿${csv}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="white-label-feedback-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "private, no-store",
      },
    });
  });
}
