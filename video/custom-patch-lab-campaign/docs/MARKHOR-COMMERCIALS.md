# Markhor Patches — Premium Commercial Reels (10)

`out/Markhor_Commercial_01.mp4` … `_10.mp4`. All files are 1080×1920 · 30 fps · H.264 + AAC 256k · 9–13 s · no voiceover · no instrumental music · audio around −16 LUFS.
Render one with `npm run render:markhorcNN:final`.

## Editable project
- **Specs (one per reel):** `src/markhor/cNN/edl.json` holds the shots, framing, the transition into each cut, beat-timed text, the end card and the sound flags.
- **Engine:** `src/markhor/commercial.tsx`.
- **Design system:** `src/markhor/hyper.tsx` (typography, highlight strips, CTA pills, end card).
- **Sound:** `scripts/markhor_commercial_audio.py` plus `scripts/markhor_beat.py`.
- **Shot conform:** `python3 -I scripts/conform-shots.py markhor/cNN`.
- **Logo:** the original light Markhor Patches logo (`assets/source/markhor/brand/markhor-logo-light.png`), unaltered, on every end card with www.markhorpatches.com.

## Design system (applied to all 10)
- **Headlines:** extra-bold uppercase, slanted −8°, in Manrope ExtraBold. Sora isn't available offline here; Manrope is the guide's alternative. Navy on bright backgrounds, white on dark footage, with a soft navy shade at the top of dark shots.
- **Highlights:** 1–2 words per headline on an angled cyan #00C2FF → royal #1068D7 strip.
- **Supporting text:** subheads in Manrope Semibold sentence case; labels in white caps on translucent navy, inside the safe area.
- **CTAs:** navy or cyan pills with an arrow and a light sweep.
- **End cards:** bright white → #EAF5FF with a slow cyan strip; logo, one headline, one CTA, the URL.
- **Sound:** sound effects only, nothing tonal. A crisp "tish" on cuts and low noise thuds on impacts. Air passes on whips, zooms and slides. Mechanical ticks on 0.25 s runs, needle strokes, fabric textures, and a short drop-out before each hero. Reels 04 and 05 also carry the clips' real machine audio (m24, m29, m26, m1, m8).

## Footage notes
**Used:**
- m19 café tote; m20 studio line-up; m21 macros; m22 cap / jacket / tote / backpack / line-up
- m23 one design across styles; m24 idea → machine → patch; m25 polo / cap / tote; m26 needle, PVC, chenille R, leather
- m27 plain → patched cap; m28 styles and flat-lay; m29 machine ASMR
- From earlier batches: m1, m8 and m14 (NIKSOL workwear logo, approved).

**Not used, or cropped:**
- m20 compass (metal-looking, garbled lettering).
- m26 compass (odd numerals) and m26 5.4 s onward (gibberish lettering on the jacket patches and the collection).
- m25 1.5–2.9 s (gibberish jacket badge).
- **m25 collection (5.9 s onward): the polo shows a Lacoste-style crocodile and the jacket a Carhartt-style label.** Those are third-party trademarks, so it is not used.
- m21 swirl (partial lettering, cropped); m24 monitor stand (logo, cropped).
- m19 table edge (small patches with gibberish text, cropped).
- m20 / m25 audio (tonal content).
- Re-uploads of m6, m8 and m10 skipped as duplicates.

---

## 01 — THE BRAND UPGRADE (13.2 s) · luxury cinematic
**Script:**
- [Plain navy cap on a marble plinth] `YOUR BRAND.`
- [Impact cut, drop-out → the same cap with the embroidered patch] `UPGRADED.`
- [Zoom-through to the patch macro]
- [Whip → tonal embroidered crest on a polo] `DETAILS PEOPLE NOTICE.` [cap → tote]
- [Dissolve → the cap on the plinth, slow push] `Premium custom patches for your brand.`
- **End card:** `SMALL DETAILS. BIG IMPACT.` · **GET YOUR CUSTOM QUOTE →**

**Footage:** m27, m25 (polo, cap, tote).
**Caption:** *Same cap. Different brand. A custom patch is the upgrade people notice first. Get your custom quote at markhorpatches.com* #custompatches #brandmerch #embroideredpatch #hatpatch #streetwearbrand

## 02 — PATCH EVERYWHERE (11.0 s) · beat-synced merch
**Script:**
- [Cap] `YOUR LOGO.` [hit: jacket] `EVERYWHERE.`
- Hits on CAPS · JACKETS · TOTES · BACKPACKS · POLOS. The same patch sits in the same frame position for match cuts.
- [0.25 s run of six products] → [drop-out, impact] [merch line-up] `ONE PATCH. EVERY PLACE.` `Caps, jackets, totes, backpacks and more.`
- **End card:** `YOUR LOGO. EVERYWHERE.` · **EXPLORE CUSTOM PATCHES →**

**Footage:** m22, m25 (polo, cap), m19 (bag).
**Caption:** *One patch, every product: caps, jackets, totes, backpacks, polos. Your logo, everywhere your brand goes. Explore custom patches at markhorpatches.com* #custompatches #merch #logopatch #brandidentity #promoproducts

## 03 — ONE DESIGN, MANY STYLES (10.3 s) · patch switch
**Script:**
- [Embroidered shield] `ONE DESIGN.` with labels EMBROIDERED → PVC → LEATHER on hits; the design stays locked in place.
- [0.25 s switches between the three] `ENDLESS POSSIBILITIES.`
- [Impact → four-up grid] `MAKE IT YOURS.`
- **End card:** `ONE DESIGN. ANY STYLE.` · **CREATE YOUR CUSTOM PATCH →**

**Footage:** m23.
**Caption:** *Same artwork, three personalities: embroidered, PVC or leather. Which one fits your brand? Create your custom patch at markhorpatches.com* #custompatches #pvcpatch #leatherpatch #embroideredpatch #designinspo

## 04 — FROM IDEA TO PATCH (11.0 s) · process story
**Script:**
- [Design on screen] `IT STARTS AS AN IDEA.` `01 DESIGN`
- [Whip → thread cones] `02 THREAD`
- [Punch → needles stitching the same design] `03 STITCH`
- [Zoom → the finished patch on a pedestal] `04 PATCH` `FROM IDEA TO PATCH.`
- **End card:** `YOUR IDEA. STITCHED.` · **BRING YOUR DESIGN TO LIFE →**

**Footage:** m24, m29 (thread). Real machine audio.
**Caption:** *From a file on a screen to a patch in your hand, stitched thread by thread. Bring your design to life at markhorpatches.com* #embroidery #processvideo #custompatches #fromideatoproduct #makingof

## 05 — ODDLY SATISFYING (12.8 s) · manufacturing ASMR
**Script:**
- [Needle macro on the blue mountain] `TURN THE SOUND ON.`
- Needle on blank fabric → hoops → needle macro → thread → multi-head needles. Cuts land on needle strokes over the real machine sound.
- [Dissolve → finished mountain in the hoop] `ODDLY SATISFYING.` [machine row] `Stitch by stitch.`
- **End card:** `MADE STITCH BY STITCH.` · **GET YOUR CUSTOM QUOTE →**

**Footage:** m26, m29, m1, m8.
**Caption:** *Sound on. Watch the needle do its thing. Oddly satisfying, every single stitch. Get your custom quote at markhorpatches.com* #asmr #satisfying #embroidery #embroiderymachine #custompatches

## 06 — TEXTURE OBSESSION (10.9 s) · slow-motion macro
**Script:**
- [Chenille loops, slow-mo] `TEXTURE OBSESSED?` `CHENILLE`
- Zoom-throughs: EMBROIDERED · PVC · WOVEN · LEATHER, each a slow macro with soft fabric sound.
- [Embroidered mountain macro] `FEEL THE DIFFERENCE.`
- **End card:** `EVERY TEXTURE. YOUR BRAND.` · **EXPLORE CUSTOM PATCHES →**

**Footage:** m21, m28.
**Caption:** *Chenille, embroidery, PVC, woven, leather: which texture is your brand? Explore custom patches at markhorpatches.com* #texture #macro #custompatches #chenille #wovenpatch

## 07 — BEAT DROP (12.2 s) · hyper-cut
**Script:**
- [Four 0.25 s flashes] `FIVE STYLES. ONE BEAT.`
- Ten 0.5 s hits: EMBROIDERED · PVC · CHENILLE · WOVEN · LEATHER, then more patches.
- 0.25 s double-time run → drop-out → six real patch tiles slam into a grid: `THE FULL LINEUP.`
- **End card:** `PICK YOUR STYLE.` · **CREATE YOUR CUSTOM PATCH →**

**Footage:** m28, m26 (PVC, chenille R, leather), m20 (not the compass); tiles cropped from m28 frames + m6.
**Caption:** *Five styles, one beat. Embroidered, PVC, chenille, woven, leather: pick yours. Create your custom patch at markhorpatches.com* #patches #custompatches #patchgame #satisfyingvideo #merch

## 08 — BUILT FOR YOUR BRAND (10.7 s) · corporate
**Script:**
- [Tonal crest on a polo] `BUILT FOR YOUR BRAND.`
- [Punch → embroidered logo on workwear] `WORKWEAR` → slides: `CAPS` · `TOTES` · `MERCH` (café tote)
- [Impact → merch line-up] `ONE IDENTITY.` `For teams, companies and clubs.`
- **End card:** `YOUR TEAM. YOUR PATCH.` · **GET YOUR CUSTOM QUOTE →**

**Footage:** m25 (polo, cap, tote), m14 (NIKSOL workwear, approved by the client), m19, m22 (line-up).
**Caption:** *Uniforms, caps, totes, merch: one identity across everything your team wears. Get your custom quote at markhorpatches.com* #corporatebranding #workwear #uniforms #custompatches #teammerch

## 09 — THE COLLECTION DROP (10.2 s) · luxury studio
**Script:**
- [White studio, embroidered mountain] `MEET THE COLLECTION.` `Embroidered`
- Carousel slides: `PVC` · `Chenille` · `Leather`
- [Impact → flat-lay of five patches] `PICK YOURS.`
- **End card:** `THE COLLECTION.` · **EXPLORE CUSTOM PATCHES →**

**Footage:** m20 (no compass), m28 flat-lay.
**Caption:** *Meet the collection: embroidered, PVC, chenille and leather, all made to your design. Explore custom patches at markhorpatches.com* #patchcollection #custompatches #studio #productdesign #brandmerch

## 10 — SMALL DETAIL, BIG IMPACT (9.1 s) · café merch story
**Script:**
- [Café table, plain canvas bag] `SMALL DETAIL.`
- [Impact → the coffee-cup patch close-up] `BIG IMPACT.` `Custom patches for cafés, shops and merch.`
- [Dissolve → finished bag on the table] `MADE TO BE SEEN.`
- **End card:** `MAKE IT YOURS.` · **CREATE YOUR CUSTOM PATCH →**

**Footage:** m19.
**Caption:** *A small detail customers remember: custom patches for cafés, shops and merch drops. Create your custom patch at markhorpatches.com* #cafemerch #smallbusiness #custompatches #merchdesign #shoplocal

---
**Claims:** no shipping, pricing, turnaround, discount, free-service or certification claims. AI-generated footage is not presented as Markhor's own facility, and no copy says "our factory".
