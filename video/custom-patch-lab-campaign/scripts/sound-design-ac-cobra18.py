"""American Custom Cobra Drop (18 s, no voiceover): daf + claps + unpitched vocal sounds,
DOOF hits, SFX and foley — NO MUSIC (no melody, chords, bass notes or synths). See fpp_ads_audio.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fpp_ads_audio as fa  # noqa: E402

fa.build("ac-cobra18", sys.argv[1], os.path.join(fa.ROOT, 'src/americancustom/cobra18.json'))
