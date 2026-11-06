"""Markhor Patches flagship cuts — soundtrack: daf (frame drum) percussion, natural
embroidery-machine audio, foley and UI clicks. No melodic instruments, no synths.

Structure follows the spec's `sound.sections` (frame ranges + mode):
  open   hits only on the cuts, a roll into the website reveal
  hook   busy 16th-note daf for the 15 s ad's opening
  groove maqsum pattern (D T . T D . T .) with ka ghost notes
  warm   lighter baladi-style pattern under the personalisation section
  full   maqsum + 16th ka + a dum on every material cut
  half   half-time (space for the VO and the website clicks)
  build  maqsum with a crescendo and a roll into the logo
  tail   final impact on the logo, then a sparse decay

Voiceover / vocal stems: if public/audio/markhor-<cut>-vo.wav exists it is laid
in at 0 s and everything else is side-chain ducked under it (about 7 dB);
public/audio/markhor-<cut>-vox.wav (wordless vocal layer) is mixed under the
drums and ducked the same way. Without them the mix plays as-is."""
import json
import os
import subprocess
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import lfilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfxlib  # noqa: E402
from sfxlib import bus, filt, place  # noqa: E402
import markhor_beat as mb  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_wav(path, SR):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)


def envelope(x, SR, att=0.03, rel=0.25):
    a = np.abs(x).max(axis=1)
    ka, kr = np.exp(-1 / (att * SR)), np.exp(-1 / (rel * SR))
    out = np.empty_like(a)
    e = 0.0
    for i in range(0, len(a), 32):
        m = a[i:i + 32].max()
        e = m + (e - m) * (ka ** 32 if m > e else kr ** 32)
        out[i:i + 32] = e
    return out


def limit(x, SR, thr_db=-10.0, release=0.08):
    pk = np.max(np.abs(x)) + 1e-9
    thr = pk * 10 ** (thr_db / 20)
    over = np.maximum(np.max(np.abs(x), axis=1) / thr, 1.0)
    k = np.exp(-1.0 / (release * SR))
    env = np.empty_like(over)
    e = 1.0
    for i in range(0, len(over), 64):
        m = over[i:i + 64].max()
        e = m if m > e else e * k ** 64 + m * (1 - k ** 64)
        env[i:i + 64] = e
    env = lfilter([1 / 32] * 32, [1], env)
    return x / np.maximum(env, 1.0)[:, None]


def build(cut, out):
    spec = json.load(open(os.path.join(ROOT, f'src/markhor/{cut}/edl.json')))
    fps = spec['fps']
    dur = spec['durationInFrames'] / fps
    sfxlib.configure(dur, seed=4242)
    import naturalsfx as nx
    N, SR = sfxlib.N, sfxlib.SR
    rng = sfxlib.rng
    fr = lambda f: f / fps  # noqa: E731
    t = np.arange(N) / SR
    daf, fx, bed = bus(), bus(), bus()
    snd = spec['sound']
    STEP = 0.25  # 8th note at 120 BPM

    def hit(kind, at, g=1.0, pan=None):
        pan = float(rng.uniform(-0.15, 0.15)) if pan is None else pan
        if kind == 'D':
            place(daf, nx.daf_dum(1.0), at, 0.55 * g, pan=pan * 0.3)
            place(daf, nx.daf_ka(0.8), at, 0.25 * g, pan=pan * 0.3)       # skin attack so the dum reads on phones
        elif kind == 'T':
            place(daf, nx.daf_tak(0.95), at, 0.7 * g, pan=pan)
        elif kind == 'k':
            place(daf, nx.daf_ka(1.0), at, 0.5 * g, pan=pan)

    PAT = {
        'groove': (['D', 'T', '.', 'T', 'D', '.', 'T', '.'], 0.85, 0.5),
        'full': (['D', 'T', 'k', 'T', 'D', 'k', 'T', 'k'], 1.0, 0.8),
        'warm': (['D', 'k', '.', 'T', 'k', 'k', 'T', 'k'], 0.75, 0.5),
        'half': (['D', 'k', 'T', 'k', 'T', 'k', 'k', 'k', 'D', 'k', 'T', 'k', 'T', 'k', 'T', 'k'], 0.8, 0.6),
        'open': (['T', 'k', '.', 'k', 'T', 'k', '.', 'k'], 0.7, 0.5),
        'build': (['D', 'T', 'k', 'T', 'D', 'k', 'T', 'k'], 1.0, 0.8),
        'hook': (['D', 'k', 'T', 'k', 'D', 'T', 'k', 'T'], 1.0, 0.9),
    }
    for a, b, mode in snd['sections']:
        A, B = fr(a), fr(b)
        if mode in PAT:
            pat, gain, ghost = PAT[mode]
            j = 0
            while A + j * STEP < B - 0.01:
                at = A + j * STEP
                g = gain * (0.65 + 0.35 * (at - A) / max(0.1, B - A)) if mode == 'build' else gain
                h = pat[j % len(pat)]
                if h != '.':
                    hit(h, at, g)
                hit('k', at + STEP / 2, ghost * g * 0.6 * (1.0 if mode in ('full', 'build', 'hook') or j % 2 else 0.6))  # 16th ghost notes
                j += 1
            if mode == 'build':
                place(daf, nx.daf_roll(1.2), B - 1.2, 0.75)
            if mode == 'open':
                place(daf, nx.daf_roll(0.5), B - 0.55, 0.7)
        elif mode == 'tail':
            place(daf, nx.daf_dum(1.4), A, 1.0)                       # FINAL IMPACT on the logo
            place(fx, nx.soft_hit(1.4, 1.8), A, 0.5)
            place(fx, mb.thump(1.3), A, 0.5)
            place(fx, mb.tish(1.3), A, 0.35)
            for k, at in enumerate(np.arange(A + 0.5, B - 0.3, 0.5)):   # decaying pulse under the end card
                hit('D' if k % 4 == 0 else 'T' if k % 2 else 'k', at, 0.75 * (1 - k * 0.1))
                hit('k', at + 0.25, 0.4 * (1 - k * 0.1))
            place(daf, nx.daf_roll(1.4), A + 0.2, 0.35)
            place(daf, nx.daf_tak(1.0), A + fr(26), 0.4)               # CTA lands

    # accents on every cut (the hits the edit is cut to)
    items = sorted(spec['shots'] + spec['web'], key=lambda s: s['from'])
    for s in items:
        c = fr(s['from'])
        tr = s.get('trans', 'web')
        if s['frames'] <= 10:
            hit('k', c, 1.4); place(fx, mb.tock(), c, 0.25)
        elif tr == 'impact':
            hit('D', c, 1.25); place(fx, mb.thump(1.0), c, 0.4); place(fx, mb.tish(1.1), c, 0.3)
        elif tr in ('punch', 'cut'):
            hit('T', c, 1.0); place(fx, mb.tish(0.9), c, 0.22)
        elif tr in ('whip', 'zoom', 'slide'):
            place(fx, nx.air(0.3, 420, 4000), c - 0.2, 0.3); hit('T', c, 0.9)
        elif tr == 'dissolve':
            place(fx, nx.air_swell(0.5, 300, 2600), c - 0.3, 0.16)

    # website: entry wipe, taps, wizard chips
    prev_end = None
    for w in spec['web']:
        c = fr(w['from'])
        if prev_end != w['from']:
            place(fx, nx.air(0.32, 450, 4200), c - 0.18, 0.34)
        prev_end = w['from'] + w['frames']
        for at, _, _ in w['taps']:
            place(fx, nx.ui_click(1.3), c + fr(at), 0.6)
            place(fx, nx.ui_click(1.8), c + fr(at) + 0.045, 0.25)
        if w.get('chips'):
            n = len(w['chips'])
            for i in range(n):
                place(fx, nx.ui_click(1.6), c + fr(w['frames']) * i / n, 0.3)

    # natural sound: the embroidery machine's own audio under the needle shots
    foot = os.path.join(ROOT, 'assets/source/markhor/flagship/footage')
    machine = load_wav(os.path.join(foot, 'f06.mp4'), SR)
    machine = filt(machine, 'highpass', 45)
    by_id = {s['id']: s for s in spec['shots']}
    for sid in snd.get('machine', []):
        s = by_id[sid]
        i0 = int(s['srcIn'] * SR)
        n = int(fr(s['frames'] + 6) * SR)
        seg = machine[i0:i0 + n].copy()
        xf = int(0.015 * SR)
        seg[:xf] *= np.linspace(0, 1, xf)[:, None]
        seg[-xf:] *= np.linspace(1, 0, xf)[:, None]
        place(bed, seg * (0.1 / (np.sqrt(np.mean(machine ** 2)) + 1e-9)), fr(s['from']), 1.0)
        for k in range(int(fr(s['frames']) / 0.09)):                 # needle strokes on top
            place(fx, nx.stitch_stroke(0.8), fr(s['from']) + k * 0.09, 0.12)
    FOLEY = {
        'box': lambda c: (place(fx, nx.cloth(0.5, 300, 2400, 0.3), c + 0.1, 0.6), place(fx, nx.ui_click(0.6), c + 0.55, 0.3), place(fx, nx.cloth(0.4, 400, 3000, 0.3), c + 0.8, 0.5)),
        'press': lambda c: (place(fx, nx.cloth(0.8, 200, 1400, 0.3), c + 0.1, 0.7),),
        'pvc': lambda c: (place(fx, nx.heavy_hit(0.6), c + 0.05, 0.35), place(fx, nx.ui_click(0.5), c + 0.3, 0.2)),
        'brush': lambda c: (place(fx, sfxlib.fabric(0.9, density=36, bright=(500, 3000), level=0.2), c, 0.7),),
        'fabric': lambda c: (place(fx, sfxlib.fabric(1.2, density=30, bright=(600, 3800), level=0.18), c, 0.6),),
        'leather': lambda c: (place(fx, nx.cloth(0.6, 150, 1100, 0.3), c, 0.6),),
        'cloth': lambda c: (place(fx, nx.cloth(0.6, 250, 1800, 0.3), c + 0.05, 0.5),),
    }
    for sid, kind in snd.get('foley', {}).items():
        FOLEY[kind](fr(by_id[sid]['from']))

    # air swell into the logo
    if 'card' in spec:
        place(fx, nx.air_swell(0.8, 300, 3800), fr(spec['card']['from']) - 0.75, 0.3)

    room = nx.room_tone(dur, 0.012)
    ir = sfxlib.reverb_ir(1.8, 3.4, 5600)
    daf = daf + sfxlib.reverb(daf, ir) * 0.14
    fx = fx + sfxlib.reverb(fx, ir) * 0.08
    music = daf * 1.0 + fx * 0.85 + bed * 0.9 + room

    # optional stems: wordless vocal layer + voiceover (side-chain ducking)
    vox_p = os.path.join(ROOT, f'public/audio/markhor-{cut}-vox.wav')
    vo_p = os.path.join(ROOT, f'public/audio/markhor-{cut}-vo.wav')
    if os.path.exists(vox_p):
        vox = load_wav(vox_p, SR)[:N]
        music[:len(vox)] += vox * 0.35
        print('vox layer:', vox_p)
    mix = music
    if os.path.exists(vo_p):
        vo = np.zeros_like(music)
        v = load_wav(vo_p, SR)[:N]
        vo[:len(v)] = v
        env = envelope(vo, SR)
        duck = 1 - 0.55 * np.clip(env / (env.max() * 0.25 + 1e-9), 0, 1)   # about -7 dB under speech
        mix = music * duck[:, None] + vo * (0.5 / (np.max(np.abs(vo)) + 1e-9))
        print('voiceover:', vo_p)

    # tone: tame the sub (dum body), add presence for phone speakers
    mix = filt(mix, 'highpass', 45)
    mix = mix - filt(mix, 'lowpass', 110) * 0.55 + filt(mix, 'bandpass', [1500, 6500]) * 0.5   # ≈ -7 dB low shelf, +3 dB presence
    mix = limit(mix, SR, thr_db=-13.0)
    mix *= np.clip((t[-1] - t) / 0.4, 0, 1)[:, None]
    mix *= np.clip(t / 0.004, 0, 1)[:, None]
    mix /= np.max(np.abs(mix)) / 0.7
    wavfile.write(out, SR, mix.astype(np.float32))
    print('wrote', out)


if __name__ == '__main__':
    build(sys.argv[1], sys.argv[2])
