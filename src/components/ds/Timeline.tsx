import Tag from './Tag';
import { cx, type HeadingLevel } from './utils';
import { Heading } from './Primitives';

export type Era = { label: string; title: string; text?: string; items?: string[]; current?: boolean };

const Timeline = ({ eras, headingLevel = 3, className }: { eras: Era[]; headingLevel?: HeadingLevel; className?: string }) => (
  <ol className={cx('ap-tl', className)}>
    {eras.map((e) => (
      <li key={e.label + e.title} className={cx('ap-tl-era', e.current && 'is-current')} aria-current={e.current ? 'step' : undefined}>
        <div className="ap-tl-when">{e.label}</div>
        <div className="ap-tl-body">
          <Heading level={headingLevel} className="ap-tl-title">
            {e.title}
          </Heading>
          {e.text && <p className="ap-tl-text">{e.text}</p>}
          {e.items && e.items.length > 0 && (
            <ul className="ap-tl-items">
              {e.items.map((it) => (
                <li key={it}>
                  <Tag kind="stack">{it}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </li>
    ))}
  </ol>
);

export default Timeline;
