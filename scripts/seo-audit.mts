/**
 * npm run seo:audit -- [base URL]   (default http://localhost:3000)
 * Audits the running site against the production canonical origin and exits 1 on any error.
 * Add --json to print the full report.
 */
import * as auditModule from "../src/seo/audit.ts";

// The project is CommonJS, so the TypeScript module arrives as a default export here.
const { auditSite } = ((auditModule as { default?: typeof auditModule }).default ?? auditModule) as typeof auditModule;

const args = process.argv.slice(2);
const base = args.find((a) => a.startsWith("http")) ?? "http://localhost:3000";
const canonicalOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://madvertlabs.com";

const report = await auditSite({ base, canonicalOrigin });
if (args.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const icon = { error: "✖", warning: "▲", notice: "·" } as const;
  for (const i of report.site) console.log(`${icon[i.severity]} [${i.code}] ${i.message}`);
  for (const p of report.pages) for (const i of p.issues) console.log(`${icon[i.severity]} ${p.path} [${i.code}] ${i.message}`);
  const s = report.summary;
  console.log(`\n${s.pages} pages · ${s.errors} errors · ${s.warnings} warnings · ${s.notices} notices · score ${s.score}/100`);
}
process.exit(report.summary.errors ? 1 : 0);
