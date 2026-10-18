import { NextResponse } from "next/server";
import { safeEqual } from "@/onboarding/server/crypto";
import { syncIndexNow } from "@/seo/indexnow-sync";

/**
 * Runs the IndexNow sync. Called by the Vercel cron (vercel.json), which sends
 * `Authorization: Bearer <CRON_SECRET>`, and can be called manually with the same header
 * right after a deploy.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  if (!safeEqual(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await syncIndexNow());
}
