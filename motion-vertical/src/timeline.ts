// Plate order and cut points, anchored to phrases in the aligned voiceover.
import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { cut, ws } from "./core/words";
import { drawHook } from "./scenes/01-hook";
import { drawSystem } from "./scenes/02-system";
import { drawDemo } from "./scenes/03-demo";
import { drawCRM } from "./scenes/04-crm";
import { drawUSP } from "./scenes/05-usp";
import { drawOffer } from "./scenes/06-offer";
import { drawCTA } from "./scenes/07-cta";

export function timeline(): Scene[] {
  const S: Omit<Scene, "end">[] = [
    { id: "hook", start: 0, draw: drawHook },
    { id: "system", start: cut("madvert", 0, 0.1), draw: drawSystem },
    { id: "demo", start: cut("we create", 0, 0.12), draw: drawDemo },
    { id: "crm", start: cut("then", 0, 0.12), draw: drawCRM },
    { id: "usp", start: cut("no ad", 0, 0.1), draw: drawUSP },
    { id: "offer", start: cut("you simply", 0, 0.15), draw: drawOffer },
    { id: "cta", start: ws("book") - 0.05, draw: drawCTA },
  ];
  return S.map((s, i) => ({ ...s, end: i < S.length - 1 ? S[i + 1].start : DURATION }));
}
