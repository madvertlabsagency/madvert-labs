// VSL pieces: top band, real-screenshot proof frames (zoom to the metric, outline, dim the
// rest — pixels are never redrawn), the founder frame and the connected node chain.
import { C, F, W, H } from "../core/brand";
import { text, rr, icon, glow, cover } from "../core/draw";
import { clamp, ep, lerp, outExpo, outQuart, outBack, inOutCubic, rgba } from "../core/ease";
import { img } from "../core/assets";
import { iconTile, checkBadge } from "./ui";
import { logoD } from "./brand";

/** Top band: small white logo + "WHITE-LABEL PARTNERSHIP" label. */
export function chrome(ctx: any, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  logoD(ctx, 70 + 120, 112, 240);
  const lab = "WHITE-LABEL PARTNERSHIP";
  ctx.font = `700 19px ${F.mono}`; ctx.letterSpacing = "3px";
  const tw = ctx.measureText(lab).width;
  const x = W - 70 - tw - 50, y = 124;
  rr(ctx, x, y, tw + 50, 46, 23); ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.fill();
  ctx.strokeStyle = rgba(C.cyan, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(x + 23, y + 23, 5, 0, 7); ctx.fillStyle = C.cyan; ctx.fill();
  ctx.fillStyle = "#DCEBFF"; ctx.fillText(lab, x + 37, y + 30);
  ctx.restore();
}

export type Proof = {
  key: string;
  /** source crop [x, y, w, h] in image pixels (keeps everything except what we must leave out) */
  crop: [number, number, number, number];
  /** metric boxes in image pixels */
  hl: [number, number, number, number][];
  /** regions to soften (third-party watermark) in image pixels */
  soften?: [number, number, number, number][];
  head: string;
  sub: string;
};

export const PROOFS: Proof[] = [
  { key: "pTextile", crop: [0, 0, 1383, 640], hl: [[835, 372, 215, 150], [1160, 432, 140, 80]], soften: [[1070, 328, 250, 54]], head: "TEXTILE BUSINESS", sub: "Website RFQs" },
  { key: "pPrivate", crop: [0, 0, 1774, 887], hl: [[898, 628, 270, 115]], head: "PRIVATE LABEL STARTUP", sub: "Website purchases" },
  { key: "pAudit", crop: [0, 0, 1672, 941], hl: [[688, 790, 150, 60], [1118, 790, 162, 60]], head: "AUDIT & TAX FIRM", sub: "USA & Canada" },
  { key: "pNigeria", crop: [0, 0, 1683, 935], hl: [[668, 776, 192, 98]], head: "DUBAI OFF-PLAN", sub: "Investor leads from Nigeria" },
  { key: "pIndia", crop: [0, 0, 1672, 941], hl: [[618, 660, 180, 128], [1108, 660, 178, 128]], head: "DUBAI OFF-PLAN", sub: "Indian investor leads" },
];

/** One proof beat: full screenshot → slow push to the metric → outline + dim → label.
 *  lt = local time since this proof started, dur = its length. Frame: x, y, width w. */
export function proofShot(ctx: any, P: Proof, x: number, y: number, w: number, lt: number, dur: number, a = 1) {
  const im = img(P.key);
  if (!im || a <= 0) return;
  const [cx0, cy0, cw, ch] = P.crop;
  const h = w * ch / cw;
  // focus = centre of the metric boxes
  const bx0 = Math.min(...P.hl.map((b) => b[0])), by0 = Math.min(...P.hl.map((b) => b[1]));
  const bx1 = Math.max(...P.hl.map((b) => b[0] + b[2])), by1 = Math.max(...P.hl.map((b) => b[1] + b[3]));
  const fx = (bx0 + bx1) / 2, fy = (by0 + by1) / 2;
  const zIn = inOutCubic(clamp((lt - 0.35) / Math.max(0.6, dur - 0.9)));
  const s0 = w / cw, s1 = s0 * Math.min(1.75, 0.8 * cw / (bx1 - bx0 + 80));
  const sx = lerp(s0, s1, zIn);
  // view centre moves from the crop centre to the metric, clamped so the image always covers the frame
  const hwx = w / 2 / sx, hwy = h / 2 / sx;
  const vcx = clamp(lerp(cx0 + cw / 2, fx, zIn), cx0 + hwx, cx0 + cw - hwx);
  const vcy = clamp(lerp(cy0 + ch / 2, fy, zIn), cy0 + hwy, cy0 + ch - hwy);
  const X = (px: number) => x + w / 2 + (px - vcx) * sx, Y = (py: number) => y + h / 2 + (py - vcy) * sx;
  ctx.save(); ctx.globalAlpha *= a;
  // frame + glow
  glow(ctx, x + w / 2, y + h / 2, w * 0.7, C.elec, 0.22);
  ctx.save();
  ctx.shadowColor = "rgba(0,120,255,0.45)"; ctx.shadowBlur = 50;
  rr(ctx, x - 4, y - 4, w + 8, h + 8, 26);
  const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, C.elec); g.addColorStop(0.5, "rgba(0,180,255,0.35)"); g.addColorStop(1, C.cyan);
  ctx.fillStyle = g; ctx.fill();
  ctx.restore();
  ctx.save(); rr(ctx, x, y, w, h, 22); ctx.clip();
  ctx.fillStyle = "#0A0F1C"; ctx.fillRect(x, y, w, h);
  ctx.drawImage(im, cx0, cy0, cw, ch, X(cx0), Y(cy0), cw * sx, ch * sx);
  // soften third-party watermark
  for (const [qx, qy, qw, qh] of P.soften ?? []) {
    ctx.save(); ctx.beginPath(); ctx.rect(X(qx), Y(qy), qw * sx, qh * sx); ctx.clip();
    ctx.filter = "blur(10px)"; ctx.drawImage(im, qx - 20, qy - 20, qw + 40, qh + 40, X(qx - 20), Y(qy - 20), (qw + 40) * sx, (qh + 40) * sx); ctx.filter = "none";
    ctx.restore();
  }
  // dim everything except the metric
  const hp = ep(lt, Math.max(0.5, dur * 0.45), 0.4, outExpo);
  if (hp > 0) {
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h);
    for (const [qx, qy, qw, qh] of P.hl) ctx.roundRect(X(qx), Y(qy), qw * sx, qh * sx, 14);
    ctx.fillStyle = `rgba(3,8,20,${0.45 * hp})`; ctx.fill("evenodd");
    ctx.restore();
    for (const [qx, qy, qw, qh] of P.hl) {
      ctx.save(); ctx.shadowColor = C.cyan; ctx.shadowBlur = 18 * hp;
      rr(ctx, X(qx) - 4, Y(qy) - 4, qw * sx + 8, qh * sx + 8, 16); ctx.strokeStyle = rgba(C.cyan, hp); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    }
  }
  ctx.restore();
  ctx.restore();
  return h;
}

/** Context label above a proof frame. */
export function proofLabel(ctx: any, P: Proof, x: number, y: number, lt: number, a = 1) {
  const p = ep(lt, 0.05, 0.4, outExpo);
  if (p <= 0 || a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a * p;
  ctx.translate(0, (1 - p) * 20);
  text(ctx, P.head, x, y, { size: 54, weight: 800, family: F.head, color: "#fff" });
  text(ctx, P.sub.toUpperCase(), x, y + 52, { size: 26, weight: 700, family: F.mono, ls: 4, color: C.cyan });
  ctx.restore();
}

/** Founder photo frame (falls back to a clean typographic card when no photo is supplied). */
export function founder(ctx: any, x: number, y: number, w: number, h: number, t: number, o: { zoom?: number; fy?: number } = {}) {
  const im = img("founder");
  ctx.save();
  ctx.shadowColor = "rgba(0,120,255,0.35)"; ctx.shadowBlur = 60;
  rr(ctx, x - 3, y - 3, w + 6, h + 6, 38);
  const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, C.elec); g.addColorStop(1, C.cyan); ctx.fillStyle = g; ctx.fill();
  ctx.restore();
  ctx.save(); rr(ctx, x, y, w, h, 35); ctx.clip();
  if (im) {
    cover(ctx, im, x, y, w, h, 0.42, o.fy ?? 0.25, (o.zoom ?? 1) + t * 0.004);
    const b = ctx.createLinearGradient(0, y + h * 0.55, 0, y + h); b.addColorStop(0, "rgba(3,8,20,0)"); b.addColorStop(1, "rgba(3,8,20,0.85)");
    ctx.fillStyle = b; ctx.fillRect(x, y, w, h);
  } else {
    const b = ctx.createLinearGradient(x, y, x + w, y + h); b.addColorStop(0, "#0B2148"); b.addColorStop(1, "#06122A");
    ctx.fillStyle = b; ctx.fillRect(x, y, w, h);
    glow(ctx, x + w / 2, y + h * 0.4, w * 0.6, C.elec, 0.3);
    text(ctx, "U", x + w / 2, y + h * 0.5, { size: Math.min(w, h) * 0.42, weight: 800, family: F.head, color: "rgba(255,255,255,0.9)", align: "center" });
  }
  ctx.restore();
}
export function nameTag(ctx: any, x: number, y: number, a: number) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate((1 - a) * -40, 0);
  rr(ctx, x, y, 560, 120, 26); ctx.fillStyle = "rgba(6,18,42,0.82)"; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1.2; ctx.stroke();
  const g = ctx.createLinearGradient(0, y, 0, y + 120); g.addColorStop(0, C.elec); g.addColorStop(1, C.cyan);
  rr(ctx, x + 22, y + 24, 6, 72, 3); ctx.fillStyle = g; ctx.fill();
  text(ctx, "Usama", x + 50, y + 62, { size: 42, weight: 800, family: F.head, color: "#fff" });
  text(ctx, "FOUNDER · MADVERT LABS", x + 52, y + 98, { size: 21, weight: 700, family: F.mono, ls: 3, color: C.cyan });
  ctx.restore();
}

/** A white node card with icon, used in the capability and lead-gen chains. */
export function node(ctx: any, x: number, y: number, w: number, h: number, label: string, ic: string, a: number, act: number, sub?: string) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  const sc = lerp(0.9, 1, outBack(clamp(a), 1.4));
  ctx.translate(x + w / 2, y + h / 2); ctx.scale(sc, sc); ctx.translate(-(x + w / 2), -(y + h / 2));
  if (act > 0) glow(ctx, x + w / 2, y + h / 2, w * 0.8, C.cyan, 0.18 * act);
  ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
  rr(ctx, x, y, w, h, 24); ctx.fillStyle = "#fff"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.lineWidth = 3; ctx.strokeStyle = rgba(C.elec, 0.2 + 0.8 * act); ctx.stroke();
  iconTile(ctx, ic, x + 18, y + (h - 64) / 2, 64, C.blue, act);
  text(ctx, label, x + 100, y + (sub ? h / 2 - 2 : h / 2 + 11), { size: 30, weight: 800, family: F.head, color: C.navy });
  if (sub) text(ctx, sub, x + 100, y + h / 2 + 30, { size: 20, weight: 600, color: C.sub });
  if (act > 0.6) checkBadge(ctx, x + w - 36, y + h / 2, 16, (act - 0.6) / 0.4);
  ctx.restore();
}
