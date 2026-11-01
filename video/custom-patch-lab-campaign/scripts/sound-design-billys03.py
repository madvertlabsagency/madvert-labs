"""Billys Custom Patches — tiger ad (VO-led). NO MUSIC (client requirement).

Same structure as the Custom Patch Lab Ad 03 mix (scripts/sound-design-ad03.py):
the Billys voiceover on top with side-chain ducking, embroidery-machine foley
on the needle shots, fabric/air on the transitions — but the music bed (keys,
pads, 808, bells) is replaced by a daf (frame drum, no jingles) groove at the
same 100 BPM, and every tonal accent by an unpitched one. Times come from
src/billys/tiger/edl.json and vo-timing.json.
"""
import json
import os
import subprocess
import sys

import numpy as np
from scipy.io import wavfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfxlib  # noqa: E402
from sfxlib import bus, fabric, filt, impact, noise, place, reverb, reverb_ir, t_axis, text_swish, whoosh  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDL = json.load(open(os.path.join(ROOT, 'src/billys/tiger/edl.json')))
VO_MAP = json.load(open(os.path.join(ROOT, 'src/billys/tiger/vo-timing.json')))
VO_FILE = os.path.join(ROOT, 'assets/source/billys/audio/vo-tiger.mp3')
FPS = EDL['fps']
DUR = EDL['durationInFrames'] / FPS
sfxlib.configure(DUR, seed=3113)
import naturalsfx as nx  # noqa: E402

N, SR = sfxlib.N, sfxlib.SR
BEAT = 60 / EDL['bpm']
VO_AT = EDL['voOffsetFrames'] / FPS
CUTS = [c / FPS for c in EDL['cuts']]
DROP, OUTRO = CUTS[0], CUTS[10]


def w(i, word):
    for x in VO_MAP['phrases'][i]['words']:
        if x['w'].lower().replace('-', '').strip('.,?!') == word:
            return x['start'] + VO_AT
    raise KeyError(word)


# ---------------------------------------------------------------- voiceover + side-chain
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', VO_FILE, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
x = filt(np.frombuffer(raw, np.float32).astype(float), 'highpass', 75)
win = int(0.3 * SR)
rms = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, mode='same') + 1e-9)
gain = np.clip(np.percentile(rms[rms > 0.01], 60) / np.maximum(rms, 1e-4), 10 ** (-4 / 20), 10 ** (4 / 20))
vo = bus()
place(vo, x * np.convolve(gain, np.ones(win) / win, mode='same'), VO_AT, 1.0)
env = np.abs(vo[:, 0])
att, rel = np.exp(-1 / (0.012 * SR)), np.exp(-1 / (0.28 * SR))
side = np.zeros(N)
lvl = 0.0
for i in range(0, N, 48):
    v = env[i:i + 48].max(initial=0)
    lvl = att * lvl + (1 - att) * v if v > lvl else rel * lvl + (1 - rel) * v
    side[i:i + 48] = lvl
VO_END = VO_MAP['phrases'][-1]['end'] + VO_AT
side = np.clip(side / (np.percentile(side[side > 1e-3], 90) + 1e-9), 0, 1)
duck = lambda db: (10 ** (-db * side / 20))[:, None]  # noqa: E731


def needle(dur, rate=14.0):
    out = np.zeros(int(dur * SR))
    for k in range(int(dur * rate)):
        s = nx.stitch_stroke(0.9) * nx.rng().uniform(0.8, 1.0)
        i = int(k / rate * SR)
        out[i:i + len(s)] += s[: len(out) - i]
    t = np.arange(len(out)) / SR
    hum = (np.sin(2 * np.pi * 50 * t) * 0.5 + np.sin(2 * np.pi * 100 * t) * 0.25) * 0.06
    fade = np.minimum(1, np.minimum(t / 0.05, (dur - t) / 0.12))
    return (out + hum) * fade


# ---------------------------------------------------------------- daf groove (100 BPM, same tempo as Ad 02)
daf = bus()
place(daf, nx.daf_dum(1.0), 0.0, 0.7)                    # opening stroke under the impact
for i in range(int((DROP - 1.2) / (BEAT / 2))):          # finger taps counting into the drop
    place(daf, nx.daf_ka(0.5 + 0.05 * i), 1.2 + i * BEAT / 2, 0.45, pan=0.25)
place(daf, nx.daf_roll(0.5), DROP - 0.5, 0.55)
PATTERN = ['D', 'T', 'k', 'T', 'D', 'k', 'T', 'k']
STEP = BEAT / 2
for j in range(int((OUTRO - DROP) / STEP)):
    t = DROP + j * STEP
    if OUTRO - 0.4 <= t:
        continue
    hit = PATTERN[j % 8]
    pan = nx.rng().uniform(-0.1, 0.1)
    if hit == 'D':
        place(daf, nx.daf_dum(1.0 if j % 8 == 0 else 0.8), t, 0.75, pan=pan)
    elif hit == 'T':
        place(daf, nx.daf_tak(0.9), t, 0.55, pan=pan)
    else:
        place(daf, nx.daf_ka(1.0), t, 0.45, pan=pan)
place(daf, nx.daf_roll(0.4), OUTRO - 0.4, 0.6)
place(daf, nx.daf_dum(1.25), OUTRO, 0.9)                # logo
for i, word in ((7, 'embroidered'), (8, 'chenille'), (9, 'pvc'), (10, 'woven'), (10, 'printed')):
    place(daf, nx.daf_tak(1.0), w(i, word), 0.5)        # a stroke per patch type
for k, t in enumerate(np.arange(OUTRO + BEAT, VO_END + 0.2, BEAT)):   # light pulse under the CTA, silent for the final read
    place(daf, nx.daf_dum(0.6) if k % 2 == 0 else nx.daf_tak(0.6), t, 0.45)

# ---------------------------------------------------------------- sound design on picture
C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11 = CUTS
fx = bus()
place(fx, impact(1.2, 70, 28, 2.6), 0.0, 1.0)                                    # opening impact
place(fx, fabric(3.2, density=70, bright=(500, 3200), level=0.24), 0.15, 1.0, pan=0.15)  # gloves on the patch
place(fx, text_swish(), w(1, 'something') - 0.1, 0.5)
place(fx, whoosh(0.5, 300, 7000), C1 - 0.36, 0.75, pan=-0.6)                     # lateral match cut
place(fx, needle(C3 - C1 + 0.2), C1, 0.55, pan=0.05)                             # active stitching
place(fx, impact(0.5, 100, 45, 0.9), C2, 0.4)
place(fx, impact(0.55, 90, 42, 1.0), C3, 0.45)
place(fx, text_swish(), w(3, 'stand') - 0.1, 0.55)                                # STAND OUT
place(fx, nx.air(0.5, 1500, 7000), C4 - 0.35, 0.6, pan=0.4)                       # thread reveal
place(fx, fabric(1.3, density=45, bright=(2200, 9000), level=0.2), C4, 0.9, pan=-0.2)  # the sketch
place(fx, impact(0.75, 85, 38, 1.4), w(5, 'no') + 0.05, 0.7)                     # NO PROBLEM!
place(fx, whoosh(0.4, 700, 8000, peak=0.7), w(5, 'no') - 0.1, 0.45, pan=0.5)
place(fx, whoosh(0.35, 3000, 400, peak=0.6), C5 - 0.25, 0.5)
place(fx, fabric(2.4, density=80, bright=(500, 3000), level=0.28), C5 + 0.05, 1.0, pan=-0.2)
for i, word in ((7, 'embroidered'), (8, 'chenille'), (9, 'pvc'), (10, 'woven'), (10, 'printed')):  # type chips
    place(fx, nx.ui_click(1.0), w(i, word) - 0.02, 0.55, pan=-0.4 + 0.2 * i % 0.8)
place(fx, whoosh(0.6, 500, 9000, peak=0.65, q=1.1), C7 - 0.4, 0.65, pan=-0.4)   # editorial wipe
place(fx, needle(C9 - C7) * 0.35, C7, 0.6, pan=0.1)                             # machine under the quality lines
for i, word in ((11, 'premium'), (12, 'fast'), (13, 'businesses')):
    place(fx, text_swish(), w(i, word) - 0.08, 0.45)
place(fx, whoosh(0.5, 4000, 400, peak=0.7), C9 - 0.35, 0.7, pan=0.3)            # vertical whip
for i, word in ((16, 'hats'), (16, 'jackets'), (17, 'uniforms'), (17, 'clothing')):
    place(fx, nx.ui_click(0.8), w(i, word), 0.4)
place(fx, impact(0.45, 100, 50, 0.8), C10, 0.4)
place(fx, nx.air(0.4, 700, 6000), w(18, 'life') - 0.25, 0.5, pan=-0.5)
place(fx, nx.grain_shimmer(1.0), w(18, 'life'), 0.6)
place(fx, nx.air_swell(1.4, 250, 4000), C11 - 1.4, 0.45)
place(fx, impact(1.05, 75, 30, 2.6), C11, 0.85)                                  # brand reveal
place(fx, nx.grain_shimmer(1.2), C11 + 0.1, 0.5)
place(fx, impact(0.6, 80, 40, 1.4), w(20, 'get'), 0.45)                         # CTA lands
place(fx, nx.ui_click(1.0), w(21, "billy's"), 0.45)
place(fx, impact(0.5, 70, 36, 1.8), VO_END + 0.1, 0.4)

# ---------------------------------------------------------------- mix
ir_room = reverb_ir(1.4, 4.0, 5000)
ir_hall = reverb_ir(2.6, 2.4, 7000)
bed = (daf * 0.8 + reverb(daf, ir_room) * 0.1) * duck(12.0)
fxb = (fx + reverb(fx, ir_hall) * 0.15) * duck(9.0)
vo_bus = vo + reverb(vo, ir_room) * 0.035
mix = vo_bus * 1.9 + bed * 0.55 + fxb * 0.6 + nx.room_tone(DUR, 0.008)
mix = filt(mix, 'highpass', 24)
mix = np.tanh(mix * 1.05) / 1.05
fade = int(0.4 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)[:, None] ** 1.5
peak = np.max(np.abs(mix)) / 0.89
mix /= peak
out = sys.argv[1]
wavfile.write(out, SR, mix.astype(np.float32))
wavfile.write(out[:-4] + '-vo.wav', SR, (vo_bus * 1.9 / peak).astype(np.float32))
wavfile.write(out[:-4] + '-bed.wav', SR, ((bed * 0.55 + fxb * 0.6) / peak).astype(np.float32))
print('wrote', out, f'{DUR}s')
