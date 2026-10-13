// 07 FORM FILL — the main product demo. Every field fills on its spoken word; each value
// flies into the live quotation summary; the artwork uploads and docks into it.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, chip, cursor, glow } from "../core/draw";
import { clamp, ep, outExpo, outQuart, inOutExpo, inOutCubic, lerp, prog, rgba, outBack, inCubic } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { appWindow, button, field, checkBadge, iconTile, pill, mixHex } from "../components/ui";
import { patch } from "../components/patches";
import { sectionTag, pulseDot } from "../components/rfq";
import { WIN, STEPS, brandMark } from "./06-funnel";

export const VALUES = ["Embroidered", "500 pcs", "3.5 in", "Iron-On", "Nov 15", "Daniel Reed"];
const R = { x: WIN.x, y: WIN.y + 44, w: WIN.w, h: WIN.h - 44 };
const FX = R.x + 60, FY = R.y + 130, FW = 1000;
export const SUM = { x: R.x + 1120, y: R.y + 26, w: 520, h: 640 };
export const sumRowY = (i: number) => SUM.y + 108 + i * 66;
export const ART_SLOT = { x: SUM.x + 24, y: SUM.y + 108 + 6 * 66, w: SUM.w - 48, h: 92 };

export function cues() {
  return [ws("patch type"), ws("quantity"), ws("size"), ws("backing"), ws("deadline", 0), ws("contact details", 0), ws("upload")];
}

export function drawForm(ctx: any, t: number, o: { noType?: boolean } = {}) {
  const K = cues();
  const tArt = ws("artwork", 0);
  background(ctx, t, { grid: 0.3 });
  sectionTag(ctx, "06", "Quote funnel · what you need", 1);
  const r = appWindow(ctx, WIN.x, WIN.y, WIN.w, WIN.h, "", { url: "quote.yourbrand.com" });
  brandMark(ctx, R.x + 56, R.y + 44, 0.85);

  // stepper
  const filled = (i: number) => ep(t, K[i] + 0.55, 0.25);
  const sx0 = R.x + 360, sdx = 135, sy = R.y + 44;
  const done = K.slice(0, 6).reduce((a, c, i) => a + filled(i), 0);
  ctx.strokeStyle = "#DCE6F2"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx0, sy); ctx.lineTo(sx0 + 5 * sdx, sy); ctx.stroke();
  const prg = Math.min(5, done);
  ctx.strokeStyle = C.elec; ctx.beginPath(); ctx.moveTo(sx0, sy); ctx.lineTo(sx0 + prg * sdx, sy); ctx.stroke();
  STEPS.forEach(([lab], i) => {
    const x = sx0 + i * sdx, f = filled(i), act = t >= K[i] - 0.3 && f < 1;
    ctx.beginPath(); ctx.arc(x, sy, 14, 0, 7);
    ctx.fillStyle = f > 0.5 ? C.elec : act ? "#fff" : "#EEF3F9"; ctx.fill();
    ctx.lineWidth = 2.5; ctx.strokeStyle = f > 0.5 || act ? C.elec : "#CFDAE6"; ctx.stroke();
    if (f > 0.5) icon(ctx, "check", x - 9, sy - 9, 18, "#fff", 3);
    else text(ctx, String(i + 1), x, sy + 5, { size: 13, weight: 800, align: "center", color: act ? C.blue : C.mute });
  });
  if (prg > 0 && prg < 5) pulseDot(ctx, sx0 + prg * sdx, sy, 6, 0.9);

  // active step
  let k = 0;
  for (let i = 0; i < K.length; i++) if (t >= K[i] - 0.3) k = i;
  const tin = K[k] - 0.3, tout = k < K.length - 1 ? K[k + 1] - 0.3 : 1e9;
  const pin = ep(t, tin, 0.3, outQuart), pout = ep(t, tout, 0.25, inCubic);
  ctx.save();
  ctx.beginPath(); ctx.rect(FX - 20, FY - 40, FW + 40, 560); ctx.clip();
  ctx.globalAlpha = Math.min(k === 0 ? 1 : pin, 1 - pout);
  ctx.translate((k === 0 ? 0 : (1 - pin) * 80) - pout * 80, 0);
  const lt = t - K[k];
  text(ctx, `Step ${Math.min(k + 1, 7)} of 7`, FX, FY, { size: 16, weight: 700, color: C.blue });
  const titles = ["Select patch type", "How many patches?", "Patch size", "Choose a backing", "When do you need them?", "Your contact details", "Upload your artwork"];
  text(ctx, titles[k], FX, FY + 44, { size: 34, weight: 800, family: F.head });
  STEP_DRAW[k](ctx, t, lt, K[k]);
  ctx.restore();

  // summary panel
  ctx.save();
  rr(ctx, SUM.x, SUM.y, SUM.w, SUM.h, 20); ctx.fillStyle = "#F7FAFE"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.stroke();
  iconTile(ctx, "doc", SUM.x + 24, SUM.y + 24, 52, C.blue);
  text(ctx, "Your quotation", SUM.x + 92, SUM.y + 50, { size: 22, weight: 800, family: F.head });
  text(ctx, "Fills in as you go", SUM.x + 92, SUM.y + 74, { size: 14, weight: 500, color: C.sub });
  STEPS.forEach(([lab, ic], i) => {
    const y = sumRowY(i), f = filled(i);
    rr(ctx, SUM.x + 24, y, SUM.w - 48, 56, 12);
    ctx.fillStyle = f > 0.5 ? "#fff" : "rgba(255,255,255,0.5)"; ctx.fill();
    ctx.strokeStyle = f > 0.5 ? rgba(C.elec, 0.5) : C.line; ctx.lineWidth = 1.2; ctx.stroke();
    icon(ctx, ic, SUM.x + 40, y + 16, 24, f > 0.5 ? C.blue : C.mute, 2);
    text(ctx, lab, SUM.x + 78, y + 24, { size: 13, weight: 600, color: C.sub });
    if (f > 0) text(ctx, i === 5 ? "Daniel Reed · Apex Apparel" : VALUES[i], SUM.x + 78, y + 46, { size: 17, weight: 700, alpha: f });
    else text(ctx, "Not selected", SUM.x + 78, y + 46, { size: 15, weight: 500, color: C.mute });
    if (f > 0.5) checkBadge(ctx, SUM.x + SUM.w - 50, y + 28, 11, (f - 0.5) * 2);
  });
  // artwork slot
  const docked = ep(t, tArt + 0.25, 0.45, outBack);
  rr(ctx, ART_SLOT.x, ART_SLOT.y, ART_SLOT.w, ART_SLOT.h, 14);
  ctx.setLineDash(docked > 0 ? [] : [6, 6]); ctx.strokeStyle = docked > 0 ? rgba(C.elec, 0.6) : "#BFD0E4"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
  if (docked > 0) {
    patch(ctx, "apex", ART_SLOT.x + 50, ART_SLOT.y + 46, 76 * docked, { shadow: 0.4 });
    text(ctx, "apex-logo.ai", ART_SLOT.x + 100, ART_SLOT.y + 42, { size: 16, weight: 700, family: F.mono, alpha: docked });
    text(ctx, "Artwork attached · 2.4 MB", ART_SLOT.x + 100, ART_SLOT.y + 66, { size: 14, weight: 500, color: C.sub, alpha: docked });
  } else {
    icon(ctx, "clip", ART_SLOT.x + 22, ART_SLOT.y + 34, 24, C.mute, 2);
    text(ctx, "Artwork — not attached", ART_SLOT.x + 58, ART_SLOT.y + 52, { size: 15, weight: 500, color: C.mute });
  }
  ctx.restore();

  // value chips fly from the control to the summary
  for (let i = 0; i < 6; i++) {
    const q = prog(t, K[i] + 0.28, K[i] + 0.58);
    if (q <= 0 || q >= 1) continue;
    const e = inOutCubic(q);
    const x = lerp(FX + 200, SUM.x + 78, e), y = lerp(FY + 260, sumRowY(i) + 30, e) - Math.sin(e * Math.PI) * 80;
    chip(ctx, i === 5 ? "Daniel Reed" : VALUES[i], x, y - 18, { size: 16, fg: "#fff", bg: C.blue });
    pulseDot(ctx, x - 6, y, 5, 1 - e);
  }
  // headline (L2, top right)
  if (!o.noType) {
    kline(ctx, t, { x: 1800, y: 128, size: 50, align: "right", out: K[6] - 0.25, outAnim: "up", outDur: 0.25,
      words: [{ s: "EXACTLY", t: ws("exactly"), color: C.sub }, { s: "WHAT", t: ws("what you") }, { s: "YOU", t: ws("you need"), grad: true }, { s: "NEED.", t: ws("need") }] });
    kline(ctx, t, { x: 1800, y: 128, size: 50, align: "right",
      words: [{ s: "UPLOAD", t: K[6], anim: "rise" }, { s: "THEIR", t: ws("their artwork") }, { s: "ARTWORK.", t: tArt, grad: true }] });
  }
  // cursor drives the selections
  const tgt = TARGETS(K);
  let cx = tgt[0][1], cy = tgt[0][2], click = 0;
  for (let i = 0; i < tgt.length; i++) {
    const [tc, x, y] = tgt[i];
    const m = ep(t, tc - 0.35, 0.3, inOutCubic);
    cx = lerp(cx, x, m); cy = lerp(cy, y, m);
    const c = prog(t, tc, tc + 0.3);
    if (c > 0 && c < 1) click = c;
  }
  cursor(ctx, cx, cy, click, ep(t, K[0] - 1.0, 0.4) * (1 - ep(t, ws("from there") - 0.1, 0.2)));
}

function TARGETS(K: number[]): [number, number, number][] {
  return [
    [K[0] + 0.1, FX + 115, FY + 200],
    [K[1] + 0.1, FX + 2 * 150 + 60, FY + 330],
    [K[2] + 0.1, FX + 60 + 2.5 / 5 * 820, FY + 300],
    [K[3] + 0.1, FX + 200, FY + 110 + 30],
    [K[4] + 0.1, FX + 60 + 6 * 82 + 30, FY + 140 + 2 * 56 + 22],
    [K[5] + 0.15, FX + 400, FY + 120],
    [K[6] + 0.05, FX + 470, FY + 260],
    [ws("artwork", 0) + 0.5, SUM.x + SUM.w / 2, SUM.y + SUM.h - 10],
  ];
}

// ---- step controls
const KINDS = [["apex", "Embroidered", "Classic stitched look"], ["lakeside", "Woven", "Fine detail, flat finish"], ["summit", "PVC", "Durable, raised 3D"], ["pine", "Chenille", "Soft varsity texture"]] as const;
const STEP_DRAW: ((ctx: any, t: number, lt: number, tc: number) => void)[] = [
  // 0 patch type
  (ctx, t, lt, tc) => {
    KINDS.forEach(([k, name, sub], i) => {
      const x = FX + i * 250, y = FY + 80, sel = t > tc + 0.12 && i === 0;
      const a = ep(t, ws("where they") + i * 0.07, 0.4, outQuart);
      ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 30 - (sel ? 8 * ep(t, tc + 0.12, 0.3, outBack) : 0));
      rr(ctx, x, y, 230, 320, 18); ctx.fillStyle = sel ? "#F0F8FF" : "#fff"; ctx.fill();
      ctx.lineWidth = sel ? 3 : 1.2; ctx.strokeStyle = sel ? C.elec : C.line; ctx.stroke();
      patch(ctx, k as any, x + 115, y + 120, 170, { shadow: 0.6 });
      text(ctx, name, x + 20, y + 252, { size: 20, weight: 800 });
      text(ctx, sub, x + 20, y + 280, { size: 14, weight: 500, color: C.sub });
      if (sel) checkBadge(ctx, x + 204, y + 26, 14, ep(t, tc + 0.12, 0.3));
      ctx.restore();
    });
  },
  // 1 quantity
  (ctx, t, lt, tc) => {
    const n = Math.round(500 * ep(t, tc + 0.05, 0.5, outQuart));
    text(ctx, String(n), FX, FY + 200, { size: 120, weight: 800, family: F.head, color: C.blue });
    text(ctx, "pieces", FX + 290, FY + 196, { size: 28, weight: 600, color: C.sub });
    [100, 250, 500, 1000, 2500].forEach((v, i) => {
      const sel = v === 500 && t > tc + 0.12;
      rr(ctx, FX + i * 150, FY + 300, 130, 60, 30); ctx.fillStyle = sel ? C.blue : "#fff"; ctx.fill(); ctx.strokeStyle = sel ? C.blue : C.line; ctx.lineWidth = 1.5; ctx.stroke();
      text(ctx, v.toLocaleString("en-US"), FX + i * 150 + 65, FY + 338, { size: 20, weight: 700, align: "center", color: sel ? "#fff" : C.text });
    });
  },
  // 2 size
  (ctx, t, lt, tc) => {
    const v = lerp(2, 3.5, ep(t, tc - 0.1, 0.5, inOutCubic));
    const tx = FX + 60, tw = 820, kx = tx + ((v - 1) / 5) * tw;
    rr(ctx, tx, FY + 290, tw, 10, 5); ctx.fillStyle = "#E3EBF5"; ctx.fill();
    rr(ctx, tx, FY + 290, kx - tx, 10, 5); ctx.fillStyle = C.elec; ctx.fill();
    for (let i = 1; i <= 6; i++) text(ctx, `${i}"`, tx + ((i - 1) / 5) * tw, FY + 340, { size: 15, weight: 600, color: C.mute, align: "center" });
    ctx.beginPath(); ctx.arc(kx, FY + 295, 18, 0, 7); ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.elec; ctx.stroke();
    chip(ctx, v.toFixed(1) + " in", kx - 44, FY + 222, { size: 18, fg: "#fff", bg: C.navy });
    patch(ctx, "apex", FX + 860, FY + 130, 60 + v * 30, { shadow: 0.5 });
  },
  // 3 backing
  (ctx, t, lt, tc) => {
    [["Iron-On", "Heat-seal adhesive"], ["Sew-On", "Classic stitched attach"], ["Velcro", "Hook & loop"], ["Adhesive", "Peel & stick"]].forEach(([n, d], i) => {
      const y = FY + 90 + i * 92, sel = i === 0 && t > tc + 0.12;
      rr(ctx, FX, y, 760, 76, 14); ctx.fillStyle = sel ? "#F0F8FF" : "#fff"; ctx.fill(); ctx.strokeStyle = sel ? C.elec : C.line; ctx.lineWidth = sel ? 2.5 : 1.2; ctx.stroke();
      ctx.beginPath(); ctx.arc(FX + 38, y + 38, 12, 0, 7); ctx.lineWidth = 2.5; ctx.strokeStyle = sel ? C.elec : "#B9C7D8"; ctx.stroke();
      if (sel) { ctx.beginPath(); ctx.arc(FX + 38, y + 38, 6, 0, 7); ctx.fillStyle = C.elec; ctx.fill(); }
      text(ctx, n, FX + 70, y + 34, { size: 20, weight: 700 });
      text(ctx, d, FX + 70, y + 58, { size: 14, weight: 500, color: C.sub });
    });
  },
  // 4 deadline
  (ctx, t, lt, tc) => {
    text(ctx, "November 2026", FX, FY + 104, { size: 20, weight: 700 });
    ["M", "T", "W", "T", "F", "S", "S"].forEach((d, i) => text(ctx, d, FX + 30 + i * 82, FY + 140, { size: 14, weight: 700, color: C.mute, align: "center" }));
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
      const day = r * 7 + c - 5; // Nov 1 2026 is a Sunday
      if (day < 1 || day > 30) continue;
      const sel = day === 15 && t > tc + 0.12;
      const x = FX + c * 82, y = FY + 158 + r * 56;
      rr(ctx, x, y, 62, 46, 10); ctx.fillStyle = sel ? C.blue : "#F3F7FC"; ctx.fill();
      text(ctx, String(day), x + 31, y + 30, { size: 16, weight: 700, align: "center", color: sel ? "#fff" : C.text });
    }
  },
  // 5 contact
  (ctx, t, lt, tc) => {
    const f = (i: number) => prog(t, tc + i * 0.28, tc + i * 0.28 + 0.4);
    field(ctx, FX, FY + 100, 460, "Full name", "Daniel Reed", f(0), f(0) > 0 && f(0) < 1, f(0) >= 1);
    field(ctx, FX + 500, FY + 100, 460, "Company", "Apex Apparel", f(1), f(1) > 0 && f(1) < 1, f(1) >= 1);
    field(ctx, FX, FY + 200, 460, "Email", "daniel@apexapparel.co", f(2), f(2) > 0 && f(2) < 1, f(2) >= 1);
    field(ctx, FX + 500, FY + 200, 460, "Phone", "+1 (555) 014-2208", f(3), f(3) > 0 && f(3) < 1, f(3) >= 1);
    text(ctx, "Example data", FX, FY + 330, { size: 13, weight: 700, family: F.mono, color: C.mute });
  },
  // 6 artwork upload
  (ctx, t, lt, tc) => {
    const tArt = ws("artwork", 0);
    rr(ctx, FX, FY + 80, 940, 400, 20); ctx.fillStyle = "#F7FAFE"; ctx.fill();
    ctx.setLineDash([10, 8]); ctx.strokeStyle = "#A9C2DE"; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]);
    const fileIn = ep(t, tc - 0.1, 0.45, outBack);
    const up = ep(t, tc + 0.1, tArt - tc - 0.05, inOutCubic);
    const ok = ep(t, tArt, 0.35, outBack);
    if (fileIn < 1) {
      icon(ctx, "upload", FX + 440, FY + 170, 60, C.elec, 2.4);
      text(ctx, "Drag & drop artwork · AI, EPS, PDF, PNG, SVG", FX + 470, FY + 280, { size: 18, weight: 600, color: C.sub, align: "center", alpha: 1 - fileIn });
    }
    if (fileIn > 0) {
      ctx.save(); ctx.globalAlpha *= clamp(fileIn * 2);
      const fx = FX + 280, fy = FY + 120 - (1 - fileIn) * 120;
      // AI file glyph
      rr(ctx, fx, fy, 110, 136, 12); ctx.fillStyle = "#2B1700"; ctx.fill();
      ctx.beginPath(); ctx.moveTo(fx + 80, fy); ctx.lineTo(fx + 110, fy + 30); ctx.lineTo(fx + 80, fy + 30); ctx.closePath(); ctx.fillStyle = "#FF9A00"; ctx.fill();
      text(ctx, "Ai", fx + 55, fy + 92, { size: 46, weight: 800, family: F.head, color: "#FF9A00", align: "center" });
      text(ctx, "apex-logo.ai", fx + 140, fy + 50, { size: 24, weight: 700, family: F.mono });
      text(ctx, "2.4 MB", fx + 140, fy + 80, { size: 16, weight: 500, color: C.sub });
      rr(ctx, fx + 140, fy + 104, 340, 12, 6); ctx.fillStyle = "#E3EBF5"; ctx.fill();
      rr(ctx, fx + 140, fy + 104, 340 * up, 12, 6); ctx.fillStyle = C.blue; ctx.fill();
      text(ctx, ok > 0 ? "Uploaded" : `${Math.round(up * 100)}%  Uploading…`, fx + 140, fy + 148, { size: 16, weight: 700, color: ok > 0 ? "#05834F" : C.sub });
      if (ok > 0) { checkBadge(ctx, fx + 104, fy + 8, 20, ok); patch(ctx, "apex", fx + 190, fy + 290, 150 * ok, { shadow: 0.6 }); text(ctx, "Preview ready for review", fx + 290, fy + 296, { size: 18, weight: 600, color: C.sub, alpha: ok }); }
      ctx.restore();
    }
  },
];
