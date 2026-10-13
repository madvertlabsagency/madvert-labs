// 13 NO SEPARATE BURDENS — five things that would normally each be a job of their own.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, chip } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, noise } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { glass, iconTile, lines } from "../components/ui";
import { sectionTag } from "../components/rfq";

export const BURDENS: [string, string, string, string][] = [
  ["AD SPEND", "dollar", "Budgets & bids to manage", "ad spend"],
  ["CREATIVES", "image", "Designs to produce", "creatives"],
  ["FUNNELS", "funnel", "Pages to build & test", "funnels"],
  ["CRM", "db", "Software to set up", "crm"],
  ["AUTOMATIONS", "bolt", "Workflows to maintain", "automations"],
];
export const bx = (i: number) => 110 + i * 345;
export const BY = 350, BW = 320, BH = 360;

export function burdenCard(ctx: any, i: number, x: number, y: number, s: number, on: number, a = 1, rot = 0) {
  const [name, ic, sub] = BURDENS[i];
  ctx.save();
  ctx.globalAlpha *= a;
  ctx.translate(x + BW / 2, y + BH / 2); ctx.rotate(rot); ctx.scale(s, s); ctx.translate(-BW / 2, -BH / 2);
  glass(ctx, 0, 0, BW, BH, { r: 24, focus: on });
  iconTile(ctx, ic, 24, 24, 64, on > 0.5 ? C.blue : C.mute, on);
  text(ctx, name, 24, 130, { size: 28, weight: 800, family: F.head, color: on > 0.3 ? C.text : C.mute });
  text(ctx, sub, 24, 160, { size: 16, weight: 600, color: C.sub });
  // to-do burden
  for (let k = 0; k < 3; k++) {
    const yy = 190 + k * 46;
    rr(ctx, 24, yy, BW - 48, 36, 10); ctx.fillStyle = C.well; ctx.fill();
    ctx.beginPath(); ctx.arc(44, yy + 18, 7, 0, 7); ctx.strokeStyle = "#B9C7D8"; ctx.lineWidth = 2; ctx.stroke();
    rr(ctx, 62, yy + 13, 150 - k * 30, 10, 5); ctx.fillStyle = "#DCE6F2"; ctx.fill();
  }
  if (on > 0) chip(ctx, "Separate job", 24, BH - 46, { size: 13, h: 28, fg: "#B4570B", bg: rgba(C.amber, 0.14), dot: C.amber, alpha: on });
  ctx.restore();
}

export function drawBurden(ctx: any, t: number) {
  const t0 = ws("and the best part") - 0.25;
  const tW = ws("you don't need"), tSep = ws("separately");
  background(ctx, t, { grid: 0.4 });
  sectionTag(ctx, "11", "No separate tools to manage", ep(t, t0, 0.4));
  const cues = [ws("ad spend"), ws("creatives"), ws("funnels"), ws("crm", 1), ws("automations", 1)];
  const spread = ep(t, tSep, 0.6, inOutCubic);
  BURDENS.forEach((_, i) => {
    const a = ep(t, t0 + 0.1 + i * 0.08, 0.5, outQuart);
    const on = ep(t, cues[i], 0.35);
    const mid = i - 2;
    const x = bx(i) + mid * 40 * spread, y = BY + (1 - a) * 60 + Math.abs(mid) * 18 * spread + noise(t * 0.7 + i) * 4;
    burdenCard(ctx, i, x, y, 1 - 0.04 * spread, Math.max(on * (1 - 0.2 * spread), 0.0), a, mid * 0.035 * spread);
  });
  kline(ctx, t, { x: W / 2, y: 190, size: 62, align: "center", weight: 700, color: C.sub, out: tW - 0.12, outAnim: "up", outDur: 0.25,
    words: [{ s: "AND", t: ws("and the best part") }, { s: "THE", t: ws("the best") }, { s: "BEST", t: ws("best part"), color: C.text }, { s: "PART?", t: ws("part"), color: C.text }] });
  kline(ctx, t, { x: W / 2, y: 200, size: 80, align: "center",
    words: [{ s: "YOU", t: tW }, { s: "DON'T", t: ws("don't need") }, { s: "NEED", t: ws("need to worry") }, { s: "TO", t: ws("to worry") }, { s: "WORRY.", t: ws("worry"), grad: true, anim: "slam" }] });
  kline(ctx, t, { x: W / 2, y: 820, size: 52, align: "center", weight: 700, color: C.sub, words: [{ s: "SEPARATELY.", t: tSep, anim: "slideR" }] });
}
