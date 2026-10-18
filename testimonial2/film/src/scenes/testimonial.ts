// Muhammad Azeem Qadir (CEO & Founder) × Madvert Labs — customer testimonial.
// The interview sits in the middle of a branded navy/electric-blue frame; subtitles, lower
// third, logo watermark, intro and end card are drawn live over the graded edit.
import { C, F, W, H, font } from "../core/brand";
import { background, text, rr, glow, cover, streak, icon } from "../core/draw";
import { clamp, ep, outExpo, outQuart, outBack, inOutCubic, inOutExpo, lerp, prog, rgba, noise } from "../core/ease";
import { img, video } from "../core/assets";
import { kline } from "../components/kinetic";
import { button } from "../components/ui";
import { ribbon } from "../components/ribbon";

// ---- edit decision list (source seconds) and the edited timeline (mirrors ../edl.json)
export const EDL: [number, number][] = [[46.72, 49.95], [0.85, 7.52], [8.44, 32.72], [34.92, 41.3], [46.3, 70.95], [72.92, 117.72]];
const OFF: number[] = []; { let a = 0; for (const [s, e] of EDL) { OFF.push(a); a += e - s; } }
export const EDIT_LEN = OFF[OFF.length - 1] + EDL[EDL.length - 1][1] - EDL[EDL.length - 1][0];
const segAt = (t: number) => { let k = 0; for (let i = 0; i < OFF.length; i++) if (t >= OFF[i]) k = i; return k; };
/** Source time → edited time for a cue inside segment `k` (or auto). */
const ed = (src: number, k?: number) => {
  const i = k ?? EDL.findIndex(([s, e]) => src >= s - 0.05 && src <= e + 0.05);
  return OFF[i] + clamp(src, EDL[i][0], EDL[i][1]) - EDL[i][0];
};

// ---- subtitles (English translation of the Urdu interview; [text, highlighted words, srcStart, srcEnd, segment, endSegment?])
type Cue = [string, string[], number, number, number, number?];
export const CUES: Cue[] = [
  ["From my side, it's 10 out of 10 for these people.", ["10 out of 10"], 46.72, 49.95, 0],
  ["Assalam-o-Alaikum friends, I'm Muhammad Azeem Qadir from MIM Planet.", [], 0.9, 3.3, 1],
  ["I'm the CEO and Founder of the company.", ["CEO", "Founder"], 3.6, 4.7, 1],
  ["I'm truly grateful to Usama bhai and Uzair bhai,", ["Usama bhai", "Uzair bhai"], 5.2, 7.52, 1],
  ["who gave us their services,", [], 8.44, 9.91, 2],
  ["and our marketing and lead generation process...", ["marketing", "lead generation"], 10.4, 12.77, 2],
  ["they delivered it far beyond our expectations.", ["beyond our expectations"], 13.1, 17.83, 2],
  ["The way they worked hard and understood our needs,", ["worked hard"], 18.27, 20.82, 2],
  ["understood our niche, optimized everything", ["niche", "optimized"], 21.24, 23.82, 2],
  ["and ran our marketing,", ["marketing"], 23.82, 25.14, 2],
  ["it honestly amazed us.", [], 25.6, 27.55, 2],
  ["And I'd recommend to everyone:", ["recommend"], 27.62, 29.74, 2],
  ["you should definitely give them a try.", ["give them a try"], 29.74, 31.7, 2],
  ["As far as things can go in our marketing,", [], 34.92, 38.7, 3],
  ["these people put in even more effort than that.", ["more effort"], 38.85, 41.25, 3],
  ["And from my side, it's 10 out of 10 for these people,", ["10 out of 10"], 46.33, 49.96, 4],
  ["for the amount of hard work they put in.", ["hard work"], 50.05, 51.6, 4],
  ["The way they get involved and understand your needs,", ["understand your needs"], 51.68, 54.6, 4],
  ["and stay with you through the whole process.", ["whole process"], 54.8, 56.6, 4],
  ["And the best part: there's no ticket system,", ["no ticket system"], 57.06, 59.44, 4],
  ["no 24-hour waiting.", ["24-hour"], 59.5, 60.8, 4],
  ["You message them on WhatsApp,", ["WhatsApp"], 60.85, 61.9, 4],
  ["and they're available, 24/7.", ["24/7"], 62.2, 64.1, 4],
  ["Those who aren't available will give you excuses:", [], 64.18, 65.56, 4],
  ["\"We're not available, we'll talk to you later.\"", [], 65.56, 67.9, 4],
  ["But these guys are extremely responsive,", ["extremely responsive"], 68.06, 69.55, 4],
  ["and they take your work on as their own responsibility.", ["responsibility"], 69.72, 75.5, 4, 5],
  ["The results you expect, they deliver far more than that,", ["far more"], 75.86, 79.1, 5],
  ["which isn't possible without hard work.", ["hard work"], 80.7, 82.4, 5],
  ["I've tried a lot of people in marketing,", [], 82.44, 84.85, 5],
  ["so I know that it's not like", [], 84.86, 89.4, 5],
  ["you run an ad on Facebook or Meta", ["Facebook", "Meta"], 89.42, 91.65, 5],
  ["and messages just start coming in.", [], 91.7, 93.25, 5],
  ["Actually, the leads we need", [], 93.7, 94.9, 5],
  ["are qualified leads.", ["qualified leads"], 94.92, 96.3, 5],
  ["Getting qualified leads, and the second thing", ["qualified leads"], 96.66, 99.1, 5],
  ["is the cost per lead,", ["cost per lead"], 99.5, 102.8, 5],
  ["they minimize it a lot and bring in qualified people.", ["minimize", "qualified people"], 103.2, 106.3, 5],
  ["So for me, it's been an amazing experience,", ["amazing experience"], 106.62, 109.45, 5],
  ["and it'll be good for you all too.", [], 109.52, 111.2, 5],
  ["That's it. Usama bhai, best of luck. Uzair, best of luck.", ["best of luck"], 111.75, 115.1, 5],
  ["May Allah grant you success. Thank you.", ["success"], 115.55, 117.72, 5],
];
export const CUES_ED = CUES.map(([s, hi, a, b, k, k2]) => ({ s, hi, a: ed(a, k), b: ed(b, k2 ?? k) }));

// ---- layout
const FR = { x: 70, y: 330, w: 940, h: 1175 }; // interview frame (4:5)
const END = EDIT_LEN - 0.4; // end card begins

export function drawTestimonial(ctx: any, t: number) {
  background(ctx, t, { grid: 0.45, glowA: 1.2 });
  const endP = ep(t, END, 0.9, inOutExpo);
  if (endP < 1) {
    ctx.save();
    ctx.globalAlpha = 1 - endP;
    ctx.translate(W / 2, FR.y + FR.h / 2); ctx.scale(1 - 0.08 * endP, 1 - 0.08 * endP); ctx.translate(-W / 2, -(FR.y + FR.h / 2));
    frame(ctx, t);
    header(ctx, t);
    lowerThird(ctx, t);
    subtitles(ctx, t);
    ctx.restore();
  }
  intro(ctx, t);
  if (t > END - 0.1) endCard(ctx, t);
  // light sweep on the hook → story cut
  const sw = prog(t, OFF[1] - 0.12, OFF[1] + 0.35);
  if (sw > 0 && sw < 1) streak(ctx, lerp(-150, W + 150, inOutCubic(sw)), 0.9, 0.2);
}

function frame(ctx: any, t: number) {
  const k = segAt(Math.min(t, EDIT_LEN - 0.01));
  const lt = t - OFF[k];
  const appear = ep(t, 0.15, 0.9, outExpo);
  // alternate framing per segment hides the jump cuts; slow push-in inside each segment
  const zoom = (k % 2 ? 1.0 : 1.07) + Math.min(lt, 30) * 0.0008;
  const s = lerp(0.9, 1, appear);
  ctx.save();
  ctx.globalAlpha *= appear;
  ctx.translate(W / 2, FR.y + FR.h / 2); ctx.scale(s, s); ctx.translate(-W / 2, -(FR.y + FR.h / 2));
  // glow + gradient border
  glow(ctx, W / 2, FR.y + FR.h * 0.55, 760, C.elec, 0.18);
  ctx.save();
  ctx.shadowColor = "rgba(0,120,255,0.35)"; ctx.shadowBlur = 60;
  rr(ctx, FR.x - 3, FR.y - 3, FR.w + 6, FR.h + 6, 40);
  const g = ctx.createLinearGradient(FR.x, FR.y, FR.x + FR.w, FR.y + FR.h); g.addColorStop(0, C.elec); g.addColorStop(0.5, "rgba(0,180,255,0.25)"); g.addColorStop(1, C.cyan);
  ctx.fillStyle = g; ctx.fill();
  ctx.restore();
  ctx.save();
  rr(ctx, FR.x, FR.y, FR.w, FR.h, 37); ctx.clip();
  cover(ctx, video("edit", Math.min(t, EDIT_LEN - 0.04)), FR.x, FR.y, FR.w, FR.h, 0.5, 0.3, zoom);
  // brand gradient treatment: navy rising from the bottom, faint blue light in the top corners
  const b = ctx.createLinearGradient(0, FR.y + FR.h * 0.6, 0, FR.y + FR.h);
  b.addColorStop(0, "rgba(10,15,28,0)"); b.addColorStop(1, "rgba(10,15,28,0.78)");
  ctx.fillStyle = b; ctx.fillRect(FR.x, FR.y, FR.w, FR.h);
  glow(ctx, FR.x + 40, FR.y + 40, 380, C.elec, 0.10 + 0.03 * noise(t * 0.3));
  glow(ctx, FR.x + FR.w - 40, FR.y + 60, 340, C.cyan, 0.07 + 0.03 * noise(t * 0.25 + 4));
  const e = ctx.createLinearGradient(FR.x, 0, FR.x + FR.w, 0);
  e.addColorStop(0, rgba(C.elec, 0.0)); e.addColorStop(0.5, rgba(C.elec, 0.55)); e.addColorStop(1, rgba(C.cyan, 0.0));
  ctx.fillStyle = e; ctx.fillRect(FR.x, FR.y + FR.h - 5, FR.w, 5);
  ctx.restore();
  ctx.restore();
}

/** Small A-mark watermark that spins gently every ~12 s, plus the wordmark and label. */
function header(ctx: any, t: number) {
  const a = ep(t, 1.25, 0.6, outQuart);
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  const ic = img("icon");
  const period = 12, ph = ((t - 6) % period + period) % period;
  const spin = ph < 1.0 ? inOutCubic(ph / 1.0) * Math.PI * 2 : 0;
  const sx = Math.max(0.06, Math.abs(Math.cos(spin)));
  if (ic) {
    ctx.save(); ctx.translate(132, 200); ctx.scale(sx, 1);
    glow(ctx, 0, 0, 110, C.cyan, 0.25);
    ctx.beginPath(); ctx.roundRect(-46, -46, 92, 92, 22); ctx.clip(); ctx.drawImage(ic, -46, -46, 92, 92);
    ctx.restore();
  }
  const lg = img("logoDark");
  if (lg) { const w = 300, h = lg.height * w / lg.width; ctx.drawImage(lg, 200, 200 - h / 2, w, h); }
  // right: label pill
  ctx.font = `700 22px ${F.mono}`; ctx.letterSpacing = "4px";
  const label = "CUSTOMER STORY", tw = ctx.measureText(label).width;
  rr(ctx, 1010 - tw - 56, 174, tw + 56, 52, 26); ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.fill();
  ctx.strokeStyle = rgba(C.cyan, 0.5); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(1010 - tw - 34, 200, 6, 0, 7); ctx.fillStyle = C.cyan; ctx.fill();
  ctx.fillStyle = "#F4FBFC"; ctx.fillText(label, 1010 - tw - 20, 208);
  ctx.restore();
}

function lowerThird(ctx: any, t: number) {
  const t0 = OFF[1] + 0.9, t1 = t0 + 6.5;
  const a = ep(t, t0, 0.55, outExpo) * (1 - ep(t, t1, 0.5, inOutCubic));
  if (a <= 0) return;
  const x = FR.x + 40, y = FR.y + FR.h - 230, w = 720, h = 156;
  ctx.save();
  ctx.globalAlpha *= clamp(a * 1.4);
  ctx.translate((1 - a) * -60, 0);
  ctx.shadowColor = "rgba(0,0,0,0.4)"; ctx.shadowBlur = 40;
  rr(ctx, x, y, w, h, 24); ctx.fillStyle = "rgba(10,15,28,0.72)"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 1.2; ctx.stroke();
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, C.elec); g.addColorStop(1, C.cyan);
  rr(ctx, x + 22, y + 26, 6, h - 52, 3); ctx.fillStyle = g; ctx.fill();
  glow(ctx, x + 25, y + h / 2, 90, C.cyan, 0.3);
  // mask-revealed text
  const r1 = ep(t, t0 + 0.2, 0.5, outExpo), r2 = ep(t, t0 + 0.45, 0.5, outExpo);
  ctx.save(); ctx.beginPath(); ctx.rect(x + 40, y, (w - 40) * r1, h); ctx.clip();
  text(ctx, "Muhammad Azeem Qadir", x + 52, y + 72, { size: 44, weight: 800, family: F.head, color: "#F4FBFC" });
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(x + 40, y, (w - 40) * r2, h); ctx.clip();
  text(ctx, "CEO & FOUNDER", x + 54, y + 118, { size: 22, weight: 700, family: F.mono, ls: 4, color: C.cyan });
  ctx.restore();
  ctx.restore();
}

function subtitles(ctx: any, t: number) {
  const c = CUES_ED.find((q) => t >= q.a - 0.05 && t < q.b + 0.25);
  if (!c) return;
  const isHook = c.a < OFF[1];
  const size = isHook ? 52 : 44;
  const pin = ep(t, c.a - 0.05, 0.28, outQuart), pout = 1 - ep(t, c.b + 0.05, 0.2);
  const a = Math.min(pin, pout);
  if (a <= 0) return;
  ctx.save();
  ctx.font = font(isHook ? 800 : 600, size, isHook ? F.head : F.body); ctx.letterSpacing = "0px";
  // tokenise, mark highlighted words
  const nb = (x: string) => x.replace(/Madvert Labs/g, "Madvert\u00a0Labs");
  const words = nb(c.s).split(" ");
  const hiSet = new Set<number>();
  for (const h of c.hi) {
    const hw = nb(h).split(" ");
    for (let i = 0; i + hw.length <= words.length; i++) {
      if (hw.every((x, j) => words[i + j].replace(/[.,:]/g, "").toLowerCase() === x.toLowerCase())) for (let j = 0; j < hw.length; j++) hiSet.add(i + j);
    }
  }
  const space = ctx.measureText(" ").width, ww = words.map((x) => ctx.measureText(x).width);
  const maxW = 900, lines: number[][] = [[]];
  let lw = 0;
  words.forEach((x, i) => { if (lw + ww[i] > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push(i); lw += ww[i] + space; });
  const lineH = size * 1.32, widths = lines.map((L) => L.reduce((s, i) => s + ww[i], 0) + space * (L.length - 1));
  const boxW = Math.max(...widths) + 64, boxH = lineH * lines.length + 34;
  const cy = isHook ? 1650 : 1680;
  const bx = W / 2 - boxW / 2, by = cy - boxH / 2 + (1 - pin) * 8;
  ctx.globalAlpha = a;
  ctx.shadowColor = "rgba(0,0,0,0.45)"; ctx.shadowBlur = 30;
  rr(ctx, bx, by, boxW, boxH, 22); ctx.fillStyle = "rgba(10,15,28,0.62)"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(0,229,255,0.18)"; ctx.lineWidth = 1.2; ctx.stroke();
  // phrase reveal: each word settles in with a short stagger
  let n = 0;
  lines.forEach((L, li) => {
    let x = W / 2 - widths[li] / 2;
    const y = by + 17 + lineH * (li + 1) - size * 0.32;
    for (const i of L) {
      const wa = ep(t, c.a - 0.05 + n * 0.035, 0.22, outQuart); n++;
      ctx.save(); ctx.globalAlpha = a * wa;
      if (hiSet.has(i)) { const g = ctx.createLinearGradient(x, 0, x + ww[i], 0); g.addColorStop(0, C.elec); g.addColorStop(1, C.cyan); ctx.fillStyle = g; }
      else ctx.fillStyle = "#F4FBFC";
      ctx.fillText(words[i], x, y + (1 - wa) * 6);
      ctx.restore();
      x += ww[i] + space;
    }
  });
  ctx.restore();
}

/** Opening: the logo rolls in at centre, CUSTOMER TESTIMONIAL + client, then docks into the header. */
function intro(ctx: any, t: number) {
  if (t > 2.4) return;
  const out = ep(t, 1.35, 0.55, inOutExpo);
  const a = 1 - out;
  ctx.save();
  // dark veil over the frame while the logo performs
  ctx.fillStyle = `rgba(6,12,26,${0.82 * a})`; ctx.fillRect(0, 0, W, H);
  const roll = ep(t, 0.0, 0.9, outQuart);
  const ang = (1 - roll) * Math.PI * 1.5; // rolls in around its vertical axis
  const lg = img("logoDark");
  if (lg) {
    const w0 = 760, h0 = lg.height * w0 / lg.width;
    const cx = lerp(W / 2, 350, out), cy = lerp(780, 200, out), sc = lerp(1, 300 / 760, out);
    ctx.save(); ctx.globalAlpha = clamp(roll * 2) * (out > 0.95 ? 0 : 1);
    ctx.translate(cx, cy); ctx.scale(sc * Math.max(0.05, Math.abs(Math.cos(ang))), sc);
    ctx.drawImage(lg, -w0 / 2, -h0 / 2, w0, h0);
    ctx.restore();
    if (roll < 1) streak(ctx, lerp(-100, W + 100, roll), 0.6 * (1 - roll), 0.1);
  }
  ctx.globalAlpha = a;
  kline(ctx, t, { x: W / 2, y: 960, size: 70, align: "center", ls: 4, words: [{ s: "CUSTOMER", t: 0.45, anim: "rise" }, { s: "TESTIMONIAL", t: 0.55, anim: "rise", grad: true }] });
  const ca = ep(t, 0.8, 0.4);
  text(ctx, "Muhammad Azeem Qadir  ·  CEO & Founder", W / 2, 1040, { size: 32, weight: 600, color: "#CFE9FF", align: "center", alpha: ca });
  ctx.restore();
}

function endCard(ctx: any, t: number) {
  const t0 = END + 0.55;
  const a = ep(t, END + 0.2, 0.6);
  ctx.save(); ctx.globalAlpha = a;
  glow(ctx, W / 2, 760, 800, C.elec, 0.22);
  // centre logo: rolls in, then rolls once more at the end
  const lg = img("logoDark");
  if (lg) {
    const r = ep(t, t0, 0.9, outQuart), r2 = ep(t, t0 + 4.4, 0.9, inOutCubic);
    const ang = (1 - r) * Math.PI * 1.5 + r2 * Math.PI * 2;
    const w0 = 720, h0 = lg.height * w0 / lg.width;
    ctx.save(); ctx.translate(W / 2, 560); ctx.scale(Math.max(0.05, Math.abs(Math.cos(ang))), 1);
    ctx.globalAlpha *= clamp(r * 2);
    ctx.drawImage(lg, -w0 / 2, -h0 / 2, w0, h0);
    ctx.restore();
  }
  kline(ctx, t, { x: W / 2, y: 830, size: 60, align: "center", words: [{ s: "REAL", t: t0 + 0.5 }, { s: "STORIES.", t: t0 + 0.6 }, { s: "REAL", t: t0 + 0.85, grad: true }, { s: "GROWTH.", t: t0 + 0.95, grad: true }] });
  text(ctx, "Ready to Grow Your Business?", W / 2, 940, { size: 42, weight: 700, color: "#F4FBFC", align: "center", alpha: ep(t, t0 + 1.4, 0.5) });
  const ba = ep(t, t0 + 1.8, 0.6, outBack);
  if (ba > 0) {
    const breathe = 0.5 + 0.5 * Math.sin((t - t0) * 3);
    ctx.save(); ctx.globalAlpha *= clamp(ba * 2);
    glow(ctx, W / 2, 1080, 520, C.cyan, 0.15 + 0.1 * breathe);
    const bw = 820 * lerp(0.85, 1, ba);
    button(ctx, W / 2 - bw / 2, 1020, bw, 120, "Book Your Discovery Call Now", { size: 42, hover: 0.5 + 0.5 * breathe });
    ctx.restore();
  }
  const ta = ep(t, t0 + 2.4, 0.6);
  text(ctx, "MADVERT LABS", W / 2, 1290, { size: 30, weight: 800, family: F.head, ls: 8, color: "#F4FBFC", align: "center", alpha: ta });
  text(ctx, "Beyond Advertising. We Build Growth Systems.", W / 2, 1345, { size: 30, weight: 500, color: "#CFE9FF", align: "center", alpha: ta });
  ribbon(ctx, [[200, 1420], [W / 2, 1400], [W - 200, 1420]], { to: ep(t, t0 + 2.6, 0.8, inOutCubic), width: 4, flow: t, speed: 0.4 });
  text(ctx, "www.madvertlabs.com", W / 2, 1500, { size: 36, weight: 700, color: C.cyan, align: "center", alpha: ep(t, t0 + 2.9, 0.5) });
  ctx.restore();
}
