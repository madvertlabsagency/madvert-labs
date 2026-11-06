import React from 'react';
import {Sequence} from 'remotion';

type Edl = {shots: {id: string; from: number; frames: number}[]};

export const makeShots = (edl: Edl, dir: string) => {
  const shot = (id: string) => {
    const s = edl.shots.find((x) => x.id === id);
    if (!s) throw new Error(`Shot ${id} missing from ${dir} edl.json`);
    return s;
  };
  const seg = (id: string) => `segments/markhor/${dir}/${id}.mp4`;
  const Shot: React.FC<{id: string; extend?: number; children: React.ReactNode}> = ({id, extend = 0, children}) => (
    <Sequence from={shot(id).from} durationInFrames={shot(id).frames + extend} name={id}>
      {children}
    </Sequence>
  );
  return {shot, seg, Shot};
};

/** A block of type living from `from` to `to` (global), children get local frames. */
export const Beat: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => (
  <Sequence from={from} durationInFrames={to - from} name={`type ${from}`}>
    {children}
  </Sequence>
);
