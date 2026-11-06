import {makeFlagship, type FlagSpec} from './flagship';
import {makeWide, makeWideHero, type WideSpec} from './flagship169';
import flag50 from './flag50/edl.json';
import flag30 from './flag30/edl.json';
import meta15 from './meta15/edl.json';
import hero from './hero/edl.json';
import hero169 from './hero169/edl.json';

type Cut = {id: string; spec: {durationInFrames: number}; Comp: React.FC; width: number; height: number};
const V = {width: 1080, height: 1920};
const L = {width: 1920, height: 1080};

/** Markhor Patches flagship campaign cuts (specs in ./<cut>/edl.json), 9:16 and 16:9. */
export const FLAGSHIP: Cut[] = [
  {id: 'MarkhorFlagship50', spec: flag50, Comp: makeFlagship(flag50 as unknown as FlagSpec, 'flag50'), ...V},
  {id: 'MarkhorCommercial30', spec: flag30, Comp: makeFlagship(flag30 as unknown as FlagSpec, 'flag30'), ...V},
  {id: 'MarkhorMetaAd15', spec: meta15, Comp: makeFlagship(meta15 as unknown as FlagSpec, 'meta15'), ...V},
  {id: 'MarkhorWebsiteHero', spec: hero, Comp: makeFlagship(hero as unknown as FlagSpec, 'hero'), ...V},
  {id: 'MarkhorFlagship50Wide', spec: flag50, Comp: makeWide(flag50 as unknown as WideSpec, 'flag50'), ...L},
  {id: 'MarkhorCommercial30Wide', spec: flag30, Comp: makeWide(flag30 as unknown as WideSpec, 'flag30'), ...L},
  {id: 'MarkhorMetaAd15Wide', spec: meta15, Comp: makeWide(meta15 as unknown as WideSpec, 'meta15'), ...L},
  {id: 'MarkhorWebsiteHeroWide', spec: hero169, Comp: makeWideHero(hero169 as unknown as Parameters<typeof makeWideHero>[0], 'hero169'), ...L},
];
