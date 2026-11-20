import { useEffect, useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOOK } from '../../config/look';
import usePageMotion from '../../hooks/usePageMotion';
import { useI18n } from '../../i18n/context';
import { OutlineFilter } from './Decor';
import SiteHeader, { type NavLink } from './SiteHeader';

type PageShellProps = {
  idSuffix: string;
  brandHref: string;
  navLinks: NavLink[];
  menuLinks: NavLink[];
  footer: ReactNode;
  children: ReactNode;
};

const PageShell = ({ idSuffix, brandHref, navLinks, menuLinks, footer, children }: PageShellProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useI18n();
  usePageMotion(rootRef, LOOK.motion);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);

  return (
    <div
      id="top"
      ref={rootRef}
      className="pf-root min-h-screen bg-surface font-sans text-ink"
      data-font={LOOK.font}
      data-paper={LOOK.paper}
      data-doodles={LOOK.doodles ? 'on' : 'off'}
    >
      <OutlineFilter />
      <a className="ap-skip" href="#main">
        {t.common.skip}
      </a>
      <SiteHeader idSuffix={idSuffix} brandHref={brandHref} navLinks={navLinks} menuLinks={menuLinks} />
      <main id="main">{children}</main>
      {footer}
    </div>
  );
};

export default PageShell;
