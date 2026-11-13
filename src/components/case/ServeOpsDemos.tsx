import { useState } from 'react';
import Figure from '../ds/Figure';
import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/langs';
import menuEn from '../../assets/videos/serveops-menu-en.mp4';
import menuEnPoster from '../../assets/videos/serveops-menu-en.webp';
import menuNl from '../../assets/videos/serveops-menu-nl.mp4';
import menuNlPoster from '../../assets/videos/serveops-menu-nl.webp';
import menuRo from '../../assets/videos/serveops-menu-ro.mp4';
import menuRoPoster from '../../assets/videos/serveops-menu-ro.webp';
import ordersEn from '../../assets/videos/serveops-orders-en.mp4';
import ordersEnPoster from '../../assets/videos/serveops-orders-en.webp';
import ordersNl from '../../assets/videos/serveops-orders-nl.mp4';
import ordersNlPoster from '../../assets/videos/serveops-orders-nl.webp';
import ordersRo from '../../assets/videos/serveops-orders-ro.mp4';
import ordersRoPoster from '../../assets/videos/serveops-orders-ro.webp';
import reservationsEn from '../../assets/videos/serveops-reservations-en.mp4';
import reservationsEnPoster from '../../assets/videos/serveops-reservations-en.webp';
import reservationsNl from '../../assets/videos/serveops-reservations-nl.mp4';
import reservationsNlPoster from '../../assets/videos/serveops-reservations-nl.webp';
import reservationsRo from '../../assets/videos/serveops-reservations-ro.mp4';
import reservationsRoPoster from '../../assets/videos/serveops-reservations-ro.webp';

type DemoId = 'orders' | 'menu' | 'reservations';
type Clip = { src: string; poster: string };

// Rendered from the ServeOps repo (`npm run video:render:demos`), one clip per scene and language.
const DEMOS: Array<{ id: DemoId; url: string; clips: Record<Lang, Clip> }> = [
  {
    id: 'orders',
    url: 'serveops.be/orders',
    clips: {
      en: { src: ordersEn, poster: ordersEnPoster },
      nl: { src: ordersNl, poster: ordersNlPoster },
      ro: { src: ordersRo, poster: ordersRoPoster },
    },
  },
  {
    id: 'menu',
    url: 'serveops.be/menu',
    clips: {
      en: { src: menuEn, poster: menuEnPoster },
      nl: { src: menuNl, poster: menuNlPoster },
      ro: { src: menuRo, poster: menuRoPoster },
    },
  },
  {
    id: 'reservations',
    url: 'serveops.be/reservations',
    clips: {
      en: { src: reservationsEn, poster: reservationsEnPoster },
      nl: { src: reservationsNl, poster: reservationsNlPoster },
      ro: { src: reservationsRo, poster: reservationsRoPoster },
    },
  },
];

/** The management tool's three demos behind tabs. Each clip plays on to the next when it ends. */
const ServeOpsDemos = ({ caption }: { caption: string }) => {
  const { lang, t } = useI18n();
  const copy = t.caseStudy.demos;
  const [active, setActive] = useState(0);
  const demo = DEMOS[active];
  const clip = demo.clips[lang];

  return (
    <div>
      <ul className="pf-tabs" aria-label={copy.label}>
        {DEMOS.map((d, i) => {
          const on = i === active;
          return (
            <li key={d.id}>
              <button type="button" className={on ? 'pf-tab is-on' : 'pf-tab'} aria-pressed={on} onClick={() => setActive(i)}>
                {copy[d.id].tab}
              </button>
            </li>
          );
        })}
      </ul>
      <Figure
        video={{ ...clip, onEnded: () => setActive((i) => (i + 1) % DEMOS.length) }}
        url={demo.url}
        ratio="16 / 10"
        alt={copy[demo.id].alt}
        caption={caption}
      />
    </div>
  );
};

export default ServeOpsDemos;
