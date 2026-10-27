import { NextResponse } from "next/server";
import { safeEqual } from "@/onboarding/server/crypto";
import { runAndStoreAudit } from "@/seo/control";

/** Weekly technical SEO audit (Vercel Cron, `Authorization: Bearer <CRON_SECRET>`). Results appear in /ops/seo. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  if (!safeEqual(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const report = await runAndStoreAudit("cron", new URL(req.url).origin);
  return NextResponse.json(report.summary);
}
