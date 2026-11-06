"""Markhor Patches — Reel 03 sound design. NO MUSIC, NO VOICEOVER. See markhor_audio.py."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('r3', seed=8803)
import naturalsfx as nx  # noqa: E402  (after configure: shares the rng)

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
CUTS = [fr(c) for c in EDL['cuts']]
CARD = CUTS[-1]
t = np.arange(N) / SR
bed, fx = bus(), bus()

# studio footage: no usable production sound, so a quiet studio room tone and
# unpitched product foley (ticks for the hook flashes, an air push + a soft
# "set down" for each carousel slide)
bed = nx.room_tone(EDL['durationInFrames'] / FPS, 0.02)
for i, c in enumerate([0, 8, 16, 24]):
    place(fx, nx.ui_click(1.1 - i * 0.1), fr(c), 0.42)
place(fx, nx.soft_hit(0.8, 1.0), 0.0, 0.12)
for c in CUTS[3:]:
    place(fx, nx.air(0.26, 450, 4200), c - fr(6) - 0.04, 0.34)
    place(fx, nx.cloth(0.25, 300, 2200, 0.3), c - 0.02, 0.32)
    place(fx, nx.soft_hit(0.5, 0.6), c, 0.07)
place(fx, nx.soft_hit(1.0, 1.4), CARD + fr(10), 0.16)
place(fx, nx.ui_click(0.7), CARD + fr(28), 0.22)
ma.finish(sys.argv[1], bed, fx, fx_gain=1.0, verb=0.12)
