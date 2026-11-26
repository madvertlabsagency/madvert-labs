"""American Custom — "Cobra Drop" 40 s Meta ad WITH voiceover (ElevenLabs, 29.6 s take).

    python3 -I scripts/ac-cobra40vo-spec.py .

Writes src/americancustom/cobra40vo.json and src/americancustom/cobra40vo/edl.json.
Same sections as the no-VO 40 s cut (ac-cobra40-spec.py); here the take is cut in its
own pauses into 7 blocks and each block is placed on its section (voBlocks), and the
slams, cuts and end-card words are timed to the spoken words. Word times: forced
alignment of assets/source/americancustom/audio/vo-c40.mp3 (src/americancustom/vo-c40.json;
"Backpacks" 13.85 s measured from the energy envelope — too quiet for the phrase gate).

  block  take (s)       placed at   words
  1      0.00–2.05      +0.25       Your design... your patch.
  2      2.05–6.95      +1.95       Bold. Raised. Molded in three-D — right on your jacket.
  3      6.95–9.45      +3.11       Made to stand out... on your cap.
  4      9.45–12.25     +6.65       On your backpack — and everything you carry.
  5      12.25–16.45    +9.57       Jackets. Caps. Backpacks. Your gear, your design.
  6      16.85–23.95    +9.30       Here's how to get your quote: pick ... then upload your artwork.
  7      23.95–29.65    +10.13      American Custom Patch. Get your custom patches made. Click below — and get your quote.
"""
import json
import os
import sys

ROOT = sys.argv[1]
FPS = 30
fr = lambda t: int(round(t * FPS))  # noqa: E731

BLOCKS = [(0.00, 2.05, 0.25), (2.05, 6.95, 1.95), (6.95, 9.45, 3.11), (9.45, 12.25, 6.65),
          (12.25, 16.45, 9.57), (16.85, 23.95, 9.30), (23.95, 29.65, 10.13)]
# take-clock word onsets (forced alignment) → timeline
TAKE = {
    'your1': 0.07, 'design1': 0.27, 'your2': 1.20, 'patch': 1.40, 'bold': 2.40, 'raised': 3.28, 'molded': 4.28, 'three': 4.82,
    'right': 5.86, 'jacket': 6.35, 'made': 7.19, 'to': 7.42, 'stand': 7.51, 'out': 8.03, 'oncap': 8.67, 'onbp': 9.70,
    'and': 11.03, 'carryEnd': 11.91, 'jackets': 12.48, 'caps': 13.28, 'backpacks': 13.85, 'your3': 14.84, 'gear': 15.09,
    'your4': 15.73, 'design2': 16.03, 'heres': 16.99, 'pick': 18.41, 'type': 18.99, 'choose': 19.58, 'set': 20.76,
    'backing': 21.72, 'then': 22.41, 'upload': 22.85, 'american': 24.27, 'get': 25.95, 'yourC': 26.10, 'custom': 26.23,
    'patches': 26.68, 'madeC': 27.07, 'click': 27.84, 'andget': 28.68,
}


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
    for i, (t1, sid, a, b, focus, taps, step, title, kind) in enumerate(segs):
        t1 = end if i == len(segs) - 1 else t1
        out.append(dict(id=sid, source='web.mp4', **{'from': fr(t)}, frames=fr(t1) - fr(t), srcIn=a, srcOut=b, focus=list(focus),
                        taps=[[fr(lt), x, y] for lt, x, y in taps], step=step, title=title, kind=kind))
        t = t1
    return out


def H(t0, t1, lines, top=270, size=150):
    return dict(type='head', **{'from': fr(t0)}, to=fr(t1), top=top, size=size,
                lines=[[dict(t=w[0], at=fr(w[1]), hi=len(w) > 2 and w[2]) for w in l] for l in lines])


def SLAM(t0, t1, word, size=200, top=270, sub=None):
    return dict(type='slam', **{'from': fr(t0)}, to=fr(t1), text=word, size=size, top=top, sub=sub)


END, DESK, CARD = 40.0, 26.0, 34.0
UP = dict(y=50, scale=1.07)
LOW = dict(y=90, scale=1.1)
J = lambda s, x=600, y=1050: dict(scale=s, origin={'x': x, 'y': y})  # noqa: E731

cuts = [
    # 0–4 s HOOK
    (0.0, 'h01', 'c1-hand', 0.20, 1.90, 'cut', dict(LOW, drift=[1.0, 1.04])),
    (1.5, 'h02', 'c1-hand', 2.40, 3.70, 'zoom', dict(LOW, drift=[1.0, 1.04])),
    (2.5, 'h03', 'c1-hand', 5.55, 6.55, 'zoom', dict(LOW, drift=[1.0, 1.03])),
    (3.25, 'h04', 'c1-hand', 6.90, 7.70, 'punch', dict(scale=1.12)),
    # 4 s DROP — jacket; a cut on every word: Bold / Raised / Molded / three-D / right on your jacket
    (4.0, 'j01', 'c2-jacket', 4.00, 5.20, 'impact', dict(drift=[1.6, 1.18], origin={'x': 545, 'y': 1000})),
    (T('raised'), 'j02', 'c2-jacket', 5.10, 6.10, 'punch', J(1.22, 620, 1100)),
    (T('molded'), 'j03', 'c2-jacket', 4.40, 4.95, 'impact', J(1.3, 560, 1000)),
    (T('three'), 'j04', 'c2-jacket', 6.90, 7.90, 'punch', J(1.4)),
    (T('right'), 'j05', 'c2-jacket', 5.80, 7.90, 'zoom', dict(J(1.1), interp=True, drift=[1.0, 1.08])),
    # 10 s CAP
    (10.0, 'k01', 'c3-cap', 0.00, 1.00, 'impact', dict(UP, drift=[1.0, 1.05])),
    (11.0, 'k02', 'c3-cap', 3.10, 3.85, 'whip', dict(LOW, drift=[1.0, 1.02])),
    (11.75, 'k03', 'c3-cap', 6.50, 7.90, 'zoom', dict(UP, drift=[1.0, 1.08])),
    (13.25, 'k04', 'c3-cap', 1.00, 2.30, 'zoom', dict(UP, drift=[1.0, 1.06])),
    (14.6, 'k05', 'c3-cap', 3.85, 5.10, 'punch', LOW),
    # 16 s BACKPACK — reveal on "On your backpack", rapid close-ups on "and everything you carry"
    (16.0, 'b01', 'c4-backpack', 2.20, 4.00, 'impact', dict(y=60, scale=1.07, interp=True, drift=[1.0, 1.03])),
    (T('and'), 'b02', 'c4-backpack', 0.00, 0.30, 'cut', dict(scale=1.1)),
    (T('and') + 0.22, 'b03', 'c2-jacket', 7.20, 7.50, 'cut', J(1.3, 600, 915)),
    (T('and') + 0.44, 'b04', 'c3-cap', 4.60, 4.90, 'cut', dict(scale=1.25, origin={'x': 520, 'y': 840})),
    (T('and') + 0.66, 'b05', 'c1-hand', 7.20, 7.50, 'cut', dict(scale=1.1)),
    (T('carryEnd'), 'b06', 'c4-backpack', 0.30, 1.60, 'impact', dict(drift=[1.0, 1.06])),
    (19.8, 'b07', 'c4-backpack', 1.60, 2.20, 'punch', dict(scale=1.15)),
    (20.5, 'b08', 'c4-backpack', 3.40, 4.50, 'zoom', dict(y=60, scale=1.07, drift=[1.0, 1.04])),
    # 22 s MONTAGE — each product on its word
    (22.0, 'm1', 'c2-jacket', 6.20, 6.55, 'impact', J(1.1)),
    (22.42, 'm2', 'c2-jacket', 7.40, 7.75, 'cut', J(1.15)),
    (T('caps'), 'm3', 'c3-cap', 0.30, 0.65, 'cut', UP),
    (23.13, 'm4', 'c3-cap', 6.80, 7.15, 'cut', UP),
    (T('backpacks'), 'm5', 'c4-backpack', 3.00, 3.35, 'cut', dict(y=60, scale=1.07)),
    (23.71, 'm6', 'c4-backpack', 3.80, 4.15, 'cut', dict(y=60, scale=1.07)),
    # 24 s HERO
    (24.0, 'hr', 'c2-jacket', 6.30, 7.90, 'impact', dict(J(1.1), interp=True, drift=[1.0, 1.1])),
]
shots = timeline(cuts, DESK)

# 26 s WEBSITE — real quote funnel, each step on its words (same clean ranges as the no-VO cut)
web = desk(DESK, [
    (T('choose'), 'w1', 2.80, 3.75, (470, 330, 1.22), [(T('type') - DESK, 150, 305)], 1, 'PICK YOUR PATCH TYPE', 'type'),
    (T('set'), 'w2', 4.40, 5.50, (470, 300, 1.3), [(0.75, 150, 305)], 2, 'CHOOSE YOUR QUANTITY', 'qty'),
    (T('backing') - 0.16, 'w3', 7.70, 9.00, (380, 300, 1.45), [], 3, 'SET YOUR SIZE', 'size'),
    (T('then'), 'w4', 9.55, 10.45, (470, 300, 1.25), [(0.42, 440, 292)], 4, 'CHOOSE YOUR BACKING', 'backing'),
    (CARD, 'w5', 11.00, 11.90, (545, 330, 1.08), [(T('upload') + 0.3 - T('then'), 580, 385)], 5, 'UPLOAD YOUR ARTWORK', 'upload'),
], CARD)

text = [
    H(0.15, 1.40, [[('YOUR', T('your1')), ('DESIGN.', T('design1'), True)]], size=150, top=270),
    H(1.42, 3.2, [[('YOUR', T('your2')), ('PATCH.', T('patch'), True)]], size=150, top=270),
    SLAM(T('bold'), T('raised') - 0.03, 'BOLD.', size=220, top=250),
    SLAM(T('raised'), T('molded') - 0.03, 'RAISED.', size=210),
    SLAM(T('molded'), T('three') - 0.03, 'MOLDED.', size=200),
    SLAM(T('three'), T('right') - 0.03, 'IN 3D.', size=220),
    SLAM(T('right'), 9.95, 'JACKET.', size=210, sub='ON YOUR'),
    H(10.0, T('oncap') - 0.06, [[('MADE', T('made')), ('TO', T('to'))], [('STAND', T('stand')), ('OUT.', T('out'), True)]], size=122, top=235),
    SLAM(T('oncap'), 14.45, 'CAP.', size=230, sub='ON YOUR'),
    SLAM(T('onbp'), T('and') - 0.05, 'BACKPACK.', size=180, sub='ON YOUR'),
    SLAM(T('jackets'), T('caps') - 0.03, 'JACKETS.', size=190),
    SLAM(T('caps'), T('backpacks') - 0.03, 'CAPS.', size=220),
    SLAM(T('backpacks'), 23.97, 'BACKPACKS.', size=170),
    H(24.0, 25.98, [[('YOUR', T('your3')), ('GEAR.', T('gear'))], [('YOUR', T('your4')), ('DESIGN.', T('design2'), True)]], size=130, top=250),
]

L = lambda k: fr(T(k) - CARD)  # noqa: E731  end-card local frames
doofs = [4.0, 10.0, 16.0, 24.0, CARD]
spec = dict(
    fps=FPS, durationInFrames=fr(END), style='aggressive', bpm=120, vo='c40', voPath='assets/source/americancustom/audio/vo-c40.mp3',
    voBlocks=[[a, b, a + off] for a, b, off in BLOCKS], voFile='ac-cobra40vo',
    shots=shots, desk=web, text=text,
    card={'from': fr(CARD), 'variant': 'made', 't': dict(move=L('get') - 16, get=L('get'), your=L('yourC'), custom=L('custom'), patches=L('patches'),
                                                         made=L('madeC'), click=L('click'), quote=L('andget'), url=L('andget') + 10)},
    capsOff=[], flashes=[fr(x) for x in doofs[:4]], shakes=[fr(x) for x in doofs],
    music=[[0.0, 4.0, 'tension'], [4.0, 10.0, 'drop'], [10.0, 16.0, 'hook'], [16.0, 22.0, 'drop2'], [22.0, 24.0, 'hook'],
           [24.0, DESK, 'reveal'], [DESK, 32.0, 'groove'], [32.0, 33.0, 'half'], [33.0, CARD, 'build'], [CARD, END, 'outro']],
    drops=[4.0, CARD], doofs=doofs, chops=[10.0, 12.75],
    foley={'h01': 'handle', 'h02': 'handle', 'h03': 'pvc', 'h04': 'handle', 'j01': 'fabric', 'j02': 'fabric', 'j05': 'fabric',
           'k01': 'cap', 'k03': 'cap', 'k04': 'cap', 'b01': 'fabric', 'b06': 'fabric', 'b08': 'fabric', 'hr': 'fabric'},
    deskCrop='1160:820:170:20',
)
os.makedirs(os.path.join(ROOT, 'src/americancustom/cobra40vo'), exist_ok=True)
json.dump(spec, open(os.path.join(ROOT, 'src/americancustom/cobra40vo.json'), 'w'), indent=1)
json.dump(dict(fps=FPS, shots=shots), open(os.path.join(ROOT, 'src/americancustom/cobra40vo/edl.json'), 'w'), indent=1)
print(f'cobra40vo: {spec["durationInFrames"]} f · {len(shots)} shots · desk {[(w["id"], w["from"], w["frames"]) for w in web]}')
print('card t', spec['card']['t'])
