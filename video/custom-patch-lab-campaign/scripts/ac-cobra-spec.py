"""American Custom — "Cobra Drop" 18 s Meta ad (9:16, no voiceover).

    python3 -I scripts/ac-cobra-spec.py .

Writes src/americancustom/cobra18.json (read by src/americancustom/CobraAd.tsx and
scripts/sound-design-ac-cobra18.py) and src/americancustom/cobra18/edl.json
(read by scripts/conform-shots.py americancustom/cobra18).

Same formula as the FPP Lion / Eagle 18 s ads: 120 BPM grid (beat = 0.5 s),
every product reveal on a downbeat with a DOOF.
  0–3 s   hook: hand holds the cobra, "YOUR DESIGN." / "YOUR PATCH."
  3 s     DROP: match cut (zoom-out from the hand close-up's framing) to the jacket
  7 s     cap reveal, DOOF + unpitched vocal chop, "MADE TO STAND OUT."
  11 s    backpack: close-up, rapid close-ups, pull-back reveal "ON YOUR BACKPACK."
  15 s    end card: logo, GET YOUR CUSTOM PATCHES MADE, CLICK BELOW, GET YOUR QUOTE
Source ranges avoid the clips' generation artefacts (measured on contact sheets):
c2 jacket 0–3.5 s (face / arm in frame), c3 cap 2.3–3.1 s and 5.4–6.4 s (morph
ghosting), c4 backpack 4.6 s+ (duplicate ghost patch). Type sits in the top band
(≤ 560 px) and every shot under type is framed so the patch starts below it.
"""
import json
import os
import sys

ROOT = sys.argv[1]
FPS = 30
fr = lambda t: int(round(t * FPS))  # noqa: E731
B = lambda n: n * 0.5  # noqa: E731  (120 BPM)


def timeline(cuts, end):
    out = []
    for i, c in enumerate(cuts):
        t, sid, src, a, b, tr = c[:6]
        extra = dict(c[6]) if len(c) > 6 else {}
        t1 = cuts[i + 1][0] if i + 1 < len(cuts) else end
        out.append(dict(id=sid, source=f'{src}.mp4', **{'from': fr(t)}, frames=fr(t1) - fr(t), srcIn=a, srcOut=b, trans=tr,
                        interp=extra.pop('interp', False), **extra))
    return out


def H(t0, t1, lines, top=270, size=150):
    return dict(type='head', **{'from': fr(t0)}, to=fr(t1), top=top, size=size,
                lines=[[dict(t=w[0], at=fr(w[1]), hi=len(w) > 2 and w[2]) for w in l] for l in lines])


def SLAM(t0, t1, word, size=200, top=270, sub=None):
    return dict(type='slam', **{'from': fr(t0)}, to=fr(t1), text=word, size=size, top=top, sub=sub)


END, CARD = 18.0, B(30)
UP = dict(y=50, scale=1.07)  # framing for shots under type: patch top lands below the type band
HOOK = dict(y=90, scale=1.1)  # the hand close-ups sit higher in frame

cuts = [
    # 0–3 s HOOK — the cobra between the fingers
    (B(0), 'h01', 'c1-hand', 0.20, 1.90, 'cut', dict(HOOK, drift=[1.0, 1.04])),
    (B(3), 'h02', 'c1-hand', 5.55, 6.75, 'zoom', dict(HOOK, drift=[1.0, 1.03])),
    (B(5), 'h03', 'c1-hand', 7.00, 7.60, 'punch', dict(scale=1.12)),
    # 3 s DROP — match cut: the jacket shot opens at the hand close-up's scale, centred on the patch
    (B(6), 'j01', 'c2-jacket', 4.00, 5.10, 'impact', dict(drift=[1.6, 1.18], origin={'x': 545, 'y': 1000})),
    (B(8), 'j02', 'c2-jacket', 5.10, 6.10, 'punch', dict(scale=1.22, origin={'x': 620, 'y': 1100})),
    (B(10), 'j03', 'c2-jacket', 6.00, 7.90, 'zoom', dict(interp=True, scale=1.1, drift=[1.0, 1.08], origin={'x': 600, 'y': 1050})),
    # 7 s CAP — DOOF + vocal chop, MADE TO STAND OUT.
    (B(14), 'k01', 'c3-cap', 0.00, 1.10, 'impact', dict(UP, drift=[1.0, 1.05])),
    (B(16), 'k02', 'c3-cap', 3.20, 4.30, 'whip', dict(y=90, scale=1.1, drift=[1.0, 1.02])),
    (B(18), 'k03', 'c3-cap', 4.30, 5.20, 'punch', dict(y=90, scale=1.1)),
    (B(19), 'k04', 'c3-cap', 6.50, 7.90, 'zoom', dict(UP, drift=[1.0, 1.08])),
    # 11 s BACKPACK — close-up, rapid close-ups, pull-back reveal
    (B(22), 'b01', 'c4-backpack', 0.00, 1.00, 'impact', dict(drift=[1.0, 1.06])),
    (B(24), 'b02', 'c2-jacket', 7.20, 7.55, 'cut', dict(scale=1.3, origin={'x': 600, 'y': 915})),
    (B(24.5), 'b03', 'c4-backpack', 1.00, 1.35, 'punch', dict(scale=1.2)),
    (B(25), 'b04', 'c3-cap', 4.60, 4.95, 'cut', dict(scale=1.25, origin={'x': 520, 'y': 840})),
    (B(25.5), 'b05', 'c1-hand', 7.20, 7.55, 'cut', dict(scale=1.1)),
    (B(26), 'b06', 'c4-backpack', 2.30, 4.40, 'zoom', dict(y=60, scale=1.07, interp=True, drift=[1.0, 1.03])),
]
shots = timeline(cuts, CARD)

text = [
    H(B(0) + 0.15, B(3) - 0.05, [[('YOUR', B(0) + 0.2), ('DESIGN.', B(1), True)]], size=150, top=270),
    H(B(3), B(5) - 0.05, [[('YOUR', B(3) + 0.05), ('PATCH.', B(4), True)]], size=150, top=270),  # clear before the h03 macro
    SLAM(B(8), B(11) - 0.05, 'JACKET.', size=210, top=270, sub='ON YOUR'),  # the 3 s match cut stays clean
    H(B(14), B(22) - 0.05, [[('MADE', B(14) + 0.05), ('TO', B(14) + 0.3)], [('STAND', B(15)), ('OUT.', B(15) + 0.3, True)]], size=122, top=235),
    SLAM(B(26), B(30) - 0.05, 'BACKPACK.', size=180, top=270, sub='ON YOUR'),
]

doofs = [B(6), B(14), B(22), CARD]
spec = dict(
    fps=FPS, durationInFrames=fr(END), style='aggressive', bpm=120, vo=None, voFile='ac-cobra18',
    shots=shots, desk=[], text=text, card={'from': fr(CARD), 'variant': 'made'},
    capsOff=[], flashes=[fr(x) for x in doofs[:3]], shakes=[fr(x) for x in doofs],
    music=[[0.0, B(6), 'tension'], [B(6), B(14), 'drop'], [B(14), B(22), 'hook'], [B(22), B(28), 'drop2'], [B(28), CARD, 'build'], [CARD, END, 'outro']],
    drops=[B(6), CARD], doofs=doofs, chops=[B(14), B(18)],
    foley={'h01': 'handle', 'h02': 'pvc', 'h03': 'handle', 'j01': 'fabric', 'j02': 'fabric', 'j03': 'fabric',
           'k01': 'cap', 'k02': 'cap', 'k04': 'cap', 'b01': 'fabric', 'b03': 'fabric', 'b06': 'fabric'},
)
os.makedirs(os.path.join(ROOT, 'src/americancustom/cobra18'), exist_ok=True)
json.dump(spec, open(os.path.join(ROOT, 'src/americancustom/cobra18.json'), 'w'), indent=1)
json.dump(dict(fps=FPS, shots=shots), open(os.path.join(ROOT, 'src/americancustom/cobra18/edl.json'), 'w'), indent=1)
print(f'cobra18: {spec["durationInFrames"]} f = {END:.1f} s · {len(shots)} shots · card at {CARD} s')

# logo for the end card: the supplied file with its white canvas trimmed (artwork + 24 px), never recoloured
logo_out = os.path.join(ROOT, 'public/brand/ac-logo-crop.png')
if not os.path.exists(logo_out):
    from PIL import Image
    os.makedirs(os.path.dirname(logo_out), exist_ok=True)
    Image.open(os.path.join(ROOT, 'assets/source/americancustom/brand/ac-logo.webp')).convert('RGB').crop((30, 320, 1006, 688)).save(logo_out)
