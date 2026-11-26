# American Custom — Cobra Drop (18 s Meta ad, 9:16, no voiceover)

Output: `out/American-Custom-Cobra-Drop-18s.mp4` (1080×1920, 30 fps, H.264, stereo AAC, −14 LUFS).
A lighter copy for WhatsApp/chat: `out/American-Custom-Cobra-Drop-18s_light.mp4`.

## Build

```bash
python3 -I scripts/ac-cobra-spec.py .                          # spec + EDL
python3 -I scripts/conform-shots.py americancustom/cobra18      # segments (footage: assets/source/americancustom/footage)
python3 -I scripts/conform-desk.py americancustom/cobra18 src/americancustom/cobra18.json <quote-funnel recording.mp4>
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
| 11–13.5 s | backpack close-up, 3 rapid close-ups, pull-back reveal (c4) | ON YOUR BACKPACK. | DOOF, busier daf + claps, fabric foley |
| 13.5–16 s | the real quote funnel in a browser frame on the site's cream: step 1 patch type, step 2 quantity (real click on "10 to 24"), step 5 upload | GET YOUR QUOTE eyebrow + step titles | whoosh in, UI clicks on taps, light daf groove, roll into the card |
| 16–18 s | end card: logo card, GET YOUR CUSTOM PATCHES MADE., CLICK BELOW, GET YOUR QUOTE pill, quote.americancustompatchlab.com | | final DOOF + card hit |

The quote-funnel screen recording (client's WhatsApp video, 1898×926) is **not stored in the repo**:
later in it the OS file picker, an email address, names, a phone number, a WhatsApp notification and
upload / submit errors are visible. Only 2.8–3.7 s, 4.5–5.4 s and 11.0–11.85 s are used (card column
crop 1160×820 at x 170, y 20; `deskCrop` in the spec), before any of that appears.

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

## 40 s long version

`out/American-Custom-Cobra-Drop-40s.mp4` (+ `_light.mp4` for WhatsApp/chat). Composition
`AmericanCustomCobraDrop40`, spec `scripts/ac-cobra40-spec.py` → `src/americancustom/cobra40.json`,
audio `bash scripts/build-audio.sh ac-cobra40 -14 -1.5`, segments as above with `cobra40`.

| Time | Content |
| --- | --- |
| 0–4 s | hook, hand + cobra: YOUR DESIGN. / YOUR PATCH. (tension build) |
| 4–10 s | DOOF drop, match cut to the jacket: ON YOUR JACKET., then BOLD. RAISED. MOLDED. IN 3D. one per beat |
| 10–16 s | cap, DOOF + vocal chop: MADE TO STAND OUT., ON YOUR CAP. |
| 16–22 s | backpack: close-up, rapid close-ups, slow pull-back: ON YOUR BACKPACK. |
| 22–24 s | 0.25 s montage: JACKETS. CAPS. BACKPACKS. YOUR GEAR. |
| 24–26 s | hero jacket: YOUR DESIGN. / YOUR PATCH. |
| 26–34 s | quote funnel, 5 steps: type, quantity (real click), size (typing), backing (real click), upload |
| 34–40 s | end card: logo, GET YOUR CUSTOM PATCHES MADE., CLICK BELOW, GET YOUR QUOTE, domain |

## 40 s with voiceover

`out/American-Custom-Cobra-Drop-40s-VO.mp4` (+ `_light.mp4`). Composition `AmericanCustomCobraDrop40VO`,
spec `scripts/ac-cobra40vo-spec.py`, audio `bash scripts/build-audio.sh ac-cobra40vo -14 -1.5`.
VO: ElevenLabs take `assets/source/americancustom/audio/vo-c40.mp3` (29.6 s, script in
`vo-c40-transcript.txt`), word times `src/americancustom/vo-c40.json` (pocketsphinx forced alignment;
whisper check in `vo-c40.asr.json`). The take is cut in its own pauses into 7 blocks, each placed on
its section (`voBlocks`), and the slams, cuts, website steps and end-card words land on the spoken
words. The daf bed ducks under the voice; still no music.

## 18 s with voiceover

`out/American-Custom-Cobra-Drop-18s-VO.mp4` (+ `_light.mp4`). Composition `AmericanCustomCobraDrop18VO`,
spec `scripts/ac-cobra18vo-spec.py`, audio `bash scripts/build-audio.sh ac-cobra18vo -14 -1.5`.
VO: ElevenLabs take `assets/source/americancustom/audio/vo-c18.mp3` (12.8 s), word times
`src/americancustom/vo-c18.json`. The spoken end line ("American Custom Patch. Click below — get your
quote.") needs ~3 s, so the end card starts at 14.5 s and the sections sit at 0 / 3 / 6.5 / 9.5 / 12 s.
Block cuts must leave a word's release burst in (the "ch" of "Patch" runs to 10.72 s of the take).
