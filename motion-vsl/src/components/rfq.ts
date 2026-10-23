// Product objects that recur through the film: the RFQ card, weak lead cards,
// notifications, the cyan RFQ pulse and the L2 headline bar.
import { C, F, W, font, brandGrad } from "../core/brand";
import { text, rr, icon, glow, chip } from "../core/draw";
import { clamp, lerp, outBack, outCubic, outExpo, rgba, prog } from "../core/ease";
import { glass, pill, checkBadge, iconTile, mixHex, avatar, exampleTag } from "./ui";
import { patch } from "./patches";
import type { Ctx } from "../core/draw";

export const RFQ_ROWS: [string, string, string][] = [
  ["Patch type", "Embroidered", "layers"],
  ["Quantity", "500 pcs", "box"],
  ["Size", "3 in", "ruler"],
  ["Backing", "Iron-on", "layers"],
  ["Deadline", "Dec 12", "calendar"],
  ["Business", "Apex Apparel", "building"],
];

/** The Request for Quotation card. reveal = number of rows shown (0..6, fractional animates).
 *  art 0..1 shows the artwork attachment; qualified 0..1 shows the footer badge. Base size 560x700, scaled by s. */
export function rfqCard(ctx: Ctx, x: number, y: number, s: number, o: { reveal?: number; art?: number; qualified?: number; focus?: number; alpha?: number; compact?: boolean; title?: string } = {}) {
  const reveal = o.reveal ?? 6, art = o.art ?? 1, q = o.qualified ?? 0;
  const W0 = 560, H0 = o.compact ? 470 : 700;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.translate(x, y); ctx.scale(s, s);
  glass(ctx, 0, 0, W0, H0, { r: 26, focus: o.focus ?? 0.6, fill: C.panel });
  iconTile(ctx, "doc", 28, 26, 56, C.blue);
  text(ctx, "Request for", 100, 50, { size: 18, weight: 600, color: C.sub });
  text(ctx, o.title ?? "Quotation", 100, 78, { size: 26, weight: 800, family: F.head, color: C.text });
  text(ctx, "#RFQ-1028", W0 - 28, 50, { size: 14, weight: 700, family: F.mono, color: C.mute, align: "right" });
  text(ctx, "just now", W0 - 28, 74, { size: 14, weight: 600, color: C.blue, align: "right" });
  // company
  ctx.fillStyle = C.line; ctx.fillRect(28, 104, W0 - 56, 1);
  patch(ctx, "apex", 62, 148, 64, { shadow: 0.5 });
  text(ctx, "Apex Apparel", 106, 144, { size: 22, weight: 700, color: C.text });
  text(ctx, "Streetwear brand · example data", 106, 168, { size: 14, weight: 500, color: C.mute });
  // rows
  const rows = o.compact ? RFQ_ROWS.slice(0, 4) : RFQ_ROWS;
  rows.forEach(([k, v, ic], i) => {
    const p = clamp(reveal - i);
    if (p <= 0) return;
    const col = i % 2, row = Math.floor(i / 2);
    const rx = 28 + col * 256, ry = 196 + row * 76;
    ctx.save();
    ctx.globalAlpha *= outCubic(p);
    ctx.translate((1 - outExpo(p)) * 30, 0);
    rr(ctx, rx, ry, 248, 64, 14); ctx.fillStyle = C.well; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke();
    icon(ctx, ic, rx + 14, ry + 18, 28, C.blue, 2);
    text(ctx, k, rx + 54, ry + 26, { size: 13, weight: 600, color: C.sub });
    text(ctx, v, rx + 54, ry + 50, { size: 19, weight: 700, color: C.text });
    ctx.restore();
  });
  if (!o.compact) {
    // artwork attachment
    if (art > 0) {
      const ay = 432;
      ctx.save();
      ctx.globalAlpha *= clamp(art * 2);
      rr(ctx, 28, ay, W0 - 56, 132, 16); ctx.fillStyle = C.well; ctx.fill(); ctx.strokeStyle = rgba(C.elec, 0.45 * art); ctx.stroke();
      icon(ctx, "clip", 46, ay + 20, 24, C.blue, 2);
      text(ctx, "Artwork attached", 80, ay + 38, { size: 17, weight: 700, color: C.text });
      text(ctx, "apex-logo.ai · 2.4 MB", 80, ay + 62, { size: 14, weight: 500, color: C.sub, family: F.mono });
      patch(ctx, "apex", W0 - 110, ay + 66, 104 * lerp(1.4, 1, outBack(clamp(art), 1.4)));
      ctx.restore();
    }
    // qualified footer
    if (q > 0) {
      const fy = 588;
      ctx.save();
      ctx.globalAlpha *= clamp(q * 2);
      rr(ctx, 28, fy, W0 - 56, 84, 16); ctx.fillStyle = rgba(C.green, 0.1); ctx.fill(); ctx.strokeStyle = rgba(C.green, 0.4); ctx.stroke();
      checkBadge(ctx, 70, fy + 42, 20, q);
      text(ctx, "Qualified RFQ", 104, fy + 38, { size: 20, weight: 800, family: F.head, color: "#05834F" });
      text(ctx, "Specs, deadline, artwork & business complete", 104, fy + 62, { size: 14, weight: 500, color: C.sub });
      ctx.restore();
    }
  }
  ctx.restore();
  return { w: W0 * s, h: H0 * s };
}

/** Low-intent lead card. grey 0..1 desaturates it away. */
export function weakLead(ctx: Ctx, x: number, y: number, s: number, who: [string, string], quote: string, o: { alpha?: number; rot?: number; grey?: number } = {}) {
  const W0 = 380, H0 = 300;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.translate(x + W0 * s / 2, y + H0 * s / 2); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s); ctx.translate(-W0 / 2, -H0 / 2);
  glass(ctx, 0, 0, W0, H0, { r: 22, fill: C.panel });
  avatar(ctx, 46, 48, 24, who[0], mixHex("#F0506E", "#A9B8CC", o.grey ?? 0));
  text(ctx, who[1], 82, 44, { size: 19, weight: 700 });
  text(ctx, "Unknown company", 82, 66, { size: 13, weight: 500, color: C.mute });
  chip(ctx, "New lead", W0 - 116, 28, { size: 13, fg: "#C2263F", bg: rgba(C.red, 0.12), dot: C.red });
  rr(ctx, 22, 92, W0 - 44, 54, 12); ctx.fillStyle = C.well; ctx.fill();
  text(ctx, "“" + quote + "”", 40, 127, { size: 20, weight: 700, color: C.text });
  ["Quantity", "Artwork", "Deadline"].forEach((k, i) => {
    const ry = 170 + i * 40;
    text(ctx, k, 26, ry + 20, { size: 15, weight: 600, color: C.sub });
    chip(ctx, k === "Artwork" ? "Not provided" : "Not specified", W0 - 172, ry, { size: 13, fg: "#C2263F", bg: rgba(C.red, 0.1), dot: C.red, h: 28 });
  });
  if ((o.grey ?? 0) > 0) { rr(ctx, 0, 0, W0, H0, 22); ctx.fillStyle = `rgba(233,240,248,${0.65 * (o.grey ?? 0)})`; ctx.fill(); }
  ctx.restore();
}

/** Notification card (email / whatsapp / crm / push). */
export function notif(ctx: Ctx, x: number, y: number, kind: "email" | "whatsapp" | "crm" | "push", p: number, w = 460) {
  if (p <= 0) return;
  const h = 112;
  ctx.save();
  ctx.globalAlpha *= clamp(p * 2.5);
  ctx.translate((1 - outExpo(clamp(p))) * 60, 0);
  glass(ctx, x, y, w, h, { r: 22, fill: C.panel, focus: 0.3 });
  const map = {
    email: ["mail", "#2D7BFF", "NEW EMAIL"],
    whatsapp: ["chat", "#25D366", "WHATSAPP"],
    crm: ["db", C.blue, "CRM · NEW RECORD"],
    push: ["bell", C.elec, "PUSH NOTIFICATION"],
  } as const;
  const [ic, col, lab] = map[kind];
  rr(ctx, x + 18, y + 22, 66, 66, 18); ctx.fillStyle = col; ctx.fill();
  icon(ctx, ic, x + 33, y + 37, 36, "#fff", 2.4);
  text(ctx, lab, x + 102, y + 38, { size: 12, weight: 700, family: F.mono, ls: 1.5, color: C.sub });
  text(ctx, "now", x + w - 22, y + 38, { size: 13, weight: 600, color: C.blue, align: "right" });
  text(ctx, "New qualified RFQ", x + 102, y + 66, { size: 20, weight: 800, family: F.head });
  text(ctx, "Apex Apparel · 500 embroidered · artwork", x + 102, y + 92, { size: 14, weight: 500, color: C.sub });
  ctx.restore();
}

/** The cyan RFQ pulse: a bright data dot with halo and trail. */
export function pulseDot(ctx: Ctx, x: number, y: number, r = 10, a = 1, trail?: [number, number]) {
  if (a <= 0) return;
  ctx.save();
  ctx.globalAlpha *= a;
  if (trail) {
    const g = ctx.createLinearGradient(trail[0], trail[1], x, y);
    g.addColorStop(0, "rgba(0,229,255,0)"); g.addColorStop(1, rgba(C.cyan, 0.8));
    ctx.strokeStyle = g; ctx.lineWidth = r * 0.9; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(trail[0], trail[1]); ctx.lineTo(x, y); ctx.stroke();
  }
  glow(ctx, x, y, r * 6, C.cyan, 0.6);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
  ctx.lineWidth = r * 0.45; ctx.strokeStyle = C.elec; ctx.stroke();
  ctx.restore();
}

/** Eyebrow + label used as a small section marker (top-left). */
export function sectionTag(ctx: Ctx, n: string, label: string, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  text(ctx, n, 120, 86, { size: 15, weight: 700, family: F.mono, ls: 3, color: C.blue });
  ctx.fillStyle = rgba(C.elec, 0.7); ctx.fillRect(160, 80, 36, 2);
  text(ctx, label.toUpperCase(), 210, 86, { size: 15, weight: 700, family: F.mono, ls: 3, color: C.sub });
  ctx.restore();
}

export { exampleTag, patch, pill };
