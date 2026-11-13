import type { ChalkStep } from '../components/ds/Chalkboard';
import type { FooterLink } from '../components/ds/ContactFooter';
import type { Fact } from '../components/ds/FactsRow';
import type { Era } from '../components/ds/Timeline';
import type { NavLink } from '../components/layout/SiteHeader';
import { ROUTES, SOCIAL } from '../config/routes';
import type { Messages } from '../i18n/messages/en';

export const homeNavLinks = (t: Messages): NavLink[] => [
  { label: t.nav.work, href: '#work' },
  { label: t.nav.how, href: '#explained' },
  { label: t.nav.studies, href: '#studies' },
  { label: t.nav.about, href: '#about' },
];

export const homeMenuLinks = (t: Messages): NavLink[] => [...homeNavLinks(t), { label: t.nav.contact, href: '#contact' }];

export const heroFacts = (t: Messages): Fact[] => {
  const f = t.hero.facts;
  return [f.studied, f.internship, { ...f.building, href: SOCIAL.serveops }, f.status];
};

export type ProjectId = 'serveops' | 'olis' | 'balkan' | 'prime';

type BoardLink = { label: string; href: string; external?: boolean };

export type BoardProject = {
  id: ProjectId;
  tab: string;
  eyebrow: string;
  title: string;
  steps: ChalkStep[];
  footnote: string;
  links: BoardLink[];
};

export const boardProjects = (t: Messages): BoardProject[] => {
  const { serveops, olis, balkan, prime } = t.boards;
  return [
    {
      id: 'serveops',
      ...serveops,
      links: [
        { label: serveops.caseLink, href: ROUTES.serveops },
        { label: 'serveops.be', href: SOCIAL.serveops, external: true },
      ],
    },
    { id: 'olis', ...olis, links: [{ label: 'olis-house.be', href: SOCIAL.olis, external: true }] },
    { id: 'balkan', ...balkan, links: [{ label: 'balkandonner.be', href: SOCIAL.balkan, external: true }] },
    { id: 'prime', ...prime, links: [{ label: prime.moreLink, href: '#studies' }] },
  ];
};

export const eras = (t: Messages): Era[] => [
  t.eras.helpdesk,
  { ...t.eras.howest, items: ['C#', 'Java', 'TypeScript', 'Kotlin', 'Vue'] },
  { ...t.eras.playit, items: ['ASP.NET Core', 'Entity Framework', 'React', 'Redux'] },
  { ...t.eras.clients, items: ['olis-house.be', 'balkandonner.be'] },
  { ...t.eras.now, items: ['.NET', 'PostgreSQL', 'PostGIS'], current: true },
];

export const stackGroups = (t: Messages): Array<{ label: string; items: string[] }> => {
  const l = t.about.stackLabels;
  return [
    { label: l.backend, items: ['ASP.NET Core', 'Spring Boot', 'FastAPI', 'Node.js', 'Deno'] },
    { label: l.frontend, items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind'] },
    { label: l.data, items: ['PostgreSQL', 'PostGIS', 'MongoDB'] },
    { label: l.infra, items: ['Docker', 'LavinMQ', 'Railway', 'Git'] },
  ];
};

export const homeFooterLinks: FooterLink[] = [
  { label: 'GitHub', href: SOCIAL.github },
  { label: 'LinkedIn', href: SOCIAL.linkedin },
  { label: 'ServeOps', href: SOCIAL.serveops },
];
