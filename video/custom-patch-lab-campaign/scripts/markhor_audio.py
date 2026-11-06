"""Shared helpers for the Markhor Patches reels' sound design (NO MUSIC, NO VO).
Call setup(reel, seed) first; it configures sfxlib for the reel's length."""
import json
import os
import subprocess

import numpy as np
from scipy.io import wavfile

import sfxlib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOOT = os.path.join(ROOT, 'assets/source/markhor/footage')


def setup(reel, seed):
    edl = json.load(open(os.path.join(ROOT, f'src/markhor/{reel}/edl.json')))
    sfxlib.configure(edl['durationInFrames'] / edl['fps'], seed=seed)
    return edl


def clip_audio(name):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(FOOT, name), '-vn', '-ac', '2', '-ar', str(sfxlib.SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)
    return sfxlib.filt(x, 'highpass', 45)


def lay(dst, src, at, src_s, dur_s, rate=1.0, gain=1.0):
    """src from src_s for dur_s (at playback `rate`; <1 = slowed, pitch drops), 12 ms fades."""
    SR = sfxlib.SR
    n_out = int(dur_s * SR) + int(0.012 * SR)
    n_in = int(n_out * rate) + 2
    i0 = int(src_s * SR)
    seg = src[i0:i0 + n_in]
    if len(seg) < n_in:  # wrap from 1.5 s earlier if the range runs off the clip
        back = max(0, i0 - int(1.5 * SR))
        seg = np.concatenate([seg, src[back:back + n_in - len(seg)]])
    if rate != 1.0:
        t = np.arange(n_out) * rate
        seg = np.stack([np.interp(t, np.arange(len(seg)), seg[:, c]) for c in range(2)], 1)
    seg = seg[:n_out].copy()
    xf = int(0.012 * SR)
    ramp = np.linspace(0, 1, xf)[:, None]
    seg[:xf] *= ramp
    seg[-xf:] *= ramp[::-1]
    sfxlib.place(dst, seg, at, gain)


def level(x, rms, upto_s=None):
    a = x[: int(upto_s * sfxlib.SR)] if upto_s else x
    return x * (rms / max(1e-9, np.sqrt(np.mean(a ** 2))))


def finish(path, bed, fx, fx_gain=0.9, verb=0.16):
    ir = sfxlib.reverb_ir(1.6, 4.0, 5200)
    fx = fx + sfxlib.reverb(fx, ir) * verb
    mix = bed + fx * fx_gain
    t = np.arange(sfxlib.N) / sfxlib.SR
    mix *= np.clip((t[-1] - t) / 0.3, 0, 1)[:, None]
    mix *= np.clip(t / 0.004, 0, 1)[:, None]
    mix /= max(1e-9, np.max(np.abs(mix))) / 0.7
    wavfile.write(path, sfxlib.SR, mix.astype(np.float32))
    print('wrote', path)
