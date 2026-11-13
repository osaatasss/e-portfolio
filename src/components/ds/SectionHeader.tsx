import type { ReactNode } from 'react';
import { cx, type HeadingLevel } from './utils';
import { Heading } from './Primitives';

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  titleId?: string;
  intro?: string;
  size?: 'md' | 'lg';
  level?: HeadingLevel;
  className?: string;
};

const SectionHeader = ({ eyebrow, title, titleId, intro, size = 'md', level, className }: SectionHeaderProps) => {
  const lg = size === 'lg';
  return (
    <div className={cx('ap-sh', className)}>
      {eyebrow && <p className="ap-eyebrow">{eyebrow}</p>}
      <Heading level={level ?? (lg ? 1 : 2)} id={titleId} className={lg ? 'ap-display-lg' : 'ap-h1'}>
        {title}
      </Heading>
      {intro && <p className="ap-sh-intro">{intro}</p>}
    </div>
  );
};

export default SectionHeader;
