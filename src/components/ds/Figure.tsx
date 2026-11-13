import type { CSSProperties } from 'react';
import { useI18n } from '../../i18n/context';
import FrameVideo from './FrameVideo';
import { cx, hostOf } from './utils';

type FigureProps = {
  src?: string;
  video?: { src: string; poster: string };
  alt?: string;
  url?: string;
  ratio?: string;
  frame?: boolean;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
};

const Figure = ({ src, video, alt, url, ratio, frame = true, caption, width, height, className }: FigureProps) => {
  const { t } = useI18n();
  const style = ratio ? ({ '--ap-ratio': ratio } as CSSProperties) : undefined;

  return (
    <figure className={cx('ap-figure', !frame && 'is-plain', className)}>
      <div className="ap-frame">
        {frame && (
          <div className="ap-frame-bar" aria-hidden="true">
            <span className="ap-frame-url">{url ? hostOf(url) : ''}</span>
          </div>
        )}
        {video ? (
          <FrameVideo key={video.src} src={video.src} poster={video.poster} label={alt ?? ''} style={style} />
        ) : src ? (
          <img className="ap-frame-media" src={src} alt={alt ?? ''} loading="lazy" decoding="async" width={width} height={height} style={style} />
        ) : (
          <div className="ap-frame-media ap-frame-empty" role="img" aria-label={alt || t.common.screenshotPlaceholder} style={style}>
            {alt || t.common.screenshotHere}
          </div>
        )}
      </div>
      {caption && <figcaption className="ap-figcaption">{caption}</figcaption>}
    </figure>
  );
};

export default Figure;
