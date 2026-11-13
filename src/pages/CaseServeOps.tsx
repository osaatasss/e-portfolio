import { useEffect } from 'react';
import Button from '../components/ds/Button';
import Chalkboard from '../components/ds/Chalkboard';
import ContactFooter from '../components/ds/ContactFooter';
import FactsRow from '../components/ds/FactsRow';
import Figure from '../components/ds/Figure';
import ProjectCard from '../components/ds/ProjectCard';
import Prose from '../components/ds/Prose';
import Tag from '../components/ds/Tag';
import { BorderWord, HlText, Note } from '../components/layout/Decor';
import Doodle from '../components/layout/Doodle';
import PageShell from '../components/layout/PageShell';
import { Phone } from '../components/layout/Stage';
import { COPYRIGHT, EMAIL, ROUTES, SOCIAL } from '../config/routes';
import { caseFacts, caseFooterLinks, caseMenuLinks, caseNavLinks } from '../data/serveops';
import { useI18n } from '../i18n/context';
import serveopsLaptop from '../assets/screens/serveops-laptop.webp';
import serveopsPhone from '../assets/screens/serveops-phone.webp';
import ordersEn from '../assets/videos/serveops-orders-en.mp4';
import ordersEnPoster from '../assets/videos/serveops-orders-en.webp';
import ordersNl from '../assets/videos/serveops-orders-nl.mp4';
import ordersNlPoster from '../assets/videos/serveops-orders-nl.webp';
import ordersRo from '../assets/videos/serveops-orders-ro.mp4';
import ordersRoPoster from '../assets/videos/serveops-orders-ro.webp';
import type { Lang } from '../i18n/langs';

const ORDERS_DEMO: Record<Lang, { src: string; poster: string }> = {
  en: { src: ordersEn, poster: ordersEnPoster },
  nl: { src: ordersNl, poster: ordersNlPoster },
  ro: { src: ordersRo, poster: ordersRoPoster },
};

const CaseContact = () => {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <div id="contact" className="pf-wrap">
      <ContactFooter
        eyebrow={c.eyebrow}
        title={c.caseTitle}
        text={c.caseText}
        email={EMAIL}
        links={caseFooterLinks(t)}
        note={COPYRIGHT}
        headingLevel={2}
      />
    </div>
  );
};

const CaseServeOps = () => {
  const { lang, t } = useI18n();
  const cs = t.caseStudy;

  useEffect(() => {
    document.title = t.meta.caseTitle;
  }, [t]);

  return (
    <PageShell idSuffix="case" brandHref={ROUTES.home} navLinks={caseNavLinks(t)} menuLinks={caseMenuLinks(t)} footer={<CaseContact />}>
      <section className="pf-wrap" aria-labelledby="case-title">
        <div className="pf-case-head">
          <a className="pf-back" href={`${ROUTES.home}#work`}>
            <span aria-hidden="true">←</span> {cs.allWork}
          </a>
          <Tag kind="saas" />
        </div>

        <div className="pf-stage mt-16">
          <Doodle shape="sparkle" tone="forest" width={48} height={48} style={{ left: '6%', top: -10 }} />
          <Doodle shape="pizza" smHide width={72} height={72} style={{ right: '4%', top: -30 }} />
          <p className="pf-stage-above">{cs.stageAbove}</p>
          <h1 id="case-title" className="pf-stage-word">
            ServeOps<span className="pf-dot">.</span>
          </h1>
          <Note size="xl" style={{ left: '4%', bottom: '10%' }}>
            {cs.note.line1}
            <br />
            {cs.note.line2}
          </Note>
          <div className="pf-devices is-two">
            <div className="pf-dev pf-dev-main">
              <Figure src={serveopsLaptop} url="serveops.be" ratio="16 / 10" alt={cs.laptopAlt} width={1200} height={750} />
            </div>
            <div className="pf-dev">
              <Phone src={serveopsPhone} alt={cs.phoneAlt} />
            </div>
          </div>
        </div>

        <p className="pf-case-intro">{cs.intro}</p>
        <div className="pf-case-tags">
          <Button variant="primary" href={SOCIAL.serveops} external>
            {cs.visit}
          </Button>
        </div>

        <div className="mt-24">
          <FactsRow facts={caseFacts(t)} />
        </div>
      </section>

      <section className="pf-section" aria-label={cs.storyLabel}>
        <BorderWord word={cs.storyWord} side="left" />
        <div className="pf-wrap pf-two">
          <Prose>
            <h2>{cs.problemTitle}</h2>
            <p>{cs.problemText}</p>
            <h2>{cs.builtTitle}</h2>
            <p>{cs.builtText}</p>
            <h2>{cs.nextTitle}</h2>
            <p>{cs.nextText}</p>
          </Prose>
          <div>
            <Figure video={ORDERS_DEMO[lang]} url="serveops.be/orders" ratio="16 / 10" alt={cs.toolAlt} caption={cs.toolCaption} />
          </div>
        </div>
      </section>

      <section className="pf-section pf-band" aria-labelledby="board-title-hidden">
        <BorderWord word={cs.buildWord} side="right" />
        <div className="pf-wrap">
          <h2 id="board-title-hidden" className="ap-sr">
            {cs.buildTitle}
          </h2>
          <Chalkboard eyebrow="ServeOps" title={cs.buildTitle} steps={cs.buildSteps} footnote={cs.buildFootnote} pageSize={2} />
        </div>
      </section>

      <section className="pf-section" aria-labelledby="more-title">
        <BorderWord word={cs.moreWord} side="left" />
        <div className="pf-wrap">
          <div className="pf-gap">
            <p className="ap-eyebrow">{cs.moreEyebrow}</p>
            <h2 id="more-title" className="ap-h1">
              <HlText parts={cs.moreTitle} />
            </h2>
          </div>
          <div className="pf-cards">
            <ProjectCard title="Oli's House" kind="website" summary={t.work.olis.summary} meta={t.work.olis.meta} url={SOCIAL.olis} />
            <ProjectCard title="Balkan Donner" kind="website" summary={t.work.balkan.summary} meta={t.work.balkan.meta} url={SOCIAL.balkan} />
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default CaseServeOps;
