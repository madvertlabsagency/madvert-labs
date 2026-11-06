# Markhor Patches — Flagship Campaign: "YOUR DESIGN. YOUR IDENTITY. YOUR PATCH."

| File | Length | Purpose |
|---|---|---|
| `out/MARKHOR_FLAGSHIP_50S.mp4` | 50.0 s | Full brand launch commercial |
| `out/MARKHOR_COMMERCIAL_30S.mp4` | 30.0 s | Condensed premium version |
| `out/MARKHOR_META_AD_15S.mp4` | 15.0 s | Fast, conversion-focused Meta ad |
| `out/MARKHOR_WEBSITE_HERO.mp4` | 10.0 s | Muted, text-free, seamless loop for the website hero |
| `out/MARKHOR_FLAGSHIP_50S_16x9.mp4` | 50.0 s | 16:9 version of the flagship |
| `out/MARKHOR_COMMERCIAL_30S_16x9.mp4` | 30.0 s | 16:9 version of the 30 s |
| `out/MARKHOR_META_AD_15S_16x9.mp4` | 15.0 s | 16:9 version of the 15 s |
| `out/MARKHOR_WEBSITE_HERO_16x9.mp4` | 10.0 s | 16:9 desktop website hero (muted, seamless loop) |

The 9:16 files are 1080×1920 and the 16:9 files are 1920×1080; all are 30 fps, H.264, yuv420p, BT.709. The ads carry AAC 320k audio at −14 LUFS / −1.5 dBTP (each 16:9 ad uses the same soundtrack and timing as its 9:16 version). The heroes have no audio track.

**Related files**
- Shot-by-shot timelines: `docs/MARKHOR-FLAGSHIP-TIMELINES.md`
- Voiceover cue sheet: `docs/MARKHOR-FLAGSHIP-VO.txt`

**Editable project**
- Edit specs: `src/markhor/{flag50,flag30,meta15,hero,hero169}/edl.json` (the `wide` key holds the 16:9 staging)
- Engines: `src/markhor/flagship.tsx` (9:16) and `src/markhor/flagship169.tsx` (16:9)
- Design system: `src/markhor/hyper.tsx`

**Pipelines**
- Footage conform: `scripts/conform-shots.py markhor/<cut>`
- Website conform: `scripts/conform-web.py markhor/<cut>`
- Soundtrack: `scripts/markhor_flagship_audio.py`, built with `scripts/build-audio.sh markhor-<cut> -14 -1.5`
- Render: `npm run render:flagship50:final`, `render:commercial30:final`, `render:metaad15:final`, `render:websitehero:final`; 16:9: `render:flagship50wide:final`, `render:commercial30wide:final`, `render:metaad15wide:final`, `render:websiteherowide:final`

## What is and is not in these renders
- **Voiceover:** not included. No studio-quality voice generator is available in this environment, and the brief asks for a timed guide rather than a poor substitute. Every line has a fixed cue (see the VO cue sheet), and the on-screen typography carries the full story without sound.
  - Record the lines (for example in ElevenLabs).
  - Save each cut's voiceover as `public/audio/markhor-<cut>-vo.wav`.
  - Rebuild the audio and re-render. The mix ducks the drums about 7 dB under the voice automatically.
- **Wordless vocal layers:** not included. Convincing human humming or chanting can't be synthesized here, and a synthetic imitation would sound like the synth pad the brief rules out.
  - Drop a recorded or generated vocal stem in as `public/audio/markhor-<cut>-vox.wav` and it is mixed under the drums and ducked with the VO.
  - Suggested generation prompt: "wordless deep male vocal hum and soft 'oh' harmonies, warm, cinematic, no lyrics, 120 BPM, builds to a swell at the end".
- **Duff soundtrack:** included. Frame-drum percussion at 120 BPM (dum / tak / ka) with no jingles, synthesized from scratch.
  - It is cut to the edit: a dum on every major reveal, double hits on the 0.25 s runs, and a half-time groove under the website section.
  - It builds through a roll into one final impact on the logo.
  - Natural sound: the embroidery machine's real recorded audio under every needle shot, plus needle strokes, fabric, packaging, a PVC tap and precise UI clicks on every website tap.
  - Short-term loudness stays between −11 and −18 LUFS across the whole 50 s, so nothing goes empty.
- **16:9 versions:** made as a designed landscape layout, not a crop. Every source clip is 9:16 (720×1280), and a straight 16:9 crop would be a 720×405 slice blown up 2.7×. Each 16:9 cut uses the same timeline, cuts and soundtrack as its vertical version, staged four ways:
  - **Panel:** one vertical footage panel on the right, with the headline column on the left.
  - **Gallery:** for the applications and patch-types sections, the panels fill the width one by one on the hits, each with its caption (BRANDS. / TEAMS. / SCHOOLS. / BUSINESSES.; EMBROIDERED. → FULL-COLOR.). The active panel is outlined in cyan.
  - **Website:** the real recordings in the phone on the right, with the step headline on the left.
  - **End card:** logo left; headline, CTA and URL right.
  - **Desktop website hero:** a full-bleed triptych of slow-motion macros; each third swaps once, and the file loops seamlessly.
- **Sora font:** not available offline here (the download was refused). Headlines use Manrope ExtraBold, the guide's listed alternative, with the guide's slant and highlight strips.

## Footage selection
**Used, from the new batch:**
- f01 hands with a patch collection
- f02 woven monogram label, then a full-colour printed patch (the "sublimated" shot)
- f04 chenille varsity R
- f05 PVC lightning shield
- f06 embroidery machine on an eagle (hero manufacturing shot; also its machine audio)
- f07 ALEX name patch on a backpack
- f08 corporate shirt and logo patch
- f09 school blazer, wide only
- f10 baseball sleeve patch, first 1.2 s only
- f11 denim jacket application
- f12 MIA chenille gift box
- f14 ACE cap
- f15 tote

**Used, from earlier batches:** m21 chenille macro and m26 embossed leather macro.

**Website (real recordings):**
- w04 home page with GET A QUOTE
- w02 Start your patch: choose a style
- w01 quote wizard: size → quantity → shape → attachment → border (sped up 3×)
- w02 Send your artwork
- w03 upload progress to 100 %

**Not used, and why:**
- **Mountain patches:** every earlier mountain shot is excluded, per the brief.
- **f03:** a duplicate of f02.
- **f09 close-up:** the crest banner reads "MOURE OF SYCHAL" (garbled AI text).
- **f10 after 1.3 s:** a Nike swoosh and a New Era-style logo are visible on the jersey.
- **f13:** the flag patch flat-lay works, but the cut had stronger application shots.
- **m26 3.5–4.45 s:** the compass patch with garbled numerals. The leather range starts after it.
- **w03 1–4.6 s:** the Android file picker shows personal Gmail addresses and private screenshots.
- **w03 from 8.9 s:** the site shows an upload error ("HTTP 500"). Only the successful 0 → 100 % progress is used.
- **The final quote submission:** not in any recording, so it is not shown or simulated. The order section ends on the real GET A QUOTE button.
- **Phone status bar:** cropped from every recording. The Chrome address bar with markhorpatches.com stays.

**On-site wording visible in the recordings:** these are lines on the client's own website, not copy we added. Confirm they are current, because they appear on screen briefly:
- "Free artwork support and a digital proof on every order"
- "Get a quote · Free, no obligation"
- "almost three decades of patch-making experience…"

## Scripts
### 50 s flagship
| Time | Visual | On-screen | VO |
|---|---|---|---|
| 0–5 s | Needle on the eagle, PVC, chenille on daf hits → the real site in a phone | YOUR DESIGN. · YOUR IDENTITY. · YOUR PATCH. · markhorpatches.com | Every great brand starts with an identity. |
| 5–13 s | Woven label, ACE cap → varsity R, baseball sleeve → school blazer → corporate shirt + logo patch | BRANDS. · TEAMS. · SCHOOLS. · BUSINESSES. (with lower thirds) | Your clothing brand. Your team. Your school. Your business. |
| 13–22 s | ALEX backpack, MIA gift box, tote, denim jacket, hands with the collection | MADE FOR YOUR IDENTITY. (lower thirds: name patches, personalized gifts, bags & totes, jackets & apparel) | Whatever you're creating, make it unmistakably yours. |
| 22–31 s | Embroidery needle → PVC → chenille → woven → leather → full-colour | EMBROIDERED. · PVC. · CHENILLE. · WOVEN. · LEATHER. · FULL-COLOR. (01–06 / 06) | From classic embroidery to bold PVC, chenille, woven, leather and full-color patches. |
| 31–41 s | Real site: pick Embroidered → wizard steps → Send your artwork → upload 100 % → GET A QUOTE | CHOOSE YOUR STYLE. · SHARE YOUR DESIGN. · REQUEST YOUR QUOTE. · IT'S THAT SIMPLE. | Choose your style. Share your design. Request your custom quote. It's that simple. |
| 41–50 s | Needle hero → 0.5 s montage of cap, jersey, name patch, corporate, PVC, gift → collection → logo | PREMIUM DETAIL. · YOUR VISION. BROUGHT TO LIFE. · end card | Premium detail. Your vision brought to life. Markhor Patches. Make your mark. |

**End card:** original logo · CUSTOM PATCHES FOR BOLD BRANDS. · **GET YOUR CUSTOM QUOTE →** · www.markhorpatches.com

### 30 s
Same story, condensed:
- Hook, then the site (0–4 s)
- BRANDS / TEAMS / SCHOOLS / BUSINESSES (4–10 s)
- Six materials at 1 s each (10–16 s)
- Choose → upload → quote on the real site (16–23 s)
- Montage and YOUR VISION. BROUGHT TO LIFE. (23–27 s)
- End card (27–30 s)

### 15 s Meta ad
- **0–2.7 s:** YOUR LOGO. AS A PREMIUM PATCH. over a 0.25 s material stutter.
- **2.7–6.7 s:** FOR BRANDS, TEAMS & SCHOOLS. over eight 0.5 s application hits.
- **6.7–11 s:** the real site: CHOOSE YOUR STYLE. · UPLOAD YOUR DESIGN. · GET YOUR QUOTE.
- **11–13 s:** MAKE YOUR MARK.
- **13–15 s:** end card: YOUR DESIGN. YOUR PATCH. · GET YOUR CUSTOM QUOTE →

### Website hero
10 s of slow-motion macros: needle, PVC, chenille, woven, full-colour and the collection, joined by dissolves. There is no text and no audio. The last 0.5 s cross-fades into the exact first frame, so the file loops seamlessly.

## Captions
- **50 s:** *Every great brand starts with an identity. Clothing brands, teams, schools and businesses: we turn your design into a premium custom patch, in embroidered, PVC, chenille, woven, leather or full-color. Choose your style, share your design and request your custom quote at markhorpatches.com.* #MarkhorPatches #CustomPatches #MakeYourMark #EmbroideredPatches #PVCPatches #ChenillePatches #BrandIdentity
- **30 s:** *Your design. Your identity. Your patch. From embroidery to PVC, chenille, woven and leather, made for your brand, team, school or business. Request your custom quote at markhorpatches.com.* #CustomPatches #MarkhorPatches #Merch #TeamPatches #SchoolUniform
- **15 s:** *Your logo as a premium patch. Pick a style, upload your design and get your custom quote in a few taps at markhorpatches.com.* #CustomPatches #MarkhorPatches #LogoPatch #SmallBusiness
- **Website hero:** no caption (muted loop).

## Claims check
None of these appear anywhere in our copy, VO or graphics: delivery or response times, free shipping, minimums, discounts, certifications or testimonials. The AI-generated manufacturing footage is never called "our factory".

## Export verification report

Checked with ffprobe (stream specs, counted frames), a full decode (`ffmpeg -v error -f null`), `blackdetect=d=0.03:pix_th=0.08` and `ebur128=peak=true`. Contact sheets of every export were reviewed frame by frame. The website hero's last frame differs from its first by a mean of 1.3/255 (grain only), so the loop is seamless. The upload copies (two-pass, about 6.5 Mb/s) score SSIM 0.993 (50 s) and 0.994 (30 s) against the masters.

| File | Size | Video | Frames (expected) | Audio | Loudness / true peak | Decode errors | Black frames |
|---|---|---|---|---|---|---|---|
| MARKHOR_FLAGSHIP_50S.mp4 | 62 MB | h264 1080 1920 yuv420p 30/1 | 1500 (1500) | aac 48000 317377 |  I: -14.1 LUFS  Peak: -1.4 dBFS  | 0 | 0 |
| MARKHOR_FLAGSHIP_50S_upload.mp4 | 41 MB | h264 1080 1920 yuv420p 30/1 | 1500 (1500) | aac 48000 317377 |  I: -14.1 LUFS  Peak: -1.4 dBFS  | 0 | 0 |
| MARKHOR_COMMERCIAL_30S.mp4 | 34 MB | h264 1080 1920 yuv420p 30/1 | 900 (900) | aac 48000 317375 |  I: -14.0 LUFS  Peak: -1.2 dBFS  | 0 | 0 |
| MARKHOR_COMMERCIAL_30S_upload.mp4 | 25 MB | h264 1080 1920 yuv420p 30/1 | 900 (900) | aac 48000 317375 |  I: -14.0 LUFS  Peak: -1.2 dBFS  | 0 | 0 |
| MARKHOR_META_AD_15S.mp4 | 18 MB | h264 1080 1920 yuv420p 30/1 | 450 (450) | aac 48000 317368 |  I: -14.2 LUFS  Peak: -1.2 dBFS  | 0 | 0 |
| MARKHOR_WEBSITE_HERO.mp4 | 14 MB | h264 1080 1920 yuv420p 30/1 | 300 (300) | none (muted) | — | 0 | 0 |
| MARKHOR_FLAGSHIP_50S_16x9.mp4 | 36 MB | h264 1920 1080 yuv420p 30/1 | 1500 (1500) | aac 48000 317377 |  I: -14.1 LUFS  Peak: -1.4 dBFS  | 0 | 0 |
| MARKHOR_COMMERCIAL_30S_16x9.mp4 | 20 MB | h264 1920 1080 yuv420p 30/1 | 900 (900) | aac 48000 317375 |  I: -14.0 LUFS  Peak: -1.2 dBFS  | 0 | 0 |
| MARKHOR_META_AD_15S_16x9.mp4 | 11 MB | h264 1920 1080 yuv420p 30/1 | 450 (450) | aac 48000 317368 |  I: -14.2 LUFS  Peak: -1.2 dBFS  | 0 | 0 |
| MARKHOR_WEBSITE_HERO_16x9.mp4 | 16 MB | h264 1920 1080 yuv420p 30/1 | 300 (300) | none (muted) | — | 0 | 0 |

The 16:9 website hero's last frame differs from its first by a mean of 1.6/255 (grain only), so it loops seamlessly. A 4.5 Mb/s upload copy of the 50 s 16:9 is in `out/MARKHOR_FLAGSHIP_50S_16x9_upload.mp4`.
