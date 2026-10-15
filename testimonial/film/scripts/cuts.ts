// Prints plate start/end times (for review and the sound cue sheet).
import { setWords } from "../src/core/words";
import { timeline } from "../src/timeline";
setWords(await Bun.file(new URL("../data/words.json", import.meta.url)).json());
for (const s of timeline()) console.log(s.id.padEnd(10), s.start.toFixed(2), "→", s.end.toFixed(2), s.in?.type ?? "");
