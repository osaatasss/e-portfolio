import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ds/Button';
import Chalkboard from '../ds/Chalkboard';
import { BorderWord, HlText, Note } from '../layout/Decor';
import Doodle from '../layout/Doodle';
import { boardProjects, type ProjectId } from '../../data/home';
import { useI18n } from '../../i18n/context';

const ExplainedSection = ({ startProject = 'serveops' }: { startProject?: ProjectId }) => {
  const { t } = useI18n();
  const e = t.explained;
  const [pick, setPick] = useState<ProjectId>(startProject);
  const projects = boardProjects(t);
  const project = projects.find((p) => p.id === pick) ?? projects[0];
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pick]);

  return (
    <section id="explained" className="pf-section pf-band" aria-labelledby="explained-title">
      <BorderWord word={e.word} punctuation="?" side="right" />
      <div className="pf-wrap">
        <Doodle shape="bolt" tone="tomato" width={44} height={52} style={{ right: '6%', top: -20 }} />
        <Doodle shape="plus" smHide width={18} height={18} style={{ right: '14%', top: 70 }} />
        <Note size="md" smHide style={{ right: '4%', top: 200, WebkitTextStrokeColor: 'var(--surface-sunken)' }}>
          {e.note}
          <svg viewBox="0 0 120 50" width="120" height="50">
            <path d="M100 4 C 90 30, 60 44, 20 40 M30 30 L18 40 L32 48" />
          </svg>
        </Note>
        <div className="pf-gap">
          <p className="ap-eyebrow">{e.eyebrow}</p>
          <h2 id="explained-title" className="ap-h1">
            <HlText parts={e.title} />
          </h2>
          <p className="ap-sh-intro">{e.intro}</p>
        </div>
        <ul className="pf-tabs" aria-label={e.tabsLabel}>
          {projects.map((p) => {
            const on = p.id === pick;
            return (
              <li key={p.id}>
                <button type="button" className={on ? 'pf-tab is-on' : 'pf-tab'} aria-pressed={on} onClick={() => setPick(p.id)}>
                  {p.tab}
                </button>
              </li>
            );
          })}
        </ul>
        <Chalkboard key={project.id} eyebrow={project.eyebrow} title={project.title} steps={project.steps} footnote={project.footnote} />
        <div className="pf-board-foot">
          {project.links.map((l) => (
            <Button key={l.href} variant="link" href={l.href} external={l.external}>
              {l.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplainedSection;
