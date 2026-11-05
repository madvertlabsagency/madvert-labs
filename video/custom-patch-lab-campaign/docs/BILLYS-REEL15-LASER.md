# Billys Custom Patches — 15 s laser-cutting reel

`BillysReelLaser` · 1080×1920 · 30 fps · 450 frames · `npm run render:billyslaser:final` → `out/BillysCustomPatches_Reel15s_LaserCut_1080x1920.mp4`

**Source:** one Google Flow clip (`assets/source/billys/reel15laser/footage/laser-cut.mp4`, 720×1280, 24 fps, 10 s). The laser cut runs 0–5.96 s and has one internal cut. From there it is one continuous move: the hand lifts the patch off the honeycomb bed (6.0–7.5 s), then the camera pans onto the navy cap (7.9–10 s). The edit is in `src/billys/reel15laser/edl.json`; conform it with `python3 -I scripts/conform-shots.py billys/reel15laser`. The laser shots run at real speed. The lift and cap shots are slowed to 0.6–0.7× with motion interpolation.

| Time | Shots | Type |
|---|---|---|
| 0–3 s | a1 laser close-up · a2 tighter on the beam | WATCH CLOSELY. |
| 3–6 s | b1 · b2 punched in on the cut edge | EVERY DETAIL / MATTERS. |
| 6–9 s | c1 · c2 finished patch lifted off the bed | CLEAN. SHARP. PRECISE. |
| 9–12 s | d1 patch on the navy cap, slow pull-out | MADE TO / STAND OUT. |
| 12–15 s | freeze of d1 (blur + navy scrim) | supplied BCP logo (unaltered), GET YOUR CUSTOM QUOTE →, billyscustompatches.com |

All type sits in the top band, and every frame was checked for clearance from the patch. The only sparks are the clip's own laser glints; nothing is added.

**Sound (no music, no VO):** `scripts/sound-design-billys-reel15laser.py`, built with `build-audio.sh billys-reel15laser -15 -2`. The bed is the clip's own laser and extraction sound, cut with the picture. Over it sit faint unpitched ticks on the in-section cuts, soft air on section changes, cloth sounds for the lift-off and the press onto the cap, and a soft low hit under the logo. Result: −15.2 LUFS, −1.9 dBTP.
