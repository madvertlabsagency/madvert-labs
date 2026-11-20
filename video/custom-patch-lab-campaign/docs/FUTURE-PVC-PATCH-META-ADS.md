# Future PVC Patch — Meta ads (4)

| # | File | Length | Voiceover |
|---|---|---|---|
| 1 | `out/FuturePvcPatch_MetaAd_40s_1080x1920.mp4` | 45.5 s (VO 43.7 s + 1.8 s end card) | yes ("Your logo. Your identity…") |
| 2 | `out/FuturePvcPatch_MetaAd_23s_1080x1920.mp4` | 25.5 s (VO 23.8 s + 1.7 s end card) | yes ("Your logo deserves more than a print…") |
| 3 | `out/FuturePvcPatch_Ad03_Eagle_18s_1080x1920.mp4` | 18.0 s | none: music + DOOF drops + vocal chops |
| 4 | `out/FuturePvcPatch_Ad04_Lion_18s_1080x1920.mp4` | 18.0 s | none: music + DOOF drops + vocal chops |

All four are 1080×1920 (9:16), 30 fps, H.264 + AAC 320k, −14 LUFS / −1.5 dBTP, with no Markhor or Madvert branding.

## Editable project
- **Edits:** `scripts/fpp-ads-specs.py` writes `src/fpp/ads/{a40,b23,e18,l18}.json`. Every cut is a time chosen against the voiceover word onsets.
- **Engine:** `src/fpp/ads/FppAd.tsx`.
- **Voiceover timing:** `src/fpp/ads/vo-{a,b}.json`, from forced alignment of the ElevenLabs files (transcripts in `assets/source/fpp/ads/audio/`).
- **Shot conform:** `scripts/conform-shots.py fpp/<cut>`.
- **Website funnel conform:** `scripts/conform-desk.py fpp/<cut>`.
- **Soundtrack:** `scripts/fpp_ads_audio.py`, built with `bash scripts/build-audio.sh fpp-<cut> -14 -1.5`.
- **Render:** `npm run render:fppmeta40:final`, `render:fppmeta23:final`, `render:fppeagle18:final`, `render:fpplion18:final`.

## Brand layer
- **Colours:** electric blue `#1E6BFF`, cyan `#19B6F2`, deep navy `#0A1638`/`#040A1C`, white. The footage itself is not tinted, so patch colours stay true.
- **Type:** Montserrat ExtraBold/Black. Highlight words sit on hexagon-pointed electric strips.
- **Captions:** word-by-word, synced to the voiceover on ads 1–2.
- **Logo:** the supplied logo with only its white background removed (`public/brand/fpp-logo-cut.png`), used on the brand reveal, the CTA and the end cards.
- **Final CTA:** CLICK BELOW ↓ · GET YOUR INSTANT QUOTE · futurepvcpatch.com. Ads 3–4 add GET YOUR CUSTOM PATCHES MADE.

## Ad 1 — 40 s premium (VO-led)
| VO | Visual | On screen |
|---|---|---|
| Your logo. Your identity. Your custom patch. | PVC lion (new clip) · PVC eagle cap (new) · hands with a patch collection | YOUR **LOGO.** / YOUR **IDENTITY.** / YOUR CUSTOM **PATCH.** |
| From bold PVC patches on varsity jackets… | PVC shield in hand → PVC lion on varsity jacket (new) | BOLD PVC · VARSITY JACKETS |
| …embroidered logos on caps and personalized names on polo shirts | embroidered eagle → ACE cap → ALEX name patch → polo crest | EMBROIDERED LOGOS · CAPS · PERSONALIZED NAMES · POLO SHIRTS |
| Turn your designs into something people can wear. | sketch → patch → lion jacket worn | TURN YOUR DESIGNS INTO SOMETHING PEOPLE **WEAR.** |
| PVC, embroidered, chenille, woven, and leather | one macro per material, cut on each word (music drop) | 01–05 / 05 material tags |
| Different styles, textures, endless possibilities | studio shield · chenille macro · collection flat-lay | STYLES · TEXTURES · ENDLESS **POSSIBILITIES.** |
| Made for clothing brands, sports teams, businesses… stand out | jacket & cap rack · baseball jersey · corporate shirt · denim jacket | CLOTHING BRANDS · SPORTS TEAMS · BUSINESSES · STAND **OUT.** |
| Because the smallest details make the biggest impression. | PVC macro · needle macro · lion jacket | SMALL DETAILS. BIG **IMPRESSION.** |
| Future PVC Patch. Your design. Made to stand out. | brand reveal (logo + name) | YOUR DESIGN. MADE TO STAND **OUT.** |
| Click below to get your instant quote. | CTA screen | CLICK BELOW ↓ · GET YOUR INSTANT QUOTE |
| Select your patch type. Choose your size, upload your artwork, and receive your custom quote… | the real funnel in a browser frame: PVC tapped → size typed → upload → quote form with the "Request my free quote" button | step header 1–4 + progress dots |
| — | end card | logo · CLICK BELOW · GET YOUR INSTANT QUOTE · futurepvcpatch.com |

## Ad 2 — 23 s fast
Its own cut, not a sped-up Ad 1:
- 0.5 s hook flashes: PVC eagle cap, PVC lion, PVC macro.
- PRINT? over the printed patch, then an impact drop into the PVC lion jacket: MAKE IT A CUSTOM PATCH.
- Full-width word slams on each material: PVC. EMBROIDERED. CHENILLE. WOVEN. LEATHER.
- YOUR DESIGN. YOUR STYLE.
- Fast apparel hits: VARSITY. CAPS. POLOS. UNIFORMS.
- MAKE EVERY DETAIL STAND OUT.
- Logo slam, CLICK BELOW, the four funnel steps, and the end card.
- White flashes and camera shakes on the drops.

## Ads 3 & 4 — 18 s, no voiceover (the original Lion-ad formula)
Hand holds the patch close while the music builds (heartbeat kick, accelerating hats, riser, wordless "oh" vocal swells). A short silence, then a **DOOF** drop exactly on the jacket reveal. Every further reveal lands on a downbeat with its own DOOF, white flash and vocal stab. A 0.25 s montage follows, then a hero hold and the end card: GET YOUR CUSTOM PATCHES **MADE.** · CLICK BELOW · GET YOUR INSTANT QUOTE.
- **Eagle (120 BPM, straight):**
  - YOUR LOGO. / AS A 3D PATCH. / READY?
  - DOOF → ON YOUR JACKETS.
  - DOOF → ON YOUR BACKPACK.
  - DOOF → ON YOUR CAP.
  - EVERYWHERE. / YOUR BRAND. / BUILT TO STAND OUT.
- **Lion (124 BPM, syncopated):**
  - YOUR LOGO., then one word per beat: BOLD. RAISED. MOLDED. IN 3D.
  - DOOF → ON YOUR VARSITY.
  - DOOF → ON YOUR CAP.
  - DOOF → IMPOSSIBLE TO MISS.
  - MADE TO ROAR. / YOUR BRAND. IN 3D.

## Sound design (all four) — NO MUSIC
At the client's requirement, there is no music of any kind: no melody, chords, bass notes, synths, pads or bells. Everything is synthesized here (no samples):
- **Rhythm:** daf only (dum / tak / ka / rolls, no jingles), plus hand claps.
  - Patterns per section: maqsum and baladi grooves with ka ghost notes, half-time under the website steps, accelerating ka and a heartbeat dum in the build-ups, and a daf roll into every drop.
- **DOOF on every product reveal:** a doubled daf dum, a low thump, a soft boom and a whispered "hah" exhale. A short silence and an inhale come just before each drop.
- **Natural vocal sounds:** unpitched only (breaths, inhales, whispered "hah", a chest "hup"). No words and no sung notes.
- **SFX:** whooshes and impacts on cuts, daf accents on the kinetic slams, UI clicks and typing ticks in the website funnel, a "tick-tick" when the artwork file is added (no chimes), and daf and boom hits on the CTA and end card.
- **Foley:** fabric, caps, PVC taps and flexes, patch handling, leather, pencil and brush sounds, and the real embroidery machine's recorded audio, with light workshop ambience.
- **Voiceover (ads 1–2):** high-pass, 3:1 compression and a presence lift. The daf ducks about 9 dB under the voice, and a slow leveler keeps the loudness even.
- **Check:** a spectral analysis of all four mixes finds no sustained tonal content.

## Website funnel (real recording): what is and isn't shown
**Shown**
- Step 1: patch type, PVC tapped.
- Step 3: size typed.
- Step 5: the upload drop zone and the attached file "Roaring Lion Varsity Jacket-6.png".
- Step 7: the empty "Where should we send your quote?" form, with a tap highlight on **Request my free quote**.

**Not shown, on purpose**
- **The OS file picker:** it shows personal folders and files.
- **The upload error:** "Upload is not available right now…".
- **The filled-in contact form:** it shows personal details (name, email, phone, "Madvert Labs").
- **The final save error:** "We could not save your request. Please try again in a minute."
- **The site's side panel:** it shows "Free mockup within 24 hours, free shipping, no minimum, money-back guarantee". That panel is cropped out, and no such claim is made in our graphics.

No quote result is shown or invented. The funnel ends on the button.

The copy of the recording stored in the repo (`assets/source/fpp/ads/web/quote-funnel.mp4`) has the file-picker and personal-details sections blacked out and no audio track.

**⚠ Before running ads 1–2:** in the recording, the artwork upload and the final quote submission both failed on the live site. Fix those on futurepvcpatch.com, or the ad will promise a flow that breaks. The VO line "receive your custom quote within minutes" is the client's own script; confirm the site delivers it.

## Footage used
- **New clips:** PVC lion on varsity jacket; PVC eagle cap (rotating); hand holding the PVC lion; PVC lion cap; varsity jacket with PVC eagle; backpack with PVC eagle; hand holding the PVC eagle.
  - Two uploads were byte-identical duplicates and were skipped.
  - The lion-cap clip's 1–5 s morph section is not used.
- **Earlier batches (generic, no client branding):** PVC shield, patch collection, chenille R, woven monogram, printed patch, embroidery machine, ALEX name patch, corporate shirt, baseball jersey (first 1.1 s, before the swoosh), denim jacket, ACE cap, polo crest, PVC/chenille/leather macros, studio shield, collection flat-lay (zoomed past the compass patch), lion macro and lion varsity jacket, eagle sketch-to-patch, jacket & cap rack.

## Post captions
1. *Your logo. Your identity. Your custom patch. PVC, embroidered, chenille, woven and leather, made for brands, teams and businesses. Click below to get your instant quote.*
2. *Your logo deserves more than a print. Make it a custom patch. Get your instant quote in minutes: click below.*
3. *Your eagle, everywhere: jackets, backpacks, caps. Get your custom patches made. Click below for your instant quote.*
4. *Bold. Raised. Molded in 3D. Get your custom patches made. Click below for your instant quote.*

## Export verification

| File | Size | Video | Frames (expected) | Audio | Loudness / peak | Decode errors | Black frames |
|---|---|---|---|---|---|---|---|
| FuturePvcPatch_MetaAd_40s_1080x1920.mp4 | 58 MB | h264 1080 1920 yuv420p 30/1 | 1365 (1365) | aac 48000 |  I: -14.0 LUFS  Peak: -1.5 dBFS  | 0 | 0 |
| FuturePvcPatch_MetaAd_23s_1080x1920.mp4 | 33 MB | h264 1080 1920 yuv420p 30/1 | 765 (765) | aac 48000 |  I: -14.0 LUFS  Peak: -1.5 dBFS  | 0 | 0 |
| FuturePvcPatch_Ad03_Eagle_18s_1080x1920.mp4 | 31 MB | h264 1080 1920 yuv420p 30/1 | 540 (540) | aac 48000 |  I: -13.9 LUFS  Peak: -1.3 dBFS  | 0 | 0 |
| FuturePvcPatch_Ad04_Lion_18s_1080x1920.mp4 | 29 MB | h264 1080 1920 yuv420p 30/1 | 540 (540) | aac 48000 |  I: -14.0 LUFS  Peak: -1.1 dBFS  | 0 | 0 |

Checked with ffprobe (counted frames), a full decode, `blackdetect=d=0.03:pix_th=0.08` and `ebur128=peak=true`; contact sheets and stills reviewed (the bright frames on the drops are the intended 5-frame white flash). Upload copies (two-pass ~7 Mb/s): 40 s → 40 MB (SSIM 0.994), 23 s → 22 MB (0.994), Eagle → 16 MB (0.990); Lion master is 29 MB.
