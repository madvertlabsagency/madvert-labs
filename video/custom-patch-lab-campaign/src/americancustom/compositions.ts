import {makeCobraAd, type CobraSpec} from './CobraAd';
import cobra18 from './cobra18.json';

/** American Custom (Patch Lab) — Meta ads (spec: scripts/ac-cobra-spec.py). */
export const AC_ADS = [
  {id: 'AmericanCustomCobraDrop18', durationInFrames: cobra18.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra18 as unknown as CobraSpec, 'americancustom/cobra18')},
];
