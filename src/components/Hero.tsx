const META_CELLS = [
  { lab: 'Discipline', val: 'APIs and Frontends'          },
  { lab: 'Currently',  val: 'Looking for a job as a full-stack developer'   },
  { lab: 'Status',     val: 'Open to job offers'             },
];

const Hero = () => (
  <header className="py-[60px] pb-[50px] border-b-2 border-ink">
    <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 gap-[34px]">

      <div>
        <div className="font-mono text-[12px] tracking-[0.14em] uppercase text-rust mb-[18px]">
          Junior Software Engineer · Full-stack
        </div>
        <h1
          className="font-display font-black uppercase leading-[0.9] tracking-[-0.02em] text-ink"
          style={{ fontSize: 'clamp(54px, 11vw, 150px)' }}
        >
          Robert<br />
          Mihai<br />
          <span className="text-rust">Apostol</span>
        </h1>
      </div>

      <p
        className="rv text-ink"
        style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.32, maxWidth: '30ch' }}
      >
        Full-Stack Engineer with a passion for solving real-world problems by building <em className="text-rust italic">resilient, maintainable software.</em> <br/>
        From complex backend plumbing to intuitive frontends, I design systems that scale and last.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 border-t-2 border-ink mt-2">
        {META_CELLS.map(({ lab, val }, i) => (
          <div
            key={lab}
            className={[
              'py-[18px] pr-[18px]',
              'border-b border-ink last:border-b-0',
              'sm:border-b-0 ms-2',
              i < META_CELLS.length - 1 ? 'sm:border-r sm:border-ink' : '',
            ].join(' ')}
          >
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-mute block mb-[6px]">
              {lab}
            </span>
            <span className="text-[18px] leading-[1.3]">{val}</span>
          </div>
        ))}
      </div>

    </div>
  </header>
);

export default Hero;
