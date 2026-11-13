import Button from '../ds/Button';
import Prose from '../ds/Prose';
import Tag from '../ds/Tag';
import { BorderWord, HlText } from '../layout/Decor';
import Doodle from '../layout/Doodle';
import { CV_HREF } from '../../config/routes';
import { stackGroups } from '../../data/home';
import { useI18n } from '../../i18n/context';

const AboutSection = () => {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" className="pf-section pf-band" aria-labelledby="about-title">
      <BorderWord word={a.word} side="right" />
      <div className="pf-wrap pf-two">
        <Doodle shape="ball" width={60} height={60} style={{ left: '34%', top: -36 }} />
        <Doodle shape="mug" smHide width={52} height={56} style={{ right: '2%', bottom: -40 }} />
        <div>
          <p className="ap-eyebrow">{a.eyebrow}</p>
          <h2 id="about-title" className="ap-h1 mb-8">
            <HlText parts={a.title} />
          </h2>
          <Prose>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>
              <strong>{a.p3.strong}</strong>
              {a.p3.rest}
            </p>
          </Prose>
        </div>
        <div>
          <h3 className="pf-sub">{a.stackTitle}</h3>
          {stackGroups(t).map((group) => (
            <div key={group.label} className="pf-stack-group">
              <p className="pf-stack-label">{group.label}</p>
              <ul className="pf-chips">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag kind="stack">{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pf-stack-group">
            <p className="pf-stack-label">{a.languagesLabel}</p>
            <p className="pf-langs">{a.languages}</p>
          </div>
          <div className="mt-8">
            <Button variant="quiet" href={CV_HREF}>
              {t.common.downloadCv}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
