"""Music bed, SFX cue sheet, sonic logo and final mix — all synthesized, all driven by
the same word timings as the picture (data/words.json + VO_OFFSET).

Run:  uv run --no-project --with numpy python scripts/sound.py
Writes out/music.wav, out/sfx.wav, out/mix.wav (VO + music + SFX, -14 LUFS).
"""
import json, os, re, subprocess, wave
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
VO_OFFSET = 0.1
DUR = 105.0
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

# ---------------------------------------------------------------- music bed
# Subtle cinematic percussion: low ambient pulse pad + daf + soft kick. No vocals, no lead.
BPM = 90; BEAT = 60 / BPM; BAR = 4 * BEAT
def music():
    m = np.zeros((2, N))
    tl = np.arange(N) / SR
    t_sys = cut("i'm offering", 0, 0.12)     # offer: lift
    t_spend = cut("and if you want", 0, 0.12)   # proof: pull back slightly (breathing room)
    t_inv = ws("open")                        # dashboards open: full groove back
    t_pay = cut("and honestly", 0, 0.12)
    t_rfq = ws("teach")
    t_gate = cut("if you want to sell", 0, 0.12)
    t_back = cut("ads", 0, 0.12)               # capabilities run: hats on
    t_one = ws("white label", 1)
    t_cta = cut("if that", 0, 0.12)
    tension = [(50, 53, 57)]
    lift = [(46, 50, 53, 57), (41, 45, 48, 53), (48, 52, 55, 60), (50, 53, 57, 60)]
    def chord_at(tt):
        if tt < t_sys: return tension[0]
        if tt >= t_cta: return (41, 45, 48, 53, 57)
        return lift[int((tt - t_sys) / BAR) % 4]
    blk = int(BEAT * SR); pad = np.zeros(N)
    for i0 in range(0, N, blk):
        i1 = min(N, i0 + blk); tt = tl[i0:i1]; ch = chord_at(tl[i0])
        pad[i0:i1] = sum(saw(note(n + 12) * (1 + dt), tt) for n in ch for dt in (-0.004, 0.004)) / (2 * len(ch))
    cutoff = np.interp(tl, [0, t_sys - 0.3, t_sys, t_spend, t_inv, t_pay, t_rfq, t_back, t_one, t_cta, DUR], [700, 900, 1400, 600, 1700, 1100, 1800, 1700, 2100, 1300, 800])
    pad = lp(pad, cutoff)
    lvl = np.interp(tl, [0, 0.3, t_sys - 0.3, t_sys + 0.2, t_spend, t_spend + 0.8, t_inv - 0.1, t_inv + 0.3, t_back, t_one, t_cta, t_cta + 1, DUR - 1.5, DUR],
                    [0, 0.5, 0.55, 0.65, 0.65, 0.3, 0.3, 0.75, 0.7, 0.85, 0.85, 0.6, 0.55, 0])
    pad = lp(pad * lvl, 6000)
    m[0] += pad * 0.8; m[1] += pad * 0.8
    # ambient pulse: soft sine on the root, eighth notes, swells with the section energy
    k = 0
    while k * BEAT / 2 < DUR - 1.5:
        at = k * BEAT / 2; k += 1
        if t_spend + 0.3 < at < t_inv - 0.1: continue
        r = chord_at(at)[0] - 12; d = BEAT / 2 * 0.9; tt = t_(d)
        y = np.sin(2 * np.pi * note(r) * tt) * env(d, 0.01, d, 3)
        place(m, y, at, 0.22 if at < t_sys else 0.32)
    # daf + soft kick
    FULL = [(0, "D", 1.0), (2, "T", 0.7), (3, "t", 0.35), (4, "D", 0.8), (5, "D", 0.55), (6, "T", 0.75), (7, "t", 0.3)]
    SPARSE = [(0, "D", 0.9), (6, "T", 0.4)]
    kick = impact(0.35, 140, 45)
    hat = hp(noise(0.05), 7000) * env(0.05, 0.001, 0.05, 8)
    bar = 0
    while bar * BAR < DUR - 2.0:
        at0 = bar * BAR; bar += 1
        if t_spend + 0.2 < at0 + BAR and at0 < t_inv - 0.2: continue      # breathing room
        if t_cta + 2 * BAR < at0: continue                                  # resolve without drums
        pat = SPARSE if at0 < t_sys or at0 > t_cta else FULL
        for e8, kind, v in pat:
            at = at0 + e8 * BEAT / 2 + rng.normal(0, 0.005)
            v *= 0.9 + 0.2 * rng.random()
            if kind == "D": place(m, dum(v), at, 0.55, -0.1)
            else: place(m, tak(v * (1.0 if kind == "T" else 0.6)), at, 0.32, 0.15)
        if t_sys <= at0 < t_cta:
            for b in (0, 2): place(m, kick, at0 + b * BEAT, 0.35)
        if t_back <= at0 < cut("and if you want", 0, 0.12) or t_inv <= at0 < t_pay:
            for b in range(8): place(m, hat, at0 + b * BEAT / 2 + BEAT / 4, 0.08, 0.3 if b % 2 else -0.3)
    # problem section: clock-like tension ticks
    q = 0
    while 0.8 + q * BEAT / 2 < t_sys - 0.4:
        place(m, tick(1800, 0.02), 0.8 + q * BEAT / 2, 0.06, 0.4 if q % 2 else -0.4); q += 1
    return m

# ---------------------------------------------------------------- SFX cue sheet
def notify():
    """soft two-note message ping"""
    return chime((84, 88), 0.06, 0.35)
def sfx():
    S = np.zeros((2, N))
    C = lambda x, at, g=1.0, pan=0.0: place(S, x, at, g, pan)
    # HOOK — deal signed, delivery needs pile on, the question hits
    C(sub(0.9, 42), 0.0, 0.4); C(pop(), 0.2, 0.25)
    C(chime((84, 91), 0.06, 0.7), ws("clients"), 0.3); C(impact(0.6, 170, 70), ws("clients"), 0.35)
    for k in range(8): C(notify(), ws("but") + 0.05 + k * 0.16, 0.13, -0.6 + 0.17 * k)
    C(impact(0.8, 140, 50), ws("headache") - 0.1, 0.55)
    C(whoosh(0.4), ws("this is probably") - 0.25, 0.3); C(impact(0.6, 180, 70), ws("for you"), 0.35)
    C(whoosh(0.5), ws("offer") - 0.1, 0.25); C(chime((88,), 0, 0.6), ws("valuable"), 0.2)
    # OFFER — white-label slam, header flips to the agency
    C(whoosh(0.5), cut("i'm offering") - 0.1, 0.3)
    C(impact(1.0, 120, 40), ws("white label"), 0.6); C(sub(0.9, 40), ws("white label"), 0.4)
    for k in range(6): C(pop(), ws("all of our") + k * 0.12, 0.16, -0.4 + 0.16 * k)
    C(whoosh(0.35), ws("yours") - 0.15, 0.3); C(chime((86, 93), 0.06, 0.8), ws("yours"), 0.3)
    C(click(), ws("outsource"), 0.35)
    # FOUNDER — hyperframe ticks, experience reveal
    for k in range(7): C(tick(2400, 0.02), cut("i'll keep") + 0.2 + k * 0.16, 0.2); C(impact(0.25, 260, 110), cut("i'll keep") + 0.2 + k * 0.16, 0.12)
    C(sonic_logo(), ws("straight") + 0.35, 0.45)
    for w in ["digital", "lead generation", "growth"]: C(blip(1200, 0.06), ws(w), 0.15)
    C(impact(1.1, 110, 38), ws("five"), 0.7); C(chime((89, 96), 0.06, 1.0), ws("five") + 0.05, 0.22)
    # MARKETS
    for w in ["across", "dubai", "pakistan"]: C(impact(0.5, 200, 90), ws(w) + (0.45 if w == "across" else 0), 0.3)
    for k in range(5): C(whoosh(0.18), ws("servicebased") - 0.1 + k * 0.28, 0.15); C(tick(2200, 0.03), ws("servicebased") - 0.1 + k * 0.28, 0.18)
    # SCALE
    for k in range(10): C(blip(700 + 60 * k, 0.05), ws("accounts") + k * 0.12, 0.08)
    C(riser(0.7), ws("30000") - 0.7, 0.2); C(impact(1.3, 100, 34), ws("30000"), 0.85); C(sub(1.2, 36), ws("30000"), 0.55)
    C(impact(0.8, 140, 50), ws("endtoend"), 0.45)
    # CAPABILITIES — one click per service, then ALL OF IT
    for w in ["ads", "funnels", "landing pages", "analytics", "tracking", "crm", "automations", "creatives", "followup"]:
        C(click(), ws(w), 0.32, 0.2); C(blip(1500, 0.05), ws(w) + 0.08, 0.1)
    C(impact(1.0, 120, 40), ws("all of it"), 0.6); C(chime((88, 95), 0.07, 1.0), ws("all of it") + 0.3, 0.25)
    # LEAD GEN
    C(whoosh(0.5), cut("lead generation", 1) - 0.1, 0.3); C(impact(0.8, 140, 50), ws("strongest"), 0.4)
    C(blip(380, 0.3), ws("hope") + 0.15, 0.25)
    for k in range(6): C(pop(), ws("build") - 0.05 + k * 0.28, 0.18, -0.3 + 0.12 * k)
    C(chime((84, 91), 0.06, 0.8), ws("client"), 0.3)
    for k in range(4): C(blip(420 - 40 * k, 0.15), ws("random") - 0.2 + k * 0.3, 0.12)
    C(impact(0.9, 130, 45), ws("foundations"), 0.5)
    # PROOF — call, share screen, dashboards with a hit per proof
    C(impact(0.7, 150, 55), ws("proof"), 0.4)
    C(chime((79, 84), 0.08, 0.6), ws("jump"), 0.25); C(click(), ws("share"), 0.4)
    mont = ws("open") - 0.1; d = (ws("and honestly") - 0.12 - mont) / 5
    for k in range(5):
        C(whoosh(0.3), mont + k * d - 0.15, 0.22); C(impact(0.5, 220, 100), mont + k * d + d * 0.45 + 0.4, 0.3); C(chime((88,), 0, 0.4), mont + k * d + d * 0.45 + 0.45, 0.15)
    C(pop(), ws("case studies"), 0.25)
    C(impact(0.8, 140, 50), ws("projects"), 0.4)
    # PRIVATE + TEACH
    C(whoosh(0.6, False), ws("public") - 0.2, 0.25)
    C(whoosh(0.5), ws("i also") - 0.2, 0.3); C(impact(0.9, 120, 42), ws("teach"), 0.5)
    # WHITE-LABEL MODEL (slower, the core)
    C(whoosh(0.6), cut("if you want to sell") - 0.1, 0.3)
    C(pop(), ws("sell") - 0.2, 0.25); C(impact(0.8, 140, 50), ws("agency name"), 0.45)
    C(notify(), ws("keep your"), 0.25); C(notify(), ws("relationship") - 0.1, 0.22, 0.3)
    C(sonic_logo(), ws("backend"), 0.45)
    for k in range(7): C(pop(), ws("backend") + 0.1 + k * 0.12, 0.12, -0.5 + 0.16 * k)
    C(impact(1.2, 110, 36), ws("white label", 1), 0.75); C(sub(1.0, 38), ws("white label", 1), 0.45)
    # FOCUS
    C(whoosh(0.45), cut("you focus") - 0.1, 0.3); C(chime((84,), 0, 0.5), ws("retaining"), 0.2)
    C(impact(0.9, 130, 45), ws("execution"), 0.5); C(chime((88, 95), 0.07, 0.9), ws("execution"), 0.22)
    # CTA — click, calendar confirmation, sonic logo on Bismillah
    C(whoosh(0.6), cut("if that") - 0.1, 0.3)
    C(click(), ws("call", 1) + 0.15, 0.55, 0.3); C(chime((84, 88, 91), 0.06, 1.0), ws("call", 1) + 0.5, 0.32)
    C(sonic_logo(), ws("bismillah"), 0.6)
    C(impact(1.0, 120, 40), ws("scale"), 0.5)
    return S

# ---------------------------------------------------------------- mix
def read_vo():
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(ROOT, "audio/voiceover.mp3"),
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
    import shutil; shutil.copy(os.path.join(ROOT, "out/mix.wav"), os.path.join(ROOT, "audio/preview-mix.wav"))
    print("wrote out/mix.wav", m["input_i"], "->", -14)
