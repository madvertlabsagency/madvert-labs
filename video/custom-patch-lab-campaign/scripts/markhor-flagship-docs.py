"""Writes the shot-by-shot timelines + VO cue sheet for the Markhor flagship cuts
(docs/MARKHOR-FLAGSHIP-TIMELINES.md, docs/MARKHOR-FLAGSHIP-VO.txt) from the edl specs."""
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
DESC = {
    'f01': 'hands with a patch collection (eagle, lightning PVC, chenille B, leather)', 'f02': 'woven monogram label / full-colour printed patch',
    'f04': 'chenille R on a blue varsity jacket', 'f05': 'PVC lightning shield', 'f06': 'embroidery machine stitching an eagle',
    'f07': 'ALEX name patch on a backpack', 'f08': 'corporate shirt + logo patch', 'f09': 'school blazer with crest',
    'f10': 'baseball jersey sleeve patch', 'f11': 'patch pressed onto a denim jacket', 'f12': 'MIA chenille patch gift box',
    'f13': 'flag patch flat-lay', 'f14': 'ACE cap', 'f15': 'tote with a sun & flowers patch',
    'm21': 'chenille macro (earlier batch)', 'm26': 'embossed leather macro (earlier batch)',
    'w01': 'website: quote wizard (size → quantity → shape → attachment → border)', 'w02': 'website: Start your patch / Send your artwork',
    'w03': 'website: artwork uploading', 'w04': 'website: home page, GET A QUOTE',
}
tc = lambda f: f'{int(f // 30 // 60)}:{f // 30 % 60:02d}.{f % 30:02d}'
names = {'flag50': 'MARKHOR_FLAGSHIP_50S', 'flag30': 'MARKHOR_COMMERCIAL_30S', 'meta15': 'MARKHOR_META_AD_15S', 'hero': 'MARKHOR_WEBSITE_HERO'}
md = ['# Markhor Patches — flagship cuts: shot-by-shot timelines', '',
      'Generated from `src/markhor/<cut>/edl.json` by `scripts/markhor-flagship-docs.py`. Timecode = s.frames at 30 fps.', '']
vo_txt = ['MARKHOR PATCHES — VOICEOVER CUE SHEET (American English, confident, warm, sophisticated; no shouting)', '']
for cut, nm in names.items():
    d = json.loads((root / f'src/markhor/{cut}/edl.json').read_text())
    md += [f'## {nm}.mp4 ({d["durationInFrames"] / 30:.0f} s)', '', '| In | Out | Shot | Source (s) | Transition in | Content |', '|---|---|---|---|---|---|']
    items = sorted(d['shots'] + d['web'], key=lambda s: s['from'])
    ends = {s['from'] + s['frames'] for s in d['web']}
    for s in items:
        if s['kind'] == 'web':
            s['trans'] = 'screen cut (in phone)' if s['from'] in ends else 'cyan wipe to website'
        src = s['source'][:-4]
        md.append(f"| {tc(s['from'])} | {tc(s['from'] + s['frames'])} | {s['id']} | {src} {s['srcIn']:.2f}–{s['srcOut']:.2f} | "
                  f"{s.get('trans', 'website wipe' if s['kind'] == 'web' else '')} | {DESC.get(src, '')}{' (phone composite)' if s['kind'] == 'web' else ''} |")
    if 'card' in d:
        md.append(f"| {tc(d['card']['from'])} | {tc(d['durationInFrames'])} | end card | original logo | impact | {' '.join(w[0] for w in d['card']['headline'])} · {d['card']['cta']} → · www.markhorpatches.com |")
    if d['text']:
        md += ['', '**On-screen text**', '']
        for t in d['text']:
            words = ' / '.join(' '.join(w['t'] for w in l) for l in t['lines']) if t['type'] == 'headline' else t['text']
            md.append(f"- {tc(t['from'])}–{tc(t['to'])} · {t['type']} · {words}")
    if d['vo']:
        md += ['', '**Voiceover**', '']
        vo_txt += [f'== {nm} ==']
        for v in d['vo']:
            md.append(f"- {v['at']:.1f}–{v['to']:.1f} s · “{v['line']}”")
            vo_txt.append(f"[{v['at']:05.1f} – {v['to']:05.1f} s]  {v['line']}")
        vo_txt.append('')
    md.append('')
(root / 'docs/MARKHOR-FLAGSHIP-TIMELINES.md').write_text('\n'.join(md) + '\n')
vo_txt += ['Delivery: export each cut as one WAV/MP3 that starts at 0:00 with the lines on these cues',
           '(or send the lines separately and I will place them). Save as public/audio/markhor-<flag50|flag30|meta15>-vo.wav',
           'and re-run scripts/build-audio.sh markhor-<cut> -14 -1.5 — the mix ducks the drums under the voice automatically.']
(root / 'docs/MARKHOR-FLAGSHIP-VO.txt').write_text('\n'.join(vo_txt) + '\n')
print('ok')
