import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useI18n } from '../../i18n/context';

type FrameVideoProps = {
  src: string;
  poster: string;
  label: string;
  style?: CSSProperties;
};

const prefersReducedMotion = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const FrameVideo = ({ src, poster, label, style }: FrameVideoProps) => {
  const { t } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !userPaused.current) video.play().catch(() => {});
        else if (!entry?.isIntersecting) video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        className="ap-frame-media"
        style={style}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t.common.pauseVideo : t.common.playVideo}
        className="absolute bottom-2 left-2 grid size-8 cursor-pointer place-items-center rounded-full border-0 bg-chalkboard-frame/85 text-chalk transition-colors hover:bg-chalkboard-frame"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" fill="currentColor">
          {playing ? <path d="M4 2.5h2.5v11H4zM9.5 2.5H12v11H9.5z" /> : <path d="M4.5 2.2v11.6L13.5 8z" />}
        </svg>
      </button>
    </div>
  );
};

export default FrameVideo;
