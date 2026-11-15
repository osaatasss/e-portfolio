import { useEffect, useState } from 'react';

/** A section counts as current once its top passes this share of the viewport height. */
const ACTIVE_LINE = 0.35;

/** Returns the in-page hash link (`#id`) whose section the reader is in, or null above the first one. */
const useActiveSection = (hrefs: string[]) => {
  const [active, setActive] = useState<string | null>(null);
  const key = hrefs.filter((h) => h.startsWith('#') && h.length > 1).join('|');

  useEffect(() => {
    if (!key) return;
    const links = key.split('|');
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVE_LINE;
      let current: string | null = null;
      for (const href of links) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key]);

  return active;
};

export default useActiveSection;
