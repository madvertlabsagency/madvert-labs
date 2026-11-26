import {makeCobraAd, type CobraSpec} from './CobraAd';
import cobra18 from './cobra18.json';
import cobra40 from './cobra40.json';
import cobra40vo from './cobra40vo.json';

/** American Custom (Patch Lab) — Meta ads (spec: scripts/ac-cobra-spec.py). */
export const AC_ADS = [
  {id: 'AmericanCustomCobraDrop18', durationInFrames: cobra18.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra18 as unknown as CobraSpec, 'americancustom/cobra18')},
  {id: 'AmericanCustomCobraDrop40', durationInFrames: cobra40.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra40 as unknown as CobraSpec, 'americancustom/cobra40')},
  {id: 'AmericanCustomCobraDrop40VO', durationInFrames: cobra40vo.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra40vo as unknown as CobraSpec, 'americancustom/cobra40vo')},
];
