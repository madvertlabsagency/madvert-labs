"""Markhor flagship cut flag50 — see markhor_flagship_audio.py."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import markhor_flagship_audio as mfa  # noqa: E402

mfa.build("flag50", sys.argv[1])
