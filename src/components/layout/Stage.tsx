import Figure from '../ds/Figure';
import { NewTabNote } from '../ds/Primitives';

export const Phone = ({ alt, src }: { alt: string; src?: string }) => (
  <div className="pf-phone">
    <Figure frame={false} ratio="9 / 19" alt={alt} src={src} />
  </div>
);

export const DeviceCaption = ({ name, href, role }: { name: string; href: string; role: string }) => (
  <p className="pf-cap m-0">
    <a href={href} target="_blank" rel="noopener noreferrer">
      {name} ↗<NewTabNote />
    </a>
    <span>{role}</span>
  </p>
);
