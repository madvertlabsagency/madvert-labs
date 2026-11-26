"""American Custom — "Cobra Drop" 18 s Meta ad WITH voiceover (ElevenLabs, 12.8 s take).

    python3 -I scripts/ac-cobra18vo-spec.py .

Writes src/americancustom/cobra18vo.json and src/americancustom/cobra18vo/edl.json.
The no-VO 18 s cut, re-timed so the spoken end line fits: the end card starts at
14.5 s (the brand name, CLICK BELOW and GET YOUR QUOTE take 3 s to say), so every
section moves a little earlier. 120 BPM grid; each reveal on a downbeat with a DOOF.
  0–3 s      hook                 "Your design... your patch."
  3–6.5 s    jacket, cut per word "Bold, raised, three-D — on your jacket."
  6.5–9.5 s  cap                  "Made to stand out... on your cap,"
  9.5–12 s   backpack             "on your backpack."
  12–14.5 s  quote funnel (no VO: type → quantity → upload)
  14.5–18 s  end card             "American Custom Patch. Click below — get your quote."
The take is cut in its pauses into 7 blocks (voBlocks); word times from forced alignment
(src/americancustom/vo-c18.json).
"""
import json
import os
import sys

ROOT = sys.argv[1]
FPS = 30
fr = lambda t: int(round(t * FPS))  # noqa: E731

BLOCKS = [(0.00, 1.90, 0.20), (1.90, 5.45, 1.05), (5.55, 7.90, 1.01), (7.90, 9.00, 2.74),
          (9.00, 10.80, 5.37), (11.00, 11.72, 5.16), (11.88, 12.83, 5.07)]
TAKE = {'your1': 0.08, 'design1': 0.25, 'your2': 1.16, 'patch': 1.27, 'bold': 2.25, 'raised': 2.98, 'three': 3.77,
        'onj': 4.67, 'made': 5.79, 'to': 6.01, 'stand': 6.10, 'out': 6.51, 'oncap': 7.18, 'onbp': 8.11,
        'american': 9.28, 'patchEnd': 10.50, 'click': 11.09, 'get': 11.98}


def T(k):
    t = TAKE[k]
    return next(t + off for a, b, off in BLOCKS if a <= t < b)


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
    out, t = [], t0
    for i, (dur, sid, a, b, focus, taps, step, title, kind) in enumerate(segs):
        t1 = end if i == len(segs) - 1 else t + dur
        out.append(dict(id=sid, source='web.mp4', **{'from': fr(t)}, frames=fr(t1) - fr(t), srcIn=a, srcOut=b, focus=list(focus),
                        taps=[[fr(lt), x, y] for lt, x, y in taps], step=step, title=title, kind=kind))
        t = t1
    return out


def H(t0, t1, lines, top=270, size=150):
    return dict(type='head', **{'from': fr(t0)}, to=fr(t1), top=top, size=size,
                lines=[[dict(t=w[0], at=fr(w[1]), hi=len(w) > 2 and w[2]) for w in l] for l in lines])


def SLAM(t0, t1, word, size=200, top=270, sub=None):
    return dict(type='slam', **{'from': fr(t0)}, to=fr(t1), text=word, size=size, top=top, sub=sub)


END, JACKET, CAP, BACK, DESK, CARD = 18.0, 3.0, 6.5, 9.5, 12.0, 14.5
UP = dict(y=50, scale=1.07)
LOW = dict(y=90, scale=1.1)
J = lambda s, x=600, y=1050: dict(scale=s, origin={'x': x, 'y': y})  # noqa: E731

cuts = [
    # hook
    (0.0, 'h01', 'c1-hand', 0.20, 1.90, 'cut', dict(LOW, drift=[1.0, 1.04])),
    (1.5, 'h02', 'c1-hand', 5.55, 6.75, 'zoom', dict(LOW, drift=[1.0, 1.03])),
    (2.5, 'h03', 'c1-hand', 7.00, 7.60, 'punch', dict(scale=1.12)),
    # jacket — match cut on the drop, then a cut on every word
    (JACKET, 'j01', 'c2-jacket', 4.00, 5.10, 'impact', dict(drift=[1.6, 1.18], origin={'x': 545, 'y': 1000})),
    (T('raised'), 'j02', 'c2-jacket', 5.10, 6.00, 'punch', J(1.22, 620, 1100)),
    (T('three'), 'j03', 'c2-jacket', 6.90, 7.90, 'punch', J(1.4)),
    (T('onj'), 'j04', 'c2-jacket', 5.80, 6.90, 'zoom', dict(J(1.1), interp=True, drift=[1.0, 1.06])),
    # cap
    (CAP, 'k01', 'c3-cap', 0.00, 1.00, 'impact', dict(UP, drift=[1.0, 1.05])),
    (7.5, 'k02', 'c3-cap', 3.20, 3.90, 'whip', dict(LOW, drift=[1.0, 1.02])),
    (T('oncap'), 'k03', 'c3-cap', 6.50, 7.90, 'zoom', dict(UP, drift=[1.0, 1.08])),
    # backpack — close-up, rapid close-ups, pull-back on "on your backpack"
    (BACK, 'b01', 'c4-backpack', 0.00, 0.80, 'impact', dict(drift=[1.0, 1.06])),
    (10.25, 'b02', 'c2-jacket', 7.20, 7.50, 'cut', J(1.3, 600, 915)),
    (10.5, 'b03', 'c3-cap', 4.60, 4.90, 'cut', dict(scale=1.25, origin={'x': 520, 'y': 840})),
    (10.75, 'b04', 'c4-backpack', 2.60, 4.00, 'zoom', dict(y=60, scale=1.07, interp=True, drift=[1.0, 1.03])),
]
shots = timeline(cuts, DESK)

web = desk(DESK, [
    (0.85, 'w1', 2.80, 3.70, (470, 330, 1.22), [(0.50, 150, 305)], 1, 'PICK YOUR PATCH TYPE', 'type'),
    (0.80, 'w2', 4.50, 5.40, (470, 300, 1.3), [(0.56, 150, 305)], 2, 'CHOOSE YOUR QUANTITY', 'qty'),
    (0.85, 'w3', 11.00, 11.85, (545, 330, 1.08), [(0.55, 580, 385)], 3, 'UPLOAD YOUR ARTWORK', 'upload'),
], CARD)

text = [
    H(0.15, 1.30, [[('YOUR', T('your1')), ('DESIGN.', T('design1'), True)]], size=150, top=270),
    H(1.33, 2.45, [[('YOUR', T('your2')), ('PATCH.', T('patch'), True)]], size=150, top=270),
    SLAM(T('bold'), T('raised') - 0.03, 'BOLD.', size=220, top=250),
    SLAM(T('raised'), T('three') - 0.03, 'RAISED.', size=210),
    SLAM(T('three'), T('onj') - 0.03, '3D.', size=240),
    SLAM(T('onj'), CAP - 0.03, 'JACKET.', size=210, sub='ON YOUR'),
    H(CAP, T('oncap') - 0.05, [[('MADE', T('made')), ('TO', T('to'))], [('STAND', T('stand')), ('OUT.', T('out'), True)]], size=122, top=235),
    SLAM(T('oncap'), BACK - 0.03, 'CAP.', size=230, sub='ON YOUR'),
    SLAM(T('onbp'), DESK - 0.03, 'BACKPACK.', size=180, sub='ON YOUR'),
]

L = lambda t: fr(t - CARD)  # noqa: E731
move = L(T('patchEnd')) - 6
doofs = [JACKET, CAP, BACK, CARD]
spec = dict(
    fps=FPS, durationInFrames=fr(END), style='aggressive', bpm=120, vo='c18', voPath='assets/source/americancustom/audio/vo-c18.mp3',
    voBlocks=[[a, b, a + off] for a, b, off in BLOCKS], voFile='ac-cobra18vo',
    shots=shots, desk=web, text=text,
    card={'from': fr(CARD), 'variant': 'made', 't': dict(move=move, get=move + 8, your=move + 10, custom=move + 12, patches=move + 14,
                                                         made=move + 16, click=max(L(T('click')), move + 18), quote=L(T('get')), url=L(T('get')) + 10)},
    capsOff=[], flashes=[fr(x) for x in doofs[:3]], shakes=[fr(x) for x in doofs],
    music=[[0.0, JACKET, 'tension'], [JACKET, CAP, 'drop'], [CAP, BACK, 'hook'], [BACK, DESK, 'drop2'], [DESK, 13.5, 'groove'],
           [13.5, CARD, 'build'], [CARD, END, 'outro']],
    drops=[JACKET, CARD], doofs=doofs, chops=[8.75],
    foley={'h01': 'handle', 'h02': 'pvc', 'h03': 'handle', 'j01': 'fabric', 'j02': 'fabric', 'j04': 'fabric',
           'k01': 'cap', 'k02': 'cap', 'k03': 'cap', 'b01': 'fabric', 'b04': 'fabric'},
    deskCrop='1160:820:170:20',
)
os.makedirs(os.path.join(ROOT, 'src/americancustom/cobra18vo'), exist_ok=True)
json.dump(spec, open(os.path.join(ROOT, 'src/americancustom/cobra18vo.json'), 'w'), indent=1)
json.dump(dict(fps=FPS, shots=shots), open(os.path.join(ROOT, 'src/americancustom/cobra18vo/edl.json'), 'w'), indent=1)
print(f'cobra18vo: {spec["durationInFrames"]} f · {len(shots)} shots · card t {spec["card"]["t"]}')
print('vo dst:', [(round(a + o, 2), round(b + o, 2)) for a, b, o in BLOCKS])
