import type { ReactNode } from 'react';
import { cx } from './utils';

const Prose = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cx('ap-prose', className)}>{children}</div>
);

export default Prose;
