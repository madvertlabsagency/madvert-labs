import React from 'react';
import {Composition, Folder} from 'remotion';
import './shared/fonts';
import {Ad01} from './ad01/Ad01';
import edl01 from './ad01/edl.json';
import {Ad02} from './ad02/Ad02';
import edl02 from './ad02/edl.json';
import {Ad03} from './ad03/Ad03';
import edl03 from './ad03/edl.json';
import {Ad04} from './ad04/Ad04';
import edl04 from './ad04/edl.json';
import {Reel01} from './reel01/Reel01';
import edlR1 from './reel01/edl.json';
import {Reel02} from './reel02/Reel02';
import edlR2 from './reel02/edl.json';
import {Reel03, Reel03Cover} from './reel03/Reel03';
import edlR3 from './reel03/edl.json';
import {Still} from 'remotion';
import {BillysAd01} from './billys/BillysAd01';
import {BillysEagle} from './billys/eagle/BillysEagle';
import edlBE from './billys/eagle/edl.json';
import {BillysTiger} from './billys/tiger/BillysTiger';
import {EpcfAd01} from './epcf/EpcfAd01';
import {EpcfEagle} from './epcf/eagle/EpcfEagle';
import edlEE from './epcf/eagle/edl.json';
import {EpcfTiger} from './epcf/tiger/EpcfTiger';
import edlET from './epcf/tiger/edl.json';
import edlBT from './billys/tiger/edl.json';
import {MarkhorReel01} from './markhor/r1/MarkhorReel01';
import edlMK1 from './markhor/r1/edl.json';
import {MarkhorReel02} from './markhor/r2/MarkhorReel02';
import edlMK2 from './markhor/r2/edl.json';
import {MarkhorReel03} from './markhor/r3/MarkhorReel03';
import edlMK3 from './markhor/r3/edl.json';
import {MarkhorReel04} from './markhor/r4/MarkhorReel04';
import edlMK4 from './markhor/r4/edl.json';
import {HyperReel01} from './markhor/h1/HyperReel01';
import edlHY1 from './markhor/h1/edl.json';
import {HyperReel03} from './markhor/h3/HyperReel03';
import edlHY3 from './markhor/h3/edl.json';
import {HyperReel04} from './markhor/h4/HyperReel04';
import edlHY4 from './markhor/h4/edl.json';
import {COMMERCIALS} from './markhor/commercials';
import {BillysReel15} from './billys/reel15/BillysReel15';
import edlBR15 from './billys/reel15/edl.json';
import {BillysReelLaser} from './billys/reel15laser/BillysReelLaser';
import edlBRL from './billys/reel15laser/edl.json';

export const RemotionRoot: React.FC = () => (
  <>
  <Folder name="Custom-Patch-Lab-Campaign">
    <Composition id="CustomPatchLabAd01" component={Ad01} durationInFrames={edl01.durationInFrames} fps={edl01.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabAd02" component={Ad02} durationInFrames={edl02.durationInFrames} fps={edl02.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabAd03" component={Ad03} durationInFrames={edl03.durationInFrames} fps={edl03.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabAd04" component={Ad04} durationInFrames={edl04.durationInFrames} fps={edl04.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabReel01" component={Reel01} defaultProps={{captions: true}} durationInFrames={edlR1.durationInFrames} fps={edlR1.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabReel01NoCaptions" component={Reel01} defaultProps={{captions: false}} durationInFrames={edlR1.durationInFrames} fps={edlR1.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabReel02" component={Reel02} durationInFrames={edlR2.durationInFrames} fps={edlR2.fps} width={1080} height={1920} />
    <Composition id="CustomPatchLabReel03" component={Reel03} durationInFrames={edlR3.durationInFrames} fps={edlR3.fps} width={1080} height={1920} />
    <Still id="CustomPatchLabReel03Cover" component={Reel03Cover} width={1080} height={1920} />
  </Folder>
  <Folder name="Billys-Custom-Patches">
    <Composition id="BillysAd01Lion" component={BillysAd01} durationInFrames={edl01.durationInFrames} fps={edl01.fps} width={1080} height={1920} />
    <Composition id="BillysAd02Eagle" component={BillysEagle} durationInFrames={edlBE.durationInFrames} fps={edlBE.fps} width={1080} height={1920} />
    <Composition id="BillysAd03Tiger" component={BillysTiger} durationInFrames={edlBT.durationInFrames} fps={edlBT.fps} width={1080} height={1920} />
    <Composition id="BillysReel15" component={BillysReel15} durationInFrames={edlBR15.durationInFrames} fps={edlBR15.fps} width={1080} height={1920} />
    <Composition id="BillysReelLaser" component={BillysReelLaser} durationInFrames={edlBRL.durationInFrames} fps={edlBRL.fps} width={1080} height={1920} />
  </Folder>
  <Folder name="Markhor-Patches">
    <Composition id="MarkhorReel01" component={MarkhorReel01} durationInFrames={edlMK1.durationInFrames} fps={edlMK1.fps} width={1080} height={1920} />
    <Composition id="MarkhorReel02" component={MarkhorReel02} durationInFrames={edlMK2.durationInFrames} fps={edlMK2.fps} width={1080} height={1920} />
    <Composition id="MarkhorReel03" component={MarkhorReel03} durationInFrames={edlMK3.durationInFrames} fps={edlMK3.fps} width={1080} height={1920} />
    <Composition id="MarkhorReel04" component={MarkhorReel04} durationInFrames={edlMK4.durationInFrames} fps={edlMK4.fps} width={1080} height={1920} />
  </Folder>
  <Folder name="Markhor-Hyper-Cut">
    <Composition id="MarkhorHyper01" component={HyperReel01} durationInFrames={edlHY1.durationInFrames} fps={edlHY1.fps} width={1080} height={1920} />
    <Composition id="MarkhorHyper03" component={HyperReel03} durationInFrames={edlHY3.durationInFrames} fps={edlHY3.fps} width={1080} height={1920} />
    <Composition id="MarkhorHyper04" component={HyperReel04} durationInFrames={edlHY4.durationInFrames} fps={edlHY4.fps} width={1080} height={1920} />
  </Folder>
  <Folder name="Markhor-Commercials">
    {COMMERCIALS.map((c) => (
      <Composition key={c.id} id={c.id} component={c.Comp} durationInFrames={c.spec.durationInFrames} fps={30} width={1080} height={1920} />
    ))}
  </Folder>
  <Folder name="EPCF-Excellence-Punch">
    <Composition id="EpcfAd01Lion" component={EpcfAd01} durationInFrames={edl01.durationInFrames} fps={edl01.fps} width={1080} height={1920} />
    <Composition id="EpcfAd02Eagle" component={EpcfEagle} durationInFrames={edlEE.durationInFrames} fps={edlEE.fps} width={1080} height={1920} />
    <Composition id="EpcfAd03Tiger" component={EpcfTiger} durationInFrames={edlET.durationInFrames} fps={edlET.fps} width={1080} height={1920} />
  </Folder>
  </>
);
