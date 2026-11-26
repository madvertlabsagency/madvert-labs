# American Custom — Cobra Drop (18 s Meta ad, 9:16, no voiceover)

Output: `out/American-Custom-Cobra-Drop-18s.mp4` (1080×1920, 30 fps, H.264, stereo AAC, −14 LUFS).
A lighter copy for WhatsApp/chat: `out/American-Custom-Cobra-Drop-18s_light.mp4`.

## Build

```bash
python3 -I scripts/ac-cobra-spec.py .                          # spec + EDL
python3 -I scripts/conform-shots.py americancustom/cobra18      # segments (footage: assets/source/americancustom/footage)
bash scripts/build-audio.sh ac-cobra18 -14 -1.5                 # soundtrack
npx remotion render AmericanCustomCobraDrop18 out/American-Custom-Cobra-Drop-18s.mp4 \
  --codec=h264 --crf=16 --color-space=bt709 --audio-codec=aac --audio-bitrate=320k
```

Composition `AmericanCustomCobraDrop18` (folder "American-Custom"), engine `src/americancustom/CobraAd.tsx`.

## Edit (120 BPM grid, beat 0.5 s)

| Time | Shots | Type | Sound |
| --- | --- | --- | --- |
| 0–3 s | hand close-ups (c1) | YOUR DESIGN. / YOUR PATCH. | tension: heartbeat daf, accelerating ka, claps, air swell, handling foley |
| 3 s | match cut: jacket shot opens at the hand close-up's scale and pulls out (c2) | ON YOUR JACKET. (from 4 s) | gate gap → DOOF (doubled daf dum + thump + soft boom), whoosh, flash, shake |
| 7 s | cap reveal (c3) | MADE TO STAND OUT. | DOOF + unpitched vocal chop (chest "hup" + whispered "hah" stutter), hook pattern |
| 11 s | backpack close-up, 4 rapid close-ups, pull-back reveal (c4) | ON YOUR BACKPACK. | DOOF, busier daf + claps, fabric foley, roll into the card |
| 15–18 s | end card: logo card, GET YOUR CUSTOM PATCHES MADE., CLICK BELOW, GET YOUR QUOTE pill, quote.americancustompatchlab.com | | final DOOF + card hit |

Avoided source ranges (generation artefacts): c2 0–3.5 s (face / arm in frame), c3 2.3–3.1 s and
5.4–6.4 s (morph ghosting), c4 4.6 s+ (duplicate ghost patch).

## Brand

From quote.americancustompatchlab.com: navy #0C1D48 / #081234, crimson #B8002E, gold #D6B360,
royal #2F5399, cream #F6F2EA; condensed caps headlines (Bebas Neue) + Manrope; the site's
blue → gold → crimson gradient edge. Logo: the supplied file with its white canvas trimmed
(`public/brand/ac-logo-crop.png`, not recoloured), on a white card. Footage is not tinted.

## Sound — NO MUSIC

Brief asked for instrumental music; per the standing rule there is none: daf (dum / tak / ka /
rolls), hand claps, unpitched vocal sounds (breaths, inhales, "hah", "hup"), DOOF hits, whooshes,
fabric / cap / PVC / handling foley and room tone only. Spectral check: no sustained tonal
peak longer than 0.35 s.
