"""Billys Custom Patches — Ad 01 (lion): the SAME beat as the Custom Patch Lab
Ad 01 score (scripts/sound-design-ad01.py), played on a daf instead of music.

Client requirement: no music. Every rhythmic hit sits on exactly the same grid
position as the original (120 BPM, half-time groove from the 3.0 s drop to the
16.0 s logo, rolls into each cut, breaths at 14.5 s and 15.5 s):
  kick → daf dum · clap → daf tak · hi-hats → finger taps (ka) · rim → light tak
Removed (tonal / musical): 808 bass, pads, pluck melody, logo bells, the tone
inside the risers. Sound design (impacts, whooshes, fabric) is kept, with risers
replaced by breath-like air swells and the logo sparkle by a noise-grain shimmer.
"""
import os
import sys

import numpy as np
from scipy.io import wavfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfxlib  # noqa: E402
from sfxlib import bus, fabric, filt, impact, place, reverb, reverb_ir, reverse_swell, t_axis, text_swish, whoosh  # noqa: E402

DUR = 19.0
sfxlib.configure(DUR, seed=1901)
import naturalsfx as nx  # noqa: E402

N, SR = sfxlib.N, sfxlib.SR
BPM = 120
BEAT = 60 / BPM
STEP = BEAT / 4
CUTS = [3.0, 6.0, 9.0, 12.0, 15.0, 16.0]
TEXT_HITS = [0.5, 4.0, 6.5, 10.0, 12.5, 15.25, 16.5, 17.0]

daf = bus()
sfx = bus()

# ---------------------------------------------------------------- groove (same grid as Ad 01)
for k in range(int((16.0 - 3.0) / STEP)):
    t = 3.0 + k * STEP
    step = k % 16
    if 14.5 <= t < 15.0 or 15.5 <= t < 16.0:  # breaths, as in the original
        continue
    pan = nx.rng().uniform(-0.1, 0.1)
    if step in (0, 7, 10) or (step == 13 and (k // 16) % 2 == 1):      # kick
        place(daf, nx.daf_dum(1.0 if step == 0 else 0.8), t, 0.9, pan=pan)
    if step == 8:                                                     # clap
        place(daf, nx.daf_tak(1.1), t, 0.8, pan=pan)
    near_cut = any(0 < c - t <= 0.5 for c in CUTS)
    if step % 2 == 0 and step not in (0, 8):                          # hats → finger taps
        place(daf, nx.daf_ka(1.0 if step % 4 == 0 else 0.7), t, 0.7, pan=0.2)
    elif step % 2 == 1 and near_cut:                                  # 16th/32nd rolls into each cut
        place(daf, nx.daf_ka(0.8), t, 0.6, pan=0.2)
        place(daf, nx.daf_ka(0.6), t + STEP / 2, 0.5, pan=0.2)
    if step == 12 and (k // 16) % 2 == 0:                             # rim
        place(daf, nx.daf_tak(0.6), t + STEP, 0.5, pan=-0.3)

# ---------------------------------------------------------------- sound design (as Ad 01)
place(sfx, impact(1.25, 70, 28, 2.8), 0.0, 1.0)
place(sfx, fabric(2.9, density=70, level=0.20), 0.05, 1.0, pan=-0.15)
for i in range(4):  # count-in into the drop (was rim ticks)
    place(daf, nx.daf_tak(0.5 + i * 0.12), 1.0 + i * 0.5, 0.45, pan=0.35)
place(sfx, nx.air_swell(1.5, 250, 4000), 1.5, 0.7)
place(daf, nx.daf_roll(0.5), 2.5, 0.6)
place(sfx, reverse_swell(0.6), 2.4, 0.5)

place(sfx, impact(0.75, 90, 40, 1.4), 3.0, 0.75)
place(sfx, whoosh(0.55, 300, 6500), 3.0 - 0.55 * 0.75, 0.9, pan=-0.2)
place(sfx, whoosh(0.5, 4000, 400, peak=0.7), 6.0 - 0.35, 0.85, pan=0.3)
place(sfx, fabric(2.8, density=90, bright=(500, 3200), level=0.32), 6.15, 1.0, pan=0.2)
place(sfx, whoosh(0.7, 500, 9000, peak=0.65, q=1.1), 9.0 - 0.45, 0.85, pan=-0.4)
place(sfx, impact(0.6, 80, 42, 1.2), 12.0, 0.6)
place(sfx, whoosh(0.4, 200, 3000, peak=0.8), 12.0 - 0.32, 0.6)
place(sfx, nx.air_swell(1.0, 300, 4500), 14.0, 0.65)
place(daf, nx.daf_roll(0.45), 14.55, 0.6)
place(sfx, impact(0.7, 110, 45, 1.0), 15.0, 0.8)
place(daf, nx.daf_dum(1.1), 15.0, 0.85)
place(sfx, whoosh(0.45, 600, 7000, peak=0.7), 15.0 - 0.31, 0.6, pan=0.4)
place(sfx, reverse_swell(0.5), 15.5, 0.7)
place(daf, nx.daf_roll(0.45), 15.55, 0.65)

# logo reveal: impact + daf flourish + shimmer (replaces 808, kick and bell chord)
place(sfx, impact(1.1, 75, 30, 2.6), 16.0, 0.95)
place(daf, nx.daf_dum(1.25), 16.0, 0.95)
for i, w in enumerate((0.8, 0.6, 0.9)):
    place(daf, nx.daf_tak(w), 16.0 + 0.125 * (i + 1), 0.55, pan=-0.2 + i * 0.2)
place(sfx, nx.grain_shimmer(1.6), 16.05, 0.9)
# CTA beats in the outro: soft dums + taps (was soft kick + hats), final low button
for t in (17.0, 18.0):
    place(daf, nx.daf_dum(0.65), t, 0.6)
for k in range(int(2.4 / (BEAT / 2))):
    place(daf, nx.daf_ka(0.6 if k % 2 else 0.8), 16.5 + k * BEAT / 2, 0.5, pan=0.2)
place(daf, nx.daf_tak(0.8), 17.5, 0.5)
place(sfx, impact(0.5, 70, 38, 1.0), 18.5, 0.45)

for t in TEXT_HITS:
    place(sfx, text_swish(), t - 0.08, 0.55, pan=nx.rng().uniform(-0.3, 0.3))

# ---------------------------------------------------------------- mix
ir_room = reverb_ir(1.4, 4.2, 5500)
ir_hall = reverb_ir(2.6, 2.4, 7000)
mix = daf * 0.95 + reverb(daf, ir_room) * 0.12 + sfx * 0.85 + reverb(sfx, ir_hall) * 0.16 + nx.room_tone(DUR, 0.01)
mix = filt(mix, 'highpass', 26)
mix = np.tanh(mix * 1.1) / 1.1
fade = int(0.35 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)[:, None] ** 1.5
mix /= np.max(np.abs(mix)) / 0.89
wavfile.write(sys.argv[1], SR, mix.astype(np.float32))
print('wrote', sys.argv[1], f'{DUR}s')
