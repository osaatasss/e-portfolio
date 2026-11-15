import { useEffect, type RefObject } from 'react';

/**
 * Draws how far down the page the reader is onto a ring (`pathLength="1"`), and marks the host
 * with `is-read` at the bottom. Writes to the DOM directly so scrolling never re-renders React.
 */
const useReadProgress = (ring: RefObject<SVGCircleElement | null>, host: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    let frame = 0;
    let atEnd = false;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ring.current?.style.setProperty('stroke-dashoffset', String(1 - progress));
      const end = progress >= 0.995;
      if (end !== atEnd) {
        atEnd = end;
        host.current?.classList.toggle('is-read', end);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const grows = new ResizeObserver(schedule);
    grows.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      grows.disconnect();
    };
  }, [ring, host]);
};

export default useReadProgress;
