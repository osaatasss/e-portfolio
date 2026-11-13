import { useId, useLayoutEffect, useRef, type CSSProperties } from 'react';
import { cx, type HeadingLevel } from './utils';
import { Heading } from './Primitives';

export type ChalkStep = { text: string; note?: string };

type ChalkboardProps = {
  eyebrow?: string;
  title: string;
  steps: ChalkStep[];
  footnote?: string;
  headingLevel?: HeadingLevel;
  animate?: boolean;
  className?: string;
};

const STEP_START = 600;
const STEP_GAP = 450;

const timing = (delay: number, duration?: number) =>
  ({ '--ap-delay': `${delay}ms`, ...(duration ? { '--ap-dur': `${duration}ms` } : {}) }) as CSSProperties;

const Chalkboard = ({ eyebrow, title, steps, footnote, headingLevel = 3, animate = true, className }: ChalkboardProps) => {
  const ref = useRef<HTMLElement>(null);
  const fid = `ap-chalk-${useId().replace(/[^A-Za-z0-9_-]/g, '')}`;
  const rough = `url(#${fid})`;
  const footAt = STEP_START + steps.length * STEP_GAP + 100;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
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

  return (
    <section
      ref={ref}
      className={cx('ap-board', className)}
      data-steps={steps.length}
      style={{ '--ap-steps': steps.length || 1 } as CSSProperties}
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
        <ol className="ap-steps">
          {steps.map((s, i) => {
            const at = STEP_START + i * STEP_GAP;
            return (
              <li key={i} className="ap-step ap-chalk">
                <span className="ap-step-n" aria-hidden="true">
                  <svg viewBox="0 0 56 56">
                    <ellipse className="ap-draw" pathLength={1} filter={rough} cx={28} cy={28} rx={25} ry={22} transform="rotate(-8 28 28)" style={timing(at)} />
                  </svg>
                  <span className="ap-write" style={timing(at + 80, 200)}>
                    {i + 1}
                  </span>
                </span>
                <span className="ap-step-text">
                  <span className="ap-write" style={timing(at + 180, 400)}>
                    {s.text}
                  </span>
                </span>
                {s.note && (
                  <span className="ap-step-note">
                    <span className="ap-write" style={timing(at + 320, 350)}>
                      {s.note}
                    </span>
                  </span>
                )}
                {i < steps.length - 1 && (
                  <span className="ap-step-arrow ap-write" aria-hidden="true" style={timing(at + 400, 250)}>
                    <svg viewBox="0 0 24 16">
                      <path filter={rough} d="M1 9 C 8 7, 15 8, 22 8 M16 2 L22 8 L16 14" />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        {footnote && (
          <p className="ap-chalk ap-board-foot">
            <span className="ap-write" style={timing(footAt, 600)}>
              {footnote}
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Chalkboard;
