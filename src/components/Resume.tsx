const Resume = () => (
  <section id="resume" className="py-[80px]">
    <div className="max-w-[1180px] mx-auto px-8 flex flex-col items-start gap-7">

      <h2
        className="font-display font-black uppercase leading-[0.9] tracking-[-0.02em]"
        style={{ fontSize: 'clamp(40px, 8vw, 108px)' }}
      >
        Take the<br />
        <span className="text-outline">whole</span> file.
      </h2>

      <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-ink-soft">
        One page. PDF. No surprises.
      </p>

      <div className="flex gap-[14px] flex-wrap">
        <a href="/cv.pdf" className="btn-solid" download="Robert_Apostol_CV.pdf" aria-label="Download résumé PDF">
          Download CV <span className="arr">↓</span>
        </a>
        <a href="mailto:robert.apostol11@gmail.com" className="btn-ghost" aria-label="Send email">
          Email me <span className="arr">→</span>
        </a>
      </div>

    </div>
  </section>
);

export default Resume;
