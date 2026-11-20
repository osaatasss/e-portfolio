import Figure from '../ds/Figure';
import { NewTabNote } from '../ds/Primitives';

export const Phone = ({ alt, src }: { alt: string; src?: string }) => (
  <div className="pf-phone">
    <div className="pf-phone-body">
      <div className="pf-phone-screen">
        <span className="pf-phone-bar" aria-hidden="true">
          <span>9:41</span>
          <span className="pf-phone-batt" />
        </span>
        <Figure frame={false} ratio="9 / 17.6" alt={alt} src={src} />
      </div>
    </div>
  </div>
);

type LaptopProps = { alt: string; src?: string; width?: number; height?: number };

export const Laptop = ({ alt, src, width, height }: LaptopProps) => (
  <div className="pf-laptop">
    <div className="pf-laptop-lid">
      <Figure frame={false} ratio="16 / 10" alt={alt} src={src} width={width} height={height} />
    </div>
    <div className="pf-laptop-base" aria-hidden="true" />
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
