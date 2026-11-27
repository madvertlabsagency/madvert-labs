"""American Custom Patch — script Meta ads A (45.4 s VO → 46.5 s) and B (23.5 s VO → 24.6 s).

    python3 -I scripts/ac-meta-specs.py .

Same formula as the Future PVC Patch Meta ads A/B (scripts/fpp-ads-specs.py): the voiceover
is the master clock, every cut sits 1–3 frames ahead of its word, labels / patch-type tags /
slams on the words, then logo reveal → CLICK BELOW → the real quote funnel → end card.
Voiceovers: ElevenLabs "Jack John" takes, assets/source/americancustom/audio/vo-meta-{a,b}.mp3;
word times src/americancustom/vo-meta-{a,b}.json (forced alignment, gate -50 dB) — the
patch-type lists were placed from the energy envelope + per-word ASR.

Artwork mix (no other brand's name or logo in frame): eagle (n2, n6, n8, n9, ed), lion (n1, n3,
n5, lc), cobra (c1–c4), embroidered bolt (v1), chenille M (v2), woven wolf (v4), printed
astronaut for sublimation (v5), ALEX name patch (f07), ACE cap (f14), baseball team patch
(f10 0–1.1 s only: a sportswear logo shows later), polo shield (m25 0–0.85 s only: real-brand logos on its merch table later), tote (f15), heat press (press),
needle macro (needle) and the earlier generic shots. Not used: f01 (leather "MK" monogram),
f08 (patch resembles another client's logo), f09 (gibberish crest text).
"""
import json
import os
import sys

ROOT = sys.argv[1]
FPS = 30
fr = lambda t: int(round(t * FPS))  # noqa: E731


def timeline(cuts, end):
    out = []
    for i, c in enumerate(cuts):
        t, sid, src, a, b, tr = c[:6]
        extra = dict(c[6]) if len(c) > 6 else {}
        t1 = cuts[i + 1][0] if i + 1 < len(cuts) else end
        out.append(dict(id=sid, source=f'{src}.mp4', **{'from': fr(t)}, frames=fr(t1) - fr(t), srcIn=a, srcOut=b, trans=tr,
                        interp=extra.pop('interp', False), **extra))
    return out


def desk(t0, segs, end):
    """segs: [(t_end, id, srcIn, srcOut, focus, taps[(t_abs, x, y)], step, title, kind)] — taps in timeline seconds."""
    out, t = [], t0
    for i, (t1, sid, a, b, focus, taps, step, title, kind) in enumerate(segs):
        t1 = end if i == len(segs) - 1 else t1
        out.append(dict(id=sid, source='web.mp4', **{'from': fr(t)}, frames=fr(t1) - fr(t), srcIn=a, srcOut=b, focus=list(focus),
                        taps=[[fr(ta - t), x, y] for ta, x, y in taps], step=step, title=title, kind=kind))
        t = t1
    return out


def H(t0, t1, lines, top=270, size=130):
    return dict(type='head', **{'from': fr(t0)}, to=fr(t1), top=top, size=size,
                lines=[[dict(t=w[0], at=fr(w[1]), hi=len(w) > 2 and w[2]) for w in l] for l in lines])


def L(t0, t1, text):
    return dict(type='label', **{'from': fr(t0)}, to=fr(t1), text=text)


def SLAM(t0, t1, word, size=200, top=270, sub=None):
    return dict(type='slam', **{'from': fr(t0)}, to=fr(t1), text=word, size=size, top=top, sub=sub)


def MAT(t0, t1, word, idx):
    return dict(type='material', **{'from': fr(t0)}, to=fr(t1), text=word, idx=idx, of=5)


def write(name, d):
    os.makedirs(os.path.join(ROOT, f'src/americancustom/{name}'), exist_ok=True)
    json.dump(d, open(os.path.join(ROOT, f'src/americancustom/{name}.json'), 'w'), indent=1)
    json.dump(dict(fps=FPS, shots=d['shots']), open(os.path.join(ROOT, f'src/americancustom/{name}/edl.json'), 'w'), indent=1)
    print(f'{name}: {d["durationInFrames"] / FPS:.2f} s · {len(d["shots"])} shots · {len(d["desk"])} desk segs')


LOW = dict(y=90, scale=1.1)
UP = dict(y=50, scale=1.07)
J = lambda s, x=600, y=1050: dict(scale=s, origin={'x': x, 'y': y})  # noqa: E731  cobra jacket crops (keep the chin out)
CROP28 = dict(scale=1.32, origin=dict(x=760, y=700))  # m28: keep the compass numerals out of frame

# ====================================================================== AD A (45.4 s VO)
A_END, A_REV, A_CTA, A_DESK, A_CARD = 46.5, 33.90, 37.95, 39.95, 43.85
a_shots = timeline([
    (0.00, 'a01', 'n9', 1.60, 2.70, 'cut', dict(scale=1.08, drift=[1.0, 1.08])),                 # Your logo.
    (1.05, 'a02', 'n3', 5.50, 6.70, 'punch', dict(drift=[1.04, 1.0])),                           # Your identity.
    (2.18, 'a03', 'c1-hand', 0.20, 1.90, 'punch', dict(LOW, drift=[1.0, 1.05])),                 # Your custom patch.
    (3.85, 'a04', 'f05', 2.40, 3.90, 'impact', dict(drift=[1.0, 1.06])),                         # bold PVC patches
    (5.45, 'a05', 'n6', 5.00, 6.20, 'whip', dict(drift=[1.04, 1.0])),                            # on varsity jackets
    (6.55, 'a06', 'ed', 0.00, 1.60, 'whip', dict(drift=[1.0, 1.06])),                            # embroidered logos
    (7.60, 'a07', 'f14', 0.10, 1.20, 'punch'),                                                   # on caps
    (8.28, 'a08', 'f07', 1.60, 2.80, 'whip', dict(drift=[1.0, 1.05])),                           # custom name patches
    (9.50, 'a09', 'n8', 0.00, 1.40, 'punch'),                                                    # on backpacks
    (10.15, 'a10', 'm25', 0.00, 0.85, 'punch', dict(interp=True, drift=[1.05, 1.0])),            # and uniforms
    (11.30, 'a11', 'ea', 0.00, 2.40, 'dissolve', dict(drift=[1.0, 1.06])),                       # turn your designs into
    (12.38, 'a12', 'lc', 3.00, 5.00, 'zoom', dict(drift=[1.0, 1.05])),                           # something people can wear
    (14.20, 'a13', 'c2-jacket', 5.60, 7.00, 'impact', dict(J(1.25), interp=True)),               # (choose from) PVC
    (15.62, 'a14', 'v1', 3.60, 4.80, 'punch'),                                                   # embroidered
    (16.42, 'a15', 'v2', 1.60, 2.60, 'punch'),                                                   # chenille
    (17.20, 'a16', 'v4', 5.00, 5.80, 'punch'),                                                   # woven
    (17.80, 'a17', 'v5', 4.00, 5.80, 'punch', dict(drift=[1.0, 1.05])),                          # sublimation patches
    (19.55, 'a18', 'needle', 0.50, 1.40, 'whip'),                                                # sew-on
    (20.33, 'a19', 'press', 2.00, 3.20, 'impact'),                                               # iron-on
    (21.08, 'a20', 'c4-backpack', 2.60, 4.00, 'whip', dict(y=60, scale=1.07)),                   # or Velcro
    (22.05, 'a21', 'm20', 1.50, 2.40, 'whip'),                                                   # different styles
    (22.98, 'a22', 'm21', 3.30, 4.00, 'zoom', dict(interp=True)),                                # textures
    (23.92, 'a23', 'm28', 6.75, 7.98, 'zoom', dict(CROP28, interp=True, drift=[1.08, 1.0])),     # endless possibilities
    (25.65, 'a24', 'ed', 4.50, 6.20, 'impact', dict(drift=[1.0, 1.06])),                         # made for clothing brands
    (26.88, 'a25', 'f10', 0.00, 1.10, 'whip'),                                                   # sports teams
    (27.85, 'a26', 'f15', 1.00, 1.80, 'whip', dict(drift=[1.0, 1.05])),                          # businesses (m25 6 s+ shows real-brand logos)
    (28.62, 'a27', 'f11', 3.60, 5.60, 'slide', dict(drift=[1.0, 1.05])),                         # anyone who wants to stand out
    (30.72, 'a28', 'n1', 4.40, 6.00, 'dissolve', dict(interp=True, drift=[1.0, 1.1])),           # smallest details
    (32.18, 'a29', 'f06', 3.60, 4.20, 'punch', dict(scale=1.1)),                                 # make the
    (32.45, 'a30', 'n5', 2.80, 4.40, 'impact', dict(drift=[1.08, 1.0])),                         # biggest impression
], A_REV)
a_desk = desk(A_DESK, [
    (41.20, 'w1', 2.80, 3.75, (470, 330, 1.22), [(40.72, 150, 305)], 1, 'PICK YOUR PATCH TYPE', 'type'),
    (41.95, 'w2', 4.40, 5.50, (470, 300, 1.3), [(41.66, 150, 305)], 2, 'CHOOSE YOUR QUANTITY', 'qty'),
    (42.90, 'w3', 7.70, 9.00, (380, 300, 1.45), [], 3, 'SET YOUR SIZE', 'size'),
    (A_CARD, 'w4', 11.00, 11.85, (545, 330, 1.08), [(43.45, 580, 385)], 4, 'UPLOAD YOUR ARTWORK', 'upload'),
], A_CARD)
a_text = [
    H(0.00, 1.02, [[('YOUR', 0.06), ('LOGO.', 0.23, True)]], size=150, top=300),
    H(1.05, 2.15, [[('YOUR', 1.10), ('IDENTITY.', 1.28, True)]], size=140, top=300),
    H(2.18, 3.82, [[('YOUR', 2.24), ('CUSTOM', 2.35), ('PATCH.', 2.85, True)]], size=118, top=280),
    L(3.85, 5.42, 'BOLD PVC'), L(5.45, 6.52, 'VARSITY JACKETS'), L(6.55, 7.57, 'EMBROIDERED LOGOS'),
    L(7.60, 8.25, 'CAPS'), L(8.28, 9.47, 'CUSTOM NAME PATCHES'), L(9.50, 10.12, 'BACKPACKS'), L(10.15, 11.27, 'UNIFORMS'),
    H(11.30, 14.15, [[('TURN', 11.38), ('YOUR', 11.60), ('DESIGNS', 11.70)], [('INTO', 12.24), ('SOMETHING', 12.41)],
                     [('PEOPLE', 12.83), ('CAN', 13.18), ('WEAR.', 13.32, True)]], size=104, top=250),
    MAT(14.80, 15.59, 'PVC', 1), MAT(15.62, 16.39, 'EMBROIDERED', 2), MAT(16.42, 17.17, 'CHENILLE', 3),
    MAT(17.20, 17.77, 'WOVEN', 4), MAT(17.80, 19.50, 'SUBLIMATION', 5),
    L(19.55, 20.30, 'SEW-ON'), L(20.33, 21.05, 'IRON-ON'), L(21.08, 22.02, 'VELCRO'),
    L(22.05, 22.95, 'STYLES'), L(22.98, 23.89, 'TEXTURES'),
    H(23.92, 25.60, [[('ENDLESS', 23.95)], [('POSSIBILITIES.', 24.35, True)]], size=120, top=270),
    L(26.00, 26.85, 'CLOTHING BRANDS'), L(26.88, 27.82, 'SPORTS TEAMS'), L(27.85, 28.59, 'BUSINESSES'),
    H(29.72, 30.69, [[('STAND', 29.76), ('OUT.', 30.10, True)]], size=170, top=300),
    H(30.72, 33.85, [[('SMALL', 31.09), ('DETAILS.', 31.62)], [('BIG', 32.49), ('IMPRESSION.', 33.00, True)]], size=120, top=260),
]
a = dict(fps=FPS, durationInFrames=fr(A_END), style='premium', vo='meta-a', voPath='assets/source/americancustom/audio/vo-meta-a.mp3',
         voFile='ac-meta-a', quoteText='GET YOUR FREE QUOTE', shots=a_shots, desk=a_desk, text=a_text,
         reveal=dict(**{'from': fr(A_REV)}, to=fr(A_CTA), lines=[[('YOUR', fr(35.67)), ('DESIGN.', fr(35.89))],
                                                                  [('MADE', fr(36.63)), ('TO', fr(36.99)), ('STAND', fr(37.08)), ('OUT.', fr(37.45), True)]]),
         cta=dict(**{'from': fr(A_CTA)}, to=fr(A_DESK), clickAt=fr(38.15), quoteAt=fr(39.06)),
         card={'from': fr(A_CARD), 't': dict(move=-100, get=4, your=6, custom=8, patches=10, made=12, click=15, quote=fr(44.62 - A_CARD), url=fr(44.62 - A_CARD) + 9)},
         capsOff=[[0, fr(3.85)], [fr(A_REV), fr(A_DESK)], [fr(A_CARD), fr(A_END)]],
         flashes=[], shakes=[],
         music=[[0.0, 3.85, 'intro'], [3.85, 14.20, 'groove'], [14.20, 22.05, 'drop'], [22.05, A_REV, 'drop2'],
                [A_REV, A_CTA, 'reveal'], [A_CTA, A_DESK, 'build'], [A_DESK, A_CARD, 'half'], [A_CARD, A_END, 'outro']],
         foley={'a01': 'pvc', 'a02': 'cap', 'a03': 'handle', 'a04': 'pvc', 'a05': 'fabric', 'a06': 'fabric', 'a07': 'cap',
                'a08': 'handle', 'a09': 'fabric', 'a10': 'fabric', 'a11': 'paper', 'a12': 'fabric', 'a13': 'pvc', 'a14': 'machine',
                'a15': 'brush', 'a16': 'fabric', 'a17': 'paper', 'a18': 'machine', 'a19': 'press', 'a20': 'fabric', 'a23': 'handle',
                'a24': 'fabric', 'a25': 'fabric', 'a26': 'fabric', 'a27': 'press', 'a28': 'pvc', 'a29': 'machine', 'a30': 'pvc'},
         drops=[3.85, 14.20, 22.05, A_REV, A_CARD], deskCrop='1160:820:170:20')
write('meta-a', a)

# ====================================================================== AD B (23.5 s VO)
B_END, B_REV, B_CTA, B_DESK, B_CARD = 24.6, 15.50, 17.30, 18.35, 21.80
b_shots = timeline([
    (0.00, 'b01', 'n2', 5.50, 6.10, 'cut'),                                                      # Your logo
    (0.50, 'b02', 'n5', 1.00, 1.60, 'cut', dict(scale=1.1)),                                     # deserves
    (0.98, 'b03', 'v3', 2.00, 2.60, 'punch'),                                                    # more than a
    (1.50, 'b04', 'f02', 4.20, 4.90, 'whip'),                                                    # print.
    (2.28, 'b05', 'n9', 3.80, 5.40, 'impact', dict(drift=[1.0, 1.1])),                           # Make it a custom patch.
    (3.95, 'b06', 'c2-jacket', 5.60, 6.40, 'impact', J(1.3)),                                    # PVC
    (4.78, 'b07', 'v1', 3.60, 4.30, 'punch'),                                                    # embroidered
    (5.54, 'b08', 'v2', 1.60, 2.20, 'punch'),                                                    # chenille
    (6.34, 'b09', 'v4', 5.20, 5.80, 'punch'),                                                    # woven
    (6.88, 'b10', 'v5', 4.20, 5.60, 'punch', dict(drift=[1.0, 1.05])),                           # or sublimation
    (8.23, 'b11', 'ea', 0.50, 1.40, 'whip'),                                                     # Your design
    (9.18, 'b12', 'm28', 6.90, 7.95, 'zoom', dict(CROP28, interp=True)),                         # your style
    (10.36, 'b13', 'n6', 5.80, 7.00, 'impact'),                                                  # varsity jackets
    (11.42, 'b14', 'n3', 6.70, 7.30, 'punch'),                                                   # caps
    (11.99, 'b15', 'c4-backpack', 2.60, 3.30, 'punch', dict(y=60, scale=1.07)),                  # backpacks
    (12.68, 'b16', 'f10', 0.00, 1.00, 'punch'),                                                  # uniforms
    (13.66, 'b17', 'f06', 3.80, 4.20, 'cut', dict(scale=1.12)),                                  # make every
    (13.93, 'b18', 'm21', 3.40, 3.80, 'cut'),                                                    # detail
    (14.28, 'b19', 'n1', 6.30, 7.40, 'impact', dict(drift=[1.0, 1.08])),                         # stand out
], B_REV)
b_desk = desk(B_DESK, [
    (19.60, 'w1', 2.80, 3.75, (470, 330, 1.22), [(18.99, 150, 305)], 1, 'PICK YOUR PATCH TYPE', 'type'),
    (20.85, 'w2', 7.70, 9.00, (380, 300, 1.45), [], 2, 'CHOOSE YOUR SIZE', 'size'),
    (B_CARD, 'w3', 11.00, 11.85, (545, 330, 1.08), [(21.42, 580, 385)], 3, 'UPLOAD YOUR ARTWORK', 'upload'),
], B_CARD)
b_text = [
    SLAM(0.00, 1.47, 'YOUR LOGO', size=170, top=300),
    SLAM(1.50, 2.25, 'PRINT?', size=210),
    SLAM(2.28, 3.92, 'CUSTOM PATCH.', size=170, sub='MAKE IT A'),
    SLAM(3.95, 4.75, 'PVC.', size=260), SLAM(4.78, 5.51, 'EMBROIDERED.', size=150), SLAM(5.54, 6.31, 'CHENILLE.', size=190),
    SLAM(6.34, 6.85, 'WOVEN.', size=220), SLAM(6.88, 8.20, 'SUBLIMATION.', size=150),
    SLAM(8.23, 9.15, 'YOUR DESIGN.', size=160), SLAM(9.18, 10.33, 'YOUR STYLE.', size=170),
    SLAM(10.50, 11.39, 'VARSITY.', size=200), SLAM(11.42, 11.96, 'CAPS.', size=230), SLAM(11.99, 12.65, 'BACKPACKS.', size=170),
    SLAM(12.68, 13.63, 'UNIFORMS.', size=190),
    SLAM(14.28, 15.45, 'STAND OUT.', size=190, sub='MAKE EVERY DETAIL'),
]
b = dict(fps=FPS, durationInFrames=fr(B_END), style='aggressive', vo='meta-b', voPath='assets/source/americancustom/audio/vo-meta-b.mp3',
         voFile='ac-meta-b', quoteText='GET YOUR FREE QUOTE', shots=b_shots, desk=b_desk, text=b_text,
         reveal=dict(**{'from': fr(B_REV)}, to=fr(B_CTA), lines=[]),
         cta=dict(**{'from': fr(B_CTA)}, to=fr(B_DESK), clickAt=fr(17.38), quoteAt=fr(17.70)),
         card={'from': fr(B_CARD), 't': dict(move=-100, get=4, your=6, custom=8, patches=10, made=12, click=15, quote=fr(22.61 - B_CARD), url=fr(22.61 - B_CARD) + 9)},
         capsOff=[[fr(B_REV), fr(B_DESK)], [fr(B_CARD), fr(B_END)]],
         flashes=[fr(2.28), fr(3.95), fr(10.36), fr(14.28), fr(B_REV)],
         shakes=[fr(2.28), fr(3.95), fr(10.36), fr(14.28), fr(B_REV)],
         music=[[0.0, 2.28, 'hook'], [2.28, 8.23, 'drop'], [8.23, 10.36, 'groove'], [10.36, B_REV, 'drop2'],
                [B_REV, B_CTA, 'reveal'], [B_CTA, B_DESK, 'build'], [B_DESK, B_CARD, 'half'], [B_CARD, B_END, 'outro']],
         foley={'b02': 'pvc', 'b05': 'handle', 'b06': 'pvc', 'b07': 'machine', 'b08': 'brush', 'b09': 'fabric', 'b10': 'paper',
                'b11': 'paper', 'b13': 'fabric', 'b14': 'cap', 'b15': 'fabric', 'b16': 'fabric', 'b17': 'machine', 'b19': 'pvc'},
         drops=[2.28, 10.36, B_REV, B_CARD], deskCrop='1160:820:170:20')
write('meta-b', b)

# ---------------------------------------------------------------- caption word times for the patch-type lists
# (forced alignment fell back to syllable weights there; onsets measured from the energy envelope + per-word ASR)
FIX = {'a': {'Choose': 14.27, 'from': 14.55, 'PVC,': 14.84, 'embroidered,': 15.67, 'chenille,': 16.47, 'woven,': 17.24,
             'and': 17.60, 'sublimation': 17.84, 'patches.': 18.70},
       'b': {'PVC,': 3.98, 'embroidered,': 4.80, 'chenille,': 5.56, 'woven,': 6.36, 'or': 6.62, 'sublimation.': 6.90}}
for v, fix in FIX.items():
    p = os.path.join(ROOT, f'src/americancustom/vo-meta-{v}.json')
    d = json.load(open(p))
    for ph in d['phrases']:
        if ph['method'] != 'forced-alignment' and any(w['w'] in fix for w in ph['words']):
            for i, w in enumerate(ph['words']):
                w['start'] = fix.get(w['w'], w['start'])
            for i, w in enumerate(ph['words']):
                w['end'] = ph['words'][i + 1]['start'] - 0.02 if i + 1 < len(ph['words']) else ph['end']
            ph['method'] = 'measured'
    json.dump(d, open(p, 'w'), indent=1)
