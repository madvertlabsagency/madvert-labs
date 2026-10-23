// 11 BACKEND — "Madvert Labs backend mein creatives, campaigns, landing pages, qualification
// systems, CRM workflows aur follow-up infrastructure manage karta hai taa ke marketing aur
// sales ek connected system ki tarah kaam karein." Fast premium montage → ONE CONNECTED SYSTEM.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline, shake } from "../components/kinetic";
import { ribbon } from "../components/ribbon";
import { tile, TILES } from "../components/explainer";
import { logo } from "../components/brand";
import { cutFlash } from "../components/vert";

const WORDS: [string, string, number][] = [["CREATIVES", "creatives", 0], ["CAMPAIGNS", "campaigns", 0], ["LANDING PAGES", "landing", 2], ["QUALIFICATION", "qualification", 1], ["CRM", "crm", 0], ["FOLLOW-UP", "followup", 0]];
// grid cell for tile k in the final 4 x 2 layout
const cell = (k: number) => ({ x: 70 + (k % 4) * 240, y: 560 + Math.floor(k / 4) * 240, s: 220 / 600 });

export function drawBackend(ctx: any, t: number) {
  const tM = ws("madvert", 1), tCr = ws("creatives"), tMk = ws("marketing"), tOne = ws("ek", 1), tCon = ws("connected"), tSys = ws("system", 2);
  // tile k is on stage from its cue until the next one
  const cues = [tCr, tCr + 0.45, ws("campaigns"), ws("landing", 2), ws("qualification", 1), ws("crm"), ws("followup"), ws("manage")];
  const [sx, sy] = shake(t, tCon, 6);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.5, glowA: 1.2 });
  // opener: MADVERT LABS · IN THE BACKEND
  const oa = ep(t, tM - 0.1, 0.5, outQuart) * (1 - ep(t, tCr - 0.2, 0.3));
  if (oa > 0) {
    ctx.save(); ctx.globalAlpha *= oa;
    logo(ctx, W / 2, 760, 640, { reveal: ep(t, tM - 0.1, 0.6, inOutExpo), pulse: prog(t, ws("labs", 1) + 0.1, ws("labs", 1) + 1.0) });
    text(ctx, "IN THE BACKEND", W / 2, 1020, { size: 40, weight: 800, family: F.head, ls: 10, color: C.blue, align: "center", alpha: ep(t, ws("backend") - 0.05, 0.4) });
    ctx.restore();
  }
  const grid = ep(t, tMk - 0.2, 0.9, inOutExpo);
  const stage = { x: 140, y: 470, w: 800 };
  for (let k = 0; k < 8; k++) {
    const a0 = cues[k], a1 = k < 7 ? cues[k + 1] : tMk;
    const inA = ep(t, a0 - 0.15, 0.35, outExpo);
    if (inA <= 0) continue;
    // on stage (only the current one), then parks in the grid
    const cur = t < a1 - 0.1;
    const c = cell(k);
    let x: number, y: number, s: number, al = 1;
    if (grid > 0) { x = lerp(stage.x, c.x, grid); y = lerp(stage.y, c.y, grid); s = lerp(stage.w / 600, c.s, grid); al = cur ? 1 : grid; }
    else if (cur) { x = stage.x + (1 - inA) * 120; y = stage.y; s = stage.w / 600 * lerp(0.94, 1, inA); al = inA; }
    else continue;
    if (al <= 0) continue;
    ctx.save(); ctx.globalAlpha *= al; ctx.translate(x, y); ctx.scale(s, s);
    tile(ctx, k, t - a0);
    ctx.restore();
    // small label under each stage tile
    if (cur && grid <= 0) text(ctx, `${String(k + 1).padStart(2, "0")}  ${TILES[k]}`, W / 2, 1316, { size: 24, weight: 700, family: F.mono, ls: 4, color: C.sub, align: "center", alpha: inA });
    if (grid > 0.6) text(ctx, TILES[k], c.x + 110, c.y + 250, { size: 15, weight: 700, family: F.mono, ls: 1, color: C.sub, align: "center", alpha: (grid - 0.6) / 0.4 });
  }
  for (const c of cues.slice(1)) cutFlash(ctx, t, c - 0.1, 0.06);
  // one term at a time
  WORDS.forEach(([s, w, n], i) => {
    const a = ws(w, n), b = i < WORDS.length - 1 ? ws(WORDS[i + 1][1], WORDS[i + 1][2]) : tMk;
    kline(ctx, t, { x: W / 2, y: 1450, size: 96, align: "center", out: b - 0.12, outAnim: "up", outDur: 0.18, words: [{ s, t: a - 0.05, anim: "rise", grad: i % 2 === 1 }] });
  });
  // connected: ribbons link the grid, then the line resolves
  if (grid > 0.8) {
    const rp = ep(t, tOne - 0.2, 0.9, inOutCubic);
    for (let k = 0; k < 7; k++) {
      const a = cell(k), b = cell(k + 1);
      const p0: [number, number] = [a.x + 110, a.y + 110], p1: [number, number] = [b.x + 110, b.y + 110];
      ribbon(ctx, [p0, [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - 30], p1], { to: clamp(rp * 7 - k), width: 4, flow: t, speed: 1.2, alpha: 0.9 });
    }
  }
  kline(ctx, t, { x: W / 2, y: 1200, size: 60, align: "center", weight: 700, ls: 6, words: [{ s: "ONE", t: tOne, anim: "rise", color: C.sub }] });
  kline(ctx, t, { x: W / 2, y: 1340, size: 112, align: "center", words: [{ s: "CONNECTED", t: tCon, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1470, size: 112, align: "center", words: [{ s: "SYSTEM.", t: tSys, anim: "slam" }] });
  const sw = prog(t, tCon - 0.05, tCon + 0.6);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.5, 0.2);
  ctx.restore();
}
