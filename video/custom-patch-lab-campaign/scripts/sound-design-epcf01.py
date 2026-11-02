"""EPCF Ad 01 (lion): the same daf beat as the Billys version (no music).
Runs scripts/sound-design-billys01.py unchanged; only the output name differs."""
import os
import runpy
import sys

runpy.run_path(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sound-design-billys01.py'), run_name='__main__')
