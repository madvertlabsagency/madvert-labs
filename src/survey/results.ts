import "server-only";
import { db, dbDriver } from "@/onboarding/server/db";
import { SURVEY_COLUMNS, type SurveyResponse } from "./white-label";

export async function listSurveyResponses(): Promise<SurveyResponse[]> {
  if (dbDriver() === "unconfigured") return [];
  const rows = await db().find<SurveyResponse>("survey_responses");
  return rows.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

const cell = (v: unknown) => {
  const s = String(v ?? "");
  // Neutralise spreadsheet formulas from public input, then quote.
  const safe = /^[=@\t\r]|^[+-](?![\d\s(])/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

export function surveyCsv(rows: SurveyResponse[]) {
  const head = SURVEY_COLUMNS.map((c) => cell(c.label)).join(",");
  return [head, ...rows.map((r) => SURVEY_COLUMNS.map((c) => cell(r[c.key])).join(","))].join("\r\n");
}
