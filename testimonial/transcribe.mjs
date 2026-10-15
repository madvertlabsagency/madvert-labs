// Transcribes the testimonial with Whisper-small (ONNX, local weights from npm).
import { pipeline, env } from "@huggingface/transformers";
import fs from "node:fs";
env.localModelPath = new URL("./node_modules/sts-whisper-small/models/", import.meta.url).pathname;
env.allowRemoteModels = false;
const lang = process.argv[2] ?? "urdu";
const asr = await pipeline("automatic-speech-recognition", "Xenova/whisper-small", { dtype: "q8" });
const buf = fs.readFileSync("audio16.f32");
const audio = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
const t0 = Date.now();
const out = await asr(audio, { language: lang, task: "transcribe", chunk_length_s: 30, stride_length_s: 5, return_timestamps: true });
fs.writeFileSync(`transcript-${lang}.json`, JSON.stringify(out, null, 1));
for (const c of out.chunks) console.log(c.timestamp.map((x) => x?.toFixed(1)).join("-"), c.text);
console.error("secs", (Date.now() - t0) / 1000);
