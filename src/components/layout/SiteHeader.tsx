import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import useActiveSection from '../../hooks/useActiveSection';
import useReadProgress from '../../hooks/useReadProgress';
import useTheme from '../../hooks/useTheme';
import { useI18n } from '../../i18n/context';
import LanguageMenu from './LanguageMenu';

export type NavLink = { label: string; href: string; current?: boolean };

type SiteHeaderProps = {
  idSuffix: string;
  brandHref: string;
  navLinks: NavLink[];
  menuLinks: NavLink[];
};

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

type Mark = { x: number; w: number; on: boolean; slide: boolean };

/** How far the chalk mark sits in from each side of the link, so it underlines the label, not the pill. */
const MARK_INSET = 12;

const SiteHeader = ({ idSuffix, brandHref, navLinks, menuLinks }: SiteHeaderProps) => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mark, setMark] = useState<Mark>({ x: 0, w: 0, on: false, slide: false });
  const navRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuId = `site-menu-${idSuffix}`;
  const active = useActiveSection(navLinks.map((n) => n.href));
  const labels = navLinks.map((n) => n.label).join('|');
  useReadProgress(ringRef, menuBtnRef);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const place = () => {
      const link = active ? nav.querySelector<HTMLElement>(`a[href="${active}"]`) : null;
      if (!link || !link.offsetWidth) {
        setMark((m) => (m.on ? { ...m, on: false, slide: false } : m));
        return;
      }
      const box = nav.getBoundingClientRect();
      const r = link.getBoundingClientRect();
      const x = Math.round(r.left - box.left + MARK_INSET);
      const w = Math.round(r.width - MARK_INSET * 2);
      setMark((m) => (m.on && m.x === x && m.w === w ? m : { x, w, on: true, slide: m.on }));
    };
    place();
    const resized = new ResizeObserver(place);
    resized.observe(nav);
    return () => resized.disconnect();
  }, [active, labels]);
  const closeMenu = () => setMenuOpen(false);
  const onLangOpenChange = useCallback((open: boolean) => setLangOpen(open), []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      setLangOpen(false);
    }
  };

  return (
    <header className="pf-header" onKeyDown={onKeyDown}>
      <div className="pf-wrap pf-header-row">
        <a className="pf-brand" href={brandHref}>
          Robert Apostol
        </a>
        <nav ref={navRef} className="pf-nav" aria-label={t.header.mainNav}>
          <ul>
            {navLinks.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={n.current ? 'true' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <span
            className={`pf-nav-mark${mark.on ? ' is-on' : ''}${mark.slide ? ' is-sliding' : ''}`}
            style={{ '--mark-x': `${mark.x}px`, '--mark-w': `${mark.w}px` } as CSSProperties}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" focusable="false">
              <path d="M2 6 C 25 2, 60 9, 98 4" />
            </svg>
          </span>
        </nav>
        <div className="pf-header-tools">
          <LanguageMenu idSuffix={idSuffix} open={langOpen} onOpenChange={onLangOpenChange} />
          <button type="button" className="pf-icon-btn pf-theme-btn" aria-label={isDark ? t.header.toLight : t.header.toDark} onClick={toggleTheme}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a className="pf-cta" href="#contact">
            {t.header.cta}
          </a>
          <button
            ref={menuBtnRef}
            type="button"
            className="pf-icon-btn pf-menu-btn"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => {
              setMenuOpen((o) => !o);
              setLangOpen(false);
            }}
          >
            <svg className="pf-read-ring" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
              <circle ref={ringRef} cx="22" cy="22" r="21" pathLength={1} />
            </svg>
            {menuOpen ? (
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
            <span className="ap-sr">{t.header.menu}</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id={menuId} className="pf-menu" aria-label={t.header.mainMenu}>
          <ul>
            {menuLinks.map((m) => (
              <li key={m.href}>
                <a className="pf-menu-link" href={m.href} onClick={closeMenu}>
                  <span>{m.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="pf-menu-foot">
            <button type="button" className="pf-menu-theme" onClick={toggleTheme}>
              {isDark ? t.header.lightMode : t.header.darkMode}
            </button>
            <a className="pf-cta" href="#contact" onClick={closeMenu}>
              {t.header.cta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
