"""Markhor Patches — Reel 04 sound design. NO MUSIC, NO VOICEOVER. See markhor_audio.py."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('r4', seed=8804)
import naturalsfx as nx  # noqa: E402  (after configure: shares the rng)

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
CUTS = [fr(c) for c in EDL['cuts']]
CARD = CUTS[-1]
t = np.arange(N) / SR
bed, fx = bus(), bus()

# macro montage: close, quiet room; each shot carries a soft thread / fabric
# texture, the lens pushes are short air passes
bed = nx.room_tone(EDL['durationInFrames'] / FPS, 0.018)
starts = [0.0] + CUTS[:-1]
for a, b in zip(starts, CUTS):
    place(fx, sfxlib.fabric(b - a, density=34, bright=(600, 3600), level=0.16), a, 0.55)
place(fx, nx.soft_hit(0.9, 1.2), 0.0, 0.14)
for c in CUTS[:-1]:
    place(fx, nx.air(0.3, 380, 3800), c - 0.18, 0.3)
place(fx, nx.air_swell(0.6, 300, 3200), CARD - 0.4, 0.26)
place(fx, nx.soft_hit(1.0, 1.4), CARD + fr(12), 0.16)
place(fx, nx.ui_click(0.7), CARD + fr(30), 0.22)
ma.finish(sys.argv[1], bed, fx, fx_gain=1.0, verb=0.14)
