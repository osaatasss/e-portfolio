import type { HTMLAttributes } from 'react';
import { useI18n } from '../../i18n/context';
import type { HeadingLevel } from './utils';

export const SrOnly = ({ children }: { children: string }) => <span className="ap-sr">{children}</span>;

export const NewTabNote = () => {
  const { t } = useI18n();
  return <SrOnly>{t.common.newTab}</SrOnly>;
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & { level: HeadingLevel };

export const Heading = ({ level, ...rest }: HeadingProps) => {
  const Tag = `h${level}` as const;
  return <Tag {...rest} />;
};
