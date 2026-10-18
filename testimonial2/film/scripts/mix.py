"""Testimonial audio: cleaned dialogue + halal bed: synthesized daf only, with ducking,
music swell under the end card, -14 LUFS / -1 dBTP.
Run: uv run --no-project --with numpy python scripts/mix.py <edit_len> <duration>"""
import json, os, subprocess, sys, wave
import numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
EDIT, DUR = float(sys.argv[1]), float(sys.argv[2])
N = int(DUR * SR)
rng = np.random.default_rng(3)
t_ = lambda d: np.arange(int(d * SR)) / SR
note = lambda n: 440 * 2 ** ((n - 69) / 12)

def place(buf, x, at, g=1.0, pan=0.0):
    i = int(at * SR)
    if i >= buf.shape[1]: return
    j = min(buf.shape[1], i + len(x)); x = x[: j - i]
    buf[0, i:j] += x * g * np.cos((pan + 1) * np.pi / 4) * 1.41; buf[1, i:j] += x * g * np.sin((pan + 1) * np.pi / 4) * 1.41

# Halal bed: daf (frame drum) only. No instruments, no vocals.
BPM = 84; BEAT = 60 / BPM; BAR = 4 * BEAT
tl = np.arange(N) / SR
m = np.zeros((2, N))
# daf: "dum" (low pitched membrane) and "tak" (rim slap); quiet pattern, fuller later
def dum(v=1.0):
    t = t_(0.7); f = 72 + 55 * np.exp(-t * 30)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
    n = rng.standard_normal(len(t)) * np.exp(-t * 60) * 0.25
    return (y + np.convolve(n, np.ones(12) / 12, "same")) * np.minimum(1, t / 0.002) * v
def tak(v=1.0):
    t = t_(0.25); n = rng.standard_normal(len(t))
    hp = n - np.convolve(n, np.ones(6) / 6, "same")
    ring = np.sin(2 * np.pi * 410 * t) * np.exp(-t * 35) * 0.5 + np.sin(2 * np.pi * 690 * t) * np.exp(-t * 45) * 0.3
    jingle = rng.standard_normal(len(t)) * (np.sin(2 * np.pi * 5200 * t) ** 2) * np.exp(-t * 18) * 0.08
    return (hp * np.exp(-t * 55) * 0.5 + ring + jingle) * v
daf = np.zeros((2, N))
FULL = [(0, "D", 1.0), (1, "t", 0.35), (2, "T", 0.7), (4, "D", 0.8), (5, "D", 0.6), (6, "T", 0.75), (7, "t", 0.3)]
SPARSE = [(0, "D", 0.9), (4, "D", 0.55), (6, "T", 0.45)]
bar = 0
while bar * BAR < DUR - 0.5:
    at0 = bar * BAR
    pat = SPARSE if at0 < 14 else FULL
    for e8, kind, v in pat:
        at = at0 + e8 * BEAT / 2 + rng.normal(0, 0.006)
        if at < 0.3 or at > DUR - 1.2: continue
        v *= 0.9 + 0.2 * rng.random()
        if kind == "D": place(daf, dum(v), at, 0.9, -0.1)
        else: place(daf, tak(v * (1.0 if kind == "T" else 0.6)), at, 0.55, 0.15)
    bar += 1
m = daf / (np.abs(daf).max() + 1e-9)
# dialogue
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(ROOT, "data/dialogue.wav"), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
d = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).T
vo = np.zeros((2, N)); vo[:, : min(N, d.shape[1])] = d[:, :N]
e = np.abs(vo).mean(0); kk = int(SR * 0.08); e = np.convolve(e, np.ones(kk) / kk, "same"); e /= e.max() + 1e-9
duck = 10 ** (-7 * np.clip(e * 4, 0, 1) / 20)
lvl = np.interp(tl, [0, 0.4, EDIT - 0.6, EDIT + 0.4, DUR - 2.2, DUR - 0.1, DUR], [0.0, 1.0, 1.0, 2.6, 2.6, 0.0, 0.0])
mus = m * 0.085 * duck * lvl
mix = vo + mus
def write(p, x):
    x = np.clip(x, -1, 1)
    with wave.open(p, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x.T * 32767).astype(np.int16).tobytes())
os.makedirs(os.path.join(ROOT, "out"), exist_ok=True)
write(os.path.join(ROOT, "out/premix.wav"), mix / max(1.0, np.abs(mix).max()))
write(os.path.join(ROOT, "out/music.wav"), m * 0.5)
a = subprocess.run(["ffmpeg", "-hide_banner", "-i", os.path.join(ROOT, "out/premix.wav"), "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
j = json.loads(a[a.rindex("{"): a.rindex("}") + 1])
f = f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(ROOT, "out/premix.wav"), "-af", f, "-ar", str(SR), os.path.join(ROOT, "out/mix.wav")], check=True)
print("mix ok", j["input_i"])
