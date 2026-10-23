// Shared pieces for the post-lead explainer: the sample client brand ("Your Brand"), the
// chapter header, inquiry bubbles, and small UI tiles used by the backend montage.
import { C, F, W } from "../core/brand";
import { text, rr, icon, glow, cover, chip } from "../core/draw";
import { clamp, lerp, outBack, outExpo, rgba } from "../core/ease";
import { img, video } from "../core/assets";
import { glass, button, pill, checkBadge, avatar, toggle, lines } from "./ui";
import { patch } from "./patches";
import { logo } from "./brand";

/** The sample client's shield mark (orange, never Madvert's). */
export function shield(ctx: any, x: number, y: number, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(16, -11); ctx.lineTo(14, 8); ctx.lineTo(0, 18); ctx.lineTo(-14, 8); ctx.lineTo(-16, -11); ctx.closePath();
  const g = ctx.createLinearGradient(-16, -18, 16, 18); g.addColorStop(0, "#F07A1F"); g.addColorStop(1, "#C2410C"); ctx.fillStyle = g; ctx.fill();
  ctx.restore();
}
/** Shield + "YOUR BRAND" wordmark. */
export function brandMark(ctx: any, x: number, y: number, s = 1, color: string = C.navy) {
  shield(ctx, x, y, s);
  text(ctx, "YOUR BRAND", x + 30 * s, y + 9 * s, { size: 24 * s, weight: 800, family: F.head, ls: 1, color });
}

export const CHAPTERS = ["THE PROBLEM", "THE SYSTEM", "YOUR BRAND", "PROPER RFQ", "THE MODEL", "QUALIFICATION", "END TO END", "THE BACKEND"];
/** Top band: small official logo (left) and the chapter pill (right). */
export function chrome(ctx: any, t: number, chapter: number, a = 1) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  logo(ctx, 70 + 130, 120, 260);
  const lab = `${String(chapter + 1).padStart(2, "0")} · ${CHAPTERS[chapter]}`;
  ctx.font = `700 20px ${F.mono}`; ctx.letterSpacing = "3px";
  const tw = ctx.measureText(lab).width;
  const x = W - 70 - tw - 52, y = 132;
  rr(ctx, x, y, tw + 52, 48, 24); ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fill();
  ctx.strokeStyle = rgba(C.elec, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(x + 24, y + 24, 5, 0, 7); ctx.fillStyle = C.elec; ctx.fill();
  ctx.fillStyle = C.navy; ctx.fillText(lab, x + 38, y + 31);
  // progress ticks
  for (let i = 0; i < CHAPTERS.length; i++) {
    rr(ctx, W - 70 - (CHAPTERS.length - i) * 34 + 6, y + 66, 26, 5, 2.5);
    ctx.fillStyle = i <= chapter ? C.elec : "rgba(120,150,190,0.25)"; ctx.fill();
  }
  ctx.restore();
}

/** Small inquiry chat bubble: initials, message, optional red "missing" tag. */
export function bubble(ctx: any, x: number, y: number, s: number, who: string, msg: string, tag: string, o: { alpha?: number; grey?: number; rot?: number } = {}) {
  const W0 = 470, H0 = 112;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s, s);
  glass(ctx, 0, 0, W0, H0, { r: 24, shadow: 0.7 });
  const g = o.grey ?? 0;
  avatar(ctx, 52, 56, 30, who, g > 0.5 ? "#A9B8CC" : C.blue);
  text(ctx, "New inquiry", 100, 40, { size: 17, weight: 700, family: F.mono, ls: 1, color: C.mute });
  text(ctx, "“" + msg + "”", 100, 82, { size: 28, weight: 800, color: C.navy });
  if (tag) chip(ctx, tag, W0 - 18 - (tag.length * 10.5 + 44), 20, { size: 15, fg: "#C2263F", bg: rgba(C.red, 0.12), dot: C.red, h: 30 });
  if (g > 0) { rr(ctx, 0, 0, W0, H0, 24); ctx.fillStyle = `rgba(233,240,248,${0.6 * g})`; ctx.fill(); }
  ctx.restore();
}

/** Rounded footage panel with a light frame. */
export function footage(ctx: any, key: string, vt: number, x: number, y: number, w: number, h: number, o: { fx?: number; fy?: number; zoom?: number; r?: number; dim?: number; crop?: [number, number, number, number] } = {}) {
  ctx.save();
  ctx.shadowColor = "rgba(20,60,120,0.22)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 18;
  rr(ctx, x, y, w, h, o.r ?? 36); ctx.fillStyle = "#0A0F1C"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.clip();
  cover(ctx, video(key, vt), x, y, w, h, o.fx ?? 0.5, o.fy ?? 0.5, o.zoom ?? 1, o.crop);
  ctx.fillStyle = `rgba(6,20,48,${0.12 + (o.dim ?? 0)})`; ctx.fillRect(x, y, w, h);
  ctx.restore();
  ctx.save(); rr(ctx, x, y, w, h, o.r ?? 36); ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
}

// ---------------------------------------------------------------- backend montage tiles
// Each tile draws inside a 600 x 600 design box at (0,0); the caller scales it.
export const TILES = ["STATIC AD", "VIDEO AD", "META CAMPAIGN", "LANDING PAGE", "RFQ FORM", "CRM PIPELINE", "WHATSAPP FOLLOW-UP", "SALES HANDOFF"];
export function tile(ctx: any, k: number, t: number) {
  glass(ctx, 0, 0, 600, 600, { r: 34, shadow: 0.9 });
  ctx.save(); rr(ctx, 0, 0, 600, 600, 34); ctx.clip();
  switch (k) {
    case 0: { // static ad creative
      const g = ctx.createLinearGradient(0, 0, 0, 600); g.addColorStop(0, "#0B1D3F"); g.addColorStop(1, "#06122A");
      ctx.fillStyle = g; ctx.fillRect(0, 0, 600, 600);
      glow(ctx, 300, 250, 340, C.elec, 0.25);
      patch(ctx, "apex", 300, 230, 270, { rot: Math.sin(t * 1.2) * 0.04 });
      text(ctx, "CUSTOM PATCHES", 300, 450, { size: 46, weight: 800, family: F.head, align: "center", color: "#fff" });
      text(ctx, "Made for your brand", 300, 494, { size: 26, weight: 600, align: "center", color: C.cyan });
      brandMark(ctx, 40, 50, 0.8, "#fff");
      button(ctx, 150, 520, 300, 56, "Get a quote", { size: 22 });
      break;
    }
    case 1: { // video creative
      cover(ctx, video("embroidery", 1 + t * 0.8), 0, 0, 600, 600, 0.5, 0.6, 1.15);
      const g = ctx.createLinearGradient(0, 300, 0, 600); g.addColorStop(0, "rgba(4,10,20,0)"); g.addColorStop(1, "rgba(4,10,20,0.85)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, 600, 600);
      brandMark(ctx, 40, 50, 0.8, "#fff");
      text(ctx, "Stitched for your team.", 40, 500, { size: 34, weight: 800, family: F.head, color: "#fff" });
      rr(ctx, 40, 540, 520, 8, 4); ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.fill();
      rr(ctx, 40, 540, 520 * ((t * 0.25) % 1), 8, 4); ctx.fillStyle = C.cyan; ctx.fill();
      ctx.beginPath(); ctx.arc(520, 70, 34, 0, 7); ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
      icon(ctx, "play", 503, 53, 34, C.blue, 2.6);
      break;
    }
    case 2: { // Meta campaign (structure only, no performance numbers)
      ctx.fillStyle = "#F7FAFE"; ctx.fillRect(0, 0, 600, 600);
      text(ctx, "Ads Manager", 36, 64, { size: 30, weight: 800, family: F.head });
      text(ctx, "Your Brand · ad account", 36, 98, { size: 20, weight: 600, color: C.sub });
      [["Patch quote · Prospecting", 1], ["Patch quote · Retargeting", 1], ["Bulk orders · Lookalike", 1]].forEach(([n], i) => {
        const y = 140 + i * 120;
        rr(ctx, 30, y, 540, 100, 18); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
        toggle(ctx, 54, y + 34, 1, 1);
        text(ctx, n as string, 128, y + 46, { size: 23, weight: 700 });
        text(ctx, "Objective: qualified RFQs", 128, y + 76, { size: 18, weight: 500, color: C.sub });
        pill(ctx, 470, y + 32, "Active", 1, C.green, 15);
      });
      text(ctx, "EXAMPLE SETUP", 564, 570, { size: 14, weight: 700, family: F.mono, ls: 2, color: C.mute, align: "right" });
      break;
    }
    case 3: { // landing page
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 600, 600);
      ctx.fillStyle = "#F3F7FC"; ctx.fillRect(0, 0, 600, 64);
      rr(ctx, 150, 16, 300, 32, 16); ctx.fillStyle = "#fff"; ctx.fill();
      text(ctx, "quote.yourbrand.com", 300, 38, { size: 16, weight: 600, color: C.sub, align: "center" });
      brandMark(ctx, 50, 110, 0.9);
      text(ctx, "Custom patches,", 40, 200, { size: 44, weight: 800, family: F.head });
      text(ctx, "built for your brand.", 40, 252, { size: 44, weight: 800, family: F.head, color: "#C2410C" });
      lines(ctx, 40, 290, 380, 2, { gap: 22, h: 10 });
      patch(ctx, "summit", 470, 380, 170, { rot: 0.08 });
      button(ctx, 40, 470, 330, 72, "Get your quote  →", { size: 24, hover: 0.5 + 0.5 * Math.sin(t * 3) });
      break;
    }
    case 4: { // RFQ form
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 600, 600);
      text(ctx, "Get your patch quote", 36, 70, { size: 32, weight: 800, family: F.head });
      [["Patch type", "Embroidered"], ["Quantity", "500 pcs"], ["Backing", "Iron-on"], ["Deadline", "Dec 12"], ["Artwork", "Uploaded"]].forEach(([k, v], i) => {
        const y = 104 + i * 90, f = clamp((t * 2.2) - i * 0.6);
        rr(ctx, 30, y, 540, 74, 16); ctx.fillStyle = f > 0.5 ? "#F0F8FF" : "#F5F8FC"; ctx.fill();
        ctx.strokeStyle = f > 0.5 ? rgba(C.elec, 0.4) : C.line; ctx.lineWidth = 1.5; ctx.stroke();
        text(ctx, k, 54, y + 45, { size: 22, weight: 600, color: C.sub });
        if (f > 0) text(ctx, v, 500, y + 46, { size: 24, weight: 800, align: "right", alpha: f });
        if (f > 0.5) checkBadge(ctx, 536, y + 37, 14, (f - 0.5) * 2);
      });
      break;
    }
    case 5: { // CRM pipeline
      ctx.fillStyle = "#F7FAFE"; ctx.fillRect(0, 0, 600, 600);
      text(ctx, "Sales pipeline", 36, 64, { size: 30, weight: 800, family: F.head });
      ["New RFQ", "Quoted", "Won"].forEach((c, i) => {
        const x = 30 + i * 184;
        rr(ctx, x, 96, 170, 470, 18); ctx.fillStyle = "#EEF4FB"; ctx.fill();
        text(ctx, c, x + 18, 132, { size: 19, weight: 800, family: F.mono, color: i === 0 ? C.blue : C.sub });
      });
      const m = clamp((t * 0.8) % 1.6);
      const cx = lerp(42, 226, outExpo(clamp(m * 1.5 - 0.6)));
      ["apex", "riverside", "lakeside"].forEach((p, i) => {
        const x = i === 0 ? cx : 42 + (i === 2 ? 184 : 0), y = 156 + (i === 0 ? 0 : 140);
        rr(ctx, x, y, 146, 120, 14); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = i === 0 ? C.elec : C.line; ctx.lineWidth = 2; ctx.stroke();
        patch(ctx, p as any, x + 40, y + 46, 52, { shadow: 0.2 });
        rr(ctx, x + 76, y + 30, 54, 10, 5); ctx.fillStyle = "#DCE6F2"; ctx.fill();
        rr(ctx, x + 18, y + 88, 110, 10, 5); ctx.fillStyle = "#DCE6F2"; ctx.fill();
      });
      break;
    }
    case 6: { // WhatsApp follow-up
      ctx.fillStyle = "#ECE5DD"; ctx.fillRect(0, 0, 600, 600);
      ctx.fillStyle = "#075E54"; ctx.fillRect(0, 0, 600, 92);
      shield(ctx, 54, 46, 1.1);
      text(ctx, "Your Brand", 90, 44, { size: 26, weight: 800, color: "#fff" });
      text(ctx, "business account", 90, 72, { size: 17, weight: 500, color: "#CFE9E2" });
      const b = (y: number, w: number, s1: string, s2: string, me: boolean, a: number) => {
        if (a <= 0) return;
        ctx.save(); ctx.globalAlpha *= clamp(a * 2);
        const x = me ? 600 - 30 - w : 30;
        rr(ctx, x, y + (1 - outExpo(clamp(a))) * 20, w, 104, 18); ctx.fillStyle = me ? "#DCF8C6" : "#fff"; ctx.fill();
        text(ctx, s1, x + 22, y + 42, { size: 21, weight: 600, color: "#111" });
        text(ctx, s2, x + 22, y + 74, { size: 21, weight: 600, color: "#111" });
        ctx.restore();
      };
      b(130, 470, "Hi Daniel, thanks for your RFQ.", "500 iron-on patches, Dec 12.", true, clamp(t * 2));
      b(260, 470, "Your quote and digital proof", "are being prepared now.", true, clamp(t * 2 - 1));
      b(390, 360, "Perfect, thanks!", "Looking forward to it.", false, clamp(t * 2 - 2.2));
      text(ctx, "EXAMPLE MESSAGES", 564, 570, { size: 14, weight: 700, family: F.mono, ls: 2, color: "#6B7B74", align: "right" });
      break;
    }
    case 7: { // sales handoff
      cover(ctx, video("owner", 2 + t * 0.6), 0, 0, 600, 600, 0.62, 0.35, 1.25, [0, 0, 1280, 720]);
      ctx.fillStyle = "rgba(6,20,48,0.25)"; ctx.fillRect(0, 0, 600, 600);
      const a = clamp(t * 2);
      ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - outBack(a)) * 40);
      glass(ctx, 40, 400, 520, 150, { r: 22, shadow: 1 });
      patch(ctx, "apex", 110, 475, 90);
      text(ctx, "Qualified RFQ · Apex Apparel", 170, 460, { size: 22, weight: 800 });
      text(ctx, "Assigned to your sales team", 170, 494, { size: 19, weight: 600, color: C.sub });
      pill(ctx, 170, 512, "Ready for follow-up", 1, C.green, 14);
      ctx.restore();
      break;
    }
  }
  ctx.restore();
}
export { logo };
