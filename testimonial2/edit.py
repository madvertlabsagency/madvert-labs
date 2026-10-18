# Builds edit.mov from raw.mp4 + edl.json: trim/concat, 4:5 crop, light grade, dialogue cleanup.
import json, subprocess
edl = json.load(open("edl.json"))
v, a, n = [], [], len(edl)
for i, (s, e) in enumerate(edl):
    d = e - s
    v.append(f"[0:v]trim={s}:{e},setpts=PTS-STARTPTS,fps=30,crop=640:800:0:16,hqdn3d=1.2:1.2:3:3,"
             f"eq=contrast=1.06:brightness=0.005:saturation=1.0:gamma=1.0,"
             f"colorbalance=rs=-0.03:gs=-0.005:bs=0.05:rm=-0.02:bm=0.03:rh=-0.01:bh=0.02,"
             f"scale=1080:1350:flags=lanczos,unsharp=5:5:0.45[v{i}]")
    a.append(f"[0:a]atrim={s}:{e},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={d-0.03:.3f}:d=0.03[a{i}]")
cat = "".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[vc][ac]"
af = "[ac]highpass=f=80,lowpass=f=12000,afftdn=nf=-28,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,aresample=48000[ao]"
fc = ";".join(v + a + [cat, af])
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", "raw.mp4", "-filter_complex", fc, "-map", "[vc]", "-map", "[ao]",
                "-c:v", "libx264", "-crf", "14", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "pcm_s16le", "edit.mov"], check=True)
print("edit len", sum(e - s for s, e in edl))
