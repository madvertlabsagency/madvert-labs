// Plate order and cut points, anchored to phrases in the aligned (Roman Urdu) voiceover.
import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { cut } from "./core/words";
import { drawProblem } from "./scenes/01-problem";
import { drawSystem } from "./scenes/02-system";
import { drawBrand } from "./scenes/03-brand";
import { drawForm } from "./scenes/04-form";
import { drawContrast } from "./scenes/05-contrast";
import { drawAdSpend } from "./scenes/06-adspend";
import { drawPay } from "./scenes/07-pay";
import { drawGate } from "./scenes/08-gate";
import { drawGeneric, drawJourney } from "./scenes/09-journey";
import { drawBackend } from "./scenes/10-backend";
import { drawCTA } from "./scenes/11-cta";

export function timeline(): Scene[] {
  const S: Omit<Scene, "end">[] = [
    { id: "problem", start: 0, chapter: 0, draw: drawProblem },
    { id: "system", start: cut("isi lye"), chapter: 1, in: { type: "push", dur: 0.5 }, draw: drawSystem },
    { id: "brand", start: cut("buyer", 1), chapter: 2, in: { type: "swipe", dur: 0.55 }, draw: drawBrand },
    { id: "form", start: cut("wahan"), chapter: 3, in: { type: "zoom", dur: 0.5 }, draw: drawForm },
    { id: "contrast", start: cut("matlab"), chapter: 3, in: { type: "wipeUp", dur: 0.5 }, draw: drawContrast },
    { id: "adspend", start: cut("secondly", 0, 0.3), chapter: 4, in: { type: "fade", dur: 0.6 }, draw: drawAdSpend },
    { id: "pay", start: cut("aapka"), chapter: 4, in: { type: "push", dur: 0.5 }, draw: drawPay },
    { id: "gate", start: cut("yani"), chapter: 5, in: { type: "swipe", dur: 0.5 }, draw: drawGate },
    { id: "generic", start: cut("aur ye system"), chapter: 6, in: { type: "flash", dur: 0.25 }, draw: drawGeneric },
    { id: "journey", start: cut("campaign"), chapter: 6, in: { type: "zoom", dur: 0.45 }, draw: drawJourney },
    { id: "backend", start: cut("madvert", 1), chapter: 7, in: { type: "push", dur: 0.5 }, draw: drawBackend },
    { id: "cta", start: cut("agar"), chapter: -1, in: { type: "fade", dur: 0.6 }, draw: drawCTA },
  ];
  return S.map((s, i) => ({ ...s, end: i < S.length - 1 ? S[i + 1].start : DURATION }));
}
