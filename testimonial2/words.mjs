// Word-level Whisper pass over windows split at natural pauses.
// node words.mjs "[[s,e],...]" [out.json]   env: AUD=edit16.f32 (default audio16.f32), TASK=translate
import { pipeline, env } from "@huggingface/transformers";
import fs from "node:fs";
env.localModelPath = "/home/user/madvert-labs/testimonial/node_modules/sts-whisper-small/models/";
env.allowRemoteModels = false;
const asr = await pipeline("automatic-speech-recognition", "Xenova/whisper-small", { dtype: "q8" });
const buf = fs.readFileSync(process.env.AUD||"audio16.f32");
const all = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
const W = JSON.parse(process.argv[2]);
const res = [];
for (const [s, e] of W) {
  const seg = all.slice(Math.round(s * 16000), Math.round(e * 16000));
  const out = await asr(seg, { language: "urdu", task: process.env.TASK||"transcribe", return_timestamps: "word", no_repeat_ngram_size: 3 });
  for (const c of out.chunks) res.push({ w: c.text.trim(), s: +(s + c.timestamp[0]).toFixed(2), e: +(s + (c.timestamp[1] ?? c.timestamp[0] + 0.3)).toFixed(2) });
  console.log(`[${s}-${e}]`, out.text);
}
fs.writeFileSync(process.argv[3]||"words.json", JSON.stringify(res));
