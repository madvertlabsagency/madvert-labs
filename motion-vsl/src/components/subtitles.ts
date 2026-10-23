// Subtitle layer driven by the word timings. Sentence case, max two lines, one highlight.
import { C, F, W, font } from "../core/brand";
import { allWords } from "../core/words";
import { clamp, outCubic, rgba } from "../core/ease";
import { rr } from "../core/draw";
import type { Ctx } from "../core/draw";

// [caption text, highlighted phrase] — consumed in order, must reproduce the VO word for word
const CHUNKS: [string, string][] = [
  ["If you run an agency and you're good", ""],
  ["at getting clients,", ""],
  ["but delivery is becoming the headache?", ""],
  ["This is probably for you.", ""],
  ["I'll offer you something that is both valuable", ""],
  ["to you and myself.", ""],
  ["I'm offering you to white label my services,", "white label"],
  ["meaning all of our services,", ""],
  ["portfolio, is going to be yours,", "yours,"],
  ["and you'll outsource the work to my team.", "my team."],
  ["I'll keep it straight.", ""],
  ["I've been doing digital marketing,", ""],
  ["lead generation, and growth systems for over five years.", "five years"],
  ["And Alhamdulillah, we've worked across the U.S.,", "U.S.,"],
  ["Dubai, Pakistan, and different service-based industries.", ""],
  ["We've managed accounts spending up to around $30,000", "$30,000"],
  ["a month, and we handle everything end-to-end ourselves.", "end-to-end"],
  ["Ads, funnels, landing pages,", ""],
  ["analytics, tracking, CRM,", ""],
  ["automations, creatives, follow-up systems.", ""],
  ["All of it.", ""],
  ["Lead generation is one of our strongest areas.", "Lead generation"],
  ["We don't just run a campaign and hope", ""],
  ["it works.", ""],
  ["We build the whole system around the client.", "whole system"],
  ["So in most cases,", ""],
  ["we're not constantly needing to launch random new", ""],
  ["campaigns just to fix bad foundations.", ""],
  ["And if you want proof,", "proof,"],
  ["I can literally jump on a call,", ""],
  ["share my screen,", ""],
  ["open the dashboards and walk you through the", "dashboards"],
  ["actual work.", ""],
  ["You can also go to Madvert Labs and", ""],
  ["check the case studies.", "case studies."],
  ["Those are projects we've actually worked on ourselves.", ""],
  ["And honestly, a lot of our work isn't", ""],
  ["even public because some clients didn't allow us", ""],
  ["to share it.", ""],
  ["I also teach this stuff,", "teach"],
  ["so this is not something we're figuring out", ""],
  ["as we go.", ""],
  ["If you want to sell under your agency", ""],
  ["name, keep your client relationship,", "client relationship,"],
  ["and have us handle the back-end delivery,", "back-end delivery,"],
  ["white label, we can do that.", "white label"],
  ["You focus on getting and retaining clients.", ""],
  ["We handle the execution.", "execution."],
  ["If that sounds useful,", ""],
  ["book a call below.", "book a call"],
  ["I'll show you exactly how we work,", ""],
  ["what we can handle,", ""],
  ["and whether it makes sense for us to partner.", ""],
  ["Bismillah.", ""],
  ["Let's scale!", "Let's scale!"],
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
  ctx.fillStyle = "rgba(6,18,42,0.86)";
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0,229,255,0.22)";
  ctx.stroke();
  linesIdx.forEach((L, li) => {
    let x = W / 2 - widths[li] / 2;
    const y = by + 11 + lineH * (li + 1) - SIZE * 0.36;
    for (const i of L) {
      const hi = hiStart >= 0 && i >= hiStart && i < hiStart + hiWords.length;
      ctx.fillStyle = hi ? C.cyan : "#F4FBFC";
      ctx.fillText(words[i], x, y);
      x += ww[i] + space;
    }
  });
  ctx.restore();
}

export function resetSubtitles() { CUES = null; }
export { rgba };
