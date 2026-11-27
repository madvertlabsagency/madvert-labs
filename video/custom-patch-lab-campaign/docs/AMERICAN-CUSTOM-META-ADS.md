# American Custom Patch — script Meta ads A (46.5 s) and B (24.6 s)

Outputs: `out/American-Custom-Patch-Meta-Ad-A.mp4`, `out/American-Custom-Patch-Meta-Ad-B.mp4`
(1080×1920, 30 fps, H.264, stereo AAC, −14 LUFS) + `_light.mp4` copies for WhatsApp/chat.
Compositions `AmericanCustomMetaA` / `AmericanCustomMetaB` (folder "American-Custom"), engine
`src/americancustom/CobraAd.tsx` (labels, patch-type tags, slams, word captions, logo reveal,
CLICK BELOW block, quote funnel, end card with GET YOUR FREE QUOTE).

Same formula as the Future PVC Patch Meta ads A/B, rewritten for American Custom Patch:
leather → sublimation (the site lists sublimation, not leather), a backing line (sew-on,
iron-on, Velcro — options on the quote form), "instant quote within minutes" → "free quote"
(the site's button is "Request my free quote"; no instant-quote claim).

## Build

```bash
python3 -I scripts/ac-meta-specs.py .
for v in a b; do
  python3 -I scripts/conform-shots.py americancustom/meta-$v
  python3 -I scripts/conform-desk.py americancustom/meta-$v src/americancustom/meta-$v.json <quote-funnel recording.mp4>
  bash scripts/build-audio.sh ac-meta-$v -14 -1.5
done
npx remotion render AmericanCustomMetaA out/American-Custom-Patch-Meta-Ad-A.mp4 --codec=h264 --crf=16 --color-space=bt709 --audio-codec=aac --audio-bitrate=320k
```

Voiceovers: ElevenLabs "Jack John" takes `assets/source/americancustom/audio/vo-meta-{a,b}.mp3`;
word times `src/americancustom/vo-meta-{a,b}.json` (`scripts/vo-timing.py … -50 0.25` — this
voice is softer, so the phrase gate is lower; the patch-type lists use measured onsets).
The quote-funnel recording is not in the repo (personal details and errors later in it).

## Artworks

Eagle (n2, n6, n8, n9, ed), lion (n1, n3, n5, lc), cobra (c1, c2, c4), embroidered bolt (v1),
chenille M (v2), woven wolf (v4), printed astronaut for sublimation (v5), ALEX name patch (f07),
ACE cap (f14), baseball team patch (f10, 0–1.1 s), polo shield (m25, 0–0.85 s), sunflower tote
(f15), heat press (iron-on), needle macro (sew-on), plus earlier generic shots (f02, f05, f06,
f11, m20, m21, m28 cropped, ea, v3). Footage: `assets/source/americancustom/metafootage/` (links).

Excluded for branding: m25 after 6 s (Lacoste crocodile and Carhartt label on the merch table),
f10 after 1.5 s (Nike swoosh on the jersey), f01 (leather "MK"-style monogram), f08 (patch looks
like another client's logo), f09 (gibberish crest text).

## Sound — NO MUSIC

Voiceover over daf, claps, unpitched vocal sounds, DOOF hits, whooshes, UI clicks and foley; the
bed ducks under the voice.
