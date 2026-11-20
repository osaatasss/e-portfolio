import type { ReactNode } from 'react';
import { useI18n } from '../../i18n/context';
import { cx } from './utils';

export type TagKind = 'stack' | 'website' | 'saas' | 'automation';

type TagProps = {
  kind?: TagKind;
  className?: string;
  children?: ReactNode;
};

const Tag = ({ kind = 'stack', className, children }: TagProps) => {
  const { t } = useI18n();
  if (kind === 'stack') return <span className={cx('ap-tag ap-tag-stack', className)}>{children}</span>;
  return <span className={cx('ap-tag', className)}>{children ?? t.tags[kind]}</span>;
};

export default Tag;
