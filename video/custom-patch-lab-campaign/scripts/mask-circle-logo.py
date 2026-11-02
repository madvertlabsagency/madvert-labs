"""Cut a circular badge logo out of its square (dark-cornered) image with an
anti-aliased circular alpha; the artwork itself is not altered.
    python3 -I scripts/mask-circle-logo.py <in> <out.png>"""
import sys
from PIL import Image, ImageDraw
src, out = sys.argv[1:3]
im = Image.open(src).convert('RGB')
w, h = im.size
d = min(w, h)
im = im.crop(((w - d) // 2, (h - d) // 2, (w - d) // 2 + d, (h - d) // 2 + d))
ss = 4
m = Image.new('L', (d * ss, d * ss), 0)
ImageDraw.Draw(m).ellipse((ss * 3, ss * 3, d * ss - ss * 3, d * ss - ss * 3), fill=255)
im.putalpha(m.resize((d, d), Image.LANCZOS))
im.save(out)
print(out, im.size)
