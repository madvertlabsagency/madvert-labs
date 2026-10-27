// Reel 01 plate order; every cut is anchored to a phrase in the voiceover.
import type { Scene } from "./core/scene";
import { DURATION } from "./core/brand";
import { cut } from "./core/words";
import { drawHook, drawSystem, drawIslands, drawReveal, drawTagline, drawEnd } from "./scenes/reel01";

export function timeline(): Scene[] {
  const S: Omit<Scene, "end">[] = [
    { id: "hook", start: 0, draw: drawHook },
    { id: "system", start: cut("it needs"), in: { type: "cut", dur: 0 }, draw: drawSystem },
    { id: "islands", start: cut("right"), in: { type: "zoom", dur: 0.4 }, draw: drawIslands },
    { id: "reveal", start: cut("at madvert"), in: { type: "flash", dur: 0.2 }, draw: drawReveal },
    { id: "tagline", start: cut("beyond"), in: { type: "push", dur: 0.45 }, draw: drawTagline },
    { id: "end", start: cut("follow"), in: { type: "fade", dur: 0.4 }, draw: drawEnd },
  ];
  return S.map((s, i) => ({ ...s, end: i < S.length - 1 ? S[i + 1].start : DURATION }));
}
