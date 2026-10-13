"""Music bed, SFX cue sheet, sonic logo and final mix — all synthesized, all driven by
the same word timings as the picture (data/words.json + VO_OFFSET).

Run:  uv run --no-project --with numpy python scripts/sound.py
Writes out/music.wav, out/sfx.wav, out/mix.wav (VO + music + SFX, -14 LUFS).
"""
import json, os, re, subprocess, wave
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
VO_OFFSET = 0.3
DUR = 95.5
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

# ---------------------------------------------------------------- music bed
BPM = 110; BEAT = 60 / BPM
def music():
    m = np.zeros((2, N))
    tl = np.arange(N) / SR
    t_solution = cut("madvert labs fixes", 0, 0.3)   # system activation
    t_reframe = cut("or you're running", 0, 0.3)      # tension peaks into the interrupt
    t_end = cut("book a discovery", 0, 0.25)          # confident CTA resolution
    t_pos = cut("you simply pay", 0, 0.25)            # quiet commercial reveal (half-time)
    t_cta = cut("so instead", 0, 0.25)
    # chords (midi roots) — tension in D minor, lift through Bb F C Dm, resolve to F
    tension = [(50, 53, 57)]
    lift = [(46, 50, 53, 57), (41, 45, 48, 53), (48, 52, 55, 60), (50, 53, 57, 60)]
    def chord_at(tt):
        if tt < t_solution: return tension[0]
        if tt >= t_end: return (41, 45, 48, 53, 57)
        bar = int((tt - t_solution) / (BEAT * 4))
        return lift[(bar // 1) % 4]
    # --- pad: detuned saws, low-passed, block-wise chord changes
    blk = int(BEAT * SR)
    pad = np.zeros(N)
    for i0 in range(0, N, blk):
        i1 = min(N, i0 + blk); tt = tl[i0:i1]
        ch = chord_at(tl[i0])
        y = sum(saw(note(n + 12) * (1 + dt), tt) for n in ch for dt in (-0.004, 0.004)) / (2 * len(ch))
        pad[i0:i1] = y
    cutoff = np.interp(tl, [0, 8, t_reframe, t_solution - 0.3, t_solution, 45, 70, t_pos, t_pos + 2.5, t_end, DUR],
                       [450, 650, 900, 1100, 1400, 1900, 2200, 900, 1700, 2000, 900])
    pad = lp(pad, cutoff)
    lvl = np.interp(tl, [0, 0.3, 9, t_reframe, t_solution - 0.4, t_solution - 0.05, t_solution + 0.3, t_pos - 0.2, t_pos + 0.3, t_pos + 2.6, t_end, DUR - 1.5, DUR],
                    [0, 0.45, 0.5, 0.6, 0.65, 0.05, 0.7, 0.65, 0.3, 0.6, 0.85, 0.6, 0])
    pad *= lvl
    # smooth chord-change clicks
    pad = lp(pad, 6000)
    m[0] += pad * 0.9; m[1] += pad * 0.9
    # --- bass: 8th-note pulse on chord root
    bass = np.zeros(N)
    eighth = BEAT / 2
    k = 0
    while k * eighth < DUR - 1:
        at = k * eighth; k += 1
        if at < 0.6 or (t_solution - 0.4 < at < t_solution) or (t_pos < at < t_pos + 2.5) or at > DUR - 3.0: continue
        r = chord_at(at)[0] - 12
        d = eighth * 0.95; tt = t_(d)
        y = (np.sin(2 * np.pi * note(r) * tt) + 0.35 * saw(note(r), tt)) * env(d, 0.004, d, 3)
        i = int(at * SR); bass[i:i + len(y)] += y * (0.55 if at < t_solution else 0.75)
    bass = lp(bass, 900)
    m += bass * 0.55
    # --- drums: soft kick (four-on-floor from the solution), hats in the services run
    kick = impact(0.35, 140, 45) * 0.9
    hat = hp(noise(0.05), 7000) * env(0.05, 0.001, 0.05, 8)
    b = 0
    while t_solution + b * BEAT < t_end:
        at = t_solution + b * BEAT; b += 1
        if t_pos - 0.1 < at < t_cta and (b % 2): continue  # half-time feel under the statement
        place(m, kick, at, 0.55 if at < 24 else 0.7)
        if at > cut("those buyers") and not (t_pos < at < t_pos + 2.5):
            place(m, hat, at + BEAT / 2, 0.16, 0.3)
            if cut("where they fill") < at < cut("so your team") or at > cut("if you're serious"):
                place(m, hat, at + BEAT / 4, 0.09, -0.3); place(m, hat, at + 3 * BEAT / 4, 0.09, 0.3)
    # tension ticks in the problem section
    q = 0
    while 1.0 + q * eighth < t_solution - 0.4:
        place(m, tick(1800, 0.02), 1.0 + q * eighth, 0.07, 0.4 if q % 2 else -0.4); q += 1
    # --- arp plucks from the solution
    s = 0; six = BEAT / 4
    while t_solution + s * six < t_end - 0.2:
        at = t_solution + s * six; s += 1
        if at < cut("those buyers") and s % 2: continue
        if t_pos < at < t_pos + 2.5: continue
        ch = chord_at(at); n = ch[(s * 3) % len(ch)] + 24
        d = 0.22; tt = t_(d)
        y = (np.sin(2 * np.pi * note(n) * tt) + 0.2 * np.sin(4 * np.pi * note(n) * tt)) * env(d, 0.002, d, 7)
        place(m, y, at, 0.12 if at < t_cta else 0.07, 0.5 * np.sin(s))
    # end resolve: long F major bloom
    return m

# ---------------------------------------------------------------- SFX cue sheet
def sfx():
    S = np.zeros((2, N))
    C = lambda x, at, g=1.0, pan=0.0: place(S, x, at, g, pan)
    def machine(d):  # industrial embroidery-machine bed: filtered noise with needle rhythm
        t = t_(d); n = lp(hp(noise(d), 300), 2400)
        rhythm = 0.55 + 0.45 * (np.sin(2 * np.pi * 14 * t) > 0.2)
        return n * rhythm * np.minimum(1, t / 0.4) * np.minimum(1, (d - t) / 0.8)
    # 01 hook — machine ambience, data ticks, impact on "real problem"
    C(machine(9.6), 0.0, 0.16)
    C(blip(900, 0.2), ws("capacity"), 0.2)
    for k in range(12): C(tick(2400, 0.02), ws("capacity") + 0.4 + k * 0.07, 0.08, -0.5 + k * 0.08)
    for k in range(12): C(tick(1400 if k % 3 else 700, 0.03), ws("customer acquisition") + 0.15 + k * 0.06, 0.1, -0.5 + k * 0.08)
    C(blip(380, 0.3), ws("inconsistent"), 0.22)
    C(riser(0.9), ws("that's the real problem") - 0.85, 0.22)
    C(impact(1.0, 110, 40), ws("problem"), 0.75); C(sub(1.0, 40), ws("problem"), 0.5)
    # 02 outreach — load builds with each MORE
    C(whoosh(0.5), cut("you might", 0, 0.3), 0.3)
    for k, p in enumerate(["more staff", "more follow-up", "more salaries", "more management"]):
        C(impact(0.5, 200 - k * 25, 80 - k * 10), ws(p) + 0.25, 0.25 + 0.08 * k, -0.3 + 0.2 * k)
        C(click(), ws(p), 0.35, 0.5)
    for k in range(6): C(pop(), ws("staff") + k * 0.09, 0.12, 0.3)
    C(typing(1.0, 12), ws("follow-up"), 0.12, 0.3)
    C(sub(0.9, 46), ws("management") + 0.2, 0.45)
    C(whoosh(0.5, False), we("management") + 0.05, 0.3)
    # 03 ads — spend ticking, CPL climbing, weak leads, negative hit
    C(whoosh(0.45), cut("or you're running", 0, 0.3), 0.3)
    for k in range(4): C(blip(900 + 220 * k, 0.09), [ws("running ads") + 0.3, ws("which brings") + 0.1, ws("expensive leads"), ws("leads") + 0.2][k], 0.3, 0.2)
    C(riser(1.0), ws("expensive") - 0.6, 0.18)
    C(impact(0.6, 160, 70), ws("expensive"), 0.35)
    for k in range(3): C(pop(), ws("too many") + k * 0.2, 0.3, 0.5)
    C(blip(300, 0.35), ws("window shoppers"), 0.3); C(impact(0.7, 140, 60), ws("window shoppers"), 0.45)
    # 04 interrupt — cut to silence, sweep, sub impact, sonic logo
    C(whoosh(0.5), cut("madvert labs fixes", 0, 0.3) + 0.08, 0.5)
    C(impact(1.4, 120, 36), ws("madvert labs fixes") - 0.02, 0.8); C(sub(1.3, 38), ws("madvert labs fixes"), 0.6)
    C(sonic_logo(), ws("labs") + 0.2, 0.8)
    C(impact(0.8, 170, 60), ws("fixes"), 0.4)
    # 05 ad creative
    C(whoosh(0.45), cut("we create", 0, 0.25), 0.3)
    C(impact(0.5, 220, 100), ws("high-engaging"), 0.3); C(typing(0.5, 22), ws("high-engaging") + 0.35, 0.15)
    C(pop(), ws("ads", 1), 0.3)
    C(whoosh(0.9, False), ws("designed") - 0.1, 0.3)
    C(click(), we("buyers", 0) - 0.1, 0.6, 0.4)
    # 06 funnel — CTA expands, pulse travels
    C(whoosh(0.6), cut("those buyers", 0, 0.3), 0.4)
    C(chime((81, 88), 0.06, 0.6), ws("your branded"), 0.2)
    C(blip(1300, 0.1), ws("funnel"), 0.25)
    # 07 form fill — a selection click per field, upload ticks and chime
    for k, p in enumerate(["patch type", "quantity", "size", "backing", "deadline", "contact details"]):
        at = ws(p) if p != "deadline" else ws("deadline", 0)
        C(click(), at + 0.1, 0.5, -0.2 + 0.08 * k)
        C(pop(), at + 0.55, 0.2, 0.5)
    C(typing(1.2, 18), ws("contact details") + 0.05, 0.16)
    for k in range(10): C(tick(2600, 0.02), ws("upload") + 0.15 + k * 0.06, 0.1)
    C(chime((84, 88, 91), 0.06, 1.0), ws("artwork", 0) + 0.02, 0.35)
    # 08 CRM — data assemble, snap, automations, notifications
    C(whoosh(0.6), cut("from there", 0, 0.1), 0.3)
    for k in range(6): C(blip(1500 + 90 * k, 0.06), ws("from there") + 0.1 + k * 0.06, 0.12, -0.5 + 0.2 * k)
    C(impact(0.4, 260, 120), ws("crm", 0) + 0.8, 0.35)
    for k in range(6): C(blip(1000 + 160 * k, 0.08), ws("automations", 0) + k * 0.17, 0.2, -0.6 + 0.24 * k)
    C(riser(0.7), ws("request for quotation") - 0.6, 0.18); C(impact(0.7, 150, 60), ws("request for quotation"), 0.35)
    C(chime((88,), 0, 0.4), ws("send it") + 0.05, 0.25, 0.3)
    C(chime((86,), 0, 0.4), ws("send it") + 0.3, 0.22, 0.4)
    C(chime((83,), 0, 0.4), ws("send it") + 0.55, 0.22, 0.5)
    C(chime((88, 95), 0.08, 0.8), ws("directly") + 0.3, 0.35, 0.6)
    # 09 intent — fall away, ticks
    C(whoosh(0.45), cut("so your team", 0, 0.25), 0.3)
    C(whoosh(0.8, False), ws("only on people"), 0.3)
    for k, p in enumerate(["people", "who have", "already", "shown"]): C(blip(1200 + 150 * k, 0.08), ws(p), 0.3)
    C(impact(0.7, 150, 60), ws("real buying"), 0.4)
    # 10 workspace — highlights, loupe, click
    C(whoosh(0.45), cut("you get the project", 0, 0.25), 0.3)
    for p in [("details", 1), ("deadline", 1), ("contact", 1), ("artwork", 1)]: C(blip(1100, 0.09), ws(*p), 0.22)
    C(machine(1.2), ws("artwork", 1), 0.08)
    C(click(), ws("starts"), 0.5, 0.4)
    # 11 reveal — pull back + swell + sonic logo
    C(whoosh(1.0, False), cut("that's the madvert", 0, 0.3), 0.35)
    C(sonic_logo(), ws("patches"), 0.65)
    C(impact(0.9, 120, 45), ws("patches"), 0.4)
    # 12 system — pulses
    for k in range(8): C(blip(900 + 100 * k, 0.07), ws("we handle") + 0.1 + k * 0.06, 0.12, np.sin(k))
    C(impact(0.6, 160, 60), ws("handle"), 0.3)
    # 13 burdens — a thud per card
    C(whoosh(0.45), cut("and the best part", 0, 0.25), 0.3)
    for k, p in enumerate([("ad spend", 0), ("creatives", 0), ("funnels", 0), ("crm", 1), ("automations", 1)]):
        C(impact(0.4, 200 - 15 * k, 90), ws(*p), 0.28, -0.6 + 0.3 * k)
    C(whoosh(0.6, False), ws("separately"), 0.3)
    # 14 one model — collapse whoomp + resolve
    C(riser(0.8), cut("everything is built", 0, 0.25), 0.22)
    C(impact(1.0, 110, 40), ws("everything is built") + 0.95, 0.5); C(sub(1.0, 42), ws("everything is built") + 0.95, 0.4)
    C(chime((77, 84, 89), 0.07, 1.2), ws("one simple model"), 0.3)
    # 15 pay per qualified RFQ — quiet, then the strongest hit
    for k, p in enumerate(["pay", "per"]): C(impact(0.5, 180, 70), ws(p), 0.35)
    C(impact(1.4, 100, 34), ws("rfq"), 0.8); C(sub(1.4, 36), ws("rfq"), 0.6)
    C(chime((89, 96), 0.06, 1.4), ws("rfq") + 0.1, 0.25)
    # 16 activity vs orders
    C(whoosh(0.45), cut("so instead", 0, 0.25), 0.3)
    C(blip(300, 0.3), ws("activity") + 0.35, 0.25)
    for k in range(3): C(pop(), ws("you're paying") + k * 0.25, 0.25, 0.5)
    C(whoosh(0.7, False), ws("real potential") - 0.1, 0.3); C(impact(0.7, 150, 60), ws("real potential"), 0.4)
    # 17 scale + CTA
    C(whoosh(0.6), cut("if you're serious", 0, 0.25), 0.35)
    C(machine(6.5), ws("scaling"), 0.1)
    for k in range(6): C(pop(), ws("custom patch", 1) + k * 0.75, 0.28, -0.4)
    C(riser(1.4), ws("book a discovery") - 1.35, 0.3)
    C(impact(1.0, 130, 45), ws("book a discovery"), 0.5)
    C(click(), ws("call") + 0.1, 0.6, 0.3)
    C(sonic_logo(), ws("madvert", 2) + 0.2, 0.8)
    C(chime((89,), 0, 1.4), we("today") + 1.25, 0.18)
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
