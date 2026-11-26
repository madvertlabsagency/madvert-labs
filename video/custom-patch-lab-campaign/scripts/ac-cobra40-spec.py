"""American Custom — "Cobra Drop" 40 s Meta ad (9:16, no voiceover). Long version of the 18 s cut.

    python3 -I scripts/ac-cobra40-spec.py .

Writes src/americancustom/cobra40.json (src/americancustom/CobraAd.tsx,
scripts/sound-design-ac-cobra40.py) and src/americancustom/cobra40/edl.json
(scripts/conform-shots.py americancustom/cobra40; the website segments come from
scripts/conform-desk.py americancustom/cobra40 src/americancustom/cobra40.json <recording>).

120 BPM grid (beat 0.5 s, bar 2 s); every reveal on a downbeat with a DOOF.
  0–4 s    hook: hand + cobra, YOUR DESIGN. / YOUR PATCH.          (tension build)
  4 s      DROP: match cut to the jacket, ON YOUR JACKET., then BOLD. RAISED. MOLDED. IN 3D. one per beat
  10 s     cap, DOOF + vocal chop, MADE TO STAND OUT., ON YOUR CAP.
  16 s     backpack: close-up, rapid close-ups, slow pull-back reveal, ON YOUR BACKPACK.
  22 s     montage, 0.25 s cuts: JACKETS. CAPS. BACKPACKS. YOUR GEAR.
  24 s     hero jacket, YOUR DESIGN. / YOUR PATCH.
  26 s     the real quote funnel: type → quantity → size → backing → upload
  34–40 s  end card: logo, GET YOUR CUSTOM PATCHES MADE., CLICK BELOW, GET YOUR QUOTE
Source ranges avoid the clips' artefacts (c2 before 4.0 s: face / arm; c3 2.3–3.1 s and
5.4–6.4 s: ghosting; c4 after 4.5 s: duplicate patch) and type stays above the patch.
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
    """segs: [(dur_s, id, srcIn, srcOut, focus(cx, cy, zoom), taps[(local_s, x, y)], step, title, kind)] in the 1160 x 820 crop."""
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


END, DESK, CARD = 40.0, 26.0, 34.0
UP = dict(y=50, scale=1.07)    # shots under type: the patch top lands below the type band
LOW = dict(y=90, scale=1.1)    # closer shots under type
J = lambda s, x=600, y=1050: dict(scale=s, origin={'x': x, 'y': y})  # noqa: E731  jacket crops (keep the chin out)

cuts = [
    # 0–4 s HOOK
    (0.0, 'h01', 'c1-hand', 0.20, 1.90, 'cut', dict(LOW, drift=[1.0, 1.04])),
    (1.5, 'h02', 'c1-hand', 2.40, 3.70, 'zoom', dict(LOW, drift=[1.0, 1.04])),
    (2.5, 'h03', 'c1-hand', 5.55, 6.55, 'zoom', dict(LOW, drift=[1.0, 1.03])),
    (3.25, 'h04', 'c1-hand', 6.90, 7.70, 'punch', dict(scale=1.12)),
    # 4 s DROP — jacket (match cut from the hand close-up's scale)
    (4.0, 'j01', 'c2-jacket', 4.00, 5.10, 'impact', dict(drift=[1.6, 1.18], origin={'x': 545, 'y': 1000})),
    (5.0, 'j02', 'c2-jacket', 5.10, 6.10, 'punch', J(1.22, 620, 1100)),
    (6.0, 'j03', 'c2-jacket', 6.00, 7.50, 'zoom', dict(J(1.1), interp=True, drift=[1.0, 1.08])),
    (7.5, 'j04', 'c2-jacket', 7.45, 7.90, 'punch', J(1.3)),
    (8.0, 'j05', 'c2-jacket', 4.40, 4.90, 'impact', J(1.3, 560, 1000)),   # BOLD.
    (8.5, 'j06', 'c2-jacket', 5.60, 6.10, 'cut', J(1.35)),                # RAISED.
    (9.0, 'j07', 'c2-jacket', 6.60, 7.10, 'punch', J(1.3)),               # MOLDED.
    (9.5, 'j08', 'c2-jacket', 7.30, 7.90, 'cut', J(1.4)),                 # IN 3D.
    # 10 s CAP
    (10.0, 'k01', 'c3-cap', 0.00, 1.00, 'impact', dict(UP, drift=[1.0, 1.05])),
    (11.0, 'k02', 'c3-cap', 3.10, 4.10, 'whip', dict(LOW, drift=[1.0, 1.02])),
    (12.0, 'k03', 'c3-cap', 4.10, 5.10, 'punch', LOW),
    (13.0, 'k04', 'c3-cap', 6.50, 7.90, 'zoom', dict(UP, drift=[1.0, 1.08])),
    (14.5, 'k05', 'c3-cap', 1.00, 2.30, 'zoom', dict(UP, drift=[1.0, 1.06])),
    # 16 s BACKPACK
    (16.0, 'b01', 'c4-backpack', 0.00, 1.00, 'impact', dict(drift=[1.0, 1.06])),
    (17.0, 'b02', 'c4-backpack', 1.00, 1.50, 'punch', dict(scale=1.15)),
    (17.5, 'b03', 'c2-jacket', 7.20, 7.55, 'cut', J(1.3, 600, 915)),
    (17.75, 'b04', 'c4-backpack', 1.50, 1.85, 'punch', dict(scale=1.2)),
    (18.0, 'b05', 'c3-cap', 4.60, 4.95, 'cut', dict(scale=1.25, origin={'x': 520, 'y': 840})),
    (18.25, 'b06', 'c4-backpack', 0.30, 0.65, 'cut', dict(scale=1.3)),
    (18.5, 'b07', 'c4-backpack', 2.20, 4.50, 'zoom', dict(y=60, scale=1.07, interp=True, drift=[1.0, 1.03])),
    # 22 s MONTAGE (mid-wide framings so the slams stay off the patch)
    (22.0, 'm1', 'c2-jacket', 6.20, 6.55, 'impact', J(1.1)),
    (22.25, 'm2', 'c2-jacket', 7.40, 7.75, 'cut', J(1.15)),
    (22.5, 'm3', 'c3-cap', 0.30, 0.65, 'cut', UP),
    (22.75, 'm4', 'c3-cap', 6.80, 7.15, 'cut', UP),
    (23.0, 'm5', 'c4-backpack', 3.00, 3.35, 'cut', dict(y=60, scale=1.07)),
    (23.25, 'm6', 'c4-backpack', 3.80, 4.15, 'cut', dict(y=60, scale=1.07)),
    (23.5, 'm7', 'c3-cap', 1.50, 1.85, 'cut', UP),
    (23.75, 'm8', 'c2-jacket', 5.40, 5.75, 'cut', J(1.2)),
    # 24 s HERO
    (24.0, 'hr', 'c2-jacket', 6.30, 7.90, 'impact', dict(J(1.1), interp=True, drift=[1.0, 1.1])),
]
shots = timeline(cuts, DESK)

# 26 s WEBSITE — real quote funnel (screen recording), only before any personal details / file picker / errors:
# step 1 before the recording picks a type, step 2 with its real click on "10 to 24", step 3 typing the size,
# step 4 with its real click on "Iron on", step 5 drop zone.
web = desk(DESK, [
    (1.5, 'w1', 2.80, 3.75, (470, 330, 1.22), [(0.95, 150, 305)], 1, 'PICK YOUR PATCH TYPE', 'type'),
    (1.5, 'w2', 4.40, 5.50, (470, 300, 1.3), [(0.95, 150, 305)], 2, 'CHOOSE YOUR QUANTITY', 'qty'),
    (1.5, 'w3', 6.60, 9.00, (380, 300, 1.45), [], 3, 'SET YOUR SIZE', 'size'),
    (1.5, 'w4', 9.30, 10.60, (470, 300, 1.25), [(0.75, 440, 292)], 4, 'CHOOSE YOUR BACKING', 'backing'),
    (2.0, 'w5', 11.00, 11.90, (545, 330, 1.08), [(1.35, 580, 385)], 5, 'UPLOAD YOUR ARTWORK', 'upload'),
], CARD)

text = [
    H(0.15, 1.45, [[('YOUR', 0.2), ('DESIGN.', 0.5, True)]], size=150, top=270),
    H(1.5, 3.2, [[('YOUR', 1.55), ('PATCH.', 2.0, True)]], size=150, top=270),
    SLAM(5.0, 7.45, 'JACKET.', size=210, top=270, sub='ON YOUR'),
    SLAM(8.0, 8.47, 'BOLD.', size=220), SLAM(8.5, 8.97, 'RAISED.', size=210),
    SLAM(9.0, 9.47, 'MOLDED.', size=200), SLAM(9.5, 9.95, 'IN 3D.', size=220),
    H(10.0, 12.95, [[('MADE', 10.05), ('TO', 10.3)], [('STAND', 11.0), ('OUT.', 11.3, True)]], size=122, top=235),
    SLAM(13.0, 15.45, 'CAP.', size=230, top=270, sub='ON YOUR'),
    SLAM(18.5, 20.95, 'BACKPACK.', size=180, top=270, sub='ON YOUR'),
    SLAM(22.0, 22.47, 'JACKETS.', size=190), SLAM(22.5, 22.97, 'CAPS.', size=220),
    SLAM(23.0, 23.47, 'BACKPACKS.', size=170), SLAM(23.5, 23.95, 'YOUR GEAR.', size=180),
    H(24.0, 25.95, [[('YOUR', 24.05), ('DESIGN.', 24.3)], [('YOUR', 25.0), ('PATCH.', 25.25, True)]], size=130, top=250),
]

doofs = [4.0, 10.0, 16.0, 24.0, CARD]
spec = dict(
    fps=FPS, durationInFrames=fr(END), style='aggressive', bpm=120, vo=None, voFile='ac-cobra40',
    shots=shots, desk=web, text=text, card={'from': fr(CARD), 'variant': 'made'},
    capsOff=[], flashes=[fr(x) for x in doofs[:4]], shakes=[fr(x) for x in doofs],
    music=[[0.0, 4.0, 'tension'], [4.0, 10.0, 'drop'], [10.0, 16.0, 'hook'], [16.0, 22.0, 'drop2'], [22.0, 24.0, 'hook'],
           [24.0, DESK, 'reveal'], [DESK, 32.0, 'groove'], [32.0, 33.0, 'half'], [33.0, CARD, 'build'], [CARD, END, 'outro']],
    drops=[4.0, CARD], doofs=doofs, chops=[10.0, 12.0, 22.0],
    foley={'h01': 'handle', 'h02': 'handle', 'h03': 'pvc', 'h04': 'handle', 'j01': 'fabric', 'j02': 'fabric', 'j03': 'fabric',
           'j05': 'pvc', 'j07': 'pvc', 'k01': 'cap', 'k02': 'cap', 'k04': 'cap', 'k05': 'cap',
           'b01': 'fabric', 'b02': 'fabric', 'b04': 'fabric', 'b07': 'fabric', 'hr': 'fabric'},
    deskCrop='1160:820:170:20',
)
os.makedirs(os.path.join(ROOT, 'src/americancustom/cobra40'), exist_ok=True)
json.dump(spec, open(os.path.join(ROOT, 'src/americancustom/cobra40.json'), 'w'), indent=1)
json.dump(dict(fps=FPS, shots=shots), open(os.path.join(ROOT, 'src/americancustom/cobra40/edl.json'), 'w'), indent=1)
print(f'cobra40: {spec["durationInFrames"]} f = {END:.1f} s · {len(shots)} shots · website {DESK} s · card {CARD} s')
