"""SRT from a reel's caption chunks (src/components/subtitles.ts) + data/words.json.
Usage: srt.py <reel dir> <out.srt>"""
import json, re, sys, os
d, out = sys.argv[1], sys.argv[2]
W = json.load(open(os.path.join(d, "data/words.json")))
src = open(os.path.join(d, "src/components/subtitles.ts")).read()
body = src[src.index("const CHUNKS"):]; body = body[:body.index("];")]
chunks = [json.loads(m) for m in re.findall(r'^\s*\[("(?:[^"\\]|\\.)*")', body, re.M)]
ts = lambda x: "%02d:%02d:%02d,%03d" % (x // 3600, x // 60 % 60, x % 60, round((x % 1) * 1000) % 1000)
k, cues = 0, []
for c in chunks:
    n = len(c.split()); ws = W[k:k + n]; k += n
    cues.append([c, ws[0]["s"] - 0.05, ws[-1]["e"] + 0.35])
for i in range(len(cues) - 1): cues[i][2] = min(cues[i][2], cues[i + 1][1] - 0.02)
open(out, "w").write("\n".join(f"{i+1}\n{ts(a)} --> {ts(b)}\n{c}\n" for i, (c, a, b) in enumerate(cues)))
print(len(cues), "cues ->", out, "| words used", k, "of", len(W))
