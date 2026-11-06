"""Markhor flagship cuts — edit source. Writes src/markhor/{flag50,flag30,meta15,hero}/edl.json.
    python3 -I scripts/markhor-flagship-specs.py .
Timeline items are placed back to back; 'web' items render inside the phone composite."""
import json, os, sys
ROOT = sys.argv[1]

def S(id, src, a, b, n, tr='cut', interp=False, **kw):
    return dict(kind='shot', id=id, source=f'{src}.mp4', srcIn=a, srcOut=b, frames=n, interp=interp, trans=tr, **kw)
def W(id, src, a, b, n, taps=(), focus=(0.5, 1.0), chips=None):
    # taps: (local frame, x, y) in source px (1080 x 2316, before the status-bar crop)
    return dict(kind='web', id=id, source=f'{src}.mp4', srcIn=a, srcOut=b, frames=n, taps=[list(t) for t in taps], focus=list(focus), chips=chips)
def H(f, t, lines, top=250, size=120, dark=False, sizes=None):
    return dict(type='headline', **{'from': f}, to=t, top=top, size=size, sizes=sizes, dark=dark,
                lines=[[dict(t=w[0], at=w[1], hi=len(w) > 2 and w[2]) for w in l] for l in lines])
def L(f, t, text, dark=False, top=1530): return dict(type='label', **{'from': f}, to=t, text=text, dark=dark, top=top)
def U(f, t, text, top=1450, dark=False, size=42): return dict(type='sub', **{'from': f}, to=t, text=text, top=top, dark=dark, size=size)

def build(name, items, text, card, vo, sound, audio=True, extra=None):
    t = 0
    for it in items:
        it['from'] = t; t += it['frames']
    dur = t + (card['len'] if card else 0)
    d = dict(fps=30, durationInFrames=dur, studio=False, audio=audio,
             shots=[i for i in items if i['kind'] == 'shot'], web=[i for i in items if i['kind'] == 'web'],
             cuts=[i['from'] for i in items[1:]] + [t], text=text, vo=vo, sound=sound)
    if card: d['card'] = {**card, 'from': t}
    if extra: d.update(extra)
    p = os.path.join(ROOT, f'src/markhor/{name}'); os.makedirs(p, exist_ok=True)
    json.dump(d, open(os.path.join(p, 'edl.json'), 'w'), indent=1)
    print(f'{name}: {dur} f = {dur / 30:.2f} s · {len(d["shots"])} shots · {len(d["web"])} web')

CARD = dict(headline=[('CUSTOM', 0), ('PATCHES', 3), ('FOR', 6), ('BOLD', 9), ('BRANDS.', 12, True)],
            cta='GET YOUR CUSTOM QUOTE', variant='navy', enter='impact')

# web building blocks (source times verified frame by frame; the file picker in w03 1–4.6 s and the
# upload error from 8.9 s are never used)
def web_choose(n):   return W('wchoose', 'w02', 0.55, 0.55 + n / 30, n, taps=[(14, 234, 882)], focus=(0.42, 1.18))
def web_wizard(n, a=9.8, b=15.2): return W('wwizard', 'w01', a, b, n, focus=(0.38, 1.12), chips=['SIZE', 'QUANTITY', 'SHAPE', 'ATTACHMENT', 'BORDER'])
def web_art(n):      return W('wart', 'w02', 17.7, 18.5, n, taps=[(12, 540, 1250)], focus=(0.45, 1.12))
def web_up(n, b=8.5): return W('wup', 'w03', 5.0, b, n, focus=(0.4, 1.2))
def web_quote(n):    return W('wquote', 'w04', 0.0, min(1.6, n / 30), n, taps=[(20, 540, 1562)], focus=(0.66, 1.15))
def web_home(n):     return W('whome', 'w04', 0.0, n / 30, n, focus=(0.4, 1.0))

# ------------------------------------------------------------------ 50 s flagship
build('flag50', [
  # 0:00–0:05 opening — needle, PVC, chenille on hits, then the real website
  S('a0', 'f06', 1.40, 2.40, 30, 'cut', drift=[1.0, 1.06]),
  S('a1', 'f05', 0.00, 0.60, 15, 'punch'),
  S('a2', 'f04', 0.00, 0.60, 15, 'punch'),
  S('a3', 'f06', 2.60, 3.60, 30, 'punch', scale=1.1, origin=dict(x=540, y=900)),
  S('a4', 'f04', 1.60, 2.10, 15, 'punch', scale=1.15),
  web_home(45),
  # 0:05–0:13 applications — one word per VO beat
  S('b1', 'f02', 0.00, 1.10, 30, 'impact', drift=[1.04, 1.0]),
  S('b2', 'f14', 0.10, 1.10, 30, 'punch'),
  S('b3', 'f04', 3.00, 4.00, 30, 'whip', drift=[1.0, 1.05]),
  S('b4', 'f10', 0.00, 1.20, 30, 'punch'),
  S('b5', 'f09', 0.20, 2.20, 60, 'whip', drift=[1.0, 1.1], origin=dict(x=620, y=1250)),
  S('b6', 'f08', 0.20, 1.40, 30, 'whip'),
  S('b7', 'f08', 3.10, 4.30, 30, 'punch', drift=[1.05, 1.0]),
  # 0:13–0:22 personalization
  S('c1', 'f07', 1.60, 3.00, 42, 'dissolve', drift=[1.0, 1.06]),
  S('c2', 'f12', 1.50, 3.70, 66, 'slide'),
  S('c3', 'f15', 2.00, 4.00, 60, 'slide', drift=[1.04, 1.0]),
  S('c4', 'f11', 3.60, 5.60, 60, 'slide'),
  S('c5', 'f01', 2.60, 4.00, 42, 'zoom', drift=[1.0, 1.05]),
  # 0:22–0:31 patch types, cut on the VO words
  S('d1', 'f06', 3.60, 5.00, 60, 'impact', drift=[1.0, 1.08]),
  S('d2', 'f05', 2.40, 3.90, 45, 'punch'),
  S('d3', 'm21', 3.30, 4.00, 30, 'punch', interp=True),
  S('d4', 'f02', 0.00, 1.40, 45, 'punch', drift=[1.08, 1.0]),
  S('d5', 'm26', 4.55, 5.30, 30, 'punch', drift=[1.0, 1.06]),
  S('d6', 'f02', 4.10, 6.00, 60, 'punch', drift=[1.0, 1.08]),
  # 0:31–0:41 how to order — the real website
  web_choose(70),
  web_wizard(54),
  web_art(24),
  web_up(62),
  web_quote(90),
  # 0:41–0:50 finale
  S('e1', 'f06', 0.00, 1.20, 30, 'impact', drift=[1.0, 1.08]),
  S('e2', 'f14', 3.40, 3.90, 15, 'punch'),
  S('e3', 'f10', 0.30, 0.80, 15, 'punch'),
  S('e4', 'f07', 2.20, 2.70, 15, 'punch'),
  S('e5', 'f08', 3.60, 4.10, 15, 'punch'),
  S('e6', 'f05', 4.00, 4.50, 15, 'punch'),
  S('e7', 'f12', 2.60, 3.10, 15, 'punch'),
  S('e8', 'f01', 3.00, 4.70, 45, 'impact', drift=[1.0, 1.06]),
 ], [
  H(6, 58, [[('YOUR', 6), ('DESIGN.', 12, True)]], size=128),
  H(60, 104, [[('YOUR', 60), ('IDENTITY.', 66, True)]], size=128),
  H(105, 150, [[('YOUR', 107), ('PATCH.', 112, True)]], size=120, dark=True, top=230),
  H(150, 210, [[('BRANDS.', 152, True)]], size=150), L(150, 210, 'CLOTHING BRANDS & CAPS'),
  H(210, 270, [[('TEAMS.', 212, True)]], size=150), L(210, 270, 'BASKETBALL · BASEBALL'),
  H(270, 330, [[('SCHOOLS.', 272, True)]], size=150), L(270, 330, 'SCHOOL UNIFORMS'),
  H(330, 390, [[('BUSINESSES.', 332, True)]], size=130), L(330, 390, 'CORPORATE WORKWEAR'),
  L(390, 432, 'NAME PATCHES'), L(432, 498, 'PERSONALIZED GIFTS'), L(498, 558, 'BAGS & TOTES'), L(558, 618, 'JACKETS & APPAREL'),
  H(410, 650, [[('MADE', 412), ('FOR', 416), ('YOUR', 420)], [('IDENTITY.', 428, True)]], size=118),
  H(660, 720, [[('EMBROIDERED.', 668, True)]], size=118), L(660, 720, '01 / 06'),
  H(720, 765, [[('PVC.', 722, True)]], size=150), L(720, 765, '02 / 06'),
  H(765, 795, [[('CHENILLE.', 766, True)]], size=136), L(765, 795, '03 / 06'),
  H(795, 840, [[('WOVEN.', 797, True)]], size=150), L(795, 840, '04 / 06'),
  H(840, 870, [[('LEATHER.', 841, True)]], size=140), L(840, 870, '05 / 06'),
  H(870, 930, [[('FULL-COLOR.', 872, True)]], size=124), L(870, 930, '06 / 06'),
  H(930, 1054, [[('CHOOSE', 934), ('YOUR', 938)], [('STYLE.', 944, True)]], size=84, dark=True, top=170),
  H(1054, 1140, [[('SHARE', 1056), ('YOUR', 1060)], [('DESIGN.', 1066, True)]], size=84, dark=True, top=170),
  H(1140, 1194, [[('REQUEST', 1142), ('YOUR', 1146)], [('QUOTE.', 1152, True)]], size=84, dark=True, top=170),
  H(1194, 1230, [[("IT'S", 1195), ('THAT', 1198)], [('SIMPLE.', 1202, True)]], size=84, dark=True, top=170),
  H(1230, 1290, [[('PREMIUM', 1232)], [('DETAIL.', 1238, True)]], size=124),
  H(1290, 1395, [[('YOUR', 1296), ('VISION.', 1300, True)], [('BROUGHT', 1350), ('TO', 1354), ('LIFE.', 1358, True)]], size=110),
 ], dict(CARD, len=105),
 [dict(at=0.5, to=3.6, line='Every great brand starts with an identity.'),
  dict(at=5.2, to=12.6, line='Your clothing brand. Your team. Your school. Your business.', marks=[5.2, 7.1, 9.1, 11.1]),
  dict(at=13.6, to=17.8, line="Whatever you're creating, make it unmistakably yours."),
  dict(at=22.3, to=30.0, line='From classic embroidery to bold PVC, chenille, woven, leather and full-color patches.', marks=[22.3, 24.0, 25.5, 26.5, 28.0, 29.0]),
  dict(at=31.3, to=40.0, line="Choose your style. Share your design. Request your custom quote. It's that simple.", marks=[31.3, 35.2, 38.0, 39.4]),
  dict(at=41.2, to=49.0, line='Premium detail. Your vision brought to life. Markhor Patches. Make your mark.', marks=[41.2, 43.0, 46.5, 48.0])],
 dict(sections=[[0, 150, 'open'], [150, 390, 'groove'], [390, 660, 'warm'], [660, 930, 'full'], [930, 1230, 'half'], [1230, 1380, 'build'], [1380, 1500, 'tail']],
      machine=['a0', 'a3', 'd1', 'e1'], foley={'c2': 'box', 'c4': 'press', 'd2': 'pvc', 'd3': 'brush', 'd4': 'fabric', 'd5': 'leather', 'c1': 'cloth', 'c3': 'cloth'}))

# ------------------------------------------------------------------ 30 s condensed
build('flag30', [
  S('a0', 'f06', 1.40, 2.40, 30, 'cut', drift=[1.0, 1.06]),
  S('a1', 'f05', 0.00, 0.60, 15, 'punch'),
  S('a2', 'f04', 0.00, 0.60, 15, 'punch'),
  S('a3', 'f06', 2.60, 3.60, 30, 'punch', scale=1.1, origin=dict(x=540, y=900)),
  web_home(30),
  S('b1', 'f14', 0.10, 1.60, 45, 'impact'),
  S('b2', 'f04', 3.00, 4.00, 30, 'whip'),
  S('b3', 'f10', 0.00, 0.60, 15, 'punch'),
  S('b4', 'f09', 0.30, 1.80, 45, 'whip', drift=[1.0, 1.1], origin=dict(x=620, y=1250)),
  S('b5', 'f08', 3.10, 4.60, 45, 'whip'),
  S('d1', 'f06', 3.60, 4.60, 30, 'impact'),
  S('d2', 'f05', 2.40, 3.40, 30, 'punch'),
  S('d3', 'm21', 3.30, 4.00, 30, 'punch', interp=True),
  S('d4', 'f02', 0.00, 1.00, 30, 'punch'),
  S('d5', 'm26', 4.55, 5.30, 30, 'punch'),
  S('d6', 'f02', 4.20, 5.20, 30, 'punch'),
  web_choose(60),
  web_up(60, b=8.5),
  web_quote(90),
  S('e1', 'f07', 2.20, 2.70, 15, 'impact'),
  S('e2', 'f12', 2.60, 3.10, 15, 'punch'),
  S('e3', 'f15', 2.50, 3.00, 15, 'punch'),
  S('e4', 'f08', 3.60, 4.10, 15, 'punch'),
  S('e5', 'f01', 3.00, 4.80, 60, 'impact', drift=[1.0, 1.06]),
 ], [
  H(6, 58, [[('YOUR', 6), ('DESIGN.', 12, True)]], size=128),
  H(60, 90, [[('YOUR', 60), ('IDENTITY.', 64, True)]], size=128),
  H(90, 120, [[('YOUR', 92), ('PATCH.', 96, True)]], size=120, dark=True, top=230),
  H(120, 165, [[('BRANDS.', 122, True)]], size=150),
  H(165, 210, [[('TEAMS.', 166, True)]], size=150),
  H(210, 255, [[('SCHOOLS.', 212, True)]], size=150),
  H(255, 300, [[('BUSINESSES.', 257, True)]], size=130),
  H(300, 330, [[('EMBROIDERED.', 302, True)]], size=118), H(330, 360, [[('PVC.', 331, True)]], size=150),
  H(360, 390, [[('CHENILLE.', 361, True)]], size=136), H(390, 420, [[('WOVEN.', 391, True)]], size=150),
  H(420, 450, [[('LEATHER.', 421, True)]], size=140), H(450, 480, [[('FULL-COLOR.', 451, True)]], size=124),
  H(480, 540, [[('CHOOSE', 482), ('YOUR', 486)], [('STYLE.', 492, True)]], size=84, dark=True, top=170),
  H(540, 600, [[('SHARE', 542), ('YOUR', 546)], [('DESIGN.', 552, True)]], size=84, dark=True, top=170),
  H(600, 690, [[('REQUEST', 602), ('YOUR', 606)], [('QUOTE.', 612, True)]], size=84, dark=True, top=170),
  H(690, 810, [[('YOUR', 694), ('VISION.', 698, True)], [('BROUGHT', 750), ('TO', 754), ('LIFE.', 758, True)]], size=110),
 ], dict(CARD, len=90),
 [dict(at=0.4, to=3.0, line='Every great brand starts with an identity.'),
  dict(at=4.1, to=9.6, line='Your brand. Your team. Your school. Your business.', marks=[4.1, 5.6, 7.1, 8.6]),
  dict(at=10.1, to=15.6, line='From embroidery to PVC, chenille, woven, leather and full-color.'),
  dict(at=16.2, to=22.4, line='Choose your style. Share your design. Request your custom quote.', marks=[16.2, 18.2, 20.2]),
  dict(at=23.4, to=29.2, line='Premium detail. Your vision, brought to life. Markhor Patches. Make your mark.')],
 dict(sections=[[0, 120, 'open'], [120, 300, 'groove'], [300, 480, 'full'], [480, 690, 'half'], [690, 790, 'build'], [790, 900, 'tail']],
      machine=['a0', 'a3', 'd1'], foley={'d2': 'pvc', 'd3': 'brush', 'd4': 'fabric', 'd5': 'leather', 'e2': 'box'}))

# ------------------------------------------------------------------ 15 s Meta ad
build('meta15', [
  S('a0', 'f06', 1.40, 1.90, 15, 'cut'),
  S('a1', 'f05', 0.00, 0.30, 8, 'cut'), S('a2', 'f04', 0.00, 0.30, 8, 'cut'),
  S('a3', 'm21', 3.30, 3.60, 8, 'cut'), S('a4', 'f02', 0.20, 0.50, 8, 'cut'),
  S('a5', 'm26', 4.60, 4.87, 8, 'cut'), S('a6', 'f02', 4.40, 4.70, 8, 'cut'),
  S('a7', 'f06', 2.80, 3.40, 17, 'punch'),
  S('b1', 'f14', 0.30, 0.80, 15, 'impact'), S('b2', 'f04', 3.00, 3.50, 15, 'punch'),
  S('b3', 'f10', 0.00, 0.50, 15, 'punch'), S('b4', 'f09', 0.80, 1.30, 15, 'punch'),
  S('b5', 'f08', 3.20, 3.70, 15, 'punch'), S('b6', 'f07', 2.20, 2.70, 15, 'punch'),
  S('b7', 'f15', 2.50, 3.00, 15, 'punch'), S('b8', 'f12', 2.60, 3.10, 15, 'punch'),
  web_choose(45),
  web_up(40, b=8.5),
  web_quote(45),
  S('e1', 'f01', 3.00, 4.40, 60, 'impact', drift=[1.0, 1.06]),
 ], [
  H(0, 40, [[('YOUR', 0), ('LOGO.', 4, True)]], size=136),
  H(40, 80, [[('AS', 40), ('A', 43)], [('PREMIUM', 46), ('PATCH.', 50, True)]], size=116),
  H(80, 200, [[('FOR', 84), ('BRANDS,', 88)], [('TEAMS', 104), ('&', 108), ('SCHOOLS.', 112, True)]], size=104),
  H(200, 245, [[('CHOOSE', 202), ('YOUR', 205)], [('STYLE.', 209, True)]], size=84, dark=True, top=170),
  H(245, 285, [[('UPLOAD', 246), ('YOUR', 249)], [('DESIGN.', 253, True)]], size=84, dark=True, top=170),
  H(285, 330, [[('GET', 286), ('YOUR', 289)], [('QUOTE.', 293, True)]], size=84, dark=True, top=170),
  H(330, 390, [[('MAKE', 332), ('YOUR', 336)], [('MARK.', 342, True)]], size=124),
 ], dict(CARD, len=60, headline=[('YOUR', 0), ('DESIGN.', 3), ('YOUR', 7), ('PATCH.', 10, True)]),
 [dict(at=0.2, to=2.6, line='Your design. Your identity. Your patch.'),
  dict(at=2.9, to=6.4, line='Made for brands, teams and schools.'),
  dict(at=6.8, to=10.8, line='Choose your style, upload your design and request your custom quote.'),
  dict(at=11.2, to=14.4, line='Markhor Patches. Make your mark.')],
 dict(sections=[[0, 80, 'hook'], [80, 200, 'full'], [200, 330, 'half'], [330, 390, 'build'], [390, 450, 'tail']],
      machine=['a0', 'a7'], foley={}))

# ------------------------------------------------------------------ website hero (muted, loop)
build('hero', [
  S('h1', 'f06', 1.40, 2.60, 60, 'cut', interp=True, drift=[1.0, 1.06]),
  S('h2', 'f05', 0.00, 1.20, 45, 'dissolve', interp=True, drift=[1.04, 1.0]),
  S('h3', 'f04', 0.00, 1.20, 45, 'dissolve', interp=True),
  S('h4', 'f02', 0.00, 1.20, 45, 'dissolve', interp=True, drift=[1.06, 1.0]),
  S('h5', 'f02', 4.20, 5.40, 45, 'dissolve', interp=True),
  S('h6', 'f01', 3.00, 4.40, 60, 'dissolve', interp=True, drift=[1.0, 1.05]),
 ], [], None, [], dict(sections=[]), audio=False, extra=dict(loop=dict(at=285, dur=15)))
