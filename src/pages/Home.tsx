import { useEffect } from 'react';
import ContactFooter from '../components/ds/ContactFooter';
import AboutSection from '../components/home/AboutSection';
import ExplainedSection from '../components/home/ExplainedSection';
import HomeHero from '../components/home/HomeHero';
import StudiesSection from '../components/home/StudiesSection';
import WorkSection from '../components/home/WorkSection';
import { BorderWord } from '../components/layout/Decor';
import Doodle from '../components/layout/Doodle';
import PageShell from '../components/layout/PageShell';
import { COPYRIGHT, EMAIL } from '../config/routes';
import { homeFooterLinks, homeMenuLinks, homeNavLinks } from '../data/home';
import { useI18n } from '../i18n/context';

const HomeContact = () => {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <div id="contact" className="pf-wrap pf-dood-host scroll-mt-6">
      <BorderWord word={c.word} side="left" style={{ left: 0 }} />
      <Doodle shape="plane" tone="forest" width={150} height={88} style={{ right: '4%', top: 88 }} />
      <ContactFooter
        eyebrow={c.eyebrow}
        title={c.homeTitle}
        text={c.homeText}
        email={EMAIL}
        links={homeFooterLinks}
        note={COPYRIGHT}
        headingLevel={2}
      />
    </div>
  );
};

const Home = () => {
  const { t } = useI18n();

  useEffect(() => {
    document.title = t.meta.homeTitle;
  }, [t]);

  return (
    <PageShell idSuffix="home" brandHref="#top" navLinks={homeNavLinks(t)} menuLinks={homeMenuLinks(t)} footer={<HomeContact />}>
      <HomeHero />
      <WorkSection />
      <ExplainedSection />
      <StudiesSection />
      <AboutSection />
    </PageShell>
  );
};

export default Home;
