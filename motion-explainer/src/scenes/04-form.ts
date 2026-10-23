// 04 REQUIREMENT FLOW — "Wahan hum usse wo information collect karte hain jo aapki team ko
// actual quotation dene ke liye chahiye. Jaise patch type, quantity, size, backing, deadline,
// artwork aur business details." The branded quote page fills field by field on each word.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { kline } from "../components/kinetic";
import { glass, checkBadge } from "../components/ui";
import { patch } from "../components/patches";
import { brandMark } from "../components/explainer";

export const CARD = { x: 80, y: 500, w: 920, h: 1010 };
// [label, value, icon, cue word, nth]
const FIELDS: [string, string, string, string, number][] = [
  ["Patch type", "Embroidered", "layers", "patch", 1], ["Quantity", "500 pcs", "box", "quantity", 0], ["Size", "3 in", "ruler", "size", 0],
  ["Backing", "Iron-on", "layers", "backing", 0], ["Deadline", "Dec 12", "calendar", "deadline", 0],
];
const rowY = (i: number) => CARD.y + 250 + i * 86;
const SLOT = { x: CARD.x + 40, y: CARD.y + 690, h: 140 };
const BIZ_Y = CARD.y + 850;

export function drawForm(ctx: any, t: number) {
  const tW = ws("wahan") - 0.1, tInfo = ws("information"), tQ = ws("quotation"), tArt = ws("artwork"), tBiz = ws("business");
  background(ctx, t, { grid: 0.5 });
  kline(ctx, t, { x: W / 2, y: 452, size: 60, align: "center", out: ws("actual") - 0.12, outAnim: "up", outDur: 0.22,
    words: [{ s: "WHAT", t: tInfo - 0.1 }, { s: "YOUR", t: tInfo + 0.05 }, { s: "TEAM", t: ws("team", 1), color: C.blue }, { s: "NEEDS", t: ws("team", 1) + 0.2 }] });
  kline(ctx, t, { x: W / 2, y: 452, size: 60, align: "center",
    words: [{ s: "FOR", t: ws("actual") - 0.05 }, { s: "AN", t: ws("actual") + 0.05 }, { s: "ACTUAL", t: ws("actual") + 0.15, grad: true }, { s: "QUOTE.", t: tQ, grad: true }] });
  const a = ep(t, tW, 0.6, outQuart);
  const K = FIELDS.map(([, , , w, n]) => ws(w, n));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 80);
  glass(ctx, CARD.x, CARD.y, CARD.w, CARD.h, { r: 36, focus: 0.5, shadow: 1 });
  brandMark(ctx, CARD.x + 50, CARD.y + 62, 1);
  text(ctx, "quote.yourbrand.com", CARD.x + CARD.w - 40, CARD.y + 70, { size: 20, weight: 500, color: C.sub, align: "right" });
  ctx.fillStyle = C.line; ctx.fillRect(CARD.x, CARD.y + 108, CARD.w, 1.5);
  text(ctx, "Request your patch quote", CARD.x + 40, CARD.y + 172, { size: 42, weight: 800, family: F.head, color: C.navy });
  const done = K.reduce((s, k) => s + ep(t, k + 0.12, 0.15), 0) + ep(t, tArt + 0.6, 0.2) + ep(t, tBiz + 0.6, 0.2);
  rr(ctx, CARD.x + 40, CARD.y + 202, CARD.w - 80, 12, 6); ctx.fillStyle = "#E3EBF5"; ctx.fill();
  rr(ctx, CARD.x + 40, CARD.y + 202, (CARD.w - 80) * Math.max(0.03, done / 7), 12, 6); ctx.fillStyle = done >= 6.99 ? C.green : C.elec; ctx.fill();
  text(ctx, `${Math.round(done)}/7 complete`, CARD.x + CARD.w - 40, CARD.y + 172, { size: 22, weight: 700, color: done >= 6.99 ? "#05834F" : C.blue, align: "right" });
  FIELDS.forEach(([lab, val, ic], i) => row(ctx, t, rowY(i), lab, val, ic, K[i]));
  // artwork upload
  const drop = ep(t, tArt - 0.1, 0.35, outBack), up = ep(t, tArt + 0.1, 0.5, inOutCubic), ok = ep(t, tArt + 0.6, 0.3, outBack);
  const S = SLOT, sw = CARD.w - 80;
  rr(ctx, S.x, S.y, sw, S.h, 18); ctx.fillStyle = ok > 0 ? rgba(C.green, 0.07) : "#F7FAFE"; ctx.fill();
  ctx.setLineDash(drop > 0 ? [] : [12, 10]); ctx.lineWidth = 2.5; ctx.strokeStyle = ok > 0 ? rgba(C.green, 0.6) : drop > 0 ? C.elec : "#A9C2DE"; ctx.stroke(); ctx.setLineDash([]);
  if (drop <= 0) {
    icon(ctx, "upload", S.x + 40, S.y + 46, 48, C.elec, 2.4);
    text(ctx, "Artwork", S.x + 110, S.y + 66, { size: 28, weight: 700, color: C.sub });
    text(ctx, "AI · EPS · PDF · PNG", S.x + 110, S.y + 100, { size: 20, weight: 600, color: C.mute });
  } else {
    const fy = S.y + 18 - (1 - drop) * 200;
    rr(ctx, S.x + 26, fy, 88, 104, 12); ctx.fillStyle = "#2B1700"; ctx.fill();
    text(ctx, "Ai", S.x + 70, fy + 70, { size: 40, weight: 800, family: F.head, color: "#FF9A00", align: "center" });
    text(ctx, "apex-logo.ai", S.x + 144, S.y + 58, { size: 28, weight: 700, family: F.mono, color: C.navy });
    rr(ctx, S.x + 144, S.y + 78, 420, 12, 6); ctx.fillStyle = "#E3EBF5"; ctx.fill();
    rr(ctx, S.x + 144, S.y + 78, 420 * up, 12, 6); ctx.fillStyle = ok > 0 ? C.green : C.blue; ctx.fill();
    text(ctx, ok > 0 ? "Artwork uploaded" : `Uploading ${Math.round(up * 100)}%`, S.x + 144, S.y + 122, { size: 22, weight: 700, color: ok > 0 ? "#05834F" : C.sub });
    if (ok > 0) { patch(ctx, "apex", S.x + sw - 80, S.y + S.h / 2, 110 * ok); checkBadge(ctx, S.x + 112, S.y + 22, 16, ok); }
  }
  // business details (two mini fields)
  const bz = ep(t, tBiz, 0.4);
  [["Business", "Apex Apparel"], ["Contact", "Daniel R. · email · phone"]].forEach(([k, v], i) => {
    const x = CARD.x + 40 + i * 300, w = i ? 540 : 280, y = BIZ_Y;
    rr(ctx, x, y, w, 110, 16); ctx.fillStyle = bz > 0.5 ? "#F0F8FF" : "#F5F8FC"; ctx.fill();
    ctx.lineWidth = bz > 0 && bz < 1 ? 3 : 1.5; ctx.strokeStyle = bz > 0.5 ? rgba(C.elec, 0.45) : C.line; ctx.stroke();
    text(ctx, k, x + 22, y + 42, { size: 22, weight: 600, color: C.sub });
    const n = Math.ceil(clamp((t - tBiz - i * 0.15) / 0.5) * v.length);
    if (n > 0) text(ctx, v.slice(0, n), x + 22, y + 82, { size: 26, weight: 800, color: C.navy });
  });
  if (bz > 0) checkBadge(ctx, CARD.x + CARD.w - 64, BIZ_Y + 55, 18, ep(t, tBiz + 0.6, 0.3));
  text(ctx, "SAMPLE FORM · EXAMPLE VALUES", CARD.x + CARD.w - 40, CARD.y + CARD.h - 22, { size: 15, weight: 700, family: F.mono, ls: 2, color: C.mute, align: "right" });
  ctx.restore();
}

function row(ctx: any, t: number, y: number, lab: string, val: string, ic: string, k: number) {
  const f = ep(t, k, 0.18, outExpo), active = t >= k - 0.1 && t < k + 0.35;
  const snap = 1 + 0.035 * Math.sin(clamp((t - k) / 0.18) * Math.PI);
  ctx.save();
  ctx.translate(CARD.x + CARD.w / 2, y + 36); ctx.scale(snap, snap); ctx.translate(-(CARD.x + CARD.w / 2), -(y + 36));
  rr(ctx, CARD.x + 40, y, CARD.w - 80, 72, 16);
  ctx.fillStyle = f > 0.5 ? "#F0F8FF" : "#F5F8FC"; ctx.fill();
  ctx.lineWidth = active ? 3 : 1.5; ctx.strokeStyle = active ? C.elec : f > 0.5 ? rgba(C.elec, 0.4) : C.line; ctx.stroke();
  icon(ctx, ic, CARD.x + 64, y + 20, 32, f > 0.5 ? C.blue : C.mute, 2.2);
  text(ctx, lab, CARD.x + 116, y + 46, { size: 27, weight: 600, color: C.sub });
  if (f > 0) text(ctx, val, CARD.x + CARD.w - 110, y + 47, { size: 29, weight: 800, color: C.navy, align: "right", alpha: f });
  if (f > 0.4) checkBadge(ctx, CARD.x + CARD.w - 74, y + 36, 18, (f - 0.4) / 0.6);
  ctx.restore();
}
