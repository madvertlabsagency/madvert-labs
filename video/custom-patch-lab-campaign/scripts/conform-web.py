"""Conform the real website screen recordings used in a Markhor flagship edit.

    python3 -I scripts/conform-web.py markhor/flag50

Reads edl['web'] (id, source, srcIn, srcOut, frames) and writes
public/segments/<ad>/<id>.mp4: 30 fps, exact frame count, retimed to fit, with
the phone status bar (top 80 px) and gesture bar (bottom 40 px) cropped away;
the Chrome address bar (markhorpatches.com) stays. 720 px wide (shown inside
the phone composite at ~520 px)."""
import json, subprocess, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
ad = sys.argv[1]
edl = json.loads((root / f'src/{ad}/edl.json').read_text())
out = root / f'public/segments/{ad}'
out.mkdir(parents=True, exist_ok=True)
for w in edl.get('web', []):
    src = root / f'assets/source/{ad}/footage' / w['source']
    span = w['srcOut'] - w['srcIn']
    speed = span / (w['frames'] / 30)
    vf = (f"trim=start={w['srcIn']:.3f}:end={w['srcOut'] + 0.3:.3f},setpts=(PTS-STARTPTS)/{speed:.5f},fps=30,"
          f"crop=1080:2196:0:80,scale=720:1464:flags=lanczos,tpad=stop_mode=clone:stop_duration=0.5,format=yuv420p")
    dst = out / f"{w['id']}.mp4"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(src), '-an', '-vf', vf, '-frames:v', str(w['frames']), '-r', '30',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-g', '15', str(dst)], check=True)
    n = subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames',
                        '-of', 'csv=p=0', str(dst)], capture_output=True, text=True).stdout.strip()
    print(f"{w['id']}: {w['source']} {w['srcIn']}-{w['srcOut']}s x{speed:.2f} -> {n}/{w['frames']}")
    assert int(n) == w['frames']
