import {makeCommercial, type Spec} from './commercial';
import c01 from './c01/edl.json';
import c02 from './c02/edl.json';
import c03 from './c03/edl.json';
import c04 from './c04/edl.json';
import c05 from './c05/edl.json';
import c06 from './c06/edl.json';
import c07 from './c07/edl.json';
import c08 from './c08/edl.json';
import c09 from './c09/edl.json';
import c10 from './c10/edl.json';

/** The 10 Markhor Patches campaign commercials (specs in ./cNN/edl.json). */
export const COMMERCIALS = [
  {id: 'MarkhorCommercial01', spec: c01 as unknown as Spec, Comp: makeCommercial(c01 as unknown as Spec, 'c01')},
  {id: 'MarkhorCommercial02', spec: c02 as unknown as Spec, Comp: makeCommercial(c02 as unknown as Spec, 'c02')},
  {id: 'MarkhorCommercial03', spec: c03 as unknown as Spec, Comp: makeCommercial(c03 as unknown as Spec, 'c03')},
  {id: 'MarkhorCommercial04', spec: c04 as unknown as Spec, Comp: makeCommercial(c04 as unknown as Spec, 'c04')},
  {id: 'MarkhorCommercial05', spec: c05 as unknown as Spec, Comp: makeCommercial(c05 as unknown as Spec, 'c05')},
  {id: 'MarkhorCommercial06', spec: c06 as unknown as Spec, Comp: makeCommercial(c06 as unknown as Spec, 'c06')},
  {id: 'MarkhorCommercial07', spec: c07 as unknown as Spec, Comp: makeCommercial(c07 as unknown as Spec, 'c07')},
  {id: 'MarkhorCommercial08', spec: c08 as unknown as Spec, Comp: makeCommercial(c08 as unknown as Spec, 'c08')},
  {id: 'MarkhorCommercial09', spec: c09 as unknown as Spec, Comp: makeCommercial(c09 as unknown as Spec, 'c09')},
  {id: 'MarkhorCommercial10', spec: c10 as unknown as Spec, Comp: makeCommercial(c10 as unknown as Spec, 'c10')},
];
