// Subtitle layer driven by the word timings. Sentence case, max two lines, one highlight.
import { C, F, W, font } from "../core/brand";
import { allWords } from "../core/words";
import { clamp, outCubic, rgba } from "../core/ease";
import { rr } from "../core/draw";
import type { Ctx } from "../core/draw";

// [caption text, highlighted phrase]
// [caption text, highlighted phrase] — consumed in order, must reproduce the VO word for word
const CHUNKS: [string, string][] = [
  ["If you run a custom patch or embroidery business", "custom patch"],
  ["and have the capacity to produce more orders,", "capacity"],
  ["but customer acquisition is still inconsistent,", "customer acquisition"],
  ["that's the real problem.", "real problem."],
  ["You might be relying on outreach,", "outreach,"],
  ["which means more staff, more follow-up,", ""],
  ["more salaries, and more management.", ""],
  ["Or you're running ads", ""],
  ["which brings expensive leads", "expensive leads"],
  ["and too many window shoppers.", "window shoppers."],
  ["Madvert Labs fixes that!", "fixes that!"],
  ["We create high-engaging ads", "high-engaging ads"],
  ["designed to attract the right buyers.", "right buyers."],
  ["Those buyers land on your branded quotation funnel,", "branded quotation funnel,"],
  ["where they fill in exactly what YOU need:", "YOU"],
  ["patch type, quantity, size, backing,", ""],
  ["deadline, contact details", ""],
  ["and even upload their artwork.", "upload their artwork."],
  ["From there, our CRM and automations", "CRM"],
  ["capture the full Request for Quotation", "Request for Quotation"],
  ["and send it directly to YOU!", "directly to YOU!"],
  ["So your team spends its time only on people", ""],
  ["who have already shown real buying intent.", "real buying intent."],
  ["You get the project details, deadline,", ""],
  ["contact information, and artwork", ""],
  ["before the conversation even starts.", "before the conversation"],
  ["That's the Madvert Labs Patches Partnership.", "Patches Partnership."],
  ["We handle the acquisition system.", "acquisition system."],
  ["And the best part is, you don't need to worry", "best part"],
  ["about ad spend, creatives, funnels, CRM,", ""],
  ["or automations separately.", "separately."],
  ["Everything is built into one simple model.", "one simple model."],
  ["You simply pay per qualified RFQ.", "pay per qualified RFQ."],
  ["So instead of paying for marketing activity,", "marketing activity,"],
  ["you're paying for real potential orders.", "real potential orders."],
  ["If you're serious about scaling", "scaling"],
  ["your custom patch or embroidery business", ""],
  ["and want a consistent flow of qualified RFQs...", "qualified RFQs..."],
  ["book a discovery call with Madvert Labs today.", "book a discovery call"],
];

type Cue = { text: string; hi: string; s: number; e: number };
let CUES: Cue[] | null = null;

function build(): Cue[] {
  const words = allWords();
  const out: Cue[] = [];
  let k = 0;
  for (const [txt, hi] of CHUNKS) {
    const n = txt.split(/\s+/).length;
    const ws = words.slice(k, k + n);
    k += n;
    out.push({ text: txt, hi, s: ws[0].s - 0.08, e: ws[ws.length - 1].e + 0.45 });
  }
  for (let i = 0; i < out.length - 1; i++) out[i].e = Math.min(out[i].e, out[i + 1].s - 0.02);
  return out;
}

const Y = 1010;

export type SubMode = "dark" | "subtle" | "hide";
export function subtitles(ctx: Ctx, t: number, theme: SubMode = "dark") {
  if (theme === "hide") return;
  const subtle = theme === "subtle";
  const SIZE = subtle ? 27 : 32;
  CUES ??= build();
  const c = CUES.find((q) => t >= q.s && t < q.e);
  if (!c) return;
  const pin = outCubic(clamp((t - c.s) / 0.22));
  const pout = clamp((c.e - t) / 0.14);
  const a = Math.min(pin, pout);
  const dy = (1 - pin) * 7;

  ctx.save();
  ctx.font = font(600, SIZE, F.body);
  ctx.letterSpacing = "0px";
  // split into words, mark highlight range
  const words = c.text.split(" ");
  const hiWords = c.hi ? c.hi.split(" ") : [];
  let hiStart = -1;
  for (let i = 0; i + hiWords.length <= words.length && hiWords.length; i++) {
    if (hiWords.every((h, k) => words[i + k] === h)) { hiStart = i; break; }
  }
  const space = ctx.measureText(" ").width;
  const ww = words.map((w) => ctx.measureText(w).width);
  // wrap to max two lines
  const maxW = 1240;
  const linesIdx: number[][] = [[]];
  let lw = 0;
  words.forEach((w, i) => {
    const add = ww[i] + (linesIdx[linesIdx.length - 1].length ? space : 0);
    if (lw + add > maxW && linesIdx.length < 2) { linesIdx.push([]); lw = 0; }
    linesIdx[linesIdx.length - 1].push(i);
    lw += ww[i] + space;
  });
  const lineH = SIZE * 1.3;
  const widths = linesIdx.map((L) => L.reduce((s, i) => s + ww[i], 0) + space * (L.length - 1));
  const boxW = Math.max(...widths) + 56, boxH = lineH * linesIdx.length + 22;
  const bx = W / 2 - boxW / 2, by = Y - boxH + 14 + dy;
  ctx.globalAlpha = a;
  const dark = true;
  ctx.shadowColor = dark ? "rgba(0,0,0,0.3)" : "rgba(20,60,120,0.12)";
  ctx.shadowBlur = 24; ctx.shadowOffsetY = 6;
  rr(ctx, bx, by, boxW, boxH, 16);
  ctx.fillStyle = subtle ? "rgba(6,10,18,0.45)" : "rgba(6,10,18,0.72)";
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = 1;
  ctx.strokeStyle = dark ? "rgba(255,255,255,0.12)" : "rgba(160,190,225,0.5)";
  ctx.stroke();
  linesIdx.forEach((L, li) => {
    let x = W / 2 - widths[li] / 2;
    const y = by + 11 + lineH * (li + 1) - SIZE * 0.36;
    for (const i of L) {
      const hi = hiStart >= 0 && i >= hiStart && i < hiStart + hiWords.length;
      ctx.fillStyle = hi ? C.cyan : subtle ? "rgba(235,242,255,0.82)" : "#fff";
      ctx.fillText(words[i], x, y);
      x += ww[i] + space;
    }
  });
  ctx.restore();
}

export function resetSubtitles() { CUES = null; }
export { rgba };
