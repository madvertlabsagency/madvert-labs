"""Markhor hyper-cut h4 — sound design (see markhor_beat.py). NO MUSIC, NO VO."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import markhor_beat as mb  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('h4', seed=9100)
import naturalsfx as nx  # noqa: E402

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
t = np.arange(N) / SR
SH = {s['id']: s for s in EDL['shots']}
bed, fx = bus(), bus()
COLL, CARD = fr(150), fr(240)
cuts = [fr(s['from']) for s in EDL['shots']]
fast = [fr(x) for x in (0, 8, 16, 24)]
down = [fr(x) for x in (0, 32, 62, 92, 107)]
mb.grid(fx, cuts, fast, down, rng=sfxlib.rng)
place(fx, sfxlib.fabric(fr(43), density=30, bright=(300, 2200), level=0.14), fr(107), 0.5)
# collection: strip wipe + four tile slams on 8-frame hits
place(fx, nx.air(0.3, 450, 4200), COLL - 0.22, 0.34)
for k in range(4):
    a = COLL + fr(k * 8)
    place(fx, mb.tish(0.8), a, 0.4)
    place(fx, mb.thump(0.7), a, 0.25)
    place(fx, nx.cloth(0.2, 300, 2400, 0.3), a, 0.25)
place(fx, mb.tish(1.2), COLL + fr(38), 0.4)   # THE PATCH DROP.
place(fx, mb.thump(1.0), COLL + fr(42), 0.35)
place(fx, nx.air_swell(0.35, 400, 4000), CARD - 0.3, 0.28)
place(fx, nx.soft_hit(1.0, 1.2), CARD + fr(6), 0.18)
place(fx, nx.ui_click(0.8), CARD + fr(28), 0.22)
bed = nx.room_tone(N / SR, 0.012)
fx = mb.dropout(fx, COLL, 0.12)
fx = mb.dropout(fx, CARD, 0.12)
ma.finish(sys.argv[1], bed, fx, fx_gain=1.0, verb=0.1)
