import type { FooterLink } from '../components/ds/ContactFooter';
import type { Fact } from '../components/ds/FactsRow';
import type { NavLink } from '../components/layout/SiteHeader';
import { ROUTES, SOCIAL } from '../config/routes';
import type { Messages } from '../i18n/messages/en';

export const caseNavLinks = (t: Messages): NavLink[] => [
  { label: t.nav.work, href: `${ROUTES.home}#work`, current: true },
  { label: t.nav.how, href: `${ROUTES.home}#explained` },
  { label: t.nav.studies, href: `${ROUTES.home}#studies` },
  { label: t.nav.about, href: `${ROUTES.home}#about` },
];

export const caseMenuLinks = (t: Messages): NavLink[] => [
  { label: t.nav.home, href: ROUTES.home },
  { label: t.nav.work, href: `${ROUTES.home}#work` },
  { label: t.nav.studies, href: `${ROUTES.home}#studies` },
  { label: t.nav.about, href: `${ROUTES.home}#about` },
  { label: t.nav.contact, href: '#contact' },
];

export const caseFacts = (t: Messages): Fact[] => {
  const f = t.caseStudy.facts;
  return [f.role, f.status, f.stack, f.hosting, { ...f.site, href: SOCIAL.serveops }];
};

export const caseFooterLinks = (t: Messages): FooterLink[] => [
  { label: 'GitHub', href: SOCIAL.github },
  { label: 'LinkedIn', href: SOCIAL.linkedin },
  { label: t.contact.backHome, href: ROUTES.home },
];
