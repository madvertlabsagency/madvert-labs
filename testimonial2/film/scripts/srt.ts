// Writes out/Azeem-Qadir-Testimonial.srt from the cue list (edited timeline).
import { CUES_ED } from "../src/scenes/testimonial";
const ts = (x: number) => { const ms = Math.round(x * 1000); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; };
const out = CUES_ED.map((c, i) => `${i + 1}\n${ts(c.a)} --> ${ts(Math.min(c.b + 0.2, CUES_ED[i + 1]?.a ?? 1e9))}\n${c.s}\n`).join("\n");
await Bun.write(new URL("../out/Azeem-Qadir-Testimonial.srt", import.meta.url), out);
console.log(CUES_ED.length, "cues");
