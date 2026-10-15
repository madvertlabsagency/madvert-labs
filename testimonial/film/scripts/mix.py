"""Testimonial audio: cleaned dialogue + soft piano/pad bed (synthesized) with ducking,
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

def lp(x, fc):
    a = 1 - np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s += a * (x[i] - s); y[i] = s
    return y

def piano(n, d=2.6, v=1.0):
    t = t_(d); f = note(n)
    y = sum(np.sin(2 * np.pi * f * k * t) * (0.6 ** (k - 1)) * np.exp(-t * (1.6 + 0.9 * k)) for k in range(1, 6))
    y *= np.minimum(1, t / 0.004)
    return y * v

def place(buf, x, at, g=1.0, pan=0.0):
    i = int(at * SR)
    if i >= buf.shape[1]: return
    j = min(buf.shape[1], i + len(x)); x = x[: j - i]
    buf[0, i:j] += x * g * np.cos((pan + 1) * np.pi / 4) * 1.41; buf[1, i:j] += x * g * np.sin((pan + 1) * np.pi / 4) * 1.41

# 72 BPM, I–V–vi–IV in D major, warm and positive
BPM = 72; BEAT = 60 / BPM; BAR = 4 * BEAT
prog = [(50, 54, 57, 62), (45, 49, 52, 57), (47, 50, 54, 59), (43, 47, 50, 55)]
m = np.zeros((2, N))
# pad: slow detuned sines through a soft filter
pad = np.zeros(N); tl = np.arange(N) / SR
for b in range(int(DUR / BAR) + 1):
    ch = prog[b % 4]; s0 = int(b * BAR * SR); s1 = min(N, int((b + 1) * BAR * SR) + int(0.6 * SR))
    if s0 >= N: break
    tt = np.arange(s1 - s0) / SR
    env = np.minimum(1, tt / 0.8) * np.minimum(1, np.maximum(0, (BAR + 0.6 - tt)) / 0.8)
    y = sum(np.sin(2 * np.pi * note(n + 12) * (1 + dt) * tt) for n in ch for dt in (-0.003, 0.003)) / 8
    pad[s0:s1] += y * env
m += pad * 0.35
# piano: gentle arpeggio, sparser at the start, fuller over the results and the end card
k = 0
while k * BEAT / 2 < DUR - 1:
    at = k * BEAT / 2; ch = prog[int(at / BAR) % 4]
    dense = at > 40
    if k % 2 == 0 or dense:
        n = ch[(k * 2) % 4] + 24 + (12 if (k % 8 == 6) else 0)
        place(m, piano(n, 2.4, 0.55 if k % 2 else 0.8), at, 0.22, 0.4 * np.sin(k))
    if k % 8 == 0: place(m, piano(ch[0] + 12, 3.2, 0.9), at, 0.22, -0.2)
    k += 1
m /= np.abs(m).max() + 1e-9
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
