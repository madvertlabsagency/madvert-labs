# Madvert Labs Patches Partnership: Product-Demo Film Plan

1920×1080 · 60 fps · **premium light theme (same as the first Madvert film)** · VO 91.79 s (+0.3 s lead-in) · film 95.5 s

> Direction change (per client): the dark cinematic look was replaced with the light theme used in the first Madvert ad: cool whites, soft blue surfaces, navy type, electric-blue/cyan accents, light logo. Dark reference boards are used for layout only.

## 1. Inspection results

| Asset | Verdict | Use |
|---|---|---|
| ElevenLabs VO (91.79 s) | Matches the approved script word for word (forced alignment: 232 words, all pauses agree within ±0.05 s) | Timing source of truth: `data/words.json` |
| Embroidery-machine clip (10 s, 1280×720) | **Strong.** Real macro needles stitching a gold/red crest, shallow depth of field | Scene 01 hero footage (masked, graded cool, push-in). Returns as a background plate in 10, 16 and 17 |
| "Dashboard" Flow clip (8 s) | **Weak as UI.** AI-garbled text ("Approode Fonding", "Produciton Quace") would hurt credibility. The bottom third (machines and finished patches) is usable | Use only the factory/patch band (cropped, blurred, darkened) as an ambient plate under the CRM scenes. All readable UI is built in code |
| Logo guidelines / logo-light / dark logo / app icon / glowing A mark | Official | Logo PNGs used as-is (dark-bg version on dark scenes). Glowing A mark for the interrupt (scene 04). Clear-space rule respected |
| Iconography-system sheet | Reference | Icon style (rounded glass tiles, cyan accent). Icons redrawn as clean line icons in code |
| Reference boards (PatchOps CRM, RFQ card, upload states, 6-step quote form, weak-lead cards, email/SMS notifications, lock screen, sales pipeline, Top-of-Funnel vs Potential Orders, Pay-per-RFQ poster, Partnership hub, Everything-you-need, A-to-Z system) | Strong **layout references**, but static and partly light-theme. They contain women in the "sales team" tile and invented metrics (CPL $3.20, 32.6 %, $12.4K) | Rebuilt in code as live dark-theme UI with the same information architecture. **Not used:** people photos, invented performance metrics, and the "Dedicated Sales Support" promise (not in the script) |
| Motion-as-Code PDF | Same file as before (identical checksum) | Workflow followed |
| Asset Production Sheet PDF, Meta-ads references | **Not received** | Built from the brief's own data spec |

**Gaps to create in code:** embroidered patch artworks (Apex mountain badge plus several example badges, drawn as vector "stitched" patches), the Meta-style ads manager, the social feed and ad unit, the branded quote funnel ("YOUR BRAND"), the upload states, the RFQ object, the CRM board, email/WhatsApp/push notifications, the phone lock screen, the system diagram, comparison panels, the CTA end frame, film grain and the cyan pulse.

## 2. Timing map (VO time; the film adds +0.3 s)

| # | Scene | VO window (s) | Anchor phrases |
|---|---|---|---|
| 01 | Hook: capacity vs acquisition | 0.00–9.90 | "capacity" 3.01 · "customer acquisition" 5.32 · "that's the real problem" 8.03 |
| 02 | Outreach burden | 9.94–16.40 | "outreach" 11.02 · "staff" 12.37 · "follow-up" 13.26 · "salaries" 14.29 · "management" 15.56 |
| 03 | Ads: CPL rising and window shoppers | 16.55–21.30 | "running ads" 17.08 · "expensive leads" 18.44 · "window shoppers" 20.23 |
| 04 | Madvert interrupt | 21.59–23.60 | "Madvert Labs" 21.59 · "fixes that" 22.56 |
| 05 | High-engaging ads | 23.75–27.60 | "high-engaging ads" 24.32 · "attract the right buyers" 26.08 |
| 06 | Branded funnel entry | 27.90–30.60 | "land on" 28.61 · "branded quotation funnel" 29.14 |
| 07 | Form fill and artwork upload | 30.72–40.20 | "what YOU need" 32.09 · type 33.29 · qty 34.14 · size 34.85 · backing 35.56 · deadline 36.39 · contact 37.11 · "upload" 38.88 · "artwork" 39.52 |
| 08 | CRM and automations: RFQ routed | 40.46–46.80 | "CRM" 41.39 · "automations" 42.14 · "Request for Quotation" 43.72 · "directly to YOU" 45.50 |
| 09 | Real buying intent | 47.08–51.90 | "only on people" 48.64 · "real buying intent" 50.53 |
| 10 | Context before the conversation | 52.19–58.60 | details 53.05 · deadline 53.76 · contact 54.53 · artwork 55.99 · "before the conversation" 56.49 |
| 11 | Product-name reveal | 59.09–61.60 | "Madvert Labs" 59.65 · "Patches Partnership" 60.54 |
| 12 | We handle the acquisition system | 62.00–63.80 | "handle" 62.29 · "acquisition system" 62.74 |
| 13 | No separate tools to worry about | 64.17–71.10 | "best part" 64.34 · ad spend 66.47 · creatives 67.22 · funnels 68.10 · CRM 68.82 · automations 69.84 |
| 14 | One simple model | 71.45–74.00 | "one simple model" 72.66 |
| 15 | Pay per qualified RFQ | 74.32–76.80 | "pay" 74.80 · "qualified RFQ" 75.33 |
| 16 | Activity vs real orders | 77.08–81.70 | "marketing activity" 78.24 · "real potential orders" 80.17 |
| 17 | Scale and CTA end frame | 82.15–91.70, hold to 95.5 | "serious about scaling" 82.45 · "qualified RFQs" 87.28 · "book a discovery call" 89.07 |

Breathing room is given to 04, 11, 14, 15 and 17, each with a held hero type moment and quiet ambience.

## 3. Storyboard and motion plan (primary / secondary / ambient)

**01 Hook.** Black frame, then embroidery-machine footage pushes in, masked into a rounded cinematic panel with a cool grade.
- On "capacity", a *Production capacity* gauge sits high and the machine count reads idle/ready.
- On "customer acquisition", a pipeline meter beside it sits nearly empty with gaps, and CUSTOMER ACQUISITION rises in.
- On "real problem", the footage dims and THAT'S THE REAL PROBLEM slams in.
- Ambient: grain and slow parallax.

**02 Outreach.** An outreach console builds: cold-call list rows, rep seats (initials, men), follow-up queue counts and a task backlog.
- MORE STAFF, then MORE FOLLOW-UP, MORE SALARIES and MORE MANAGEMENT stack on their words. Each adds UI load (a seat, a queue, a payroll line, an org layer) until the frame feels overloaded.
- On the last word everything is pushed down and cleared.

**03 Ads.** A Meta-style ads manager (own design, not a clone) with columns Campaign / Amount spent / Leads / CPL / CTR / CPM.
- Spend ticks up and CPL climbs $6.80 → $11.40 → $18.70 → $27.30, with the CPL column highlighted red and an up-arrow sparkline.
- EXPENSIVE LEADS lands, then weak lead cards drop in ("Need price", "Just checking", No artwork / No quantity / No deadline, "Looking around"), then WINDOW SHOPPERS.
- On-screen label: "Example data".

**04 Interrupt.** The UI freezes and desaturates. A cyan light sweep cuts across, the glowing A mark ignites at centre with an orb pulse, and MADVERT LABS FIXES THAT lands with the official logo. A held beat.

**05 Ads that attract.** The patch ad is built live: macro stitched texture, then the Apex patch slides in, the headline types on, and the CTA "Get a quote" appears.
- The ad drops into a social feed that is scrolling, then the scroll stops on it (finger tap).
- ATTRACT THE RIGHT BUYERS rises in.

**06 Funnel entry.** The CTA button is pressed and expands to fill the frame, morphing into the branded quote funnel (client brand "YOUR BRAND", not Madvert).
- The cyan RFQ pulse exits the button and travels into the funnel.
- YOUR BRAND / YOUR FUNNEL.

**07 Form fill (main demo).** A six-step stepper sits on top, form in the centre, and a live "Your quotation" summary on the right. Each field fills on its spoken word:
- Embroidered card selected, 500 qty chip, 3.5″ size slider, Iron-On toggle, Nov 15 calendar date, contact fields typed. Each completed value flies into the summary panel.
- Then the upload: drop-zone, *apex-logo.ai* 0 → 35 → 70 → 100 %, success check, and the thumbnail docks into the summary.
- Type: WHAT YOU NEED, then UPLOAD THEIR ARTWORK.

**08 RFQ routed.** The form panel collapses: values detach as data chips and assemble into the **RFQ card**
- RFQ-1028 · Apex Apparel (example) · Embroidered · Qty 500 · 3.5″ · Iron-On · Deadline Nov 15 · Artwork attached
- REQUEST FOR QUOTATION lands. The card slides along the pulse into the CRM column "New RFQ" (snap).
- Automation nodes fire in sequence: CRM record → email alert → WhatsApp → mobile push. Notification cards arrive and the phone lock screen shows "New Qualified RFQ".
- DIRECTLY TO YOU.

**09 Intent.** Weak lead cards on the left fade and fall away; the complete RFQ stays in focus.
- Checklist: Specifications complete ✓ Contact verified ✓ Deadline provided ✓ Artwork attached ✓
- REAL BUYING INTENT.

**10 Quote-ready workspace.** The RFQ opens into a sales workspace: specs panel, deadline countdown chip, buyer contact card, artwork preview (zooms on the stitched patch). Each panel highlights on its word.
- BEFORE THE CONVERSATION EVEN STARTS. Factory plate faint behind.

**11 Reveal.** The camera pulls back. The workspace becomes one node of the full chain (Ads → Funnel → RFQ → CRM → Alerts → You), with the pulse running end to end.
- MADVERT LABS / PATCHES PARTNERSHIP hero type, held.

**12 System.** A living hub: the Madvert node at centre, with satellites Ads, Creatives, Funnel, RFQ, CRM, Automations, Notifications and Delivery.
- Connectors draw on and pulses circulate.
- WE HANDLE THE ACQUISITION SYSTEM.

**13 Separate burdens.** Five heavy, scattered cards (AD SPEND, CREATIVES, FUNNEL, CRM, AUTOMATIONS), each with a small "burden" status (bills, tools, logins), light up on their spoken words.
- YOU DON'T NEED TO WORRY.

**14 One model.** The cards are pulled together and collapse into one glowing card.
- ONE SIMPLE MODEL, held.

**15 Pay per RFQ.** Quiet. The RFQ card sits behind; giant PAY PER / QUALIFIED RFQ builds word by word with weight and a cyan gradient. Strongest type moment, held, with no price.

**16 Activity vs orders.** Split frame.
- Left: impressions, clicks, spend and a chart labelled "Marketing activity".
- Right: a stack of completed RFQ cards labelled "Real potential orders".
- On "real potential orders" the left side fades out and the right side expands. REAL POTENTIAL ORDERS.

**17 Scale and CTA.** RFQs flow into the pipeline (New RFQ column filling) and the factory plate comes alive behind.
- On "book a discovery call", everything clears to the end frame: official logo, BOOK A DISCOVERY CALL button (cursor press), and "Madvert Labs Patches Partnership". Orb pulse; hold about 3.5 s.

**Recurring motif:** one cyan RFQ pulse (the Growth Ribbon plus a bright data dot) travels: ad, CTA, funnel, fields, upload, RFQ card, CRM, automation, notification, phone, client.

**Typography levels:**
- L1 hero: Sora 800, 120–170 px.
- L2 support: Sora 700, 56–80 px.
- L3: subtitles in Inter 600, 32 px, lower third, white pill with navy text. They shrink to 27 px with a lower-opacity pill while hero type is on screen.

## 4. Asset usage plan

| Scene | Real assets | Built in code |
|---|---|---|
| 01 | Embroidery clip (hero) | Capacity/acquisition gauges, type |
| 02 | — | Outreach console |
| 03 | — | Ads manager, lead cards |
| 04 | Glowing A mark, logo-dark | Sweep, pulse |
| 05 | Embroidery clip (texture inside the ad) | Ad unit, feed, Apex patch (vector) |
| 06–08 | — | Funnel, form, upload, RFQ card, CRM, notifications, phone |
| 09–10 | Embroidery clip (artwork preview macro) | Workspace |
| 11–14 | Logo-dark | System diagram, cards |
| 15 | — | RFQ card, type |
| 16 | — | Panels |
| 17 | Embroidery clip (production panel), logo-light | Pipeline, CTA |

All demo company names (Apex Apparel, etc.) are labelled as example data.

## 5. Sound design plan (synthesized; voice dominant, −14 LUFS)

**Music arc:**
- 01–03: low tension (drone plus a muted pulse; the industrial machine bed comes from noise, filtered rhythmically).
- 04: stop, then impact plus sonic logo.
- 05–08: system activation (kick, arp, rising energy).
- 09–12: momentum.
- 13–14: tension release into the model reveal.
- 15: near silence, a sub hit, then a clean pad.
- 16–17: confident build, resolving on the sonic logo.

**SFX hit points:**
- Machine ambience on 01; impact on "real problem".
- 02: a stacking tick on each MORE, building into a low thud on "management".
- 03: CPL rising ticks, a riser into lead pops, a negative blip on "window shoppers".
- 04: hard cut to silence, sub impact, sonic logo.
- 05: whoosh, scroll stop, tap.
- 06: CTA click and expand whoosh.
- 07: per-field selection clicks; upload progress ticks and upload chime.
- 08: data assemble, CRM snap, email/WhatsApp/push pings.
- 09: fall-away whoosh, check ticks.
- 11: reveal swell. 12: pulse hum. 13: card thuds. 14: collapse "whoomp".
- 15: sub hit and shimmer.
- 16: fade-away swish and stack clicks.
- 17: pipeline pops, CTA click, sonic logo resolve.

## 6. Deliverables plan

| File | Purpose |
|---|---|
| `out/stills` + contact sheets | Review stills |
| `out/draft.mp4` | Draft review (no motion blur) |
| `out/patches-partnership-master.mp4` | Final master with subtitles and full mix |
| `out/patches-partnership-clean.mp4` | No subtitles, full mix |
| `out/mix.wav`, `out/music_sfx.wav` | Sound-rich mix and music + SFX without voice |
