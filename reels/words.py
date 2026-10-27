"""Word timings for a TTS voiceover: Whisper (English, word timestamps) per synthesised line,
then the script's own words are laid onto those timestamps (same count) so spelling is exact.
Usage: words.py <voice.wav> <voice.lines.json> <out words.json>"""
import json, subprocess, sys, os, re
wav, lj, out = [os.path.abspath(p) for p in sys.argv[1:4]]
L = json.load(open(lj))
f32 = wav.rsplit(".", 1)[0] + ".f32"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", wav, "-ac", "1", "-ar", "16000", "-f", "f32le", f32], check=True)
win = [[max(0, l["s"] - 0.05), l["e"] + 0.08] for l in L]
tmp = out + ".raw.json"
env = dict(os.environ, AUD=f32, LANG_ASR="english")
subprocess.run(["node", "/home/user/madvert-labs/testimonial2/words.mjs", json.dumps(win), tmp], env=env, cwd="/home/user/madvert-labs/testimonial2", check=True, capture_output=True)
raw = json.load(open(tmp)); os.remove(tmp); os.remove(f32)
m = []  # re-join tokens Whisper splits ("follow" "-up", "$30" ",000")
for w in raw:
    if m and (w["w"].startswith("-") or w["w"].startswith(",0") or w["w"] in (".", ",")): m[-1]["e"] = w["e"]
    else: m.append(dict(w))
raw = m
res = []
for l, (a, b) in zip(L, win):
    ws = [w for w in raw if a - 0.01 <= w["s"] < b]
    toks = l["text"].replace("...", "…").split()
    if len(ws) == len(toks):
        res += [{"w": t, "s": w["s"], "e": w["e"]} for t, w in zip(toks, ws)]
    else:  # spread the script words over the line by character length
        n = sum(len(t) for t in toks); t0 = l["s"]; d = l["e"] - l["s"]
        for t in toks:
            dd = d * len(t) / n; res.append({"w": t, "s": round(t0, 3), "e": round(t0 + dd, 3)}); t0 += dd
        print("spread:", l["text"], len(ws), len(toks))
json.dump(res, open(out, "w"))
print(len(res), "words")
