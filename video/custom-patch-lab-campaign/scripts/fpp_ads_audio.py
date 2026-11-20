"""Future PVC Patch Meta ads — soundtrack. NO MUSIC (client requirement): no melody,
no chords, no bass notes, no synths, no bells. Only:
  daf     frame drum (dum / tak / ka / rolls, no jingles) for all rhythm, and
          hand claps; section patterns come from the spec's `music` list, each
          section restarting its grid so the big daf hits land on the reveal cuts.
  voice   natural, unpitched vocal sounds only — breaths, inhales before drops,
          whispered "hah" exhales, a chest "hup" — never words, never pitched.
  DOOF    on every product reveal: a doubled daf dum + low thump + soft boom.
  sfx     whooshes / impacts / clicks on cuts and type, UI clicks in the website
          funnel (no chimes), CTA and end-card hits.
  foley   fabric, cap, PVC taps/flex, leather, handling, pencil, and the
          embroidery machine's own recorded audio; light workshop ambience.
  vo      (ads 1–2) high-pass, gentle compression, presence; the daf ducks
          ~9 dB and sfx ~4 dB under the voice. Loudness: build-audio.sh.

    python3 -I scripts/sound-design-fpp-a40.py out.wav   (via scripts/build-audio.sh fpp-a40 -14 -1.5)
"""
import json
import os
import subprocess
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import lfilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sfxlib  # noqa: E402
from sfxlib import bus, filt, noise, norm, place, t_axis  # noqa: E402
import markhor_beat as mb  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load(path, SR):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-vn', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)


def env_follow(x, SR, att=0.02, rel=0.25):
    a = np.abs(x).max(axis=1)
    ka, kr = np.exp(-1 / (att * SR)), np.exp(-1 / (rel * SR))
    out = np.empty_like(a)
    e = 0.0
    for i in range(0, len(a), 32):
        m = a[i:i + 32].max()
        e = m + (e - m) * (ka ** 32 if m > e else kr ** 32)
        out[i:i + 32] = e
    return out


def limit(x, SR, thr_db=-8.0, release=0.08):
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


# ---------------------------------------------------------------- natural vocal sounds (unpitched)
FORMANTS = {'ah': [(730, 140, 1.0), (1090, 160, 0.6), (2440, 260, 0.3)],
            'oh': [(570, 120, 1.0), (840, 140, 0.6), (2410, 260, 0.2)],
            'eh': [(530, 120, 1.0), (1840, 200, 0.5), (2480, 260, 0.25)]}


def whisper(dur, vowel='ah', att=0.015, decay=0.35):
    """Whispered (unvoiced) vowel: breath noise shaped by vowel formants — no pitch."""
    t = t_axis(dur)
    x = sum(g * filt(noise(dur), 'bandpass', [fc - bw, fc + bw]) for fc, bw, g in FORMANTS[vowel])
    x = x + filt(noise(dur), 'bandpass', [3000, 7000]) * 0.15
    env = np.minimum(1, t / att) * np.exp(-t / (dur * decay))
    return norm(x) * env * 0.5


def hah():
    return whisper(0.24, 'ah', 0.006, 0.3)


def inhale(dur):
    t = t_axis(dur)
    x = filt(noise(dur), 'bandpass', [900, 5200])
    return norm(x) * (t / dur) ** 1.8 * np.exp(-np.maximum(0, t - dur * 0.92) / 0.02) * 0.4


def hup():
    t = t_axis(0.16)
    return norm(filt(noise(0.16), 'bandpass', [120, 700])) * np.minimum(1, t / 0.004) * np.exp(-t / 0.04) * 0.6


def build(cut, out):
    spec = json.load(open(os.path.join(ROOT, f'src/fpp/ads/{cut}.json')))
    FPS = spec['fps']
    DUR = spec['durationInFrames'] / FPS
    sfxlib.configure(DUR, seed=777 if cut == 'a40' else 778)
    import naturalsfx as nx
    N, SR = sfxlib.N, sfxlib.SR
    rng = sfxlib.rng
    fr = lambda f: f / FPS  # noqa: E731
    t = np.arange(N) / SR
    aggressive = spec['style'] == 'aggressive'
    BPM = spec.get('bpm', 128 if aggressive else 122)
    BEAT = 60 / BPM
    S16 = BEAT / 4
    note = sfxlib.note

    daf, vox, fx, foley, amb = bus(), bus(), bus(), bus(), bus()

    def D(at, g=1.0, pan=0.0):
        place(daf, nx.daf_dum(1.0), at, 0.9 * g, pan=pan)

    def T(at, g=1.0):
        place(daf, nx.daf_tak(0.95), at, 0.7 * g, pan=float(rng.uniform(-0.2, 0.2)))

    def K(at, g=1.0):
        place(daf, nx.daf_ka(1.0), at, 0.6 * g, pan=float(rng.uniform(-0.3, 0.3)))

    def CLAP(at, g=1.0):
        place(daf, sfxlib.clap(), at, 0.32 * g, pan=float(rng.uniform(-0.25, 0.25)))

    # 16-step daf patterns (D dum, T tak, k ka, . rest)
    PAT = {
        'drop':  'D.k.T.kkD.k.T.k.',   # maqsum with ka ghosts
        'drop2': 'D.kTk.T.D.kTk.Tk',   # busier, syncopated
        'hook':  'DkkTkDkTDkkTkDTk',
        'groove': 'D...T..kD.k.T...',  # baladi, light
        'half':  'D.......T...k...',
        'outro': 'D...T.k.D.k.T...',
        'intro': '..k...k...k...k.',
        'reveal': '........T.......',
    }
    for a, b, mode in spec['music']:
        steps = int(np.ceil((b - a) / S16))
        for j in range(steps):
            tt = a + j * S16
            if tt >= b - 0.02:
                break
            s16, bar = j % 16, j // 16
            if mode == 'tension':  # heartbeat dum, accelerating ka, claps in the last stretch
                k = (tt - a) / max(0.01, b - a)
                step = 4 if k < 0.4 else (2 if k < 0.75 else 1)
                if s16 % step == 0:
                    K(tt, 0.35 + 0.55 * k)
                if s16 in (0, 6):
                    D(tt, 0.45 + 0.35 * k)
                if k > 0.55 and s16 % 4 == 0:
                    CLAP(tt, 0.4 + 0.8 * (k - 0.55))
                continue
            if mode == 'build':
                k = (tt - a) / max(0.01, b - a)
                step = 4 if k < 0.5 else (2 if k < 0.8 else 1)
                if s16 % step == 0:
                    K(tt, 0.5 + 0.5 * k); CLAP(tt, 0.3 + 0.6 * k)
                if s16 % 8 == 0:
                    D(tt, 0.6 + 0.3 * k)
                continue
            p = PAT.get(mode, PAT['groove'])[s16]
            g = 0.75 if mode in ('half', 'intro', 'reveal') else 1.0
            if p == 'D':
                D(tt, g)
            elif p == 'T':
                T(tt, g)
            elif p == 'k':
                K(tt, 0.7 * g)
            if mode in ('drop2', 'hook') and s16 in (4, 12):
                CLAP(tt, 0.9)
            if mode == 'drop' and s16 == 12 and bar % 2:
                CLAP(tt, 0.7)
            # natural vocal accents: whispered "hah" on the offbeat, chest "hup" on the one
            if mode in ('drop', 'drop2') and s16 == 14 and bar % 2 == 0:
                place(vox, hah(), tt, 0.5, pan=float(rng.uniform(-0.3, 0.3)))
            if mode == 'hook' and s16 == 0:
                place(vox, hup(), tt, 0.55)
        if mode == 'tension':
            place(fx, nx.air_swell(b - a, 250, 3600), a, 0.22)
            place(daf, nx.daf_roll(min(1.0, b - a)), b - min(1.0, b - a) - 0.05, 0.75)
        if mode == 'build':
            place(daf, nx.daf_roll(0.8), b - 0.85, 0.7)
        if mode == 'reveal':
            D(a, 1.3); D(a + 0.02, 0.8, pan=0.2)
            place(vox, whisper(0.9, 'oh', 0.08, 0.5), a + 0.05, 0.35)

    # drops: air swell + inhale + a short silence, then the big hit
    gate = np.ones(N)
    for d in spec['drops']:
        place(fx, nx.air_swell(1.4, 300, 4000), d - 1.4, 0.3)
        place(vox, inhale(0.55), d - 0.6, 0.45)
        place(fx, sfxlib.reverse_swell(0.7), d - 0.7, 0.3)
        g = np.clip(np.abs(t - (d - 0.09)) / 0.09, 0, 1)
        gate *= np.where((t > d - 0.18) & (t < d), g, 1.0)
        place(fx, nx.soft_hit(1.3, 1.4), d, 0.45)
        place(fx, mb.thump(1.3), d, 0.5)

    # DOOF on every product reveal: doubled daf dum + low thump + soft boom + exhale
    for i, d in enumerate(spec.get('doofs', [])):
        place(fx, nx.daf_dum(1.6), d, 1.0)
        place(fx, filt(nx.daf_dum(1.6), 'lowpass', 220), d + 0.008, 0.9)
        place(fx, mb.thump(1.4), d, 0.6)
        place(fx, nx.soft_hit(1.5, 1.5), d, 0.5)
        place(vox, hah(), d + 0.02, 0.55)
        place(vox, hup(), d + BEAT * 0.75, 0.35, pan=0.3)

    # ---------------------------------------------------------------- cut sfx + type accents
    shots = spec['shots']
    for s in shots[1:]:
        c, tr = fr(s['from']), s['trans']
        pan = float(rng.uniform(-0.25, 0.25))
        if tr == 'impact':
            place(fx, mb.thump(1.0), c, 0.4); place(fx, mb.tish(1.2), c, 0.32)
        elif tr in ('whip', 'zoom'):
            place(fx, sfxlib.whoosh(0.32, 300, 6000, 0.7), c - 0.22, 0.38, pan=pan)
        elif tr == 'slide':
            place(fx, sfxlib.whoosh(0.4, 250, 4000, 0.65), c - 0.25, 0.3); place(foley, nx.cloth(0.25, 300, 2400, 0.3), c, 0.3)
        elif tr == 'dissolve':
            place(fx, nx.air_swell(0.5, 300, 2600), c - 0.35, 0.2)
        else:
            place(fx, mb.tish(0.9), c, 0.22, pan=pan)
            if aggressive:
                place(fx, mb.thump(0.6), c, 0.2)
    for tx in spec['text']:
        a = fr(tx['from'])
        if tx['type'] == 'slam':
            place(fx, nx.daf_dum(1.2), a, 0.45); place(fx, nx.daf_tak(1.0), a + 0.01, 0.25); place(fx, sfxlib.whoosh(0.22, 800, 7000, 0.8), a - 0.12, 0.25)
        elif tx['type'] in ('head', 'material'):
            place(fx, sfxlib.text_swish(), a, 0.25)
            for line in tx.get('lines', []):
                for w in line:
                    if w.get('hi'):
                        place(fx, nx.ui_click(1.2), fr(w['at']), 0.18)
        elif tx['type'] == 'label':
            place(fx, nx.ui_click(1.0), a, 0.16); place(fx, sfxlib.whoosh(0.18, 1500, 7000, 0.7), a - 0.1, 0.14)

    # ---------------------------------------------------------------- foley
    machine = filt(load(os.path.join(ROOT, 'assets/source/markhor/flagship/footage/f06.mp4'), SR), 'highpass', 50)
    machine *= 0.1 / (np.sqrt(np.mean(machine ** 2)) + 1e-9)
    by_id = {s['id']: s for s in shots}
    for sid, kind in spec['foley'].items():
        s = by_id[sid]
        c, d = fr(s['from']), fr(s['frames'])
        if kind == 'machine':
            i0 = int(s['srcIn'] * SR); n = int((d + 0.15) * SR)
            seg = machine[i0:i0 + n].copy(); xf = int(0.02 * SR)
            seg[:xf] *= np.linspace(0, 1, xf)[:, None]; seg[-xf:] *= np.linspace(1, 0, xf)[:, None]
            place(foley, seg, c, 1.0)
            for k in range(int(d / 0.09)):
                place(foley, nx.stitch_stroke(0.8), c + k * 0.09, 0.1)
        elif kind == 'pvc':
            place(foley, nx.heavy_hit(0.5), c + 0.08, 0.22); place(foley, nx.cloth(0.4, 160, 1200, 0.3), c + 0.2, 0.35)
        elif kind == 'cap':
            place(foley, nx.cloth(0.5, 300, 2200, 0.3), c + 0.05, 0.45)
        elif kind == 'fabric':
            place(foley, sfxlib.fabric(min(d, 1.2), density=40, bright=(400, 3200), level=0.2), c, 0.6)
        elif kind == 'handle':
            place(foley, nx.cloth(0.35, 400, 2600, 0.3), c + 0.1, 0.4); place(foley, nx.ui_click(0.5), c + 0.35, 0.12)
        elif kind == 'paper':
            place(foley, sfxlib.fabric(min(d, 1.4), density=70, bright=(2000, 7000), level=0.14), c, 0.5)
        elif kind == 'brush':
            place(foley, sfxlib.fabric(min(d, 0.8), density=30, bright=(500, 2600), level=0.2), c, 0.6)
        elif kind == 'leather':
            place(foley, nx.cloth(0.6, 120, 900, 0.3), c + 0.05, 0.6)
        elif kind == 'press':
            place(foley, nx.cloth(0.8, 200, 1400, 0.3), c + 0.1, 0.6); place(foley, mb.thump(0.5), c + 0.6, 0.2)
    # workshop ambience under the product sections (room + faint machine hum)
    hum = filt(machine[: int(6 * SR)], 'lowpass', 400)
    for s in shots:
        if s['id'] in spec['foley'] and spec['foley'][s['id']] in ('machine', 'brush', 'leather', 'pvc'):
            c = fr(s['from']); n = int(fr(s['frames']) * SR)
            seg = np.tile(hum, (int(np.ceil(n / len(hum))) + 1, 1))[:n].copy(); xf = int(0.05 * SR)
            seg[:xf] *= np.linspace(0, 1, xf)[:, None]; seg[-xf:] *= np.linspace(1, 0, xf)[:, None]
            place(amb, seg, c, 0.35)
    amb = amb + nx.room_tone(DUR, 0.008)

    # ---------------------------------------------------------------- website funnel UI
    desk = spec.get('desk', [])
    if desk:
        place(fx, sfxlib.whoosh(0.45, 250, 5000, 0.7), fr(desk[0]['from']) - 0.3, 0.4)
    for i, w in enumerate(desk):
        c = fr(w['from'])
        if i and w['step'] != desk[i - 1]['step']:
            place(fx, sfxlib.whoosh(0.25, 600, 6000, 0.7), c - 0.15, 0.22)
            place(fx, nx.ui_click(1.4), c, 0.3)
        for at, _, _ in w['taps']:
            place(fx, nx.ui_click(1.5), c + fr(at), 0.55); place(fx, nx.ui_click(2.0), c + fr(at) + 0.04, 0.22)
        if w['kind'] == 'size':
            for k in range(6):  # typing the size
                place(fx, nx.ui_click(1.8), c + 0.08 + k * 0.11, 0.16)
        if w['kind'] == 'uploaded':
            place(fx, nx.ui_click(1.2), c + 0.05, 0.45); place(fx, nx.ui_click(1.7), c + 0.11, 0.35)  # file added (tick-tick)
    # CTA + end card
    cta = spec.get('cta')
    if cta:
        place(fx, nx.soft_hit(1.1, 1.2), fr(cta['from']), 0.4); place(fx, nx.daf_dum(1.3), fr(cta['from']), 0.6)
        place(fx, sfxlib.whoosh(0.35, 3000, 400, 0.4), fr(cta['clickAt']), 0.3)
        place(fx, nx.daf_tak(1.2), fr(cta['quoteAt']), 0.5); place(fx, sfxlib.clap(), fr(cta['quoteAt']), 0.3); place(fx, nx.ui_click(1.4), fr(cta['quoteAt']), 0.3)
    rv = spec.get('reveal')
    if rv:
        place(fx, nx.air_swell(0.6, 400, 4200), fr(rv['from']) - 0.45, 0.25)
    card = fr(spec['card']['from'])
    place(fx, nx.soft_hit(1.4, 1.5), card, 0.5); place(fx, nx.daf_dum(1.5), card, 0.8); place(fx, mb.thump(1.2), card, 0.4)
    if not cta:  # no separate CTA block: the end card carries CLICK BELOW + the quote pill
        place(fx, sfxlib.whoosh(0.35, 3000, 400, 0.4), card + fr(12), 0.3)
        place(fx, nx.daf_tak(1.2), card + fr(20), 0.5); place(fx, sfxlib.clap(), card + fr(20), 0.3)

    music = (daf + vox) * gate[:, None]

    # ---------------------------------------------------------------- voiceover
    V = np.zeros((N, 2))
    k = np.zeros(N)
    if spec.get('vo'):
        vo = load(os.path.join(ROOT, f'assets/source/fpp/ads/audio/vo-{spec["vo"]}.mp3'), SR)
        vo = filt(vo, 'highpass', 75)
        e = env_follow(vo, SR, 0.005, 0.12)
        thr = np.max(e) * 0.25
        gain = np.where(e > thr, (thr / np.maximum(e, 1e-9)) ** (1 - 1 / 3), 1.0)  # 3:1 above threshold
        vo = vo * gain[:, None]
        vo = vo + filt(vo, 'bandpass', [2500, 6000]) * 0.3
        vo /= np.max(np.abs(vo)) / 0.55
        V[: min(N, len(vo))] = vo[:N]
        venv = env_follow(V, SR, 0.03, 0.3)
        k = np.clip(venv / (np.max(venv) * 0.2 + 1e-9), 0, 1)
        speech = np.abs(V).max(1) > 0.02
        vo_rms = float(np.sqrt(np.mean(V[speech] ** 2)))
        music *= 0.5 * vo_rms / (np.sqrt(np.mean(music ** 2)) + 1e-9)   # ~ -6 dB vs voice, ~ -15 dB once ducked
        mix = music * (1 - 0.65 * k)[:, None] + (fx * 0.45 + foley * 0.5) * (1 - 0.45 * k)[:, None] + amb * 0.4 + V
    else:
        music *= 0.12 / (np.sqrt(np.mean(music ** 2)) + 1e-9)
        mix = music + fx * 0.55 + foley * 0.7 + amb * 0.5
    mix = filt(mix, 'highpass', 30)
    # slow leveler: pull any section more than ~3 dB above the ad's typical level back down
    blk = int(0.4 * SR)
    rms = np.array([np.sqrt(np.mean(mix[i:i + blk] ** 2) + 1e-12) for i in range(0, N, blk)])
    target = np.median(rms[rms > np.median(rms) * 0.3]) * 1.4
    g = np.minimum(1.0, target / rms)
    g = np.convolve(np.pad(g, 2, mode='edge'), np.ones(5) / 5, mode='valid')
    gs = np.interp(np.arange(N), np.arange(len(g)) * blk + blk / 2, g)
    mix *= gs[:, None]
    mix = limit(mix, SR, -6.0)
    mix *= np.clip((t[-1] - t) / 0.25, 0, 1)[:, None]
    mix /= np.max(np.abs(mix)) / 0.8
    wavfile.write(out, SR, mix.astype(np.float32))
    print('wrote', out)


if __name__ == '__main__':
    build(sys.argv[1], sys.argv[2])
