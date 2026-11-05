# Billys Custom Patches — 15 s cinematic reel

`BillysReel15` · 1080×1920 · 30 fps · 450 frames · `npm run render:billysreel15:final` → `out/BillysCustomPatches_Reel15s_1080x1920.mp4`

**Source:** one Google Flow clip (`assets/source/billys/reel15/footage/tiger-stitch.mp4`, 720×1280, 24 fps, 10 s) containing 7 shots (internal cuts at 1.458 / 2.958 / 4.417 / 5.958 / 7.417 / 8.958 s). `src/billys/reel15/edl.json` keeps every range at least 2 frames inside those cuts. Conform with `python3 -I scripts/conform-shots.py billys/reel15`. The needle shots run at about real speed with no motion interpolation. s7 ping-pongs the final wide shot.

| Time | Shots | Type |
|---|---|---|
| 0–3 s | s1 needle macro · s2 nose macro (pushed ×1.3 so the eyes clear the type) | WATCH THIS. |
| 3–6 s | s3 wide machine · s4 needle + loose thread | PRECISION / IN EVERY STITCH. |
| 6–9 s | s5 ear + thread · s6 needle close-up | BUILT IN THE / DETAILS. |
| 9–12 s | s7 full tiger, slow pull-out | YOUR DESIGN. / BROUGHT TO LIFE. |
| 12–15 s | freeze of s7 (blur + navy scrim) | supplied BCP logo (unaltered, white plate), GET YOUR CUSTOM QUOTE →, billyscustompatches.com |

All type sits in the top band (y 220–560). In every shot the tiger's face is in the lower half. Transitions: needle-hit punch-ins inside sections, short motion-blurred whips between sections, and a blur into the end card.

**Sound (no music, no VO):** `scripts/sound-design-billys-reel15.py`, built with `scripts/build-audio.sh billys-reel15 -15 -1.5`. The bed is the clip's own recorded machine audio, cut with the picture: each shot plays its own source range. Accents are a needle impact on each cut, soft air on section changes, and cloth at the reveal. At the card the machine winds down to room tone with one soft low hit. Result: −15 LUFS, −1.8 dBFS peak. A spectral check found no tonal peaks.

**Claims:** none beyond the brief's lines; no offers or turnaround promises.
