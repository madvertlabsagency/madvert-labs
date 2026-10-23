# Post-lead WhatsApp explainer — Custom Patches (9:16)

Built on the existing patch projects (`motion-vertical` engine, `motion-patches` light theme,
same UI kit, RFQ card, patch artwork, footage, ribbon, transitions and SFX palette).
The supplied ElevenLabs voiceover (99.7 s, Roman Urdu) is the master timeline.

- Timing: `data/words.json` = Whisper word timestamps mapped onto the script's Roman Urdu
  words (286 words, verified 1:1 against the script). All cues use `ws()/we()/cut()`.
- Format: 1080×1920, 30 fps, 101.6 s. Key content sits inside the centre square
  (y 420–1500) so a 1:1 crop works; top band = logo + chapter, bottom band = captions.
- Sample client brand: "Your Brand" (orange shield) everywhere the buyer looks;
  Madvert Labs only appears as the backend builder/operator. Buyer "Apex Apparel" and all
  form values are labelled sample/example data.

| # | Scene | VO cue | Key type |
|---|---|---|---|
| 01 | Problem: inquiries pile in, grey out; sales time wasted | 0 → "isi lye" | RANDOM LEADS · INQUIRIES ≠ QUALIFIED BUYERS · WASTED SALES TIME |
| 02 | System chain AD → LANDING → QUALIFICATION → RFQ → SALES | "isi lye" | COMPLETE CUSTOMER ACQUISITION SYSTEM |
| 03 | Brand page → branded ad → branded landing page (phone) | "buyer" | YOUR BRAND / YOUR PAGE / YOUR LANDING PAGE |
| 04 | Branded RFQ form fills per spoken field | "wahan" | FOR AN ACTUAL QUOTE |
| 05 | "I need patches" vs Qualified RFQ | "matlab" | NOT JUST A LEAD → A PROPER RFQ |
| 06 | Ad account funded by Madvert Labs (no amounts) | "secondly" | WE INVEST THE AD SPEND · YOU DON'T FUND THE CAMPAIGNS |
| 07 | Clicks/Impressions/Random leads fall away | "aapka" | PAY PER QUALIFIED RFQ |
| 08 | Qualification gate → one RFQ → sales follow-up | "yani" | DEFINED QUALIFICATION CRITERIA |
| 09 | Generic template → branded | "aur ye system" | NOT GENERIC → BUILT AROUND YOUR BRAND |
| 10 | Your brand page → ad → landing → RFQ → sales team | "campaign" | YOUR BRAND. END TO END. |
| 11 | Backend montage (8 tiles) → grid | "madvert" #2 | CREATIVES … FOLLOW-UP → ONE CONNECTED SYSTEM |
| 12 | CTA: logo, booking card, button | "agar" | SEE HOW THIS WORKS FOR YOUR PATCH BUSINESS · BOOK A STRATEGY CALL |

## Build
```sh
scripts/extract-frames.sh
bun scripts/render.ts video --samples 2 --crf 16 --out out/master-silent.mp4            # clean
bun scripts/render.ts video --samples 2 --crf 16 --subs 1 --out out/master-captioned-silent.mp4
uv run --no-project --with numpy python scripts/sound.py                                # out/mix.wav
scripts/export.sh                                                                        # masters + WhatsApp files
```
