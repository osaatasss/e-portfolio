import { useEffect, useRef, type KeyboardEvent } from 'react';
import { useI18n } from '../../i18n/context';
import { LANGS } from '../../i18n/langs';

type LanguageMenuProps = {
  idSuffix: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const Globe = ({ clipId }: { clipId: string }) => (
  <svg className="pf-globe" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <defs>
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="9" />
      </clipPath>
    </defs>
    <g clipPath={`url(#${clipId})`}>
      <g className="pf-globe-spin" fill="none" stroke="currentColor" strokeWidth="1.3">
        {[-6, 0, 6, 12, 18, 24].map((cx) => (
          <ellipse key={cx} cx={cx} cy="12" rx="2.6" ry="9" />
        ))}
      </g>
    </g>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 12h18M4.6 7.5h14.8M4.6 16.5h14.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const LanguageMenu = ({ idSuffix, open, onOpenChange }: LanguageMenuProps) => {
  const { lang, setLang, t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[1];
  const menuId = `lang-menu-${idSuffix}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) onOpenChange(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, onOpenChange]);

  const closeAndRefocus = () => {
    onOpenChange(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) closeAndRefocus();
  };

  return (
    <div className="pf-langdd" ref={wrapRef} onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className="pf-lang-btn"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.header.language}: ${current.name}`}
        onClick={() => onOpenChange(!open)}
      >
        <Globe clipId={`globe-clip-${idSuffix}`} />
        <span>{current.label}</span>
        <svg className="pf-chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul id={menuId} className="pf-lang-menu" aria-label={t.header.chooseLanguage}>
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className="pf-lang-opt"
                lang={l.code}
                aria-current={l.code === lang ? 'true' : 'false'}
                onClick={() => {
                  setLang(l.code);
                  closeAndRefocus();
                }}
              >
                <span>{l.name}</span>
                <span className="pf-lang-optcode">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageMenu;
