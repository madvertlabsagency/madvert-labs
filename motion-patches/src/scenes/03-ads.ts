// 03 ADS — spend climbs, cost per lead climbs, low-intent leads pour in.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, chip, lineChart, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutCubic, lerp, prog, rgba, outBack } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { appWindow, toggle, exampleTag } from "../components/ui";
import { sectionTag, weakLead } from "../components/rfq";

const ROWS = [
  ["Patch Quote Campaign A", 6.8, 412, 2.1, 18.4],
  ["Patch Buyer Campaign B", 11.4, 268, 1.7, 21.9],
  ["Embroidery Leads Campaign C", 18.7, 151, 1.3, 26.2],
  ["Bulk Orders Campaign D", 27.3, 88, 0.9, 31.5],
] as const;
const COLS = ["Campaign name", "Amount spent", "Leads", "Cost per lead", "CTR", "CPM"];
const CX = [40, 430, 610, 760, 960, 1080];

export function drawAds(ctx: any, t: number, frozen?: number) {
  const tt = frozen ?? t;
  const t0 = ws("or you're running") - 0.2;
  const tExp = ws("expensive leads"), tWin = ws("window shoppers"), tMany = ws("too many");
  background(ctx, t, { grid: 0.4 });
  sectionTag(ctx, "03", "Paid ads without a system", ep(t, t0, 0.4));
  const dimT = ep(tt, tMany - 0.1, 0.5);

  // ads manager window
  const wa = ep(tt, t0, 0.6, outQuart);
  const wx = 120, wy = 130, ww = 1220, wh = 640;
  ctx.save(); ctx.globalAlpha = wa * (1 - 0.45 * dimT); ctx.translate(0, (1 - wa) * 50);
  const r = appWindow(ctx, wx, wy, ww, wh, "Ads Manager · Campaigns");
  // toolbar
  rr(ctx, r.x + 24, r.y + 18, 150, 36, 10); ctx.fillStyle = C.blue; ctx.fill();
  text(ctx, "Campaigns", r.x + 99, r.y + 42, { size: 15, weight: 700, align: "center", color: "#fff" });
  text(ctx, "Ad sets", r.x + 220, r.y + 42, { size: 15, weight: 600, color: C.sub });
  text(ctx, "Ads", r.x + 310, r.y + 42, { size: 15, weight: 600, color: C.sub });
  rr(ctx, r.x + r.w - 190, r.y + 18, 166, 36, 10); ctx.fillStyle = C.well; ctx.fill();
  icon(ctx, "calendar", r.x + r.w - 178, r.y + 26, 20, C.sub, 2);
  text(ctx, "Last 30 days", r.x + r.w - 150, r.y + 42, { size: 14, weight: 600, color: C.sub });
  // header
  const hy = r.y + 92;
  ctx.fillStyle = "#F3F7FC"; ctx.fillRect(r.x, hy - 28, r.w, 44);
  COLS.forEach((c, i) => text(ctx, c, r.x + CX[i], hy, { size: 14, weight: 700, color: i === 3 ? C.red : C.sub }));
  // CPL column highlight
  const hl = ep(tt, ws("running ads") + 0.4, 0.5);
  if (hl > 0) { rr(ctx, r.x + CX[3] - 16, hy - 32, 180, 4 * 74 + 52, 12); ctx.fillStyle = rgba(C.red, 0.08 * hl); ctx.fill(); ctx.strokeStyle = rgba(C.red, 0.5 * hl); ctx.lineWidth = 1.5; ctx.stroke(); }
  ROWS.forEach(([name, cpl, leads, ctr, cpm], i) => {
    const ry = hy + 30 + i * 74;
    const ra = ep(tt, t0 + 0.25 + i * 0.1, 0.4, outQuart);
    if (ra <= 0) return;
    ctx.save(); ctx.globalAlpha *= ra;
    ctx.fillStyle = C.line; ctx.fillRect(r.x + 20, ry + 56, r.w - 40, 1);
    toggle(ctx, r.x + CX[0], ry + 14, 1, 0.7);
    text(ctx, name, r.x + CX[0] + 52, ry + 34, { size: 17, weight: 600 });
    // spend ticks up continuously
    const spend = (1200 + i * 650) + (tt - t0) * (180 + i * 90);
    text(ctx, "$" + Math.round(spend).toLocaleString("en-US"), r.x + CX[1], ry + 34, { size: 17, weight: 600, family: F.mono });
    text(ctx, String(Math.round(leads * (0.7 + 0.3 * clamp((tt - t0) / 4)))), r.x + CX[2], ry + 34, { size: 17, weight: 600, family: F.mono, color: C.sub });
    // CPL steps in, row by row, with a climbing count
    const cueI = [ws("running ads") + 0.3, ws("which brings") + 0.1, tExp, ws("leads", 0) + 0.2][i];
    const cp = ep(tt, cueI, 0.45, outQuart);
    if (cp > 0) {
      const v = lerp(i ? ROWS[i - 1][1] : 3.9, cpl, cp);
      text(ctx, "$" + v.toFixed(2), r.x + CX[3], ry + 34, { size: 19, weight: 800, family: F.mono, color: i >= 2 ? "#E03553" : C.text });
      icon(ctx, "arrow", r.x + CX[3] + 100, ry + 20, 18, C.red, 2.4);
    }
    text(ctx, ctr.toFixed(1) + "%", r.x + CX[4], ry + 34, { size: 17, weight: 600, family: F.mono, color: C.sub });
    text(ctx, "$" + cpm.toFixed(2), r.x + CX[5], ry + 34, { size: 17, weight: 600, family: F.mono, color: C.sub });
    ctx.restore();
  });
  // CPL trend chart
  const cy = hy + 340;
  text(ctx, "COST PER LEAD · TREND", r.x + 40, cy, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
  lineChart(ctx, r.x + 40, cy + 20, 640, 150, [0.12, 0.16, 0.15, 0.24, 0.3, 0.36, 0.47, 0.55, 0.7, 0.86, 0.97], ep(tt, ws("running ads"), 3.0, inOutCubic), { color: C.red, lw: 4 });
  // intent meter falls
  const fall = ep(tt, tExp, 1.6, inOutCubic);
  text(ctx, "BUYING INTENT", r.x + 760, cy, { size: 13, weight: 700, family: F.mono, ls: 2, color: C.sub });
  rr(ctx, r.x + 760, cy + 30, 380, 16, 8); ctx.fillStyle = "#E6EEF7"; ctx.fill();
  rr(ctx, r.x + 760, cy + 30, 380 * lerp(0.7, 0.12, fall), 16, 8); ctx.fillStyle = fall > 0.5 ? C.red : C.amber; ctx.fill();
  text(ctx, "SPEND ↑   CPL ↑   INTENT ↓", r.x + 760, cy + 100, { size: 22, weight: 800, family: F.body, color: C.text, alpha: ep(tt, tExp + 0.3, 0.4) });
  exampleTag(ctx, r.x + 40, r.y + r.h - 18);
  ctx.restore();

  // EXPENSIVE LEADS (L2, right)
  kline(ctx, tt, { x: 1400, y: 300, size: 74, weight: 800, out: tMany - 0.15, outAnim: "up",
    words: [{ s: "EXPENSIVE", t: tExp, anim: "slam", color: "#E03553" }] });
  kline(ctx, tt, { x: 1400, y: 390, size: 74, weight: 800, out: tMany - 0.15, outAnim: "up", words: [{ s: "LEADS", t: ws("leads", 0) }] });

  // low-intent lead cards pour in
  const leads: [[string, string], string, number, number, number][] = [
    [["SM", "Sam M."], "Need price", 1390, 110, -0.05],
    [["JD", "John D."], "Just checking", 1500, 330, 0.04],
    [["RK", "Rob K."], "Looking around", 1380, 470, -0.03],
  ];
  leads.forEach(([who, q, x, y, rot], i) => {
    const a = ep(tt, tMany + i * 0.2, 0.5, outBack);
    if (a <= 0) return;
    weakLead(ctx, x + (1 - a) * 200, y - (1 - a) * 80, 0.88, who, q, { alpha: clamp(a * 2), rot: rot * a });
  });
  // TOO MANY WINDOW SHOPPERS (L1)
  if (tt > tMany) {
    ctx.save(); ctx.globalAlpha = ep(tt, tMany, 0.4) * 0.8; const sg = ctx.createLinearGradient(0, 600, 0, 760); sg.addColorStop(0, "rgba(248,251,255,0)"); sg.addColorStop(1, "rgba(248,251,255,1)"); ctx.fillStyle = sg; ctx.fillRect(0, 600, W, 480); ctx.restore();
  }
  kline(ctx, tt, { x: 120, y: 720, size: 60, weight: 700, color: C.sub, words: [{ s: "TOO", t: tMany }, { s: "MANY", t: ws("many") }] });
  kline(ctx, tt, { x: 116, y: 860, size: 150, weight: 800, words: [{ s: "WINDOW", t: tWin, anim: "slam" }, { s: "SHOPPERS.", t: ws("shoppers"), anim: "slam", color: "#E03553" }] });
}
