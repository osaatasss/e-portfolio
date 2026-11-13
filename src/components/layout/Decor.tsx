import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../ds/utils';
import type { HlParts } from '../../i18n/langs';

type BorderWordProps = {
  word: string;
  punctuation?: string;
  side: 'left' | 'right';
  style?: CSSProperties;
};

export const BorderWord = ({ word, punctuation = '.', side, style }: BorderWordProps) => (
  <p className={`pf-border-word is-${side}`} aria-hidden="true" style={style}>
    <span className="pf-bw">{word}</span>
    <span className="pf-dot">{punctuation}</span>
  </p>
);

type NoteProps = {
  size: 'md' | 'xl';
  smHide?: boolean;
  style?: CSSProperties;
  children: ReactNode;
};

export const Note = ({ size, smHide = false, style, children }: NoteProps) => (
  <p className={cx('pf-note', `pf-note-${size}`, smHide && 'sm-hide')} style={style} aria-hidden="true">
    {children}
  </p>
);

type StickerProps = {
  tone?: 'tomato' | 'forest';
  style?: CSSProperties;
  children: string;
};

export const Sticker = ({ tone = 'tomato', style, children }: StickerProps) => (
  <span className={cx('pf-sticker', tone === 'forest' && 'is-forest')} style={style} aria-hidden="true">
    {children}
  </span>
);

export const Highlight = ({ children }: { children: string }) => <span className="pf-hl">{children}</span>;

export const HlText = ({ parts }: { parts: HlParts }) => (
  <>
    {parts.before}
    <Highlight>{parts.hl}</Highlight>
    {parts.after}
  </>
);

export const OutlineFilter = () => (
  <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
    <defs>
      <filter id="pf-outline" x="-5%" y="-15%" width="110%" height="130%" colorInterpolationFilters="sRGB">
        <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="grow" />
        <feComposite in="grow" in2="SourceAlpha" operator="out" result="ring" />
        <feFlood className="pf-outline-ink" result="ink" />
        <feComposite in="ink" in2="ring" operator="in" />
      </filter>
    </defs>
  </svg>
);
