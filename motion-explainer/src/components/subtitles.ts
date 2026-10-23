// Subtitle layer driven by the word timings. Sentence case, max two lines, one highlight.
import { C, F, W, font } from "../core/brand";
import { allWords } from "../core/words";
import { clamp, outCubic, rgba } from "../core/ease";
import { rr } from "../core/draw";
import type { Ctx } from "../core/draw";

// [caption text, highlighted phrase] — Roman Urdu, consumed in order, must reproduce the VO word for word
const CHUNKS: [string, string][] = [
  ["Aksar custom patch businesses ka masla", "custom patch"],
  ["ye nahi hota ke inquiries nahi aa rahi hotin.", ""],
  ["Masla ye hota hai ke inquiries random hoti hain,", "random"],
  ["serious buyer ka pata nahi chalta,", "serious buyer"],
  ["aur sales team ka time waste hota hai.", "time waste"],
  ["Isi lye Madvert Labs me ham aapke liye", ""],
  ["ek complete customer acquisition system build karte hain.", "complete customer acquisition system"],
  ["Buyer aapke brand ke naam aur aapke brand ke page se ad dekhta hai,", "aapke brand"],
  ["phir apke branded landing page per ata he.", "branded landing page"],
  ["Wahan hum usse wo information collect karte hain", ""],
  ["jo aapki team ko actual quotation dene ke liye chahiye.", "actual quotation"],
  ["Jaise patch type, quantity, size, backing,", ""],
  ["deadline, artwork aur business details.", ""],
  ["Matlab aapko sirf \"I need patches\" wala message nahi milta.", "\"I need patches\""],
  ["Jo k sb ka msla he, balke aapko proper requirement milti hai.", "proper requirement"],
  ["Secondly, is model mein apko ad spend ki fikar karne ki zrurat nahi he,", "ad spend"],
  ["kyunke ad spend hum khud invest karte hain.", "hum khud invest"],
  ["Aapka focus sirf qualified RFQs par hota hai,", "qualified RFQs"],
  ["aur agreed model ke mutabiq aap per qualified RFQ pay karte hain.", "per qualified RFQ"],
  ["Yani aap us opportunity ke liye pay kar rahe hain", "opportunity"],
  ["jo defined qualification criteria ke mutabiq", "defined qualification criteria"],
  ["aapke sales team tak pohanchti hai.", "sales team"],
  ["Aur ye system generic nahi hota.", "generic nahi"],
  ["Campaign aapke brand ke naam se chalta hai,", "aapke brand"],
  ["landing page aapke brand ke liye build hota hai,", ""],
  ["aur buyer ko poora experience aapke business ka hi nazar aata hai.", "aapke business"],
  ["Madvert Labs backend mein creatives, campaigns,", "backend"],
  ["landing pages, qualification systems,", ""],
  ["CRM workflows aur follow-up infrastructure manage karta hai", ""],
  ["taa ke marketing aur sales ek connected system ki tarah kaam karein.", "connected system"],
  ["Agar aap dekhna chahte hain ke ye system", ""],
  ["aapke custom patch business ke liye kaise implement ho sakta hai,", "custom patch business"],
  ["to is video ke baad call book karein.", "call book karein."],
  ["Thanks, talk soon!", ""],
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

const Y = 1790;

export type SubMode = "dark" | "subtle" | "hide";
export function subtitles(ctx: Ctx, t: number, theme: SubMode = "dark") {
  if (theme === "hide") return;
  const subtle = theme === "subtle";
  const SIZE = subtle ? 34 : 40;
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
  const maxW = 900;
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
  const dark = false;
  ctx.shadowColor = dark ? "rgba(0,0,0,0.3)" : "rgba(20,60,120,0.12)";
  ctx.shadowBlur = 24; ctx.shadowOffsetY = 6;
  rr(ctx, bx, by, boxW, boxH, 16);
  ctx.fillStyle = subtle ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.88)";
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
      ctx.fillStyle = hi ? C.blue : subtle ? "rgba(10,15,28,0.78)" : C.navy;
      ctx.fillText(words[i], x, y);
      x += ww[i] + space;
    }
  });
  ctx.restore();
}

export function resetSubtitles() { CUES = null; }
export { rgba };
