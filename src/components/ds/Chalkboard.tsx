import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../../i18n/context';
import { cx, type HeadingLevel } from './utils';
import { Heading } from './Primitives';

export type ChalkStep = { text: string; note?: string; items?: string[] };

type ChalkboardProps = {
  eyebrow?: string;
  title: string;
  steps: ChalkStep[];
  footnote?: string;
  headingLevel?: HeadingLevel;
  animate?: boolean;
  /** Steps shown at once. More than this adds a button that wipes the board and writes the next ones. */
  pageSize?: number;
  className?: string;
};

const STEP_START = 600;
const STEP_GAP = 450;
const PAGE_START = 200;
const PAGE_GAP = 650;
const SPONGE_W = 120;
const SPONGE_H = 70;
const MAX_PASSES = 6;
/** Room left above the steps for the sticky header when the board is scrolled into view. */
const TOP_OFFSET = 96;

const timing = (delay: number, duration?: number) =>
  ({ '--ap-delay': `${delay}ms`, ...(duration ? { '--ap-dur': `${duration}ms` } : {}) }) as CSSProperties;

const writeDuration = (text: string) => Math.min(1100, Math.max(350, text.length * 2.4));

const prefersReducedMotion = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const Sponge = () => (
  <svg viewBox="0 0 120 70" width={SPONGE_W} height={SPONGE_H} aria-hidden="true">
    <rect x="4" y="8" width="112" height="56" rx="13" fill="#e9b949" />
    <rect x="4" y="8" width="112" height="40" rx="13" fill="#f4cd62" />
    <rect x="4" y="50" width="112" height="14" rx="7" fill="#c8932e" />
    {[
      [18, 20, 2.6],
      [34, 32, 2],
      [50, 18, 3],
      [66, 34, 2.2],
      [82, 22, 2.8],
      [98, 36, 2],
      [26, 42, 1.8],
      [74, 44, 1.6],
      [104, 18, 1.8],
      [58, 42, 1.5],
    ].map(([x, y, r]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#c8932e" opacity=".75" />
    ))}
  </svg>
);

const Chalkboard = ({ eyebrow, title, steps, footnote, headingLevel = 3, animate = true, pageSize, className }: ChalkboardProps) => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const spongeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const wipeRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTimer = useRef<number | undefined>(undefined);
  const lastPage = useRef(0);
  const [page, setPage] = useState(0);
  const [wiping, setWiping] = useState(false);

  const fid = `ap-chalk-${useId().replace(/[^A-Za-z0-9_-]/g, '')}`;
  const rough = `url(#${fid})`;
  const size = pageSize && pageSize < steps.length ? pageSize : steps.length;
  const pageCount = Math.max(1, Math.ceil(steps.length / size));
  const paged = pageCount > 1;
  const current = Math.min(page, pageCount - 1);
  const first = current * size;
  const pageSteps = steps.slice(first, first + size);
  const isLast = current === pageCount - 1;
  const start = current === 0 ? STEP_START : PAGE_START;
  const gap = paged ? PAGE_GAP : STEP_GAP;
  const footAt = start + pageSteps.length * gap + 100;
  const range = pageSteps.length > 1 ? `${first + 1}–${first + pageSteps.length}` : `${first + 1}`;
  const status = t.common.boardStatus.replace('{range}', range).replace('{total}', String(steps.length));

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    el.classList.add('is-armed');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add('is-drawn');
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -25% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove('is-armed', 'is-drawn');
    };
  }, [animate]);

  useEffect(() => {
    if (lastPage.current === current) return;
    lastPage.current = current;
    ScrollTrigger.refresh();
  }, [current]);

  useEffect(
    () => () => {
      wipeRef.current?.kill();
      window.clearTimeout(scrollTimer.current);
    },
    [],
  );

  /** The new steps start at the top of the board, so a board taller than the screen is scrolled up to them first. */
  const goTo = (next: number) => {
    const area = areaRef.current;
    if (wiping || !area) return;
    const reduce = !animate || prefersReducedMotion();
    const top = area.getBoundingClientRect().top;
    const needsScroll = top < TOP_OFFSET - 8;
    if (reduce) {
      setPage(next);
      if (needsScroll) window.scrollTo({ top: window.scrollY + top - TOP_OFFSET, behavior: 'auto' });
      return;
    }
    setWiping(true);
    if (!needsScroll) {
      wipeTo(next);
      return;
    }
    window.scrollTo({ top: window.scrollY + top - TOP_OFFSET, behavior: 'smooth' });
    scrollTimer.current = window.setTimeout(() => wipeTo(next), 550);
  };

  const wipeTo = (next: number) => {
    const board = ref.current;
    const area = areaRef.current;
    const sponge = spongeRef.current;
    const trail = trailRef.current;
    if (!board || !area || !sponge || !trail) {
      setPage(next);
      setWiping(false);
      return;
    }
    const box = board.getBoundingClientRect();
    const ox = box.left + board.clientLeft;
    const oy = box.top + board.clientTop;
    const a = area.getBoundingClientRect();
    const ax = a.left - ox;
    const ay = a.top - oy;
    const rows = Math.min(MAX_PASSES, Math.max(2, Math.ceil(a.height / (SPONGE_H * 1.15))));
    const spacing = (a.height - SPONGE_H * 0.5) / (rows - 1);
    const band = Math.max(SPONGE_H * 0.55, spacing / 2 + 4);
    const xLeft = ax - SPONGE_W * 0.3;
    const xRight = ax + a.width - SPONGE_W * 0.7;
    const rowY = (r: number) => ay - SPONGE_H * 0.25 + ((a.height - SPONGE_H * 0.5) * r) / (rows - 1);
    const pass = Math.min(0.45, Math.max(0.28, a.width / 2200));
    const drop = 0.12;

    const tl = gsap.timeline({
      onComplete: () => {
        trail.replaceChildren();
        gsap.set(sponge, { autoAlpha: 0 });
        setWiping(false);
      },
    });
    wipeRef.current = tl;

    gsap.set(sponge, { x: xLeft - 60, y: rowY(0) - 40, rotate: -14, autoAlpha: 0 });
    tl.to(sponge, { x: xLeft, y: rowY(0), rotate: -4, autoAlpha: 1, duration: 0.25, ease: 'power2.out' });

    const passes: Array<{ y: number; x0: number; x1: number; t0: number }> = [];
    let at = 0.25;
    let fromLeft = true;
    for (let r = 0; r < rows; r += 1) {
      const y = rowY(r);
      if (r > 0) {
        tl.to(sponge, { y, rotate: fromLeft ? -5 : 5, duration: drop, ease: 'sine.inOut' }, at);
        at += drop;
      }
      const x0 = fromLeft ? xLeft : xRight;
      const x1 = fromLeft ? xRight : xLeft;
      tl.to(sponge, { x: x1, rotate: fromLeft ? 4 : -4, duration: pass, ease: 'none' }, at);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(x0 + SPONGE_W / 2));
      line.setAttribute('x2', String(x1 + SPONGE_W / 2));
      line.setAttribute('y1', String(y + SPONGE_H / 2));
      line.setAttribute('y2', String(y + SPONGE_H / 2));
      line.setAttribute('stroke-width', String(Math.max(SPONGE_H * 0.95, band * 2)));
      line.setAttribute('pathLength', '1');
      line.style.strokeDasharray = '1';
      line.style.strokeDashoffset = '1';
      trail.appendChild(line);
      tl.to(line, { strokeDashoffset: 0, duration: pass, ease: 'none' }, at);

      passes.push({ y: y + SPONGE_H / 2, x0: x0 + SPONGE_W / 2, x1: x1 + SPONGE_W / 2, t0: at });
      at += pass;
      fromLeft = !fromLeft;
    }

    const reachAt = (p: (typeof passes)[number], x: number) => p.t0 + pass * clamp01((x - p.x0) / (p.x1 - p.x0));
    area.querySelectorAll<HTMLElement>('.ap-step-n, .ap-step-text, .ap-step-note, .ap-step-items > li, .ap-step-arrow, .ap-board-foot').forEach((el) => {
      const r = el.getBoundingClientRect();
      const cx = r.left - ox + r.width / 2;
      const top = r.top - oy;
      const bottom = r.bottom - oy;
      let hits = passes.filter((p) => p.y + band >= top && p.y - band <= bottom);
      if (!hits.length) hits = [passes.reduce((best, p) => (Math.abs(p.y - (top + bottom) / 2) < Math.abs(best.y - (top + bottom) / 2) ? p : best))];
      const t0 = reachAt(hits[0], cx);
      if (el.classList.contains('ap-step-arrow')) {
        tl.to(el, { autoAlpha: 0, duration: 0.15 }, t0);
        return;
      }
      // Erased band by band: each pass of the sponge clears the part of the element it covers.
      const height = Math.max(1, bottom - top);
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
      hits.forEach((p, k) => {
        const cut = k === hits.length - 1 ? 100 : clamp01((p.y + band - top) / height) * 100;
        tl.to(el, { clipPath: `inset(${cut}% 0% 0% 0%)`, duration: 0.14, ease: 'none' }, Math.max(0, reachAt(p, cx) - 0.07));
      });
    });

    tl.call(() => setPage(next), [], at + 0.05);
    tl.to(sponge, { x: fromLeft ? xLeft - 80 : xRight + 80, y: `+=${SPONGE_H}`, rotate: fromLeft ? -16 : 16, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, at);
    tl.to(Array.from(trail.children), { opacity: 0, duration: 0.9, ease: 'power1.out' }, at + 0.1);
  };

  return (
    <section
      ref={ref}
      className={cx('ap-board', className)}
      data-steps={pageSteps.length}
      style={{ '--ap-steps': pageSteps.length || 1 } as CSSProperties}
      aria-labelledby={`${fid}-t`}
    >
      <svg className="ap-board-svgdefs" aria-hidden="true" focusable="false">
        <filter id={fid} x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves={1} seed={3} result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={2.2} />
        </filter>
      </svg>
      <div className="ap-board-inner">
        {eyebrow && <p className="ap-board-eyebrow">{eyebrow}</p>}
        <Heading level={headingLevel} id={`${fid}-t`} className="ap-chalk ap-board-title">
          <span className="ap-write" style={{ display: 'inline-block', filter: rough, ...timing(0, 600) }}>
            {title}
          </span>
          <svg className="ap-underline" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
            <path className="ap-draw" pathLength={1} filter={rough} style={timing(550)} d="M2 10 C 50 4, 120 14, 198 6" />
          </svg>
        </Heading>
        <div ref={areaRef}>
          <div key={current}>
            <ol className="ap-steps" start={first + 1}>
              {pageSteps.map((s, i) => {
                const n = first + i + 1;
                const stepAt = start + i * gap;
                const noteAt = stepAt + 320;
                const noteDur = s.note ? writeDuration(s.note) : 0;
                return (
                  <li key={n} className="ap-step ap-chalk">
                    <span className="ap-step-n" aria-hidden="true">
                      <svg viewBox="0 0 56 56">
                        <ellipse className="ap-draw" pathLength={1} filter={rough} cx={28} cy={28} rx={25} ry={22} transform="rotate(-8 28 28)" style={timing(stepAt)} />
                      </svg>
                      <span className="ap-write" style={timing(stepAt + 80, 200)}>
                        {n}
                      </span>
                    </span>
                    <span className="ap-step-text">
                      <span className="ap-write" style={timing(stepAt + 180, 400)}>
                        {s.text}
                      </span>
                    </span>
                    {s.note && (
                      <span className="ap-step-note">
                        <span className="ap-write" style={timing(noteAt, noteDur)}>
                          {s.note}
                        </span>
                      </span>
                    )}
                    {s.items && s.items.length > 0 && (
                      <ul className="ap-step-items">
                        {s.items.map((item, k) => (
                          <li key={item}>
                            <span className="ap-write" style={timing(noteAt + noteDur * 0.6 + k * 110, 300)}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {i < pageSteps.length - 1 && (
                      <span className="ap-step-arrow ap-write" aria-hidden="true" style={timing(stepAt + 400, 250)}>
                        <svg viewBox="0 0 24 16">
                          <path filter={rough} d="M1 9 C 8 7, 15 8, 22 8 M16 2 L22 8 L16 14" />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            {footnote && (!paged || isLast) && (
              <p className="ap-chalk ap-board-foot">
                <span className="ap-write" style={timing(footAt, 600)}>
                  {footnote}
                </span>
              </p>
            )}
          </div>
        </div>
        {paged && (
          <div className="ap-board-nav">
            <span className="ap-board-page" aria-hidden="true">
              {current + 1} / {pageCount}
            </span>
            <button type="button" className="ap-board-more ap-chalk" disabled={wiping} onClick={() => goTo(isLast ? 0 : current + 1)}>
              {isLast ? t.common.boardRestart : t.common.boardMore}
              <span aria-hidden="true">{isLast ? ' ↺' : ' →'}</span>
            </button>
            <p className="ap-sr" aria-live="polite">
              {status}
            </p>
          </div>
        )}
      </div>
      {paged && (
        <>
          <svg ref={trailRef} className="ap-board-trail" aria-hidden="true" focusable="false" />
          <div ref={spongeRef} className="ap-sponge" aria-hidden="true">
            <Sponge />
          </div>
        </>
      )}
    </section>
  );
};

export default Chalkboard;
