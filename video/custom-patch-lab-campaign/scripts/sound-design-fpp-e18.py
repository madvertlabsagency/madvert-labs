"""Future PVC Patch e18 (18 s, no voiceover): music, DOOF drops, vocal chops, SFX, foley. See fpp_ads_audio.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fpp_ads_audio as fa  # noqa: E402

fa.build("e18", sys.argv[1])
