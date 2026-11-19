"""Future PVC Patch — 50 s / 30 s / 15 s edit source.

    python3 -I scripts/fpp-specs.py .

Writes src/fpp/{f50,f30,f15}/edl.json for the flagship engines
(src/markhor/flagship.tsx = 9:16, src/markhor/flagship169.tsx = 16:9).

Creative angle (deliberately different from the Markhor scripts): PVC-first.
"Not printed. Not stitched. Molded." → what PVC looks and feels like → your
design → where it goes → three steps to a quote → "Built for what's next."
Only PVC is claimed (the company name); no other patch types, no offers.
The site isn't live yet, so the order section is a designed three-step block,
not a screen recording.
"""
import json
import os
import sys

ROOT = sys.argv[1]


def S(id, src, a, b, n, tr='cut', interp=False, **kw):
    return dict(kind='shot', id=id, source=f'{src}.mp4', srcIn=a, srcOut=b, frames=n, interp=interp, trans=tr, **kw)


def STEPS(id, n, title, steps, url_at):
    return dict(kind='steps', id=id, frames=n, title=title, steps=steps, urlAt=url_at)


def step(at, n, title, sub, icon):
    return dict(at=at, n=n, title=title, sub=sub, icon=icon)


def W(t, at, hi=False):
    return dict(t=t, at=at, hi=hi)


def H(f, t, lines, top=250, size=120, dark=False):
    return dict(type='headline', **{'from': f}, to=t, top=top, size=size, sizes=None, dark=dark,
                lines=[[dict(t=w[0], at=w[1], hi=len(w) > 2 and w[2]) for w in l] for l in lines])


def L(f, t, text, dark=False, top=1530):
    return dict(type='label', **{'from': f}, to=t, text=text, dark=dark, top=top)


def U(f, t, text, top=1450, dark=False, size=42):
    return dict(type='sub', **{'from': f}, to=t, text=text, top=top, dark=dark, size=size)


def P(a, b):
    return dict(mode='panel', **{'from': a}, to=b)


def G(a, b, groups, title=None):
    g = dict(mode='gallery', **{'from': a}, to=b,
             groups=[dict(shots=x[0], word=x[1] if len(x) > 1 else None, sub=x[2] if len(x) > 2 else None) for x in groups])
    if title:
        g['title'] = [[list(w) for w in l] for l in title]
    return g


def build(name, items, text, card, vo, sound, wide):
    t = 0
    for it in items:
        it['from'] = t
        t += it['frames']
    for it in items:  # steps titles / cues are written relative to the block; make them absolute
        if it['kind'] == 'steps':
            it['title'] = [[dict(t=w[0], at=it['from'] + w[1], hi=len(w) > 2 and w[2]) for w in l] for l in it['title']]
            for s in it['steps']:
                s['at'] += it['from']
            it['urlAt'] += it['from']
    dur = t + card['len']
    d = dict(fps=30, durationInFrames=dur, studio=False, audio=True,
             shots=[i for i in items if i['kind'] == 'shot'], web=[], steps=[i for i in items if i['kind'] == 'steps'],
             cuts=[i['from'] for i in items[1:]] + [t], text=text, card={**card, 'from': t}, vo=vo, sound=sound, wide=wide)
    p = os.path.join(ROOT, f'src/fpp/{name}')
    os.makedirs(p, exist_ok=True)
    json.dump(d, open(os.path.join(p, 'edl.json'), 'w'), indent=1)
    print(f'{name}: {dur} f = {dur / 30:.2f} s · {len(d["shots"])} shots · {len(d["steps"])} steps blocks')


CTA = 'GET YOUR CUSTOM QUOTE'
CARD = dict(headline=[('BUILT', 0), ('FOR', 3), ("WHAT'S", 6), ('NEXT.', 9, True)], cta=CTA, variant='navy', enter='impact')
STEP_SUBS = [('SEND YOUR DESIGN', 'Your logo or artwork', 'upload'),
             ('CHOOSE SIZE & QUANTITY', 'Tell us what you need', 'size'),
             ('GET YOUR CUSTOM QUOTE', 'At futurepvcpatch.com', 'quote')]

# ------------------------------------------------------------------ 50 s
build('f50', [
    # 0:00–0:05 hook — PVC macros, "Not printed. Not stitched. Molded."
    S('a1', 'v3', 0.00, 1.20, 30, 'cut', drift=[1.0, 1.08]),
    S('a2', 'm21', 1.65, 2.60, 30, 'punch', interp=True),
    S('a3', 'm10', 1.65, 2.60, 30, 'punch', interp=True),
    S('a4', 'v3', 1.50, 3.30, 60, 'impact', drift=[1.0, 1.06]),
    # 0:05–0:13 what it looks and feels like
    S('b1', 'f05', 0.00, 2.00, 60, 'zoom', drift=[1.0, 1.08]),
    S('b2', 'm28', 1.50, 2.90, 60, 'whip', drift=[1.06, 1.0]),
    S('b3', 'm20', 1.50, 2.90, 60, 'whip', drift=[1.0, 1.08]),
    S('b4', 'f01', 3.00, 4.40, 60, 'punch', scale=1.22, origin=dict(x=540, y=700)),
    # 0:13–0:22 your design
    S('c1', 'm26', 1.50, 2.40, 45, 'impact', interp=True),
    S('c2', 'f05', 2.40, 4.40, 60, 'slide'),
    S('c3', 'v3', 3.30, 4.40, 45, 'slide', interp=True),
    S('c4', 'm28', 2.00, 2.90, 45, 'slide', interp=True, scale=1.25, origin=dict(x=540, y=900)),
    S('c5', 'f05', 4.40, 6.00, 75, 'zoom', drift=[1.0, 1.06]),
    # 0:22–0:31 where it goes
    S('d1', 'v3', 4.60, 8.00, 90, 'impact', drift=[1.04, 1.0]),
    S('d2', 'f09', 0.20, 2.00, 60, 'whip', drift=[1.0, 1.08]),
    S('d3', 'f08', 0.20, 2.00, 60, 'whip'),
    S('d4', 'f07', 0.00, 1.40, 60, 'whip', drift=[1.0, 1.06]),
    # 0:31–0:41 three steps (designed; the site isn't live yet)
    STEPS('order', 300, [[('GETTING', 6), ('STARTED', 10)], [('IS', 16), ('SIMPLE.', 20, True)]],
          [step(40, '01', *STEP_SUBS[0]), step(120, '02', *STEP_SUBS[1]), step(200, '03', *STEP_SUBS[2])], 240),
    # 0:41–0:46.5 finale montage
    S('e1', 'v3', 0.40, 0.90, 15, 'impact'),
    S('e2', 'f05', 1.00, 1.50, 15, 'punch'),
    S('e3', 'm28', 2.20, 2.70, 15, 'punch'),
    S('e4', 'm20', 2.20, 2.70, 15, 'punch'),
    S('e5', 'f01', 3.60, 4.10, 15, 'punch', scale=1.22, origin=dict(x=540, y=700)),
    S('e6', 'm26', 1.90, 2.40, 15, 'punch'),
    S('e7', 'v3', 6.40, 8.00, 75, 'impact', drift=[1.0, 1.06]),
], [
    H(4, 44, [[('NOT', 4), ('PRINTED.', 8)]], size=124),
    H(44, 88, [[('NOT', 44), ('STITCHED.', 48)]], size=124),
    H(90, 150, [[('MOLDED.', 92, True)]], size=150),
    H(152, 210, [[('3D', 154), ('RAISED.', 158, True)]], size=128), L(152, 210, 'LAYER ON LAYER'),
    H(210, 270, [[('CRISP', 212), ('EDGES.', 216, True)]], size=128), L(210, 270, 'CLEAN, SHARP DETAIL'),
    H(270, 330, [[('BOLD', 272), ('COLOR.', 276, True)]], size=128), L(270, 330, 'YOU CAN FEEL IT'),
    H(330, 390, [[('FLEXIBLE.', 332, True)]], size=136), L(330, 390, 'BENDS, NEVER FLAT'),
    H(392, 450, [[('YOUR', 394), ('LOGO.', 398, True)]], size=128),
    H(450, 510, [[('YOUR', 452), ('SHAPE.', 456, True)]], size=128),
    H(510, 585, [[('YOUR', 512), ('COLORS.', 516, True)]], size=128),
    H(585, 660, [[('BUILT', 588), ('AROUND', 592)], [('YOUR', 598), ('BRAND.', 602, True)]], size=112),
    H(662, 930, [[('ANYWHERE', 664)], [('YOUR', 670), ('BRAND', 674), ('GOES.', 678, True)]], size=104),
    L(662, 750, 'BAGS & GEAR'), L(750, 810, 'UNIFORMS'), L(810, 870, 'WORKWEAR'), L(870, 930, 'PERSONALIZED'),
    H(1232, 1320, [[('YOUR', 1234), ('BRAND.', 1238)], [('IN', 1250), ('3D.', 1254, True)]], size=124),
    H(1320, 1395, [[('BUILT', 1322), ('FOR', 1326)], [("WHAT'S", 1330), ('NEXT.', 1336, True)]], size=116),
], dict(CARD, len=105),
    [dict(at=0.3, to=4.6, line='Not printed. Not stitched. Molded.', marks=[0.3, 1.5, 3.0]),
     dict(at=5.2, to=12.6, line='Raised 3D layers. Crisp, clean edges. Bold color you can feel, on a patch that flexes in your hand.', marks=[5.2, 7.1, 9.1, 11.1]),
     dict(at=13.4, to=21.4, line='Your logo, your shape, your colors, molded layer by layer into a patch built around your brand.', marks=[13.4, 15.1, 17.1, 19.6]),
     dict(at=22.3, to=30.4, line='Made for bags and gear, uniforms, workwear and personalized pieces. Anywhere your brand shows up.'),
     dict(at=31.2, to=40.2, line='Getting started is simple. Send your design, choose your size and quantity, and get your custom quote at futurepvcpatch.com.', marks=[31.2, 32.5, 35.2, 37.9]),
     dict(at=41.4, to=48.8, line="Your brand, in 3D. Future PVC Patch. Built for what's next.", marks=[41.4, 44.0, 46.5])],
    dict(sections=[[0, 150, 'open'], [150, 390, 'groove'], [390, 660, 'warm'], [660, 930, 'full'], [930, 1230, 'half'], [1230, 1395, 'build'], [1395, 1500, 'tail']],
         machine=[], foley={'b1': 'pvc', 'b4': 'flex', 'c2': 'pvc', 'c5': 'pvc', 'd1': 'pvc', 'b2': 'pvc', 'b3': 'pvc'}),
    [P(0, 150), G(150, 390, [(['b1'], '3D RAISED.'), (['b2'], 'CRISP EDGES.'), (['b3'], 'BOLD COLOR.'), (['b4'], 'FLEXIBLE.')]),
     P(390, 660), G(660, 930, [(['d1'], 'BAGS & GEAR.'), (['d2'], 'UNIFORMS.'), (['d3'], 'WORKWEAR.'), (['d4'], 'PERSONALIZED.')]),
     P(1230, 1395)])

# ------------------------------------------------------------------ 30 s
build('f30', [
    S('a1', 'v3', 0.00, 1.20, 30, 'cut', drift=[1.0, 1.08]),
    S('a2', 'm21', 1.65, 2.60, 30, 'punch', interp=True),
    S('a3', 'm10', 1.65, 2.60, 30, 'punch', interp=True),
    S('a4', 'v3', 1.60, 2.80, 30, 'impact'),
    S('b1', 'f05', 0.00, 1.50, 45, 'zoom'),
    S('b2', 'm28', 1.50, 2.90, 45, 'whip'),
    S('b3', 'm20', 1.50, 2.90, 45, 'whip'),
    S('b4', 'f01', 3.00, 4.40, 45, 'punch', scale=1.22, origin=dict(x=540, y=700)),
    S('d1', 'v3', 4.60, 7.20, 75, 'impact'),
    S('d2', 'f09', 0.20, 1.40, 35, 'whip'),
    S('d3', 'f08', 0.20, 1.40, 35, 'whip'),
    S('d4', 'f07', 0.00, 1.20, 35, 'whip'),
    STEPS('order', 210, [[('3', 4), ('SIMPLE', 8), ('STEPS.', 12, True)]],
          [step(22, '01', *STEP_SUBS[0]), step(78, '02', *STEP_SUBS[1]), step(134, '03', *STEP_SUBS[2])], 166),
    S('e1', 'f05', 1.00, 1.50, 15, 'impact'),
    S('e2', 'm28', 2.20, 2.70, 15, 'punch'),
    S('e3', 'm20', 2.20, 2.70, 15, 'punch'),
    S('e4', 'f01', 3.60, 4.10, 15, 'punch', scale=1.22, origin=dict(x=540, y=700)),
    S('e5', 'm26', 1.90, 2.40, 15, 'punch'),
    S('e6', 'v3', 6.60, 8.00, 35, 'impact'),
], [
    H(4, 34, [[('NOT', 4), ('PRINTED.', 8)]], size=124),
    H(34, 64, [[('NOT', 34), ('STITCHED.', 38)]], size=124),
    H(64, 120, [[('MOLDED.', 66, True)]], size=150),
    H(122, 165, [[('3D', 122), ('RAISED.', 126, True)]], size=128),
    H(165, 210, [[('CRISP', 166), ('EDGES.', 170, True)]], size=128),
    H(210, 255, [[('BOLD', 211), ('COLOR.', 215, True)]], size=128),
    H(255, 300, [[('FLEXIBLE.', 256, True)]], size=136),
    H(302, 480, [[('ANYWHERE', 304)], [('YOUR', 310), ('BRAND', 314), ('GOES.', 318, True)]], size=104),
    L(302, 375, 'BAGS & GEAR'), L(375, 410, 'UNIFORMS'), L(410, 445, 'WORKWEAR'), L(445, 480, 'PERSONALIZED'),
    H(692, 790, [[('YOUR', 694), ('BRAND.', 698)], [('IN', 710), ('3D.', 714, True)]], size=124),
], dict(CARD, len=100),
    [dict(at=0.3, to=3.7, line='Not printed. Not stitched. Molded.'),
     dict(at=4.1, to=9.6, line='Raised 3D layers, crisp edges and bold color, on a patch that flexes.'),
     dict(at=10.2, to=15.4, line='Made for bags, uniforms, workwear and more.'),
     dict(at=16.3, to=22.6, line='Send your design, choose your size and quantity, and get your custom quote.'),
     dict(at=23.4, to=29.0, line="Future PVC Patch. Built for what's next.")],
    dict(sections=[[0, 120, 'open'], [120, 300, 'groove'], [300, 480, 'full'], [480, 690, 'half'], [690, 800, 'build'], [800, 900, 'tail']],
         machine=[], foley={'b1': 'pvc', 'b4': 'flex', 'd1': 'pvc'}),
    [P(0, 120), G(120, 300, [(['b1'], '3D RAISED.'), (['b2'], 'CRISP EDGES.'), (['b3'], 'BOLD COLOR.'), (['b4'], 'FLEXIBLE.')]),
     G(300, 480, [(['d1'], 'BAGS & GEAR.'), (['d2'], 'UNIFORMS.'), (['d3'], 'WORKWEAR.'), (['d4'], 'PERSONALIZED.')]),
     P(690, 800)])

# ------------------------------------------------------------------ 15 s
build('f15', [
    S('a1', 'v3', 0.20, 0.47, 8, 'cut'), S('a2', 'm21', 1.70, 1.97, 8, 'cut'),
    S('a3', 'm10', 1.70, 1.97, 8, 'cut'), S('a4', 'm26', 1.60, 1.87, 8, 'cut'),
    S('a5', 'f05', 0.00, 1.90, 58, 'impact', drift=[1.0, 1.08]),
    S('b1', 'm28', 1.60, 2.10, 15, 'punch'), S('b2', 'm20', 1.60, 2.10, 15, 'punch'),
    S('b3', 'f01', 3.10, 3.60, 15, 'punch', scale=1.22, origin=dict(x=540, y=700)), S('b4', 'v3', 2.00, 2.50, 15, 'punch'),
    S('b5', 'v3', 6.40, 6.90, 15, 'punch'), S('b6', 'f09', 0.80, 1.30, 15, 'punch'),
    S('b7', 'f08', 0.40, 0.90, 15, 'punch'), S('b8', 'f07', 0.30, 0.80, 15, 'punch'),
    STEPS('order', 120, [[('ORDER', 2), ('IN', 6), ('3', 10), ('STEPS.', 14, True)]],
          [step(12, '01', *STEP_SUBS[0]), step(40, '02', *STEP_SUBS[1]), step(68, '03', *STEP_SUBS[2])], 90),
    S('e1', 'v3', 6.20, 8.00, 60, 'impact', drift=[1.0, 1.06]),
], [
    H(0, 45, [[('YOUR', 0), ('LOGO.', 4)]], size=136),
    H(45, 90, [[('IN', 46), ('3D.', 50, True)]], size=160),
    H(90, 210, [[('CUSTOM', 92), ('PVC', 96, True), ('PATCHES', 100)], [('FOR', 120), ('BRANDS,', 124)], [('TEAMS', 140), ('&', 144), ('BUSINESSES.', 148, True)]], size=92),
    H(332, 390, [[('BUILT', 334), ('FOR', 338)], [("WHAT'S", 342), ('NEXT.', 348, True)]], size=116),
], dict(CARD, len=60, headline=[('YOUR', 0), ('LOGO.', 3), ('IN', 7), ('3D.', 10, True)]),
    [dict(at=0.2, to=2.6, line='Your logo. In 3D.'),
     dict(at=3.0, to=6.8, line='Custom PVC patches for brands, teams and businesses.'),
     dict(at=7.2, to=10.8, line='Send your design and get your custom quote at futurepvcpatch.com.'),
     dict(at=11.2, to=14.4, line="Future PVC Patch. Built for what's next.")],
    dict(sections=[[0, 90, 'hook'], [90, 210, 'full'], [210, 330, 'half'], [330, 390, 'build'], [390, 450, 'tail']],
         machine=[], foley={'a5': 'pvc', 'e1': 'pvc'}),
    [P(0, 90), G(90, 210, [(['b1', 'b2'],), (['b3', 'b4'],), (['b5', 'b6'],), (['b7', 'b8'],)],
                  title=[[('CUSTOM', 92), ('PVC', 96, True), ('PATCHES', 100), ('FOR', 120), ('BRANDS,', 124), ('TEAMS', 140), ('&', 144), ('BUSINESSES.', 148, True)]]),
     P(330, 390)])
