"""Future PVC Patch — Meta ads A (≈40 s VO → 45.5 s) and B (≈23 s VO → 25.5 s).

    python3 -I scripts/fpp-ads-specs.py .

Writes src/fpp/ads/{a40,b23}.json for src/fpp/ads/FppAd.tsx. The voiceover is
the master clock: every cut below is a time (s) chosen against the word onsets
in src/fpp/ads/vo-{a,b}.json (forced alignment of the ElevenLabs recordings),
usually 1–3 frames ahead of the word. Footage is generic product footage from
earlier batches plus the two new PVC clips (n1 varsity lion, n2 eagle cap);
no Markhor/Madvert branding appears in any of it.

Website funnel ("desk") segments come from the real quote-funnel screen
recording and only use moments that show the real flow working: step 1
(type), step 3 (size), step 5 (upload: drop zone + file attached) and step 7
(empty contact form + "Request my free quote" button). Never used: the OS
file picker (14.0–14.9 s), the upload error (16 s+), the filled-in contact
form with personal details (23 s+) and the save error (29 s+).
"""
import json
import os
import sys

ROOT = sys.argv[1]
FPS = 30
fr = lambda t: int(round(t * FPS))  # noqa: E731


def timeline(cuts, end):
    """cuts: [(t, id, src, srcIn, srcOut, trans, extra)] → shots with from/frames."""
    out = []
    for i, c in enumerate(cuts):
        t, sid, src, a, b, tr = c[:6]
        extra = c[6] if len(c) > 6 else {}
        t1 = cuts[i + 1][0] if i + 1 < len(cuts) else end
        n = fr(t1) - fr(t)
        out.append(dict(id=sid, source=f'{src}.mp4', from_=fr(t), frames=n, srcIn=a, srcOut=b, trans=tr,
                        interp=extra.pop('interp', False), **extra))
    for s in out:
        s['from'] = s.pop('from_')
    return out


def desk(t0, segs, end):
    """segs: [(dur_s, id, srcIn, srcOut, focus(cx,cy,zoom), taps[(local_s, x, y)], step, title, kind)]"""
    out, t = [], t0
    for i, sg in enumerate(segs):
        dur, sid, a, b, focus, taps, step, title, kind = sg
        t1 = end if i == len(segs) - 1 else t + dur
        n = fr(t1) - fr(t)
        out.append(dict(id=sid, source='web.mp4', from_=fr(t), frames=n, srcIn=a, srcOut=b, focus=list(focus),
                         taps=[[fr(lt), x, y] for lt, x, y in taps], step=step, title=title, kind=kind))
        t = t1
    for s in out:
        s['from'] = s.pop('from_')
    return out


def H(t0, t1, lines, top=240, size=112, style='head'):
    return dict(type=style, **{'from': fr(t0)}, to=fr(t1), top=top, size=size,
                lines=[[dict(t=w[0], at=fr(w[1]), hi=len(w) > 2 and w[2]) for w in l] for l in lines])


def L(t0, t1, text, top=1180):
    return dict(type='label', **{'from': fr(t0)}, to=fr(t1), text=text, top=top)


def SLAM(t0, t1, word, size=200, top=300, sub=None):
    return dict(type='slam', **{'from': fr(t0)}, to=fr(t1), text=word, size=size, top=top, sub=sub)


def MAT(t0, t1, word, idx):
    return dict(type='material', **{'from': fr(t0)}, to=fr(t1), text=word, idx=idx)


def write(name, d):
    p = os.path.join(ROOT, 'src/fpp/ads', f'{name}.json')
    json.dump(d, open(p, 'w'), indent=1)
    print(f'{name}: {d["durationInFrames"]} f = {d["durationInFrames"] / FPS:.2f} s · {len(d["shots"])} shots · {len(d["desk"])} desk segs')


# ====================================================================== AD A (40 s VO)
A_END = 45.5
a_shots = timeline([
    (0.00, 'a01', 'n1', 6.00, 7.10, 'cut', dict(scale=1.08, drift=[1.0, 1.08])),                 # Your logo.
    (1.10, 'a02', 'n2', 4.00, 5.20, 'punch', dict(drift=[1.04, 1.0])),                            # Your identity.
    (2.23, 'a03', 'f01', 0.00, 1.60, 'punch', dict(drift=[1.0, 1.06])),                           # Your custom patch.
    (3.85, 'a04', 'f05', 2.40, 3.90, 'impact', dict(drift=[1.0, 1.06])),                          # bold PVC patches
    (5.42, 'a05', 'n1', 0.00, 1.40, 'whip', dict(drift=[1.04, 1.0])),                             # on varsity jackets
    (6.58, 'a06', 'ed', 0.00, 1.60, 'whip', dict(drift=[1.0, 1.06])),                             # embroidered logos
    (7.72, 'a07', 'f14', 0.10, 1.20, 'punch'),                                                    # on caps
    (8.62, 'a08', 'f07', 1.60, 2.80, 'whip', dict(drift=[1.0, 1.05])),                            # personalized names
    (9.55, 'a09', 'm25', 0.00, 1.40, 'punch', dict(drift=[1.05, 1.0])),                           # on polo shirts
    (10.82, 'a10', 'ea', 0.00, 2.40, 'dissolve', dict(drift=[1.0, 1.06])),                        # turn your designs into
    (12.00, 'a11', 'lc', 3.00, 5.00, 'zoom', dict(drift=[1.0, 1.05])),                            # something people can wear
    (13.85, 'a12', 'm10', 1.65, 2.60, 'impact', dict(interp=True)),                               # PVC
    (15.25, 'a13', 'f06', 1.40, 2.40, 'punch', dict(scale=1.06)),                                 # embroidered
    (16.05, 'a14', 'f04', 0.00, 0.80, 'punch'),                                                   # chenille
    (16.85, 'a15', 'f02', 0.00, 0.80, 'punch'),                                                   # woven
    (17.62, 'a16', 'm26', 4.55, 5.30, 'punch', dict(interp=True)),                                # leather
    (18.98, 'a17', 'm20', 1.50, 2.40, 'whip'),                                                    # different styles
    (19.98, 'a18', 'm21', 3.30, 4.00, 'zoom', dict(interp=True)),                                 # textures
    (20.95, 'a19', 'm28', 6.75, 7.98, 'zoom', dict(interp=True, scale=1.32, origin=dict(x=760, y=700), drift=[1.08, 1.0])),               # endless possibilities
    (22.70, 'a20', 'ed', 4.50, 6.20, 'impact', dict(drift=[1.0, 1.06])),                          # clothing brands
    (23.95, 'a21', 'f10', 0.00, 1.10, 'whip'),                                                    # sports teams
    (25.05, 'a22', 'f08', 0.20, 1.40, 'whip'),                                                    # businesses
    (26.18, 'a23', 'f11', 3.60, 5.60, 'slide', dict(drift=[1.0, 1.05])),                          # anyone who wants to stand out
    (28.05, 'a24', 'n1', 4.40, 6.00, 'dissolve', dict(interp=True, drift=[1.0, 1.1])),            # smallest details
    (29.65, 'a25', 'f06', 3.60, 4.20, 'punch', dict(scale=1.1)),                                  # make the
    (30.10, 'a26', 'lc', 4.50, 7.50, 'impact', dict(drift=[1.08, 1.0])),                          # biggest impression
], 31.55)
a_desk = desk(37.75, [
    (1.30, 'wtype', 4.00, 5.60, (330, 290, 1.28), [(0.25, 131, 296)], 1, 'SELECT YOUR PATCH TYPE', 'type'),
    (1.10, 'wsize', 8.30, 10.70, (330, 300, 1.55), [(0.10, 122, 304), (0.60, 340, 304)], 2, 'CHOOSE YOUR SIZE', 'size'),
    (0.55, 'wup1', 12.45, 13.20, (520, 380, 1.32), [(0.25, 519, 385)], 3, 'UPLOAD YOUR ARTWORK', 'upload'),
    (0.50, 'wup2', 15.35, 15.90, (470, 520, 1.32), [], 3, 'UPLOAD YOUR ARTWORK', 'uploaded'),
    (2.10, 'wquote', 21.70, 22.75, (560, 500, 1.12), [(0.55, 835, 713), (1.35, 835, 713)], 4, 'GET YOUR QUOTE', 'quote'),
], 43.30)
a_text = [
    H(0.00, 1.06, [[('YOUR', 0.06), ('LOGO.', 0.25, True)]], size=150, top=300),
    H(1.10, 2.20, [[('YOUR', 1.13), ('IDENTITY.', 1.28, True)]], size=128, top=300),
    H(2.23, 3.82, [[('YOUR', 2.26), ('CUSTOM', 2.42)], [('PATCH.', 2.89, True)]], size=132, top=270),
    L(3.85, 5.40, 'BOLD PVC'), L(5.42, 6.56, 'VARSITY JACKETS'), L(6.58, 7.70, 'EMBROIDERED LOGOS'),
    L(7.72, 8.60, 'CAPS'), L(8.62, 9.53, 'PERSONALIZED NAMES'), L(9.55, 10.80, 'POLO SHIRTS'),
    H(10.82, 13.80, [[('TURN', 10.87), ('YOUR', 11.10), ('DESIGNS', 11.34)], [('INTO', 11.83), ('SOMETHING', 12.01)], [('PEOPLE', 12.45), ('WEAR.', 12.86, True)]], size=92, top=250),
    MAT(13.85, 15.23, 'PVC', 1), MAT(15.25, 16.03, 'EMBROIDERED', 2), MAT(16.05, 16.83, 'CHENILLE', 3),
    MAT(16.85, 17.60, 'WOVEN', 4), MAT(17.62, 18.96, 'LEATHER', 5),
    H(18.98, 22.66, [[('ENDLESS', 21.12)], [('POSSIBILITIES.', 21.35, True)]], size=96, top=280),
    L(18.98, 19.96, 'STYLES'), L(19.98, 20.93, 'TEXTURES'),
    L(22.70, 23.93, 'CLOTHING BRANDS'), L(23.95, 25.03, 'SPORTS TEAMS'), L(25.05, 26.16, 'BUSINESSES'),
    H(26.18, 28.00, [[('STAND', 27.04), ('OUT.', 27.39, True)]], size=150, top=300),
    H(28.05, 31.50, [[('SMALL', 28.42), ('DETAILS.', 28.99)], [('BIG', 30.12), ('IMPRESSION.', 30.44, True)]], size=100, top=270),
]
a = dict(fps=FPS, durationInFrames=fr(A_END), style='premium', vo='a', voFile='fpp-a40', shots=a_shots, desk=a_desk, text=a_text,
         reveal=dict(**{'from': fr(31.55)}, to=fr(35.72), lines=[[('YOUR', 33.26), ('DESIGN.', 33.49)], [('MADE', 34.28), ('TO', 34.54), ('STAND', 34.63), ('OUT.', 35.00, True)]]),
         cta=dict(**{'from': fr(35.72)}, to=fr(37.75), clickAt=fr(35.78), quoteAt=fr(36.53)),
         card=dict(**{'from': fr(43.30)}),
         capsOff=[[0, fr(3.85)], [fr(31.55), fr(37.75)], [fr(43.30), fr(A_END)]],
         flashes=[], shakes=[],
         music=[[0.0, 3.85, 'intro'], [3.85, 13.85, 'groove'], [13.85, 22.70, 'drop'], [22.70, 31.55, 'drop2'],
                [31.55, 35.72, 'reveal'], [35.72, 37.75, 'build'], [37.75, 43.30, 'half'], [43.30, A_END, 'outro']],
         foley={'a01': 'pvc', 'a02': 'cap', 'a03': 'handle', 'a04': 'pvc', 'a05': 'fabric', 'a06': 'fabric', 'a07': 'cap',
                'a08': 'handle', 'a09': 'fabric', 'a10': 'paper', 'a11': 'fabric', 'a12': 'pvc', 'a13': 'machine', 'a14': 'brush',
                'a15': 'fabric', 'a16': 'leather', 'a19': 'handle', 'a20': 'fabric', 'a21': 'fabric', 'a22': 'fabric', 'a23': 'press',
                'a24': 'pvc', 'a25': 'machine', 'a26': 'fabric'},
         drops=[3.85, 13.85, 22.70, 31.55, 43.30])
write('a40', a)

# ====================================================================== AD B (23 s VO)
B_END = 25.5
b_shots = timeline([
    (0.00, 'b01', 'n2', 5.50, 6.10, 'cut'),                                                      # Your logo
    (0.50, 'b02', 'n1', 6.20, 6.70, 'cut', dict(scale=1.1)),                                     # deserves
    (0.98, 'b03', 'v3', 2.00, 2.60, 'punch'),                                                    # more than a
    (1.62, 'b04', 'f02', 4.20, 4.90, 'whip'),                                                    # print.
    (2.25, 'b05', 'n1', 3.40, 5.10, 'impact', dict(drift=[1.0, 1.1])),                           # Make it a custom patch.
    (3.95, 'b06', 'f05', 2.60, 3.40, 'impact'),                                                  # PVC
    (4.85, 'b07', 'f06', 2.60, 3.20, 'punch', dict(scale=1.08)),                                 # embroidered
    (5.62, 'b08', 'f04', 1.60, 2.10, 'punch'),                                                   # chenille
    (6.28, 'b09', 'f02', 0.20, 0.70, 'punch'),                                                   # woven
    (6.92, 'b10', 'm26', 4.60, 5.30, 'punch', dict(interp=True)),                                # leather
    (7.90, 'b11', 'ea', 0.50, 1.40, 'whip'),                                                     # Your design
    (8.85, 'b12', 'm28', 6.90, 7.95, 'zoom', dict(interp=True, scale=1.32, origin=dict(x=760, y=700))),                                 # your style
    (10.10, 'b13', 'n1', 0.30, 1.50, 'impact'),                                                  # varsity jackets
    (11.40, 'b14', 'n2', 3.00, 3.60, 'punch'),                                                   # caps
    (11.82, 'b15', 'm25', 0.20, 0.80, 'punch'),                                                  # polos
    (12.42, 'b16', 'f10', 0.00, 1.00, 'punch'),                                                  # uniforms
    (13.55, 'b17', 'f06', 3.80, 4.20, 'cut', dict(scale=1.12)),                                  # make every
    (13.90, 'b18', 'm21', 3.40, 3.80, 'cut'),                                                    # detail
    (14.30, 'b19', 'n1', 6.30, 7.40, 'impact', dict(drift=[1.0, 1.08])),                         # stand out
], 15.45)
b_desk = desk(18.15, [
    (1.25, 'wtype', 4.00, 5.60, (330, 290, 1.28), [(0.22, 131, 296)], 1, 'SELECT YOUR PATCH TYPE', 'type'),
    (1.12, 'wsize', 8.30, 10.70, (330, 300, 1.55), [(0.10, 122, 304), (0.55, 340, 304)], 2, 'CHOOSE YOUR SIZE', 'size'),
    (0.48, 'wup1', 12.45, 13.20, (520, 380, 1.32), [(0.20, 519, 385)], 3, 'UPLOAD YOUR ARTWORK', 'upload'),
    (0.50, 'wup2', 15.35, 15.90, (470, 520, 1.32), [], 3, 'UPLOAD YOUR ARTWORK', 'uploaded'),
    (1.95, 'wquote', 21.70, 22.75, (560, 500, 1.12), [(0.45, 835, 713), (1.25, 835, 713)], 4, 'GET YOUR QUOTE', 'quote'),
], 23.45)
b_text = [
    SLAM(0.00, 1.60, 'YOUR LOGO', size=170, top=300),
    SLAM(1.62, 2.22, 'PRINT?', size=210),
    SLAM(2.25, 3.92, 'CUSTOM PATCH.', size=150, sub='MAKE IT A'),
    SLAM(3.95, 4.83, 'PVC.', size=260), SLAM(4.85, 5.60, 'EMBROIDERED.', size=128), SLAM(5.62, 6.26, 'CHENILLE.', size=168),
    SLAM(6.28, 6.90, 'WOVEN.', size=210), SLAM(6.92, 7.88, 'LEATHER.', size=180),
    SLAM(7.90, 8.83, 'YOUR DESIGN.', size=138), SLAM(8.85, 10.08, 'YOUR STYLE.', size=150),
    SLAM(10.10, 11.38, 'VARSITY.', size=180), SLAM(11.40, 11.80, 'CAPS.', size=220), SLAM(11.82, 12.40, 'POLOS.', size=210),
    SLAM(12.42, 13.53, 'UNIFORMS.', size=170),
    SLAM(14.30, 15.42, 'STAND OUT.', size=170, sub='MAKE EVERY DETAIL'),
]
b = dict(fps=FPS, durationInFrames=fr(B_END), style='aggressive', vo='b', voFile='fpp-b23', shots=b_shots, desk=b_desk, text=b_text,
         reveal=dict(**{'from': fr(15.45)}, to=fr(17.05), lines=[]),
         cta=dict(**{'from': fr(17.05)}, to=fr(18.15), clickAt=fr(17.16), quoteAt=fr(17.40)),
         card=dict(**{'from': fr(23.45)}),
         capsOff=[[fr(15.45), fr(18.15)], [fr(23.45), fr(B_END)]],
         flashes=[fr(2.25), fr(3.95), fr(10.10), fr(14.30), fr(15.45)],
         shakes=[fr(2.25), fr(3.95), fr(10.10), fr(14.30), fr(15.45)],
         music=[[0.0, 2.25, 'hook'], [2.25, 7.90, 'drop'], [7.90, 10.10, 'groove'], [10.10, 15.45, 'drop2'],
                [15.45, 17.05, 'reveal'], [17.05, 18.15, 'build'], [18.15, 23.45, 'half'], [23.45, B_END, 'outro']],
         foley={'b02': 'pvc', 'b05': 'fabric', 'b06': 'pvc', 'b07': 'machine', 'b08': 'brush', 'b09': 'fabric', 'b10': 'leather',
                'b11': 'paper', 'b13': 'fabric', 'b14': 'cap', 'b15': 'fabric', 'b16': 'fabric', 'b17': 'machine', 'b19': 'pvc'},
         drops=[2.25, 10.10, 15.45, 23.45])
write('b23', b)


# ====================================================================== ADS 03 / 04 — 18 s, no voiceover
# The original Lion no-VO ad formula: hold the product close while the music
# builds (tension), a short silence, then a DOOF drop exactly on the jacket
# reveal, further reveals on the downbeats (each with its own DOOF + vocal stab),
# a fast double-time montage, a hero hold, and the CTA end card.
def beats(bpm):
    b = 60 / bpm
    return lambda n: round(n * b, 4)


def build18(name, bpm, cuts, text, doofs, music, foley, flashes):
    end = 18.0
    card_t = music[-1][0]
    shots = timeline(cuts, card_t)
    d = dict(fps=FPS, durationInFrames=fr(end), style='aggressive', bpm=bpm, vo=None, voFile=name.replace('e18', 'fpp-e18').replace('l18', 'fpp-l18'),
             shots=shots, desk=[], text=text, card=dict(**{'from': fr(card_t)}, variant='made'),
             capsOff=[], flashes=[fr(x) for x in flashes], shakes=[fr(x) for x in doofs],
             music=music, foley=foley, drops=[doofs[0], card_t], doofs=doofs)
    write(name, d)


# ---------------------------------------------------------------- AD 03 EAGLE — 120 BPM, straight, "READY?"
B = beats(120)  # beat = 0.5 s, bar = 2 s
build18('e18', 120, [
    (B(0), 'e01', 'n9', 1.60, 3.80, 'cut', dict(drift=[1.0, 1.1])),                  # hand holds the eagle
    (B(4), 'e02', 'n9', 3.80, 6.20, 'zoom', dict(drift=[1.04, 1.16])),
    (B(7), 'e03', 'n9', 6.20, 7.80, 'punch', dict(scale=1.18)),
    (B(8), 'e04', 'n6', 0.00, 1.20, 'impact', dict(drift=[1.0, 1.06])),               # DROP — on the jacket
    (B(10), 'e05', 'n6', 5.00, 6.40, 'punch', dict(interp=True)),
    (B(12), 'e06', 'n8', 0.00, 1.40, 'impact'),                                       # backpack
    (B(14), 'e07', 'n8', 4.00, 6.80, 'whip', dict(drift=[1.0, 1.05])),
    (B(16), 'e08', 'n2', 3.40, 5.00, 'impact'),                                       # cap
    (B(18), 'e09', 'n2', 6.00, 7.90, 'zoom'),
    (B(20), 'e10', 'n9', 4.40, 4.80, 'cut'), (B(20.5), 'e11', 'n6', 6.60, 7.00, 'cut'),
    (B(21), 'e12', 'n8', 0.50, 0.90, 'cut'), (B(21.5), 'e13', 'n2', 7.00, 7.40, 'cut'),
    (B(22), 'e14', 'n9', 6.60, 7.00, 'cut'), (B(22.5), 'e15', 'n6', 7.30, 7.70, 'cut'),
    (B(23), 'e16', 'n8', 6.00, 6.40, 'cut'), (B(23.5), 'e17', 'n2', 4.80, 5.20, 'cut'),
    (B(24), 'e18', 'n6', 5.80, 7.90, 'impact', dict(interp=True, drift=[1.0, 1.08])),  # hero
], [
    H(B(0) + 0.2, B(4) - 0.05, [[('YOUR', B(0) + 0.3), ('LOGO.', B(1), True)]], size=140, top=300),
    H(B(4), B(7) - 0.05, [[('AS', B(4) + 0.05), ('A', B(4) + 0.2)], [('3D', B(5)), ('PATCH.', B(5) + 0.25, True)]], size=124, top=280),
    SLAM(B(7), B(8) - 0.04, 'READY?', size=190, top=300),
    SLAM(B(8), B(10) - 0.05, 'JACKETS.', size=180, top=300, sub='ON YOUR'),
    SLAM(B(12), B(14) - 0.05, 'BACKPACK.', size=170, top=300, sub='ON YOUR'),
    SLAM(B(16), B(18) - 0.05, 'CAP.', size=230, top=300, sub='ON YOUR'),
    SLAM(B(20), B(22) - 0.04, 'EVERYWHERE.', size=150, top=300),
    SLAM(B(22), B(24) - 0.04, 'YOUR BRAND.', size=150, top=300),
    H(B(24), B(27) - 0.05, [[('BUILT', B(24) + 0.1), ('TO', B(24) + 0.3)], [('STAND', B(25)), ('OUT.', B(25) + 0.3, True)]], size=124, top=280),
], doofs=[B(8), B(12), B(16), B(24)],
    music=[[0.0, B(8), 'tension'], [B(8), B(20), 'drop'], [B(20), B(24), 'drop2'], [B(24), B(27), 'reveal'], [B(27), 18.0, 'outro']],
    foley={'e01': 'handle', 'e02': 'handle', 'e03': 'pvc', 'e04': 'fabric', 'e05': 'pvc', 'e06': 'fabric', 'e07': 'fabric',
           'e08': 'cap', 'e09': 'cap', 'e18': 'fabric'},
    flashes=[B(8), B(12), B(16), B(24)])

# ---------------------------------------------------------------- AD 04 LION — 124 BPM, syncopated, word-per-beat build
B = beats(124)  # beat ≈ 0.484 s
build18('l18', 124, [
    (B(0), 'l01', 'n5', 0.00, 2.60, 'cut', dict(drift=[1.0, 1.1])),                   # hand holds the lion
    (B(4), 'l02', 'n5', 2.80, 5.20, 'zoom', dict(drift=[1.05, 1.18])),
    (B(8), 'l03', 'n1', 0.00, 1.00, 'impact', dict(drift=[1.0, 1.06])),               # DROP — varsity jacket
    (B(10), 'l04', 'n1', 3.90, 5.60, 'punch', dict(interp=True)),
    (B(11.5), 'l05', 'n1', 6.20, 7.00, 'punch', dict(scale=1.12)),
    (B(12), 'l06', 'n3', 5.50, 6.70, 'impact'),                                       # cap
    (B(14), 'l07', 'n3', 0.00, 0.90, 'whip', dict(drift=[1.04, 1.0])),
    (B(15.5), 'l08', 'n5', 6.00, 6.60, 'punch'),
    (B(16), 'l09', 'n1', 6.40, 7.90, 'impact', dict(drift=[1.0, 1.1])),               # jacket macro
    (B(18), 'l10', 'n5', 5.20, 6.40, 'whip'),
    (B(20), 'l11', 'n3', 7.00, 7.40, 'cut'), (B(20.75), 'l12', 'n1', 5.00, 5.40, 'cut'),
    (B(21.5), 'l13', 'n5', 3.00, 3.40, 'cut'), (B(22.25), 'l14', 'n3', 6.10, 6.50, 'cut'),
    (B(23), 'l15', 'n1', 7.20, 7.60, 'cut'), (B(23.5), 'l16', 'n5', 1.00, 1.40, 'cut'),
    (B(24), 'l17', 'n3', 6.70, 7.90, 'impact', dict(interp=True, drift=[1.08, 1.0])),  # hero cap
], [
    H(B(0) + 0.2, B(4) - 0.05, [[('YOUR', B(0) + 0.3), ('LOGO.', B(1), True)]], size=140, top=300),
    SLAM(B(4), B(5) - 0.03, 'BOLD.', size=220, top=300),
    SLAM(B(5), B(6) - 0.03, 'RAISED.', size=210, top=300),
    SLAM(B(6), B(7) - 0.03, 'MOLDED.', size=200, top=300),
    SLAM(B(7), B(8) - 0.03, 'IN 3D.', size=220, top=300),
    SLAM(B(8), B(10) - 0.05, 'VARSITY.', size=190, top=300, sub='ON YOUR'),
    SLAM(B(12), B(14) - 0.05, 'CAP.', size=230, top=300, sub='ON YOUR'),
    SLAM(B(16), B(18) - 0.05, 'TO MISS.', size=180, top=300, sub='IMPOSSIBLE'),
    SLAM(B(20), B(24) - 0.04, 'MADE TO ROAR.', size=140, top=300),
    H(B(24), B(28) - 0.05, [[('YOUR', B(24) + 0.1), ('BRAND.', B(24) + 0.35)], [('IN', B(25)), ('3D.', B(25) + 0.25, True)]], size=124, top=280),
], doofs=[B(8), B(12), B(16), B(24)],
    music=[[0.0, B(8), 'tension'], [B(8), B(20), 'drop2'], [B(20), B(24), 'drop'], [B(24), B(28), 'reveal'], [B(28), 18.0, 'outro']],
    foley={'l01': 'handle', 'l02': 'pvc', 'l03': 'fabric', 'l04': 'fabric', 'l05': 'pvc', 'l06': 'cap', 'l07': 'cap',
           'l08': 'handle', 'l09': 'fabric', 'l10': 'pvc', 'l17': 'cap'},
    flashes=[B(8), B(12), B(16), B(24)])
