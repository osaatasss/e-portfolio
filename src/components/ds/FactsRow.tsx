import { cx, isExternal } from './utils';
import { NewTabNote } from './Primitives';

export type Fact = { label: string; value: string; href?: string };

const FactsRow = ({ facts, className }: { facts: Fact[]; className?: string }) => (
  <dl className={cx('ap-facts', className)}>
    {facts.map((f) => {
      const ext = !!f.href && isExternal(f.href);
      return (
        <div key={f.label} className="ap-fact">
          <dt>{f.label}</dt>
          <dd>
            {f.href ? (
              <a href={f.href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {f.value}
                {ext && <NewTabNote />}
              </a>
            ) : (
              f.value
            )}
          </dd>
        </div>
      );
    })}
  </dl>
);

export default FactsRow;
