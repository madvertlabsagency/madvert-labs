"""American Custom Cobra Drop 40 s with the ElevenLabs voiceover: VO (re-spaced into its sections) over
daf + claps + unpitched vocal sounds, DOOF hits, SFX, UI clicks and foley — NO MUSIC. See fpp_ads_audio.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fpp_ads_audio as fa  # noqa: E402

fa.build("ac-cobra40vo", sys.argv[1], os.path.join(fa.ROOT, 'src/americancustom/cobra40vo.json'))
