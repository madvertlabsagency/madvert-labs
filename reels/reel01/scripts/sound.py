"""Music bed, SFX cue sheet, sonic logo and final mix — all synthesized, all driven by
the same word timings as the picture (data/words.json + VO_OFFSET).

Run:  uv run --no-project --with numpy python scripts/sound.py
Writes out/music.wav, out/sfx.wav, out/mix.wav (VO + music + SFX, -14 LUFS).
"""
import json, os, re, subprocess, wave
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
VO_OFFSET = 0.0
DUR = 30.4
N = int(DUR * SR)
rng = np.random.default_rng(7)

# ---------------------------------------------------------------- word timings
WORDS = json.load(open(os.path.join(ROOT, "data/words.json")))
norm = lambda w: re.sub(r"[^a-z0-9']", "", w.lower())
for w in WORDS:
    w["n"] = norm(w["w"]); w["s"] += VO_OFFSET; w["e"] += VO_OFFSET

def phrase(p, nth=0):
    toks = [norm(x) for x in p.split()]
    hit = 0
    for i in range(len(WORDS) - len(toks) + 1):
        if all(WORDS[i + k]["n"] == toks[k] for k in range(len(toks))):
            if hit == nth: return WORDS[i]["s"], WORDS[i + len(toks) - 1]["e"]
            hit += 1
    raise KeyError(p)
ws = lambda p, n=0: phrase(p, n)[0]
we = lambda p, n=0: phrase(p, n)[1]
cut = lambda p, n=0, lead=0.25: ws(p, n) - lead

# ---------------------------------------------------------------- DSP helpers
def t_(d): return np.arange(int(d * SR)) / SR
def env(d, a=0.005, r=None, curve=4.0):
    t = t_(d); r = d - a if r is None else r
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-curve * np.maximum(0, t - a) / max(r, 1e-4))
    return e
def lp(x, fc):
    """one-pole low-pass; fc may be an array (time-varying)."""
    fc = np.broadcast_to(np.asarray(fc, dtype=float), x.shape)
    a = 1 - np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x); s = 0.0
    for i in range(len(x)):
        s += a[i] * (x[i] - s); y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def noise(d): return rng.standard_normal(int(d * SR))
def saw(f, t): return 2 * ((f * t) % 1) - 1
def note(n): return 440 * 2 ** ((n - 69) / 12)

def place(buf, x, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= buf.shape[1] or i + len(x) <= 0: return
    if i < 0: x = x[-i:]; i = 0
    j = min(buf.shape[1], i + len(x)); x = x[: j - i]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[0, i:j] += x * gain * l * 1.414; buf[1, i:j] += x * gain * r * 1.414

# ---------------------------------------------------------------- SFX palette
def tick(f=3200, d=0.03):
    t = t_(d); return np.sin(2 * np.pi * f * t) * env(d, 0.001, d, 9)
def click():
    y = tick(2600, 0.025) * 0.8
    n = hp(noise(0.012), 3000) * env(0.012, 0.0005, 0.012, 8) * 0.25
    y[: len(n)] += n
    return y
def blip(f=1250, d=0.09):
    t = t_(d); return np.sin(2 * np.pi * f * t) * env(d, 0.003, d, 6)
def pop():
    d = 0.12; t = t_(d); f = 600 + 900 * t / d
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(d, 0.004, d, 7)
def whoosh(d=0.5, up=True):
    n = noise(d); t = t_(d)
    shape = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    fc = (600 + 5000 * (t / d if up else 1 - t / d))
    y = lp(hp(n, 200), fc) * shape
    return y / (np.abs(y).max() + 1e-9)
def impact(d=1.1, f0=110, f1=42):
    t = t_(d); f = f1 + (f0 - f1) * np.exp(-t * 18)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(d, 0.002, d, 4.2)
    trans = lp(noise(0.08), 2500) * env(0.08, 0.001, 0.08, 10)
    y = body; y[: len(trans)] += trans * 0.6
    return y / np.abs(y).max()
def riser(d=1.2):
    t = t_(d); n = hp(noise(d), 400)
    y = lp(n, 300 + 7000 * (t / d) ** 2) * (t / d) ** 2
    y += 0.3 * np.sin(2 * np.pi * np.cumsum(200 + 900 * (t / d) ** 2) / SR) * (t / d) ** 2
    return y / np.abs(y).max()
def chime(notes=(76, 83), gap=0.07, d=0.9):
    out = np.zeros(int((d + gap * len(notes)) * SR))
    for k, n in enumerate(notes):
        t = t_(d); f = note(n)
        y = (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * env(d, 0.004, d, 5)
        i = int(k * gap * SR); out[i:i + len(y)] += y
    return out / np.abs(out).max()
def typing(d=0.6, rate=14):
    out = np.zeros(int(d * SR) + 2000)
    tt = 0.0
    while tt < d:
        y = tick(2200 + rng.uniform(-400, 400), 0.02) * rng.uniform(0.5, 1)
        i = int(tt * SR); out[i:i + len(y)] += y
        tt += rng.uniform(0.6, 1.4) / rate
    return out
def sub(d=0.9, f=48):
    t = t_(d); return np.sin(2 * np.pi * f * t) * env(d, 0.01, d, 3.5)
def sonic_logo():
    """Madvert sonic identity: low clean pulse + short bright harmonic + digital shimmer."""
    d = 2.6; t = t_(d); out = np.zeros(len(t))
    out += 0.9 * np.sin(2 * np.pi * 55 * t) * env(d, 0.02, d, 3.2)           # low pulse
    for k, n in enumerate((77, 81, 84, 89)):                                     # F A C F bright harmonic
        f = note(n); i = int(0.06 * k * SR); tt = t_(d - 0.06 * k)
        y = (np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(2 * np.pi * 2 * f * tt)) * env(d - 0.06 * k, 0.006, d, 3.4)
        out[i:i + len(y)] += 0.32 * y
    sh = hp(noise(d), 6000) * env(d, 0.25, d, 2.5) * (0.5 + 0.5 * np.sin(2 * np.pi * 22 * t))  # shimmer
    out += 0.18 * sh
    return out / np.abs(out).max()

# ---------------------------------------------------------------- daf (frame drum)
def dum(v=1.0):
    t = t_(0.7); f = 72 + 55 * np.exp(-t * 30)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
    n = rng.standard_normal(len(t)) * np.exp(-t * 60) * 0.25
    return (y + np.convolve(n, np.ones(12) / 12, "same")) * np.minimum(1, t / 0.002) * v
def tak(v=1.0):
    t = t_(0.25); n = rng.standard_normal(len(t))
    h = n - np.convolve(n, np.ones(6) / 6, "same")
    ring = np.sin(2 * np.pi * 410 * t) * np.exp(-t * 35) * 0.5 + np.sin(2 * np.pi * 690 * t) * np.exp(-t * 45) * 0.3
    jingle = rng.standard_normal(len(t)) * (np.sin(2 * np.pi * 5200 * t) ** 2) * np.exp(-t * 18) * 0.08
    return (h * np.exp(-t * 55) * 0.5 + ring + jingle) * v

# ---------------------------------------------------------------- bed (original, synthesized)
# Energetic but minimal: low pulse + soft kick/hat groove that only arrives with the system reveal.
BPM = 120; BEAT = 60 / BPM; BAR = 4 * BEAT
def music():
    m = np.zeros((2, N)); tl = np.arange(N) / SR
    t_sys, t_isl, t_gap, t_rev, t_one, t_tag, t_end = cut("it needs", 0, 0.1), cut("right", 0, 0.1), ws("every"), cut("at madvert", 0, 0.1), ws("system", 1), cut("beyond", 0, 0.1), cut("follow", 0, 0.1)
    def root(tt):
        if tt < t_rev: return 38 if tt < t_gap else 37
        return [41, 36, 38, 43][int((tt - t_rev) / BAR) % 4]
    k = 0
    while k * BEAT / 2 < DUR - 0.8:
        at = k * BEAT / 2; k += 1
        if t_gap - 0.1 < at < t_rev: continue          # tension drop before the reveal
        d = BEAT / 2 * 0.9; tt = t_(d); r = root(at)
        y = (np.sin(2 * np.pi * note(r) * tt) + 0.3 * saw(note(r), tt)) * env(d, 0.004, d, 3.5)
        place(m, y, at, 0.35 if at < t_rev else 0.5)
    kick = impact(0.35, 140, 45); hat = hp(noise(0.05), 7000) * env(0.05, 0.001, 0.05, 8)
    b = 0
    while t_rev + b * BEAT < t_end + 2.4:
        at = t_rev + b * BEAT; b += 1
        place(m, kick, at, 0.6 if at > t_one else 0.45)
        place(m, hat, at + BEAT / 2, 0.14, 0.3)
        if at > t_one: place(m, hat, at + BEAT / 4, 0.07, -0.3); place(m, hat, at + 3 * BEAT / 4, 0.07, 0.3)
    q = 0
    while t_isl + q * BEAT / 2 < t_rev - 0.3:
        place(m, tick(1800, 0.02), t_isl + q * BEAT / 2, 0.08, 0.4 if q % 2 else -0.4); q += 1
    return m

def notify(): return chime((84, 88), 0.06, 0.35)
def sfx():
    S = np.zeros((2, N)); C = lambda x, at, g=1.0, pan=0.0: place(S, x, at, g, pan)
    # HOOK: hit on frame 1, slam per word, chips whoosh, strike
    C(impact(1.0, 120, 40), 0.0, 0.75); C(sub(0.8, 42), 0.0, 0.5)
    for w in ["business", "doesn't", "need", "more", "marketing"]: C(impact(0.3, 260, 110), ws(w) - 0.05, 0.25)
    for k in range(6): C(whoosh(0.25), 0.15 + k * 0.32, 0.1, -0.6 + 0.24 * k)
    C(whoosh(0.3, False), ws("marketing") + 0.3, 0.35); C(blip(320, 0.25), ws("marketing") + 0.35, 0.3)
    # IT NEEDS A SYSTEM: implode + big hit
    C(whoosh(0.45, False), cut("it needs") , 0.4); C(riser(0.5), ws("a system") - 0.5, 0.2)
    C(impact(1.3, 100, 34), ws("system"), 0.9); C(sub(1.2, 36), ws("system"), 0.6); C(chime((89, 96), 0.06, 1.0), ws("system") + 0.05, 0.2)
    # ISLANDS pop in, glitchy broken links, overdue alert
    for w, n in [("ads", 0), ("website", 0), ("spreadsheet", 0), ("followup", 0)]: C(pop(), ws(w, n) - 0.1, 0.3)
    for k in range(5): C(tick(900 + 300 * (k % 3), 0.04), ws("website") + 0.6 + k * 0.7, 0.12, 0.5 - 0.25 * k)
    C(blip(420, 0.2), ws("remembers") - 0.25, 0.3); C(blip(380, 0.2), ws("remembers") - 0.05, 0.25)
    # LEAKS: falling droplets + low hit
    C(impact(0.7, 150, 55), ws("leaks"), 0.5)
    for k in range(8): C(blip(900 - 60 * k, 0.12), ws("every") + 0.2 + k * 0.17, 0.08, -0.5 + 0.12 * k)
    # REVEAL: logo, nodes click on each word, lock-in hit, revenue chime
    C(whoosh(0.5), cut("at madvert") - 0.15, 0.35); C(sonic_logo(), ws("madvert"), 0.5)
    C(whoosh(0.6), ws("connect") - 0.1, 0.25)
    for w, n in [("ads", 1), ("landing", 0), ("crm", 0), ("automation", 0), ("followup", 1)]: C(click(), ws(w, n), 0.45, 0.2); C(blip(1500, 0.05), ws(w, n) + 0.08, 0.14)
    C(riser(0.7), ws("system", 1) - 0.7, 0.25); C(impact(1.2, 110, 36), ws("system", 1), 0.8); C(chime((88, 95), 0.07, 1.0), ws("system", 1) + 0.05, 0.3)
    C(notify(), ws("attention"), 0.2); C(chime((84, 88, 91), 0.06, 1.0), ws("revenue"), 0.35)
    # TAGLINE + END
    C(whoosh(0.45), cut("beyond") - 0.15, 0.3); C(impact(0.9, 130, 45), ws("systems"), 0.55)
    C(whoosh(0.4), cut("follow") - 0.1, 0.25); C(click(), we("growth", 2) + 0.15, 0.5, 0.2); C(chime((88, 93), 0.06, 0.6), we("growth", 2) + 0.25, 0.3)
    C(sonic_logo(), we("growth", 2) + 0.2, 0.5)
    return S

# ---------------------------------------------------------------- mix
def read_vo():
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(ROOT, "audio/voiceover.wav"),
                          "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    v = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).T
    out = np.zeros((2, N)); i = int(VO_OFFSET * SR)
    j = min(N, i + v.shape[1]); out[:, i:j] = v[:, : j - i]
    return out

def envelope(x, ms=60):
    a = np.abs(x).mean(0)
    k = int(SR * ms / 1000)
    c = np.convolve(a, np.ones(k) / k, mode="same")
    return c / (c.max() + 1e-9)

def write(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x.T * 32767).astype(np.int16).tobytes())

if __name__ == "__main__":
    os.makedirs(os.path.join(ROOT, "out"), exist_ok=True)
    vo = read_vo()
    mu = music(); mu /= np.abs(mu).max() + 1e-9
    fx = sfx(); fx /= max(1.0, np.abs(fx).max())
    e = envelope(vo)
    duck_m = 10 ** (-9 * np.clip(e * 3, 0, 1) / 20)   # music ducks up to 9 dB under the voice
    duck_s = 10 ** (-4 * np.clip(e * 3, 0, 1) / 20)   # sfx duck up to 4 dB
    music_bus = mu * 0.30 * duck_m
    sfx_bus = fx * 0.55 * duck_s
    write(os.path.join(ROOT, "out/music.wav"), mu * 0.5)
    write(os.path.join(ROOT, "out/sfx.wav"), fx * 0.8)
    write(os.path.join(ROOT, "out/music_sfx.wav"), (music_bus + sfx_bus) * 1.5)
    pre = vo * 1.0 + music_bus + sfx_bus
    write(os.path.join(ROOT, "out/premix.wav"), pre / max(1.0, np.abs(pre).max()))
    # two-pass loudnorm to -14 LUFS, -1 dBTP
    a = subprocess.run(["ffmpeg", "-hide_banner", "-i", os.path.join(ROOT, "out/premix.wav"), "-af",
                        "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(a[a.rindex("{"):a.rindex("}") + 1])
    f = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
         f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(ROOT, "out/premix.wav"), "-af", f,
                    "-ar", str(SR), os.path.join(ROOT, "out/mix.wav")], check=True)
    print("wrote out/mix.wav", m["input_i"], "->", -14)
