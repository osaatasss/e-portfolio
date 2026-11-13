import type { ReactNode } from 'react';
import Figure from '../ds/Figure';
import ProjectCard from '../ds/ProjectCard';
import Tag from '../ds/Tag';
import Timeline from '../ds/Timeline';
import { BorderWord, HlText, Note } from '../layout/Decor';
import Doodle from '../layout/Doodle';
import { eras } from '../../data/home';
import { useI18n } from '../../i18n/context';
import howestPrime from '../../assets/howest-prime.png';
import futbololo from '../../assets/futbololo-leagues.png';

type FeatureProps = {
  id: string;
  meta: string;
  title: string;
  text: string;
  stack: string[];
  note: ReactNode;
  image: { src: string; alt: string; ratio: string };
};

const Feature = ({ id, meta, title, text, stack, note, image }: FeatureProps) => (
  <article className="pf-feature" aria-labelledby={id}>
    <div>
      <p className="pf-feature-meta">{meta}</p>
      <h4 id={id} className="pf-feature-title">
        {title}
      </h4>
      <p className="pf-feature-text">{text}</p>
      <ul className="pf-chips">
        {stack.map((s) => (
          <li key={s}>
            <Tag kind="stack">{s}</Tag>
          </li>
        ))}
      </ul>
    </div>
    <div className="pf-feature-media">
      {note}
      <Figure src={image.src} alt={image.alt} ratio={image.ratio} frame={false} />
    </div>
  </article>
);

const StudiesSection = () => {
  const { t } = useI18n();
  const s = t.studies;

  return (
    <section id="studies" className="pf-section" aria-labelledby="studies-title">
      <BorderWord word={s.word} side="left" />
      <div className="pf-wrap">
        <Doodle shape="cap" tone="forest" width={96} height={70} style={{ right: '4%', top: -30 }} />
        <Doodle shape="wave" smHide width={110} height={22} style={{ right: '18%', top: 120 }} />
        <div className="pf-gap">
          <p className="ap-eyebrow">{s.eyebrow}</p>
          <h2 id="studies-title" className="ap-h1">
            <HlText parts={s.title} />
          </h2>
          <p className="ap-sh-intro">{s.intro}</p>
        </div>
        <Timeline eras={eras(t)} />

        <div className="mt-24">
          <h3 className="pf-sub">{s.projectsTitle}</h3>

          <Feature
            id="prime-title"
            meta={s.prime.meta}
            title={s.prime.title}
            text={s.prime.text}
            stack={['ASP.NET Core', 'TypeScript', 'LavinMQ', 'PostgreSQL', 'Docker']}
            note={
              <Note size="md" style={{ left: -20, bottom: -22 }}>
                {s.prime.note}
              </Note>
            }
            image={{ src: howestPrime, alt: s.prime.alt, ratio: '1682 / 1280' }}
          />

          <Feature
            id="futbol-title"
            meta={s.futbol.meta}
            title={s.futbol.title}
            text={s.futbol.text}
            stack={['ASP.NET', 'Blazor', 'PostgreSQL', 'Docker']}
            note={
              <Note size="md" style={{ right: -10, top: -26, transform: 'rotate(4deg)' }}>
                {s.futbol.note}
              </Note>
            }
            image={{ src: futbololo, alt: s.futbol.alt, ratio: '1833 / 1053' }}
          />

          <div className="pf-cards mt-12">
            <ProjectCard title={s.webshop.title} summary={s.webshop.summary} stack={['Java', 'Vue.js']} meta={s.webshop.meta} headingLevel={4} />
            <ProjectCard
              title={s.jobs.title}
              summary={s.jobs.summary}
              stack={['Deno', 'Next.js', 'Neon PostgreSQL', 'Supabase Auth']}
              meta={s.jobs.meta}
              headingLevel={4}
            />
          </div>
        </div>

        <div className="mt-24">
          <h3 className="pf-sub">{s.eventsTitle}</h3>
          <ul className="pf-events">
            {t.events.map((e) => (
              <li key={e.title} className="pf-event">
                <span className="pf-event-when">{e.when}</span>
                <div>
                  <h4 className="pf-event-title">{e.title}</h4>
                  <p className="pf-event-text">{e.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StudiesSection;
