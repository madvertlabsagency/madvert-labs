"""Markhor commercial c03 sound design — see markhor_commercial_audio.py. NO MUSIC, NO VO."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_commercial_audio as mca  # noqa: E402

mca.build("c03", sys.argv[1])
