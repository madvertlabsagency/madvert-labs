"""Future PVC Patch Meta ad b23 soundtrack (music + SFX + foley + VO). See fpp_ads_audio.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fpp_ads_audio as fa  # noqa: E402

fa.build("b23", sys.argv[1])
