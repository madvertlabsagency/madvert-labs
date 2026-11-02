#!/usr/bin/env bash
# Builds public/ from assets/source/. Usage: ./scripts/prepare-assets.sh [ad01|ad02|ad03|ad04 ...]
# (no argument = shared brand assets + every ad). Flow's generated audio on the
# clips is never used (not cleared for commercial use).
set -euo pipefail
cd "$(dirname "$0")/.."
ads=("$@"); [ ${#ads[@]} -eq 0 ] && ads=(ad01 ad02 ad03 ad04 reel01 reel02 reel03 billys01)
mkdir -p public/brand
python3 -I scripts/mask-logo.py assets/source/shared/brand/cpl-logo-circular.jpg public/brand/cpl-logo.png
python3 -I scripts/make-grain.py public/brand/grain.png
cp assets/source/ad04/reference/vybe-master-hand-transfer.jpg public/brand/ad04-vybe-master.jpg
cp assets/source/reel02/reference/tiger-patch-still.webp public/brand/reel02-tiger-patch.webp
for ad in "${ads[@]}"; do
  [ "$ad" = billys01 ] || python3 -I scripts/conform-shots.py "$ad"  # billys01 reuses the ad01 segments
  case $ad in
    ad01) python3 -I scripts/cutout-patch.py assets/source/ad01/lion-patch-still.webp public/brand/lion-patch.png ;;
  esac
  case $ad in
    reel01|reel02|reel03) ./scripts/build-audio.sh "$ad" -15 -1.5 ;;  # softer reel mix (client note on Reel 01)
    *) ./scripts/build-audio.sh "$ad" ;;
  esac
done
# Billys Custom Patches: crop the supplied logo to its artwork (kept on its white background, unaltered)
python3 -I - <<'PY'
from PIL import Image
import numpy as np
im = Image.open('assets/source/billys/brand/bcp-logo.png').convert('RGB')
ys, xs = np.nonzero(np.asarray(im).astype(int).min(2) < 235)
im.crop((xs.min() - 14, ys.min() - 14, xs.max() + 15, ys.max() + 15)).save('public/brand/billys-logo.png')
PY
python3 -I scripts/mask-circle-logo.py assets/source/epcf/brand/epcf-logo.jpg public/brand/epcf-logo.png
