// 03 DEMO — "We create the ads, build the funnel, capture all the order details and even
// artwork uploads." Ad → tap → CTA expands into the client's funnel → fields snap in one by
// one → artwork drops into the slot.
import { C, F, W, H } from "../core/brand";
import { background, text, rr, icon, glow, cover, cursor, chip } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, inCubic, lerp, prog, rgba } from "../core/ease";
import { ws, we } from "../core/words";
import { video } from "../core/assets";
import { kline } from "../components/kinetic";
import { glass, button, checkBadge, iconTile, pill } from "../components/ui";
import { patch } from "../components/patches";
import { pulseDot } from "../components/rfq";
import { ribbon } from "../components/ribbon";

export const CARD = { x: 90, y: 470, w: 900, h: 1190 };
const FIELDS: [string, string, string][] = [["Patch type", "Embroidered", "layers"], ["Quantity", "500 pcs", "box"], ["Size", "3.5 in", "ruler"], ["Backing", "Iron-On", "layers"], ["Deadline", "Nov 15", "calendar"], ["Contact details", "Daniel Reed · Apex Apparel", "user"]];
export const rowY = (i: number) => CARD.y + 300 + i * 92;
export const SLOT = { x: CARD.x + 40, y: CARD.y + 860, w: CARD.w - 80, h: 200 };

function brandMark(ctx: any, x: number, y: number, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(16, -11); ctx.lineTo(14, 8); ctx.lineTo(0, 18); ctx.lineTo(-14, 8); ctx.lineTo(-16, -11); ctx.closePath();
  const g = ctx.createLinearGradient(-16, -18, 16, 18); g.addColorStop(0, "#F07A1F"); g.addColorStop(1, "#C2410C"); ctx.fillStyle = g; ctx.fill();
  text(ctx, "YOUR BRAND", 30, 9, { size: 24, weight: 800, family: F.head, ls: 1, color: C.navy });
  ctx.restore();
}

/** The patch ad unit, design size 760 x 1000. */
function adUnit(ctx: any, x: number, y: number, s: number, t: number, press: number) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glass(ctx, 0, 0, 760, 1000, { r: 32, shadow: 1 });
  ctx.beginPath(); ctx.arc(56, 58, 28, 0, 7); ctx.fillStyle = "#FFF1E6"; ctx.fill();
  icon(ctx, "layers", 42, 44, 28, "#E8590C", 2.2);
  text(ctx, "Your Brand", 100, 54, { size: 26, weight: 800, color: C.navy });
  text(ctx, "Sponsored", 100, 84, { size: 19, weight: 500, color: C.sub });
  ctx.save(); ctx.beginPath(); ctx.rect(0, 116, 760, 700); ctx.clip();
  cover(ctx, video("stitch", 0.4 + t * 0.6), 0, 116, 760, 700, 0.42, 0.55, 1.2);
  const g = ctx.createLinearGradient(0, 116, 0, 816); g.addColorStop(0, "rgba(3,10,24,0.25)"); g.addColorStop(1, "rgba(3,10,24,0.9)"); ctx.fillStyle = g; ctx.fillRect(0, 116, 760, 700);
  patch(ctx, "apex", 380, 400, 380);
  text(ctx, "CUSTOM PATCHES", 380, 680, { size: 58, weight: 800, family: F.head, align: "center", color: "#fff" });
  text(ctx, "BUILT FOR YOUR BRAND", 380, 734, { size: 36, weight: 700, family: F.head, align: "center", color: C.cyan });
  text(ctx, "Embroidered · Woven · PVC · Chenille", 380, 784, { size: 22, weight: 500, align: "center", color: "#C9D6E6" });
  ctx.restore();
  button(ctx, 30, 850, 700, 104, "Get a quote  →", { size: 38, press, hover: 1 });
  ctx.restore();
}

export function drawDemo(ctx: any, t: number) {
  const tW = ws("we create") - 0.1, tAds = ws("ads"), tBuild = ws("build"), tFun = ws("funnel"), tCap = ws("capture"), tEven = ws("even"), tArt = ws("artwork"), tUp = ws("uploads");
  background(ctx, t, { grid: 0.6 });
  // ---- headers (L2), each replaced by the next
  const hd = (words: any[], tout?: number) => kline(ctx, t, { x: 90, y: 330, size: 74, out: tout, outAnim: "up", outDur: 0.22, words });
  hd([{ s: "WE", t: tW + 0.1 }, { s: "CREATE", t: ws("create") }, { s: "THE", t: ws("the ads") }, { s: "ADS.", t: tAds, color: C.cyan }], tBuild - 0.1);
  hd([{ s: "WE", t: tBuild }, { s: "BUILD", t: tBuild + 0.05 }, { s: "THE", t: ws("the funnel") }, { s: "FUNNEL.", t: tFun, color: C.cyan }], tCap - 0.1);
  hd([{ s: "ALL", t: ws("all") }, { s: "THE", t: ws("the order") }, { s: "ORDER", t: ws("order details"), color: C.cyan }, { s: "DETAILS.", t: ws("details"), color: C.cyan }], tEven - 0.08);
  kline(ctx, t, { x: 90, y: 330, size: 74, words: [{ s: "+", t: tEven, color: C.cyan }, { s: "ARTWORK", t: tArt, anim: "slam" }, { s: "UPLOAD.", t: tUp, anim: "slam" }] });

  // ---- A: the ad, tapped
  const press = prog(t, tAds + 0.05, tAds + 0.35);
  const expand = ep(t, tAds + 0.4, 0.55, inOutExpo);
  if (expand < 1) {
    const ai = ep(t, tW, 0.45, outQuart);
    ctx.save(); ctx.globalAlpha *= ai * (1 - expand);
    adUnit(ctx, 160 + (1 - ai) * 120, 500, 1, t - tW, press);
    ctx.restore();
    cursor(ctx, lerp(900, 640, ep(t, tAds - 0.45, 0.4, inOutCubic)), lerp(1700, 1400, ep(t, tAds - 0.45, 0.4, inOutCubic)), press, ep(t, tAds - 0.5, 0.2) * (1 - expand));
  }
  // ---- B: the CTA button expands into the funnel card
  if (expand > 0) {
    const bx = 160 + 30, by = 500 + 850, bw = 700, bh = 104;
    const x = lerp(bx, CARD.x, expand), y = lerp(by, CARD.y, expand), w = lerp(bw, CARD.w, expand), h = lerp(bh, CARD.h, expand);
    if (expand < 0.7) { rr(ctx, x, y, w, h, lerp(52, 36, expand)); const g = ctx.createLinearGradient(x, y, x + w, y); g.addColorStop(0, C.blue); g.addColorStop(1, C.elec); ctx.fillStyle = g; ctx.fill(); }
    if (expand > 0.5) funnelCard(ctx, t, clamp((expand - 0.5) * 2));
    // pulse leaves the button
    const pp = prog(t, tAds + 0.3, tAds + 0.9);
    if (pp > 0 && pp < 1) pulseDot(ctx, lerp(540, 300, inOutCubic(pp)), lerp(1400, CARD.y + 120, inOutCubic(pp)), 12);
  }
}

function funnelCard(ctx: any, t: number, a: number) {
  const tFun = ws("funnel"), tCap = ws("capture"), tArt = ws("artwork"), tUp = ws("uploads");
  const K = [tCap, tCap + 0.34, tCap + 0.68, tCap + 1.02, tCap + 1.36, tCap + 1.7];
  ctx.save(); ctx.globalAlpha *= a;
  glass(ctx, CARD.x, CARD.y, CARD.w, CARD.h, { r: 36, focus: 0.6, shadow: 1 });
  brandMark(ctx, CARD.x + 60, CARD.y + 66, 1);
  text(ctx, "quote.yourbrand.com", CARD.x + CARD.w - 40, CARD.y + 74, { size: 20, weight: 500, color: C.sub, align: "right" });
  ctx.fillStyle = C.line; ctx.fillRect(CARD.x, CARD.y + 116, CARD.w, 1.5);
  text(ctx, "Get your patch quote", CARD.x + 40, CARD.y + 188, { size: 46, weight: 800, family: F.head, color: C.navy });
  // progress bar
  const done = K.reduce((s, k) => s + ep(t, k + 0.12, 0.15), 0) + ep(t, tUp + 0.3, 0.2);
  rr(ctx, CARD.x + 40, CARD.y + 228, CARD.w - 80, 12, 6); ctx.fillStyle = "#E3EBF5"; ctx.fill();
  rr(ctx, CARD.x + 40, CARD.y + 228, (CARD.w - 80) * Math.max(0.03, done / 7), 12, 6); ctx.fillStyle = C.elec; ctx.fill();
  text(ctx, `${Math.round(done)}/7 complete`, CARD.x + CARD.w - 40, CARD.y + 210, { size: 20, weight: 700, color: C.blue, align: "right" });
  // rows
  FIELDS.forEach(([lab, val, ic], i) => {
    const y = rowY(i), f = ep(t, K[i], 0.18, outExpo), active = t >= K[i] - 0.1 && t < K[i] + 0.3;
    const snap = 1 + 0.04 * Math.sin(clamp((t - K[i]) / 0.18) * Math.PI);
    ctx.save();
    ctx.translate(CARD.x + CARD.w / 2, y + 38); ctx.scale(snap, snap); ctx.translate(-(CARD.x + CARD.w / 2), -(y + 38));
    rr(ctx, CARD.x + 40, y, CARD.w - 80, 76, 16);
    ctx.fillStyle = f > 0.5 ? "#F0F8FF" : "#F5F8FC"; ctx.fill();
    ctx.lineWidth = active ? 3 : 1.5; ctx.strokeStyle = active ? C.elec : f > 0.5 ? rgba(C.elec, 0.4) : C.line; ctx.stroke();
    icon(ctx, ic, CARD.x + 64, y + 22, 32, f > 0.5 ? C.blue : C.mute, 2.2);
    text(ctx, lab, CARD.x + 116, y + 47, { size: 26, weight: 600, color: C.sub });
    if (f > 0) text(ctx, val, CARD.x + CARD.w - 104, y + 48, { size: 28, weight: 800, color: C.navy, align: "right", alpha: f });
    if (f > 0.4) checkBadge(ctx, CARD.x + CARD.w - 70, y + 38, 18, (f - 0.4) / 0.6);
    ctx.restore();
  });
  // artwork slot: file drops in, uploads, preview snaps into place
  const S = SLOT;
  const drop = ep(t, tArt - 0.05, 0.4, outBack);
  const up = ep(t, tArt + 0.2, tUp + 0.3 - tArt, inOutCubic);
  const ok = ep(t, tUp + 0.35, 0.3, outBack);
  rr(ctx, S.x, S.y, S.w, S.h, 20); ctx.fillStyle = ok > 0 ? rgba(C.green, 0.07) : "#F7FAFE"; ctx.fill();
  ctx.setLineDash(drop > 0 ? [] : [12, 10]); ctx.lineWidth = 2.5; ctx.strokeStyle = ok > 0 ? rgba(C.green, 0.6) : drop > 0 ? C.elec : "#A9C2DE"; ctx.stroke(); ctx.setLineDash([]);
  if (drop <= 0) {
    icon(ctx, "upload", S.x + S.w / 2 - 28, S.y + 46, 56, C.elec, 2.4);
    text(ctx, "Upload artwork · AI, EPS, PDF, PNG", S.x + S.w / 2, S.y + 150, { size: 24, weight: 600, color: C.sub, align: "center" });
  } else {
    const fy = S.y + 36 - (1 - drop) * 260;
    rr(ctx, S.x + 30, fy, 104, 128, 12); ctx.fillStyle = "#2B1700"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(S.x + 104, fy); ctx.lineTo(S.x + 134, fy + 30); ctx.lineTo(S.x + 104, fy + 30); ctx.closePath(); ctx.fillStyle = "#FF9A00"; ctx.fill();
    text(ctx, "Ai", S.x + 82, fy + 88, { size: 46, weight: 800, family: F.head, color: "#FF9A00", align: "center" });
    text(ctx, "apex-logo.ai", S.x + 166, S.y + 74, { size: 30, weight: 700, family: F.mono, color: C.navy });
    rr(ctx, S.x + 166, S.y + 100, 420, 14, 7); ctx.fillStyle = "#E3EBF5"; ctx.fill();
    rr(ctx, S.x + 166, S.y + 100, 420 * up, 14, 7); ctx.fillStyle = ok > 0 ? C.green : C.blue; ctx.fill();
    text(ctx, ok > 0 ? "Uploaded · 2.4 MB" : `Uploading ${Math.round(up * 100)}%`, S.x + 166, S.y + 158, { size: 24, weight: 700, color: ok > 0 ? "#05834F" : C.sub });
    if (ok > 0) { patch(ctx, "apex", S.x + S.w - 90, S.y + S.h / 2, 150 * ok); checkBadge(ctx, S.x + 124, S.y + 40, 18, ok); }
  }
  ctx.restore();
}
