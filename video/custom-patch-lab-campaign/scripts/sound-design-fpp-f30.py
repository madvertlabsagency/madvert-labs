"""Future PVC Patch f30 soundtrack: daf percussion, PVC foley, UI clicks; no music, no machine (PVC is molded). See markhor_flagship_audio.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_flagship_audio as mfa  # noqa: E402

mfa.build("f30", sys.argv[1], root="fpp", vo_prefix="fpp", seed=5151)
