import {makeFlagship, type FlagSpec} from '../markhor/flagship';
import {makeWide, type WideSpec} from '../markhor/flagship169';
import {FPP_BRAND, FPP_THEME} from './brand';
import f50 from './f50/edl.json';
import f30 from './f30/edl.json';
import f15 from './f15/edl.json';
import ad01 from '../ad01/edl.json';
import {FppLion} from './lion/FppLion';
import {makeFppAd, type AdSpec} from './ads/FppAd';
import a40 from './ads/a40.json';
import b23 from './ads/b23.json';
import e18 from './ads/e18.json';
import l18 from './ads/l18.json';
import voA from './ads/vo-a.json';
import voB from './ads/vo-b.json';

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

/** Facebook ad family (same edits as the Billys / EPCF ads). */
export const FPP_ADS = [
  {id: 'FppAd01Lion', durationInFrames: ad01.durationInFrames, width: 1080, height: 1920, Comp: FppLion},
  {id: 'FppMetaA40', durationInFrames: a40.durationInFrames, width: 1080, height: 1920, Comp: makeFppAd(a40 as unknown as AdSpec, voA, 'fpp/a40')},
  {id: 'FppMetaB23', durationInFrames: b23.durationInFrames, width: 1080, height: 1920, Comp: makeFppAd(b23 as unknown as AdSpec, voB, 'fpp/b23')},
  {id: 'FppEagle18', durationInFrames: e18.durationInFrames, width: 1080, height: 1920, Comp: makeFppAd(e18 as unknown as AdSpec, null, 'fpp/e18')},
  {id: 'FppLion18', durationInFrames: l18.durationInFrames, width: 1080, height: 1920, Comp: makeFppAd(l18 as unknown as AdSpec, null, 'fpp/l18')},
];
