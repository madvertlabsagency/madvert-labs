"""Markhor hyper-cut h1 — sound design (see markhor_beat.py). NO MUSIC, NO VO."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import markhor_beat as mb  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('h1', seed=9100)
import naturalsfx as nx  # noqa: E402

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
t = np.arange(N) / SR
SH = {s['id']: s for s in EDL['shots']}
bed, fx = bus(), bus()
CARD = fr(270)
cuts = [fr(s['from']) for s in EDL['shots']] + [CARD]
fast = [fr(SH[k]['from']) for k in ('s1', 's2', 's3', 's4', 's5', 's6')]
down = [fr(x) for x in (0, 30, 60, 90, 120, 150, 180, 228)]
mb.grid(fx, cuts, fast, down, rng=sfxlib.rng)
# texture foley under each material
for k, lo, hi in (('emb1', 600, 4200), ('pvc1', 300, 1600), ('che1', 400, 2600), ('wov', 500, 3800), ('lea', 250, 1800)):
    s = SH[k]
    place(fx, sfxlib.fabric(fr(s['frames']), density=30, bright=(lo, hi), level=0.14), fr(s['from']), 0.5)
place(fx, nx.air(0.28, 450, 4200), fr(228) - 0.2, 0.3)
place(fx, nx.air_swell(0.35, 400, 4000), CARD - 0.3, 0.3)
place(fx, nx.soft_hit(1.0, 1.2), CARD + fr(6), 0.18)
place(fx, nx.ui_click(0.8), CARD + fr(28), 0.22)
bed = nx.room_tone(N / SR, 0.012)
mix_fx = mb.dropout(fx, fr(228), 0.12)
mix_fx = mb.dropout(mix_fx, CARD, 0.12)
ma.finish(sys.argv[1], bed, mix_fx, fx_gain=1.0, verb=0.1)
