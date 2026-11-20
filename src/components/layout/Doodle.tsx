import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../ds/utils';

const SHAPES = {
  sparkle: { viewBox: '0 0 40 40', body: <path d="M20 3 C 21 14, 25 18, 37 20 C 25 22, 21 26, 20 37 C 19 26, 15 22, 3 20 C 15 18, 19 14, 20 3 Z" /> },
  plus: { viewBox: '0 0 20 20', body: <path d="M10 2 V18 M2 10 H18" /> },
  code: { viewBox: '0 0 56 40', body: <path d="M18 6 L5 20 L18 34 M33 4 L25 36 M40 6 L53 20 L40 34" /> },
  cursor: { viewBox: '0 0 40 48', body: <path d="M6 4 L6 38 L14 30 L21 44 L27 41 L20 27 L33 27 Z" /> },
  wave: { viewBox: '0 0 120 24', body: <path d="M2 12 C 12 2, 22 22, 32 12 S 52 2, 62 12 S 82 22, 92 12 S 112 2, 118 12" /> },
  pizza: {
    viewBox: '0 0 64 64',
    body: (
      <>
        <path className="fill" d="M8 10 C 26 4, 46 8, 58 18 L 22 58 Z" />
        <path d="M8 10 C 26 4, 46 8, 58 18 L 22 58 Z M10 16 C 26 10, 42 13, 52 21" />
        <circle cx="28" cy="25" r="4" />
        <circle cx="40" cy="27" r="3.5" />
        <circle cx="28" cy="39" r="3.5" />
      </>
    ),
  },
  loopArrow: { viewBox: '0 0 120 60', body: <path d="M4 44 C 24 6, 56 6, 58 30 C 60 50, 36 52, 40 32 C 44 12, 80 8, 116 20 M106 10 L117 20 L104 27" /> },
  bolt: { viewBox: '0 0 40 48', body: <path d="M24 3 L9 27 H21 L15 45 L33 19 H21 L27 3 Z" /> },
  cap: {
    viewBox: '0 0 72 52',
    body: (
      <>
        <path className="fill" d="M4 18 L36 6 L68 18 L36 30 Z" />
        <path d="M4 18 L36 6 L68 18 L36 30 Z M16 23 V36 C 26 44, 46 44, 56 36 V23 M64 20 V36 M64 36 C 61 41, 67 41, 64 36" />
      </>
    ),
  },
  ball: {
    viewBox: '0 0 48 48',
    body: (
      <>
        <circle cx="24" cy="24" r="20" />
        <path className="fill" d="M24 15 L32 21 L29 30 H19 L16 21 Z" />
        <path d="M24 15 L32 21 L29 30 H19 L16 21 Z M24 15 V5 M32 21 L42 17 M29 30 L35 39 M19 30 L13 39 M16 21 L6 17" />
      </>
    ),
  },
  mug: {
    viewBox: '0 0 48 52',
    body: <path d="M8 20 H36 V34 C 36 42, 30 46, 22 46 C 14 46, 8 42, 8 34 Z M36 24 C 44 24, 44 34, 36 34 M16 14 C 13 10, 19 8, 16 3 M26 14 C 23 10, 29 8, 26 3" />,
  },
  plane: {
    viewBox: '0 0 120 70',
    body: (
      <>
        <path d="M60 30 L116 6 L98 60 L84 42 Z M84 42 L116 6 M84 42 L82 56 L92 50" />
        <path d="M56 34 C 30 46, 12 32, 4 56" strokeDasharray="2 9" />
      </>
    ),
  },
} satisfies Record<string, { viewBox: string; body: ReactNode }>;

export type DoodleShape = keyof typeof SHAPES;

type DoodleProps = {
  shape: DoodleShape;
  width: number;
  height: number;
  tone?: 'tomato' | 'forest';
  smHide?: boolean;
  style: CSSProperties;
};

const Doodle = ({ shape, width, height, tone, smHide = false, style }: DoodleProps) => (
  <svg
    className={cx('pf-doodle', tone && `is-${tone}`, smHide && 'sm-hide')}
    viewBox={SHAPES[shape].viewBox}
    width={width}
    height={height}
    style={style}
    aria-hidden="true"
    focusable="false"
  >
    {SHAPES[shape].body}
  </svg>
);

export default Doodle;
