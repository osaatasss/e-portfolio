export type FontPairing = 'classic' | 'wonky' | 'bricolage' | 'fredoka' | 'shantell';
export type Paper = 'spotlight' | 'sunburst' | 'rings' | 'grain' | 'plain';
export type MotionMode = 'auto' | 'always' | 'off';

export const LOOK: { font: FontPairing; paper: Paper; doodles: boolean; motion: MotionMode } = {
  font: 'fredoka',
  paper: 'spotlight',
  doodles: true,
  motion: 'auto',
};
