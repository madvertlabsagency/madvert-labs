"""Conform the desktop quote-funnel recording segments for the FPP Meta ads.

    python3 -I scripts/conform-desk.py fpp/a40
    python3 -I scripts/conform-desk.py americancustom/cobra18 src/americancustom/cobra18.json <recording.mp4>

Reads src/fpp/ads/<cut>.json 'desk' and writes public/segments/<ad>/<id>.mp4:
crops the funnel card column (x 250–1290 of the 1918×794 recording, full
height), retimes to the segment length at 30 fps, exact frame count."""
import json, subprocess, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
ad = sys.argv[1]
# optional: spec json and recording path (American Custom keeps its recording out of the repo: it shows personal details later on)
spec_path = Path(sys.argv[2]) if len(sys.argv) > 2 else root / f'src/fpp/ads/{ad.split("/")[-1]}.json'
spec = json.loads(spec_path.read_text())
out = root / f'public/segments/{ad}'
out.mkdir(parents=True, exist_ok=True)
src = Path(sys.argv[3]) if len(sys.argv) > 3 else root / f'assets/source/{ad}/footage/web.mp4'
crop = spec.get('deskCrop', '1040:794:250:0')
for w in spec['desk']:
    speed = (w['srcOut'] - w['srcIn']) / (w['frames'] / 30)
    vf = (f"trim=start={w['srcIn']:.3f}:end={w['srcOut'] + 0.3:.3f},setpts=(PTS-STARTPTS)/{speed:.5f},fps=30,"
          f"crop={crop},tpad=stop_mode=clone:stop_duration=0.5,format=yuv420p")
    dst = out / f"{w['id']}.mp4"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(src), '-an', '-vf', vf, '-frames:v', str(w['frames']), '-r', '30',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-g', '15', str(dst)], check=True)
    n = subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames',
                        '-of', 'csv=p=0', str(dst)], capture_output=True, text=True).stdout.strip()
    print(f"{w['id']}: {w['srcIn']}-{w['srcOut']}s x{speed:.2f} -> {n}/{w['frames']}")
    assert int(n) == w['frames']
