"""Voiceover from an approved script with Kokoro-82M (Apache-2.0, runs locally).
Each line is synthesised separately and joined with a chosen pause, so pacing is explicit.
Usage: tts.py <lines.txt> <out.wav> [voice] [speed]
lines.txt: one line per phrase, optional trailing "|<pause seconds>" (default 0.28)."""
import sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
M = "/home/user/tts/"
src, out = sys.argv[1], sys.argv[2]
voice = sys.argv[3] if len(sys.argv) > 3 else "am_fenrir"
speed = float(sys.argv[4]) if len(sys.argv) > 4 else 1.1
k = Kokoro(M + "kokoro-v1.0.int8.onnx", M + "voices-v1.0.bin")
parts, sr, lines, pos = [], 24000, [], 0.05
for line in open(src):
    line = line.strip()
    if not line: continue
    txt, _, p = line.partition("|")
    a, sr = k.create(txt.strip(), voice=voice, speed=speed, lang="en-us")
    # trim leading/trailing silence
    e = np.abs(a) > 0.01
    i0, i1 = (np.argmax(e), len(a) - np.argmax(e[::-1])) if e.any() else (0, len(a))
    a = a[max(0, i0 - int(0.02 * sr)): min(len(a), i1 + int(0.06 * sr))]
    lines.append({"text": txt.strip(), "s": round(pos, 3), "e": round(pos + len(a) / sr, 3)})
    pos += len(a) / sr + int(float(p or 0.28) * sr) / sr
    parts += [a, np.zeros(int(float(p or 0.28) * sr), dtype=a.dtype)]
y = np.concatenate([np.zeros(int(0.05 * sr), dtype=parts[0].dtype)] + parts)
sf.write(out, y, sr)
import json; json.dump(lines, open(out.rsplit(".", 1)[0] + ".lines.json", "w"), indent=1)
print(out, round(len(y) / sr, 2), "s")
