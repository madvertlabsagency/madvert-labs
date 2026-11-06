"""Markhor hyper-cut h3 — sound design (see markhor_beat.py). NO MUSIC, NO VO."""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import markhor_beat as mb  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402

EDL = ma.setup('h3', seed=9100)
import naturalsfx as nx  # noqa: E402

FPS = EDL['fps']
fr = lambda f: f / FPS  # noqa: E731
N, SR = sfxlib.N, sfxlib.SR
t = np.arange(N) / SR
SH = {s['id']: s for s in EDL['shots']}
bed, fx = bus(), bus()
CARD = fr(270)
# bed: each shot's own machine audio (m1, m3, m6, m8 — all non-tonal)
clips = {k: ma.clip_audio(k) for k in ('m1.mp4', 'm3.mp4', 'm6.mp4', 'm8.mp4')}
for s in EDL['shots']:
    if s['id'] == 'hero':
        ma.lay(bed, clips['m6.mp4'], fr(s['from']), 4.9, fr(s['frames']) + 0.4)  # machine continues, easing off
    else:
        ma.lay(bed, clips[s['source']], fr(s['from']), s['srcIn'], fr(s['frames']))
bed = ma.level(bed, 0.09, CARD)
bed *= np.clip(1 - (t - (fr(210) + 0.4)) / 1.2, 0.25, 1)[:, None]
bed *= np.clip(1 - (t - (CARD - 0.2)) / 0.5, 0, 1)[:, None]
cuts = [fr(s['from']) for s in EDL['shots']] + [CARD]
fast = [fr(SH[k]['from']) for k in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6')]
down = [fr(x) for x in (0, 30, 60, 90, 120, 168, 210)]
mb.grid(fx, cuts, fast, down, tish_gain=0.38, rng=sfxlib.rng)
for s in EDL['shots']:  # a needle stroke on every hit
    if s['id'] != 'hero':
        place(fx, nx.stitch_stroke(1.0), fr(s['from']), 0.3)
place(fx, nx.air(0.3, 420, 3800), fr(30) - 0.2, 0.32)   # whip
place(fx, nx.cloth(0.6, 220, 1500, 0.3), fr(210), 0.4)
place(fx, nx.air_swell(0.35, 400, 4000), CARD - 0.3, 0.3)
place(fx, nx.soft_hit(1.0, 1.2), CARD + fr(6), 0.18)
place(fx, nx.ui_click(0.8), CARD + fr(28), 0.22)
bed = mb.dropout(bed, fr(168), 0.12)
fx = mb.dropout(fx, fr(168), 0.12)
fx = mb.dropout(fx, CARD, 0.12)
ma.finish(sys.argv[1], bed, fx, fx_gain=1.0, verb=0.1)
