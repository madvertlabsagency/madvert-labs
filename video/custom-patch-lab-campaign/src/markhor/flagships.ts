import {makeFlagship, type FlagSpec} from './flagship';
import flag50 from './flag50/edl.json';
import flag30 from './flag30/edl.json';
import meta15 from './meta15/edl.json';
import hero from './hero/edl.json';

/** Markhor Patches flagship campaign cuts (specs in ./<cut>/edl.json). */
export const FLAGSHIP = [
  {id: 'MarkhorFlagship50', spec: flag50 as unknown as FlagSpec, Comp: makeFlagship(flag50 as unknown as FlagSpec, 'flag50')},
  {id: 'MarkhorCommercial30', spec: flag30 as unknown as FlagSpec, Comp: makeFlagship(flag30 as unknown as FlagSpec, 'flag30')},
  {id: 'MarkhorMetaAd15', spec: meta15 as unknown as FlagSpec, Comp: makeFlagship(meta15 as unknown as FlagSpec, 'meta15')},
  {id: 'MarkhorWebsiteHero', spec: hero as unknown as FlagSpec, Comp: makeFlagship(hero as unknown as FlagSpec, 'hero')},
];
