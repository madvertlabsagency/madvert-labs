"""Billys Custom Patches — 15 s laser-cutting reel: NO MUSIC, NO VOICEOVER.

The bed is the clip's own recorded laser / extraction sound (laser-cut.mp4), cut with
the picture: every shot plays the audio of its own source range, joined with
short crossfades, joined with short crossfades. On top, a few synthesized accents (naturalsfx,
unpitched): a faint tick on each in-section cut, soft air whooshes on section
changes, cloth as the patch lifts off the bed and presses onto the cap; at the
end card the machine fades into room tone with one soft low hit under the logo.
"""
import json
import os
import subprocess
import sys

import numpy as np
from scipy.io import wavfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfxlib  # noqa: E402
from sfxlib import bus, filt, place, reverb, reverb_ir  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDL = json.load(open(os.path.join(ROOT, 'src/billys/reel15laser/edl.json')))
FPS = EDL['fps']
DUR = EDL['durationInFrames'] / FPS
sfxlib.configure(DUR, seed=1516)
import naturalsfx as nx  # noqa: E402  (after configure: shares the rng)

N, SR = sfxlib.N, sfxlib.SR
fr = lambda f: f / FPS  # noqa: E731
CARD = fr(EDL['cuts'][-1])

src = os.path.join(ROOT, 'assets/source/billys/reel15laser/footage/laser-cut.mp4')
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
machine = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)
machine = filt(machine, 'highpass', 45)  # clear any sub rumble; nothing else is touched

bed, fx = bus(), bus()
XF = int(0.012 * SR)


def lay(start_s, src_s, dur_s, gain=1.0):
    """Source audio from src_s for dur_s, placed at start_s with 12 ms fades."""
    i0 = int(src_s * SR)
    n = int(dur_s * SR) + XF
    seg = machine[i0:i0 + n].copy()
    if len(seg) < n:  # wrap from 2 s earlier if the range runs off the clip
        seg = np.concatenate([seg, machine[i0 - 2 * SR:i0 - 2 * SR + n - len(seg)]])
    ramp = np.linspace(0, 1, XF)[:, None]
    seg[:XF] *= ramp
    seg[-XF:] *= ramp[::-1]
    place(bed, seg, start_s, gain)


for s in EDL['shots']:
    lay(fr(s['from']), s['srcIn'], fr(s['frames']))

# authentic sound leads: bring the quiet recording up to a 0.11 RMS working level
act = bed[: int(fr(EDL['cuts'][-1]) * SR)]
bed *= 0.11 / np.sqrt(np.mean(act ** 2))

# machine winds down into the end card
t = np.arange(N) / SR
env = np.clip(1 - (t - (CARD - 0.25)) / 0.9, 0, 1) ** 1.6
bed *= env[:, None]

# ---------------------------------------------------------------- accents
cuts = [fr(c) for c in EDL['cuts']]
SECTION = [fr(90), fr(180), fr(270)]
for c in cuts[:-1]:
    if c in SECTION:
        place(fx, nx.air(0.38, 380, 3600), c - 0.26, 0.3)
    else:
        place(fx, nx.ui_click(0.6), c, 0.16, pan=nx.rng().uniform(-0.2, 0.2))
place(fx, nx.cloth(0.6, 250, 1700, 0.3), fr(186), 0.55)     # patch lifts off the honeycomb bed
place(fx, nx.cloth(0.8, 200, 1400, 0.3), fr(282), 0.6)      # pressed onto the cap
place(fx, nx.air_swell(0.9, 250, 2600), CARD - 0.75, 0.22)  # into the card
place(fx, nx.soft_hit(1.0, 1.4), CARD + fr(6), 0.42)        # logo lands
place(fx, nx.ui_click(0.7), CARD + fr(26), 0.22)            # CTA chip
place(fx, nx.room_tone(DUR - CARD + 0.5, 0.010), CARD - 0.5, 1.0)

ir = reverb_ir(1.6, 4.0, 5200)
fx = fx + reverb(fx, ir) * 0.16
mix = bed * 1.0 + fx * 0.9
fade = np.clip((DUR - t) / 0.35, 0, 1)[:, None]
mix *= fade
mix /= max(1e-9, np.max(np.abs(mix))) / 0.7
wavfile.write(sys.argv[1], SR, mix.astype(np.float32))
print('wrote', sys.argv[1])
