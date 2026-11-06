"""Markhor hyper-cut reels: rhythmic sound bed from sound effects only (NO MUSIC,
NO VO, nothing tonal or melodic). Every cut in the EDL gets a crisp 'tish'
(filtered noise transient, no pitched body); downbeats get a subtle low impact;
0.25 s runs get mechanical clicks; a short drop-out precedes the hero / CTA."""
import numpy as np

import sfxlib
from sfxlib import filt, noise, norm, place, t_axis

SR = sfxlib.SR


def tish(bright=1.0, dur=0.11):
    """The 'TISH': crisp noise burst, 2.5–11 kHz, fast attack, short tail."""
    t = t_axis(dur)
    x = filt(noise(dur), 'bandpass', [2500, 11000], 2)
    env = np.minimum(1, t / 0.0015) * np.exp(-t / (0.022 * bright))
    snap = filt(noise(dur), 'highpass', 6000) * np.exp(-t / 0.003) * 0.6
    return norm(x * env + snap) * 0.5


def tock():
    """Mechanical click (hoop / latch): band-limited noise tick, no tone."""
    t = t_axis(0.05)
    return filt(noise(0.05), 'bandpass', [1200, 5200]) * np.exp(-t / 0.004) * 0.6


def thump(weight=1.0):
    """Subtle low impact: lowpassed noise thud (not a pitched kick)."""
    t = t_axis(0.35)
    x = filt(noise(0.35), 'lowpass', 160, 4)
    return norm(x * np.minimum(1, t / 0.003) * np.exp(-t / 0.07)) * 0.6 * weight


def grid(fx, cuts_s, fast_s=(), downbeats_s=(), tish_gain=0.42, thump_gain=0.35, rng=None):
    for c in cuts_s:
        pan = rng.uniform(-0.25, 0.25) if rng is not None else 0.0
        place(fx, tish(1.0), c, tish_gain, pan=pan)
    for c in fast_s:
        place(fx, tock(), c, 0.32)
    for c in downbeats_s:
        place(fx, thump(1.0), c, thump_gain)


def dropout(x, at_s, dur_s=0.14):
    """Silence a short window (anticipation before a hit)."""
    t = np.arange(len(x)) / SR
    m = 1 - np.clip(1 - np.abs(t - (at_s - dur_s / 2)) / (dur_s / 2), 0, 1) ** 0.5
    x *= m[:, None]
    return x
