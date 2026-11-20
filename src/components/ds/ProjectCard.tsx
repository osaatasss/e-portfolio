import Button from './Button';
import Tag, { type TagKind } from './Tag';
import { cx, hostOf, type HeadingLevel } from './utils';
import { Heading, NewTabNote, SrOnly } from './Primitives';
import { useI18n } from '../../i18n/context';

type ProjectCardProps = {
  title: string;
  kind?: Exclude<TagKind, 'stack'>;
  meta?: string;
  summary?: string;
  stack?: string[];
  url?: string;
  caseStudyHref?: string;
  headingLevel?: HeadingLevel;
  className?: string;
};

const ProjectCard = ({ title, kind = 'website', meta, summary, stack = [], url, caseStudyHref, headingLevel = 3, className }: ProjectCardProps) => {
  const { t } = useI18n();
  const main = caseStudyHref ?? url;
  const mainIsExternal = !caseStudyHref && !!url;

  return (
    <article className={cx('ap-card', main && 'is-linked', className)}>
      <div className="ap-card-top">
        <Tag kind={kind} />
        {meta && <span className="ap-card-meta">{meta}</span>}
      </div>
      <div>
        <Heading level={headingLevel} className="ap-h2 ap-card-title">
          {main ? (
            <a href={main} {...(mainIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {title}
              {mainIsExternal && <NewTabNote />}
            </a>
          ) : (
            title
          )}
        </Heading>
        {summary && <p className="ap-card-summary">{summary}</p>}
      </div>
      {stack.length > 0 && (
        <ul className="ap-card-stack" aria-label={t.common.builtWith}>
          {stack.map((s) => (
            <li key={s}>
              <Tag kind="stack">{s}</Tag>
            </li>
          ))}
        </ul>
      )}
      {(url || caseStudyHref) && (
        <div className="ap-card-foot ap-row">
          {caseStudyHref && (
            <Button variant="link" href={caseStudyHref}>
              {t.common.howIBuiltIt}
              <SrOnly>{` ${title}`}</SrOnly>
            </Button>
          )}
          {url && (
            <Button variant="link" href={url} external>
              {hostOf(url)}
            </Button>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
