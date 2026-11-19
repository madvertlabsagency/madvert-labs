# Future PVC Patch — 50 s / 30 s / 15 s commercials (9:16 + 16:9)

| File | Size | Length |
|---|---|---|
| `out/FUTURE_PVC_PATCH_50S.mp4` · `_16x9` | 1080×1920 · 1920×1080 | 50 s |
| `out/FUTURE_PVC_PATCH_30S.mp4` · `_16x9` | 1080×1920 · 1920×1080 | 30 s |
| `out/FUTURE_PVC_PATCH_15S.mp4` · `_16x9` | 1080×1920 · 1920×1080 | 15 s |

All files are 30 fps, H.264 + AAC 320k, −14 LUFS. The 16:9 versions share their vertical version's timeline and soundtrack, so one voiceover per length covers both sizes.

**Editable project**
- Scripts and timelines: `scripts/fpp-specs.py`, which writes `src/fpp/{f50,f30,f15}/edl.json`.
- Brand: `src/fpp/brand.ts`.
- Compositions: `src/fpp/compositions.ts`.
- Engines: `src/markhor/flagship.tsx` (9:16) and `flagship169.tsx` (16:9), now brand-switchable.
- Soundtrack: `scripts/sound-design-fpp-<cut>.py`.
- Render: `npm run render:fpp50:final` (also `fpp30`, `fpp15`, and the `…wide` variants).

## Brand system (from the supplied logo)
- **Colours:** sampled from the logo. Indigo `#1E3980` → blue `#1363A2` → cyan `#0396C9`, white, light `#EAF4FA`, deep `#0C1838`.
- **Type:** Montserrat ExtraBold, upright and geometric. This is deliberately different from Markhor's slanted Manrope.
- **Shapes:** highlight words and CTA buttons use hexagon-pointed shapes, and labels have a hexagon bullet.
- **Background motif:** light isometric cube outlines, echoing the logo's geometry. They are a background element, not the logo.
- **Logo:** the supplied file, unaltered, on a white rounded tile.
  - The logo has no wordmark, so **FUTURE PVC PATCH** is typeset beside it on the end card.
  - Website: www.futurepvcpatch.com.

## Why the scripts are PVC-first
- The brand name confirms PVC. futurepvcpatch.com did not resolve at production time, so no other patch type, offer or capability could be verified.
- The ads therefore claim only custom PVC patches. All footage shown is PVC, apart from four application shots in the "anywhere your brand goes" section; see the footage notes below.
- Because the site isn't live, the "how to order" section is a designed three-step graphic, not a screen recording:
  1. Send your design.
  2. Choose size & quantity.
  3. Get your custom quote.

## Voiceover scripts (paste into ElevenLabs)
**Voice:** American English, confident, modern, clear; energetic but never shouting. Leave a short pause between lines. Line timing is fitted in the edit.

**50 s**
```
Not printed. Not stitched. Molded.

Raised 3D layers. Crisp, clean edges. Bold color you can feel, on a patch that flexes in your hand.

Your logo, your shape, your colors, molded layer by layer into a patch built around your brand.

Made for bags and gear, uniforms, workwear and personalized pieces. Anywhere your brand shows up.

Getting started is simple. Send your design, choose your size and quantity, and get your custom quote at futurepvcpatch.com.

Your brand, in 3D. Future PVC Patch. Built for what's next.
```

**30 s**
```
Not printed. Not stitched. Molded.

Raised 3D layers, crisp edges and bold color, on a patch that flexes.

Made for bags, uniforms, workwear and more.

Send your design, choose your size and quantity, and get your custom quote.

Future PVC Patch. Built for what's next.
```

**15 s**
```
Your logo. In 3D.

Custom PVC patches for brands, teams and businesses.

Send your design and get your custom quote at futurepvcpatch.com.

Future PVC Patch. Built for what's next.
```

Cue times are in each `src/fpp/<cut>/edl.json` (`vo`). Drop the recordings in as `public/audio/fpp-<f50|f30|f15>-vo.wav` and re-run `bash scripts/build-audio.sh fpp-<cut> -14 -1.5`. The drums duck about 7 dB under the voice automatically; re-render both sizes afterwards.

## On-screen text
- **50 s**
  - Hook: NOT PRINTED. → NOT STITCHED. → **MOLDED.**
  - Qualities, with lower thirds: **3D RAISED.** · **CRISP EDGES.** · **BOLD COLOR.** · **FLEXIBLE.**
  - Your design: YOUR **LOGO.** · YOUR **SHAPE.** · YOUR **COLORS.** · BUILT AROUND YOUR **BRAND.**
  - Where it goes: ANYWHERE YOUR BRAND **GOES.**, with lower thirds BAGS & GEAR · UNIFORMS · WORKWEAR · PERSONALIZED.
  - Ordering: GETTING STARTED IS **SIMPLE.** with the 3 steps and futurepvcpatch.com.
  - Close: YOUR BRAND. IN **3D.** → BUILT FOR WHAT'S **NEXT.**
  - End card: logo · FUTURE PVC PATCH · BUILT FOR WHAT'S NEXT. · **GET YOUR CUSTOM QUOTE →** · www.futurepvcpatch.com
- **30 s:** the same story, condensed. The order section is titled 3 SIMPLE **STEPS.**
- **15 s**
  - YOUR LOGO. IN **3D.**
  - CUSTOM **PVC** PATCHES FOR BRANDS, TEAMS & **BUSINESSES.**
  - ORDER IN 3 **STEPS.**
  - BUILT FOR WHAT'S **NEXT.**
  - End card: YOUR LOGO. IN 3D. · **GET YOUR CUSTOM QUOTE →**

## Captions
- **50 s:** *Not printed. Not stitched. Molded. Custom PVC patches with raised 3D detail, crisp edges and bold color, built around your brand. Send your design and get your custom quote at futurepvcpatch.com* #FuturePVCPatch #PVCPatches #CustomPatches #3DPatches #BrandMerch
- **30 s:** *Your logo, molded in 3D. Custom PVC patches for bags, uniforms, workwear and more. Get your custom quote at futurepvcpatch.com* #PVCPatches #CustomPatches #RubberPatches #Merch
- **15 s:** *Your logo. In 3D. Custom PVC patches for brands, teams and businesses: futurepvcpatch.com* #PVCPatch #CustomPatches #FuturePVCPatch

## Footage notes
All clips are the agency's own Google Flow footage from earlier batches.

**PVC**
- reel03 v3: the hexagon EXPLORE patch, as a close-up pan and on a backpack.
- f05: the lightning shield in hand.
- f01 3.0–4.4 s: the yellow PVC lightning being flexed.
- m20, m26, m28: studio PVC shields.
- m21, m10: PVC texture close-ups.

**Applications (wide shots)**
- f09: blazer.
- f08: corporate shirt.
- f07: ALEX name patch on a backpack.
- These patches are not necessarily PVC; they only illustrate where patches go. Swap them for PVC-on-apparel clips if you have them.

**Not used**
- The embroidery machine shots, because PVC is molded, not stitched.
- Chenille, leather and printed close-ups, which are not claimed.
- Markhor's website recordings.
- The v3 hexagon patch is a mountain design. It is used here because it is the strongest PVC-on-gear footage; say if you'd rather avoid mountains for this client too.

## Claims check
The ads make no shipping, turnaround, pricing, free-service, minimum-order or certification claims. "Flexible" and "3D raised" are shown on screen in the footage. "Get your custom quote" is the CTA only.

## Export verification

| File | Size | Video | Frames (expected) | Audio | Loudness / peak | Decode errors | Black frames |
|---|---|---|---|---|---|---|---|
| FUTURE_PVC_PATCH_50S.mp4 | 47 MB | h264 1080 1920 yuv420p 30/1 | 1500 (1500) | aac 48000 |  I: -14.0 LUFS  Peak: -1.0 dBFS  | 0 | 0 |
| FUTURE_PVC_PATCH_30S.mp4 | 29 MB | h264 1080 1920 yuv420p 30/1 | 900 (900) | aac 48000 |  I: -14.0 LUFS  Peak: -1.1 dBFS  | 0 | 0 |
| FUTURE_PVC_PATCH_15S.mp4 | 14 MB | h264 1080 1920 yuv420p 30/1 | 450 (450) | aac 48000 |  I: -14.0 LUFS  Peak: -1.5 dBFS  | 0 | 0 |
| FUTURE_PVC_PATCH_50S_16x9.mp4 | 28 MB | h264 1920 1080 yuv420p 30/1 | 1500 (1500) | aac 48000 |  I: -14.0 LUFS  Peak: -1.0 dBFS  | 0 | 0 |
| FUTURE_PVC_PATCH_30S_16x9.mp4 | 16 MB | h264 1920 1080 yuv420p 30/1 | 900 (900) | aac 48000 |  I: -14.0 LUFS  Peak: -1.1 dBFS  | 0 | 0 |
| FUTURE_PVC_PATCH_15S_16x9.mp4 | 9 MB | h264 1920 1080 yuv420p 30/1 | 450 (450) | aac 48000 |  I: -14.0 LUFS  Peak: -1.5 dBFS  | 0 | 0 |

Checked with ffprobe (counted frames), a full decode, `blackdetect=d=0.03:pix_th=0.08` and `ebur128=peak=true`; contact sheets reviewed. `out/FUTURE_PVC_PATCH_50S_upload.mp4` is a smaller two-pass copy for upload limits.
