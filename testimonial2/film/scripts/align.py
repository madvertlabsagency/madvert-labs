"""Word-level forced alignment of audio/voiceover.mp3 against SCRIPT.

Run:  uv run --no-project --with pocketsphinx python scripts/align.py
Writes data/words.json: [{"w": display word, "s": start sec, "e": end sec}, ...]

Uses PocketSphinx's bundled en-us acoustic model (no download needed).
SPOKEN maps display words to how they are pronounced, so acronyms align.
"""
import json, re, subprocess, wave, tempfile, os
from pocketsphinx import Decoder

SCRIPT = """
If your custom patch or embroidery business serves the USA but customer acquisition is still inconsistent, this is for you.
Madvert Labs builds a potential order system designed to bring qualified RFQs into your pipeline.
We create the ads, build the funnel, capture all the order details and even artwork uploads.
Then the full RFQ is delivered straight to your CRM.
No ad spend from your side. No random leads.
You simply pay per qualified potential order.
Book your discovery call with Madvert Labs today.
"""

# display word (lowercase, no punctuation) -> spoken tokens
SPOKEN = {"crm": "c r m", "rfq": "r f q", "rfqs": "r f q's", "usa": "u s a"}
EXTRA_DICT = {"madvert": "M AE D V ER T", "creatives": "K R IY EY T IH V Z", "automations": "AO T AH M EY SH AH N Z"}

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
display = [w for w in SCRIPT.split() if re.search(r"[A-Za-z0-9]", w)]
spoken, owner = [], []
for i, w in enumerate(display):
    key = re.sub(r"[^a-z0-9'.]", "", w.lower()).rstrip(".")
    for tok in SPOKEN.get(key, key).split():
        spoken.append(tok); owner.append(i)

with tempfile.TemporaryDirectory() as td:
    wav = os.path.join(td, "vo.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(root, "audio/voiceover.mp3"),
                    "-ar", "16000", "-ac", "1", wav], check=True)
    data = wave.open(wav).readframes(10**9)

d = Decoder(samprate=16000, bestpath=False, loglevel="FATAL", beam=1e-80, wbeam=1e-60, pbeam=1e-80)
for w, p in EXTRA_DICT.items():
    d.add_word(w, p, False)
d.set_align_text(" ".join(spoken))
d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
segs = [(re.sub(r"\(\d+\)$", "", s.word), s.start_frame / 100, (s.end_frame + 1) / 100)
        for s in d.seg() if s.word not in ("<sil>", "<s>", "</s>", "[NOISE]")]
assert len(segs) == len(spoken), (len(segs), len(spoken))

out = []
for (tok, s, e), i in zip(segs, owner):
    if out and out[-1]["i"] == i:
        out[-1]["e"] = e
    else:
        out.append({"i": i, "w": display[i], "s": s, "e": e})
for o in out: del o["i"]
os.makedirs(os.path.join(root, "data"), exist_ok=True)
json.dump(out, open(os.path.join(root, "data/words.json"), "w"), indent=0)
print(f"{len(out)} words, last ends {out[-1]['e']:.2f}s")
