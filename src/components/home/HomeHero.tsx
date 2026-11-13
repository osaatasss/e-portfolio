import Button from '../ds/Button';
import FactsRow from '../ds/FactsRow';
import Figure from '../ds/Figure';
import { HlText, Note, Sticker } from '../layout/Decor';
import Doodle from '../layout/Doodle';
import { DeviceCaption, Phone } from '../layout/Stage';
import { CV_HREF, SOCIAL } from '../../config/routes';
import { heroFacts } from '../../data/home';
import { useI18n } from '../../i18n/context';
import balkanPhone from '../../assets/screens/balkan-donner-phone.webp';
import olisPhone from '../../assets/screens/olis-house-phone.webp';
import serveopsLaptop from '../../assets/screens/serveops-laptop.webp';

const HomeHero = () => {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section className="pf-wrap pf-hero" aria-labelledby="hero-title">
      <Doodle shape="sparkle" tone="tomato" width={56} height={56} style={{ right: '4%', top: 56 }} />
      <Doodle shape="plus" smHide width={20} height={20} style={{ right: '12%', top: 150 }} />
      <Doodle shape="code" smHide width={72} height={52} style={{ right: '6%', top: 330 }} />
      <Doodle shape="cursor" smHide width={34} height={40} style={{ right: '22%', top: 460 }} />

      <p className="ap-eyebrow">{h.eyebrow}</p>
      <h1 id="hero-title" className="ap-display-xl max-w-[15ch]">
        <HlText parts={h.title} />
      </h1>
      <p className="pf-hero-intro">{h.intro}</p>
      <div className="pf-actions">
        <div className="pf-actions-btns">
          <Button variant="primary" href="#work">
            {h.seeWork}
          </Button>
          <Button variant="quiet" href="#contact">
            {h.getInTouch}
          </Button>
        </div>
        <Button variant="link" href={CV_HREF}>
          {t.common.downloadCv}
        </Button>
      </div>
      <p className="mt-6 inline-flex items-center gap-2 rounded-pill bg-forest-soft px-4 py-2 text-sm font-semibold text-forest">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full rounded-pill bg-forest opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-pill bg-forest" />
        </span>
        {h.status}
      </p>

      <div className="pf-stage">
        <Doodle shape="wave" width={120} height={24} style={{ left: '8%', top: -6 }} />
        <Doodle shape="sparkle" tone="forest" width={36} height={36} style={{ right: '10%', top: -18 }} />
        <p className="pf-stage-above">{h.stageAbove}</p>
        <p className="pf-stage-word" aria-hidden="true">
          {h.stageWord}
          <span className="pf-dot">.</span>
        </p>
        <Note size="xl" style={{ right: '3%', bottom: '16%' }}>
          {h.note}
        </Note>
        <div className="pf-devices">
          <div className="pf-dev">
            <Sticker style={{ top: -12, right: 4 }}>{h.live}</Sticker>
            <Phone src={olisPhone} alt={h.devices.olisAlt} />
            <DeviceCaption name="Oli's House" href={SOCIAL.olis} role={h.devices.olisRole} />
          </div>
          <div className="pf-dev pf-dev-main">
            <Sticker tone="forest" style={{ top: 52, left: -14, transform: 'rotate(-7deg)' }}>
              {h.ownSaas}
            </Sticker>
            <Figure src={serveopsLaptop} url="serveops.be" ratio="16 / 10" alt={h.devices.serveopsAlt} width={1200} height={750} />
            <DeviceCaption name="ServeOps" href={SOCIAL.serveops} role={h.devices.serveopsRole} />
          </div>
          <div className="pf-dev">
            <Sticker style={{ top: -12, left: 4, transform: 'rotate(-8deg)' }}>{h.live}</Sticker>
            <Phone src={balkanPhone} alt={h.devices.balkanAlt} />
            <DeviceCaption name="Balkan Donner" href={SOCIAL.balkan} role={h.devices.balkanRole} />
          </div>
        </div>
      </div>

      <div className="mt-24">
        <FactsRow facts={heroFacts(t)} />
      </div>
    </section>
  );
};

export default HomeHero;
