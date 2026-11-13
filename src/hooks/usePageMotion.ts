import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MotionMode } from '../config/look';

gsap.registerPlugin(ScrollTrigger);

const setupStage = (stage: HTMLElement) => {
  const word = stage.querySelector<HTMLElement>('.pf-stage-word');
  const above = stage.querySelector<HTMLElement>('.pf-stage-above');
  const devices = stage.querySelector<HTMLElement>('.pf-devices');
  const note = stage.querySelector<HTMLElement>('.pf-note-xl');
  if (!word || !devices) return;

  const fontSize = parseFloat(window.getComputedStyle(word).fontSize) || 200;
  const lift = fontSize * 0.18;

  const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 85%', end: 'top 20%', scrub: 0.6 } });
  tl.fromTo([above, word].filter(Boolean), { y: -lift }, { y: 0, ease: 'none', duration: 1 }, 0)
    .fromTo(word, { scale: 1.04 }, { scale: 1, ease: 'none', duration: 1 }, 0)
    .fromTo(devices, { y: lift }, { y: 0, ease: 'none', duration: 1 }, 0);
  if (note) {
    tl.fromTo(note, { scale: 0.3, autoAlpha: 0, rotate: -20 }, { scale: 1, autoAlpha: 1, rotate: -6, ease: 'back.out(2)', duration: 0.4 }, 0.75);
  }

  const stageBox = stage.getBoundingClientRect();
  const stageMid = stageBox.left + stageBox.width / 2;
  gsap.utils.toArray<HTMLElement>('.pf-dev:not(.pf-dev-main)', stage).forEach((phone) => {
    const box = phone.getBoundingClientRect();
    const fromLeft = box.left + box.width / 2 < stageMid - 4;
    gsap.fromTo(
      phone,
      { x: () => (fromLeft ? -1 : 1) * window.innerWidth * 0.75, rotate: fromLeft ? -16 : 16 },
      {
        x: 0,
        rotate: 0,
        ease: 'power2.out',
        scrollTrigger: { trigger: phone, start: 'top bottom', end: 'top 55%', scrub: 0.8, invalidateOnRefresh: true },
      },
    );
  });
};

const setupBorderWords = (root: HTMLElement) => {
  gsap.utils.toArray<HTMLElement>('.pf-border-word', root).forEach((w) => {
    const bw = w.querySelector('.pf-bw');
    if (!bw) return;
    const dir = w.classList.contains('is-right') ? 1 : -1;
    gsap.fromTo(
      bw,
      { x: dir * 180 },
      { x: dir * -80, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
    );
  });

  gsap.utils.toArray<HTMLElement>('.pf-border-word .pf-dot, .pf-stage-word .pf-dot', root).forEach((dot) => {
    const ch = (dot.textContent ?? '').trim();
    const scrollTrigger = { trigger: dot, start: 'top 88%', toggleActions: 'play none none reverse' };
    if (ch === '?') {
      gsap.fromTo(
        dot,
        { rotate: -70, scale: 0.3, autoAlpha: 0 },
        { rotate: 0, scale: 1, autoAlpha: 1, duration: 1.3, delay: 0.4, ease: 'elastic.out(1, 0.32)', scrollTrigger },
      );
    } else if (ch === '.') {
      gsap.fromTo(dot, { y: -240, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.4, ease: 'bounce.out', scrollTrigger });
    } else {
      gsap.fromTo(dot, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, delay: 0.4, ease: 'back.out(3)', scrollTrigger });
    }
  });
};

const usePageMotion = (rootRef: RefObject<HTMLElement | null>, mode: MotionMode) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || mode === 'off') return;
    if (mode === 'auto' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const bar = root.querySelector('.pf-progress');
      if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

      const stage = root.querySelector<HTMLElement>('.pf-stage');
      if (stage) setupStage(stage);

      setupBorderWords(root);
    }, root);

    let cancelled = false;
    let userScrolled = false;
    const onUserScroll = () => {
      userScrolled = true;
    };
    window.addEventListener('wheel', onUserScroll, { passive: true, once: true });
    window.addEventListener('touchstart', onUserScroll, { passive: true, once: true });
    window.addEventListener('keydown', onUserScroll, { once: true });
    const startedAt = performance.now();
    const alignToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || userScrolled || performance.now() - startedAt > 2500) return;
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    };
    const refresh = () => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      alignToHash();
    };
    document.fonts?.ready.then(refresh);
    document.fonts?.addEventListener('loadingdone', refresh);
    window.addEventListener('load', refresh);
    const timer = window.setTimeout(refresh, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.fonts?.removeEventListener('loadingdone', refresh);
      window.removeEventListener('load', refresh);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchstart', onUserScroll);
      window.removeEventListener('keydown', onUserScroll);
      ctx.revert();
    };
  }, [rootRef, mode]);
};

export default usePageMotion;
