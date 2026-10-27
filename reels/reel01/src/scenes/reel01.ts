// REEL 01 — "Your business doesn't need more marketing." Transformation narrative:
// marketing noise → disconnected islands → leaking gaps → one connected growth system.
// Content lives in y 260–1420; captions sit below; the right edge leaves room for platform UI.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak, lineChart } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, inCubic, lerp, prog, rgba, hash, noise } from "../core/ease";
import { ws, we, cut } from "../core/words";
import { img } from "../core/assets";
import { kline, shake } from "../components/kinetic";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { checkBadge, iconTile, toggle, pill } from "../components/ui";
import { cutFlash } from "../components/vert";
import { logoD } from "../components/brand";

/** Small official-logo watermark (top-left), off during the hook and the end card. */
export function watermark(ctx: any, t: number) {
  const a = ep(t, ws("right") - 0.3, 0.5) * (1 - ep(t, ws("beyond") - 0.2, 0.4));
  if (a > 0) logoD(ctx, 60 + 105, 150, 210, { alpha: a * 0.9 });
}

// ---------------------------------------------------------------- 1 HOOK: marketing noise
const NOISE = ["New post", "Boost post", "Promo", "Reel", "Story", "Email blast", "Flash sale", "Retarget", "Giveaway", "New ad", "Flyer", "Discount", "Carousel", "Influencer"];
function noiseChips(ctx: any, t: number, implode: number) {
  NOISE.forEach((s, i) => {
    const ang = hash(i * 3.7) * Math.PI * 2, sp = 60 + hash(i * 5.1) * 90;
    const life = t + 0.8 + hash(i) * 1.2;                     // already mid-flight on frame 1
    let x = W / 2 + Math.cos(ang) * (220 + life * sp) + noise(t * 0.7 + i) * 30;
    let y = 860 + Math.sin(ang) * (300 + life * sp * 1.2) + noise(t * 0.6 + i * 2) * 30;
    x = lerp(x, W / 2, inCubic(implode)); y = lerp(y, 880, inCubic(implode));
    const a = (0.55 + 0.45 * hash(i * 9.1)) * (1 - implode);
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a;
    ctx.translate(x, y); ctx.rotate((hash(i * 2.3) - 0.5) * 0.5 + t * (hash(i) - 0.5) * 0.4); ctx.scale(lerp(1, 0.3, implode), lerp(1, 0.3, implode));
    ctx.font = `800 30px Inter`; const tw = ctx.measureText(s).width + 70;
    rr(ctx, -tw / 2, -32, tw, 64, 32); ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.fill();
    ctx.beginPath(); ctx.arc(-tw / 2 + 30, 0, 9, 0, 7); ctx.fillStyle = i % 3 ? C.elec : C.red; ctx.fill();
    text(ctx, s, -tw / 2 + 50, 11, { size: 30, weight: 800, color: C.navy });
    ctx.restore();
  });
}
export function drawHook(ctx: any, t: number) {
  const tMore = ws("more"), tMk = ws("marketing");
  const [sx, sy] = shake(t, tMk + 0.35, 10);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.4, glowA: 1.3 });
  noiseChips(ctx, t, 0);
  // dark plate behind type for legibility
  const g = ctx.createRadialGradient(W / 2, 860, 50, W / 2, 860, 620); g.addColorStop(0, "rgba(3,8,20,0.85)"); g.addColorStop(1, "rgba(3,8,20,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 300, W, 1200);
  kline(ctx, t, { x: W / 2, y: 650, size: 92, align: "center", words: [{ s: "YOUR", t: 0.0, anim: "slam", dur: 0.25 }, { s: "BUSINESS", t: ws("business") - 0.05, anim: "slam", dur: 0.25 }] });
  kline(ctx, t, { x: W / 2, y: 760, size: 92, align: "center", words: [{ s: "DOESN'T", t: ws("doesn't") - 0.05, anim: "slam", dur: 0.25, color: C.cyan }, { s: "NEED", t: ws("need") - 0.05, anim: "slam", dur: 0.25 }] });
  kline(ctx, t, { x: W / 2, y: 950, size: 176, align: "center", words: [{ s: "MORE", t: tMore - 0.05, anim: "slam", dur: 0.25 }] });
  kline(ctx, t, { x: W / 2, y: 1110, size: 140, align: "center", words: [{ s: "MARKETING.", t: tMk - 0.05, anim: "slam", dur: 0.25 }] });
  // the red strike
  const st = ep(t, tMk + 0.35, 0.25, outExpo);
  if (st > 0) {
    ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 16; ctx.lineCap = "round"; ctx.shadowColor = C.red; ctx.shadowBlur = 20;
    ctx.beginPath(); ctx.moveTo(120, 1040); ctx.lineTo(120 + 840 * st, 1040 - 210 * st); ctx.stroke(); ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- 2 IT NEEDS A SYSTEM
export function drawSystem(ctx: any, t: number) {
  const t0 = cut("it needs"), tSys = ws("system");
  const [sx, sy] = shake(t, tSys, 12);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.6, glowA: 1.2 + ep(t, tSys, 0.4) });
  noiseChips(ctx, t, ep(t, t0, 0.45, inOutExpo));
  // the single glowing core (official app icon) appears where the noise collapses
  const ca = ep(t, t0 + 0.35, 0.4, outBack);
  if (ca > 0) {
    const r = 120 * ca;
    glow(ctx, W / 2, 880, 520, C.cyan, 0.35 * ca);
    for (let k = 0; k < 3; k++) {
      const p = ((t - t0) * 0.8 + k / 3) % 1;
      ctx.beginPath(); ctx.arc(W / 2, 880, r + p * 360, 0, 7); ctx.strokeStyle = rgba(C.cyan, 0.5 * (1 - p) * ca); ctx.lineWidth = 3; ctx.stroke();
    }
    const ic = img("icon");
    if (ic) { ctx.save(); ctx.beginPath(); ctx.roundRect(W / 2 - r, 880 - r, 2 * r, 2 * r, r * 0.45); ctx.clip(); ctx.drawImage(ic, W / 2 - r, 880 - r, 2 * r, 2 * r); ctx.restore(); }
  }
  kline(ctx, t, { x: W / 2, y: 560, size: 84, align: "center", weight: 700, words: [{ s: "IT", t: ws("it needs") - 0.05 }, { s: "NEEDS", t: ws("needs") - 0.05 }] });
  kline(ctx, t, { x: W / 2, y: 1290, size: 170, align: "center", ls: -4, words: [{ s: "A", t: ws("a system") - 0.05, anim: "slam" }, { s: "SYSTEM.", t: tSys - 0.05, anim: "slam", grad: true }] });
  ctx.restore();
}

// ---------------------------------------------------------------- 3–4 DISCONNECTED ISLANDS + LEAKS
type Isl = { x: number; y: number; w: number; h: number; rot: number };
const ISL: Isl[] = [
  { x: 70, y: 330, w: 440, h: 250, rot: -0.05 },   // ads
  { x: 560, y: 410, w: 440, h: 270, rot: 0.04 },   // website
  { x: 80, y: 760, w: 470, h: 280, rot: 0.03 },    // leads spreadsheet
  { x: 590, y: 860, w: 400, h: 300, rot: -0.06 },  // follow-up sticky
];
const centre = (i: number) => ({ x: ISL[i].x + ISL[i].w / 2, y: ISL[i].y + ISL[i].h / 2 });

function islandCard(ctx: any, i: number, t: number, a: number, grey: number) {
  const I = ISL[i];
  ctx.save(); ctx.globalAlpha *= a;
  ctx.translate(I.x + I.w / 2, I.y + I.h / 2 + Math.sin(t * 1.3 + i) * 6); ctx.rotate(I.rot); ctx.scale(lerp(0.8, 1, outBack(clamp(a))), lerp(0.8, 1, outBack(clamp(a)))); ctx.translate(-I.w / 2, -I.h / 2);
  ctx.shadowColor = "rgba(0,0,0,0.45)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14;
  rr(ctx, 0, 0, I.w, I.h, 26); ctx.fillStyle = i === 3 ? "#FFF6C9" : "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
  if (i === 0) {
    iconTile(ctx, "megaphone", 26, 26, 72, C.blue, 1);
    text(ctx, "ADS", 118, 72, { size: 40, weight: 800, family: F.head, color: C.navy });
    text(ctx, "Campaign running", 30, 150, { size: 26, weight: 600, color: C.sub }); toggle(ctx, I.w - 100, 126, 1, 1.3);
    rr(ctx, 30, 180, I.w - 60, 40, 12); ctx.fillStyle = "#EEF4FB"; ctx.fill();
    text(ctx, "Clicks · Reach · Likes", 50, 208, { size: 22, weight: 700, color: C.blue });
  } else if (i === 1) {
    ctx.fillStyle = "#F3F7FC"; ctx.beginPath(); ctx.roundRect(0, 0, I.w, 48, [26, 26, 0, 0]); ctx.fill();
    ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, k) => { ctx.beginPath(); ctx.arc(30 + k * 20, 24, 6, 0, 7); ctx.fillStyle = c; ctx.fill(); });
    text(ctx, "WEBSITE", 30, 104, { size: 40, weight: 800, family: F.head, color: C.navy });
    for (let k = 0; k < 3; k++) { rr(ctx, 30, 130 + k * 30, [330, 260, 300][k], 14, 7); ctx.fillStyle = "#E3EBF5"; ctx.fill(); }
    rr(ctx, 30, 220, 160, 34, 17); ctx.fillStyle = C.elec; ctx.fill(); text(ctx, "Contact us", 110, 243, { size: 18, weight: 700, color: "#fff", align: "center" });
  } else if (i === 2) {
    text(ctx, "LEADS.xlsx", 26, 54, { size: 32, weight: 800, family: F.mono, color: "#107C41" });
    const cols = [26, 170, 320], rows = ["Name", "John", "Sara", "Ali", "Mike"];
    rows.forEach((r, k) => {
      const y = 80 + k * 38;
      ctx.fillStyle = k === 0 ? "#E8F3EC" : k % 2 ? "#fff" : "#F7F9FB"; ctx.fillRect(20, y, I.w - 40, 38);
      text(ctx, r, cols[0] + 8, y + 26, { size: 20, weight: k ? 600 : 800, color: C.navy });
      text(ctx, k ? ["", "—", "??", "—", "—"][k] : "Phone", cols[1] + 8, y + 26, { size: 20, weight: k ? 600 : 800, color: k ? C.mute : C.navy });
      text(ctx, k ? ["", "no reply", "", "called?", ""][k] : "Status", cols[2] + 8, y + 26, { size: 20, weight: k ? 600 : 800, color: k ? C.red : C.navy });
    });
    ctx.strokeStyle = "#CFE3D6"; ctx.lineWidth = 1; for (const c of cols.slice(1)) { ctx.beginPath(); ctx.moveTo(c, 80); ctx.lineTo(c, 270); ctx.stroke(); }
  } else {
    text(ctx, "FOLLOW-UP", 30, 66, { size: 40, weight: 800, family: F.head, color: "#7A5B00" });
    text(ctx, "call them back…", 30, 124, { size: 30, weight: 700, family: F.mono, color: "#7A5B00" });
    text(ctx, "someday?", 30, 170, { size: 30, weight: 700, family: F.mono, color: "#7A5B00" });
    const od = ep(t, ws("remembers") - 0.3, 0.4, outBack);
    if (od > 0) { ctx.save(); ctx.globalAlpha *= clamp(od * 2); rr(ctx, 26, 210, 300, 56, 28); ctx.fillStyle = C.red; ctx.fill(); icon(ctx, "clock", 42, 222, 32, "#fff", 2.4); text(ctx, "3 days overdue", 86, 247, { size: 22, weight: 800, color: "#fff" }); ctx.restore(); }
  }
  if (grey > 0) { rr(ctx, 0, 0, I.w, I.h, 26); ctx.fillStyle = `rgba(10,20,40,${0.35 * grey})`; ctx.fill(); }
  ctx.restore();
}

/** Islands with broken, flickering links (gaps); exported so the reveal can start from them. */
export function islands(ctx: any, t: number, o: { alpha?: number; leak?: number } = {}) {
  const cues = [ws("ads"), ws("website"), ws("spreadsheet"), ws("followup")];
  const A = o.alpha ?? 1;
  // broken links between neighbours
  [[0, 1], [0, 2], [1, 3], [2, 3]].forEach(([a, b], k) => {
    const on = ep(t, cues[Math.max(a, b)] + 0.2, 0.4) * A;
    if (on <= 0) return;
    const p0 = centre(a), p1 = centre(b), flick = 0.6 + 0.4 * Math.abs(noise(t * 6 + k * 3));
    ribbon(ctx, [[p0.x, p0.y], [(p0.x + p1.x) / 2 + 30 * Math.sin(k), (p0.y + p1.y) / 2], [p1.x, p1.y]], { width: 4, alpha: on * flick * 0.8, grey: 0.85, gaps: [[0.36, 0.64]], speed: 0, strands: 1 });
  });
  ISL.forEach((_, i) => islandCard(ctx, i, t, ep(t, cues[i] - 0.15, 0.4, outQuart) * A, o.leak ?? 0));
  // leaking opportunities: dots fall through the gaps
  const L = o.leak ?? 0;
  if (L > 0) {
    for (let k = 0; k < 18; k++) {
      const per = 1.1, ph = ((t * 0.9 + k * 0.37) % per) / per;
      const gap = [[0, 1], [0, 2], [1, 3], [2, 3]][k % 4];
      const p0 = centre(gap[0]), p1 = centre(gap[1]);
      const gx = (p0.x + p1.x) / 2, gy = (p0.y + p1.y) / 2;
      const x = gx + (hash(k) - 0.5) * 60 + ph * (hash(k * 2) - 0.5) * 120, y = gy + ph * ph * 700;
      const a = L * (1 - ph);
      ctx.save(); ctx.globalAlpha *= a;
      glow(ctx, x, y, 34, C.red, 0.5);
      ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fillStyle = "#FF8FA3"; ctx.fill();
      ctx.restore();
    }
  }
}

export function drawIslands(ctx: any, t: number) {
  const tRem = ws("whenever"), tEv = ws("every"), tLeak = ws("leaks"), tOpp = ws("opportunities");
  const leakScene = t >= tEv - 0.12;
  const [sx, sy] = shake(t, tLeak, 7);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.4, glowA: leakScene ? 0.8 : 1.0 });
  // slow push-in through the beat
  const z = 1 + 0.04 * prog(t, cut("right"), tOpp + 1);
  ctx.save(); ctx.translate(W / 2, 760); ctx.scale(z, z); ctx.translate(-W / 2, -760);
  islands(ctx, t, { leak: ep(t, tEv - 0.1, 0.5) });
  ctx.restore();
  // type
  const ty = 1330;
  kline(ctx, t, { x: W / 2, y: ty, size: 60, align: "center", weight: 700, color: "#CFE9FF", out: tEv - 0.15, outAnim: "up", outDur: 0.2,
    words: [{ s: "WHENEVER", t: tRem }, { s: "SOMEONE", t: ws("someone") }, { s: "REMEMBERS.", t: ws("remembers"), color: C.red }] });
  kline(ctx, t, { x: W / 2, y: ty - 10, size: 80, align: "center", words: [{ s: "EVERY", t: tEv - 0.05, anim: "slam" }, { s: "GAP", t: ws("gap") - 0.05, anim: "slam", color: C.red }, { s: "LEAKS", t: tLeak - 0.05, anim: "slam" }] });
  kline(ctx, t, { x: W / 2, y: ty + 90, size: 80, align: "center", words: [{ s: "OPPORTUNITIES.", t: tOpp - 0.05, anim: "slam", color: C.red }] });
  ctx.restore();
}

// ---------------------------------------------------------------- 5 THE CONNECTED GROWTH SYSTEM (payoff)
const NODES: [string, string, string, number][] = [["ADS", "megaphone", "ads", 1], ["LANDING PAGES", "globe", "landing", 0], ["CRM", "db", "crm", 0], ["AUTOMATION", "bolt", "automation", 0], ["FOLLOW-UP", "chat", "followup", 1]];
const NX = 200, NW = 680, NH = 112, NY = (i: number) => 470 + i * 150;
function nodeCard(ctx: any, i: number, x: number, y: number, a: number, act: number, all: number) {
  const [lab, ic] = NODES[i];
  ctx.save(); ctx.globalAlpha *= a;
  if (act > 0) glow(ctx, x + NW / 2, y + NH / 2, 420, C.cyan, (0.12 + 0.12 * all) * act);
  ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
  rr(ctx, x, y, NW, NH, 28); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.lineWidth = 3; ctx.strokeStyle = rgba(C.elec, 0.2 + 0.8 * act); ctx.stroke();
  iconTile(ctx, ic, x + 22, y + 18, 76, C.blue, act);
  text(ctx, lab, x + 122, y + 70, { size: 38, weight: 800, family: F.head, color: C.navy });
  if (act > 0.5) checkBadge(ctx, x + NW - 50, y + NH / 2, 20, (act - 0.5) * 2);
  ctx.restore();
}
export function drawReveal(ctx: any, t: number) {
  const t0 = cut("at madvert"), tCon = ws("connect"), tInto = ws("into"), tGS = ws("growth"), tSys = ws("system", 1), tAtt = ws("attention"), tRev = ws("revenue");
  const cues = NODES.map(([, , w, n]) => ws(w, n));
  const [sx, sy] = shake(t, tSys, 9);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.55, glowA: 1.1 + 0.6 * ep(t, tSys, 0.5) });
  // islands fly into the chain
  const fly = ep(t, ws("madvert") - 0.3, 0.4, inOutCubic);
  if (fly < 1) { ctx.save(); ctx.globalAlpha = 1 - fly; ctx.translate(W / 2, 760); ctx.scale(1 - 0.15 * fly, 1 - 0.15 * fly); ctx.translate(-W / 2, -760); islands(ctx, t, { alpha: 1, leak: 0.6 * (1 - ep(t, t0, 0.5)) }); ctx.restore(); }
  // logo + "AT MADVERT LABS"
  const la = ep(t, ws("madvert") - 0.1, 0.5, inOutExpo) * (1 - ep(t, tInto - 0.3, 0.4));
  if (la > 0) logoD(ctx, W / 2, 300, 420, { reveal: la, pulse: prog(t, ws("labs"), ws("labs") + 1) });
  // the spine (growth ribbon) and nodes
  const spine: [number, number][] = [[NX - 60, NY(0) - 90], [NX - 60, NY(4) + NH / 2 + 110]];
  const sp = sample(spine, 120);
  const all = ep(t, tInto, 0.5);
  const draw = Math.max(ep(t, cues[0] - 0.1, cues[4] - cues[0] + 0.4, inOutCubic), all);
  if (draw > 0.01) ribbon(ctx, sp, { to: draw, width: 6, flow: t, speed: t > tInto ? 1.4 : 0.5, pulses: 3, glow: 1 + all });
  NODES.forEach((_, i) => {
    const a = ep(t, Math.min(cues[i] - 0.25, tCon + 0.2 + i * 0.12), 0.45, outQuart);
    if (a <= 0) return;
    const act = Math.max(ep(t, cues[i], 0.25), all);
    const y = NY(i) + (1 - a) * 40;
    nodeCard(ctx, i, NX, y, a, act, all);
    if (act > 0) { ctx.beginPath(); ctx.arc(NX - 60, y + NH / 2, 13, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.cyan; ctx.stroke(); }
  });
  // one growth system: bracket frame
  if (all > 0) {
    ctx.save(); ctx.globalAlpha *= all;
    rr(ctx, NX - 110, NY(0) - 40, NW + 150, NY(4) + NH + 40 - (NY(0) - 40), 40);
    ctx.strokeStyle = rgba(C.cyan, 0.55); ctx.lineWidth = 3; ctx.setLineDash([2, 10]); ctx.lineCap = "round"; ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
  }
  // attention in → revenue out
  const ia = ep(t, tAtt - 0.15, 0.4, outBack), oa = ep(t, tRev - 0.15, 0.4, outBack);
  const io = (y: number, lab: string, ic: string, a: number, col: string) => {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= clamp(a * 2);
    rr(ctx, NX - 130, y, 290, 72, 36); ctx.fillStyle = col; ctx.fill();
    icon(ctx, ic, NX - 108, y + 18, 36, "#fff", 2.6);
    text(ctx, lab, NX - 60, y + 49, { size: 30, weight: 800, family: F.head, color: "#fff" });
    ctx.restore();
  };
  io(NY(0) - 140, "ATTENTION", "eye", ia, "#2D7BFF");
  io(NY(4) + NH + 70, "REVENUE", "chart", oa, "#00A868");
  if (oa > 0) {
    ctx.save(); ctx.globalAlpha *= oa;
    lineChart(ctx, NX + 210, NY(4) + NH + 60, 420, 90, [0.1, 0.18, 0.15, 0.3, 0.38, 0.5, 0.62, 0.8, 0.95], ep(t, tRev, 0.8), { color: C.green, fill: true, lw: 5, dot: true });
    ctx.restore();
  }
  const pp = prog(t, tAtt, tRev + 0.4);
  if (pp > 0 && pp < 1) {
    const y = lerp(NY(0) - 100, NY(4) + NH + 100, inOutCubic(pp));
    glow(ctx, NX - 60, y, 70, C.cyan, 0.7); ctx.beginPath(); ctx.arc(NX - 60, y, 12, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
  }
  // type (only beside the reveal, never over it)
  kline(ctx, t, { x: W / 2, y: 1370, size: 58, align: "center", words: [{ s: "ATTENTION", t: tAtt - 0.05, anim: "rise", color: "#9CC8FF" }, { s: "INTO", t: ws("into", 1) - 0.05, color: C.cyan }, { s: "REVENUE.", t: tRev - 0.05, anim: "slam", color: "#2EE6A0" }] });
  kline(ctx, t, { x: W / 2, y: 1360, size: 66, align: "center", out: tInto - 0.1, outAnim: "up", outDur: 0.2, words: [{ s: "WE", t: ws("we") }, { s: "CONNECT", t: tCon, color: C.cyan }, { s: "IT", t: ws("it all") }, { s: "ALL.", t: ws("all") }] });
  if (t >= tInto - 0.1 && t < tAtt - 0.2) {
    kline(ctx, t, { x: W / 2, y: 1370, size: 74, align: "center", out: tAtt - 0.25, outAnim: "up", outDur: 0.2, words: [{ s: "ONE", t: ws("one", 1) }, { s: "GROWTH", t: tGS, grad: true }, { s: "SYSTEM.", t: tSys, anim: "slam", grad: true }] });
  }
  ctx.restore();
}

// ---------------------------------------------------------------- 6 TAGLINE
export function drawTagline(ctx: any, t: number) {
  const tB = ws("beyond"), tA = ws("advertising"), tWe = ws("we build"), tBu = ws("build"), tG = ws("growth", 1), tS = ws("systems");
  background(ctx, t, { grid: 0.5, glowA: 1.3 });
  // the system recedes behind the line
  ctx.save(); ctx.globalAlpha = 0.07; ctx.translate(W / 2, 800); ctx.scale(0.8 - (t - tB) * 0.01, 0.8 - (t - tB) * 0.01); ctx.translate(-W / 2, -800);
  NODES.forEach((_, i) => nodeCard(ctx, i, NX, NY(i), 1, 1, 1));
  ctx.restore();
  kline(ctx, t, { x: W / 2, y: 680, size: 96, align: "center", words: [{ s: "BEYOND", t: tB - 0.05, anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 790, size: 96, align: "center", words: [{ s: "ADVERTISING.", t: tA - 0.05, anim: "rise", color: "#CFE9FF" }] });
  kline(ctx, t, { x: W / 2, y: 960, size: 80, align: "center", weight: 700, words: [{ s: "WE", t: tWe - 0.05 }, { s: "BUILD", t: tBu - 0.05 }] });
  kline(ctx, t, { x: W / 2, y: 1110, size: 124, align: "center", ls: -3, words: [{ s: "GROWTH", t: tG - 0.05, anim: "slam", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1240, size: 124, align: "center", ls: -3, words: [{ s: "SYSTEMS.", t: tS - 0.05, anim: "slam", grad: true }] });
  ribbon(ctx, [[160, 1300], [W / 2, 1280], [W - 160, 1300]], { to: ep(t, tS, 0.6, inOutCubic), width: 5, flow: t, speed: 0.6, pulses: 2 });
}

// ---------------------------------------------------------------- 7 END CARD
export function drawEnd(ctx: any, t: number) {
  const tF = ws("follow"), tSm = ws("smarter"), tEnd = we("growth", 2);
  background(ctx, t, { grid: 0.4, glowA: 1.3 });
  logoD(ctx, W / 2, 470, 700, { reveal: ep(t, tF - 0.2, 0.6, inOutExpo), pulse: prog(t, tEnd + 0.2, tEnd + 1.2) });
  kline(ctx, t, { x: W / 2, y: 820, size: 64, align: "center", words: [{ s: "FOLLOW", t: tF - 0.05, anim: "rise" }, { s: "FOR", t: ws("for") }] });
  kline(ctx, t, { x: W / 2, y: 920, size: 76, align: "center", words: [{ s: "SMARTER", t: tSm - 0.05, anim: "rise", color: C.cyan }, { s: "GROWTH.", t: tEnd - 0.3, anim: "rise" }] });
  // follow button → following
  const ba = ep(t, tF + 0.2, 0.4, outBack), on = ep(t, tEnd + 0.15, 0.25);
  if (ba > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(ba * 2);
    const w = lerp(360, 400, on), x = W / 2 - w / 2, y = 1000;
    ctx.translate(W / 2, y + 45); ctx.scale(lerp(0.85, 1, ba) * (1 - 0.06 * Math.sin(on * Math.PI)), lerp(0.85, 1, ba) * (1 - 0.06 * Math.sin(on * Math.PI))); ctx.translate(-W / 2, -(y + 45));
    rr(ctx, x, y, w, 90, 45);
    if (on < 0.5) { const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, C.blue); g.addColorStop(1, C.cyan); ctx.fillStyle = g; ctx.fill(); }
    else { ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fill(); ctx.strokeStyle = rgba(C.cyan, 0.7); ctx.lineWidth = 2; ctx.stroke(); }
    text(ctx, on < 0.5 ? "+  Follow" : "Following", W / 2 - (on < 0.5 ? 0 : 20), y + 58, { size: 36, weight: 800, family: F.head, color: "#fff", align: "center" });
    if (on >= 0.5) checkBadge(ctx, W / 2 + 120, y + 45, 18, (on - 0.5) * 2);
    ctx.restore();
  }
  const wa = ep(t, tEnd, 0.5);
  text(ctx, "madvertlabs.com", W / 2, 1180, { size: 40, weight: 800, family: F.head, color: "#fff", align: "center", alpha: wa });
  text(ctx, "Beyond Advertising. We Build Growth Systems.", W / 2, 1236, { size: 28, weight: 600, color: "#CFE9FF", align: "center", alpha: wa });
  ribbon(ctx, [[180, 1290], [W / 2, 1272], [W - 180, 1290]], { to: ep(t, tEnd + 0.1, 0.7, inOutCubic), width: 4, flow: t, speed: 0.4 });
}
