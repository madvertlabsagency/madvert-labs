import {makeFlagship, type FlagSpec} from '../markhor/flagship';
import {makeWide, type WideSpec} from '../markhor/flagship169';
import {FPP_BRAND, FPP_THEME} from './brand';
import f50 from './f50/edl.json';
import f30 from './f30/edl.json';
import f15 from './f15/edl.json';

/** Future PVC Patch — 50 s / 30 s / 15 s, each in 9:16 and 16:9 (specs: scripts/fpp-specs.py). */
const cuts = [
  {name: 'F50', dir: 'f50', spec: f50},
  {name: 'F30', dir: 'f30', spec: f30},
  {name: 'F15', dir: 'f15', spec: f15},
];
const opts = (dir: string) => ({brand: FPP_BRAND, theme: FPP_THEME, audio: `audio/fpp-${dir}-mix.wav`});

export const FPP_COMPS = cuts.flatMap((c) => [
  {id: `FuturePvc${c.name}`, durationInFrames: c.spec.durationInFrames, width: 1080, height: 1920, Comp: makeFlagship(c.spec as unknown as FlagSpec, `fpp/${c.dir}`, opts(c.dir))},
  {id: `FuturePvc${c.name}Wide`, durationInFrames: c.spec.durationInFrames, width: 1920, height: 1080, Comp: makeWide(c.spec as unknown as WideSpec, `fpp/${c.dir}`, opts(c.dir))},
]);
