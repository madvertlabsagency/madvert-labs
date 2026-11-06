"""Markhor Patches — Reel 02 sound design. NO MUSIC, NO VOICEOVER. See markhor_audio.py."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('r2', seed=8802)
import naturalsfx as nx  # noqa: E402  (after configure: shares the rng)

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
CUTS = [fr(c) for c in EDL['cuts']]
CARD = CUTS[-1]
t = np.arange(N) / SR
bed, fx = bus(), bus()

# bed: the clip's own machine / handling audio; b2 is played at 0.6x with the picture's ramp
m3 = ma.clip_audio('m3.mp4')
for s in EDL['shots']:
    rate = 0.6 if s['id'] == 'b2' else (0.82 if s['id'] == 'c' else 1.0)
    ma.lay(bed, m3, fr(s['from']), s['srcIn'], fr(s['frames']) + (0.4 if s['id'] == 'c' else 0), rate=rate)
bed = ma.level(bed, 0.10, CARD)
bed *= np.clip(1 - (t - (CARD - 0.2)) / 0.7, 0, 1)[:, None] ** 1.5

place(fx, nx.stitch_stroke(1.0), 0.0, 0.45)
place(fx, nx.stitch_stroke(0.9), CUTS[0], 0.4)
place(fx, sfxlib.fabric(1.6, density=40, bright=(500, 3000), level=0.2), CUTS[0] + 0.1, 0.5)   # pile brushing
place(fx, nx.air(0.5, 300, 2400), CUTS[1] - 0.2, 0.22)                                          # ramp down
place(fx, nx.air(0.34, 420, 3800), CUTS[2] - 0.22, 0.32)                                        # vertical whip
place(fx, nx.cloth(0.8, 220, 1500, 0.3), CUTS[2] + 0.05, 0.45)
place(fx, nx.air_swell(0.7, 300, 3200), CARD - 0.55, 0.24)
place(fx, nx.soft_hit(1.0, 1.4), CARD + fr(12), 0.42)
place(fx, nx.ui_click(0.7), CARD + fr(30), 0.2)
place(fx, nx.room_tone(3.5, 0.010), CARD - 0.5, 1.0)
ma.finish(sys.argv[1], bed, fx)
