// Plate order and cut points, anchored to phrases in the aligned voiceover.
import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { cut } from "./core/words";
import { drawHook, drawOffer, drawFounder, drawMarkets, drawScale } from "./scenes/a-open";
import { drawCaps, drawLeadGen, drawProof, drawPrivate } from "./scenes/b-proof";
import { drawModel, drawFocus, drawCTA } from "./scenes/c-close";

export function timeline(): Scene[] {
  const S: Omit<Scene, "end">[] = [
    { id: "hook", start: 0, draw: drawHook },
    { id: "offer", start: cut("i'm offering"), in: { type: "push", dur: 0.5 }, draw: drawOffer },
    { id: "founder", start: cut("i'll keep"), in: { type: "flash", dur: 0.2 }, draw: drawFounder },
    { id: "markets", start: cut("and alhamdulillah"), in: { type: "swipe", dur: 0.5 }, draw: drawMarkets },
    { id: "scale", start: cut("we've managed"), in: { type: "zoom", dur: 0.45 }, draw: drawScale },
    { id: "caps", start: cut("ads"), in: { type: "wipeUp", dur: 0.45 }, draw: drawCaps },
    { id: "leadgen", start: cut("lead generation", 1), in: { type: "push", dur: 0.5 }, draw: drawLeadGen },
    { id: "proof", start: cut("and if you want"), in: { type: "swipe", dur: 0.5 }, draw: drawProof },
    { id: "private", start: cut("and honestly"), in: { type: "fade", dur: 0.5 }, draw: drawPrivate },
    { id: "model", start: cut("if you want to sell"), in: { type: "push", dur: 0.6 }, draw: drawModel },
    { id: "focus", start: cut("you focus"), in: { type: "wipeUp", dur: 0.45 }, draw: drawFocus },
    { id: "cta", start: cut("if that"), in: { type: "fade", dur: 0.6 }, draw: drawCTA },
  ];
  return S.map((s, i) => ({ ...s, end: i < S.length - 1 ? S[i + 1].start : DURATION }));
}
