import {makeCobraAd, type CobraSpec} from './CobraAd';
import cobra18 from './cobra18.json';
import cobra18vo from './cobra18vo.json';
import cobra40 from './cobra40.json';
import cobra40vo from './cobra40vo.json';
import metaA from './meta-a.json';
import metaB from './meta-b.json';
import voMetaA from './vo-meta-a.json';
import voMetaB from './vo-meta-b.json';

/** American Custom (Patch Lab) — Meta ads (spec: scripts/ac-cobra-spec.py). */
export const AC_ADS = [
  {id: 'AmericanCustomCobraDrop18', durationInFrames: cobra18.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra18 as unknown as CobraSpec, 'americancustom/cobra18')},
  {id: 'AmericanCustomCobraDrop18VO', durationInFrames: cobra18vo.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra18vo as unknown as CobraSpec, 'americancustom/cobra18vo')},
  {id: 'AmericanCustomCobraDrop40', durationInFrames: cobra40.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra40 as unknown as CobraSpec, 'americancustom/cobra40')},
  {id: 'AmericanCustomCobraDrop40VO', durationInFrames: cobra40vo.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(cobra40vo as unknown as CobraSpec, 'americancustom/cobra40vo')},
  // script ads (FPP Meta A/B formula, multiple artworks + quote funnel; spec: scripts/ac-meta-specs.py)
  {id: 'AmericanCustomMetaA', durationInFrames: metaA.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(metaA as unknown as CobraSpec, 'americancustom/meta-a', voMetaA)},
  {id: 'AmericanCustomMetaB', durationInFrames: metaB.durationInFrames, width: 1080, height: 1920, Comp: makeCobraAd(metaB as unknown as CobraSpec, 'americancustom/meta-b', voMetaB)},
];
