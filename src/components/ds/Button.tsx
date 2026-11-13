import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from './utils';
import { NewTabNote } from './Primitives';

type ButtonProps = {
  variant?: 'primary' | 'quiet' | 'link';
  href?: string;
  external?: boolean;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  children: ReactNode;
};

const Button = ({ variant = 'primary', href, external = false, arrow, disabled = false, className, onClick, children }: ButtonProps) => {
  const showArrow = arrow ?? (variant === 'link' || external);
  const cls = cx('ap-btn', `ap-btn-${variant}`, className);
  const content = (
    <>
      <span className="ap-btn-label">{children}</span>
      {showArrow && (
        <span className="ap-arrow" aria-hidden="true">
          {external ? '↗' : '→'}
        </span>
      )}
      {external && <NewTabNote />}
    </>
  );

  if (href) {
    if (disabled) {
      return (
        <a className={cls} role="link" aria-disabled="true">
          {content}
        </a>
      );
    }
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cls} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
