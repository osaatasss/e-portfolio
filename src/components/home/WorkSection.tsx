import ProjectCard from '../ds/ProjectCard';
import { BorderWord, HlText } from '../layout/Decor';
import Doodle from '../layout/Doodle';
import { ROUTES, SOCIAL } from '../../config/routes';
import { useI18n } from '../../i18n/context';

const WorkSection = () => {
  const { t } = useI18n();
  const w = t.work;

  return (
    <section id="work" className="pf-section" aria-labelledby="work-title">
      <BorderWord word={w.word} side="left" />
      <div className="pf-wrap">
        <Doodle shape="pizza" width={84} height={84} style={{ right: '4%', top: -24 }} />
        <Doodle shape="loopArrow" tone="forest" smHide width={150} height={75} style={{ right: '16%', top: 40 }} />
        <div className="pf-gap">
          <p className="ap-eyebrow">{w.eyebrow}</p>
          <h2 id="work-title" className="ap-h1">
            <HlText parts={w.title} />
          </h2>
          <p className="ap-sh-intro">{w.intro}</p>
        </div>
        <div className="pf-cards">
          <ProjectCard
            className="col-span-full"
            title="ServeOps"
            kind="saas"
            summary={w.serveops.summary}
            stack={['.NET', 'PostgreSQL', 'PostGIS', 'Railway']}
            meta={w.serveops.meta}
            url={SOCIAL.serveops}
            caseStudyHref={ROUTES.serveops}
          />
          <ProjectCard title="Oli's House" kind="website" summary={w.olis.summary} meta={w.olis.meta} url={SOCIAL.olis} />
          <ProjectCard title="Balkan Donner" kind="website" summary={w.balkan.summary} meta={w.balkan.meta} url={SOCIAL.balkan} />
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
