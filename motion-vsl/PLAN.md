# White-label partnership VSL (9:16)

Built on the Madvert motion-as-code engine (dark navy + glossy light UI cards, same kinetic
type, ribbons, transitions and SFX palette as the previous Madvert films). The supplied
ElevenLabs voiceover (103.3 s, English) is the master timeline; `data/words.json` holds the
Whisper word timings (314 words, checked against the audio).

Proof = the supplied dashboard graphics in `assets/images/` (never redrawn; the renderer only
crops, zooms, dims around and outlines the metric). The textile RFQ screenshot is cropped above
the old campaign rows and its third-party watermark is softened.
Founder photo: drop it at `assets/images/founder.jpg` (falls back to a typographic card).

| Scene | VO cue | Key type |
|---|---|---|
| Hook | 0 | YOU GOT THE CLIENT. → WHO'S GOING TO DELIVER? → THIS IS FOR YOU. |
| Offer | "I'm offering" | WHITE-LABEL · OUR SERVICES. YOURS. · delivered by Madvert team |
| Founder | "I'll keep" | hyperframes of real work → Usama · 5+ YEARS · DIGITAL MARKETING / LEAD GENERATION / GROWTH SYSTEMS |
| Markets | "And Alhamdulillah" | U.S. · DUBAI · PAKISTAN → case-study flashes · MULTIPLE INDUSTRIES. ONE SYSTEMS MINDSET. |
| Scale | "We've managed" | UP TO AROUND $30K / MONTH MANAGED → END-TO-END. ALL IN-HOUSE. |
| Capabilities | "ads" | 9 services light in a snake → ALL OF IT. ONE OPERATING SYSTEM. |
| Lead gen | "Lead generation" #2 | NOT "RUN & HOPE." → THE WHOLE SYSTEM. → STRONG FOUNDATIONS. |
| Proof | "And if you want" | PROOF? · screen share · 5 real dashboards · REAL WORK. REAL SYSTEMS. |
| Private + teach | "And honestly" | SOME CLIENT WORK REMAINS PRIVATE. · I ALSO TEACH THIS. |
| Model | "If you want to sell" | CLIENT ↔ YOUR AGENCY, Madvert behind the scenes · WHITE LABEL. WE CAN DO THAT. |
| Focus | "You focus" | YOU CLOSE. WE DELIVER. |
| CTA | "If that" | READY TO SCALE WITHOUT BUILDING THE WHOLE TEAM? · BOOK A WHITE-LABEL STRATEGY CALL |

```sh
scripts/extract-frames.sh
bun scripts/render.ts video --samples 2 --crf 16 --out out/master-silent.mp4
bun scripts/render.ts video --samples 2 --crf 16 --subs 1 --out out/master-captioned-silent.mp4
uv run --no-project --with numpy python scripts/sound.py
scripts/export.sh
```
