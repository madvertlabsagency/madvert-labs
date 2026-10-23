// Middle act: end-to-end capabilities → lead-generation system → proof (screen share +
// real dashboards) → private work → teaching.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, streak } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { img } from "../core/assets";
import { kline, shake } from "../components/kinetic";
import { ribbon, sample, pointAt } from "../components/ribbon";
import { checkBadge, iconTile, pill, avatar } from "../components/ui";
import { pulseDot } from "../components/rfq";
import { cutFlash } from "../components/vert";
import { PROOFS, proofShot, proofLabel, founder, node } from "../components/vsl";

// ---------------------------------------------------------------- 06 CAPABILITIES (one operating system)
const CAPS: [string, string, string, number][] = [
  ["ADS", "megaphone", "ads", 0], ["FUNNELS", "funnel", "funnels", 0], ["LANDING PAGES", "globe", "landing pages", 0],
  ["ANALYTICS", "chart", "analytics", 0], ["TRACKING", "eye", "tracking", 0], ["CRM", "db", "crm", 0],
  ["AUTOMATIONS", "bolt", "automations", 0], ["CREATIVES", "image", "creatives", 0], ["FOLLOW-UP", "chat", "followup", 0],
];
const cell = (i: number) => {
  const row = Math.floor(i / 3), col = row % 2 ? 2 - (i % 3) : i % 3; // snake order
  return { x: 70 + col * 320, y: 560 + row * 230, w: 300, h: 190 };
};
export function drawCaps(ctx: any, t: number) {
  const tAll = ws("all of it");
  const [sx, sy] = shake(t, tAll, 7);
  ctx.save(); ctx.translate(sx, sy);
  background(ctx, t, { grid: 0.5, glowA: 1.1 + 0.4 * ep(t, tAll, 0.4) });
  const cues = CAPS.map(([, , w, n]) => ws(w, n));
  // snake connectors
  for (let i = 0; i < 8; i++) {
    const a = cell(i), b = cell(i + 1);
    ribbon(ctx, [[a.x + a.w / 2, a.y + a.h / 2], [b.x + b.w / 2, b.y + b.h / 2]], { to: ep(t, cues[i + 1] - 0.15, 0.3, inOutCubic), width: 4, flow: t, speed: t > tAll ? 1.4 : 0.4, alpha: 0.9 });
  }
  CAPS.forEach(([lab, ic], i) => {
    const c = cell(i), a = ep(t, cues[i] - 0.12, 0.35, outBack), act = ep(t, cues[i], 0.25);
    if (a <= 0) return;
    const all = ep(t, tAll, 0.4);
    ctx.save(); ctx.globalAlpha *= clamp(a * 2);
    const sc = lerp(0.85, 1, a);
    ctx.translate(c.x + c.w / 2, c.y + c.h / 2); ctx.scale(sc, sc); ctx.translate(-(c.x + c.w / 2), -(c.y + c.h / 2));
    if (all > 0) glow(ctx, c.x + c.w / 2, c.y + c.h / 2, 260, C.cyan, 0.14 * all);
    ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
    rr(ctx, c.x, c.y, c.w, c.h, 26); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.lineWidth = 3; ctx.strokeStyle = rgba(C.elec, 0.25 + 0.75 * Math.max(all, i === CAPS.findIndex((_, k) => t < (cues[k + 1] ?? 1e9)) ? act : 0)); ctx.stroke();
    iconTile(ctx, ic, c.x + c.w / 2 - 40, c.y + 30, 80, C.blue, act);
    text(ctx, lab, c.x + c.w / 2, c.y + 160, { size: lab.length > 11 ? 26 : 30, weight: 800, family: F.head, color: C.navy, align: "center" });
    ctx.restore();
  });
  // current term under the grid, then ALL OF IT. → ONE OPERATING SYSTEM
  CAPS.forEach(([lab], i) => {
    const b = i < CAPS.length - 1 ? cues[i + 1] : tAll;
    kline(ctx, t, { x: W / 2, y: 1420, size: 88, align: "center", out: b - 0.1, outAnim: "up", outDur: 0.15, words: [{ s: lab, t: cues[i] - 0.05, anim: "rise", grad: i % 2 === 1 }] });
  });
  kline(ctx, t, { x: W / 2, y: 1360, size: 104, align: "center", words: [{ s: "ALL", t: tAll, anim: "slam" }, { s: "OF", t: tAll + 0.12, anim: "slam" }, { s: "IT.", t: tAll + 0.24, anim: "slam", color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: 1450, size: 44, align: "center", weight: 700, ls: 4, color: "#CFE9FF", words: [{ s: "ONE", t: tAll + 0.5 }, { s: "OPERATING", t: tAll + 0.6 }, { s: "SYSTEM.", t: tAll + 0.7, color: C.cyan }] });
  kline(ctx, t, { x: W / 2, y: 470, size: 40, align: "center", weight: 700, ls: 8, color: "#CFE9FF", words: [{ s: "END-TO-END", t: ws("ads") - 0.2 }, { s: "DELIVERY", t: ws("ads") - 0.1 }] });
  ctx.restore();
}

// ---------------------------------------------------------------- 07 LEAD GENERATION
const FLOW: [string, string][] = [["AD", "megaphone"], ["LANDING PAGE", "globe"], ["FORM", "doc"], ["QUALIFICATION", "funnel"], ["CRM", "db"], ["SALES", "users"]];
export function drawLeadGen(ctx: any, t: number) {
  const tLG = ws("lead generation", 1), tStr = ws("strongest"), tDont = ws("don't"), tHope = ws("hope"), tBuild = ws("build"), tWhole = ws("whole"), tCl = ws("client"), tRand = ws("random"), tCamp = ws("campaigns"), tFix = ws("fix"), tFound = ws("foundations");
  background(ctx, t, { grid: 0.5, glowA: 1.1 });
  // A: LEAD GENERATION / OUR STRONGEST AREA
  const outA = tDont - 0.15;
  kline(ctx, t, { x: W / 2, y: 820, size: 116, align: "center", out: outA, outAnim: "up", outDur: 0.22, words: [{ s: "LEAD", t: tLG - 0.05, anim: "rise" }] });
  kline(ctx, t, { x: W / 2, y: 950, size: 116, align: "center", out: outA, outAnim: "up", outDur: 0.22, words: [{ s: "GENERATION", t: tLG + 0.15, anim: "rise", grad: true }] });
  kline(ctx, t, { x: W / 2, y: 1060, size: 54, align: "center", weight: 700, out: outA, outAnim: "up", outDur: 0.22, color: "#CFE9FF", words: [{ s: "OUR", t: tStr - 0.2 }, { s: "STRONGEST", t: tStr, color: C.cyan }, { s: "AREA.", t: tStr + 0.25 }] });
  // B: run a campaign and hope → struck
  const ba = ep(t, tDont, 0.4, outBack) * (1 - ep(t, tBuild - 0.15, 0.3));
  if (ba > 0) {
    ctx.save(); ctx.globalAlpha *= clamp(ba * 2);
    rr(ctx, 190, 700, 700, 220, 30); ctx.fillStyle = "#fff"; ctx.fill();
    iconTile(ctx, "megaphone", 230, 760, 96, C.mute, 0.3);
    text(ctx, "Campaign #1", 360, 800, { size: 36, weight: 800, family: F.head, color: C.navy });
    text(ctx, "Launched… fingers crossed", 360, 848, { size: 26, weight: 600, color: C.sub });
    const st = ep(t, tHope + 0.15, 0.35, outExpo);
    if (st > 0) { ctx.strokeStyle = C.red; ctx.lineWidth = 9; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(170, 930); ctx.lineTo(170 + 740 * st, 690); ctx.stroke(); }
    ctx.restore();
    kline(ctx, t, { x: W / 2, y: 1130, size: 76, align: "center", words: [{ s: "NOT", t: tDont, anim: "slam", color: C.red }, { s: "“RUN", t: ws("run", 1) }, { s: "&", t: ws("and hope") }, { s: "HOPE.”", t: tHope }] });
  }
  // C: the whole system built around the client
  if (t >= tBuild - 0.15) {
    const x = 110, w = 520;
    const path: [number, number][] = [[x + 40, 520], [x + 40, 520 + 5 * 150]];
    ribbon(ctx, sample(path, 100), { to: ep(t, tBuild, 1.6, inOutCubic), width: 5, flow: t, speed: t > tCl ? 1.2 : 0.3, pulses: 2 });
    FLOW.forEach(([lab, ic], i) => {
      const at = tBuild - 0.05 + i * 0.28;
      node(ctx, x + 70, 470 + i * 150, w, 104, lab, ic, ep(t, at, 0.35, outQuart), ep(t, at + 0.15, 0.3));
      const d = ep(t, at, 0.3);
      if (d > 0) { ctx.beginPath(); ctx.arc(x + 40, 520 + i * 150, 12, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.cyan; ctx.stroke(); }
    });
    // client at the centre of it
    const ca = ep(t, tCl - 0.1, 0.4, outBack);
    if (ca > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(ca * 2);
      const cx = 850, cy = 860;
      glow(ctx, cx, cy, 260, C.cyan, 0.25);
      ctx.beginPath(); ctx.arc(cx, cy, 110 * lerp(0.7, 1, ca), 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.cyan; ctx.stroke();
      icon(ctx, "building", cx - 34, cy - 50, 68, C.blue, 2.6);
      text(ctx, "CLIENT", cx, cy + 58, { size: 26, weight: 800, family: F.mono, ls: 3, color: C.navy, align: "center" });
      ctx.restore();
    }
    // random campaigns try to patch a bad foundation: they pile up and fall away
    if (t > tRand - 0.3) {
      for (let k = 0; k < 4; k++) {
        const at = tRand - 0.2 + k * 0.3, p = prog(t, at, at + 1.4);
        if (p <= 0 || p >= 1) continue;
        const a = Math.min(clamp(p * 6), 1 - clamp((p - 0.6) / 0.4));
        ctx.save(); ctx.globalAlpha *= a * 0.9; ctx.translate(720 + k * 22, 1100 + k * 40 + p * 120); ctx.rotate(0.05 * k - 0.08 + p * 0.2);
        rr(ctx, 0, 0, 280, 84, 18); ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fill();
        text(ctx, "New campaign?", 22, 52, { size: 24, weight: 800, color: C.sub });
        ctx.restore();
      }
    }
    kline(ctx, t, { x: W / 2, y: 1480, size: 70, align: "center", out: tRand - 0.25, outAnim: "up", outDur: 0.2, words: [{ s: "THE", t: tWhole - 0.1 }, { s: "WHOLE", t: tWhole }, { s: "SYSTEM.", t: ws("system"), color: C.cyan }] });
    kline(ctx, t, { x: W / 2, y: 1430, size: 52, align: "center", weight: 700, color: "#CFE9FF", words: [{ s: "NO", t: tRand - 0.1, color: C.red }, { s: "RANDOM", t: tRand }, { s: "CAMPAIGNS", t: tCamp }] });
    kline(ctx, t, { x: W / 2, y: 1530, size: 64, align: "center", words: [{ s: "STRONG", t: tFound - 0.25, anim: "slam", grad: true }, { s: "FOUNDATIONS.", t: tFound, anim: "slam" }] });
  }
}

// ---------------------------------------------------------------- 08 PROOF: screen share → real dashboards
function laptop(ctx: any, x: number, y: number, w: number, a: number) {
  const h = w * 0.62;
  ctx.save(); ctx.globalAlpha *= a;
  rr(ctx, x - 16, y - 16, w + 32, h + 32, 26); ctx.fillStyle = "#1A2233"; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 70, y + h + 16); ctx.lineTo(x + w + 70, y + h + 16); ctx.lineTo(x + w + 30, y + h + 56); ctx.lineTo(x - 30, y + h + 56); ctx.closePath();
  const g = ctx.createLinearGradient(0, y + h + 16, 0, y + h + 56); g.addColorStop(0, "#3A465C"); g.addColorStop(1, "#1A2233"); ctx.fillStyle = g; ctx.fill();
  ctx.restore();
  return { x, y, w, h };
}
const PROOF_ORDER = [0, 1, 2, 3, 4];
export function drawProof(ctx: any, t: number) {
  const tPr = ws("proof"), tJump = ws("jump"), tShare = ws("share"), tOpen = ws("open"), tDash = ws("dashboards"), tWalk = ws("walk"), tCase = ws("case studies"), tProj = ws("projects"), tEnd = cut2();
  background(ctx, t, { grid: 0.45, glowA: 1.1 });
  const mont = tOpen - 0.1; // proof montage starts as the dashboards open
  const durs = PROOF_ORDER.map(() => (tEnd - mont) / PROOF_ORDER.length);
  if (t < mont + 0.35) {
    const a = ep(t, ws("and if you want") - 0.1, 0.5, outQuart) * (1 - ep(t, mont, 0.35));
    const S = laptop(ctx, 150, 640, 780, a);
    ctx.save(); ctx.globalAlpha *= a; rr(ctx, S.x, S.y, S.w, S.h, 10); ctx.clip();
    ctx.fillStyle = "#0E1626"; ctx.fillRect(S.x, S.y, S.w, S.h);
    const call = ep(t, tJump, 0.4), share = ep(t, tShare, 0.4);
    // call tiles
    if (share < 1) {
      ctx.save(); ctx.globalAlpha *= call * (1 - share);
      [["U", "Usama", C.blue], ["YOU", "You", "#2D7BFF"]].forEach(([i0, n, col], k) => {
        const tx = S.x + 30 + k * 370, ty = S.y + 60;
        rr(ctx, tx, ty, 350, 300, 18); ctx.fillStyle = "#1B2740"; ctx.fill();
        avatar(ctx, tx + 175, ty + 130, 60, i0 as string, col as string);
        text(ctx, n as string, tx + 20, ty + 280, { size: 20, weight: 700, color: "#fff" });
      });
      ctx.restore();
    }
    // shared screen: the real dashboard, small
    if (share > 0) {
      ctx.save(); ctx.globalAlpha *= share;
      const P = PROOFS[0], im = img(P.key);
      if (im) { const ih = S.w * P.crop[3] / P.crop[2]; ctx.drawImage(im, P.crop[0], P.crop[1], P.crop[2], P.crop[3], S.x, S.y + 40 + (S.h - 40 - ih) / 2, S.w, ih); }
      ctx.fillStyle = "rgba(14,22,38,0.95)"; ctx.fillRect(S.x, S.y, S.w, 40);
      ctx.beginPath(); ctx.arc(S.x + 24, S.y + 20, 7, 0, 7); ctx.fillStyle = C.red; ctx.fill();
      text(ctx, "Usama is presenting", S.x + 42, S.y + 27, { size: 18, weight: 700, color: "#fff" });
      ctx.restore();
    }
    ctx.restore();
    kline(ctx, t, { x: W / 2, y: 520, size: 104, align: "center", words: [{ s: "PROOF?", t: tPr - 0.05, anim: "slam", grad: true }] });
    const la = ep(t, tShare, 0.4);
    if (la > 0) {
      text(ctx, "I'LL OPEN THE WORK.", W / 2, 1270, { size: 44, weight: 800, family: F.head, color: "#fff", align: "center", alpha: la * a });
      text(ctx, "LIVE · ON A CALL · SCREEN SHARE", W / 2, 1325, { size: 22, weight: 700, family: F.mono, ls: 4, color: C.cyan, align: "center", alpha: la * a });
    }
  }
  if (t >= mont) {
    let acc = mont;
    PROOF_ORDER.forEach((pi, k) => {
      const a0 = acc, a1 = acc + durs[k]; acc = a1;
      if (t < a0 - 0.3 || t > a1 + 0.3) return;
      const inA = ep(t, a0 - 0.15, 0.35, outExpo), outA = 1 - ep(t, a1 - 0.15, 0.3, inOutCubic);
      const a = Math.min(inA, outA);
      if (a <= 0) return;
      const P = PROOFS[pi];
      ctx.save(); ctx.translate((1 - inA) * 140 - (1 - outA) * 140, 0);
      proofLabel(ctx, P, 60, 600, t - a0, a);
      proofShot(ctx, P, 40, 720, 1000, t - a0, durs[k], a);
      ctx.restore();
    });
    // case studies pill, then REAL WORK. REAL SYSTEMS.
    const ca = ep(t, tCase - 0.1, 0.4, outBack);
    if (ca > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(ca * 2);
      rr(ctx, 200, 1290, 680, 74, 37); ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fill(); ctx.strokeStyle = rgba(C.cyan, 0.5); ctx.lineWidth = 1.5; ctx.stroke();
      icon(ctx, "globe", 232, 1309, 34, C.cyan, 2.4);
      text(ctx, "madvertlabs.com · case studies", 282, 1338, { size: 27, weight: 700, color: "#fff" });
      ctx.restore();
    }
    kline(ctx, t, { x: W / 2, y: 1480, size: 70, align: "center", words: [{ s: "REAL", t: tProj - 0.1, anim: "rise" }, { s: "WORK.", t: tProj, anim: "rise", color: C.cyan }, { s: "REAL", t: tProj + 0.5, anim: "rise" }, { s: "SYSTEMS.", t: tProj + 0.6, anim: "rise", color: C.cyan }] });
    for (let k = 1; k < PROOF_ORDER.length; k++) cutFlash(ctx, t, mont + k * durs[0] - 0.05, 0.05);
  }
}
const cut2 = () => ws("and honestly") - 0.12;

// ---------------------------------------------------------------- 09 PRIVATE WORK + TEACHING
export function drawPrivate(ctx: any, t: number) {
  const t0 = ws("and honestly") - 0.12, tLot = ws("lot"), tPub = ws("public"), tTeach = ws("teach"), tFig = ws("figuring"), tGo = ws("go", 1);
  background(ctx, t, { grid: 0.45, glowA: 1.0 });
  const tT = ws("i also") - 0.1;
  if (t < tT + 0.3) {
    const a = 1 - ep(t, tT - 0.1, 0.4, inOutCubic);
    // the public case studies as a receding 3D-ish stack
    PROOFS.forEach((P, k) => {
      const im = img(P.key);
      if (!im) return;
      const d = k - 2, p = ep(t, t0 + 0.05 * k, 0.6, outQuart);
      const w = 640, h = w * P.crop[3] / P.crop[2];
      const x = W / 2 + d * 120 + Math.sin(t * 0.5 + k) * 6, y = 860 + Math.abs(d) * 30 - (1 - p) * 60;
      const sc = 1 - Math.abs(d) * 0.1 - (t - t0) * 0.01;
      ctx.save(); ctx.globalAlpha *= a * p * (1 - Math.abs(d) * 0.18);
      ctx.translate(x, y); ctx.rotate(d * 0.05); ctx.scale(sc, sc);
      ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 40;
      rr(ctx, -w / 2, -h / 2, w, h, 18); ctx.fillStyle = "#000"; ctx.fill(); ctx.shadowColor = "transparent"; ctx.clip();
      ctx.drawImage(im, P.crop[0], P.crop[1], P.crop[2], P.crop[3], -w / 2, -h / 2, w, h);
      ctx.fillStyle = `rgba(3,8,20,${0.25 + 0.4 * ep(t, tPub, 0.6)})`; ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    });
    ctx.save(); ctx.globalAlpha *= a;
    kline(ctx, t, { x: W / 2, y: 1300, size: 64, align: "center", words: [{ s: "SOME", t: tLot - 0.1 }, { s: "CLIENT", t: tLot + 0.05 }, { s: "WORK", t: ws("our work") }] });
    kline(ctx, t, { x: W / 2, y: 1410, size: 80, align: "center", words: [{ s: "REMAINS", t: tPub - 0.15, anim: "rise" }, { s: "PRIVATE.", t: tPub, anim: "rise", color: C.cyan }] });
    text(ctx, "Shared only where clients allowed it", W / 2, 1480, { size: 26, weight: 600, color: "#CFE9FF", align: "center", alpha: ep(t, ws("allow"), 0.5) });
    ctx.restore();
  } else {
    const a = ep(t, tT, 0.5, outQuart);
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 40);
    founder(ctx, 140, 430, 800, 860, t - tT, { fy: 0.3, zoom: 1.05 });
    ctx.restore();
    kline(ctx, t, { x: W / 2, y: 1410, size: 92, align: "center", words: [{ s: "I", t: tT + 0.1 }, { s: "ALSO", t: tT + 0.25 }, { s: "TEACH", t: tTeach, anim: "slam", color: C.cyan }, { s: "THIS.", t: tTeach + 0.3 }] });
    kline(ctx, t, { x: W / 2, y: 1500, size: 42, align: "center", weight: 700, color: "#CFE9FF", words: [{ s: "NOT", t: ws("not something") }, { s: "FIGURING", t: tFig }, { s: "IT", t: tFig + 0.2 }, { s: "OUT", t: tFig + 0.3 }, { s: "AS", t: tGo - 0.3 }, { s: "WE", t: tGo - 0.15 }, { s: "GO.", t: tGo }] });
  }
}
