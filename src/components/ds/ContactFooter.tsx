import { cx, isExternal, type HeadingLevel } from './utils';
import { Heading, NewTabNote } from './Primitives';

export type FooterLink = { label: string; href: string };

type ContactFooterProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  email?: string;
  links?: FooterLink[];
  note?: string;
  headingLevel?: HeadingLevel;
  className?: string;
};

const ContactFooter = ({
  eyebrow,
  title,
  text,
  email,
  links = [],
  note = '',
  headingLevel = 2,
  className,
}: ContactFooterProps) => (
  <footer className={cx('ap-footer', className)}>
    {eyebrow && <p className="ap-eyebrow">{eyebrow}</p>}
    <Heading level={headingLevel} className="ap-h1">
      {title}
    </Heading>
    {text && <p className="ap-footer-text">{text}</p>}
    {email && (
      <a className="ap-footer-mail" href={`mailto:${email}`}>
        {email}
      </a>
    )}
    <div className="ap-footer-bottom">
      <span>{note}</span>
      {links.length > 0 && (
        <ul className="ap-footer-links">
          {links.map((l) => {
            const ext = isExternal(l.href);
            return (
              <li key={l.href}>
                <a href={l.href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {l.label}
                  {ext && <NewTabNote />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  </footer>
);

export default ContactFooter;
