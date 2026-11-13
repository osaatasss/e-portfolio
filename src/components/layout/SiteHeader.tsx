import { useCallback, useState, type KeyboardEvent } from 'react';
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

const SiteHeader = ({ idSuffix, brandHref, navLinks, menuLinks }: SiteHeaderProps) => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuId = `site-menu-${idSuffix}`;
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
        <nav className="pf-nav" aria-label={t.header.mainNav}>
          <ul>
            {navLinks.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={n.current ? 'true' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
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
            type="button"
            className="pf-icon-btn pf-menu-btn"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => {
              setMenuOpen((o) => !o);
              setLangOpen(false);
            }}
          >
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
      <div className="pf-progress" aria-hidden="true" />
    </header>
  );
};

export default SiteHeader;
