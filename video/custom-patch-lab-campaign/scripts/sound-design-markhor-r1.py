"""Markhor Patches — Reel 01 sound design. NO MUSIC, NO VOICEOVER. See markhor_audio.py."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('r1', seed=8801)
import naturalsfx as nx  # noqa: E402  (after configure: shares the rng)

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
CUTS = [fr(c) for c in EDL['cuts']]
CARD = CUTS[-1]
t = np.arange(N) / SR
bed, fx = bus(), bus()

# bed: the clip's own machine audio, cut with the picture
m1 = ma.clip_audio('m1.mp4')
for s in EDL['shots']:
    ma.lay(bed, m1, fr(s['from']), s['srcIn'], fr(s['frames']) + (0.5 if s['id'] == 'd' else 0))
bed = ma.level(bed, 0.11, CARD)
bed *= np.clip(1 - (t - (CARD - 0.3)) / 0.8, 0, 1)[:, None] ** 1.5   # machine eases off into the card

place(fx, nx.stitch_stroke(1.0), 0.0, 0.45)
place(fx, nx.stitch_stroke(1.1), CUTS[0], 0.5)
place(fx, nx.air(0.36, 380, 3600), CUTS[1] - 0.24, 0.3)
place(fx, nx.stitch_stroke(1.0), CUTS[2], 0.45)
place(fx, nx.air_swell(0.7, 300, 3200), CARD - 0.6, 0.26)
place(fx, nx.soft_hit(1.0, 1.4), CARD + fr(6), 0.42)
place(fx, nx.ui_click(0.7), CARD + fr(22), 0.2)
place(fx, nx.room_tone(3.5, 0.010), CARD - 0.5, 1.0)
ma.finish(sys.argv[1], bed, fx)
