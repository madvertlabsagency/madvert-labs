"""Markhor Patches campaign commercials — spec-driven sound design (NO MUSIC, NO VO).
Each cut's sound follows how the next shot enters (see src/markhor/commercial.tsx):
  cut / punch -> crisp 'tish'        impact -> drop-out, tish + low thud
  whip / zoom -> short air pass       slide  -> air push + cloth
  dissolve    -> soft air swell (no transient)
plus mechanical ticks on 0.25 s runs, needle strokes (ASMR reel), fabric
texture (texture reel), slams for the tile grid, and the end-card hit. Reels with
clean machine audio in their clips use it as the bed; nothing tonal is added."""
import json
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_audio as ma  # noqa: E402
import markhor_beat as mb  # noqa: E402
import sfxlib  # noqa: E402
from sfxlib import bus, place  # noqa: E402


def build(reel, out):
    edl = ma.setup(reel, seed=7000 + int(reel[1:]))
    import naturalsfx as nx
    fps = edl['fps']
    fr = lambda f: f / fps  # noqa: E731
    N, SR = sfxlib.N, sfxlib.SR
    snd = edl['sound']
    rng = sfxlib.rng
    bed, fx = bus(), bus()
    card = fr(edl['card']['from'])

    # bed
    room = nx.room_tone(N / SR, 0.012 if snd["bed"] == "clip" else 0.03)
    if snd['bed'] == 'clip':
        clips = {}
        for s in edl['shots']:
            name = s['source'][:-4]
            if name in snd.get('clip_ok', []):
                clips.setdefault(name, ma.clip_audio(s['source']))
                ma.lay(bed, clips[name], fr(s['from']), s['srcIn'], fr(s['frames']) + 0.1)
        if np.any(bed):
            bed = ma.level(bed, 0.085, card)
        t = np.arange(N) / SR
        bed *= np.clip(1 - (t - (card - 0.2)) / 0.5, 0, 1)[:, None]
    bed = bed + room

    # cuts
    for s in edl['shots']:
        c, tr = fr(s['from']), s['trans']
        pan = float(rng.uniform(-0.2, 0.2))
        if s['from'] == 0:
            place(fx, mb.tish(1.1), 0.0, 0.42)
            place(fx, mb.thump(1.0), 0.0, 0.32)
            continue
        if tr in ('cut', 'punch'):
            place(fx, mb.tish(1.0), c, 0.38 if s['frames'] > 10 else 0.3, pan=pan)
        elif tr == 'impact':
            place(fx, mb.tish(1.3), c, 0.45)
            place(fx, mb.thump(1.2), c, 0.45)
        elif tr in ('whip', 'zoom'):
            place(fx, nx.air(0.3, 420, 4000), c - 0.2, 0.32)
            place(fx, mb.tish(0.8), c, 0.26, pan=pan)
        elif tr == 'slide':
            place(fx, nx.air(0.26, 450, 4200), c - 0.05, 0.3)
            place(fx, nx.cloth(0.22, 300, 2400, 0.3), c + fr(5), 0.28)
        elif tr == 'dissolve':
            place(fx, nx.air_swell(0.5, 300, 2600), c - 0.3, 0.18)
        if s['from'] % 30 == 0 and s['frames'] > 10:
            place(fx, mb.thump(0.8), c, 0.22)
        if snd.get('needle'):
            place(fx, nx.stitch_stroke(1.0), c, 0.3)
        if snd.get('texture'):
            place(fx, sfxlib.fabric(fr(s['frames']), density=28, bright=(400, 3400), level=0.14), c, 0.5)
    for f in snd.get('fast', []):
        place(fx, mb.tock(), fr(f), 0.26)

    # highlight strips land with a tiny tick
    for tx in edl['text']:
        if tx['type'] == 'headline':
            for line in tx['lines']:
                for w in line:
                    if w.get('hi'):
                        place(fx, nx.ui_click(0.9), fr(w['at']), 0.12)

    # tile grid
    tiles = edl.get('tiles')
    if tiles:
        place(fx, nx.air(0.3, 450, 4200), fr(tiles['from']) - 0.2, 0.32)
        for i in range(len(tiles['items'])):
            a = fr(tiles['from'] + 2 + i * 6)
            place(fx, mb.tish(0.8), a, 0.34)
            place(fx, mb.thump(0.6), a, 0.2)
        place(fx, mb.thump(1.0), fr(tiles['from'] + 45), 0.3)

    # end card
    place(fx, nx.air_swell(0.4, 400, 4000), card - 0.35, 0.26)
    place(fx, nx.soft_hit(1.0, 1.2), card + fr(4), 0.16)
    place(fx, mb.tish(0.9), card + fr(4), 0.22)
    place(fx, nx.ui_click(0.8), card + fr(24), 0.22)

    for d in snd.get('drops', []):
        fx = mb.dropout(fx, fr(d), 0.12)
        bed = mb.dropout(bed, fr(d), 0.12)
    ir = sfxlib.reverb_ir(1.6, 4.0, 5200)
    fx = fx + sfxlib.reverb(fx, ir) * 0.1
    mix = limit(bed + fx, SR)
    ma.finish(out, mix, np.zeros_like(mix), fx_gain=0.0, verb=0.0)


def limit(x, SR, thr_db=-14.0, release=0.08):
    """Gentle peak limiter (instant attack, smooth release) relative to the mix peak,
    so sparse SFX-only reels reach the loudness target without harsh transients."""
    from scipy.signal import lfilter
    pk = np.max(np.abs(x)) + 1e-9
    thr = pk * 10 ** (thr_db / 20)
    a = np.max(np.abs(x), axis=1)
    over = np.maximum(a / thr, 1.0)
    # peak-hold then release smoothing of the gain-reduction curve
    k = np.exp(-1.0 / (release * SR))
    env = np.empty_like(over)
    e = 1.0
    for i in range(0, len(over), 64):  # block-wise (64-sample) for speed
        m = over[i:i + 64].max()
        e = m if m > e else e * k ** 64 + m * (1 - k ** 64)
        env[i:i + 64] = e
    env = lfilter([1 / 32] * 32, [1], env)  # 0.7 ms smoothing to avoid zipper
    return x / np.maximum(env, 1.0)[:, None]
